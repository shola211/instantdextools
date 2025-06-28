! function r(o, a, i) {
    function s(t, e) {
        if (!a[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (l) return l(t, !0);
                throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", n
            }
            n = a[t] = {
                exports: {}
            }, o[t][0].call(n.exports, function(e) {
                return s(o[t][1][e] || e)
            }, n, n.exports, r, o, a, i)
        }
        return a[t].exports
    }
    for (var l = "function" == typeof require && require, e = 0; e < i.length; e++) s(i[e]);
    return s
}({
    1: [function(e, t, n) {
        "use strict";
        var r = s(e("@trustpilot/trustbox-framework-vanilla/modules/impression")),
            o = e("@trustpilot/trustbox-framework-vanilla/modules/slim/api"),
            u = e("@trustpilot/trustbox-framework-vanilla/modules/utils"),
            a = e("@trustpilot/trustbox-framework-vanilla/modules/queryString"),
            c = e("@trustpilot/trustbox-framework-vanilla/modules/slim/templates/stars"),
            d = e("@trustpilot/trustbox-framework-vanilla/modules/slim/templates/logo"),
            f = e("@trustpilot/trustbox-framework-vanilla/modules/dom"),
            i = s(e("@trustpilot/trustbox-framework-vanilla/modules/slim/init"));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        r.default.attachImpressionHandler();

        function l(e) {
            var t, n, r, o, a, i, s = e.baseData,
                l = e.locale;
            o = document.getElementById("tp-widget-wrapper"), (0, f.removeClass)(o, "tp-widget-wrapper--placeholder"), (0, u.setHtmlLanguage)(l), !s.translations || (i = s.translations).trustpilotCustomWidget && (document.getElementById("tp-widget-title").innerHTML = i.trustpilotCustomWidget), t = (a = {
                baseData: s,
                locale: l
            }).locale, n = a.baseData, r = n.businessEntity, e = r.numberOfReviews.total, o = r.trustScore, i = n.translations, a = document.getElementById("translations-reviews"), r = document.getElementById(e ? "businessEntity-numberOfReviews-total" : "reviews-summary"), n = document.getElementById("trust-score"), t = e ? (0, u.insertNumberSeparator)(e, t) : i.noReviews, (0, u.setHtmlContent)(r, t), (0, u.setTextContent)(n, o.toFixed(1)), (0, u.setTextContent)(a, i.reviews), (0, c.populateStars)(s, "tp-widget-stars", null, l), (0, d.populateLogo)(), i = (a = {
                baseData: s
            }).baseData, l = i.businessEntity.numberOfReviews.total, a = i.links, i = document.getElementById("profile-link"), a = l ? a.profileUrl : a.evaluateUrl, i.href = p(a), s.settings.customStylesAllowed && (g && (0, u.setFont)(g), y && (0, u.setTextColor)(y))
        }
        var p = (0, u.addUtmParams)("Mini"),
            v = (0, a.getAsObject)(),
            m = v.locale,
            e = v.businessunitId,
            r = v.theme,
            a = v.location,
            h = v.templateId,
            g = v.fontFamily,
            y = v.textColor,
            b = {
                businessUnitId: e,
                locale: m,
                theme: void 0 === r ? "light" : r,
                location: a
            };
        (0, i.default)(function() {
            return (0, o.fetchServiceReviewData)(h)(b, l)
        })
    }, {
        "@trustpilot/trustbox-framework-vanilla/modules/dom": 7,
        "@trustpilot/trustbox-framework-vanilla/modules/impression": 9,
        "@trustpilot/trustbox-framework-vanilla/modules/queryString": 11,
        "@trustpilot/trustbox-framework-vanilla/modules/slim/api": 14,
        "@trustpilot/trustbox-framework-vanilla/modules/slim/init": 19,
        "@trustpilot/trustbox-framework-vanilla/modules/slim/templates/logo": 22,
        "@trustpilot/trustbox-framework-vanilla/modules/slim/templates/stars": 23,
        "@trustpilot/trustbox-framework-vanilla/modules/utils": 26
    }],
    7: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.populateElements = n.removeClass = n.addClass = void 0;
        var r = e("./utils");

        function o(e, t) {
            if (e) {
                e = e.getAttribute("class");
                return -1 !== (e ? e.split(" ") : "").indexOf(t)
            }
            return !1
        }
        n.addClass = function(e, t) {
            var n;
            e && (n = (n = e.getAttribute("class")) ? n.split(" ") : [], o(e, t) || (t = [].concat(function(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }(n), [t]).join(" "), e.setAttribute("class", t)))
        }, n.removeClass = function(e, t) {
            var n;
            e && (n = e.className.split(" "), e.className = n.filter(function(e) {
                return e !== t
            }).join(" "))
        }, n.populateElements = function(e) {
            e.forEach(function(e) {
                var t = e.element,
                    n = e.string,
                    e = e.substitutions;
                n ? (0, r.setHtmlContent)(t, (0, r.makeTranslations)(void 0 === e ? {} : e, n), !1) : (0, r.removeElement)(t)
            })
        }
    }, {
        "./utils": 26
    }],
    9: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var s = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            l = e("./queryString"),
            r = e("./utils"),
            u = o(e("./rootUri")),
            c = o(e("./xhr"));

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function d(e, t) {
            var n, r = {};
            for (n in e) 0 <= t.indexOf(n) || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
            return r
        }

        function f(e, t) {
            var n = t.session,
                r = t.testId,
                o = t.sessionExpiry,
                a = (0, l.getAsObject)(),
                t = a.group,
                a = a.businessunitId;
            t && o && (a = "TrustboxSplitTest_" + a, t = encodeURIComponent(JSON.stringify({
                group: t,
                session: n,
                testId: r
            })), n = o, r = "path=/", o = "domain=" + window.location.hostname.replace(/^.*\.([^.]+\.[^.]+)/, "$1"), document.cookie = [a + "=" + t, r, n, o, "samesite=none", "secure"].join("; "), document.cookie = [a + "-legacy=" + t, r, n, o].join("; "))
        }

        function a(e, t) {
            f(0, t);
            var n, r, o, a, i, r = (n = e, o = (r = t).anonymousId, r.sessionExpiry, a = d(r, ["anonymousId", "sessionExpiry"]), t = (e = (0, l.getAsObject)()).businessunitId, r = e.templateId, e = d(e, ["businessunitId", "templateId"]), i = s({}, e, a, e.group && o ? {
                userId: o
            } : {
                nosettings: 1
            }, {
                businessUnitId: t,
                widgetId: r
            }), r = Object.keys(i).map(function(e) {
                return e + "=" + encodeURIComponent(i[e])
            }).join("&"), (0, u.default)() + "/stats/" + n + "?" + r);
            try {
                (0, c.default)({
                    url: r
                })
            } catch (e) {}
        }
        var i;
        n.default = {
            engagement: function(e) {
                a("TrustboxEngagement", e)
            },
            attachImpressionHandler: function() {
                (0, r.addEventListener)(window, "message", function(e) {
                    if ("string" == typeof e.data) {
                        var t = void 0;
                        try {
                            t = {
                                data: JSON.parse(e.data)
                            }
                        } catch (t) {
                            return
                        }
                        if ("setId" === t.data.command) return i = t.data.widgetId, void window.parent.postMessage(JSON.stringify({
                            command: "impression",
                            widgetId: i
                        }), "*");
                        "impression-received" === t.data.command && (delete t.data.command, a("TrustboxImpression", t.data)), "trustbox-in-viewport" === t.data.command && (delete t.data.command, a("TrustboxView", t.data))
                    }
                })
            }
        }
    }, {
        "./queryString": 11,
        "./rootUri": 12,
        "./utils": 26,
        "./xhr": 27
    }],
    11: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.getAsObject = void 0;
        var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            o = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            a = e("./fn");

        function i(e) {
            var t = ["?", "#"];
            return (0, a.compose)(a.pairsToObject, function(e) {
                return e.split("&").filter(Boolean).map(function(e) {
                    var t = e.split("="),
                        e = o(t, 2),
                        t = e[0],
                        e = e[1];
                    try {
                        return [decodeURIComponent(t), decodeURIComponent(e)]
                    } catch (e) {}
                }).filter(Boolean)
            }, function(e) {
                return -1 !== t.indexOf(e[0]) ? e.substring(1) : e
            })(e)
        }

        function s() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.location,
                t = i(e.search),
                e = i(e.hash);
            return r({}, t, e)
        }
        n.getAsObject = s
    }, {
        "./fn": 8
    }],
    26: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.showTrustBox = n.setTextContent = n.setTextColor = n.setFont = n.setHtmlLanguage = n.setHtmlContent = n.sanitizeHtmlProp = n.sanitizeColor = n.removeElement = n.makeTranslations = n.insertNumberSeparator = n.getOnPageReady = n.addUtmParams = n.addEventListener = void 0;
        var r, i = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            o = e("./dom"),
            a = (e("./models/styleAlignmentPositions"), e("./rootUri")),
            s = (r = a) && r.__esModule ? r : {
                default: r
            };

        function l(t, e, n) {
            t && (t.addEventListener ? t.addEventListener(e, n) : t.attachEvent("on" + e, function(e) {
                (e = e || window.event).preventDefault = e.preventDefault || function() {
                    e.returnValue = !1
                }, e.stopPropagation = e.stopPropagation || function() {
                    e.cancelBubble = !0
                }, n.call(t, e)
            }))
        }

        function u(e) {
            return "string" != typeof e ? e : e.replace(/(<\/?(?:p|b|i|li|ul|a|strong)\/?>)|(?:<\/?.*?\/?>)/gi, "$1")
        }

        function c(t) {
            return function(e) {
                return (e = e) + (-1 === e.indexOf("?") ? "?" : "&") + "utm_medium=trustbox&utm_source=" + t
            }
        }

        function d(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1,
                e = "#" === e[0] ? parseInt(e.slice(1), 16) : parseInt(e, 16);
            return "rgba(" + (e >> 16) + "," + (e >> 8 & 255) + "," + (255 & e) + "," + t + ")"
        }
        n.addEventListener = l, n.addUtmParams = c, n.getOnPageReady = function() {
            return new Promise(function(e) {
                function t() {
                    setTimeout(function() {
                        e()
                    }, 0)
                }
                "complete" === document.readyState ? t() : l(window, "load", function() {
                    t()
                })
            })
        }, n.insertNumberSeparator = function(t, e) {
            try {
                t.toLocaleString()
            } catch (e) {
                return t
            }
            return t.toLocaleString(e || "en-US")
        }, n.makeTranslations = function(n, e) {
            return e ? Object.keys(n).reduce(function(e, t) {
                return e.split(t).join(n[t])
            }, e) : ""
        }, n.removeElement = function(e) {
            if (e && e.parentNode) return e.parentNode.removeChild(e)
        }, n.sanitizeColor = function(e) {
            return "string" == typeof e && /^#(?:[\da-fA-F]{3}){1,2}$/.test(e) ? e : null
        }, n.sanitizeHtmlProp = function(e) {
            return e = "string" == typeof e ? (e = (e = e.replaceAll(">", "")).replaceAll("<", "")).replaceAll('"', "") : e
        }, n.setHtmlContent = function(e, t) {
            e && (e.innerHTML = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2] ? u(t) : t)
        }, n.setHtmlLanguage = function(e) {
            document.documentElement.setAttribute("lang", e)
        }, n.setFont = function(e) {
            var t = (0, s.default)(),
                n = e.replace(/\s/g, "-").toLowerCase(),
                r = document.createElement("link");
            r.rel = "stylesheet", r.href = t + "/fonts/" + n + ".css", document.head.appendChild(r);
            r = e.replace(/\+/g, " "), e = document.createElement("style");
            e.appendChild(document.createTextNode('\n    * {\n      font-family: inherit !important;\n    }\n    body {\n      font-family: "' + r + '", sans-serif !important;\n    }\n    ')), document.head.appendChild(e)
        }, n.setTextColor = function(e) {
            var t = document.createElement("style");
            t.appendChild(document.createTextNode("\n      * {\n        color: inherit !important;\n      }\n      body {\n        color: " + e + " !important;\n      }\n      .bold-underline {\n        border-bottom-color: " + e + " !important;\n      }\n      .bold-underline:hover {\n        border-color: " + function(e, t) {
                var n = function(e) {
                        return 255 < e ? 255 : e < 0 ? 0 : e
                    },
                    r = !1;
                "#" === e[0] && (e = e.slice(1), r = !0);
                var o = parseInt(e, 16);
                if (!o) return e;
                var a = (o >> 16) + t,
                    e = (o >> 8 & 255) + t,
                    t = (255 & o) + t,
                    n = [a = n(a), e = n(e), t = n(t)].map(function(e) {
                        return e <= 15 ? "0" + e.toString(16) : e.toString(16)
                    }),
                    n = i(n, 3);
                return (r ? "#" : "") + (a = n[0]) + (e = n[1]) + (t = n[2])
            }(e, -30) + " !important;\n      }\n      .secondary-text {\n        color: " + d(e, .6) + " !important;\n      }\n      .secondary-text-arrow {\n        border-color: " + d(e, .6) + " transparent transparent transparent !important;\n      }\n      .read-more {\n        color: " + e + " !important;\n      }\n    ")), document.head.appendChild(t)
        }, n.setTextContent = function(e, t) {
            e && ("innerText" in e ? e.innerText = t : e.textContent = t)
        }, n.showTrustBox = function(e, t) {
            var n = document.getElementsByTagName("body")[0],
                r = document.getElementById("tp-widget-wrapper");
            (0, o.addClass)(n, e), (0, o.addClass)(r, "visible"), t || (0, o.addClass)(n, "first-reviewer")
        }
    }, {
        "./dom": 7,
        "./models/styleAlignmentPositions": 10,
        "./rootUri": 12
    }],
    19: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = e("../communication"),
            o = e("./templates/errorFallback");
        n.default = function(e) {
            var t = !1;
            (0, r.onPong)(function() {
                t = !0, "function" == typeof e && e()
            }), (0, r.ping)(), setTimeout(function() {
                t || (0, o.errorFallback)()
            }, 500)
        }
    }, {
        "../communication": 6,
        "./templates/errorFallback": 20
    }],
    23: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.populateStars = void 0;

        function s(e) {
            var t = e.num,
                n = void 0 === (i = e.trustScore) ? null : i,
                r = void 0 === (s = e.wrapperClass) ? "" : s,
                o = e.color,
                a = e.locale,
                i = e.translations,
                s = Math.floor(t),
                e = t === s ? "" : " tp-stars--" + s + "--half",
                o = (0, c.sanitizeColor)(o);
            return (0, l.div)({
                class: r
            }, (0, l.mkElemWithSvg)(f.stars, o ? "tp-stars-custom-color" : "tp-stars tp-stars--" + s + e, {
                rating: t,
                trustScore: n || t,
                color: o,
                locale: a,
                translations: i
            }))
        }
        var l = e("../templating"),
            u = e("../../dom"),
            c = e("../../utils"),
            d = e("../translations"),
            f = e("../assets/stars");
        n.populateStars = function(e) {
            var t = e.businessEntity,
                n = t.stars,
                r = t.trustScore,
                o = t.numberOfReviews.total,
                a = e.translations,
                i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "tp-widget-stars",
                t = arguments[2],
                e = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : d.defaultLocale,
                t = (0, c.sanitizeColor)(t),
                i = "string" == typeof i ? document.getElementById(i) : i;
            (0, u.populateElements)([{
                element: i,
                string: s({
                    num: o ? n : 0,
                    trustScore: r,
                    color: t,
                    locale: e,
                    translations: a
                })
            }])
        }
    }, {
        "../../dom": 7,
        "../../utils": 26,
        "../assets/stars": 18,
        "../templating": 24,
        "../translations": 25
    }],
    22: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.populateLogo = void 0;

        function r() {
            return (0, o.mkElemWithSvg)(i.logo)
        }
        var o = e("../templating"),
            a = e("../../dom"),
            i = e("../assets/logo");
        n.populateLogo = function() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "tp-widget-logo",
                e = "string" == typeof e ? document.getElementById(e) : e;
            (0, a.populateElements)([{
                element: e,
                string: r()
            }])
        }
    }, {
        "../../dom": 7,
        "../assets/logo": 17,
        "../templating": 24
    }],
    14: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.fetchServiceReviewData = void 0;
        var o = e("./fetchData"),
            e = e("./productReviews");
        e.fetchProductData, e.fetchProductReview, o.constructTrustBoxAndComplete, n.fetchServiceReviewData = function(r) {
            return function(e, t, n) {
                (0, o.fetchData)("/trustbox-data/" + r)(e, t, n, o.hasServiceReviews)
            }
        }
    }, {
        "./fetchData": 13,
        "./productReviews": 15
    }],
    2: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.apiCall = void 0;
        var i = r(e("../xhr")),
            s = e("../queryString"),
            l = r(e("../rootUri"));

        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        n.apiCall = function(o, a) {
            return new Promise(function(e, t) {
                var n = void 0,
                    r = void 0;
                if (0 === o.indexOf("/") && (n = a || {}, (0, s.getAsObject)().token && (n.random = function(e) {
                        for (var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; r < e; r++) t += n.charAt(Math.floor(Math.random() * n.length));
                        return t
                    }(20))), 0 === o.indexOf("http")) r = o.replace(/^https?:/, "https:");
                else {
                    if (0 !== o.indexOf("/")) return t();
                    r = (0, l.default)() + o
                }
                return (0, i.default)({
                    url: r,
                    data: n,
                    success: e,
                    error: t
                })
            })
        }
    }, {
        "../queryString": 11,
        "../rootUri": 12,
        "../xhr": 27
    }],
    27: [function(e, t, n) {
        "use strict";

        function i() {
            var e = navigator.userAgent.toLowerCase();
            return -1 !== e.indexOf("msie") && parseInt(e.split("msie")[1])
        }

        function s(t) {
            try {
                return JSON.parse(t.responseText)
            } catch (e) {
                return t.responseText
            }
        }

        function l() {}
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function(e) {
            var t, n, r, o, a = {
                type: e.type || "GET",
                error: e.error || l,
                success: e.success || l,
                data: e.data,
                url: e.url || ""
            };
            "GET" === a.type && a.data && (a.url = a.url + "?" + function(e) {
                var t, n = [];
                for (t in e) e.hasOwnProperty(t) && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
                return n.join("&")
            }(a.data), delete a.data), i() && i() <= 9 ? (r = a, o = new window.XDomainRequest, e = window.location.protocol, r.url = r.url.replace(/https?:/, e), o.open(r.type, r.url), o.onload = function() {
                r.success(s(o))
            }, o.onerror = function() {
                r.error(s(o))
            }, setTimeout(function() {
                o.send(r.data)
            }, 0)) : (t = a, (n = new(window.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0")).open(t.type, t.url, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), n.onreadystatechange = function() {
                4 === n.readyState && (200 <= n.status && n.status < 300 ? t.success(s(n)) : t.error(s(n)))
            }, n.send(t.data))
        }
    }, {}],
    12: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function() {
            var e = "https://widget.trustpilot.com";
            return 0 === e.indexOf("#") ? "https://widget.tp-staging.com" : e
        }
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            o = function(e, t, n) {
                return t && a(e.prototype, t), n && a(e, n), e
            };

        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        var i, s = e("../../fn"),
            l = e("../call"),
            u = e("./util"),
            c = e("./responseProcessor"),
            d = (i = c) && i.__esModule ? i : {
                default: i
            };
        var f = "No reviews available",
            o = (o(p, [{
                key: "consumeReviews",
                value: function(t) {
                    var n = this;
                    return function() {
                        return n.produceReviews().then(function(e) {
                            return t(r({}, n.wrapArgs, {
                                baseData: n.baseData,
                                reviews: e,
                                hasMoreReviews: n.hasMoreReviews,
                                loadMoreReviews: n.consumeReviews.bind(n)
                            }))
                        }).catch(function(e) {
                            if (e === f) return t(r({}, n.wrapArgs, {
                                baseData: n.baseData,
                                reviews: [],
                                hasMoreReviews: !1,
                                loadMoreReviews: n.consumeReviews.bind(n)
                            }));
                            throw e
                        })
                    }
                }
            }, {
                key: "produceReviews",
                value: function() {
                    var n = this;
                    return 0 === this.reviews.length ? Promise.reject(f) : this.reviewsPerPage >= this.reviews.length ? this._fetchReviews().then(function(e) {
                        var t = n._makeResponseProcessor(e);
                        return n.nextPage = t.getNextPageLinks(), (e = n.reviews).push.apply(e, function(e) {
                            if (Array.isArray(e)) {
                                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                                return n
                            }
                            return Array.from(e)
                        }(t.getReviews())), n._takeReviews()
                    }) : Promise.resolve(this._takeReviews())
                }
            }, {
                key: "_takeReviews",
                value: function() {
                    return this.reviews.splice(0, this.reviewsPerPage)
                }
            }, {
                key: "_fetchReviews",
                value: function() {
                    return (0, s.promiseAllObject)((0, s.mapObject)(l.apiCall, this.nextPage))
                }
            }, {
                key: "_makeResponseProcessor",
                value: function(e) {
                    return new d.default(e, {
                        includeImportedReviews: this.includeImportedReviews,
                        displayName: this.baseData.businessEntity.displayName
                    })
                }
            }, {
                key: "hasMoreReviews",
                get: function() {
                    return 0 < this.reviews.length
                }
            }]), p);

        function p(e) {
            var t = e.reviewsPerPage,
                n = e.includeImportedReviews,
                r = e.baseData,
                o = function(e, t) {
                    var n, r = {};
                    for (n in e) 0 <= t.indexOf(n) || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                    return r
                }(e, ["reviewsPerPage", "includeImportedReviews", "baseData"]);
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, p);
            e = (0, u.getNextPageLinks)(function(e) {
                return (0, s.pipeMaybe)((0, s.prop)(e), (0, s.prop)("links"), (0, s.prop)("nextPage"))
            });
            this.reviewsPerPage = t, this.includeImportedReviews = n, this.baseData = r, this.nextPage = e(r, n), this.wrapArgs = o, this.reviews = this._makeResponseProcessor(r).getReviews()
        }
        n.default = o
    }, {
        "../../fn": 8,
        "../call": 2,
        "./responseProcessor": 4,
        "./util": 5
    }],
    8: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            };

        function a(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function i(t) {
            return function(e) {
                return e.filter(t)
            }
        }

        function s(e) {
            return null == e
        }

        function l() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return function(e) {
                return t.reduce(function(e, t) {
                    return s(e) ? e : t(e)
                }, e)
            }
        }

        function u(e) {
            return r(e, 1)[0]
        }
        n.compose = function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return function(e) {
                return t.reduceRight(function(e, t) {
                    return t(e)
                }, e)
            }
        }, n.find = function(e) {
            return l(i(e), u)
        }, n.guard = function(n) {
            return function(e) {
                return s(t = n) || !1 === t ? null : e;
                var t
            }
        }, n.map = function(t) {
            return function(e) {
                return e.map(t)
            }
        }, n.mapObject = function(n, r) {
            return Object.keys(r).reduce(function(e, t) {
                return o({}, e, a({}, t, n(r[t])))
            }, {})
        }, n.pairsToObject = function(e) {
            return e.reduce(function(e, t) {
                var n = r(t, 2),
                    t = n[0],
                    n = n[1];
                return o({}, e, a({}, t, n))
            }, {})
        }, n.pipeMaybe = l, n.promiseAllObject = function(t) {
            var r = Object.keys(t),
                e = r.map(function(e) {
                    return t[e]
                });
            return Promise.all(e).then(function(e) {
                return e.reduce(function(e, t, n) {
                    return o({}, e, a({}, r[n], t))
                }, {})
            })
        }, n.prop = function(e) {
            return function() {
                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})[e]
            }
        }, n.propMaybe = function(t) {
            return function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                return e[t] || e
            }
        }, n.rejectNullaryValues = function(n) {
            return Object.keys(n).reduce(function(e, t) {
                return o({}, e, s(n[t]) ? {} : a({}, t, n[t]))
            }, {})
        }
    }, {}],
    5: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.getNextPageLinks = void 0;
        var o = e("../../fn");
        n.getNextPageLinks = function(r) {
            return function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                    n = r("productReviews")(e),
                    e = (0, o.pipeMaybe)((0, o.guard)(t), r("importedProductReviews"))(e);
                return (0, o.rejectNullaryValues)({
                    productReviews: n,
                    importedProductReviews: e
                })
            }
        }
    }, {
        "../../fn": 8
    }],
    4: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            o = function(e, t, n) {
                return t && a(e.prototype, t), n && a(e, n), e
            };

        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        var i = e("../../fn"),
            s = e("./util");

        function l(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        o(u, [{
            key: "getReviews",
            value: function() {
                var t = this,
                    e = this.response,
                    n = e.productReviews,
                    e = e.importedProductReviews,
                    n = (0, i.pipeMaybe)((0, i.propMaybe)("productReviews"), (0, i.propMaybe)("reviews"))(n) || [],
                    e = (0, i.pipeMaybe)((0, i.guard)(this.includeImportedReviews), (0, i.propMaybe)("importedProductReviews"), (0, i.propMaybe)("productReviews"), (0, i.map)(function(e) {
                        return r({}, e, {
                            verifiedBy: "External" === e.type && e.source ? e.source.name : t.displayName
                        })
                    }))(e) || [];
                return [].concat(l(n), l(e)).sort(function(e, t) {
                    e = e.createdAt, t = t.createdAt;
                    return new Date(t) - new Date(e)
                })
            }
        }, {
            key: "getNextPageLinks",
            value: function() {
                var e = (0, s.getNextPageLinks)(function(e) {
                        return (0, i.pipeMaybe)((0, i.prop)(e), (0, i.prop)("links"), (0, i.find)(function(e) {
                            return "next-page" === e.rel
                        }), (0, i.prop)("href"))
                    }),
                    t = (0, s.getNextPageLinks)(function(e) {
                        return (0, i.pipeMaybe)((0, i.prop)(e), (0, i.prop)(e), (0, i.prop)("links"), (0, i.prop)("nextPage"))
                    })(this.response, this.includeImportedReviews),
                    e = e(this.response, this.includeImportedReviews);
                return r({}, e, t)
            }
        }]), o = u;

        function u(e, t) {
            var n = t.includeImportedReviews,
                t = t.displayName;
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, u), this.response = e, this.includeImportedReviews = n, this.displayName = t
        }
        n.default = o
    }, {
        "../../fn": 8,
        "./util": 5
    }],
    6: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.onPong = n.ping = n.sendAPIDataMessage = n.isLoadedMessage = n.setListener = void 0;
        var r = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            e = e("./utils.js"),
            o = window.parent,
            a = [],
            i = null,
            s = [];

        function l(e) {
            i ? (e.widgetId = i, e = JSON.stringify(e), o.postMessage(e, "*")) : a.push(e)
        }

        function u(t) {
            return function(e) {
                return l(r({}, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, {
                    message: e,
                    command: "message",
                    name: t
                }))
            }
        }

        function c(e) {
            s.push(e)
        }(0, e.addEventListener)(window, "message", function(e) {
            if ("string" == typeof e.data) {
                var t = void 0;
                try {
                    t = {
                        data: JSON.parse(e.data)
                    }
                } catch (t) {
                    return
                }
                if ("setId" === t.data.command) i = t.data.widgetId,
                    function() {
                        for (; a.length;) l(a.pop())
                    }();
                else
                    for (var n = 0; n < s.length; n++)(0, s[n])(t)
            }
        }), n.setListener = c, n.isLoadedMessage = function(e) {
            return "loaded" === e
        }, n.sendAPIDataMessage = function(e) {
            u("popup")("API data", e)
        }, n.ping = function() {
            return l({
                command: "ping"
            })
        }, n.onPong = function(t) {
            c(function(e) {
                "pong" === e.data.command && t(e)
            })
        }
    }, {
        "./utils.js": 26
    }],
    10: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        n.styleAlignmentPositions = ["left", "right"]
    }, {}],
    13: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.hasProductReviews = n.hasServiceReviewsMultiFetch = n.hasServiceReviews = n.multiFetchData = n.fetchData = void 0;
        var l = function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var n = [],
                        r = !0,
                        o = !1,
                        a = void 0;
                    try {
                        for (var i, s = e[Symbol.iterator](); !(r = (i = s.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0);
                    } catch (e) {
                        o = !0, a = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (o) throw a
                        }
                    }
                    return n
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            },
            o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            a = e("../../api/call"),
            u = e("../../utils"),
            c = e("../templates/loader"),
            d = e("../templates/errorFallback"),
            f = e("../../communication"),
            p = e("../../fn");

        function r(e) {
            return 0 < e.businessEntity.numberOfReviews.total
        }

        function v(r) {
            return function(e) {
                var t = e.businessUnitId,
                    n = e.locale,
                    e = function(e, t) {
                        var n, r = {};
                        for (n in e) 0 <= t.indexOf(n) || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                        return r
                    }(e, ["businessUnitId", "locale"]),
                    e = (0, p.rejectNullaryValues)(o({
                        businessUnitId: t,
                        locale: n
                    }, e, {
                        theme: null
                    }));
                return (0, a.apiCall)(r, e)
            }
        }

        function m(i) {
            var s = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                l = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : r;
            return function(e) {
                var t = e.baseData,
                    n = e.locale,
                    r = e.theme,
                    o = e.hasMoreReviews,
                    a = e.loadMoreReviews,
                    e = l(t);
                i({
                    baseData: t,
                    locale: n,
                    hasMoreReviews: o,
                    loadMoreReviews: a
                });
                s && (0, f.setListener)(function(e) {
                    e = e.data;
                    (0, f.isLoadedMessage)(e) && (0, f.sendAPIDataMessage)({
                        baseData: t,
                        locale: n
                    })
                }), (0, u.showTrustBox)(r, e), (0, d.removeErrorFallback)()
            }
        }

        function s(s) {
            return function(e, t, n, r) {
                var o = e[Object.keys(e)[0]],
                    a = o.locale,
                    o = o.theme,
                    i = void 0 === o ? "light" : o,
                    o = (0, p.promiseAllObject)((0, p.mapObject)(v(s), e)),
                    e = (0, u.getOnPageReady)(),
                    r = Promise.all([o, e]).then(function(e) {
                        var t = l(e, 1)[0];
                        return {
                            baseData: (e = t, t = Object.keys(e), h in e && 1 === t.length ? e[h] : e),
                            locale: a,
                            theme: i
                        }
                    }).then(m(t, n, r)).catch(function(e) {
                        if (e && e.FallbackLogo) return (0, d.errorFallback)()
                    });
                (0, c.withLoader)(r)
            }
        }
        var h = "default_singleFetch_f98ac77b";
        n.fetchData = function(i) {
            return function(e, t, n, r) {
                var o, a, e = (a = e, (o = h) in (e = {}) ? Object.defineProperty(e, o, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[o] = a, e);
                s(i)(e, t, n, r)
            }
        }, n.multiFetchData = s, n.hasServiceReviews = r, n.hasServiceReviewsMultiFetch = function(t) {
            return Object.keys(t).some(function(e) {
                return r(t[e])
            })
        }, n.hasProductReviews = function(e) {
            var t = e.productReviewsSummary,
                e = e.importedProductReviewsSummary;
            return 0 < (t ? t.numberOfReviews.total : 0) + (e ? e.numberOfReviews.total : 0)
        }
    }, {
        "../../api/call": 2,
        "../../communication": 6,
        "../../fn": 8,
        "../../utils": 26,
        "../templates/errorFallback": 20,
        "../templates/loader": 21
    }],
    20: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.removeErrorFallback = n.errorFallback = void 0;
        var r = e("../../dom"),
            o = e("../templating"),
            a = e("../../utils"),
            i = e("../assets/logo");
        n.errorFallback = function() {
            var e = document.getElementById(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "tp-widget-fallback");
            (0, r.populateElements)([{
                element: e,
                string: (0, o.a)({
                    href: "https://www.trustpilot.com?utm_medium=trustboxfallback",
                    target: "_blank",
                    rel: "noopener noreferrer"
                }, (0, o.mkElemWithSvg)(i.logo, "fallback-logo"))
            }])
        }, n.removeErrorFallback = function() {
            var e = document.getElementById(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "tp-widget-fallback");
            (0, a.removeElement)(e)
        }
    }, {
        "../../dom": 7,
        "../../utils": 26,
        "../assets/logo": 17,
        "../templating": 24
    }],
    21: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.withLoader = void 0;
        var a = e("../../dom"),
            i = e("../../utils"),
            s = e("../templating"),
            l = e("../assets/logo");
        n.withLoader = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.loaderElement,
                r = void 0 === n ? "tp-widget-loader" : n,
                t = t.delay,
                o = setTimeout(function() {
                    return function(e) {
                        e = document.getElementById(e);
                        (0, a.populateElements)([{
                            element: e,
                            string: (0, s.mkElemWithSvg)(l.logo)
                        }])
                    }(r)
                }, void 0 === t ? 1e3 : t);
            return e.finally(function() {
                var e, t;
                clearTimeout(o), e = r, t = document.getElementById(e), (0, a.addClass)(t, e + "--loaded"), t && (t.addEventListener("animationend", function() {
                    return (0, i.removeElement)(t)
                }), t.addEventListener("webkitAnimationEnd", function() {
                    return (0, i.removeElement)(t)
                }), t.addEventListener("oanimationend", function() {
                    return (0, i.removeElement)(t)
                }))
            })
        }
    }, {
        "../../dom": 7,
        "../../utils": 26,
        "../assets/logo": 17,
        "../templating": 24
    }],
    15: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        Object.assign, e("./fetchData"), e("../../api/call");
        var r, o = e("../../api/reviewFetcher");
        (r = o) && r.__esModule
    }, {
        "../../api/call": 2,
        "../../api/reviewFetcher": 3,
        "./fetchData": 13
    }],
    16: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.svgStarStyle = n.wrapSvg = void 0;
        var o = e("../../utils");
        n.wrapSvg = function(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                r = Object.keys(n).reduce(function(e, t) {
                    return e[t] = (0, o.sanitizeHtmlProp)(n[t]), "color" === t && (e[t] = (0, o.sanitizeColor)(e[t])), e
                }, {});
            return '\n    <div style="position: relative; height: 0; width: 100%; padding: 0; padding-bottom: ' + e.height / e.width * 100 + '%;">\n      ' + t(e, r) + "\n    </div>\n  "
        }, n.svgStarStyle = 'style="position: absolute; height: 100%; width: 100%; left: 0; top: 0;"'
    }, {
        "../../utils": 26
    }],
    17: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.logo = void 0;

        function r(e) {
            var t = "trustpilotLogo-" + Math.random().toString(36).substring(2);
            return '\n    <svg role="img" viewBox="0 0 ' + e.width + " " + e.height + '" aria-labelledby="' + t + '"  width="' + e.width + '" height="' + e.height + '" xmlns="http://www.w3.org/2000/svg" ' + o.svgStarStyle + '>\n      <title id="' + t + '">Trustpilot</title>\n      <path class="tp-logo__text" d="M33.074774 11.07005H45.81806v2.364196h-5.010656v13.290316h-2.755306V13.434246h-4.988435V11.07005h.01111zm12.198892 4.319629h2.355341v2.187433h.04444c.077771-.309334.222203-.60762.433295-.894859.211092-.287239.466624-.56343.766597-.79543.299972-.243048.633276-.430858.999909-.585525.366633-.14362.744377-.220953 1.12212-.220953.288863 0 .499955.011047.611056.022095.1111.011048.222202.033143.344413.04419v2.408387c-.177762-.033143-.355523-.055238-.544395-.077333-.188872-.022096-.366633-.033143-.544395-.033143-.422184 0-.822148.08838-1.199891.254096-.377744.165714-.699936.41981-.977689.740192-.277753.331429-.499955.729144-.666606 1.21524-.166652.486097-.244422 1.03848-.244422 1.668195v5.39125h-2.510883V15.38968h.01111zm18.220567 11.334883H61.02779v-1.579813h-.04444c-.311083.574477-.766597 1.02743-1.377653 1.369908-.611055.342477-1.233221.51924-1.866497.51924-1.499864 0-2.588654-.364573-3.25526-1.104765-.666606-.740193-.999909-1.856005-.999909-3.347437V15.38968h2.510883v6.948968c0 .994288.188872 1.701337.577725 2.1101.377744.408763.922139.618668 1.610965.618668.533285 0 .96658-.077333 1.322102-.243048.355524-.165714.644386-.37562.855478-.65181.222202-.265144.377744-.596574.477735-.972194.09999-.37562.144431-.784382.144431-1.226288v-6.573349h2.510883v11.323836zm4.27739-3.634675c.07777.729144.355522 1.237336.833257 1.535623.488844.287238 1.06657.441905 1.744286.441905.233312 0 .499954-.022095.799927-.055238.299973-.033143.588836-.110476.844368-.209905.266642-.099429.477734-.254096.655496-.452954.166652-.198857.244422-.452953.233312-.773335-.01111-.320381-.133321-.585525-.355523-.784382-.222202-.209906-.499955-.364573-.844368-.497144-.344413-.121525-.733267-.232-1.17767-.320382-.444405-.088381-.888809-.18781-1.344323-.287239-.466624-.099429-.922138-.232-1.355432-.37562-.433294-.14362-.822148-.342477-1.166561-.596573-.344413-.243048-.622166-.56343-.822148-.950097-.211092-.386668-.311083-.861716-.311083-1.436194 0-.618668.155542-1.12686.455515-1.54667.299972-.41981.688826-.75124 1.14434-1.005336.466624-.254095.97769-.430858 1.544304-.541334.566615-.099429 1.11101-.154667 1.622075-.154667.588836 0 1.15545.066286 1.688736.18781.533285.121524 1.02213.320381 1.455423.60762.433294.276191.788817.640764 1.07768 1.08267.288863.441905.466624.98324.544395 1.612955h-2.621984c-.122211-.596572-.388854-1.005335-.822148-1.204193-.433294-.209905-.933248-.309334-1.488753-.309334-.177762 0-.388854.011048-.633276.04419-.244422.033144-.466624.088382-.688826.165715-.211092.077334-.388854.198858-.544395.353525-.144432.154667-.222203.353525-.222203.60762 0 .309335.111101.552383.322193.740193.211092.18781.488845.342477.833258.475048.344413.121524.733267.232 1.177671.320382.444404.088381.899918.18781 1.366542.287239.455515.099429.899919.232 1.344323.37562.444404.14362.833257.342477 1.17767.596573.344414.254095.622166.56343.833258.93905.211092.37562.322193.850668.322193 1.40305 0 .673906-.155541 1.237336-.466624 1.712385-.311083.464001-.711047.850669-1.199891 1.137907-.488845.28724-1.04435.508192-1.644295.640764-.599946.132572-1.199891.198857-1.788727.198857-.722156 0-1.388762-.077333-1.999818-.243048-.611056-.165714-1.14434-.408763-1.588745-.729144-.444404-.33143-.799927-.740192-1.05546-1.226289-.255532-.486096-.388853-1.071621-.411073-1.745528h2.533103v-.022095zm8.288135-7.700208h1.899828v-3.402675h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155542.486096.07777.132572.199981.232.366633.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.13332-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222zm8.454788 0h2.377562V16.9253h.04444c.355523-.662858.844368-1.12686 1.477644-1.414098.633276-.287239 1.310992-.430858 2.055369-.430858.899918 0 1.677625.154667 2.344231.475048.666606.309335 1.222111.740193 1.666515 1.292575.444405.552382.766597 1.193145.9888 1.92229.222202.729145.333303 1.513527.333303 2.3421 0 .762288-.099991 1.50248-.299973 2.20953-.199982.718096-.499955 1.347812-.899918 1.900194-.399964.552383-.911029.98324-1.533194 1.31467-.622166.33143-1.344323.497144-2.18869.497144-.366634 0-.733267-.033143-1.0999-.099429-.366634-.066286-.722157-.176762-1.05546-.320381-.333303-.14362-.655496-.33143-.933249-.56343-.288863-.232-.522175-.497144-.722157-.79543h-.04444v5.656393h-2.510883V15.38968zm8.77698 5.67849c0-.508193-.06666-1.005337-.199981-1.491433-.133321-.486096-.333303-.905907-.599946-1.281527-.266642-.37562-.599945-.673906-.988799-.894859-.399963-.220953-.855478-.342477-1.366542-.342477-1.05546 0-1.855387.364572-2.388672 1.093717-.533285.729144-.799928 1.701337-.799928 2.916578 0 .574478.066661 1.104764.211092 1.59086.144432.486097.344414.905908.633276 1.259432.277753.353525.611056.629716.99991.828574.388853.209905.844367.309334 1.355432.309334.577725 0 1.05546-.121524 1.455423-.353525.399964-.232.722157-.541335.97769-.905907.255531-.37562.444403-.79543.555504-1.270479.099991-.475049.155542-.961145.155542-1.458289zm4.432931-9.99812h2.510883v2.364197h-2.510883V11.07005zm0 4.31963h2.510883v11.334883h-2.510883V15.389679zm4.755124-4.31963h2.510883v15.654513h-2.510883V11.07005zm10.210184 15.963847c-.911029 0-1.722066-.154667-2.433113-.452953-.711046-.298287-1.310992-.718097-1.810946-1.237337-.488845-.530287-.866588-1.160002-1.12212-1.889147-.255533-.729144-.388854-1.535622-.388854-2.408386 0-.861716.133321-1.657147.388853-2.386291.255533-.729145.633276-1.35886 1.12212-1.889148.488845-.530287 1.0999-.93905 1.810947-1.237336.711047-.298286 1.522084-.452953 2.433113-.452953.911028 0 1.722066.154667 2.433112.452953.711047.298287 1.310992.718097 1.810947 1.237336.488844.530287.866588 1.160003 1.12212 1.889148.255532.729144.388854 1.524575.388854 2.38629 0 .872765-.133322 1.679243-.388854 2.408387-.255532.729145-.633276 1.35886-1.12212 1.889147-.488845.530287-1.0999.93905-1.810947 1.237337-.711046.298286-1.522084.452953-2.433112.452953zm0-1.977528c.555505 0 1.04435-.121524 1.455423-.353525.411074-.232.744377-.541335 1.01102-.916954.266642-.37562.455513-.806478.588835-1.281527.12221-.475049.188872-.961145.188872-1.45829 0-.486096-.066661-.961144-.188872-1.44724-.122211-.486097-.322193-.905907-.588836-1.281527-.266642-.37562-.599945-.673907-1.011019-.905907-.411074-.232-.899918-.353525-1.455423-.353525-.555505 0-1.04435.121524-1.455424.353525-.411073.232-.744376.541334-1.011019.905907-.266642.37562-.455514.79543-.588835 1.281526-.122211.486097-.188872.961145-.188872 1.447242 0 .497144.06666.98324.188872 1.458289.12221.475049.322193.905907.588835 1.281527.266643.37562.599946.684954 1.01102.916954.411073.243048.899918.353525 1.455423.353525zm6.4883-9.66669h1.899827v-3.402674h2.510883v3.402675h2.26646v1.867052h-2.26646v6.054109c0 .265143.01111.486096.03333.684954.02222.18781.07777.353524.155541.486096.077771.132572.199982.232.366634.298287.166651.066285.377743.099428.666606.099428.177762 0 .355523 0 .533285-.011047.177762-.011048.355523-.033143.533285-.077334v1.933338c-.277753.033143-.555505.055238-.811038.088381-.266642.033143-.533285.04419-.811037.04419-.666606 0-1.199891-.066285-1.599855-.18781-.399963-.121523-.722156-.309333-.944358-.552381-.233313-.243049-.377744-.541335-.466625-.905907-.07777-.364573-.133321-.784383-.144431-1.248384v-6.683825h-1.899827v-1.889147h-.02222z" fill="#191919"/>\n      <path class="tp-logo__star" fill="#00B67A" d="M30.141707 11.07005H18.63164L15.076408.177071l-3.566342 10.892977L0 11.059002l9.321376 6.739063-3.566343 10.88193 9.321375-6.728016 9.310266 6.728016-3.555233-10.88193 9.310266-6.728016z"/>\n      <path class="tp-logo__star-notch" fill="#005128" d="M21.631369 20.26169l-.799928-2.463625-5.755033 4.153914z"/>\n    </svg>\n  '
        }
        var o = e("./helpers"),
            a = {
                width: 126,
                height: 31
            };
        n.logo = function() {
            return (0, o.wrapSvg)(a, r)
        }
    }, {
        "./helpers": 16
    }],
    18: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.stars = void 0;

        function r(e, t) {
            var n = t.rating,
                r = t.trustScore,
                o = t.color,
                a = t.translations,
                t = void 0 === (i = t.locale) ? l.defaultLocale : i,
                i = "starRating-" + Math.random().toString(36).substring(2),
                r = (0, l.getFrameworkTranslation)("starRating", a, {
                    "[ratingStars]": r,
                    "[totalStars]": 5
                }),
                t = (0, l.formatLocale)(t);
            return '\n    <svg role="img" viewBox="0 0 ' + e.width + " " + e.height + '" xmlns="http://www.w3.org/2000/svg" ' + s.svgStarStyle + '>\n      <title id="' + i + '" lang=' + t + ">" + r + '</title>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (1 <= n && o ? o : u) + '" d="M0 46.330002h46.375586V0H0z"/>\n          <path class="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (2 <= n && o ? o : u) + '" d="M51.24816 46.330002h46.375587V0H51.248161z"/>\n          <path class="tp-star__canvas--half" fill="' + (1.5 <= n && o ? o : u) + '" d="M51.24816 46.330002h23.187793V0H51.248161z"/>\n          <path class="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (3 <= n && o ? o : u) + '" d="M102.532209 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (2.5 <= n && o ? o : u) + '" d="M102.532209 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (4 <= n && o ? o : u) + '" d="M153.815458 46.330002h46.375586V0h-46.375586z"/>\n          <path class="tp-star__canvas--half" fill="' + (3.5 <= n && o ? o : u) + '" d="M153.815458 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n      <g class="tp-star">\n          <path class="tp-star__canvas" fill="' + (5 === n && o ? o : u) + '" d="M205.064416 46.330002h46.375587V0h-46.375587z"/>\n          <path class="tp-star__canvas--half" fill="' + (4.5 <= n && o ? o : u) + '" d="M205.064416 46.330002h23.187793V0h-23.187793z"/>\n          <path class="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"/>\n      </g>\n    </svg>\n  '
        }
        var s = e("./helpers"),
            l = e("../translations"),
            u = "#dcdce6",
            o = {
                width: 251,
                height: 46
            };
        n.stars = function(e) {
            return (0, s.wrapSvg)(o, r, e)
        }
    }, {
        "../translations": 25,
        "./helpers": 16
    }],
    25: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = "en-US",
            o = {
                da: "DK",
                en: "US",
                ja: "JP",
                nb: "NO",
                sv: "SE"
            };
        n.defaultLocale = r, n.formatLocale = function(e) {
            if (!e) return r;
            var t = e.split("-"),
                n = t[0],
                e = (e = t[1]) || (o[t = n] || t);
            return n && e ? n + "-" + e.toUpperCase() : r
        }, n.getFrameworkTranslation = function(e, t) {
            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : [],
                t = function(e, t) {
                    e = e.split(".");
                    return t = t, e.reduce(function(e, t) {
                        return e && e[t] ? e[t] : ""
                    }, t || {})
                }(e, t),
                t = Object.keys(n).reduce(function(e, t) {
                    return e.replace(t, n[t])
                }, t);
            return r.reduce(function(e, t) {
                return e.replace("[LINK-END]", "</a>").replace("[LINK-BEGIN]", t)
            }, t)
        }
    }, {}],
    24: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.mkElemWithSvg = n.div = n.a = void 0;
        var o = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
                }
                return e
            },
            r = e("../utils");

        function a(t) {
            return Object.keys(t).map(function(e) {
                return e + '="' + (0, r.sanitizeHtmlProp)(t[e]) + '"'
            }).join(" ")
        }

        function i(o) {
            return function(e) {
                for (var t = arguments.length, n = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                return "<" + o + " " + a(e) + ">" + (e = n, [].concat.apply([], e).join("\n")) + "</" + o + ">"
            }
        }
        var s, e = i("a"),
            l = i("div");
        i("img"), i("label"), i("span"), s = "input", i("object");
        n.a = e, n.div = l, n.mkElemWithSvg = function(e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "",
                n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                r = n.ariaHideSvg,
                n = function(e, t) {
                    var n, r = {};
                    for (n in e) 0 <= t.indexOf(n) || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
                    return r
                }(n, ["ariaHideSvg"]);
            return l(o({
                class: t
            }, r ? {
                "aria-hidden": "true"
            } : {}), e(n))
        }
    }, {
        "../utils": 26
    }]
}, {}, [1]);
//# sourceMappingURL=main.js.map