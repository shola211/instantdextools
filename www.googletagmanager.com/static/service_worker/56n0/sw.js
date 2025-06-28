'use strict';
var aa = function(a) {
        function b(d) {
            return a.next(d)
        }

        function c(d) {
            return a.throw(d)
        }
        return new Promise(function(d, e) {
            function f(g) {
                g.done ? d(g.value) : Promise.resolve(g.value).then(b, c).then(f, e)
            }
            f(a.next())
        })
    },
    h = function(a) {
        return aa(a())
    };
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var n = {},
    q = null,
    y = function(a) {
        var b = 3;
        b === void 0 && (b = 0);
        x();
        const c = n[b],
            d = Array(Math.floor(a.length / 3)),
            e = c[64] || "";
        let f = 0,
            g = 0;
        for (; f < a.length - 2; f += 3) {
            const p = a[f],
                r = a[f + 1],
                v = a[f + 2],
                w = c[p >> 2],
                C = c[(p & 3) << 4 | r >> 4],
                u = c[(r & 15) << 2 | v >> 6],
                l = c[v & 63];
            d[g++] = "" + w + C + u + l
        }
        let k = 0,
            m = e;
        switch (a.length - f) {
            case 2:
                k = a[f + 1], m = c[(k & 15) << 2] || e;
            case 1:
                const p = a[f];
                d[g] = "" + c[p >> 2] + c[(p & 3) << 4 | k >> 4] + m + e
        }
        return d.join("")
    },
    D = function(a) {
        const b = a.length;
        let c = b * 3 / 4;
        c % 3 ? c = Math.floor(c) : "=.".indexOf(a[b - 1]) != -1 && (c = "=.".indexOf(a[b -
            2]) != -1 ? c - 2 : c - 1);
        const d = new Uint8Array(c);
        let e = 0;
        ba(a, function(f) {
            d[e++] = f
        });
        return e !== c ? d.subarray(0, e) : d
    },
    ba = function(a, b) {
        function c(e) {
            for (; d < a.length;) {
                const f = a.charAt(d++),
                    g = q[f];
                if (g != null) return g;
                if (!/^[\s\xa0]*$/.test(f)) throw Error("Unknown base64 encoding at char: " + f);
            }
            return e
        }
        x();
        let d = 0;
        for (;;) {
            const e = c(-1),
                f = c(0),
                g = c(64),
                k = c(64);
            if (k === 64 && e === -1) break;
            b(e << 2 | f >> 4);
            g != 64 && (b(f << 4 & 240 | g >> 2), k != 64 && b(g << 6 & 192 | k))
        }
    },
    x = function() {
        if (!q) {
            q = {};
            var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
                b = ["+/=", "+/", "-_=", "-_.", "-_"];
            for (let c = 0; c < 5; c++) {
                const d = a.concat(b[c].split(""));
                n[c] = d;
                for (let e = 0; e < d.length; e++) {
                    const f = d[e];
                    q[f] === void 0 && (q[f] = e)
                }
            }
        }
    };
