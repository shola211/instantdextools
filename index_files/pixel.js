! function r(e, n, t) {
    function o(i, f) {
        if (!n[i]) {
            if (!e[i]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var p = n[i] = {
                exports: {}
            };
            e[i][0].call(p.exports, function(r) {
                return o(e[i][1][r] || r)
            }, p, p.exports, r, e, n, t)
        }
        return n[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
}({
    1: [function(require, module, exports) {}, {}],
    2: [function(require, module, exports) {
        (function(global) {
            (function() {
                var root, factory;
                root = this, factory = function() {
                    var CryptoJS = CryptoJS || function(Math, undefined) {
                        var crypto;
                        if ("undefined" != typeof window && window.crypto && (crypto = window.crypto), "undefined" != typeof self && self.crypto && (crypto = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (crypto = globalThis.crypto), !crypto && "undefined" != typeof window && window.msCrypto && (crypto = window.msCrypto), !crypto && void 0 !== global && global.crypto && (crypto = global.crypto), !crypto && "function" == typeof require) try {
                            crypto = require("crypto")
                        } catch (err) {}
                        var cryptoSecureRandomInt = function() {
                                if (crypto) {
                                    if ("function" == typeof crypto.getRandomValues) try {
                                        return crypto.getRandomValues(new Uint32Array(1))[0]
                                    } catch (err) {}
                                    if ("function" == typeof crypto.randomBytes) try {
                                        return crypto.randomBytes(4).readInt32LE()
                                    } catch (err) {}
                                }
                                throw new Error("Native crypto module could not be used to get secure random number.")
                            },
                            create = Object.create || function() {
                                function F() {}
                                return function(obj) {
                                    var subtype;
                                    return F.prototype = obj, subtype = new F, F.prototype = null, subtype
                                }
                            }(),
                            C = {},
                            C_lib = C.lib = {},
                            Base = C_lib.Base = {
                                extend: function(overrides) {
                                    var subtype = create(this);
                                    return overrides && subtype.mixIn(overrides), subtype.hasOwnProperty("init") && this.init !== subtype.init || (subtype.init = function() {
                                        subtype.$super.init.apply(this, arguments)
                                    }), (subtype.init.prototype = subtype).$super = this, subtype
                                },
                                create: function() {
                                    var instance = this.extend();
                                    return instance.init.apply(instance, arguments), instance
                                },
                                init: function() {},
                                mixIn: function(properties) {
                                    for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
                                    properties.hasOwnProperty("toString") && (this.toString = properties.toString)
                                },
                                clone: function() {
                                    return this.init.prototype.extend(this)
                                }
                            },
                            WordArray = C_lib.WordArray = Base.extend({
                                init: function(words, sigBytes) {
                                    words = this.words = words || [], this.sigBytes = null != sigBytes ? sigBytes : 4 * words.length
                                },
                                toString: function(encoder) {
                                    return (encoder || Hex).stringify(this)
                                },
                                concat: function(wordArray) {
                                    var thisWords = this.words,
                                        thatWords = wordArray.words,
                                        thisSigBytes = this.sigBytes,
                                        thatSigBytes = wordArray.sigBytes;
                                    if (this.clamp(), thisSigBytes % 4)
                                        for (var i = 0; i < thatSigBytes; i++) {
                                            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8
                                        } else
                                            for (var j = 0; j < thatSigBytes; j += 4) thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                                    return this.sigBytes += thatSigBytes, this
                                },
                                clamp: function() {
                                    var words = this.words,
                                        sigBytes = this.sigBytes;
                                    words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8, words.length = Math.ceil(sigBytes / 4)
                                },
                                clone: function() {
                                    var clone = Base.clone.call(this);
                                    return clone.words = this.words.slice(0), clone
                                },
                                random: function(nBytes) {
                                    for (var words = [], i = 0; i < nBytes; i += 4) words.push(cryptoSecureRandomInt());
                                    return new WordArray.init(words, nBytes)
                                }
                            }),
                            C_enc = C.enc = {},
                            Hex = C_enc.Hex = {
                                stringify: function(wordArray) {
                                    for (var words = wordArray.words, sigBytes = wordArray.sigBytes, hexChars = [], i = 0; i < sigBytes; i++) {
                                        var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                        hexChars.push((bite >>> 4).toString(16)), hexChars.push((15 & bite).toString(16))
                                    }
                                    return hexChars.join("")
                                },
                                parse: function(hexStr) {
                                    for (var hexStrLength = hexStr.length, words = [], i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                                    return new WordArray.init(words, hexStrLength / 2)
                                }
                            },
                            Latin1 = C_enc.Latin1 = {
                                stringify: function(wordArray) {
                                    for (var words = wordArray.words, sigBytes = wordArray.sigBytes, latin1Chars = [], i = 0; i < sigBytes; i++) {
                                        var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                        latin1Chars.push(String.fromCharCode(bite))
                                    }
                                    return latin1Chars.join("")
                                },
                                parse: function(latin1Str) {
                                    for (var latin1StrLength = latin1Str.length, words = [], i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
                                    return new WordArray.init(words, latin1StrLength)
                                }
                            },
                            Utf8 = C_enc.Utf8 = {
                                stringify: function(wordArray) {
                                    try {
                                        return decodeURIComponent(escape(Latin1.stringify(wordArray)))
                                    } catch (e) {
                                        throw new Error("Malformed UTF-8 data")
                                    }
                                },
                                parse: function(utf8Str) {
                                    return Latin1.parse(unescape(encodeURIComponent(utf8Str)))
                                }
                            },
                            BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
                                reset: function() {
                                    this._data = new WordArray.init, this._nDataBytes = 0
                                },
                                _append: function(data) {
                                    "string" == typeof data && (data = Utf8.parse(data)), this._data.concat(data), this._nDataBytes += data.sigBytes
                                },
                                _process: function(doFlush) {
                                    var processedWords, data = this._data,
                                        dataWords = data.words,
                                        dataSigBytes = data.sigBytes,
                                        blockSize = this.blockSize,
                                        nBlocksReady = dataSigBytes / (4 * blockSize),
                                        nWordsReady = (nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0)) * blockSize,
                                        nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
                                    if (nWordsReady) {
                                        for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);
                                        processedWords = dataWords.splice(0, nWordsReady), data.sigBytes -= nBytesReady
                                    }
                                    return new WordArray.init(processedWords, nBytesReady)
                                },
                                clone: function() {
                                    var clone = Base.clone.call(this);
                                    return clone._data = this._data.clone(), clone
                                },
                                _minBufferSize: 0
                            }),
                            C_algo = (C_lib.Hasher = BufferedBlockAlgorithm.extend({
                                cfg: Base.extend(),
                                init: function(cfg) {
                                    this.cfg = this.cfg.extend(cfg), this.reset()
                                },
                                reset: function() {
                                    BufferedBlockAlgorithm.reset.call(this), this._doReset()
                                },
                                update: function(messageUpdate) {
                                    return this._append(messageUpdate), this._process(), this
                                },
                                finalize: function(messageUpdate) {
                                    return messageUpdate && this._append(messageUpdate), this._doFinalize()
                                },
                                blockSize: 16,
                                _createHelper: function(hasher) {
                                    return function(message, cfg) {
                                        return new hasher.init(cfg).finalize(message)
                                    }
                                },
                                _createHmacHelper: function(hasher) {
                                    return function(message, key) {
                                        return new C_algo.HMAC.init(hasher, key).finalize(message)
                                    }
                                }
                            }), C.algo = {});
                        return C
                    }(Math);
                    return CryptoJS
                }, "object" == typeof exports ? module.exports = exports = factory() : "function" == typeof define && define.amd ? define([], factory) : root.CryptoJS = factory()
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        crypto: 1
    }],
    3: [function(require, module, exports) {
        var root, factory;
        root = this, factory = function(CryptoJS) {
            return CryptoJS.enc.Hex
        }, "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define(["./core"], factory) : factory(root.CryptoJS)
    }, {
        "./core": 2
    }],
    4: [function(require, module, exports) {
        var root, factory;
        root = this, factory = function(CryptoJS) {
            return function(Math) {
                var C = CryptoJS,
                    C_lib = C.lib,
                    WordArray = C_lib.WordArray,
                    Hasher = C_lib.Hasher,
                    C_algo = C.algo,
                    H = [],
                    K = [];
                ! function() {
                    function isPrime(n) {
                        for (var sqrtN = Math.sqrt(n), factor = 2; factor <= sqrtN; factor++)
                            if (!(n % factor)) return !1;
                        return !0
                    }

                    function getFractionalBits(n) {
                        return 4294967296 * (n - (0 | n)) | 0
                    }
                    for (var n = 2, nPrime = 0; nPrime < 64;) isPrime(n) && (nPrime < 8 && (H[nPrime] = getFractionalBits(Math.pow(n, .5))), K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3)), nPrime++), n++
                }();
                var W = [],
                    SHA256 = C_algo.SHA256 = Hasher.extend({
                        _doReset: function() {
                            this._hash = new WordArray.init(H.slice(0))
                        },
                        _doProcessBlock: function(M, offset) {
                            for (var H = this._hash.words, a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7], i = 0; i < 64; i++) {
                                if (i < 16) W[i] = 0 | M[offset + i];
                                else {
                                    var gamma0x = W[i - 15],
                                        gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3,
                                        gamma1x = W[i - 2],
                                        gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
                                }
                                var maj = a & b ^ a & c ^ b & c,
                                    sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22),
                                    t1 = h + ((e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25)) + (e & f ^ ~e & g) + K[i] + W[i];
                                h = g, g = f, f = e, e = d + t1 | 0, d = c, c = b, b = a, a = t1 + (sigma0 + maj) | 0
                            }
                            H[0] = H[0] + a | 0, H[1] = H[1] + b | 0, H[2] = H[2] + c | 0, H[3] = H[3] + d | 0, H[4] = H[4] + e | 0, H[5] = H[5] + f | 0, H[6] = H[6] + g | 0, H[7] = H[7] + h | 0
                        },
                        _doFinalize: function() {
                            var data = this._data,
                                dataWords = data.words,
                                nBitsTotal = 8 * this._nDataBytes,
                                nBitsLeft = 8 * data.sigBytes;
                            return dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32, dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296), dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal, data.sigBytes = 4 * dataWords.length, this._process(), this._hash
                        },
                        clone: function() {
                            var clone = Hasher.clone.call(this);
                            return clone._hash = this._hash.clone(), clone
                        }
                    });
                C.SHA256 = Hasher._createHelper(SHA256), C.HmacSHA256 = Hasher._createHmacHelper(SHA256)
            }(Math), CryptoJS.SHA256
        }, "object" == typeof exports ? module.exports = exports = factory(require("./core")) : "function" == typeof define && define.amd ? define(["./core"], factory) : factory(root.CryptoJS)
    }, {
        "./core": 2
    }],
    5: [function(require, module, exports) {
        "use strict";
        var id, CONSTANTS = require("./constants"),
            helper = require("./helper"),
            getRequest = new XMLHttpRequest,
            rdt = window.rdt;
        if (rdt && (id = rdt.pixelId + "_telemetry"), getRequest.onreadystatechange = function() {
                getRequest.readyState == XMLHttpRequest.DONE && getRequest.status, getRequest.readyState == XMLHttpRequest.DONE && 200 != getRequest.status && helper.sendErrorReport(["CCS error: " + JSON.stringify({
                    status: getRequest.status,
                    response: getRequest.responseText
                })])
            }, getRequest.open("GET", CONSTANTS.EVENT_CONFIG.CONVERSIONS_CONFIG_PIXEL_URL + "/" + id), "JSON" in window) getRequest.send();
        else {
            var t = document.createElement("script");
            t.async = !0, t.src = "https://www.redditstatic.com/ads/json3.min.js", t.onload = function() {
                getRequest.send()
            };
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(t, s)
        }
    }, {
        "./constants": 6,
        "./helper": 11
    }],
    6: [function(require, module, exports) {
        "use strict";
        module.exports = {
            CLICK_ID_NAME: "rdt_cid",
            PIXEL_ENDPOINT: "https://alb.reddit.com/rp.gif",
            ADS_UI_ENDPOINT: "https://ads.reddit.com",
            ADS_UI_STATIC_BASE: "https://www.redditstatic.com/campaign-management/",
            UNIX_EPOCH: "Thu, 01 Jan 1970 00:00:00 GMT",
            COOKIE_EXPIRATION_DAYS: 90,
            CLICK_ID_COOKIE_NAME: "_rdt_cid",
            EMAIL_COOKIE_NAME: "_rdt_em",
            UUID_COOKIE_NAME_V2: "_rdt_uuid",
            METADATA_PREFIX: "m.",
            CUSTOM_EVENT_NAME_LIMIT: 128,
            CONVERSION_EVENTS: {
                PAGEVISIT: "PageVisit",
                VIEWCONTENT: "ViewContent",
                SEARCH: "Search",
                ADDTOCART: "AddToCart",
                ADDTOWISHLIST: "AddToWishlist",
                PURCHASE: "Purchase",
                LEAD: "Lead",
                SIGNUP: "SignUp",
                CUSTOM: "Custom"
            },
            CONVERSION_EVENTS_LIST: ["PageVisit", "ViewContent", "Search", "AddToCart", "AddToWishlist", "Purchase", "Lead", "SignUp", "Custom"],
            INTEGRATION_PROVIDERS: {
                REDDIT: "reddit",
                GTM: "gtm",
                NOSCRIPT: "noscript"
            },
            PIXEL_METHODS: {
                INIT: "init",
                ENABLE_FIRST_PARTY_COOKIES: "enableFirstPartyCookies",
                TRACK: "track",
                DISABLE_FIRST_PARTY_COOKIES: "disableFirstPartyCookies"
            },
            EVENT_METADATA: {
                ITEM_COUNT: "itemCount",
                VALUE: "value",
                VALUE_DECIMAL: "valueDecimal",
                CURRENCY: "currency",
                TRANSACTION_ID: "transactionId",
                CUSTOM_EVENT_NAME: "customEventName",
                PRODUCTS: "products",
                CONVERSION_ID: "conversionId"
            },
            EVENT_METADATA_LIST: ["itemCount", "value", "valueDecimal", "currency", "transactionId", "customEventName", "products", "conversionId"],
            REVENUE_METADATA_LIST: ["itemCount", "value", "valueDecimal", "currency", "transactionId"],
            DEFAULT_CURRENCY: "USD",
            REVENUE_EVENTS_LIST: ["AddToCart", "AddToWishlist", "Purchase", "Lead", "SignUp", "Custom"],
            EVENT_CONFIG: {
                PIXEL_URL_DEFAULT: "https://www.redditstatic.com/ads/LATEST/pixel.js",
                CONVERSIONS_CONFIG_PIXEL_URL: "https://www.redditstatic.com/ads/conversions-config/v1/pixel/config",
                CONVERSIONS_CONFIG_ERROR_URL: "https://conversions-config.reddit.com/v1/pixel/error",
                EVENT_CONFIGS_URL: "https://pixel-config.reddit.com/pixels"
            },
            EVENT_SETUP: {
                PAGE_LISTENERS_UPDATE_TIMEOUT: 5e3,
                URL_FETCH_TIMEOUT: 50,
                EVENT_CONFIG: {
                    TRIGGER_TYPE: {
                        CLICK: "CLICK",
                        URL: "URL"
                    },
                    TRIGGER_SELECTOR_TYPE: {
                        CLICK_CSS: "CLICK_CSS",
                        CLICK_TEXT: "CLICK_TEXT",
                        URL_CONTAINS: "URL_CONTAINS",
                        URL_EXACT: "URL_EXACT"
                    },
                    METADATA_EXTRACTOR_TYPE: {
                        FIXED: "FIXED",
                        SELECTOR: "SELECTOR"
                    },
                    METADATA_SELECTOR_TYPE: {
                        CSS: "METADATA_CSS",
                        TEXT: "METADATA_TEXT"
                    }
                }
            }
        }
    }, {}],
    7: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("./constants"),
            getQueryParameter = require("./queryString").getQueryParameter,
            strings = require("./strings"),
            uuidv4 = require("./uuid"),
            addTimestampToCookie = function(uuid) {
                return (new Date).getTime() + "." + uuid
            };
        exports.addTimestampToCookie = addTimestampToCookie, exports.extractUuidFromCookieV2 = function(cookieValue) {
            var split = cookieValue.split(".");
            return split.length < 2 ? cookieValue : split[1]
        }, exports.createCookieV2 = function() {
            return addTimestampToCookie(uuidv4())
        }, exports.getCookieV2 = function() {
            for (var split = document.cookie.split(";"), oldestCookie = null, oldestTimestamp = 1 / 0, i = 0; i < split.length; i++) {
                var keyVal = split[i].split("=");
                if (1 < keyVal.length)
                    if (strings.trim(keyVal[0]) === CONSTANTS.UUID_COOKIE_NAME_V2) {
                        var valParts = keyVal[1].split(".");
                        if (1 < valParts.length) {
                            var timestamp = parseInt(valParts[0], 10);
                            !isNaN(timestamp) && timestamp < oldestTimestamp && (oldestTimestamp = timestamp, oldestCookie = keyVal[1])
                        }
                    }
            }
            return oldestCookie
        };
        var getFirstCookie = function(wantName) {
            for (var cookies = document.cookie.split(";"), i = 0; i < cookies.length; i++) {
                var keyVal = cookies[i].split("=");
                if (1 < keyVal.length) {
                    var gotName = strings.trim(keyVal[0]),
                        gotVal = keyVal[1];
                    if (gotName === wantName && gotVal.length) return gotVal
                }
            }
            return null
        };
        exports.getFirstCookie = getFirstCookie, exports.setClickId = function() {
            if (!rdt.clickId) {
                var clickId = getQueryParameter(window.location.search, CONSTANTS.CLICK_ID_NAME);
                if (clickId) return rdt.clickId = clickId, void setCookie(CONSTANTS.CLICK_ID_COOKIE_NAME, clickId, CONSTANTS.COOKIE_EXPIRATION_DAYS);
                var clickCookie = getFirstCookie(CONSTANTS.CLICK_ID_COOKIE_NAME);
                clickCookie && (rdt.clickId = clickCookie)
            }
        }, exports.setEmail = function() {
            var emailConfig = "config" in rdt ? rdt.config.em : null,
                emailCookie = getFirstCookie(CONSTANTS.EMAIL_COOKIE_NAME),
                isSetEmailCookie = !!emailCookie;
            !!emailConfig ? setCookie(CONSTANTS.EMAIL_COOKIE_NAME, emailConfig, CONSTANTS.COOKIE_EXPIRATION_DAYS) : isSetEmailCookie && ("config" in rdt == !1 && (rdt.config = {}), rdt.config.em = emailCookie)
        };
        var stringIsInteger = function(s) {
            return "" + Number(s) === s
        };
        exports.stringIsInteger = stringIsInteger;
        var setAndTestCookie = function(name, value, domain, expires) {
            var cookie = name + "=" + value + ";domain=." + domain + ";expires=" + expires + ";path=/;samesite=strict";
            return "https:" === window.location.protocol && (cookie += ";secure"), document.cookie = cookie, 0 <= document.cookie.indexOf(name + "=" + value)
        };
        exports.setAndTestCookie = setAndTestCookie;
        var setCookie = function(name, value, expiresDays) {
            var d = new Date,
                expiresInSeconds = 24 * expiresDays * 60 * 60;
            d.setTime(d.getTime() + 1e3 * expiresInSeconds);
            var expires = d.toUTCString(),
                domain = window.location.hostname;
            domain = "." == domain.slice(-1) ? domain.slice(0, -1) : domain, deleteCookie(name, domain);
            var labels = domain.split(".");
            if (1 == labels.length || stringIsInteger(labels[labels.length - 1])) return setAndTestCookie(name, value, domain, expires), domain;
            for (domain = labels.pop(), domain = labels.pop() + "." + domain; !setAndTestCookie(name, value, domain, expires) && labels.length;) domain = labels.pop() + "." + domain;
            return domain
        };
        exports.setCookie = setCookie;
        var deleteCookie = function(name, domain) {
            for (var labels = (domain = domain || window.location.hostname).split("."); setAndTestCookie(name, "", labels.join("."), CONSTANTS.UNIX_EPOCH) && labels.length;) labels.shift();
            return labels.join(".")
        };
        exports.deleteCookie = deleteCookie
    }, {
        "./constants": 6,
        "./queryString": 20,
        "./strings": 21,
        "./uuid": 22
    }],
    8: [function(require, module, exports) {
        "use strict";
        exports.screenSize = function() {
            var width = 1 * window.screen.width,
                height = 1 * window.screen.height;
            return {
                sh: Math.max(width, height),
                sw: Math.min(width, height)
            }
        }
    }, {}],
    9: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("./constants");

        function eventSetupToolMountListener(event) {
            if (event.origin === CONSTANTS.ADS_UI_ENDPOINT && "MOUNT_EST" === event.data && event.source === window.opener) {
                try {
                    injectScript()
                } catch (error) {
                    console.error("Failed to inject EST script. Error: ", error)
                }
                removeEventListener("message", eventSetupToolMountListener)
            }
        }

        function injectScript() {
            fetch(CONSTANTS.ADS_UI_ENDPOINT + "/public/estManifest").then(function(response) {
                return response.json()
            }).then(function(manifest) {
                var assets = manifest.assets;
                fetch(CONSTANTS.ADS_UI_STATIC_BASE + assets["estStyles.css"]).then(function(response) {
                    response.text().then(function(stylesheet) {
                        var cssStyles = document.createElement("style");
                        cssStyles.innerText = stylesheet, document.head.append(cssStyles)
                    })
                });
                var cssScript = document.createElement("script");
                cssScript.src = CONSTANTS.ADS_UI_STATIC_BASE + assets["estStyles.js"];
                var mainScript = document.createElement("script");
                mainScript.src = CONSTANTS.ADS_UI_STATIC_BASE + assets["eventSetupTool.js"], document.body.append(cssScript, mainScript)
            })
        }

        function isOpenedViaAdsUI() {
            return -1 < window.location.search.indexOf("reddit_open_est=true")
        }
        exports.isOpenedViaAdsUI = isOpenedViaAdsUI, exports.initEventSetupListener = function() {
            isOpenedViaAdsUI() && !window.opener && "append" in document.body ? injectScript() : null !== window.opener && void 0 !== window.opener && "postMessage" in window.opener != !1 && "append" in document.body != !1 && (window.opener.postMessage("PIXEL_READY", CONSTANTS.ADS_UI_ENDPOINT), window.addEventListener("message", eventSetupToolMountListener))
        }
    }, {
        "./constants": 6
    }],
    10: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("./constants"),
            helper = require("./helper");

        function xhrErrorCallback(xhrRequest) {
            return function() {
                helper.sendErrorReport(["Pixel Config error: " + JSON.stringify({
                    status: xhrRequest.status,
                    response: xhrRequest.responseText
                })])
            }
        }
        module.exports = {
            getEventConfigs: function(pixelId, onSuccessCallback) {
                var url = "".concat(CONSTANTS.EVENT_CONFIG.EVENT_CONFIGS_URL, "/").concat(pixelId, "/config"),
                    getRequest = new XMLHttpRequest;
                getRequest.open("GET", url), getRequest.ontimeout = xhrErrorCallback, getRequest.onreadystatechange = function(xhrRequest, onSuccessCallback) {
                    return function() {
                        if (xhrRequest.readyState === XMLHttpRequest.DONE)
                            if (200 === xhrRequest.status) {
                                var pixelEventConfigs = function(response) {
                                    var pixelEventConfigs = [];
                                    if ("" !== response) {
                                        var parsedResponse = JSON.parse(response);
                                        "pixelEventConfigs" in parsedResponse && (pixelEventConfigs = parsedResponse.pixelEventConfigs)
                                    }
                                    return pixelEventConfigs
                                }(xhrRequest.response);
                                onSuccessCallback(pixelEventConfigs)
                            } else xhrErrorCallback(xhrRequest)
                    }
                }(getRequest, onSuccessCallback), getRequest.send()
            }
        }
    }, {
        "./constants": 6,
        "./helper": 11
    }],
    11: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("./constants");
        module.exports = {
            sendErrorReport: function(messages) {
                var url = CONSTANTS.EVENT_CONFIG.CONVERSIONS_CONFIG_ERROR_URL,
                    putRequest = new XMLHttpRequest;
                putRequest.open("PUT", url);
                var body = {
                    messages: messages,
                    timestamp: (new Date).getTime()
                };
                putRequest.send(JSON.stringify(body))
            }
        }
    }, {
        "./constants": 6
    }],
    12: [function(require, module, exports) {
        "use strict";
        var pageElements, UTILS = require("./utils"),
            TRIGGER_SELECTOR_TYPE = require("../constants").EVENT_SETUP.EVENT_CONFIG.TRIGGER_SELECTOR_TYPE;

        function initClickListener(config, trigger) {
            var target = queryTriggerTarget(trigger);

            function clickListener(ev) {
                var rdtEvent = UTILS.configToRdtEvent(config, trigger);
                window.rdt(rdtEvent.method, rdtEvent.eventName, rdtEvent.metadataArgs)
            }
            return null !== target && target.addEventListener("click", clickListener, !0), {
                config: config,
                trigger: trigger,
                listener: clickListener,
                target: target
            }
        }

        function queryTriggerTarget(trigger) {
            var target = null;
            if (trigger.triggerSelectorType === TRIGGER_SELECTOR_TYPE.CLICK_CSS && (target = document.querySelector(trigger.triggerSelectorValue)), trigger.triggerSelectorType === TRIGGER_SELECTOR_TYPE.CLICK_TEXT)
                for (var k = 0; k < pageElements.length; k++) {
                    var element = pageElements[k];
                    if (UTILS.getRenderedText(element) === trigger.triggerSelectorValue) {
                        target = element;
                        break
                    }
                }
            return target
        }
        window.rdt.queryClickTriggerTarget = queryTriggerTarget, module.exports = {
            initClickListeners: function(configs) {
                pageElements = document.body.querySelectorAll("*");
                for (var clickListenersList = [], i = 0; i < configs.length; i++)
                    for (var config = configs[i], triggers = config.triggers, j = 0; j < triggers.length; j++) {
                        var trigger = triggers[j];
                        clickListenersList.push(initClickListener(config, trigger))
                    }
                return clickListenersList
            },
            updateClickListeners: function(clickListenersList) {
                pageElements = document.body.querySelectorAll("*");
                for (var i = 0; i < clickListenersList.length; i++) {
                    var entry = clickListenersList[i],
                        hasTarget = null !== entry.target,
                        isMounted = document.body.contains(entry.target);
                    if (!hasTarget || !isMounted) {
                        var newEntry = initClickListener(entry.config, entry.trigger);
                        clickListenersList[i] = newEntry
                    }
                }
            }
        }
    }, {
        "../constants": 6,
        "./utils": 15
    }],
    13: [function(require, module, exports) {
        "use strict";
        var UTILS = require("./utils"),
            URL_MATCHERS = require("./urlMatchers.js"),
            TRIGGER_SELECTOR_TYPE = require("../constants").EVENT_SETUP.EVENT_CONFIG.TRIGGER_SELECTOR_TYPE,
            urlPath = location.pathname,
            urlParams = location.search,
            prevUrlPath = location.pathname,
            prevUrlParams = location.search;

        function initURLListener(config, urlPath, urlParams) {
            var trigger = config.triggers[0],
                _matchTrigger = matchTrigger(trigger, urlPath, urlParams),
                hasMatched = _matchTrigger.hasMatched,
                matches = _matchTrigger.matches,
                matcher = _matchTrigger.matcher;
            if (hasMatched) {
                var rdtEvent = UTILS.configToRdtEvent(config, trigger);
                window.rdt(rdtEvent.method, rdtEvent.eventName, rdtEvent.metadataArgs)
            }
            return {
                config: config,
                hasMatched: hasMatched,
                matcher: matcher,
                matches: matches
            }
        }

        function updateURLListener(entry) {
            var hasMatched, matches, matcher = entry.matcher;
            if ("EXACT" === matcher.type && (hasMatched = URL_MATCHERS.matchExact(urlPath, urlParams, matcher)), "KEYWORDS" === matcher.type) {
                var matchResults = URL_MATCHERS.matchKeywords(urlPath, urlParams, matcher);
                hasMatched = null !== matchResults, matches = matchResults || void 0
            }
            if (function(prevEntry, hasMatched, matches) {
                    if (!hasMatched) return !1;
                    if (!prevEntry.hasMatched) return !0;
                    if ("KEYWORDS" === prevEntry.matcher.type) {
                        if (urlPath !== prevUrlPath) return !0;
                        for (var urlPathAndParams = urlPath + urlParams, prevUrlPathAndParams = prevUrlPath + prevUrlParams, i = 0; i < matches.length; i++) {
                            var keywordMatchIndexes = matches[i],
                                prevKeywordMatches = prevEntry.matches[i];
                            if (keywordMatchIndexes.length !== prevKeywordMatches.length) return !0;
                            for (var j = 0; j < keywordMatchIndexes; j++) {
                                var matchIndex = keywordMatchIndexes[j],
                                    prevMatchIndex = prevKeywordMatches[j];
                                if (matchIndex !== prevMatchIndex) return !0;
                                var foreText = urlPathAndParams.substring(0, matchIndex),
                                    prevForeText = prevUrlPathAndParams.substring(0, prevMatchIndex);
                                if (foreText !== prevForeText) return !0
                            }
                        }
                    }
                    return !1
                }(entry, hasMatched, matches)) {
                var rdtEvent = UTILS.configToRdtEvent(entry.config);
                window.rdt(rdtEvent.method, rdtEvent.eventName, rdtEvent.metadataArgs)
            }
            return {
                config: entry.config,
                hasMatched: hasMatched,
                matcher: matcher,
                matches: matches
            }
        }

        function matchTrigger(trigger, urlPath, urlParams) {
            var hasMatched, matcher, matches;
            if (trigger.triggerSelectorType === TRIGGER_SELECTOR_TYPE.URL_EXACT && (matcher = URL_MATCHERS.generateExactMatcher(trigger), hasMatched = URL_MATCHERS.matchExact(urlPath, urlParams, matcher)), trigger.triggerSelectorType === TRIGGER_SELECTOR_TYPE.URL_CONTAINS) {
                matcher = URL_MATCHERS.generateKeywordsMatcher(trigger);
                var matchResults = URL_MATCHERS.matchKeywords(urlPath, urlParams, matcher);
                hasMatched = null !== matchResults, matches = matchResults || void 0
            }
            return {
                hasMatched: hasMatched,
                matches: matches,
                matcher: matcher
            }
        }
        window.rdt.matchURLTrigger = matchTrigger, module.exports = {
            initURLListeners: function(configs) {
                for (var urlListenersList = [], i = 0; i < configs.length; i++) {
                    var config = configs[i];
                    urlListenersList.push(initURLListener(config, urlPath, urlParams))
                }
                return urlListenersList
            },
            updateURLListeners: function(urlListenersList) {
                if (urlPath !== location.pathname || urlParams !== location.search) {
                    prevUrlPath = urlPath, prevUrlParams = urlParams, urlPath = location.pathname, urlParams = location.search;
                    for (var i = 0; i < urlListenersList.length; i++) urlListenersList[i] = updateURLListener(urlListenersList[i])
                }
            }
        }
    }, {
        "../constants": 6,
        "./urlMatchers.js": 14,
        "./utils": 15
    }],
    14: [function(require, module, exports) {
        "use strict";

        function parseUrlSearchParams(paramsString) {
            var params = [];
            return 0 < paramsString.length && (params = paramsString.split(/[?&]/).filter(function(item) {
                return "" !== item
            })), params
        }
        module.exports = {
            matchExact: function(urlPath, urlParams, matcher) {
                if (urlPath !== matcher.path) return !1;
                var params = parseUrlSearchParams(urlParams);
                return matcher.params.every(function(param) {
                    return -1 !== params.indexOf(param)
                })
            },
            matchKeywords: function(urlPath, urlParams, matcher) {
                for (var urlPathAndParams = urlPath + urlParams, matchesList = [], i = 0; i < matcher.keywords.length; i++) {
                    for (var keyword = matcher.keywords[i], keywordMatchIndexes = [], matchIndex = urlPathAndParams.indexOf(keyword); - 1 !== matchIndex; matchIndex = urlPathAndParams.indexOf(keyword, matchIndex + 1)) keywordMatchIndexes.push(matchIndex);
                    if (0 === keywordMatchIndexes.length) return null;
                    matchesList.push(keywordMatchIndexes)
                }
                return matchesList
            },
            generateExactMatcher: function(trigger) {
                var url = function(url) {
                        var anchor = document.createElement("a");
                        return anchor.href = url, {
                            hash: anchor.hash,
                            host: anchor.host,
                            hostname: anchor.hostname,
                            href: anchor.href,
                            origin: anchor.origin,
                            pathname: anchor.pathname,
                            port: anchor.port,
                            protocol: anchor.protocol,
                            search: anchor.search
                        }
                    }(trigger.triggerSelectorValue),
                    params = parseUrlSearchParams(url.search);
                return {
                    type: "EXACT",
                    path: url.pathname,
                    params: params
                }
            },
            generateKeywordsMatcher: function(trigger) {
                return {
                    type: "KEYWORDS",
                    keywords: JSON.parse(trigger.triggerSelectorValue)
                }
            }
        }
    }, {}],
    15: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("../constants"),
            METADATA_EXTRACTOR_TYPE = CONSTANTS.EVENT_SETUP.EVENT_CONFIG.METADATA_EXTRACTOR_TYPE,
            METADATA_SELECTOR_TYPE = CONSTANTS.EVENT_SETUP.EVENT_CONFIG.METADATA_SELECTOR_TYPE,
            TRIGGER_TYPE = CONSTANTS.EVENT_SETUP.EVENT_CONFIG.TRIGGER_TYPE;

        function findMetadataByType(metadata, metadataType) {
            if (metadata)
                for (var i = 0; i < metadata.length; i++)
                    if (metadata[i].metadataType === metadataType) return metadata[i]
        }

        function getMetadataValue(metadata) {
            if (metadata) {
                if (metadata.metadataExtractorType === METADATA_EXTRACTOR_TYPE.FIXED) return metadata.metadataFixedValue;
                if (metadata.metadataExtractorType === METADATA_EXTRACTOR_TYPE.SELECTOR && metadata.metadataSelectorType === METADATA_SELECTOR_TYPE.CSS) {
                    var element = document.querySelector(metadata.metadataSelectorValue);
                    if (element) return getRenderedText(element)
                }
            }
        }

        function extractNumber(value) {
            return value && "string" == typeof value ? value.replace(/[^0-9\.]/gi, "") : value
        }

        function getRenderedText(el) {
            return isInput(el) ? el.value : isSelect(el) ? el.options[el.selectedIndex].text : el.textContent || ""
        }

        function isInput(el) {
            return "INPUT" === el.tagName
        }

        function isSelect(el) {
            return "SELECT" === el.tagName
        }
        module.exports = {
            configToRdtEvent: function(eventConfig, trigger) {
                var countMetadata = findMetadataByType(eventConfig.metadata, "ITEM_COUNT"),
                    valueMetadata = findMetadataByType(eventConfig.metadata, "VALUE"),
                    currencyMetadata = findMetadataByType(eventConfig.metadata, "CURRENCY");
                return {
                    metadataArgs: function(obj) {
                        for (var prop in obj) obj.hasOwnProperty(prop) && void 0 === obj[prop] && delete obj[prop];
                        return obj
                    }({
                        itemCount: extractNumber(getMetadataValue(countMetadata)),
                        value: extractNumber(getMetadataValue(valueMetadata)),
                        currency: getMetadataValue(currencyMetadata),
                        triggerId: trigger.id,
                        customEventName: eventConfig.eventConfigName
                    }),
                    method: CONSTANTS.PIXEL_METHODS.TRACK,
                    eventName: eventConfig.trackingType
                }
            },
            isClickEvent: function(event) {
                return 0 !== event.triggers.length && event.triggers[0].triggerType === TRIGGER_TYPE.CLICK
            },
            isURLEvent: function(event) {
                return 0 !== event.triggers.length && event.triggers[0].triggerType === TRIGGER_TYPE.URL
            },
            getRenderedText: getRenderedText,
            isInput: isInput,
            isSelect: isSelect,
            isKeywordInUrl: function(keywords, url) {
                var parsedKeywords = function(keywords) {
                        return JSON.parse(keywords)
                    }(keywords),
                    lowerUrl = url.toLowerCase();
                return parsedKeywords.every(function(keyword) {
                    return lowerUrl.includes(keyword)
                })
            }
        }
    }, {
        "../constants": 6
    }],
    16: [function(require, module, exports) {
        "use strict";
        var console = window.console || {},
            result = {},
            prefixes = {
                error: "Reddit Pixel Error",
                warn: "Reddit Pixel Warning",
                info: "Reddit Pixel Info"
            },
            log = function(method) {
                return function(msg) {
                    method in console && method in prefixes && console[method](prefixes[method] + ":" + msg)
                }
            };
        result.error = log("error"), result.warn = log("warn"), result.info = log("info"), module.exports = result
    }, {}],
    17: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("./constants"),
            UTILS = require("./listeners/utils"),
            CLICK = require("./listeners/click"),
            URL = require("./listeners/url"),
            initClickListeners = CLICK.initClickListeners,
            updateClickListeners = CLICK.updateClickListeners,
            initURLListeners = URL.initURLListeners,
            updateURLListeners = URL.updateURLListeners,
            EVENT_SETUP = CONSTANTS.EVENT_SETUP;
        module.exports = {
            initEventsListeners: function(configs) {
                var clickConfigs = configs.filter(UTILS.isClickEvent),
                    urlConfigs = configs.filter(UTILS.isURLEvent),
                    clickListenersList = initClickListeners(clickConfigs);
                setInterval(updateClickListeners, EVENT_SETUP.PAGE_LISTENERS_UPDATE_TIMEOUT, clickListenersList);
                var urlListenersList = initURLListeners(urlConfigs);
                setInterval(updateURLListeners, EVENT_SETUP.URL_FETCH_TIMEOUT, urlListenersList)
            }
        }
    }, {
        "./constants": 6,
        "./listeners/click": 12,
        "./listeners/url": 13,
        "./listeners/utils": 15
    }],
    18: [function(require, module, exports) {
        "use strict";

        function sendMessage(data) {
            "postMessage" in window && postMessage(data, "*")
        }
        exports.sendInit = function(config, args) {
            sendMessage({
                type: "Init",
                config: config,
                args: args
            })
        }, exports.sendEventData = function(eventData, args) {
            sendMessage({
                type: "EventData",
                eventData: eventData,
                args: args
            })
        }, exports.sendError = function(exceptionName, args) {
            sendMessage({
                type: "Error",
                exceptionName: exceptionName,
                args: args,
                timestamp: (new Date).valueOf()
            })
        }
    }, {}],
    19: [function(require, module, exports) {
        "use strict";

        function _typeof(o) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
                return typeof o
            } : function(o) {
                return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
            })(o)
        }
        var slice = Array.prototype.slice,
            cookie = require("./cookie"),
            device = require("./device"),
            hasher = require("./validators/identityHasher"),
            logger = (require("./helper"), require("./logger")),
            pixelHelperConnect = require("./pixelHelperConnect"),
            eventSetupConnect = require("./eventSetupConnect"),
            integrations = require("./validators/integrations"),
            event = require("./validators/event"),
            CONSTANTS = require("./constants"),
            configsLoader = require("./eventsConfigsLoader"),
            eventListeners = require("./pageEventsListeners"),
            QueryBuilder = require("./queryString").QueryBuilder,
            rdt = window.rdt;
        rdt || (logger.error("Pixel was not initialized.Please ensure you have included the correct pixel script in your head tag"), pixelHelperConnect.sendError("PixelWasNotInitialised"));
        var enableFirstPartyCookies = function() {
            var firstPartyCookie = cookie.getCookieV2() || cookie.createCookieV2();
            cookie.setCookie(CONSTANTS.UUID_COOKIE_NAME_V2, firstPartyCookie, CONSTANTS.COOKIE_EXPIRATION_DAYS), rdt.uuid = cookie.extractUuidFromCookieV2(firstPartyCookie), cookie.setClickId(), cookie.setEmail(), rdt.enableFirstPartyCookies = !0
        };

        function sendEvent(method) {
            var path, query, args = slice.call(arguments),
                PIXEL_METHODS = CONSTANTS.PIXEL_METHODS;
            switch (method) {
                case PIXEL_METHODS.INIT:
                    rdt.pixelId = args[1];
                    var configArgs = "object" === _typeof(args[2]) && args[2] || {},
                        screenSize = device.screenSize();
                    if (rdt.config = {
                            aaid: hasher.hashIfSet(configArgs.aaid, "aaid"),
                            em: hasher.hashIfSet(configArgs.email, "email"),
                            external_id: hasher.hashIfSet(configArgs.externalId, "externalId"),
                            idfa: hasher.hashIfSet(configArgs.idfa, "idfa"),
                            integration: integrations.getIntegrationProvider(configArgs.integration),
                            opt_out: configArgs.optOut ? 1 : 0,
                            sh: screenSize.sh,
                            sw: screenSize.sw,
                            v: "rdt_49267bce"
                        }, function(configArgs) {
                            var dataProcessingOptions = event.normalizeDataProcessingOptions(configArgs.dpm, configArgs.dpcc, configArgs.dprc);
                            rdt.config.dpm = dataProcessingOptions.dpm, rdt.config.dpcc = dataProcessingOptions.dpcc, rdt.config.dprc = dataProcessingOptions.dprc
                        }(configArgs), rdt.useDecimalCurrencyValues = !("useDecimalCurrencyValues" in configArgs) || !!configArgs.useDecimalCurrencyValues, enableFirstPartyCookies(), pixelHelperConnect.sendInit(rdt.config, args), !rdt.isESListenerMounted) {
                        rdt.isESListenerMounted = !0, eventSetupConnect.initEventSetupListener();
                        var estT2Id = localStorage.getItem("est_t2_id");
                        estT2Id && (rdt.pixelId = estT2Id);
                        try {
                            configsLoader.getEventConfigs(rdt.pixelId, eventListeners.initEventsListeners)
                        } catch (e) {
                            logger.error("Pixel Config error: ".concat(e))
                        }
                    }
                    return;
                case PIXEL_METHODS.ENABLE_FIRST_PARTY_COOKIES:
                    return void enableFirstPartyCookies();
                case PIXEL_METHODS.DISABLE_FIRST_PARTY_COOKIES:
                    return void(rdt.enableFirstPartyCookies = !1);
                case PIXEL_METHODS.TRACK:
                    var eventName = args[1],
                        metadataArgs = args[2] || {};
                    if ("email" in metadataArgs) {
                        var email = hasher.hashIfSet(metadataArgs.email, "email");
                        delete metadataArgs.email, email && (rdt.config.em = email, cookie.setEmail())
                    }
                    if ("externalId" in metadataArgs) {
                        var externalId = hasher.hashIfSet(metadataArgs.externalId, "externalId");
                        delete metadataArgs.externalId, externalId && (rdt.config.external_id = externalId)
                    }
                    if ("idfa" in metadataArgs) {
                        var idfa = hasher.hashIfSet(metadataArgs.idfa, "idfa");
                        delete metadataArgs.idfa, idfa && (rdt.config.idfa = idfa)
                    }
                    if ("aaid" in metadataArgs) {
                        var aaid = hasher.hashIfSet(metadataArgs.aaid, "aaid");
                        delete metadataArgs.aaid, aaid && (rdt.config.aaid = aaid)
                    }
                    var triggerId = "";
                    "triggerId" in metadataArgs && (triggerId = metadataArgs.triggerId, delete metadataArgs.triggerId);
                    var validatedMetadata = event.validateMetadata(eventName, metadataArgs),
                        q = (new QueryBuilder).addParams({
                            id: rdt.pixelId,
                            event: eventName
                        }).addParams(validatedMetadata);
                    return triggerId && q.addParams({
                        trigger_id: triggerId
                    }), rdt.enableFirstPartyCookies && (rdt.clickId && rdt.clickId.length && q.addParams({
                        click_id: rdt.clickId
                    }), rdt.uuid && rdt.uuid.length && q.addParams({
                        uuid: rdt.uuid
                    })), q.addParams(rdt.config), path = CONSTANTS.PIXEL_ENDPOINT, query = q.toQueryString(), (new Image).src = path + query, void pixelHelperConnect.sendEventData(q.params, args)
            }
        }
        for (rdt.sendEvent = sendEvent; rdt.callQueue.length;) sendEvent.apply(rdt, rdt.callQueue.shift());
        require("./bootLoader")
    }, {
        "./bootLoader": 5,
        "./constants": 6,
        "./cookie": 7,
        "./device": 8,
        "./eventSetupConnect": 9,
        "./eventsConfigsLoader": 10,
        "./helper": 11,
        "./logger": 16,
        "./pageEventsListeners": 17,
        "./pixelHelperConnect": 18,
        "./queryString": 20,
        "./validators/event": 23,
        "./validators/identityHasher": 24,
        "./validators/integrations": 25
    }],
    20: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("../lib/constants"),
            logger = require("./logger"),
            QueryBuilder = function() {
                this.params = {}, this.params.ts = (new Date).valueOf()
            };
        QueryBuilder.prototype.addParams = function(params) {
            for (var key in params) this.isMetadata(key) ? this.params[CONSTANTS.METADATA_PREFIX + key] = params[key] : this.params[key] = params[key];
            return this
        }, QueryBuilder.prototype.isMetadata = function(param) {
            for (var i = 0; i < CONSTANTS.EVENT_METADATA_LIST.length; i++)
                if (param === CONSTANTS.EVENT_METADATA_LIST[i]) return !0;
            return !1
        }, QueryBuilder.prototype.toQueryString = function() {
            var result = [];
            for (var key in this.params) {
                var val = this.params[key],
                    serializedValue = "undefined";
                try {
                    serializedValue = encodeURIComponent(val)
                } catch (e) {
                    logger.warn("unsupported value type for " + key)
                }
                result.push(encodeURIComponent(key) + "=" + serializedValue)
            }
            return "?" + result.join("&")
        }, exports.QueryBuilder = QueryBuilder, exports.getQueryParameter = function(search, name) {
            if (!search) return "";
            for (var keyValues = search.slice(1).split("&"), i = 0; i < keyValues.length; i++) {
                var keyValue = keyValues[i].split("=");
                if (keyValue[0] === name) return keyValue[1]
            }
            return ""
        }
    }, {
        "../lib/constants": 6,
        "./logger": 16
    }],
    21: [function(require, module, exports) {
        "use strict";
        var TRIM_REGEXP = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        exports.trim = function(str) {
            return str.replace(TRIM_REGEXP, "")
        }
    }, {}],
    22: [function(require, module, exports) {
        "use strict";
        module.exports = function() {
            return self && self.crypto && "function" == typeof self.crypto.randomUUID ? self.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                var r = 16 * Math.random() | 0;
                return ("x" === c ? r : 3 & r | 8).toString(16)
            })
        }
    }, {}],
    23: [function(require, module, exports) {
        "use strict";

        function _typeof(o) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
                return typeof o
            } : function(o) {
                return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o
            })(o)
        }
        var CONSTANTS = require("../constants"),
            hasher = require("./identityHasher");
        exports.validateMetadata = function(eventName, unvalidatedEvent) {
            for (var validatedEvent = {}, i = 0; i < CONSTANTS.REVENUE_METADATA_LIST.length; i++) {
                var field = CONSTANTS.REVENUE_METADATA_LIST[i];
                field !== CONSTANTS.EVENT_METADATA.VALUE_DECIMAL && copyFieldIfPresent(field, validatedEvent, unvalidatedEvent)
            }
            return copyFieldIfPresent(CONSTANTS.EVENT_METADATA.CUSTOM_EVENT_NAME, validatedEvent, unvalidatedEvent), copyFieldIfPresent(CONSTANTS.EVENT_METADATA.CONVERSION_ID, validatedEvent, unvalidatedEvent), copyValidatedField(CONSTANTS.EVENT_METADATA.PRODUCTS, validatedEvent, unvalidatedEvent), normalizeMetadata(validatedEvent)
        };
        var copyFieldIfPresent = function(field, target, source) {
                field in source && (target[field] = source[field])
            },
            copyValidatedField = function(field, validatedEvent, unvalidatedEvent) {
                field in unvalidatedEvent && (getValidator(field)(unvalidatedEvent[field]) && (validatedEvent[field] = unvalidatedEvent[field]))
            },
            normalizeMetadata = function(validatedEvent) {
                if (CONSTANTS.EVENT_METADATA.VALUE in validatedEvent) {
                    var givenValue = validatedEvent[CONSTANTS.EVENT_METADATA.VALUE],
                        valueFieldName = rdt.useDecimalCurrencyValues ? CONSTANTS.EVENT_METADATA.VALUE_DECIMAL : CONSTANTS.EVENT_METADATA.VALUE;
                    rdt.useDecimalCurrencyValues && delete validatedEvent[CONSTANTS.EVENT_METADATA.VALUE], validatedEvent[valueFieldName] = givenValue
                }
                CONSTANTS.EVENT_METADATA.TRANSACTION_ID in validatedEvent && (validatedEvent[CONSTANTS.EVENT_METADATA.TRANSACTION_ID] = hasher.hashIfSet(validatedEvent[CONSTANTS.EVENT_METADATA.TRANSACTION_ID], CONSTANTS.EVENT_METADATA.TRANSACTION_ID)), CONSTANTS.EVENT_METADATA.CONVERSION_ID in validatedEvent && (validatedEvent[CONSTANTS.EVENT_METADATA.CONVERSION_ID] = hasher.hashIfSet(validatedEvent[CONSTANTS.EVENT_METADATA.CONVERSION_ID], CONSTANTS.EVENT_METADATA.CONVERSION_ID));
                var customEventField = CONSTANTS.EVENT_METADATA.CUSTOM_EVENT_NAME;
                validatedEvent[customEventField] = normalizeCustomEventName(validatedEvent[customEventField]);
                var productsField = CONSTANTS.EVENT_METADATA.PRODUCTS;
                validatedEvent[productsField] = normalizeProducts(validatedEvent[productsField]);
                for (var event = {}, i = 0; i < CONSTANTS.EVENT_METADATA_LIST.length; i++) {
                    var field = CONSTANTS.EVENT_METADATA_LIST[i];
                    event[field] = field in validatedEvent ? validatedEvent[field] : ""
                }
                return event
            },
            normalizeProducts = function(products) {
                if (!products) return "";
                if (isString(products)) try {
                    products = JSON.parse(products)
                } catch (e) {
                    return ""
                }
                isArray(products) || (products = [products]);
                for (var normalizedProducts = [], i = 0; i < products.length; i++) {
                    var product = products[i],
                        normalizedProduct = {};
                    for (var _field in product.id && (isNumber(product.id) ? normalizedProduct.id = product.id.toString() : isString(product.id) && (normalizedProduct.id = product.id)), product.name && isString(product.name) && (normalizedProduct.name = product.name), product.category && isString(product.category) && (normalizedProduct.category = product.category), normalizedProduct) {
                        normalizedProducts.push(normalizedProduct);
                        break
                    }
                }
                return 0 !== normalizedProducts.length ? JSON.stringify(normalizedProducts) : ""
            },
            normalizeCustomEventName = function(customEventName) {
                if (!customEventName) return "";
                for (var index = 0, lengthOut = 0, lengthIn = customEventName.length; index < lengthIn && lengthOut < CONSTANTS.CUSTOM_EVENT_NAME_LIMIT;) {
                    var value = customEventName.charCodeAt(index);
                    if (lengthOut += 1, index += 1, 55296 <= value && value <= 56319 && index < lengthIn) 56320 == (64512 & customEventName.charCodeAt(index)) && (index += 1)
                }
                return customEventName.slice(0, index)
            };
        exports.normalizeCustomEventName = normalizeCustomEventName;
        exports.normalizeDataProcessingOptions = function(dpm, dpcc, dprc) {
            return isString(dpm) ? containsComma(dpm) && (dpm = dpm.split(",")) : isArray(dpm) || (dpm = ""), {
                dpm: dpm,
                dpcc: dpcc = isString(dpcc) ? dpcc : "",
                dprc: dprc = isString(dprc) ? dprc : ""
            }
        };
        var getValidator = function(metadata) {
                return {
                    products: isObjectOrString
                }[metadata]
            },
            isNumber = function(value) {
                return "string" == typeof value && (value = parseFloat(value)), "number" == typeof value && !isNaN(value) && isFinite(value)
            },
            isString = function(s) {
                return "string" == typeof s
            },
            containsComma = function(str) {
                return -1 !== str.indexOf(",")
            },
            isArray = function(str) {
                return "[object Array]" === Object.prototype.toString.call(str)
            },
            isObject = function(value) {
                return "object" === _typeof(value) && null !== value
            };
        exports.isObject = isObject;
        var isObjectOrString = function(value) {
            return isObject(value) || isString(value)
        };
        exports.isObjectOrString = isObjectOrString
    }, {
        "../constants": 6,
        "./identityHasher": 24
    }],
    24: [function(require, module, exports) {
        "use strict";
        var sha256 = require("crypto-js/sha256"),
            hex = require("crypto-js/enc-hex"),
            PLACEHOLDER_HASH = "0000000000000000000000000000000000000000000000000000000000000001",
            PLACEHOLDERS = exports.PLACEHOLDERS = {
                aaid: "<AAID-HERE>",
                email: "<EMAIL-HERE>",
                externalId: "<EXTERNAL-ID-HERE>",
                idfa: "<IDFA-HERE>"
            },
            replaceAll = function(s, _char) {
                return s.split(_char).join("")
            },
            isHex = function(s, len) {
                return s.length == len && !isNaN(Number("0x" + s))
            },
            isValidUuid = function(uuid) {
                var uuidDigits = replaceAll(uuid, "-");
                return isHex(uuidDigits, 32) && "00000000000000000000000000000000" !== uuidDigits
            },
            normalizeEmail = exports.normalizeEmail = function(email) {
                if (email === PLACEHOLDERS.email) return PLACEHOLDER_HASH;
                var localPartAndDomain = email.split("@");
                if (2 != localPartAndDomain.length) return "";
                var localPart = localPartAndDomain[0];
                return localPartAndDomain[0] = replaceAll(localPart, ".").split("+")[0], localPartAndDomain.join("@").toLowerCase()
            };
        window.redditNormalizeEmail = normalizeEmail;
        var normalizeNoOp = function(v) {
                return v
            },
            isValidAaid = exports.isValidAaid = function(aaid) {
                return aaid === PLACEHOLDERS.aaid || isValidUuid(aaid)
            },
            validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            isValidEmail = exports.isValidEmail = function(email) {
                return email === PLACEHOLDERS.email || validEmailRegex.test(email)
            },
            isValidHash = exports.isValidHash = function(hash) {
                return isHex(hash, 64)
            },
            isValidIdfa = exports.isValidIdfa = function(idfa) {
                return idfa === PLACEHOLDERS.idfa || isValidUuid(idfa)
            },
            isValidNoOp = exports.isValidNoOp = function(v) {
                return !0
            },
            valueTypes = ["aaid", "email", "externalId", "idfa", "transactionId", "conversionId"],
            normalizers = {
                aaid: function(aaid) {
                    return aaid === PLACEHOLDERS.aaid ? PLACEHOLDER_HASH : aaid.toLowerCase()
                },
                email: normalizeEmail,
                externalId: function(externalId) {
                    return externalId === PLACEHOLDERS.externalId ? PLACEHOLDER_HASH : normalizeNoOp(externalId)
                },
                idfa: function(idfa) {
                    return idfa === PLACEHOLDERS.idfa ? PLACEHOLDER_HASH : idfa.toUpperCase()
                },
                transactionId: normalizeNoOp,
                conversionId: normalizeNoOp
            },
            validators = {
                aaid: isValidAaid,
                email: isValidEmail,
                externalId: isValidNoOp,
                idfa: isValidIdfa,
                transactionId: isValidNoOp,
                conversionId: isValidNoOp
            };
        exports.hashIfSet = function(value, valueType) {
            if (!value || "string" != typeof value || ! function(valueType) {
                    for (var i = 0; i < valueTypes.length; i++)
                        if (valueType === valueTypes[i]) return !0;
                    return !1
                }(valueType)) return "";
            if (isValidHash(value)) return value.toLowerCase();
            if (!(0, validators[valueType])(value)) return "email" === valueType ? "0000000000000000000000000000000000000000000000000000000000000000" : "";
            var normalizedValue = (0, normalizers[valueType])(value);
            return normalizedValue === PLACEHOLDER_HASH ? normalizedValue : hex.stringify(sha256(normalizedValue))
        }
    }, {
        "crypto-js/enc-hex": 3,
        "crypto-js/sha256": 4
    }],
    25: [function(require, module, exports) {
        "use strict";
        var CONSTANTS = require("../constants");
        exports.getIntegrationProvider = function(integration) {
            switch (integration) {
                case CONSTANTS.INTEGRATION_PROVIDERS.GTM:
                    return CONSTANTS.INTEGRATION_PROVIDERS.GTM;
                default:
                    return CONSTANTS.INTEGRATION_PROVIDERS.REDDIT
            }
        }
    }, {
        "../constants": 6
    }]
}, {}, [19]);