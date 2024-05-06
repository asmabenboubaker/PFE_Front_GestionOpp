
!(function (t, e) {
    if ("function" == typeof define && define.amd) define(["jquery"], e);
    else if ("undefined" != typeof exports) e(require("jquery"));
    else {
        e(t.jquery), (t.metisMenu = {});
    }
})(this, function (t) {
    "use strict";
    var e;
    (e = t) && e.__esModule;
    var r =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
            }
            : function (t) {
                return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
            };
    var a,
        i,
        o,
        s,
        n,
        h,
        l,
        g,
        p = (function (s) {
            var e = !1,
                i = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend",
                };
            function t(t) {
                var e = this,
                    i = !1;
                return (
                    s(this).one(n.TRANSITION_END, function () {
                        i = !0;
                    }),
                        setTimeout(function () {
                            i || n.triggerTransitionEnd(e);
                        }, t),
                        this
                );
            }
            var n = {
                TRANSITION_END: "mmTransitionEnd",
                triggerTransitionEnd: function (t) {
                    s(t).trigger(e.end);
                },
                supportsTransitionEnd: function () {
                    return Boolean(e);
                },
            };
            return (
                (e = (function () {
                    if (window.QUnit) return !1;
                    var t = document.createElement("mm");
                    for (var e in i) if (void 0 !== t.style[e]) return { end: i[e] };
                    return !1;
                })()),
                    (s.fn.emulateTransitionEnd = t),
                n.supportsTransitionEnd() &&
                (s.event.special[n.TRANSITION_END] = {
                    bindType: e.end,
                    delegateType: e.end,
                    handle: function (t) {
                        if (s(t.target).is(this))
                            return t.handleObj.handler.apply(this, arguments);
                    },
                }),
                    n
            );
        })(jQuery);
    (a = jQuery),
        (s = "." + (o = i = "metisMenu")),
        (n = a.fn[i]),
        (h = {
            toggle: !0,
            preventDefault: !0,
            activeClass: "active",
            collapseClass: "collapse",
            collapseInClass: "in",
            collapsingClass: "collapsing",
            triggerElement: "a",
            parentTrigger: "li",
            subMenu: "ul",
        }),
        (l = {
            SHOW: "show" + s,
            SHOWN: "shown" + s,
            HIDE: "hide" + s,
            HIDDEN: "hidden" + s,
            CLICK_DATA_API: "click" + s + ".data-api",
        }),
        (g = (function () {
            function n(t, e) {
                !(function (t, e) {
                    if (!(t instanceof e))
                        throw new TypeError("Cannot call a class as a function");
                })(this, n),
                    (this._element = t),
                    (this._config = this._getConfig(e)),
                    (this._transitioning = null),
                    this.init();
            }
            return (
                (n.prototype.init = function () {
                    var r = this;
                    a(this._element)
                        .find(this._config.parentTrigger + "." + this._config.activeClass)
                        .has(this._config.subMenu)
                        .children(this._config.subMenu)
                        .attr("aria-expanded", !0)
                        .addClass(
                            this._config.collapseClass + " " + this._config.collapseInClass,
                        ),
                        a(this._element)
                            .find(this._config.parentTrigger)
                            .not("." + this._config.activeClass)
                            .has(this._config.subMenu)
                            .children(this._config.subMenu)
                            .attr("aria-expanded", !1)
                            .addClass(this._config.collapseClass),
                        a(this._element)
                            .find(this._config.parentTrigger)
                            .has(this._config.subMenu)
                            .children(this._config.triggerElement)
                            .on(l.CLICK_DATA_API, function (t) {
                                var e = a(this),
                                    i = e.parent(r._config.parentTrigger),
                                    s = i
                                        .siblings(r._config.parentTrigger)
                                        .children(r._config.triggerElement),
                                    n = i.children(r._config.subMenu);
                                r._config.preventDefault && t.preventDefault(),
                                "true" !== e.attr("aria-disabled") &&
                                (i.hasClass(r._config.activeClass)
                                    ? (e.attr("aria-expanded", !1), r._hide(n))
                                    : (r._show(n),
                                        e.attr("aria-expanded", !0),
                                    r._config.toggle && s.attr("aria-expanded", !1)),
                                r._config.onTransitionStart &&
                                r._config.onTransitionStart(t));
                            });
                }),
                    (n.prototype._show = function (t) {
                        if (
                            !this._transitioning &&
                            !a(t).hasClass(this._config.collapsingClass)
                        ) {
                            var e = this,
                                i = a(t),
                                s = a.Event(l.SHOW);
                            if ((i.trigger(s), !s.isDefaultPrevented())) {
                                i
                                    .parent(this._config.parentTrigger)
                                    .addClass(this._config.activeClass),
                                this._config.toggle &&
                                this._hide(
                                    i
                                        .parent(this._config.parentTrigger)
                                        .siblings()
                                        .children(
                                            this._config.subMenu +
                                            "." +
                                            this._config.collapseInClass,
                                        )
                                        .attr("aria-expanded", !1),
                                ),
                                    i
                                        .removeClass(this._config.collapseClass)
                                        .addClass(this._config.collapsingClass)
                                        .height(0),
                                    this.setTransitioning(!0);
                                var n = function () {
                                    i
                                        .removeClass(e._config.collapsingClass)
                                        .addClass(
                                            e._config.collapseClass + " " + e._config.collapseInClass,
                                        )
                                        .height("")
                                        .attr("aria-expanded", !0),
                                        e.setTransitioning(!1),
                                        i.trigger(l.SHOWN);
                                };
                                p.supportsTransitionEnd()
                                    ? i
                                        .height(i[0].scrollHeight)
                                        .one(p.TRANSITION_END, n)
                                        .emulateTransitionEnd(350)
                                    : n();
                            }
                        }
                    }),
                    (n.prototype._hide = function (t) {
                        if (
                            !this._transitioning &&
                            a(t).hasClass(this._config.collapseInClass)
                        ) {
                            var e = this,
                                i = a(t),
                                s = a.Event(l.HIDE);
                            if ((i.trigger(s), !s.isDefaultPrevented())) {
                                i
                                    .parent(this._config.parentTrigger)
                                    .removeClass(this._config.activeClass),
                                    i.height(i.height())[0].offsetHeight,
                                    i
                                        .addClass(this._config.collapsingClass)
                                        .removeClass(this._config.collapseClass)
                                        .removeClass(this._config.collapseInClass),
                                    this.setTransitioning(!0);
                                var n = function () {
                                    e._transitioning &&
                                    e._config.onTransitionEnd &&
                                    e._config.onTransitionEnd(),
                                        e.setTransitioning(!1),
                                        i.trigger(l.HIDDEN),
                                        i
                                            .removeClass(e._config.collapsingClass)
                                            .addClass(e._config.collapseClass)
                                            .attr("aria-expanded", !1);
                                };
                                p.supportsTransitionEnd()
                                    ? 0 == i.height() || "none" == i.css("display")
                                        ? n()
                                        : i
                                            .height(0)
                                            .one(p.TRANSITION_END, n)
                                            .emulateTransitionEnd(350)
                                    : n();
                            }
                        }
                    }),
                    (n.prototype.setTransitioning = function (t) {
                        this._transitioning = t;
                    }),
                    (n.prototype.dispose = function () {
                        a.removeData(this._element, o),
                            a(this._element)
                                .find(this._config.parentTrigger)
                                .has(this._config.subMenu)
                                .children(this._config.triggerElement)
                                .off("click"),
                            (this._transitioning = null),
                            (this._config = null),
                            (this._element = null);
                    }),
                    (n.prototype._getConfig = function (t) {
                        return (t = a.extend({}, h, t));
                    }),
                    (n._jQueryInterface = function (s) {
                        return this.each(function () {
                            var t = a(this),
                                e = t.data(o),
                                i = a.extend(
                                    {},
                                    h,
                                    t.data(),
                                    "object" === (void 0 === s ? "undefined" : r(s)) && s,
                                );
                            if (
                                (!e && /dispose/.test(s) && this.dispose(),
                                e || ((e = new n(this, i)), t.data(o, e)),
                                "string" == typeof s)
                            ) {
                                if (void 0 === e[s])
                                    throw new Error('No method named "' + s + '"');
                                e[s]();
                            }
                        });
                    }),
                    n
            );
        })()),
        (a.fn[i] = g._jQueryInterface),
        (a.fn[i].Constructor = g),
        (a.fn[i].noConflict = function () {
            return (a.fn[i] = n), g._jQueryInterface;
        });
}),
    (function (n) {
        "use strict";
        var r = function (t, e) {
            (this.$element = n(t)), (this.options = n.extend({}, r.defaults, e));
        };
        (r.defaults = {
            transition_delay: 300,
            refresh_speed: 50,
            display_text: "none",
            use_percentage: !0,
            percent_format: function (t) {
                return t + "%";
            },
            amount_format: function (t, e) {
                return t + " / " + e;
            },
            update: n.noop,
            done: n.noop,
            fail: n.noop,
        }),
            (r.prototype.transition = function () {
                var a = this.$element,
                    o = a.parent(),
                    h = this.$back_text,
                    l = this.$front_text,
                    g = this.options,
                    p = parseInt(a.attr("data-transitiongoal")),
                    u = parseInt(a.attr("aria-valuemin")) || 0,
                    c = parseInt(a.attr("aria-valuemax")) || 100,
                    d = o.hasClass("vertical"),
                    f =
                        g.update && "function" == typeof g.update
                            ? g.update
                            : r.defaults.update,
                    v = g.done && "function" == typeof g.done ? g.done : r.defaults.done,
                    t = g.fail && "function" == typeof g.fail ? g.fail : r.defaults.fail;
                if (isNaN(p)) t("data-transitiongoal not set");
                else {
                    var e,
                        m = Math.round((100 * (p - u)) / (c - u));
                    if ("center" === g.display_text && !h && !l)
                        (this.$back_text = h =
                            n("<span>").addClass("progressbar-back-text").prependTo(o)),
                            (this.$front_text = l =
                                n("<span>").addClass("progressbar-front-text").prependTo(a)),
                            d
                                ? ((e = o.css("height")),
                                    h.css({ height: e, "line-height": e }),
                                    l.css({ height: e, "line-height": e }),
                                    n(window).resize(function () {
                                        (e = o.css("height")),
                                            h.css({ height: e, "line-height": e }),
                                            l.css({ height: e, "line-height": e });
                                    }))
                                : ((e = o.css("width")),
                                    l.css({ width: e }),
                                    n(window).resize(function () {
                                        (e = o.css("width")), l.css({ width: e });
                                    }));
                    setTimeout(function () {
                        var t, e, i, s, n;
                        d ? a.css("height", m + "%") : a.css("width", m + "%");
                        var r = setInterval(function () {
                            (s = d
                                ? ((i = a.height()), o.height())
                                : ((i = a.width()), o.width())),
                                (t = Math.round((100 * i) / s)),
                                (e = Math.round(u + (i / s) * (c - u))),
                            m <= t && ((t = m), (e = p), v(a), clearInterval(r)),
                            "none" !== g.display_text &&
                            ((n = g.use_percentage
                                ? g.percent_format(t)
                                : g.amount_format(e, c, u)),
                                "fill" === g.display_text
                                    ? a.text(n)
                                    : "center" === g.display_text && (h.text(n), l.text(n))),
                                a.attr("aria-valuenow", e),
                                f(t, a);
                        }, g.refresh_speed);
                    }, g.transition_delay);
                }
            });
        var t = n.fn.progressbar;
        (n.fn.progressbar = function (s) {
            return this.each(function () {
                var t = n(this),
                    e = t.data("bs.progressbar"),
                    i = "object" == typeof s && s;
                e && i && n.extend(e.options, i),
                e || t.data("bs.progressbar", (e = new r(this, i))),
                    e.transition();
            });
        }),
            (n.fn.progressbar.Constructor = r),
            (n.fn.progressbar.noConflict = function () {
                return (n.fn.progressbar = t), this;
            });
    })(window.jQuery),
    (function (S, D, z) {
        var t;
        (t = function (A) {
            "use strict";
            var t,
                e,
                m,
                L,
                C,
                E,
                N,
                O,
                g,
                w,
                i,
                r,
                p,
                F,
                u,
                s,
                n,
                W,
                B,
                o,
                a,
                h,
                l,
                _,
                c,
                d,
                f,
                v,
                x,
                y = {},
                b = 0;
            (t = function () {
                return {
                    common: {
                        type: "line",
                        lineColor: "#00f",
                        fillColor: "#cdf",
                        defaultPixelsPerValue: 3,
                        width: "auto",
                        height: "auto",
                        composite: !1,
                        tagValuesAttribute: "values",
                        tagOptionsPrefix: "spark",
                        enableTagOptions: !1,
                        enableHighlight: !0,
                        highlightLighten: 1.4,
                        tooltipSkipNull: !0,
                        tooltipPrefix: "",
                        tooltipSuffix: "",
                        disableHiddenCheck: !1,
                        numberFormatter: !1,
                        numberDigitGroupCount: 3,
                        numberDigitGroupSep: ",",
                        numberDecimalMark: ".",
                        disableTooltips: !1,
                        disableInteraction: !1,
                    },
                    line: {
                        spotColor: "#f80",
                        highlightSpotColor: "#5f5",
                        highlightLineColor: "#f22",
                        spotRadius: 1.5,
                        minSpotColor: "#f80",
                        maxSpotColor: "#f80",
                        lineWidth: 1,
                        normalRangeMin: z,
                        normalRangeMax: z,
                        normalRangeColor: "#ccc",
                        drawNormalOnTop: !1,
                        chartRangeMin: z,
                        chartRangeMax: z,
                        chartRangeMinX: z,
                        chartRangeMaxX: z,
                        tooltipFormat: new m(
                            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}',
                        ),
                    },
                    bar: {
                        barColor: "#3366cc",
                        negBarColor: "#f44",
                        stackedBarColor: [
                            "#3366cc",
                            "#dc3912",
                            "#ff9900",
                            "#109618",
                            "#66aa00",
                            "#dd4477",
                            "#0099c6",
                            "#990099",
                        ],
                        zeroColor: z,
                        nullColor: z,
                        zeroAxis: !0,
                        barWidth: 4,
                        barSpacing: 1,
                        chartRangeMax: z,
                        chartRangeMin: z,
                        chartRangeClip: !1,
                        colorMap: z,
                        tooltipFormat: new m(
                            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}',
                        ),
                    },
                    tristate: {
                        barWidth: 4,
                        barSpacing: 1,
                        posBarColor: "#6f6",
                        negBarColor: "#f44",
                        zeroBarColor: "#999",
                        colorMap: {},
                        tooltipFormat: new m(
                            '<span style="color: {{color}}">&#9679;</span> {{value:map}}',
                        ),
                        tooltipValueLookups: { map: { "-1": "Loss", 0: "Draw", 1: "Win" } },
                    },
                    discrete: {
                        lineHeight: "auto",
                        thresholdColor: z,
                        thresholdValue: 0,
                        chartRangeMax: z,
                        chartRangeMin: z,
                        chartRangeClip: !1,
                        tooltipFormat: new m("{{prefix}}{{value}}{{suffix}}"),
                    },
                    bullet: {
                        targetColor: "#f33",
                        targetWidth: 3,
                        performanceColor: "#33f",
                        rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                        base: z,
                        tooltipFormat: new m("{{fieldkey:fields}} - {{value}}"),
                        tooltipValueLookups: {
                            fields: { r: "Range", p: "Performance", t: "Target" },
                        },
                    },
                    pie: {
                        offset: 0,
                        sliceColors: [
                            "#3366cc",
                            "#dc3912",
                            "#ff9900",
                            "#109618",
                            "#66aa00",
                            "#dd4477",
                            "#0099c6",
                            "#990099",
                        ],
                        borderWidth: 0,
                        borderColor: "#000",
                        tooltipFormat: new m(
                            '<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)',
                        ),
                    },
                    box: {
                        raw: !1,
                        boxLineColor: "#000",
                        boxFillColor: "#cdf",
                        whiskerColor: "#000",
                        outlierLineColor: "#333",
                        outlierFillColor: "#fff",
                        medianColor: "#f00",
                        showOutliers: !0,
                        outlierIQR: 1.5,
                        spotRadius: 1.5,
                        target: z,
                        targetColor: "#4a2",
                        chartRangeMax: z,
                        chartRangeMin: z,
                        tooltipFormat: new m("{{field:fields}}: {{value}}"),
                        tooltipFormatFieldlistKey: "field",
                        tooltipValueLookups: {
                            fields: {
                                lq: "Lower Quartile",
                                med: "Median",
                                uq: "Upper Quartile",
                                lo: "Left Outlier",
                                ro: "Right Outlier",
                                lw: "Left Whisker",
                                rw: "Right Whisker",
                            },
                        },
                    },
                };
            }),
                (e = function () {
                    var t, e;
                    return (
                        (t = function () {
                            this.init.apply(this, arguments);
                        }),
                            1 < arguments.length
                                ? (arguments[0]
                                    ? ((t.prototype = A.extend(
                                        new arguments[0](),
                                        arguments[arguments.length - 1],
                                    )),
                                        (t._super = arguments[0].prototype))
                                    : (t.prototype = arguments[arguments.length - 1]),
                                2 < arguments.length &&
                                ((e = Array.prototype.slice.call(arguments, 1, -1)).unshift(
                                    t.prototype,
                                ),
                                    A.extend.apply(A, e)))
                                : (t.prototype = arguments[0]),
                            (t.prototype.cls = t)
                    );
                }),
                (A.SPFormatClass = m =
                    e({
                        fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
                        precre: /(\w+)\.(\d+)/,
                        init: function (t, e) {
                            (this.format = t), (this.fclass = e);
                        },
                        render: function (t, e, i) {
                            var s,
                                n,
                                r,
                                a,
                                o,
                                h = this,
                                l = t;
                            return this.format.replace(this.fre, function () {
                                return (
                                    (n = arguments[1]),
                                        (r = arguments[3]),
                                        (s = h.precre.exec(n)) ? ((o = s[2]), (n = s[1])) : (o = !1),
                                        (a = l[n]) === z
                                            ? ""
                                            : r && e && e[r]
                                                ? e[r].get
                                                    ? e[r].get(a) || a
                                                    : e[r][a] || a
                                                : (g(a) &&
                                                (a = i.get("numberFormatter")
                                                    ? i.get("numberFormatter")(a)
                                                    : p(
                                                        a,
                                                        o,
                                                        i.get("numberDigitGroupCount"),
                                                        i.get("numberDigitGroupSep"),
                                                        i.get("numberDecimalMark"),
                                                    )),
                                                    a)
                                );
                            });
                        },
                    })),
                (A.spformat = function (t, e) {
                    return new m(t, e);
                }),
                (L = function (t, e, i) {
                    return t < e ? e : i < t ? i : t;
                }),
                (C = function (t, e) {
                    var i;
                    return 2 === e
                        ? ((i = D.floor(t.length / 2)),
                            t.length % 2 ? t[i] : (t[i - 1] + t[i]) / 2)
                        : t.length % 2
                            ? (i = (t.length * e + e) / 4) % 1
                                ? (t[D.floor(i)] + t[D.floor(i) - 1]) / 2
                                : t[i - 1]
                            : (i = (t.length * e + 2) / 4) % 1
                                ? (t[D.floor(i)] + t[D.floor(i) - 1]) / 2
                                : t[i - 1];
                }),
                (E = function (t) {
                    var e;
                    switch (t) {
                        case "undefined":
                            t = z;
                            break;
                        case "null":
                            t = null;
                            break;
                        case "true":
                            t = !0;
                            break;
                        case "false":
                            t = !1;
                            break;
                        default:
                            t == (e = parseFloat(t)) && (t = e);
                    }
                    return t;
                }),
                (N = function (t) {
                    var e,
                        i = [];
                    for (e = t.length; e--; ) i[e] = E(t[e]);
                    return i;
                }),
                (O = function (t, e) {
                    var i,
                        s,
                        n = [];
                    for (i = 0, s = t.length; i < s; i++) t[i] !== e && n.push(t[i]);
                    return n;
                }),
                (g = function (t) {
                    return !isNaN(parseFloat(t)) && isFinite(t);
                }),
                (p = function (t, e, i, s, n) {
                    var r, a;
                    for (
                        t = (!1 === e ? parseFloat(t).toString() : t.toFixed(e)).split(""),
                        (r = (r = A.inArray(".", t)) < 0 ? t.length : r) < t.length &&
                        (t[r] = n),
                            a = r - i;
                        0 < a;
                        a -= i
                    )
                        t.splice(a, 0, s);
                    return t.join("");
                }),
                (w = function (t, e, i) {
                    var s;
                    for (s = e.length; s--; )
                        if ((!i || null !== e[s]) && e[s] !== t) return !1;
                    return !0;
                }),
                (r = function (t) {
                    return A.isArray(t) ? t : [t];
                }),
                (i = function (t) {
                    var e, i;
                    if (S.createStyleSheet)
                        try {
                            return void (S.createStyleSheet().cssText = t);
                        } catch (t) {
                            i = !0;
                        }
                    ((e = S.createElement("style")).type = "text/css"),
                        S.getElementsByTagName("head")[0].appendChild(e),
                        i
                            ? (S.styleSheets[S.styleSheets.length - 1].cssText = t)
                            : (e[
                                "string" == typeof S.body.style.WebkitAppearance
                                    ? "innerText"
                                    : "innerHTML"
                                ] = t);
                }),
                (A.fn.simpledraw = function (t, e, i, s) {
                    var n, r;
                    if (i && (n = this.data("_jqs_vcanvas"))) return n;
                    if (!1 === A.fn.sparkline.canvas) return !1;
                    if (A.fn.sparkline.canvas === z) {
                        var a = S.createElement("canvas");
                        if (a.getContext && a.getContext("2d"))
                            A.fn.sparkline.canvas = function (t, e, i, s) {
                                return new f(t, e, i, s);
                            };
                        else {
                            if (!S.namespaces || S.namespaces.v)
                                return (A.fn.sparkline.canvas = !1);
                            S.namespaces.add(
                                "v",
                                "urn:schemas-microsoft-com:vml",
                                "#default#VML",
                            ),
                                (A.fn.sparkline.canvas = function (t, e, i, s) {
                                    return new v(t, e, i);
                                });
                        }
                    }
                    return (
                        t === z && (t = A(this).innerWidth()),
                        e === z && (e = A(this).innerHeight()),
                            (n = A.fn.sparkline.canvas(t, e, this, s)),
                        (r = A(this).data("_jqs_mhandler")) && r.registerCanvas(n),
                            n
                    );
                }),
                (A.fn.cleardraw = function () {
                    var t = this.data("_jqs_vcanvas");
                    t && t.reset();
                }),
                (A.RangeMapClass = F =
                    e({
                        init: function (t) {
                            var e,
                                i,
                                s = [];
                            for (e in t)
                                t.hasOwnProperty(e) &&
                                "string" == typeof e &&
                                -1 < e.indexOf(":") &&
                                (((i = e.split(":"))[0] =
                                    0 === i[0].length ? -1 / 0 : parseFloat(i[0])),
                                    (i[1] = 0 === i[1].length ? 1 / 0 : parseFloat(i[1])),
                                    (i[2] = t[e]),
                                    s.push(i));
                            (this.map = t), (this.rangelist = s || !1);
                        },
                        get: function (t) {
                            var e,
                                i,
                                s,
                                n = this.rangelist;
                            if ((s = this.map[t]) !== z) return s;
                            if (n)
                                for (e = n.length; e--; )
                                    if ((i = n[e])[0] <= t && i[1] >= t) return i[2];
                            return z;
                        },
                    })),
                (A.range_map = function (t) {
                    return new F(t);
                }),
                (u = e({
                    init: function (t, e) {
                        var i = A(t);
                        (this.$el = i),
                            (this.options = e),
                            (this.currentPageX = 0),
                            (this.currentPageY = 0),
                            (this.el = t),
                            (this.splist = []),
                            (this.tooltip = null),
                            (this.over = !1),
                            (this.displayTooltips = !e.get("disableTooltips")),
                            (this.highlightEnabled = !e.get("disableHighlight"));
                    },
                    registerSparkline: function (t) {
                        this.splist.push(t), this.over && this.updateDisplay();
                    },
                    registerCanvas: function (t) {
                        var e = A(t.canvas);
                        (this.canvas = t),
                            (this.$canvas = e).mouseenter(A.proxy(this.mouseenter, this)),
                            e.mouseleave(A.proxy(this.mouseleave, this)),
                            e.click(A.proxy(this.mouseclick, this));
                    },
                    reset: function (t) {
                        (this.splist = []),
                        this.tooltip && t && (this.tooltip.remove(), (this.tooltip = z));
                    },
                    mouseclick: function (t) {
                        var e = A.Event("sparklineClick");
                        (e.originalEvent = t),
                            (e.sparklines = this.splist),
                            this.$el.trigger(e);
                    },
                    mouseenter: function (t) {
                        A(S.body).unbind("mousemove.jqs"),
                            A(S.body).bind("mousemove.jqs", A.proxy(this.mousemove, this)),
                            (this.over = !0),
                            (this.currentPageX = t.pageX),
                            (this.currentPageY = t.pageY),
                            (this.currentEl = t.target),
                        !this.tooltip &&
                        this.displayTooltips &&
                        ((this.tooltip = new s(this.options)),
                            this.tooltip.updatePosition(t.pageX, t.pageY)),
                            this.updateDisplay();
                    },
                    mouseleave: function () {
                        A(S.body).unbind("mousemove.jqs");
                        var t,
                            e = this.splist,
                            i = e.length,
                            s = !1;
                        for (
                            this.over = !1,
                                this.currentEl = null,
                            this.tooltip && (this.tooltip.remove(), (this.tooltip = null)),
                                t = 0;
                            t < i;
                            t++
                        )
                            e[t].clearRegionHighlight() && (s = !0);
                        s && this.canvas.render();
                    },
                    mousemove: function (t) {
                        (this.currentPageX = t.pageX),
                            (this.currentPageY = t.pageY),
                            (this.currentEl = t.target),
                        this.tooltip && this.tooltip.updatePosition(t.pageX, t.pageY),
                            this.updateDisplay();
                    },
                    updateDisplay: function () {
                        var t,
                            e,
                            i,
                            s,
                            n = this.splist,
                            r = n.length,
                            a = !1,
                            o = this.$canvas.offset(),
                            h = this.currentPageX - o.left,
                            l = this.currentPageY - o.top;
                        if (this.over) {
                            for (e = 0; e < r; e++)
                                (i = n[e].setRegionHighlight(this.currentEl, h, l)) && (a = !0);
                            if (a) {
                                if (
                                    (((s = A.Event("sparklineRegionChange")).sparklines =
                                        this.splist),
                                        this.$el.trigger(s),
                                        this.tooltip)
                                ) {
                                    for (t = "", e = 0; e < r; e++)
                                        t += n[e].getCurrentRegionTooltip();
                                    this.tooltip.setContent(t);
                                }
                                this.disableHighlight || this.canvas.render();
                            }
                            null === i && this.mouseleave();
                        }
                    },
                })),
                (s = e({
                    sizeStyle:
                        "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
                    init: function (t) {
                        var e,
                            i = t.get("tooltipClassname", "jqstooltip"),
                            s = this.sizeStyle;
                        (this.container = t.get("tooltipContainer") || S.body),
                            (this.tooltipOffsetX = t.get("tooltipOffsetX", 10)),
                            (this.tooltipOffsetY = t.get("tooltipOffsetY", 12)),
                            A("#jqssizetip").remove(),
                            A("#jqstooltip").remove(),
                            (this.sizetip = A("<div/>", {
                                id: "jqssizetip",
                                style: s,
                                class: i,
                            })),
                            (this.tooltip = A("<div/>", {
                                id: "jqstooltip",
                                class: i,
                            }).appendTo(this.container)),
                            (e = this.tooltip.offset()),
                            (this.offsetLeft = e.left),
                            (this.offsetTop = e.top),
                            (this.hidden = !0),
                            A(window).unbind("resize.jqs scroll.jqs"),
                            A(window).bind(
                                "resize.jqs scroll.jqs",
                                A.proxy(this.updateWindowDims, this),
                            ),
                            this.updateWindowDims();
                    },
                    updateWindowDims: function () {
                        (this.scrollTop = A(window).scrollTop()),
                            (this.scrollLeft = A(window).scrollLeft()),
                            (this.scrollRight = this.scrollLeft + A(window).width()),
                            this.updatePosition();
                    },
                    getSize: function (t) {
                        this.sizetip.html(t).appendTo(this.container),
                            (this.width = this.sizetip.width() + 1),
                            (this.height = this.sizetip.height()),
                            this.sizetip.remove();
                    },
                    setContent: function (t) {
                        if (!t)
                            return (
                                this.tooltip.css("visibility", "hidden"),
                                    void (this.hidden = !0)
                            );
                        this.getSize(t),
                            this.tooltip
                                .html(t)
                                .css({
                                    width: this.width,
                                    height: this.height,
                                    visibility: "visible",
                                }),
                        this.hidden && ((this.hidden = !1), this.updatePosition());
                    },
                    updatePosition: function (t, e) {
                        if (t === z) {
                            if (this.mousex === z) return;
                            (t = this.mousex - this.offsetLeft),
                                (e = this.mousey - this.offsetTop);
                        } else
                            (this.mousex = t -= this.offsetLeft),
                                (this.mousey = e -= this.offsetTop);
                        this.height &&
                        this.width &&
                        !this.hidden &&
                        ((e -= this.height + this.tooltipOffsetY),
                            (t += this.tooltipOffsetX),
                        e < this.scrollTop && (e = this.scrollTop),
                            t < this.scrollLeft
                                ? (t = this.scrollLeft)
                                : t + this.width > this.scrollRight &&
                                (t = this.scrollRight - this.width),
                            this.tooltip.css({ left: t, top: e }));
                    },
                    remove: function () {
                        this.tooltip.remove(),
                            this.sizetip.remove(),
                            (this.sizetip = this.tooltip = z),
                            A(window).unbind("resize.jqs scroll.jqs");
                    },
                })),
                A(function () {
                    i(
                        '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}',
                    );
                }),
                (x = []),
                (A.fn.sparkline = function (l, i) {
                    return this.each(function () {
                        var t,
                            e,
                            o = new A.fn.sparkline.options(this, i),
                            h = A(this);
                        if (
                            ((t = function () {
                                var t, e, i, s, n, r, a;
                                (t =
                                    "html" === l || l === z
                                        ? (((a = this.getAttribute(o.get("tagValuesAttribute"))) !==
                                            z &&
                                            null !== a) ||
                                        (a = h.html()),
                                            a.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(","))
                                        : l),
                                    (e =
                                        "auto" === o.get("width")
                                            ? t.length * o.get("defaultPixelsPerValue")
                                            : o.get("width")),
                                    "auto" === o.get("height")
                                        ? (o.get("composite") && A.data(this, "_jqs_vcanvas")) ||
                                        (((s = S.createElement("span")).innerHTML = "a"),
                                            h.html(s),
                                            (i = A(s).innerHeight() || A(s).height()),
                                            A(s).remove(),
                                            (s = null))
                                        : (i = o.get("height")),
                                    o.get("disableInteraction")
                                        ? (n = !1)
                                        : (n = A.data(this, "_jqs_mhandler"))
                                            ? o.get("composite") || n.reset()
                                            : ((n = new u(this, o)),
                                                A.data(this, "_jqs_mhandler", n)),
                                    !o.get("composite") || A.data(this, "_jqs_vcanvas")
                                        ? ((r = new A.fn.sparkline[o.get("type")](
                                            this,
                                            t,
                                            o,
                                            e,
                                            i,
                                        )).render(),
                                        n && n.registerSparkline(r))
                                        : A.data(this, "_jqs_errnotify") ||
                                        (alert(
                                            "Attempted to attach a composite sparkline to an element with no existing sparkline",
                                        ),
                                            A.data(this, "_jqs_errnotify", !0));
                            }),
                            (A(this).html() &&
                                !o.get("disableHiddenCheck") &&
                                A(this).is(":hidden")) ||
                            !A(this).parents("body").length)
                        ) {
                            if (!o.get("composite") && A.data(this, "_jqs_pending"))
                                for (e = x.length; e; e--)
                                    x[e - 1][0] == this && x.splice(e - 1, 1);
                            x.push([this, t]), A.data(this, "_jqs_pending", !0);
                        } else t.call(this);
                    });
                }),
                (A.fn.sparkline.defaults = t()),
                (A.sparkline_display_visible = function () {
                    var t,
                        e,
                        i,
                        s = [];
                    for (e = 0, i = x.length; e < i; e++)
                        (t = x[e][0]),
                            A(t).is(":visible") && !A(t).parents().is(":hidden")
                                ? (x[e][1].call(t),
                                    A.data(x[e][0], "_jqs_pending", !1),
                                    s.push(e))
                                : A(t).closest("html").length ||
                                A.data(t, "_jqs_pending") ||
                                (A.data(x[e][0], "_jqs_pending", !1), s.push(e));
                    for (e = s.length; e; e--) x.splice(s[e - 1], 1);
                }),
                (A.fn.sparkline.options = e({
                    init: function (t, e) {
                        var i, s, n, r;
                        (this.userOptions = e = e || {}),
                            (this.tag = t),
                            (this.tagValCache = {}),
                            (n = (s = A.fn.sparkline.defaults).common),
                            (this.tagOptionsPrefix =
                                e.enableTagOptions &&
                                (e.tagOptionsPrefix || n.tagOptionsPrefix)),
                            (i =
                                (r = this.getTagSetting("type")) === y
                                    ? s[e.type || n.type]
                                    : s[r]),
                            (this.mergedOptions = A.extend({}, n, i, e));
                    },
                    getTagSetting: function (t) {
                        var e,
                            i,
                            s,
                            n,
                            r = this.tagOptionsPrefix;
                        if (!1 === r || r === z) return y;
                        if (this.tagValCache.hasOwnProperty(t)) e = this.tagValCache.key;
                        else {
                            if ((e = this.tag.getAttribute(r + t)) === z || null === e) e = y;
                            else if ("[" === e.substr(0, 1))
                                for (
                                    i = (e = e.substr(1, e.length - 2).split(",")).length;
                                    i--;

                                )
                                    e[i] = E(e[i].replace(/(^\s*)|(\s*$)/g, ""));
                            else if ("{" === e.substr(0, 1))
                                for (
                                    s = e.substr(1, e.length - 2).split(","),
                                        e = {},
                                        i = s.length;
                                    i--;

                                )
                                    e[(n = s[i].split(":", 2))[0].replace(/(^\s*)|(\s*$)/g, "")] =
                                        E(n[1].replace(/(^\s*)|(\s*$)/g, ""));
                            else e = E(e);
                            this.tagValCache.key = e;
                        }
                        return e;
                    },
                    get: function (t, e) {
                        var i,
                            s = this.getTagSetting(t);
                        return s !== y ? s : (i = this.mergedOptions[t]) === z ? e : i;
                    },
                })),
                (A.fn.sparkline._base = e({
                    disabled: !1,
                    init: function (t, e, i, s, n) {
                        (this.el = t),
                            (this.$el = A(t)),
                            (this.values = e),
                            (this.options = i),
                            (this.width = s),
                            (this.height = n),
                            (this.currentRegion = z);
                    },
                    initTarget: function () {
                        var t = !this.options.get("disableInteraction");
                        (this.target = this.$el.simpledraw(
                            this.width,
                            this.height,
                            this.options.get("composite"),
                            t,
                        ))
                            ? ((this.canvasWidth = this.target.pixelWidth),
                                (this.canvasHeight = this.target.pixelHeight))
                            : (this.disabled = !0);
                    },
                    render: function () {
                        return !this.disabled || ((this.el.innerHTML = ""), !1);
                    },
                    getRegion: function (t, e) {},
                    setRegionHighlight: function (t, e, i) {
                        var s,
                            n = this.currentRegion,
                            r = !this.options.get("disableHighlight");
                        return e > this.canvasWidth ||
                        i > this.canvasHeight ||
                        e < 0 ||
                        i < 0
                            ? null
                            : n !== (s = this.getRegion(t, e, i)) &&
                            (n !== z && r && this.removeHighlight(),
                            (this.currentRegion = s) !== z && r && this.renderHighlight(),
                                !0);
                    },
                    clearRegionHighlight: function () {
                        return (
                            this.currentRegion !== z &&
                            (this.removeHighlight(), !(this.currentRegion = z))
                        );
                    },
                    renderHighlight: function () {
                        this.changeHighlight(!0);
                    },
                    removeHighlight: function () {
                        this.changeHighlight(!1);
                    },
                    changeHighlight: function (t) {},
                    getCurrentRegionTooltip: function () {
                        var t,
                            e,
                            i,
                            s,
                            n,
                            r,
                            a,
                            o,
                            h,
                            l,
                            g,
                            p,
                            u,
                            c,
                            d = this.options,
                            f = "",
                            v = [];
                        if (this.currentRegion === z) return "";
                        if (
                            ((t = this.getCurrentRegionFields()),
                                (g = d.get("tooltipFormatter")))
                        )
                            return g(this, d, t);
                        if (
                            (d.get("tooltipChartTitle") &&
                            (f +=
                                '<div class="jqs jqstitle">' +
                                d.get("tooltipChartTitle") +
                                "</div>\n"),
                                !(e = this.options.get("tooltipFormat")))
                        )
                            return "";
                        if (
                            (A.isArray(e) || (e = [e]),
                            A.isArray(t) || (t = [t]),
                                (a = this.options.get("tooltipFormatFieldlist")),
                                (o = this.options.get("tooltipFormatFieldlistKey")),
                            a && o)
                        ) {
                            for (h = [], r = t.length; r--; )
                                (l = t[r][o]), -1 != (c = A.inArray(l, a)) && (h[c] = t[r]);
                            t = h;
                        }
                        for (i = e.length, u = t.length, r = 0; r < i; r++)
                            for (
                                "string" == typeof (p = e[r]) && (p = new m(p)),
                                    s = p.fclass || "jqsfield",
                                    c = 0;
                                c < u;
                                c++
                            )
                                (t[c].isNull && d.get("tooltipSkipNull")) ||
                                (A.extend(t[c], {
                                    prefix: d.get("tooltipPrefix"),
                                    suffix: d.get("tooltipSuffix"),
                                }),
                                    (n = p.render(t[c], d.get("tooltipValueLookups"), d)),
                                    v.push('<div class="' + s + '">' + n + "</div>"));
                        return v.length ? f + v.join("\n") : "";
                    },
                    getCurrentRegionFields: function () {},
                    calcHighlightColor: function (t, e) {
                        var i,
                            s,
                            n,
                            r,
                            a = e.get("highlightColor"),
                            o = e.get("highlightLighten");
                        if (a) return a;
                        if (
                            o &&
                            (i =
                                /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t) ||
                                /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(t))
                        ) {
                            for (n = [], s = 4 === t.length ? 16 : 1, r = 0; r < 3; r++)
                                n[r] = L(D.round(parseInt(i[r + 1], 16) * s * o), 0, 255);
                            return "rgb(" + n.join(",") + ")";
                        }
                        return t;
                    },
                })),
                (n = {
                    changeHighlight: function (t) {
                        var e,
                            i = this.currentRegion,
                            s = this.target,
                            n = this.regionShapes[i];
                        n &&
                        ((e = this.renderRegion(i, t)),
                            A.isArray(e) || A.isArray(n)
                                ? (s.replaceWithShapes(n, e),
                                    (this.regionShapes[i] = A.map(e, function (t) {
                                        return t.id;
                                    })))
                                : (s.replaceWithShape(n, e), (this.regionShapes[i] = e.id)));
                    },
                    render: function () {
                        var t,
                            e,
                            i,
                            s,
                            n = this.values,
                            r = this.target,
                            a = this.regionShapes;
                        if (this.cls._super.render.call(this)) {
                            for (i = n.length; i--; )
                                if ((t = this.renderRegion(i)))
                                    if (A.isArray(t)) {
                                        for (e = [], s = t.length; s--; )
                                            t[s].append(), e.push(t[s].id);
                                        a[i] = e;
                                    } else t.append(), (a[i] = t.id);
                                else a[i] = null;
                            r.render();
                        }
                    },
                }),
                (A.fn.sparkline.line = W =
                    e(A.fn.sparkline._base, {
                        type: "line",
                        init: function (t, e, i, s, n) {
                            W._super.init.call(this, t, e, i, s, n),
                                (this.vertices = []),
                                (this.regionMap = []),
                                (this.xvalues = []),
                                (this.yvalues = []),
                                (this.yminmax = []),
                                (this.hightlightSpotId = null),
                                (this.lastShapeId = null),
                                this.initTarget();
                        },
                        getRegion: function (t, e, i) {
                            var s,
                                n = this.regionMap;
                            for (s = n.length; s--; )
                                if (null !== n[s] && e >= n[s][0] && e <= n[s][1])
                                    return n[s][2];
                            return z;
                        },
                        getCurrentRegionFields: function () {
                            var t = this.currentRegion;
                            return {
                                isNull: null === this.yvalues[t],
                                x: this.xvalues[t],
                                y: this.yvalues[t],
                                color: this.options.get("lineColor"),
                                fillColor: this.options.get("fillColor"),
                                offset: t,
                            };
                        },
                        renderHighlight: function () {
                            var t,
                                e,
                                i = this.currentRegion,
                                s = this.target,
                                n = this.vertices[i],
                                r = this.options,
                                a = r.get("spotRadius"),
                                o = r.get("highlightSpotColor"),
                                h = r.get("highlightLineColor");
                            n &&
                            (a &&
                            o &&
                            ((t = s.drawCircle(n[0], n[1], a, z, o)),
                                (this.highlightSpotId = t.id),
                                s.insertAfterShape(this.lastShapeId, t)),
                            h &&
                            ((e = s.drawLine(
                                n[0],
                                this.canvasTop,
                                n[0],
                                this.canvasTop + this.canvasHeight,
                                h,
                            )),
                                (this.highlightLineId = e.id),
                                s.insertAfterShape(this.lastShapeId, e)));
                        },
                        removeHighlight: function () {
                            var t = this.target;
                            this.highlightSpotId &&
                            (t.removeShapeId(this.highlightSpotId),
                                (this.highlightSpotId = null)),
                            this.highlightLineId &&
                            (t.removeShapeId(this.highlightLineId),
                                (this.highlightLineId = null));
                        },
                        scanValues: function () {
                            var t,
                                e,
                                i,
                                s,
                                n,
                                r = this.values,
                                a = r.length,
                                o = this.xvalues,
                                h = this.yvalues,
                                l = this.yminmax;
                            for (t = 0; t < a; t++)
                                (e = r[t]),
                                    (i = "string" == typeof r[t]),
                                    (s = "object" == typeof r[t] && r[t] instanceof Array),
                                    (n = i && r[t].split(":")),
                                    i && 2 === n.length
                                        ? (o.push(Number(n[0])),
                                            h.push(Number(n[1])),
                                            l.push(Number(n[1])))
                                        : s
                                            ? (o.push(e[0]), h.push(e[1]), l.push(e[1]))
                                            : (o.push(t),
                                                null === r[t] || "null" === r[t]
                                                    ? h.push(null)
                                                    : (h.push(Number(e)), l.push(Number(e))));
                            this.options.get("xvalues") && (o = this.options.get("xvalues")),
                                (this.maxy = this.maxyorg = D.max.apply(D, l)),
                                (this.miny = this.minyorg = D.min.apply(D, l)),
                                (this.maxx = D.max.apply(D, o)),
                                (this.minx = D.min.apply(D, o)),
                                (this.xvalues = o),
                                (this.yvalues = h),
                                (this.yminmax = l);
                        },
                        processRangeOptions: function () {
                            var t = this.options,
                                e = t.get("normalRangeMin"),
                                i = t.get("normalRangeMax");
                            e !== z &&
                            (e < this.miny && (this.miny = e),
                            i > this.maxy && (this.maxy = i)),
                            t.get("chartRangeMin") !== z &&
                            (t.get("chartRangeClip") ||
                                t.get("chartRangeMin") < this.miny) &&
                            (this.miny = t.get("chartRangeMin")),
                            t.get("chartRangeMax") !== z &&
                            (t.get("chartRangeClip") ||
                                t.get("chartRangeMax") > this.maxy) &&
                            (this.maxy = t.get("chartRangeMax")),
                            t.get("chartRangeMinX") !== z &&
                            (t.get("chartRangeClipX") ||
                                t.get("chartRangeMinX") < this.minx) &&
                            (this.minx = t.get("chartRangeMinX")),
                            t.get("chartRangeMaxX") !== z &&
                            (t.get("chartRangeClipX") ||
                                t.get("chartRangeMaxX") > this.maxx) &&
                            (this.maxx = t.get("chartRangeMaxX"));
                        },
                        drawNormalRange: function (t, e, i, s, n) {
                            var r = this.options.get("normalRangeMin"),
                                a = this.options.get("normalRangeMax"),
                                o = e + D.round(i - i * ((a - this.miny) / n)),
                                h = D.round((i * (a - r)) / n);
                            this.target
                                .drawRect(t, o, s, h, z, this.options.get("normalRangeColor"))
                                .append();
                        },
                        render: function () {
                            var t,
                                e,
                                i,
                                s,
                                n,
                                r,
                                a,
                                o,
                                h,
                                l,
                                g,
                                p,
                                u,
                                c,
                                d,
                                f,
                                v,
                                m,
                                x,
                                y,
                                C,
                                _,
                                w,
                                b,
                                S = this.options,
                                R = this.target,
                                T = this.canvasWidth,
                                M = this.canvasHeight,
                                k = this.vertices,
                                H = S.get("spotRadius"),
                                I = this.regionMap;
                            if (
                                W._super.render.call(this) &&
                                (this.scanValues(),
                                    this.processRangeOptions(),
                                    (_ = this.xvalues),
                                    (w = this.yvalues),
                                this.yminmax.length && !(this.yvalues.length < 2))
                            ) {
                                for (
                                    s = n = 0,
                                        t = this.maxx - this.minx == 0 ? 1 : this.maxx - this.minx,
                                        e = this.maxy - this.miny == 0 ? 1 : this.maxy - this.miny,
                                        i = this.yvalues.length - 1,
                                    H && (T < 4 * H || M < 4 * H) && (H = 0),
                                    H &&
                                    (((y =
                                            S.get("highlightSpotColor") &&
                                            !S.get("disableInteraction")) ||
                                        S.get("minSpotColor") ||
                                        (S.get("spotColor") && w[i] === this.miny)) &&
                                    (M -= D.ceil(H)),
                                    (y ||
                                        S.get("maxSpotColor") ||
                                        (S.get("spotColor") && w[i] === this.maxy)) &&
                                    ((M -= D.ceil(H)), (s += D.ceil(H))),
                                    (y ||
                                        ((S.get("minSpotColor") || S.get("maxSpotColor")) &&
                                            (w[0] === this.miny || w[0] === this.maxy))) &&
                                    ((n += D.ceil(H)), (T -= D.ceil(H))),
                                    (y ||
                                        S.get("spotColor") ||
                                        S.get("minSpotColor") ||
                                        (S.get("maxSpotColor") &&
                                            (w[i] === this.miny || w[i] === this.maxy))) &&
                                    (T -= D.ceil(H))),
                                        M--,
                                    S.get("normalRangeMin") === z ||
                                    S.get("drawNormalOnTop") ||
                                    this.drawNormalRange(n, s, M, T, e),
                                        o = [(a = [])],
                                        u = c = null,
                                        d = w.length,
                                        b = 0;
                                    b < d;
                                    b++
                                )
                                    (h = _[b]),
                                        (g = _[b + 1]),
                                        (l = w[b]),
                                        (c =
                                            (p = n + D.round((h - this.minx) * (T / t))) +
                                            ((b < d - 1
                                                    ? n + D.round((g - this.minx) * (T / t))
                                                    : T) -
                                                p) /
                                            2),
                                        (I[b] = [u || 0, c, b]),
                                        (u = c),
                                        null === l
                                            ? b &&
                                            (null !== w[b - 1] && ((a = []), o.push(a)),
                                                k.push(null))
                                            : (l < this.miny && (l = this.miny),
                                            l > this.maxy && (l = this.maxy),
                                            a.length || a.push([p, s + M]),
                                                (r = [p, s + D.round(M - M * ((l - this.miny) / e))]),
                                                a.push(r),
                                                k.push(r));
                                for (f = [], v = [], m = o.length, b = 0; b < m; b++)
                                    (a = o[b]).length &&
                                    (S.get("fillColor") &&
                                    (a.push([a[a.length - 1][0], s + M]),
                                        v.push(a.slice(0)),
                                        a.pop()),
                                    2 < a.length && (a[0] = [a[0][0], a[1][1]]),
                                        f.push(a));
                                for (m = v.length, b = 0; b < m; b++)
                                    R.drawShape(
                                        v[b],
                                        S.get("fillColor"),
                                        S.get("fillColor"),
                                    ).append();
                                for (
                                    S.get("normalRangeMin") !== z &&
                                    S.get("drawNormalOnTop") &&
                                    this.drawNormalRange(n, s, M, T, e),
                                        m = f.length,
                                        b = 0;
                                    b < m;
                                    b++
                                )
                                    R.drawShape(
                                        f[b],
                                        S.get("lineColor"),
                                        z,
                                        S.get("lineWidth"),
                                    ).append();
                                if (H && S.get("valueSpots"))
                                    for (
                                        (x = S.get("valueSpots")).get === z && (x = new F(x)),
                                            b = 0;
                                        b < d;
                                        b++
                                    )
                                        (C = x.get(w[b])) &&
                                        R.drawCircle(
                                            n + D.round((_[b] - this.minx) * (T / t)),
                                            s + D.round(M - M * ((w[b] - this.miny) / e)),
                                            H,
                                            z,
                                            C,
                                        ).append();
                                H &&
                                S.get("spotColor") &&
                                null !== w[i] &&
                                R.drawCircle(
                                    n + D.round((_[_.length - 1] - this.minx) * (T / t)),
                                    s + D.round(M - M * ((w[i] - this.miny) / e)),
                                    H,
                                    z,
                                    S.get("spotColor"),
                                ).append(),
                                this.maxy !== this.minyorg &&
                                (H &&
                                S.get("minSpotColor") &&
                                ((h = _[A.inArray(this.minyorg, w)]),
                                    R.drawCircle(
                                        n + D.round((h - this.minx) * (T / t)),
                                        s + D.round(M - M * ((this.minyorg - this.miny) / e)),
                                        H,
                                        z,
                                        S.get("minSpotColor"),
                                    ).append()),
                                H &&
                                S.get("maxSpotColor") &&
                                ((h = _[A.inArray(this.maxyorg, w)]),
                                    R.drawCircle(
                                        n + D.round((h - this.minx) * (T / t)),
                                        s + D.round(M - M * ((this.maxyorg - this.miny) / e)),
                                        H,
                                        z,
                                        S.get("maxSpotColor"),
                                    ).append())),
                                    (this.lastShapeId = R.getLastShapeId()),
                                    (this.canvasTop = s),
                                    R.render();
                            }
                        },
                    })),
                (A.fn.sparkline.bar = B =
                    e(A.fn.sparkline._base, n, {
                        type: "bar",
                        init: function (t, e, i, s, n) {
                            var r,
                                a,
                                o,
                                h,
                                l,
                                g,
                                p,
                                u,
                                c,
                                d,
                                f,
                                v,
                                m,
                                x,
                                y,
                                C,
                                _,
                                w,
                                b,
                                S,
                                R,
                                T = parseInt(i.get("barWidth"), 10),
                                M = parseInt(i.get("barSpacing"), 10),
                                k = i.get("chartRangeMin"),
                                H = i.get("chartRangeMax"),
                                I = i.get("chartRangeClip"),
                                W = 1 / 0,
                                j = -1 / 0;
                            for (
                                B._super.init.call(this, t, e, i, s, n), g = 0, p = e.length;
                                g < p;
                                g++
                            )
                                ((r = "string" == typeof (S = e[g]) && -1 < S.indexOf(":")) ||
                                    A.isArray(S)) &&
                                ((y = !0),
                                r && (S = e[g] = N(S.split(":"))),
                                    (S = O(S, null)),
                                (a = D.min.apply(D, S)) < W && (W = a),
                                j < (o = D.max.apply(D, S)) && (j = o));
                            (this.stacked = y),
                                (this.regionShapes = {}),
                                (this.barWidth = T),
                                (this.barSpacing = M),
                                (this.totalBarWidth = T + M),
                                (this.width = s = e.length * T + (e.length - 1) * M),
                                this.initTarget(),
                            I && ((m = k === z ? -1 / 0 : k), (x = H === z ? 1 / 0 : H)),
                                (l = []),
                                (h = y ? [] : l);
                            var q = [],
                                P = [];
                            for (g = 0, p = e.length; g < p; g++)
                                if (y)
                                    for (
                                        C = e[g],
                                            e[g] = b = [],
                                            q[g] = 0,
                                            h[g] = P[g] = 0,
                                            _ = 0,
                                            w = C.length;
                                        _ < w;
                                        _++
                                    )
                                        null !== (S = b[_] = I ? L(C[_], m, x) : C[_]) &&
                                        (0 < S && (q[g] += S),
                                            W < 0 && 0 < j
                                                ? S < 0
                                                    ? (P[g] += D.abs(S))
                                                    : (h[g] += S)
                                                : (h[g] += D.abs(S - (S < 0 ? j : W))),
                                            l.push(S));
                                else
                                    (S = I ? L(e[g], m, x) : e[g]),
                                    null !== (S = e[g] = E(S)) && l.push(S);
                            (this.max = v = D.max.apply(D, l)),
                                (this.min = f = D.min.apply(D, l)),
                                (this.stackMax = j = y ? D.max.apply(D, q) : v),
                                (this.stackMin = W = y ? D.min.apply(D, l) : f),
                            i.get("chartRangeMin") !== z &&
                            (i.get("chartRangeClip") || i.get("chartRangeMin") < f) &&
                            (f = i.get("chartRangeMin")),
                            i.get("chartRangeMax") !== z &&
                            (i.get("chartRangeClip") || i.get("chartRangeMax") > v) &&
                            (v = i.get("chartRangeMax")),
                                (this.zeroAxis = c = i.get("zeroAxis", !0)),
                                (d = f <= 0 && 0 <= v && c ? 0 : 0 == c ? f : 0 < f ? f : v),
                                (this.xaxisOffset = d),
                                (u = y ? D.max.apply(D, h) + D.max.apply(D, P) : v - f),
                                (this.canvasHeightEf =
                                    c && f < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1),
                                f < d
                                    ? (R =
                                        (((y && 0 <= v ? j : v) - d) / u) * this.canvasHeight) !==
                                    D.ceil(R) && ((this.canvasHeightEf -= 2), (R = D.ceil(R)))
                                    : (R = this.canvasHeight),
                                (this.yoffset = R),
                                A.isArray(i.get("colorMap"))
                                    ? ((this.colorMapByIndex = i.get("colorMap")),
                                        (this.colorMapByValue = null))
                                    : ((this.colorMapByIndex = null),
                                        (this.colorMapByValue = i.get("colorMap")),
                                    this.colorMapByValue &&
                                    this.colorMapByValue.get === z &&
                                    (this.colorMapByValue = new F(this.colorMapByValue))),
                                (this.range = u);
                        },
                        getRegion: function (t, e, i) {
                            var s = D.floor(e / this.totalBarWidth);
                            return s < 0 || s >= this.values.length ? z : s;
                        },
                        getCurrentRegionFields: function () {
                            var t,
                                e,
                                i = this.currentRegion,
                                s = r(this.values[i]),
                                n = [];
                            for (e = s.length; e--; )
                                (t = s[e]),
                                    n.push({
                                        isNull: null === t,
                                        value: t,
                                        color: this.calcColor(e, t, i),
                                        offset: i,
                                    });
                            return n;
                        },
                        calcColor: function (t, e, i) {
                            var s,
                                n,
                                r = this.colorMapByIndex,
                                a = this.colorMapByValue,
                                o = this.options;
                            return (
                                (s = this.stacked
                                    ? o.get("stackedBarColor")
                                    : e < 0
                                        ? o.get("negBarColor")
                                        : o.get("barColor")),
                                0 === e && o.get("zeroColor") !== z && (s = o.get("zeroColor")),
                                    a && (n = a.get(e)) ? (s = n) : r && r.length > i && (s = r[i]),
                                    A.isArray(s) ? s[t % s.length] : s
                            );
                        },
                        renderRegion: function (t, e) {
                            var i,
                                s,
                                n,
                                r,
                                a,
                                o,
                                h,
                                l,
                                g,
                                p,
                                u = this.values[t],
                                c = this.options,
                                d = this.xaxisOffset,
                                f = [],
                                v = this.range,
                                m = this.stacked,
                                x = this.target,
                                y = t * this.totalBarWidth,
                                C = this.canvasHeightEf,
                                _ = this.yoffset;
                            if (
                                ((h = (u = A.isArray(u) ? u : [u]).length),
                                    (l = u[0]),
                                    (r = w(null, u)),
                                    (p = w(d, u, !0)),
                                    r)
                            )
                                return c.get("nullColor")
                                    ? ((n = e
                                        ? c.get("nullColor")
                                        : this.calcHighlightColor(c.get("nullColor"), c)),
                                        (i = 0 < _ ? _ - 1 : _),
                                        x.drawRect(y, i, this.barWidth - 1, 0, n, n))
                                    : z;
                            for (a = _, o = 0; o < h; o++) {
                                if (((l = u[o]), m && l === d)) {
                                    if (!p || g) continue;
                                    g = !0;
                                }
                                (s = 0 < v ? D.floor(C * (D.abs(l - d) / v)) + 1 : 1),
                                    l < d || (l === d && 0 === _)
                                        ? ((i = a), (a += s))
                                        : ((i = _ - s), (_ -= s)),
                                    (n = this.calcColor(o, l, t)),
                                e && (n = this.calcHighlightColor(n, c)),
                                    f.push(x.drawRect(y, i, this.barWidth - 1, s - 1, n, n));
                            }
                            return 1 === f.length ? f[0] : f;
                        },
                    })),
                (A.fn.sparkline.tristate = o =
                    e(A.fn.sparkline._base, n, {
                        type: "tristate",
                        init: function (t, e, i, s, n) {
                            var r = parseInt(i.get("barWidth"), 10),
                                a = parseInt(i.get("barSpacing"), 10);
                            o._super.init.call(this, t, e, i, s, n),
                                (this.regionShapes = {}),
                                (this.barWidth = r),
                                (this.barSpacing = a),
                                (this.totalBarWidth = r + a),
                                (this.values = A.map(e, Number)),
                                (this.width = s = e.length * r + (e.length - 1) * a),
                                A.isArray(i.get("colorMap"))
                                    ? ((this.colorMapByIndex = i.get("colorMap")),
                                        (this.colorMapByValue = null))
                                    : ((this.colorMapByIndex = null),
                                        (this.colorMapByValue = i.get("colorMap")),
                                    this.colorMapByValue &&
                                    this.colorMapByValue.get === z &&
                                    (this.colorMapByValue = new F(this.colorMapByValue))),
                                this.initTarget();
                        },
                        getRegion: function (t, e, i) {
                            return D.floor(e / this.totalBarWidth);
                        },
                        getCurrentRegionFields: function () {
                            var t = this.currentRegion;
                            return {
                                isNull: this.values[t] === z,
                                value: this.values[t],
                                color: this.calcColor(this.values[t], t),
                                offset: t,
                            };
                        },
                        calcColor: function (t, e) {
                            var i,
                                s = this.values,
                                n = this.options,
                                r = this.colorMapByIndex,
                                a = this.colorMapByValue;
                            return a && (i = a.get(t))
                                ? i
                                : r && r.length > e
                                    ? r[e]
                                    : s[e] < 0
                                        ? n.get("negBarColor")
                                        : 0 < s[e]
                                            ? n.get("posBarColor")
                                            : n.get("zeroBarColor");
                        },
                        renderRegion: function (t, e) {
                            var i,
                                s,
                                n,
                                r,
                                a,
                                o,
                                h = this.values,
                                l = this.options,
                                g = this.target;
                            if (
                                ((i = g.pixelHeight),
                                    (n = D.round(i / 2)),
                                    (r = t * this.totalBarWidth),
                                    (s =
                                        h[t] < 0
                                            ? (a = n) - 1
                                            : 0 < h[t]
                                                ? ((a = 0), n - 1)
                                                : ((a = n - 1), 2)),
                                null !== (o = this.calcColor(h[t], t)))
                            )
                                return (
                                    e && (o = this.calcHighlightColor(o, l)),
                                        g.drawRect(r, a, this.barWidth - 1, s - 1, o, o)
                                );
                        },
                    })),
                (A.fn.sparkline.discrete = a =
                    e(A.fn.sparkline._base, n, {
                        type: "discrete",
                        init: function (t, e, i, s, n) {
                            a._super.init.call(this, t, e, i, s, n),
                                (this.regionShapes = {}),
                                (this.values = e = A.map(e, Number)),
                                (this.min = D.min.apply(D, e)),
                                (this.max = D.max.apply(D, e)),
                                (this.range = this.max - this.min),
                                (this.width = s =
                                    "auto" === i.get("width") ? 2 * e.length : this.width),
                                (this.interval = D.floor(s / e.length)),
                                (this.itemWidth = s / e.length),
                            i.get("chartRangeMin") !== z &&
                            (i.get("chartRangeClip") ||
                                i.get("chartRangeMin") < this.min) &&
                            (this.min = i.get("chartRangeMin")),
                            i.get("chartRangeMax") !== z &&
                            (i.get("chartRangeClip") ||
                                i.get("chartRangeMax") > this.max) &&
                            (this.max = i.get("chartRangeMax")),
                                this.initTarget(),
                            this.target &&
                            (this.lineHeight =
                                "auto" === i.get("lineHeight")
                                    ? D.round(0.3 * this.canvasHeight)
                                    : i.get("lineHeight"));
                        },
                        getRegion: function (t, e, i) {
                            return D.floor(e / this.itemWidth);
                        },
                        getCurrentRegionFields: function () {
                            var t = this.currentRegion;
                            return {
                                isNull: this.values[t] === z,
                                value: this.values[t],
                                offset: t,
                            };
                        },
                        renderRegion: function (t, e) {
                            var i,
                                s,
                                n,
                                r,
                                a = this.values,
                                o = this.options,
                                h = this.min,
                                l = this.max,
                                g = this.range,
                                p = this.interval,
                                u = this.target,
                                c = this.canvasHeight,
                                d = this.lineHeight,
                                f = c - d;
                            return (
                                (s = L(a[t], h, l)),
                                    (r = t * p),
                                    (i = D.round(f - f * ((s - h) / g))),
                                    (n =
                                        o.get("thresholdColor") && s < o.get("thresholdValue")
                                            ? o.get("thresholdColor")
                                            : o.get("lineColor")),
                                e && (n = this.calcHighlightColor(n, o)),
                                    u.drawLine(r, i, r, i + d, n)
                            );
                        },
                    })),
                (A.fn.sparkline.bullet = h =
                    e(A.fn.sparkline._base, {
                        type: "bullet",
                        init: function (t, e, i, s, n) {
                            var r, a, o;
                            h._super.init.call(this, t, e, i, s, n),
                                (this.values = e = N(e)),
                                ((o = e.slice())[0] = null === o[0] ? o[2] : o[0]),
                                (o[1] = null === e[1] ? o[2] : o[1]),
                                (r = D.min.apply(D, e)),
                                (a = D.max.apply(D, e)),
                                (r = i.get("base") === z ? (r < 0 ? r : 0) : i.get("base")),
                                (this.min = r),
                                (this.max = a),
                                (this.range = a - r),
                                (this.shapes = {}),
                                (this.valueShapes = {}),
                                (this.regiondata = {}),
                                (this.width = s = "auto" === i.get("width") ? "4.0em" : s),
                                (this.target = this.$el.simpledraw(s, n, i.get("composite"))),
                            e.length || (this.disabled = !0),
                                this.initTarget();
                        },
                        getRegion: function (t, e, i) {
                            var s = this.target.getShapeAt(t, e, i);
                            return s !== z && this.shapes[s] !== z ? this.shapes[s] : z;
                        },
                        getCurrentRegionFields: function () {
                            var t = this.currentRegion;
                            return {
                                fieldkey: t.substr(0, 1),
                                value: this.values[t.substr(1)],
                                region: t,
                            };
                        },
                        changeHighlight: function (t) {
                            var e,
                                i = this.currentRegion,
                                s = this.valueShapes[i];
                            switch ((delete this.shapes[s], i.substr(0, 1))) {
                                case "r":
                                    e = this.renderRange(i.substr(1), t);
                                    break;
                                case "p":
                                    e = this.renderPerformance(t);
                                    break;
                                case "t":
                                    e = this.renderTarget(t);
                            }
                            (this.valueShapes[i] = e.id),
                                (this.shapes[e.id] = i),
                                this.target.replaceWithShape(s, e);
                        },
                        renderRange: function (t, e) {
                            var i = this.values[t],
                                s = D.round(this.canvasWidth * ((i - this.min) / this.range)),
                                n = this.options.get("rangeColors")[t - 2];
                            return (
                                e && (n = this.calcHighlightColor(n, this.options)),
                                    this.target.drawRect(0, 0, s - 1, this.canvasHeight - 1, n, n)
                            );
                        },
                        renderPerformance: function (t) {
                            var e = this.values[1],
                                i = D.round(this.canvasWidth * ((e - this.min) / this.range)),
                                s = this.options.get("performanceColor");
                            return (
                                t && (s = this.calcHighlightColor(s, this.options)),
                                    this.target.drawRect(
                                        0,
                                        D.round(0.3 * this.canvasHeight),
                                        i - 1,
                                        D.round(0.4 * this.canvasHeight) - 1,
                                        s,
                                        s,
                                    )
                            );
                        },
                        renderTarget: function (t) {
                            var e = this.values[0],
                                i = D.round(
                                    this.canvasWidth * ((e - this.min) / this.range) -
                                    this.options.get("targetWidth") / 2,
                                ),
                                s = D.round(0.1 * this.canvasHeight),
                                n = this.canvasHeight - 2 * s,
                                r = this.options.get("targetColor");
                            return (
                                t && (r = this.calcHighlightColor(r, this.options)),
                                    this.target.drawRect(
                                        i,
                                        s,
                                        this.options.get("targetWidth") - 1,
                                        n - 1,
                                        r,
                                        r,
                                    )
                            );
                        },
                        render: function () {
                            var t,
                                e,
                                i = this.values.length,
                                s = this.target;
                            if (h._super.render.call(this)) {
                                for (t = 2; t < i; t++)
                                    (e = this.renderRange(t).append()),
                                        (this.shapes[e.id] = "r" + t),
                                        (this.valueShapes["r" + t] = e.id);
                                null !== this.values[1] &&
                                ((e = this.renderPerformance().append()),
                                    (this.shapes[e.id] = "p1"),
                                    (this.valueShapes.p1 = e.id)),
                                null !== this.values[0] &&
                                ((e = this.renderTarget().append()),
                                    (this.shapes[e.id] = "t0"),
                                    (this.valueShapes.t0 = e.id)),
                                    s.render();
                            }
                        },
                    })),
                (A.fn.sparkline.pie = l =
                    e(A.fn.sparkline._base, {
                        type: "pie",
                        init: function (t, e, i, s, n) {
                            var r,
                                a = 0;
                            if (
                                (l._super.init.call(this, t, e, i, s, n),
                                    (this.shapes = {}),
                                    (this.valueShapes = {}),
                                    (this.values = e = A.map(e, Number)),
                                "auto" === i.get("width") && (this.width = this.height),
                                0 < e.length)
                            )
                                for (r = e.length; r--; ) a += e[r];
                            (this.total = a),
                                this.initTarget(),
                                (this.radius = D.floor(
                                    D.min(this.canvasWidth, this.canvasHeight) / 2,
                                ));
                        },
                        getRegion: function (t, e, i) {
                            var s = this.target.getShapeAt(t, e, i);
                            return s !== z && this.shapes[s] !== z ? this.shapes[s] : z;
                        },
                        getCurrentRegionFields: function () {
                            var t = this.currentRegion;
                            return {
                                isNull: this.values[t] === z,
                                value: this.values[t],
                                percent: (this.values[t] / this.total) * 100,
                                color:
                                    this.options.get("sliceColors")[
                                    t % this.options.get("sliceColors").length
                                        ],
                                offset: t,
                            };
                        },
                        changeHighlight: function (t) {
                            var e = this.currentRegion,
                                i = this.renderSlice(e, t),
                                s = this.valueShapes[e];
                            delete this.shapes[s],
                                this.target.replaceWithShape(s, i),
                                (this.valueShapes[e] = i.id),
                                (this.shapes[i.id] = e);
                        },
                        renderSlice: function (t, e) {
                            var i,
                                s,
                                n,
                                r,
                                a,
                                o = this.target,
                                h = this.options,
                                l = this.radius,
                                g = h.get("borderWidth"),
                                p = h.get("offset"),
                                u = 2 * D.PI,
                                c = this.values,
                                d = this.total,
                                f = p ? 2 * D.PI * (p / 360) : 0;
                            for (r = c.length, n = 0; n < r; n++) {
                                if (((s = i = f), 0 < d && (s = f + u * (c[n] / d)), t === n))
                                    return (
                                        (a = h.get("sliceColors")[n % h.get("sliceColors").length]),
                                        e && (a = this.calcHighlightColor(a, h)),
                                            o.drawPieSlice(l, l, l - g, i, s, z, a)
                                    );
                                f = s;
                            }
                        },
                        render: function () {
                            var t,
                                e,
                                i = this.target,
                                s = this.values,
                                n = this.options,
                                r = this.radius,
                                a = n.get("borderWidth");
                            if (l._super.render.call(this)) {
                                for (
                                    a &&
                                    i
                                        .drawCircle(
                                            r,
                                            r,
                                            D.floor(r - a / 2),
                                            n.get("borderColor"),
                                            z,
                                            a,
                                        )
                                        .append(),
                                        e = s.length;
                                    e--;

                                )
                                    s[e] &&
                                    ((t = this.renderSlice(e).append()),
                                        (this.valueShapes[e] = t.id),
                                        (this.shapes[t.id] = e));
                                i.render();
                            }
                        },
                    })),
                (A.fn.sparkline.box = _ =
                    e(A.fn.sparkline._base, {
                        type: "box",
                        init: function (t, e, i, s, n) {
                            _._super.init.call(this, t, e, i, s, n),
                                (this.values = A.map(e, Number)),
                                (this.width = "auto" === i.get("width") ? "4.0em" : s),
                                this.initTarget(),
                            this.values.length || (this.disabled = 1);
                        },
                        getRegion: function () {
                            return 1;
                        },
                        getCurrentRegionFields: function () {
                            var t = [
                                { field: "lq", value: this.quartiles[0] },
                                { field: "med", value: this.quartiles[1] },
                                { field: "uq", value: this.quartiles[2] },
                            ];
                            return (
                                this.loutlier !== z &&
                                t.push({ field: "lo", value: this.loutlier }),
                                this.routlier !== z &&
                                t.push({ field: "ro", value: this.routlier }),
                                this.lwhisker !== z &&
                                t.push({ field: "lw", value: this.lwhisker }),
                                this.rwhisker !== z &&
                                t.push({ field: "rw", value: this.rwhisker }),
                                    t
                            );
                        },
                        render: function () {
                            var t,
                                e,
                                i,
                                s,
                                n,
                                r,
                                a,
                                o,
                                h,
                                l,
                                g,
                                p = this.target,
                                u = this.values,
                                c = u.length,
                                d = this.options,
                                f = this.canvasWidth,
                                v = this.canvasHeight,
                                m =
                                    d.get("chartRangeMin") === z
                                        ? D.min.apply(D, u)
                                        : d.get("chartRangeMin"),
                                x =
                                    d.get("chartRangeMax") === z
                                        ? D.max.apply(D, u)
                                        : d.get("chartRangeMax"),
                                y = 0;
                            if (_._super.render.call(this)) {
                                if (d.get("raw"))
                                    d.get("showOutliers") && 5 < u.length
                                        ? ((e = u[0]),
                                            (t = u[1]),
                                            (s = u[2]),
                                            (n = u[3]),
                                            (r = u[4]),
                                            (a = u[5]),
                                            (o = u[6]))
                                        : ((t = u[0]),
                                            (s = u[1]),
                                            (n = u[2]),
                                            (r = u[3]),
                                            (a = u[4]));
                                else if (
                                    (u.sort(function (t, e) {
                                        return t - e;
                                    }),
                                        (s = C(u, 1)),
                                        (n = C(u, 2)),
                                        (i = (r = C(u, 3)) - s),
                                        d.get("showOutliers"))
                                ) {
                                    for (t = a = z, h = 0; h < c; h++)
                                        t === z && u[h] > s - i * d.get("outlierIQR") && (t = u[h]),
                                        u[h] < r + i * d.get("outlierIQR") && (a = u[h]);
                                    (e = u[0]), (o = u[c - 1]);
                                } else (t = u[0]), (a = u[c - 1]);
                                (this.quartiles = [s, n, r]),
                                    (this.lwhisker = t),
                                    (this.rwhisker = a),
                                    (this.loutlier = e),
                                    (this.routlier = o),
                                    (g = f / (x - m + 1)),
                                d.get("showOutliers") &&
                                ((y = D.ceil(d.get("spotRadius"))),
                                    (g = (f -= 2 * D.ceil(d.get("spotRadius"))) / (x - m + 1)),
                                e < t &&
                                p
                                    .drawCircle(
                                        (e - m) * g + y,
                                        v / 2,
                                        d.get("spotRadius"),
                                        d.get("outlierLineColor"),
                                        d.get("outlierFillColor"),
                                    )
                                    .append(),
                                a < o &&
                                p
                                    .drawCircle(
                                        (o - m) * g + y,
                                        v / 2,
                                        d.get("spotRadius"),
                                        d.get("outlierLineColor"),
                                        d.get("outlierFillColor"),
                                    )
                                    .append()),
                                    p
                                        .drawRect(
                                            D.round((s - m) * g + y),
                                            D.round(0.1 * v),
                                            D.round((r - s) * g),
                                            D.round(0.8 * v),
                                            d.get("boxLineColor"),
                                            d.get("boxFillColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((t - m) * g + y),
                                            D.round(v / 2),
                                            D.round((s - m) * g + y),
                                            D.round(v / 2),
                                            d.get("lineColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((t - m) * g + y),
                                            D.round(v / 4),
                                            D.round((t - m) * g + y),
                                            D.round(v - v / 4),
                                            d.get("whiskerColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((a - m) * g + y),
                                            D.round(v / 2),
                                            D.round((r - m) * g + y),
                                            D.round(v / 2),
                                            d.get("lineColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((a - m) * g + y),
                                            D.round(v / 4),
                                            D.round((a - m) * g + y),
                                            D.round(v - v / 4),
                                            d.get("whiskerColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((n - m) * g + y),
                                            D.round(0.1 * v),
                                            D.round((n - m) * g + y),
                                            D.round(0.9 * v),
                                            d.get("medianColor"),
                                        )
                                        .append(),
                                d.get("target") &&
                                ((l = D.ceil(d.get("spotRadius"))),
                                    p
                                        .drawLine(
                                            D.round((d.get("target") - m) * g + y),
                                            D.round(v / 2 - l),
                                            D.round((d.get("target") - m) * g + y),
                                            D.round(v / 2 + l),
                                            d.get("targetColor"),
                                        )
                                        .append(),
                                    p
                                        .drawLine(
                                            D.round((d.get("target") - m) * g + y - l),
                                            D.round(v / 2),
                                            D.round((d.get("target") - m) * g + y + l),
                                            D.round(v / 2),
                                            d.get("targetColor"),
                                        )
                                        .append()),
                                    p.render();
                            }
                        },
                    })),
                (c = e({
                    init: function (t, e, i, s) {
                        (this.target = t), (this.id = e), (this.type = i), (this.args = s);
                    },
                    append: function () {
                        return this.target.appendShape(this), this;
                    },
                })),
                (d = e({
                    _pxregex: /(\d+)(px)?\s*$/i,
                    init: function (t, e, i) {
                        t &&
                        ((this.width = t),
                            (this.height = e),
                            (this.target = i),
                            (this.lastShapeId = null),
                        i[0] && (i = i[0]),
                            A.data(i, "_jqs_vcanvas", this));
                    },
                    drawLine: function (t, e, i, s, n, r) {
                        return this.drawShape(
                            [
                                [t, e],
                                [i, s],
                            ],
                            n,
                            r,
                        );
                    },
                    drawShape: function (t, e, i, s) {
                        return this._genShape("Shape", [t, e, i, s]);
                    },
                    drawCircle: function (t, e, i, s, n, r) {
                        return this._genShape("Circle", [t, e, i, s, n, r]);
                    },
                    drawPieSlice: function (t, e, i, s, n, r, a) {
                        return this._genShape("PieSlice", [t, e, i, s, n, r, a]);
                    },
                    drawRect: function (t, e, i, s, n, r) {
                        return this._genShape("Rect", [t, e, i, s, n, r]);
                    },
                    getElement: function () {
                        return this.canvas;
                    },
                    getLastShapeId: function () {
                        return this.lastShapeId;
                    },
                    reset: function () {
                        alert("reset not implemented");
                    },
                    _insert: function (t, e) {
                        A(e).html(t);
                    },
                    _calculatePixelDims: function (t, e, i) {
                        var s;
                        (s = this._pxregex.exec(e)),
                            (this.pixelHeight = s ? s[1] : A(i).height()),
                            (s = this._pxregex.exec(t)),
                            (this.pixelWidth = s ? s[1] : A(i).width());
                    },
                    _genShape: function (t, e) {
                        var i = b++;
                        return e.unshift(i), new c(this, i, t, e);
                    },
                    appendShape: function (t) {
                        alert("appendShape not implemented");
                    },
                    replaceWithShape: function (t, e) {
                        alert("replaceWithShape not implemented");
                    },
                    insertAfterShape: function (t, e) {
                        alert("insertAfterShape not implemented");
                    },
                    removeShapeId: function (t) {
                        alert("removeShapeId not implemented");
                    },
                    getShapeAt: function (t, e, i) {
                        alert("getShapeAt not implemented");
                    },
                    render: function () {
                        alert("render not implemented");
                    },
                })),
                (f = e(d, {
                    init: function (t, e, i, s) {
                        f._super.init.call(this, t, e, i),
                            (this.canvas = S.createElement("canvas")),
                        i[0] && (i = i[0]),
                            A.data(i, "_jqs_vcanvas", this),
                            A(this.canvas).css({
                                display: "inline-block",
                                width: t,
                                height: e,
                                verticalAlign: "top",
                            }),
                            this._insert(this.canvas, i),
                            this._calculatePixelDims(t, e, this.canvas),
                            (this.canvas.width = this.pixelWidth),
                            (this.canvas.height = this.pixelHeight),
                            (this.interact = s),
                            (this.shapes = {}),
                            (this.shapeseq = []),
                            (this.currentTargetShapeId = z),
                            A(this.canvas).css({
                                width: this.pixelWidth,
                                height: this.pixelHeight,
                            });
                    },
                    _getContext: function (t, e, i) {
                        var s = this.canvas.getContext("2d");
                        return (
                            t !== z && (s.strokeStyle = t),
                                (s.lineWidth = i === z ? 1 : i),
                            e !== z && (s.fillStyle = e),
                                s
                        );
                    },
                    reset: function () {
                        this._getContext().clearRect(
                            0,
                            0,
                            this.pixelWidth,
                            this.pixelHeight,
                        ),
                            (this.shapes = {}),
                            (this.shapeseq = []),
                            (this.currentTargetShapeId = z);
                    },
                    _drawShape: function (t, e, i, s, n) {
                        var r,
                            a,
                            o = this._getContext(i, s, n);
                        for (
                            o.beginPath(),
                                o.moveTo(e[0][0] + 0.5, e[0][1] + 0.5),
                                r = 1,
                                a = e.length;
                            r < a;
                            r++
                        )
                            o.lineTo(e[r][0] + 0.5, e[r][1] + 0.5);
                        i !== z && o.stroke(),
                        s !== z && o.fill(),
                        this.targetX !== z &&
                        this.targetY !== z &&
                        o.isPointInPath(this.targetX, this.targetY) &&
                        (this.currentTargetShapeId = t);
                    },
                    _drawCircle: function (t, e, i, s, n, r, a) {
                        var o = this._getContext(n, r, a);
                        o.beginPath(),
                            o.arc(e, i, s, 0, 2 * D.PI, !1),
                        this.targetX !== z &&
                        this.targetY !== z &&
                        o.isPointInPath(this.targetX, this.targetY) &&
                        (this.currentTargetShapeId = t),
                        n !== z && o.stroke(),
                        r !== z && o.fill();
                    },
                    _drawPieSlice: function (t, e, i, s, n, r, a, o) {
                        var h = this._getContext(a, o);
                        h.beginPath(),
                            h.moveTo(e, i),
                            h.arc(e, i, s, n, r, !1),
                            h.lineTo(e, i),
                            h.closePath(),
                        a !== z && h.stroke(),
                        o && h.fill(),
                        this.targetX !== z &&
                        this.targetY !== z &&
                        h.isPointInPath(this.targetX, this.targetY) &&
                        (this.currentTargetShapeId = t);
                    },
                    _drawRect: function (t, e, i, s, n, r, a) {
                        return this._drawShape(
                            t,
                            [
                                [e, i],
                                [e + s, i],
                                [e + s, i + n],
                                [e, i + n],
                                [e, i],
                            ],
                            r,
                            a,
                        );
                    },
                    appendShape: function (t) {
                        return (
                            (this.shapes[t.id] = t),
                                this.shapeseq.push(t.id),
                                (this.lastShapeId = t.id),
                                t.id
                        );
                    },
                    replaceWithShape: function (t, e) {
                        var i,
                            s = this.shapeseq;
                        for (this.shapes[e.id] = e, i = s.length; i--; )
                            s[i] == t && (s[i] = e.id);
                        delete this.shapes[t];
                    },
                    replaceWithShapes: function (t, e) {
                        var i,
                            s,
                            n,
                            r = this.shapeseq,
                            a = {};
                        for (s = t.length; s--; ) a[t[s]] = !0;
                        for (s = r.length; s--; )
                            a[(i = r[s])] && (r.splice(s, 1), delete this.shapes[i], (n = s));
                        for (s = e.length; s--; )
                            r.splice(n, 0, e[s].id), (this.shapes[e[s].id] = e[s]);
                    },
                    insertAfterShape: function (t, e) {
                        var i,
                            s = this.shapeseq;
                        for (i = s.length; i--; )
                            if (s[i] === t)
                                return s.splice(i + 1, 0, e.id), void (this.shapes[e.id] = e);
                    },
                    removeShapeId: function (t) {
                        var e,
                            i = this.shapeseq;
                        for (e = i.length; e--; )
                            if (i[e] === t) {
                                i.splice(e, 1);
                                break;
                            }
                        delete this.shapes[t];
                    },
                    getShapeAt: function (t, e, i) {
                        return (
                            (this.targetX = e),
                                (this.targetY = i),
                                this.render(),
                                this.currentTargetShapeId
                        );
                    },
                    render: function () {
                        var t,
                            e,
                            i = this.shapeseq,
                            s = this.shapes,
                            n = i.length;
                        for (
                            this._getContext().clearRect(
                                0,
                                0,
                                this.pixelWidth,
                                this.pixelHeight,
                            ),
                                e = 0;
                            e < n;
                            e++
                        )
                            this["_draw" + (t = s[i[e]]).type].apply(this, t.args);
                        this.interact || ((this.shapes = {}), (this.shapeseq = []));
                    },
                })),
                (v = e(d, {
                    init: function (t, e, i) {
                        var s;
                        v._super.init.call(this, t, e, i),
                        i[0] && (i = i[0]),
                            A.data(i, "_jqs_vcanvas", this),
                            (this.canvas = S.createElement("span")),
                            A(this.canvas).css({
                                display: "inline-block",
                                position: "relative",
                                overflow: "hidden",
                                width: t,
                                height: e,
                                margin: "0px",
                                padding: "0px",
                                verticalAlign: "top",
                            }),
                            this._insert(this.canvas, i),
                            this._calculatePixelDims(t, e, this.canvas),
                            (this.canvas.width = this.pixelWidth),
                            (this.canvas.height = this.pixelHeight),
                            (s =
                                '<v:group coordorigin="0 0" coordsize="' +
                                this.pixelWidth +
                                " " +
                                this.pixelHeight +
                                '" style="position:absolute;top:0;left:0;width:' +
                                this.pixelWidth +
                                "px;height=" +
                                this.pixelHeight +
                                'px;"></v:group>'),
                            this.canvas.insertAdjacentHTML("beforeEnd", s),
                            (this.group = A(this.canvas).children()[0]),
                            (this.rendered = !1),
                            (this.prerender = "");
                    },
                    _drawShape: function (t, e, i, s, n) {
                        var r,
                            a,
                            o,
                            h,
                            l,
                            g,
                            p = [];
                        for (g = 0, l = e.length; g < l; g++)
                            p[g] = e[g][0] + "," + e[g][1];
                        return (
                            (r = p.splice(0, 1)),
                                (n = n === z ? 1 : n),
                                (a =
                                    i === z
                                        ? ' stroked="false" '
                                        : ' strokeWeight="' + n + 'px" strokeColor="' + i + '" '),
                                (o =
                                    s === z
                                        ? ' filled="false"'
                                        : ' fillColor="' + s + '" filled="true" '),
                                (h = p[0] === p[p.length - 1] ? "x " : ""),
                            '<v:shape coordorigin="0 0" coordsize="' +
                            this.pixelWidth +
                            " " +
                            this.pixelHeight +
                            '"  id="jqsshape' +
                            t +
                            '" ' +
                            a +
                            o +
                            ' style="position:absolute;left:0px;top:0px;height:' +
                            this.pixelHeight +
                            "px;width:" +
                            this.pixelWidth +
                            'px;padding:0px;margin:0px;"  path="m ' +
                            r +
                            " l " +
                            p.join(", ") +
                            " " +
                            h +
                            'e"> </v:shape>'
                        );
                    },
                    _drawCircle: function (t, e, i, s, n, r, a) {
                        return (
                            '<v:oval  id="jqsshape' +
                            t +
                            '" ' +
                            (n === z
                                ? ' stroked="false" '
                                : ' strokeWeight="' + a + 'px" strokeColor="' + n + '" ') +
                            (r === z
                                ? ' filled="false"'
                                : ' fillColor="' + r + '" filled="true" ') +
                            ' style="position:absolute;top:' +
                            (i -= s) +
                            "px; left:" +
                            (e -= s) +
                            "px; width:" +
                            2 * s +
                            "px; height:" +
                            2 * s +
                            'px"></v:oval>'
                        );
                    },
                    _drawPieSlice: function (t, e, i, s, n, r, a, o) {
                        var h, l, g, p, u, c, d;
                        if (n === r) return "";
                        if (
                            (r - n == 2 * D.PI && ((n = 0), (r = 2 * D.PI)),
                                (l = e + D.round(D.cos(n) * s)),
                                (g = i + D.round(D.sin(n) * s)),
                                (p = e + D.round(D.cos(r) * s)),
                                (u = i + D.round(D.sin(r) * s)),
                            l === p && g === u)
                        ) {
                            if (r - n < D.PI) return "";
                            (l = p = e + s), (g = u = i);
                        }
                        return l === p && g === u && r - n < D.PI
                            ? ""
                            : ((h = [e - s, i - s, e + s, i + s, l, g, p, u]),
                                (c =
                                    a === z
                                        ? ' stroked="false" '
                                        : ' strokeWeight="1px" strokeColor="' + a + '" '),
                                (d =
                                    o === z
                                        ? ' filled="false"'
                                        : ' fillColor="' + o + '" filled="true" '),
                            '<v:shape coordorigin="0 0" coordsize="' +
                            this.pixelWidth +
                            " " +
                            this.pixelHeight +
                            '"  id="jqsshape' +
                            t +
                            '" ' +
                            c +
                            d +
                            ' style="position:absolute;left:0px;top:0px;height:' +
                            this.pixelHeight +
                            "px;width:" +
                            this.pixelWidth +
                            'px;padding:0px;margin:0px;"  path="m ' +
                            e +
                            "," +
                            i +
                            " wa " +
                            h.join(", ") +
                            ' x e"> </v:shape>');
                    },
                    _drawRect: function (t, e, i, s, n, r, a) {
                        return this._drawShape(
                            t,
                            [
                                [e, i],
                                [e, i + n],
                                [e + s, i + n],
                                [e + s, i],
                                [e, i],
                            ],
                            r,
                            a,
                        );
                    },
                    reset: function () {
                        this.group.innerHTML = "";
                    },
                    appendShape: function (t) {
                        var e = this["_draw" + t.type].apply(this, t.args);
                        return (
                            this.rendered
                                ? this.group.insertAdjacentHTML("beforeEnd", e)
                                : (this.prerender += e),
                                (this.lastShapeId = t.id),
                                t.id
                        );
                    },
                    replaceWithShape: function (t, e) {
                        var i = A("#jqsshape" + t),
                            s = this["_draw" + e.type].apply(this, e.args);
                        i[0].outerHTML = s;
                    },
                    replaceWithShapes: function (t, e) {
                        var i,
                            s = A("#jqsshape" + t[0]),
                            n = "",
                            r = e.length;
                        for (i = 0; i < r; i++)
                            n += this["_draw" + e[i].type].apply(this, e[i].args);
                        for (s[0].outerHTML = n, i = 1; i < t.length; i++)
                            A("#jqsshape" + t[i]).remove();
                    },
                    insertAfterShape: function (t, e) {
                        var i = A("#jqsshape" + t),
                            s = this["_draw" + e.type].apply(this, e.args);
                        i[0].insertAdjacentHTML("afterEnd", s);
                    },
                    removeShapeId: function (t) {
                        var e = A("#jqsshape" + t);
                        this.group.removeChild(e[0]);
                    },
                    getShapeAt: function (t, e, i) {
                        return t.id.substr(8);
                    },
                    render: function () {
                        this.rendered ||
                        ((this.group.innerHTML = this.prerender), (this.rendered = !0));
                    },
                }));
        }),
            "function" == typeof define && define.amd
                ? define(["jquery"], t)
                : jQuery && !jQuery.fn.sparkline && t(jQuery);
    })(document, Math);