/*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
var E = class extends Error {
    constructor(a) {
        super(a);
        Object.setPrototypeOf(this, E.prototype)
    }
};
E.prototype.name = "SecurityException";
var F = class extends Error {
    constructor(a) {
        super(a);
        Object.setPrototypeOf(this, F.prototype)
    }
};
F.prototype.name = "InvalidArgumentsException";

function G(...a) {
    let b = 0;
    for (let e = 0; e < arguments.length; e++) b += arguments[e].length;
    const c = new Uint8Array(b);
    let d = 0;
    for (let e = 0; e < arguments.length; e++) c.set(arguments[e], d), d += arguments[e].length;
    return c
}

function H(a) {
    const b = a.replace(/-/g, "+").replace(/_/g, "/");
    return I(globalThis.atob(b))
}

function J(a) {
    let b = "";
    for (let c = 0; c < a.length; c += 1) b += String.fromCharCode(a[c]);
    return globalThis.btoa(b).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function I(a) {
    const b = [];
    let c = 0;
    for (let d = 0; d < a.length; d++) {
        const e = a.charCodeAt(d);
        b[c++] = e
    }
    return new Uint8Array(b)
};
/*

 Copyright 2022 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
var ca = function(a, b, c, d) {
        return h(function*() {
            if (c.length < (a.l ? 28 : 16)) throw new E("ciphertext too short");
            if (b.length !== 12) throw new E("IV must be 12 bytes");
            const e = {
                name: "AES-GCM",
                iv: b,
                tagLength: 128
            };
            d && (e.additionalData = d);
            const f = a.l ? new Uint8Array(c.subarray(12)) : c;
            try {
                return new Uint8Array(yield globalThis.crypto.subtle.decrypt(e, a.key, f))
            } catch (g) {
                throw new E(g.toString());
            }
        })
    },
    da = class {
        constructor({
            key: a,
            l: b
        }) {
            this.key = a;
            this.l = b
        }
        encrypt(a, b, c) {
            const d = this;
            return h(function*() {
                if (a.length !==
                    12) throw new E("IV must be 12 bytes");
                const e = {
                    name: "AES-GCM",
                    iv: a,
                    tagLength: 128
                };
                c && (e.additionalData = c);
                const f = yield globalThis.crypto.subtle.encrypt(e, d.key, b);
                return d.l ? G(a, new Uint8Array(f)) : new Uint8Array(f)
            })
        }
    };

function ea({
    key: a,
    l: b
}) {
    return h(function*() {
        if (![16, 32].includes(a.length)) throw new F("unsupported AES key size: ${n}");
        const c = yield globalThis.crypto.subtle.importKey("raw", a, {
            name: "AES-GCM",
            length: a.length
        }, !1, ["encrypt", "decrypt"]);
        return new da({
            key: c,
            l: b
        })
    })
};

function fa(a) {
    switch (a) {
        case 1:
            return "P-256";
        case 2:
            return "P-384";
        case 3:
            return "P-521"
    }
}

function K(a) {
    switch (a) {
        case "P-256":
            return 1;
        case "P-384":
            return 2;
        case "P-521":
            return 3
    }
    throw new F("unknown curve: " + a);
}

function L(a) {
    switch (a) {
        case 1:
            return 32;
        case 2:
            return 48;
        case 3:
            return 66
    }
}

function ha(a, b) {
    return h(function*() {
        const c = a.algorithm.namedCurve;
        if (!c) throw new F("namedCurve must be provided");
        const d = Object.assign({}, {
                "public": b
            }, a.algorithm),
            e = 8 * L(K(c)),
            f = yield globalThis.crypto.subtle.deriveBits(d, a, e);
        return new Uint8Array(f)
    })
}

function ia(a) {
    return h(function*() {
        return yield globalThis.crypto.subtle.generateKey({
            name: "ECDH",
            namedCurve: a
        }, !0, ["deriveKey", "deriveBits"])
    })
}

function ja(a) {
    return h(function*() {
        const b = yield globalThis.crypto.subtle.exportKey("jwk", a);
        if (b.crv === void 0) throw new F("crv must be provided");
        const c = L(K(b.crv));
        if (b.x === void 0) throw new F("x must be provided");
        if (b.y === void 0) throw new F("y must be provided");
        const d = H(b.x);
        if (d.length !== c) throw new F(`x-coordinate byte-length is invalid (got: ${d.length}, want: ${c}).`);
        const e = H(b.y);
        if (e.length !== c) throw new F(`y-coordinate byte-length is invalid (got: ${e.length}, want: ${c}).`);
        return b
    })
}

function ka(a) {
    return h(function*() {
        const b = a.crv;
        if (!b) throw new F("crv must be provided");
        return yield globalThis.crypto.subtle.importKey("jwk", a, {
            name: "ECDH",
            namedCurve: b
        }, !0, [])
    })
};
var la = O(1, 0),
    ma = O(2, 16),
    na = O(2, 18),
    oa = O(2, 1),
    pa = O(2, 3),
    qa = O(2, 1),
    ra = O(2, 2),
    sa = I("KEM"),
    ta = I("HPKE"),
    ua = I("HPKE-v1");

function O(a, b) {
    const c = new Uint8Array(a);
    for (let d = 0; d < a; d++) c[d] = b >> 8 * (a - d - 1) & 255;
    return c
}

function va({
    K: a,
    J: b,
    G: c
}) {
    return G(ta, a, b, c)
}

function xa({
    o: a,
    m: b,
    j: c
}) {
    return G(ua, c, I(a), b)
}

function ya({
    u: a,
    info: b,
    j: c,
    length: d
}) {
    return G(O(2, d), ua, c, I(a), b)
}

function za(a, b) {
    return h(function*() {
        var c; {
            const d = L(K(a));
            if (b.length !== 1 + 2 * d || b[0] !== 4) throw new E("invalid point");
            c = {
                kty: "EC",
                crv: a,
                x: J(new Uint8Array(b.subarray(1, 1 + d))),
                y: J(new Uint8Array(b.subarray(1 + d, b.length))),
                ext: !0
            }
        }
        return yield ka(c)
    })
}

function Aa(a) {
    return h(function*() {
        const b = a.algorithm,
            c = yield ja(a);
        if (!c.crv) throw new E("Curve has to be defined.");
        var d; {
            const e = L(K(b.namedCurve)),
                f = c.x,
                g = c.y;
            if (f === void 0) throw new F("x must be provided");
            if (g === void 0) throw new F("y must be provided");
            const k = new Uint8Array(1 + 2 * e),
                m = H(g),
                p = H(f);
            k.set(m, 1 + 2 * e - m.length);
            k.set(p, 1 + e - p.length);
            k[0] = 4;
            d = k
        }
        return d
    })
};
var Ba = class {
    constructor(a) {
        this.B = a
    }
    seal({
        key: a,
        nonce: b,
        M: c,
        C: d
    }) {
        const e = this;
        return h(function*() {
            if (a.length !== e.B) throw new E("Unexpected key length: " + a.length.toString());
            return yield(yield ea({
                key: a,
                l: !1
            })).encrypt(b, c, d)
        })
    }
    open({
        key: a,
        nonce: b,
        H: c,
        C: d
    }) {
        const e = this;
        return h(function*() {
            if (a.length !== e.B) throw new E("Unexpected key length: " + a.length.toString());
            return ca(yield ea({
                key: a,
                l: !1
            }), b, c, d)
        })
    }
};
var Ca = class {};

function P(a) {
    if (a == null || !(a instanceof Uint8Array)) throw new F("input must be a non null Uint8Array");
};
var Da = function(a, b) {
        return h(function*() {
            P(b);
            const c = yield globalThis.crypto.subtle.sign({
                name: "HMAC",
                hash: {
                    name: a.hash
                }
            }, a.key, b);
            return new Uint8Array(c.slice(0, a.g))
        })
    },
    Ea = class extends Ca {
        constructor(a, b, c) {
            super();
            this.hash = a;
            this.key = b;
            this.g = c
        }
    };

function Fa(a, b, c) {
    return h(function*() {
        P(b);
        if (!Number.isInteger(c)) throw new F("invalid tag size, must be an integer");
        if (c < 10) throw new F("tag too short, must be at least " + (10).toString() + " bytes");
        switch (a) {
            case "SHA-1":
                if (c > 20) throw new F("tag too long, must not be larger than 20 bytes");
                break;
            case "SHA-256":
                if (c > 32) throw new F("tag too long, must not be larger than 32 bytes");
                break;
            case "SHA-384":
                if (c > 48) throw new F("tag too long, must not be larger than 48 bytes");
                break;
            case "SHA-512":
                if (c >
                    64) throw new F("tag too long, must not be larger than 64 bytes");
                break;
            default:
                throw new F(a + " is not supported");
        }
        const d = yield globalThis.crypto.subtle.importKey("raw", b, {
            name: "HMAC",
            hash: {
                name: a
            },
            length: b.length * 8
        }, !1, ["sign", "verify"]);
        return new Ea(a, d, c)
    })
};
var Ga = function(a, b, c) {
        return h(function*() {
            P(b);
            const d = Q(a);
            let e;
            ((e = c) == null ? 0 : e.length) || (c = new Uint8Array(d));
            P(c);
            return yield Da(yield Fa(a.v, c, d), b)
        })
    },
    R = function(a, {
        m: b,
        o: c,
        j: d,
        salt: e
    }) {
        return h(function*() {
            return yield Ga(a, xa({
                o: c,
                m: b,
                j: d
            }), e)
        })
    },
    Ha = function(a, b, c, d) {
        return h(function*() {
            if (!Number.isInteger(d)) throw new E("length must be an integer");
            if (d <= 0) throw new E("length must be positive");
            const e = Q(a);
            if (d > 255 * e) throw new E("length too large");
            P(c);
            const f = yield Fa(a.v, b, e);
            let g =
                1,
                k = 0,
                m = new Uint8Array(0);
            const p = new Uint8Array(d);
            for (;;) {
                const r = new Uint8Array(m.length + c.length + 1);
                r.set(m, 0);
                r.set(c, m.length);
                r[r.length - 1] = g;
                m = yield Da(f, r);
                if (k + m.length < d) p.set(m, k), k += m.length, g++;
                else {
                    p.set(m.subarray(0, d - k), k);
                    break
                }
            }
            return p
        })
    },
    Ia = function(a, {
        F: b,
        info: c,
        u: d,
        j: e,
        length: f
    }) {
        return h(function*() {
            return yield Ha(a, b, ya({
                u: d,
                info: c,
                j: e,
                length: f
            }), f)
        })
    },
    Ja = function(a, {
        m: b,
        o: c,
        info: d,
        u: e,
        j: f,
        length: g,
        salt: k
    }) {
        return h(function*() {
            const m = yield Ga(a, xa({
                o: c,
                m: b,
                j: f
            }), k);
            return yield Ha(a,
                m, ya({
                    u: e,
                    info: d,
                    j: f,
                    length: g
                }), g)
        })
    },
    Q = function(a) {
        switch (a.v) {
            case "SHA-256":
                return 32;
            case "SHA-512":
                return 64
        }
    },
    S = class {
        constructor(a) {
            this.v = a
        }
    };
var Ka = function(a) {
        var b = a.g;
        const c = new Uint8Array(12);
        for (let f = 0; f < 12; f++) c[f] = Number(b >> BigInt(8 * (12 - f - 1))) & 255;
        var d = a.h;
        if (d.length !== c.length) throw new F("Both byte arrays should be of the same length");
        const e = new Uint8Array(d.length);
        for (let f = 0; f < e.length; f++) e[f] = d[f] ^ c[f];
        if (a.g >= a.i) throw new E("message limit reached");
        a.g += BigInt(1);
        return e
    },
    La = class {
        constructor(a, b, c, d) {
            this.D = a;
            this.key = b;
            this.h = c;
            this.aead = d;
            this.g = BigInt(0);
            this.i = (BigInt(1) << BigInt(96)) - BigInt(1)
        }
        seal(a, b) {
            const c =
                this;
            return h(function*() {
                const d = Ka(c);
                return yield c.aead.seal({
                    key: c.key,
                    nonce: d,
                    M: a,
                    C: b
                })
            })
        }
        open(a, b) {
            const c = this;
            return h(function*() {
                const d = Ka(c);
                return c.aead.open({
                    key: c.key,
                    nonce: d,
                    H: a,
                    C: b
                })
            })
        }
    };

function Ma(a, b, c, d, e, f) {
    return h(function*() {
        var g;
        a: {
            switch (e.B) {
                case 16:
                    g = qa;
                    break a;
                case 32:
                    g = ra;
                    break a
            }
            g = void 0
        }
        var k;
        a: {
            switch (d.v) {
                case "SHA-256":
                    k = oa;
                    break a;
                case "SHA-512":
                    k = pa;
                    break a
            }
            k = void 0
        }
        const m = va({
                K: Na(c),
                J: k,
                G: g
            }),
            p = R(d, {
                m: new Uint8Array(0),
                o: "psk_id_hash",
                j: m
            }),
            r = yield R(d, {
                m: f,
                o: "info_hash",
                j: m
            }), v = yield p, w = G(la, v, r), C = yield R(d, {
                m: new Uint8Array(0),
                o: "secret",
                j: m,
                salt: b
            }), u = Ia(d, {
                F: C,
                info: w,
                u: "key",
                j: m,
                length: e.B
            }), l = yield Ia(d, {
                    F: C,
                    info: w,
                    u: "base_nonce",
                    j: m,
                    length: 12
                }), t =
                yield u;
        return new La(a, t, l, e)
    })
}

function Oa(a, b, c, d, e) {
    return h(function*() {
        const f = yield Pa(b, a);
        return yield Ma(f.D, f.N, b, c, d, e)
    })
};
var Qa = function(a) {
        return h(function*() {
            return yield Aa(a.publicKey)
        })
    },
    Ra = class {
        constructor(a, b) {
            this.privateKey = a;
            this.publicKey = b
        }
    };

function Sa(a) {
    return h(function*() {
        Ta(a.privateKey, "private");
        Ta(a.publicKey, "public");
        return new Ra(a.privateKey, a.publicKey)
    })
}

function Ta(a, b) {
    if (b !== a.type) throw new F(`keyPair ${b} key was of type ${a.type}`);
    const c = a.algorithm;
    if ("ECDH" !== c.name) throw new F(`keyPair ${b} key should be ECDH but found ${c.name}`);
};
var Va = function(a) {
        switch (a) {
            case 1:
                return new Ua(new S("SHA-256"), 1);
            case 3:
                return new Ua(new S("SHA-512"), 3)
        }
    },
    Na = function(a) {
        switch (a.g) {
            case 1:
                return ma;
            case 3:
                return na
        }
    },
    Pa = function(a, b) {
        return h(function*() {
            const c = yield ia(fa(a.g));
            return yield a.h(b, yield Sa(c))
        })
    },
    Wa = function(a, b, c, d) {
        return h(function*() {
            const e = G(c, d),
                f = G(sa, Na(a));
            return yield Ja(a.i, {
                m: b,
                o: "eae_prk",
                info: e,
                u: "shared_secret",
                j: f,
                length: Q(a.i)
            })
        })
    },
    Ua = class {
        constructor(a, b) {
            this.i = a;
            this.g = b;
            this.TEST_ONLY = this.h
        }
        h(a,
            b) {
            const c = this;
            return h(function*() {
                const d = yield za(fa(c.g), a), e = ha(b.privateKey, d), f = yield Qa(b), g = yield e;
                return {
                    N: yield Wa(c, g, f, a), D: f
                }
            })
        }
    };
/*

 Copyright 2024 Google LLC
 SPDX-License-Identifier: Apache-2.0
*/
function Xa(a, b) {
    var c;
    c || (c = new Uint8Array(0));
    let d, e, f;
    switch (a) {
        case 1:
            d = Va(1);
            e = new S("SHA-256");
            f = new Ba(16);
            break;
        case 2:
            d = Va(3);
            e = new S("SHA-512");
            f = new Ba(32);
            break;
        default:
            throw new E(`Unknown HPKE parameters: ${a}`);
    }
    let g = Oa(b, d, e, f, c);
    return k => h(function*() {
        if (!g) throw new E("Context has already been used");
        const m = g;
        g = null;
        const p = yield m, r = yield p.seal(k, new Uint8Array(0));
        return G(p.D, r)
    })
};
var Ya = function(a, b) {
        return h(function*() {
            if (a.status) return W(a.status);
            try {
                const e = D(a.i(b)),
                    f = yield a.context(e);
                var c;
                if (f.length <= 8192) c = String.fromCharCode.apply(null, f);
                else {
                    var d = "";
                    for (let k = 0; k < f.length; k += 8192) d += String.fromCharCode.apply(null, Array.prototype.slice.call(f, k, k + 8192));
                    c = d
                }
                let g = a.i(c);
                g = g.replace(/\//g, "_");
                g = g.replace(/\+/g, "-");
                return W(0, g)
            } catch (e) {
                return W(6)
            }
        })
    },
    $a = class {
        constructor(a, b) {
            this.g = 0;
            this.context = () => h(function*() {
                return new Uint8Array(0)
            });
            this.i = e => b(e);
            if (a) {
                this.L = a.id;
                var c = a.hpkePublicKey.params.kdf,
                    d = a.hpkePublicKey.params.aead;
                if (a.hpkePublicKey.params.kem === "DHKEM_P256_HKDF_SHA256" && c === "HKDF_SHA256" && d === "AES_128_GCM") {
                    this.h = 1;
                    this.A = a;
                    try {
                        let e;
                        const f = D((e = this.A) == null ? void 0 : e.hpkePublicKey.publicKey);
                        f && this.h ? this.context = Xa(this.h, f) : this.status = 11
                    } catch (e) {
                        this.status = 6
                    }
                } else this.status = 7
            } else this.status = 8
        }
        setTimeout(a) {
            this.g = a
        }
        encrypt(a) {
            const b = Ya(this, a);
            return this.g ? Promise.race([b, Za(this.g).then(() => W(14))]) : b
        }
        getEncryptionKeyId() {
            return this.L
        }
    };

function W(a, b) {
    return a === 0 ? {
        cipherText: b,
        status: a
    } : {
        status: a
    }
}

function Za(a) {
    return new Promise(b => void setTimeout(b, a))
};

function ab(a) {
    switch (a) {
        case 0:
            break;
        case 9:
            return "e4";
        case 6:
            return "e5";
        case 14:
            return "e6";
        default:
            return "e7"
    }
};
var bb = class {};
var cb = class extends bb {
    constructor(a) {
        super();
        this.key = a;
        this.g = new da({
            key: a,
            l: !0
        })
    }
    encrypt(a, b) {
        const c = this;
        return h(function*() {
            if (!Number.isInteger(12)) throw new F("n must be a nonnegative integer");
            const d = new Uint8Array(12);
            globalThis.crypto.getRandomValues(d);
            return c.g.encrypt(d, a, b)
        })
    }
};
const X = {};

function db(a) {
    var b = globalThis.btoa;
    X[a] = X[a] || eb(a);
    const c = fb(),
        d = c.then(f => gb(f)),
        e = Promise.all([X[a], d]).then(([f, g]) => hb(f, g));
    return {
        encryptMessage: f => h(function*() {
            const g = (new cb(yield c)).encrypt(D(b(f)));
            return {
                encryptedExportedAesKeyAsBase64: y(new Uint8Array(yield e)),
                encryptedPayloadAsBase64: y(yield g)
            }
        })
    }
}

function fb() {
    return h(function*() {
        return globalThis.crypto.subtle.generateKey({
            name: "AES-GCM",
            length: 256
        }, !0, ["encrypt", "decrypt"])
    })
}

function gb(a) {
    return h(function*() {
        return globalThis.crypto.subtle.exportKey("raw", a)
    })
}

function hb(a, b) {
    return h(function*() {
        return globalThis.crypto.subtle.encrypt({
            name: "RSA-OAEP"
        }, a, b)
    })
}

function eb(a) {
    return h(function*() {
        return globalThis.crypto.subtle.importKey("spki", D(a), {
            name: "RSA-OAEP",
            hash: {
                name: "SHA-256"
            }
        }, !1, ["encrypt"])
    })
};
const ib = /^[0-9A-Fa-f]{64}$/;

function jb(a) {
    try {
        return (new TextEncoder).encode(a)
    } catch (b) {
        const c = [];
        for (let d = 0; d < a.length; d++) {
            let e = a.charCodeAt(d);
            e < 128 ? c.push(e) : e < 2048 ? c.push(192 | e >> 6, 128 | e & 63) : e < 55296 || e >= 57344 ? c.push(224 | e >> 12, 128 | e >> 6 & 63, 128 | e & 63) : (e = 65536 + ((e & 1023) << 10 | a.charCodeAt(++d) & 1023), c.push(240 | e >> 18, 128 | e >> 12 & 63, 128 | e >> 6 & 63, 128 | e & 63))
        }
        return new Uint8Array(c)
    }
}

function kb(a, b) {
    if (a === "" || a === "e0") return Promise.resolve(a);
    let c;
    if ((c = b.crypto) == null ? 0 : c.subtle) {
        if (ib.test(a)) return Promise.resolve(a);
        try {
            const d = jb(a);
            return b.crypto.subtle.digest("SHA-256", d).then(e => lb(e, b)).catch(() => "e2")
        } catch (d) {
            return Promise.resolve("e2")
        }
    } else return Promise.resolve("e1")
}

function lb(a, b) {
    const c = Array.from(new Uint8Array(a)).map(d => String.fromCharCode(d)).join("");
    return b.btoa(c).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
};
/*
 jQuery (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license.
*/
var mb = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,
    nb = function(a) {
        var b;
        if (!(b = !a)) {
            var c;
            if (a == null) c = String(a);
            else {
                var d = mb.exec(Object.prototype.toString.call(Object(a)));
                c = d ? d[1].toLowerCase() : "object"
            }
            b = c != "object"
        }
        if (b || a.nodeType || a == a.window) return !1;
        try {
            if (a.constructor && !Object.prototype.hasOwnProperty.call(Object(a), "constructor") && !Object.prototype.hasOwnProperty.call(Object(a.constructor.prototype), "isPrototypeOf")) return !1
        } catch (f) {
            return !1
        }
        for (var e in a);
        return e ===
            void 0 || Object.prototype.hasOwnProperty.call(Object(a), e)
    };
var ob = function(a, b) {
        a.h = b;
        return a
    },
    pb = function(a, b) {
        b && (Y(b.send_pixel, b.options, a.i), Y(b.create_iframe, b.options, a.A), Y(b.fetch, b.options, a.h))
    },
    qb = function(a, b) {
        b = a.g + b;
        let c = b.indexOf("\n\n");
        for (; c !== -1;) {
            var d = a,
                e;
            a: {
                const [f, g] = b.substring(0, c).split("\n");
                if (f.indexOf("event: message") === 0 && g.indexOf("data: ") === 0) try {
                    e = JSON.parse(g.substring(g.indexOf(":") + 1));
                    break a
                } catch (k) {}
                e = void 0
            }
            pb(d, e);
            b = b.substring(c + 2);
            c = b.indexOf("\n\n")
        }
        a.g = b
    },
    rb = function(a, b) {
        return () => {
            b.fallback_url && b.fallback_url_method &&
                pb(a, {
                    [b.fallback_url_method]: [b.fallback_url],
                    options: {}
                })
        }
    },
    sb = class {
        constructor(a) {
            this.i = a;
            this.g = ""
        }
    };

function Y(a, b, c) {
    if (a && c) {
        var d = a || [];
        if (Array.isArray(d)) {
            var e = nb(b) ? b : {};
            for (const f of d) c(f, e)
        }
    }
};
var tb = {
    O: 0,
    P: 1,
    0: "GET",
    1: "POST"
};
var vb = function(a, b, c) {
        return h(function*() {
            var d;
            a: {
                try {
                    const g = JSON.parse(c.encryptionKeyString || "").keys,
                        k = g[Math.floor(Math.random() * g.length)];
                    d = k && k.hpkePublicKey && k.hpkePublicKey.params && k.hpkePublicKey.params.kem && k.hpkePublicKey.params.kdf && k.hpkePublicKey.params.aead && k.hpkePublicKey.version !== void 0 && k.id && k.hpkePublicKey.publicKey ? k : void 0;
                    break a
                } catch (g) {}
                d = void 0
            }
            const e = d,
                f = new $a(e, a.g.btoa);
            return ub(a, a.g.performance.now(), (e == null ? void 0 : e.id) || "undefined", f.encrypt(b))
        })
    },
    wb =
    function(a, b, c) {
        return h(function*() {
            return ub(a, a.g.performance.now(), "unknown", db(c.encryptionKeyString || "").encryptMessage(b).then(d => ({
                cipherText: d.encryptedPayloadAsBase64 + "!" + d.encryptedExportedAesKeyAsBase64,
                status: 0
            })))
        })
    },
    Z = function(a, b, c) {
        return h(function*() {
            if (!b.url) return {
                failureType: 9,
                command: 0,
                data: "url required."
            };
            const d = yield xb(a, b, c);
            if ("failureType" in d) return d;
            yield yb(a, d, b);
            return d
        })
    },
    zb = function(a, b, c, d) {
        h(function*() {
            let e;
            const f = b.commandType,
                g = b.params;
            switch (f) {
                case 0:
                    e =
                        yield Z(a, g);
                    break;
                default:
                    e = {
                        failureType: 8,
                        command: f,
                        data: `Command with type ${f} unknown.`
                    }
            }
            "failureType" in e ? d(e) : g.suppressSuccessCallback || c(e)
        })
    },
    xb = function(a, b, c) {
        return h(function*() {
            function d(l) {
                return h(function*() {
                    const [t, z] = l.split("|");
                    let [T, M] = t.split("."), A = M, B = m[T];
                    B || (B = t, A = "");
                    const V = N => h(function*() {
                        try {
                            return yield C(z)(N)
                        } catch (U) {
                            throw new Ab(U.message);
                        }
                    });
                    if (!A) {
                        if (typeof B === "string") return yield V(B);
                        const N = B,
                            U = Object.keys(N).map(wa => h(function*() {
                                const Cb = yield V(N[wa]);
                                return `${wa}=${Cb}`
                            }));
                        return (yield Promise.all(U)).join("&")
                    }
                    return typeof B === "object" && B[A] ? yield V(B[A]): l
                })
            }

            function e(l) {
                return h(function*() {
                    let t, z = "";
                    for (; l.match(w) && z !== l;) {
                        z = l;
                        t = l.matchAll(w);
                        const T = [...t].map(A => d(A[1])),
                            M = yield Promise.all(T);
                        M.length !== 0 && (l = l.replace(w, A => M.shift() || A))
                    }
                    return l
                })
            }
            let {
                url: f,
                body: g
            } = b;
            const {
                attributionReporting: k,
                templates: m,
                processResponse: p,
                method: r = 0,
                referer: v
            } = b, w = RegExp("\\${([^${}]*?)}", "g"), C = l => {
                if (l == null) return z => h(function*() {
                    return z
                });
                const t = a.h[l];
                if (t == null) throw Error(`Unknown filter: ${l}`);
                return z => h(function*() {
                    return yield t(z, b)
                })
            };
            try {
                f = yield e(f), g = g ? yield e(g): void 0
            } catch (l) {
                return c == null || c(), {
                    failureType: 9,
                    command: 0,
                    data: `Failed to inject template values: ${l}`
                }
            }
            const u = {
                method: tb[r],
                credentials: "include",
                body: r === 1 ? g : void 0,
                keepalive: !0,
                redirect: "follow"
            };
            if (v) try {
                u.headers = {
                    "X-Effective-Origin": (new URL(v)).origin,
                    "X-Effective-Referer": v
                }
            } catch (l) {}
            p || (u.mode = "no-cors");
            k && (u.attributionReporting = {
                eventSourceEligible: !1,
                triggerEligible: !0
            });
            try {
                const l = yield a.g.fetch(f, u);
                return u.mode === "no-cors" || l.ok ? {
                    data: p ? yield l.text(): f
                } : (c == null || c(), {
                    failureType: 9,
                    command: 0,
                    data: "Fetch failed"
                })
            } catch (l) {
                return c == null || c(), {
                    failureType: 9,
                    command: 0,
                    data: `Fetch failed: ${l}`
                }
            }
        })
    },
    yb = function(a, b, c) {
        return h(function*() {
            if (c.processResponse) {
                var d = [],
                    e;
                e = ob(new sb((f, g) => {
                    d.push(Z(a, {
                        url: f,
                        method: 0,
                        templates: c.templates,
                        processResponse: !1,
                        attributionReporting: g.attribution_reporting
                    }, rb(e, g)))
                }), (f, g) => {
                    d.push(Z(a, {
                        url: f,
                        method: 0,
                        templates: c.templates,
                        processResponse: g.process_response || !1,
                        attributionReporting: g.attribution_reporting
                    }, rb(e, g)))
                });
                qb(e, b.data);
                return Promise.all(d)
            }
        })
    },
    ub = function(a, b, c, d) {
        return d.then(e => {
            const f = a.g.performance.now(),
                g = [`emkid.${c}~`, `ev.${encodeURIComponent(e.cipherText||"")}`, `&_es=${e.status}`];
            b && f && g.push(`&_est=${Math.round(f)-Math.round(b)}`);
            return g.join("")
        }, () => [`ec.${ab(15)}`, "&_es=15"].join("")).catch(() => [`ec.${ab(16)}`, "&_es=16"].join(""))
    },
    Bb = class {
        constructor(a) {
            this.g =
                a;
            this.h = {
                sha256: b => {
                    const c = this;
                    return h(function*() {
                        return yield kb(b, c.g)
                    })
                },
                encode: b => h(function*() {
                    return encodeURIComponent(b)
                }),
                encrypt: (b, c) => {
                    const d = this;
                    return h(function*() {
                        return yield vb(d, b, c)
                    })
                },
                encryptRsa: (b, c) => {
                    const d = this;
                    return h(function*() {
                        return yield wb(d, b, c)
                    })
                }
            }
        }
    };
class Ab extends Error {
    constructor(a) {
        super(a)
    }
};
var Db = function(a, b, c) {
    a.g[b] == null && (a.g[b] = 0, a.h[b] = c, a.i++);
    a.g[b]++;
    return {
        targetId: a.id,
        clientCount: a.i,
        totalLifeMs: Math.round(c - a.A),
        heartbeatCount: a.g[b],
        clientLifeMs: Math.round(c - a.h[b])
    }
};
class Eb {
    constructor(a) {
        this.A = a;
        this.g = {};
        this.h = {};
        this.i = 0;
        this.id = String(Math.floor(Number.MAX_SAFE_INTEGER * Math.random()))
    }
}

function Fb(a) {
    return a.performance && a.performance.now() || Date.now()
}
var Gb = function(a, b) {
    class c {
        constructor(d, e) {
            this.h = d;
            this.g = e;
            this.i = new Eb(Fb(e))
        }
        I(d, e) {
            const f = d.clientId;
            if (d.type === 0) d.stats = Db(this.i, f, Fb(this.g)), e(d);
            else if (d.type === 1) try {
                this.h(d.command, g => {
                    d.result = g;
                    e(d)
                }, g => {
                    d.failure = g;
                    e(d)
                })
            } catch (g) {
                d.failure = {
                    failureType: 11,
                    data: g.toString()
                }, e(d)
            }
        }
    }
    return new c(a, b)
};
(new class {
    constructor(a) {
        this.g = a;
        const b = new Bb(a);
        this.h = Gb((c, d, e) => {
            zb(b, c, d, e)
        }, a)
    }
    init() {
        this.g.addEventListener("install", () => {
            this.g.skipWaiting()
        });
        this.g.addEventListener("activate", a => {
            a.waitUntil(this.g.clients.claim())
        });
        this.g.addEventListener("message", a => {
            const b = a.source;
            if (b) {
                var c = a.data,
                    d = new Promise(e => {
                        this.h.I(c, f => {
                            b.postMessage(f);
                            e(void 0)
                        })
                    });
                a.waitUntil(d)
            }
        })
    }
}(self)).init();