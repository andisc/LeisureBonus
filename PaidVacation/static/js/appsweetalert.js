/*!
 * Beagle v1.7.0
 * https://foxythemes.net
 *
 * Copyright (c) 2019 Foxy Themes
 */
var App = function() {
    "use strict";
    var e, t, o, i, a, n, r, l, s, c, d, u, p, h, f, g, m, b, v = {
            assetsPath: "assets",
            imgPath: "img",
            jsPath: "js",
            libsPath: "lib",
            leftSidebarSlideSpeed: 200,
            leftSidebarToggleSpeed: 300,
            enableLeftSidebar: !0,
            enableSwipe: !0,
            swipeTreshold: 100,
            scrollTop: !0,
            openRightSidebarClass: "open-right-sidebar",
            openLeftSidebarClass: "open-left-sidebar",
            disabledLeftSidebarClass: "be-left-sidebar-disabled",
            offCanvasLeftSidebarClass: "be-offcanvas-menu",
            offCanvasLeftSidebarMobileClass: "be-offcanvas-menu-sm",
            topHeaderMenuClass: "be-top-menu",
            closeRsOnClickOutside: !0,
            removeLeftSidebarClass: "be-nosidebar-left",
            collapsibleSidebarClass: "be-collapsible-sidebar",
            collapsibleSidebarCollapsedClass: "be-collapsible-sidebar-collapsed",
            openLeftSidebarOnClick: !0,
            transitionClass: "be-animate",
            openSidebarDelay: 400
        },
        w = {},
        k = {};

    function y(e) {
        var t = $("<div>", {
                class: e
            }).appendTo("body"),
            o = t.css("background-color");
        return t.remove(), o
    }

    function C(e) {
        void 0 !== e && e.update()
    }

    function S(e) {
        e.destroy()
    }

    function x(e) {
        if (void 0 !== e[0]) return new PerfectScrollbar(e[0], {
            wheelPropagation: !1
        })
    }

    function A() {
        $(".be-scroller", a);
        var t = $(".be-scroller-chat", a),
            o = $(".be-scroller-todo", a),
            i = $(".be-scroller-settings", a);

        function n() {
            e.removeClass(v.openRightSidebarClass).addClass(v.transitionClass), T()
        }
        a.length > 0 && ($(".be-toggle-right-sidebar").on("click", function(t) {
            s && e.hasClass(v.openRightSidebarClass) ? n() : s || (e.addClass(v.openRightSidebarClass + " " + v.transitionClass), s = !0), t.preventDefault()
        }), $(document).on("mousedown touchstart", function(t) {
            !$(t.target).closest(a).length && e.hasClass(v.openRightSidebarClass) && (v.closeRsOnClickOutside || $.isSm()) && n()
        })), void 0 !== h && h && h.nodeName || !t.length || (h = x(t)), void 0 !== f && f && f.nodeName || !o.length || (f = x(o)), void 0 !== g && g && g.nodeName || !i.length || (g = x(i)), $(window).resize(function() {
            P(function() {
                C(h), C(f), C(g)
            }, 500, "be_rs_update_scroller")
        }), $('a[data-toggle="tab"]', a).on("shown.bs.tab", function(e) {
            C(h), C(f), C(g)
        })
    }

    function T() {
        s = !0, setTimeout(function() {
            s = !1
        }, v.openSidebarDelay)
    }

    function _() {
        var e = $(".be-right-sidebar .tab-chat"),
            t = $(".chat-contacts", e),
            o = $(".chat-window", e),
            i = $(".chat-messages", o),
            a = $(".content ul", i),
            n = $(".be-scroller-messages", i),
            r = $(".chat-input", o),
            l = $("input", r),
            s = $(".send-msg", r);

        function c(e, t) {
            var o = $('<li class="' + (t ? "self" : "friend") + '"></li>');
            "" != e && ($('<div class="msg">' + e + "</div>").appendTo(o), o.appendTo(a), n.stop().animate({
                scrollTop: n.prop("scrollHeight")
            }, 900, "swing"), C(m))
        }
        $(".user a", t).on("click", function(t) {
            e.hasClass("chat-opened") || (e.addClass("chat-opened"), void 0 !== m && m && m.nodeName || (m = x(n))), t.preventDefault()
        }), $(".title .return", o).on("click", function(t) {
            e.hasClass("chat-opened") && e.removeClass("chat-opened"), M()
        }), l.keypress(function(e) {
            var t = e.keyCode ? e.keyCode : e.which,
                o = $(this).val();
            "13" == t && (c(o, !0), $(this).val("")), e.stopPropagation()
        }), s.on("click", function() {
            c(l.val(), !0), l.val("")
        })
    }

    function M() {
        void 0 !== c && c && c.nodeName || (c = x(r))
    }
    var E, P = (E = {}, function(e, t, o) {
        o || (o = "x1x2x3x4"), E[o] && clearTimeout(E[o]), E[o] = setTimeout(e, t)
    });
    return {
        conf: v,
        color: w,
        scroller: k,
        init: function(E) {
            var L, F;
            e = $("body"), t = $(".be-wrapper"), o = $(".be-top-header", t), i = $(".be-left-sidebar", t), a = $(".be-right-sidebar", t), n = $(".be-scroller-aside", t), l = $(".be-toggle-left-sidebar", o), r = $(".be-scroller-notifications", o), s = !1, $.extend(v, E), FastClick.attach(document.body), v.enableLeftSidebar ? function() {
                var a, n, r = $(".sidebar-elements > li > a", i),
                    c = $(".sidebar-elements li a", i),
                    h = $(".left-sidebar-scroll", i),
                    f = $(".left-sidebar-toggle", i),
                    g = !!v.openLeftSidebarOnClick;

                function m() {
                    return t.hasClass(v.collapsibleSidebarCollapsedClass)
                }

                function b(e, o) {
                    var a = $(o.currentTarget),
                        n = $(e).parent(),
                        r = $("li.open", n),
                        l = !a.closest(i).length,
                        s = v.leftSidebarSlideSpeed,
                        c = a.parents().eq(1).hasClass("sidebar-elements");
                    !$.isSm() && m() && (c || l) ? (n.removeClass("open"), e.removeClass("visible"), r.removeClass("open").removeAttr("style")) : e.slideUp({
                        duration: s,
                        complete: function() {
                            n.removeClass("open"), $(this).removeAttr("style"), r.removeClass("open").removeAttr("style"), t.hasClass("be-fixed-sidebar") && !$.isSm() && C(d)
                        }
                    })
                }

                function w(e, o) {
                    var i = $(e),
                        a = $(i).parent(),
                        n = $(i).next(),
                        r = v.leftSidebarSlideSpeed,
                        l = $(o.currentTarget).parents().eq(1).hasClass("sidebar-elements"),
                        s = a.siblings(".open");
                    s && b($("> ul", s), o), !$.isSm() && m() && l ? (a.addClass("open"), n.addClass("visible"), void 0 !== p && S(p), void 0 !== p && p && p.nodeName || (p = x(a.find(".be-scroller"))), $(window).resize(function() {
                        P(function() {
                            $.isXs() || void 0 !== p && C(p)
                        }, 500, "am_check_phone_classes")
                    })) : n.slideDown({
                        duration: r,
                        complete: function() {
                            a.addClass("open"), $(this).removeAttr("style"), t.hasClass("be-fixed-sidebar") && !$.isSm() && C(d)
                        }
                    })
                }
                t.hasClass(v.collapsibleSidebarClass) && (n = void 0 !== a ? a : $(".sidebar-elements > li", i), $.each(n, function() {
                    var e = $(this).find("> a span").html(),
                        t = $(this).find("> ul"),
                        o = $("> li", t);
                    e = $('<li class="title">' + e + "</li>");
                    var i = $('<li class="nav-items"><div class="be-scroller"><div class="content"><ul></ul></div></div></li>');
                    t.find("> li.title").length || (t.prepend(e), o.appendTo(i.find(".content ul")), i.appendTo(t))
                }), $(".be-toggle-left-sidebar").on("click", function() {
                    t.hasClass(v.collapsibleSidebarCollapsedClass) ? (t.removeClass(v.collapsibleSidebarCollapsedClass), $("li.open", i).removeClass("open"), $("li.active", i).parents(".parent").addClass("active open"), i.trigger("shown.left-sidebar.collapse"), void 0 !== u && u && u.nodeName || (u = x($(".be-scroller", i))), S(u), void 0 !== p && S(p)) : (t.addClass(v.collapsibleSidebarCollapsedClass), $("li.active", i).parents(".parent").removeClass("open"), $("li.open", i).removeClass("open"), i.trigger("hidden.left-sidebar.collapse"))
                }), function() {
                    for (var e = $(".sidebar-elements > li > a", i), o = 0; o <= e.length; o++) {
                        var a = e[o],
                            n = $("> span", a).text();
                        $(a).attr({
                            "data-toggle": "tooltip",
                            "data-placement": "right",
                            title: n
                        }), $(a).tooltip({
                            trigger: "manual"
                        })
                    }
                    e.on("mouseenter", function() {
                        !$.isSm() && t.hasClass(v.collapsibleSidebarCollapsedClass) && $(this).tooltip("show")
                    }), e.on("mouseleave", function() {
                        $(this).tooltip("hide")
                    })
                }(), g || (r.on("mouseover", function(e) {
                    m() && w(this, e)
                }), r.on("touchstart", function(e) {
                    var t = $(this),
                        o = t.parent(),
                        i = t.next();
                    m() && !$.isSm() && (o.hasClass("open") ? b(i, e) : w(this, e), $(this).next().is("ul") && e.preventDefault())
                }), r.on("mouseleave", function(e) {
                    var t = $(this),
                        o = t.parent(),
                        i = o.find("> ul");
                    !$.isSm() && m() && (i.length > 0 ? setTimeout(function() {
                        i.is(":hover") ? i.on("mouseleave", function() {
                            setTimeout(function() {
                                t.is(":hover") || (b(i, e), i.off("mouseleave"))
                            }, 300)
                        }) : b(i, e)
                    }, 300) : o.removeClass("open"))
                })), $(document).on("mousedown touchstart", function(e) {
                    $(e.target).closest(i).length || $.isSm() || b($("ul.visible", i), e)
                })), c.on("click", function(e) {
                    var t = $(this),
                        o = t.parent(),
                        i = t.next();
                    t.parents().eq(1).hasClass("sidebar-elements"), o.siblings(".open"), o.hasClass("open") ? b(i, e) : w(this, e), t.next().is("ul") && e.preventDefault()
                }), t.hasClass(v.collapsibleSidebarCollapsedClass) ? $("li.active", i).parents(".parent").addClass("active") : $("li.active", i).parents(".parent").addClass("active open"), o.find(".container-fluid > .navbar-collapse").length && i.length && (t.addClass(v.offCanvasLeftSidebarClass).addClass(v.offCanvasLeftSidebarMobileClass), t.addClass(v.topHeaderMenuClass), l = $('<a class="nav-link be-toggle-left-sidebar" href="#"><span class="icon mdi mdi-menu"></span></a>'), $(".be-navbar-header", o).prepend(l)), t.hasClass("be-fixed-sidebar") && ($.isSm() && !t.hasClass(v.offCanvasLeftSidebarClass) || void 0 !== d && d && d.nodeName || (d = x(h)), $(window).resize(function() {
                    P(function() {
                        $.isSm() && !t.hasClass(v.offCanvasLeftSidebarClass) ? S(d) : h.hasClass("ps") ? C(d) : void 0 !== d && d && d.nodeName || (d = x(h))
                    }, 500, "be_update_scroller")
                })), f.on("click", function(e) {
                    var t = $(this).next(".left-sidebar-spacer");
                    $(this).toggleClass("open"), t.slideToggle(v.leftSidebarToggleSpeed, function() {
                        $(this).removeAttr("style").toggleClass("open")
                    }), e.preventDefault()
                }), t.hasClass(v.offCanvasLeftSidebarClass) && (l.on("click", function(t) {
                    s && e.hasClass(v.openLeftSidebarClass) ? (e.removeClass(v.openLeftSidebarClass), T()) : (e.addClass(v.openLeftSidebarClass + " " + v.transitionClass), s = !0), t.preventDefault()
                }), $(document).on("mousedown touchstart", function(t) {
                    $(t.target).closest(i).length || $(t.target).closest(l).length || !e.hasClass(v.openLeftSidebarClass) || (e.removeClass(v.openLeftSidebarClass), T())
                }))
            }() : t.addClass(v.disabledLeftSidebarClass), a.length && (A(), _()), v.enableSwipe && t.swipe({
                allowPageScroll: "vertical",
                preventDefaultEvents: !1,
                fallbackToMouseEvents: !1,
                swipeLeft: function(t) {
                    !s && a.length > 0 && (e.addClass(v.openRightSidebarClass + " " + v.transitionClass), s = !0)
                },
                threshold: v.swipeTreshold
            }), v.scrollTop && ((L = $('<div class="be-scroll-top"></div>')).appendTo("body"), $(window).on("scroll", function() {
                $(this).scrollTop() > 220 ? L.fadeIn(500) : L.fadeOut(500)
            }), L.on("touchstart mouseup", function(e) {
                $("html, body").animate({
                    scrollTop: 0
                }, 500), e.preventDefault()
            })), n.length && (F = n, b = x(n), $(window).resize(function() {
                $.isSm() && !t.hasClass(v.offCanvasLeftSidebarClass) ? S(b) : F.hasClass("ps") ? C(b) : void 0 !== b && b && b.nodeName || (b = x(n))
            })), r.length && M(), w.primary = y("clr-primary"), w.success = y("clr-success"), w.warning = y("clr-warning"), w.danger = y("clr-danger"), w.grey = y("clr-grey"), k.be_scroller_notifications = c, k.left_sidebar_scroll = d, k.be_left_sidebar_scroll = u, k.sub_menu_scroll = p, k.chat_scroll = h, k.todo_scroll = f, k.settings_scroll = g, k.messages_scroll = m, k.aside_scroll = b, k.updateScroller = C, k.destroyScroller = S, k.initScroller = x, $(".be-icons-nav .dropdown").on("shown.bs.dropdown", function() {
                C(c)
            }), $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), $(".modal").on("show.bs.modal", function() {
                $("html").addClass("be-modal-open")
            }), $(".modal").on("hidden.bs.modal", function() {
                $("html").removeClass("be-modal-open")
            })
        },
        activeItemLeftSidebar: function(e) {
            var t = $(e).parent(),
                o = $(t).parents("li");
            t.hasClass("active") || ($("li.active", i).removeClass("active"), $(o).addClass("active"), $(t).addClass("active"))
        }
    }
}();

function FastClick(e, t) {
    "use strict";
    var o;
    if (t = t || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = t.touchBoundary || 10, this.layer = e, this.tapDelay = t.tapDelay || 200, !FastClick.notNeeded(e)) {
        for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], a = 0, n = i.length; a < n; a++) this[i[a]] = r(this[i[a]], this);
        deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, o, i) {
            var a = Node.prototype.removeEventListener;
            "click" === t ? a.call(e, t, o.hijacked || o, i) : a.call(e, t, o, i)
        }, e.addEventListener = function(t, o, i) {
            var a = Node.prototype.addEventListener;
            "click" === t ? a.call(e, t, o.hijacked || (o.hijacked = function(e) {
                e.propagationStopped || o(e)
            }), i) : a.call(e, t, o, i)
        }), "function" == typeof e.onclick && (o = e.onclick, e.addEventListener("click", function(e) {
            o(e)
        }, !1), e.onclick = null)
    }

    function r(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
}
var deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0,
    deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
    deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
    deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent),
    deviceIsBlackBerry10 = navigator.userAgent.indexOf("BB10") > 0;
FastClick.prototype.needsClick = function(e) {
        "use strict";
        switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled) return !0;
                break;
            case "input":
                if (deviceIsIOS && "file" === e.type || e.disabled) return !0;
                break;
            case "label":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, FastClick.prototype.needsFocus = function(e) {
        "use strict";
        switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !deviceIsAndroid;
            case "input":
                switch (e.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, FastClick.prototype.sendClick = function(e, t) {
        "use strict";
        var o, i, a, n;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), n = t.changedTouches[0], (a = document.createEvent("MouseEvents")).initMouseEvent("mousedown", !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), a.forwardedTouchEvent = !0, e.dispatchEvent(a), (i = document.createEvent("MouseEvents")).initMouseEvent("mouseup", !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i), (o = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), o.forwardedTouchEvent = !0, e.dispatchEvent(o)
    }, FastClick.prototype.determineEventType = function(e) {
        "use strict";
        return deviceIsAndroid && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, FastClick.prototype.focus = function(e) {
        "use strict";
        var t;
        deviceIsIOS && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, FastClick.prototype.updateScrollParent = function(e) {
        "use strict";
        var t, o;
        if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
            o = e;
            do {
                if (o.scrollHeight > o.offsetHeight) {
                    t = o, e.fastClickScrollParent = o;
                    break
                }
                o = o.parentElement
            } while (o)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, FastClick.prototype.getTargetElementFromEventTarget = function(e) {
        "use strict";
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, FastClick.prototype.onTouchStart = function(e) {
        "use strict";
        var t, o, i;
        if (e.targetTouches.length > 1) return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), o = e.targetTouches[0], deviceIsIOS) {
            if ((i = window.getSelection()).rangeCount && !i.isCollapsed) return !0;
            if (!deviceIsIOS4) {
                if (o.identifier && o.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                this.lastTouchIdentifier = o.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = o.pageX, this.touchStartY = o.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, FastClick.prototype.touchHasMoved = function(e) {
        "use strict";
        var t = e.changedTouches[0],
            o = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > o || Math.abs(t.pageY - this.touchStartY) > o
    }, FastClick.prototype.onTouchMove = function(e) {
        "use strict";
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, FastClick.prototype.findControl = function(e) {
        "use strict";
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, FastClick.prototype.onTouchEnd = function(e) {
        "use strict";
        var t, o, i, a, n, r = this.targetElement;
        if (!this.trackingClick) return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, deviceIsIOSWithBadTarget && (n = e.changedTouches[0], (r = document.elementFromPoint(n.pageX - window.pageXOffset, n.pageY - window.pageYOffset) || r).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (i = r.tagName.toLowerCase())) {
            if (t = this.findControl(r)) {
                if (this.focus(r), deviceIsAndroid) return !1;
                r = t
            }
        } else if (this.needsFocus(r)) return e.timeStamp - o > 100 || deviceIsIOS && window.top !== window && "input" === i ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, e), deviceIsIOS && "select" === i || (this.targetElement = null, e.preventDefault()), !1);
        return !(!deviceIsIOS || deviceIsIOS4 || !(a = r.fastClickScrollParent) || a.fastClickLastScrollTop === a.scrollTop) || (this.needsClick(r) || (e.preventDefault(), this.sendClick(r, e)), !1)
    }, FastClick.prototype.onTouchCancel = function() {
        "use strict";
        this.trackingClick = !1, this.targetElement = null
    }, FastClick.prototype.onMouse = function(e) {
        "use strict";
        return !(this.targetElement && !e.forwardedTouchEvent && e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) && (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), 1))
    }, FastClick.prototype.onClick = function(e) {
        "use strict";
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
    }, FastClick.prototype.destroy = function() {
        "use strict";
        var e = this.layer;
        deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, FastClick.notNeeded = function(e) {
        "use strict";
        var t, o, i;
        if (void 0 === window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!deviceIsAndroid) return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (deviceIsBlackBerry10 && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && i[2] >= 3 && (t = document.querySelector("meta[name=viewport]"))) {
            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === e.style.msTouchAction
    }, FastClick.attach = function(e, t) {
        "use strict";
        return new FastClick(e, t)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        "use strict";
        return FastClick
    }) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick,
    function(e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e("undefined" != typeof module && module.exports ? require("jquery") : jQuery)
    }(function(e) {
        "use strict";

        function t(t) {
            return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = s), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function() {
                var T = e(this),
                    _ = T.data(A);
                _ || (_ = new function(t, T) {
                    function _(t) {
                        if (!(!0 === Ce.data(A + "_intouch") || e(t.target).closest(T.excludedElements, Ce).length > 0)) {
                            var r = t.originalEvent ? t.originalEvent : t;
                            if (!r.pointerType || "mouse" != r.pointerType || 0 != T.fallbackToMouseEvents) {
                                var l, s = r.touches,
                                    c = s ? s[0] : r;
                                return $e = w, s ? Se = s.length : !1 !== T.preventDefaultEvents && t.preventDefault(), pe = 0, he = null, fe = null, ke = null, ge = 0, me = 0, be = 0, ve = 1, we = 0, (d = {})[o] = te(o), d[i] = te(i), d[a] = te(a), d[n] = te(n), ye = d, V(), Z(0, c), !s || Se === T.fingers || T.fingers === b || Y() ? (Ae = ne(), 2 == Se && (Z(1, s[1]), me = be = ie(xe[0].start, xe[1].start)), (T.swipeStatus || T.pinchStatus) && (l = D(r, $e))) : l = !1, !1 === l ? (D(r, $e = C), l) : (T.hold && (Le = setTimeout(e.proxy(function() {
                                    Ce.trigger("hold", [r.target]), T.hold && (l = T.hold.call(Ce, r, r.target))
                                }, this), T.longTapThreshold)), J(!0), null)
                            }
                        }
                        var d
                    }

                    function M(t) {
                        var d, u, p, h, f, v, w, $, S = t.originalEvent ? t.originalEvent : t;
                        if ($e !== y && $e !== C && !Q()) {
                            var x, A = S.touches,
                                _ = A ? A[0] : S,
                                M = K(_);
                            if (Te = ne(), A && (Se = A.length), T.hold && clearTimeout(Le), $e = k, 2 == Se && (0 == me ? (Z(1, A[1]), me = be = ie(xe[0].start, xe[1].start)) : (K(A[1]), be = ie(xe[0].end, xe[1].end), xe[0].end, xe[1].end, ke = ve < 1 ? l : r), ve = (be / me * 1).toFixed(2), we = Math.abs(me - be)), Se === T.fingers || T.fingers === b || !A || Y()) {
                                if (he = ae(M.start, M.end), fe = ae(M.last, M.end), function(e, t) {
                                        if (!1 !== T.preventDefaultEvents)
                                            if (T.allowPageScroll === s) e.preventDefault();
                                            else {
                                                var r = T.allowPageScroll === c;
                                                switch (t) {
                                                    case o:
                                                        (T.swipeLeft && r || !r && T.allowPageScroll != g) && e.preventDefault();
                                                        break;
                                                    case i:
                                                        (T.swipeRight && r || !r && T.allowPageScroll != g) && e.preventDefault();
                                                        break;
                                                    case a:
                                                        (T.swipeUp && r || !r && T.allowPageScroll != m) && e.preventDefault();
                                                        break;
                                                    case n:
                                                        (T.swipeDown && r || !r && T.allowPageScroll != m) && e.preventDefault()
                                                }
                                            }
                                    }(t, fe), w = M.start, $ = M.end, pe = Math.round(Math.sqrt(Math.pow($.x - w.x, 2) + Math.pow($.y - w.y, 2))), ge = oe(), v = pe, (f = he) != s && (v = Math.max(v, ee(f)), ye[f].distance = v), x = D(S, $e), !T.triggerOnTouchEnd || T.triggerOnTouchLeave) {
                                    var E = !0;
                                    if (T.triggerOnTouchLeave) {
                                        var P = {
                                            left: (h = (p = e(p = this)).offset()).left,
                                            right: h.left + p.outerWidth(),
                                            top: h.top,
                                            bottom: h.top + p.outerHeight()
                                        };
                                        d = M.end, u = P, E = d.x > u.left && d.x < u.right && d.y > u.top && d.y < u.bottom
                                    }!T.triggerOnTouchEnd && E ? $e = B(k) : T.triggerOnTouchLeave && !E && ($e = B(y)), $e != C && $e != y || D(S, $e)
                                }
                            } else D(S, $e = C);
                            !1 === x && D(S, $e = C)
                        }
                    }

                    function E(e) {
                        var t, o = e.originalEvent ? e.originalEvent : e,
                            i = o.touches;
                        if (i) {
                            if (i.length && !Q()) return t = o, _e = ne(), Me = t.touches.length + 1, !0;
                            if (i.length && Q()) return !0
                        }
                        return Q() && (Se = Me), Te = ne(), ge = oe(), O() || !R() ? D(o, $e = C) : T.triggerOnTouchEnd || !1 === T.triggerOnTouchEnd && $e === k ? (!1 !== T.preventDefaultEvents && !1 !== e.cancelable && e.preventDefault(), D(o, $e = y)) : !T.triggerOnTouchEnd && j() ? I(o, $e = y, p) : $e === k && D(o, $e = C), J(!1), null
                    }

                    function P() {
                        Se = 0, Te = 0, Ae = 0, me = 0, be = 0, ve = 1, V(), J(!1)
                    }

                    function L(e) {
                        var t = e.originalEvent ? e.originalEvent : e;
                        T.triggerOnTouchLeave && ($e = B(y), D(t, $e))
                    }

                    function F() {
                        Ce.unbind(le, _), Ce.unbind(ue, P), Ce.unbind(se, M), Ce.unbind(ce, E), de && Ce.unbind(de, L), J(!1)
                    }

                    function B(e) {
                        var t = e,
                            o = H(),
                            i = R(),
                            a = O();
                        return !o || a ? t = C : !i || e != k || T.triggerOnTouchEnd && !T.triggerOnTouchLeave ? !i && e == y && T.triggerOnTouchLeave && (t = C) : t = y, t
                    }

                    function D(e, t) {
                        var o, i = e.touches;
                        return (!(!z() || !W()) || W()) && (o = I(e, t, d)), (!(!N() || !Y()) || Y()) && !1 !== o && (o = I(e, t, u)), X() && G() && !1 !== o ? o = I(e, t, h) : ge > T.longTapThreshold && pe < v && T.longTap && !1 !== o ? o = I(e, t, f) : !(1 !== Se && $ || !(isNaN(pe) || pe < T.threshold) || !j()) && !1 !== o && (o = I(e, t, p)), t === C && P(), t === y && (i && i.length || P()), o
                    }

                    function I(t, s, c) {
                        var g;
                        if (c == d) {
                            if (Ce.trigger("swipeStatus", [s, he || null, pe || 0, ge || 0, Se, xe, fe]), T.swipeStatus && !1 === (g = T.swipeStatus.call(Ce, t, s, he || null, pe || 0, ge || 0, Se, xe, fe))) return !1;
                            if (s == y && z()) {
                                if (clearTimeout(Pe), clearTimeout(Le), Ce.trigger("swipe", [he, pe, ge, Se, xe, fe]), T.swipe && !1 === (g = T.swipe.call(Ce, t, he, pe, ge, Se, xe, fe))) return !1;
                                switch (he) {
                                    case o:
                                        Ce.trigger("swipeLeft", [he, pe, ge, Se, xe, fe]), T.swipeLeft && (g = T.swipeLeft.call(Ce, t, he, pe, ge, Se, xe, fe));
                                        break;
                                    case i:
                                        Ce.trigger("swipeRight", [he, pe, ge, Se, xe, fe]), T.swipeRight && (g = T.swipeRight.call(Ce, t, he, pe, ge, Se, xe, fe));
                                        break;
                                    case a:
                                        Ce.trigger("swipeUp", [he, pe, ge, Se, xe, fe]), T.swipeUp && (g = T.swipeUp.call(Ce, t, he, pe, ge, Se, xe, fe));
                                        break;
                                    case n:
                                        Ce.trigger("swipeDown", [he, pe, ge, Se, xe, fe]), T.swipeDown && (g = T.swipeDown.call(Ce, t, he, pe, ge, Se, xe, fe))
                                }
                            }
                        }
                        if (c == u) {
                            if (Ce.trigger("pinchStatus", [s, ke || null, we || 0, ge || 0, Se, ve, xe]), T.pinchStatus && !1 === (g = T.pinchStatus.call(Ce, t, s, ke || null, we || 0, ge || 0, Se, ve, xe))) return !1;
                            if (s == y && N()) switch (ke) {
                                case r:
                                    Ce.trigger("pinchIn", [ke || null, we || 0, ge || 0, Se, ve, xe]), T.pinchIn && (g = T.pinchIn.call(Ce, t, ke || null, we || 0, ge || 0, Se, ve, xe));
                                    break;
                                case l:
                                    Ce.trigger("pinchOut", [ke || null, we || 0, ge || 0, Se, ve, xe]), T.pinchOut && (g = T.pinchOut.call(Ce, t, ke || null, we || 0, ge || 0, Se, ve, xe))
                            }
                        }
                        return c == p ? s !== C && s !== y || (clearTimeout(Pe), clearTimeout(Le), G() && !X() ? (Ee = ne(), Pe = setTimeout(e.proxy(function() {
                            Ee = null, Ce.trigger("tap", [t.target]), T.tap && (g = T.tap.call(Ce, t, t.target))
                        }, this), T.doubleTapThreshold)) : (Ee = null, Ce.trigger("tap", [t.target]), T.tap && (g = T.tap.call(Ce, t, t.target)))) : c == h ? s !== C && s !== y || (clearTimeout(Pe), clearTimeout(Le), Ee = null, Ce.trigger("doubletap", [t.target]), T.doubleTap && (g = T.doubleTap.call(Ce, t, t.target))) : c == f && (s !== C && s !== y || (clearTimeout(Pe), Ee = null, Ce.trigger("longtap", [t.target]), T.longTap && (g = T.longTap.call(Ce, t, t.target)))), g
                    }

                    function R() {
                        var e = !0;
                        return null !== T.threshold && (e = pe >= T.threshold), e
                    }

                    function O() {
                        var e = !1;
                        return null !== T.cancelThreshold && null !== he && (e = ee(he) - pe >= T.cancelThreshold), e
                    }

                    function H() {
                        return !(T.maxTimeThreshold && ge >= T.maxTimeThreshold)
                    }

                    function N() {
                        var e = q(),
                            t = U(),
                            o = null === T.pinchThreshold || we >= T.pinchThreshold;
                        return e && t && o
                    }

                    function Y() {
                        return !!(T.pinchStatus || T.pinchIn || T.pinchOut)
                    }

                    function z() {
                        var e = H(),
                            t = R(),
                            o = q(),
                            i = U(),
                            a = O(),
                            n = !a && i && o && t && e;
                        return n
                    }

                    function W() {
                        return !!(T.swipe || T.swipeStatus || T.swipeLeft || T.swipeRight || T.swipeUp || T.swipeDown)
                    }

                    function q() {
                        return Se === T.fingers || T.fingers === b || !$
                    }

                    function U() {
                        return 0 !== xe[0].end.x
                    }

                    function j() {
                        return !!T.tap
                    }

                    function G() {
                        return !!T.doubleTap
                    }

                    function X() {
                        if (null == Ee) return !1;
                        var e = ne();
                        return G() && e - Ee <= T.doubleTapThreshold
                    }

                    function V() {
                        _e = 0, Me = 0
                    }

                    function Q() {
                        var e = !1;
                        if (_e) {
                            var t = ne() - _e;
                            t <= T.fingerReleaseThreshold && (e = !0)
                        }
                        return e
                    }

                    function J(e) {
                        Ce && (!0 === e ? (Ce.bind(se, M), Ce.bind(ce, E), de && Ce.bind(de, L)) : (Ce.unbind(se, M, !1), Ce.unbind(ce, E, !1), de && Ce.unbind(de, L, !1)), Ce.data(A + "_intouch", !0 === e))
                    }

                    function Z(e, t) {
                        var o = {
                            start: {
                                x: 0,
                                y: 0
                            },
                            last: {
                                x: 0,
                                y: 0
                            },
                            end: {
                                x: 0,
                                y: 0
                            }
                        };
                        return o.start.x = o.last.x = o.end.x = t.pageX || t.clientX, o.start.y = o.last.y = o.end.y = t.pageY || t.clientY, xe[e] = o, o
                    }

                    function K(e) {
                        var t = void 0 !== e.identifier ? e.identifier : 0,
                            o = xe[t] || null;
                        return null === o && (o = Z(t, e)), o.last.x = o.end.x, o.last.y = o.end.y, o.end.x = e.pageX || e.clientX, o.end.y = e.pageY || e.clientY, o
                    }

                    function ee(e) {
                        if (ye[e]) return ye[e].distance
                    }

                    function te(e) {
                        return {
                            direction: e,
                            distance: 0
                        }
                    }

                    function oe() {
                        return Te - Ae
                    }

                    function ie(e, t) {
                        var o = Math.abs(e.x - t.x),
                            i = Math.abs(e.y - t.y);
                        return Math.round(Math.sqrt(o * o + i * i))
                    }

                    function ae(e, t) {
                        if (l = t, (r = e).x == l.x && r.y == l.y) return s;
                        var r, l, c, d, u, p, h, f, g = (d = t, u = (c = e).x - d.x, p = d.y - c.y, h = Math.atan2(p, u), (f = Math.round(180 * h / Math.PI)) < 0 && (f = 360 - Math.abs(f)), f);
                        return g <= 45 && g >= 0 ? o : g <= 360 && g >= 315 ? o : g >= 135 && g <= 225 ? i : g > 45 && g < 135 ? n : a
                    }

                    function ne() {
                        var e = new Date;
                        return e.getTime()
                    }
                    var T = e.extend({}, T),
                        re = $ || x || !T.fallbackToMouseEvents,
                        le = re ? x ? S ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                        se = re ? x ? S ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                        ce = re ? x ? S ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                        de = re ? x ? "mouseleave" : null : "mouseleave",
                        ue = x ? S ? "MSPointerCancel" : "pointercancel" : "touchcancel",
                        pe = 0,
                        he = null,
                        fe = null,
                        ge = 0,
                        me = 0,
                        be = 0,
                        ve = 1,
                        we = 0,
                        ke = 0,
                        ye = null,
                        Ce = e(t),
                        $e = "start",
                        Se = 0,
                        xe = {},
                        Ae = 0,
                        Te = 0,
                        _e = 0,
                        Me = 0,
                        Ee = 0,
                        Pe = null,
                        Le = null;
                    try {
                        Ce.bind(le, _), Ce.bind(ue, P)
                    } catch (t) {
                        e.error("events not supported " + le + "," + ue + " on jQuery.swipe")
                    }
                    this.enable = function() {
                        return this.disable(), Ce.bind(le, _), Ce.bind(ue, P), Ce
                    }, this.disable = function() {
                        return F(), Ce
                    }, this.destroy = function() {
                        F(), Ce.data(A, null), Ce = null
                    }, this.option = function(t, o) {
                        if ("object" == typeof t) T = e.extend(T, t);
                        else if (void 0 !== T[t]) {
                            if (void 0 === o) return T[t];
                            T[t] = o
                        } else {
                            if (!t) return T;
                            e.error("Option " + t + " does not exist on jQuery.swipe.options")
                        }
                        return null
                    }
                }(this, t), T.data(A, _))
            })
        }
        var o = "left",
            i = "right",
            a = "up",
            n = "down",
            r = "in",
            l = "out",
            s = "none",
            c = "auto",
            d = "swipe",
            u = "pinch",
            p = "tap",
            h = "doubletap",
            f = "longtap",
            g = "horizontal",
            m = "vertical",
            b = "all",
            v = 10,
            w = "start",
            k = "move",
            y = "end",
            C = "cancel",
            $ = "ontouchstart" in window,
            S = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !$,
            x = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !$,
            A = "TouchSwipe";
        e.fn.swipe = function(o) {
            var i = e(this),
                a = i.data(A);
            if (a && "string" == typeof o) {
                if (a[o]) return a[o].apply(a, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + o + " does not exist on jQuery.swipe")
            } else if (a && "object" == typeof o) a.option.apply(a, arguments);
            else if (!(a || "object" != typeof o && o)) return t.apply(this, arguments);
            return i
        }, e.fn.swipe.version = "1.6.18", e.fn.swipe.defaults = {
            fingers: 1,
            threshold: 75,
            cancelThreshold: null,
            pinchThreshold: 20,
            maxTimeThreshold: null,
            fingerReleaseThreshold: 250,
            longTapThreshold: 500,
            doubleTapThreshold: 200,
            swipe: null,
            swipeLeft: null,
            swipeRight: null,
            swipeUp: null,
            swipeDown: null,
            swipeStatus: null,
            pinchIn: null,
            pinchOut: null,
            pinchStatus: null,
            click: null,
            tap: null,
            doubleTap: null,
            longTap: null,
            hold: null,
            triggerOnTouchEnd: !0,
            triggerOnTouchLeave: !1,
            allowPageScroll: "auto",
            fallbackToMouseEvents: !0,
            excludedElements: ".noSwipe",
            preventDefaultEvents: !0
        }, e.fn.swipe.phases = {
            PHASE_START: w,
            PHASE_MOVE: k,
            PHASE_END: y,
            PHASE_CANCEL: C
        }, e.fn.swipe.directions = {
            LEFT: o,
            RIGHT: i,
            UP: a,
            DOWN: n,
            IN: r,
            OUT: l
        }, e.fn.swipe.pageScroll = {
            NONE: s,
            HORIZONTAL: g,
            VERTICAL: m,
            AUTO: c
        }, e.fn.swipe.fingers = {
            ONE: 1,
            TWO: 2,
            THREE: 3,
            FOUR: 4,
            FIVE: 5,
            ALL: b
        }
    }),
    function(e) {
        function t(o, i) {
            if (i = i || {}, (o = o || "") instanceof t) return o;
            if (!(this instanceof t)) return new t(o, i);
            var a, n, r, l, s, c, d, u, p, h, f, g = (n = {
                r: 0,
                g: 0,
                b: 0
            }, r = 1, l = null, s = null, c = null, d = !1, u = !1, "string" == typeof(a = o) && (a = function(e) {
                e = e.replace(_, "").replace(M, "").toLowerCase();
                var t, o = !1;
                if (O[e]) e = O[e], o = !0;
                else if ("transparent" == e) return {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0,
                    format: "name"
                };
                return (t = N.rgb.exec(e)) ? {
                    r: t[1],
                    g: t[2],
                    b: t[3]
                } : (t = N.rgba.exec(e)) ? {
                    r: t[1],
                    g: t[2],
                    b: t[3],
                    a: t[4]
                } : (t = N.hsl.exec(e)) ? {
                    h: t[1],
                    s: t[2],
                    l: t[3]
                } : (t = N.hsla.exec(e)) ? {
                    h: t[1],
                    s: t[2],
                    l: t[3],
                    a: t[4]
                } : (t = N.hsv.exec(e)) ? {
                    h: t[1],
                    s: t[2],
                    v: t[3]
                } : (t = N.hsva.exec(e)) ? {
                    h: t[1],
                    s: t[2],
                    v: t[3],
                    a: t[4]
                } : (t = N.hex8.exec(e)) ? {
                    r: C(t[1]),
                    g: C(t[2]),
                    b: C(t[3]),
                    a: A(t[4]),
                    format: o ? "name" : "hex8"
                } : (t = N.hex6.exec(e)) ? {
                    r: C(t[1]),
                    g: C(t[2]),
                    b: C(t[3]),
                    format: o ? "name" : "hex"
                } : (t = N.hex4.exec(e)) ? {
                    r: C(t[1] + "" + t[1]),
                    g: C(t[2] + "" + t[2]),
                    b: C(t[3] + "" + t[3]),
                    a: A(t[4] + "" + t[4]),
                    format: o ? "name" : "hex8"
                } : !!(t = N.hex3.exec(e)) && {
                    r: C(t[1] + "" + t[1]),
                    g: C(t[2] + "" + t[2]),
                    b: C(t[3] + "" + t[3]),
                    format: o ? "name" : "hex"
                }
            }(a)), "object" == typeof a && (T(a.r) && T(a.g) && T(a.b) ? (p = a.r, h = a.g, f = a.b, n = {
                r: 255 * k(p, 255),
                g: 255 * k(h, 255),
                b: 255 * k(f, 255)
            }, d = !0, u = "%" === String(a.r).substr(-1) ? "prgb" : "rgb") : T(a.h) && T(a.s) && T(a.v) ? (l = S(a.s), s = S(a.v), n = function(t, o, i) {
                t = 6 * k(t, 360), o = k(o, 100), i = k(i, 100);
                var a = e.floor(t),
                    n = t - a,
                    r = i * (1 - o),
                    l = i * (1 - n * o),
                    s = i * (1 - (1 - n) * o),
                    c = a % 6;
                return {
                    r: 255 * [i, l, r, r, s, i][c],
                    g: 255 * [s, i, i, l, r, r][c],
                    b: 255 * [r, r, s, i, i, l][c]
                }
            }(a.h, l, s), d = !0, u = "hsv") : T(a.h) && T(a.s) && T(a.l) && (l = S(a.s), c = S(a.l), n = function(e, t, o) {
                function i(e, t, o) {
                    return 0 > o && (o += 1), o > 1 && (o -= 1), 1 / 6 > o ? e + 6 * (t - e) * o : .5 > o ? t : 2 / 3 > o ? e + 6 * (t - e) * (2 / 3 - o) : e
                }
                var a, n, r;
                if (e = k(e, 360), t = k(t, 100), o = k(o, 100), 0 === t) a = n = r = o;
                else {
                    var l = .5 > o ? o * (1 + t) : o + t - o * t,
                        s = 2 * o - l;
                    a = i(s, l, e + 1 / 3), n = i(s, l, e), r = i(s, l, e - 1 / 3)
                }
                return {
                    r: 255 * a,
                    g: 255 * n,
                    b: 255 * r
                }
            }(a.h, l, c), d = !0, u = "hsl"), a.hasOwnProperty("a") && (r = a.a)), r = w(r), {
                ok: d,
                format: a.format || u,
                r: L(255, F(n.r, 0)),
                g: L(255, F(n.g, 0)),
                b: L(255, F(n.b, 0)),
                a: r
            });
            this._originalInput = o, this._r = g.r, this._g = g.g, this._b = g.b, this._a = g.a, this._roundA = P(100 * this._a) / 100, this._format = i.format || g.format, this._gradientType = i.gradientType, this._r < 1 && (this._r = P(this._r)), this._g < 1 && (this._g = P(this._g)), this._b < 1 && (this._b = P(this._b)), this._ok = g.ok, this._tc_id = E++
        }

        function o(e, t, o) {
            e = k(e, 255), t = k(t, 255), o = k(o, 255);
            var i, a, n = F(e, t, o),
                r = L(e, t, o),
                l = (n + r) / 2;
            if (n == r) i = a = 0;
            else {
                var s = n - r;
                switch (a = l > .5 ? s / (2 - n - r) : s / (n + r), n) {
                    case e:
                        i = (t - o) / s + (o > t ? 6 : 0);
                        break;
                    case t:
                        i = (o - e) / s + 2;
                        break;
                    case o:
                        i = (e - t) / s + 4
                }
                i /= 6
            }
            return {
                h: i,
                s: a,
                l: l
            }
        }

        function i(e, t, o) {
            e = k(e, 255), t = k(t, 255), o = k(o, 255);
            var i, a, n = F(e, t, o),
                r = L(e, t, o),
                l = n,
                s = n - r;
            if (a = 0 === n ? 0 : s / n, n == r) i = 0;
            else {
                switch (n) {
                    case e:
                        i = (t - o) / s + (o > t ? 6 : 0);
                        break;
                    case t:
                        i = (o - e) / s + 2;
                        break;
                    case o:
                        i = (e - t) / s + 4
                }
                i /= 6
            }
            return {
                h: i,
                s: a,
                v: l
            }
        }

        function a(e, t, o, i) {
            var a = [$(P(e).toString(16)), $(P(t).toString(16)), $(P(o).toString(16))];
            return i && a[0].charAt(0) == a[0].charAt(1) && a[1].charAt(0) == a[1].charAt(1) && a[2].charAt(0) == a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("")
        }

        function n(e, t, o, i) {
            return [$(x(i)), $(P(e).toString(16)), $(P(t).toString(16)), $(P(o).toString(16))].join("")
        }

        function r(e, o) {
            o = 0 === o ? 0 : o || 10;
            var i = t(e).toHsl();
            return i.s -= o / 100, i.s = y(i.s), t(i)
        }

        function l(e, o) {
            o = 0 === o ? 0 : o || 10;
            var i = t(e).toHsl();
            return i.s += o / 100, i.s = y(i.s), t(i)
        }

        function s(e) {
            return t(e).desaturate(100)
        }

        function c(e, o) {
            o = 0 === o ? 0 : o || 10;
            var i = t(e).toHsl();
            return i.l += o / 100, i.l = y(i.l), t(i)
        }

        function d(e, o) {
            o = 0 === o ? 0 : o || 10;
            var i = t(e).toRgb();
            return i.r = F(0, L(255, i.r - P(-o / 100 * 255))), i.g = F(0, L(255, i.g - P(-o / 100 * 255))), i.b = F(0, L(255, i.b - P(-o / 100 * 255))), t(i)
        }

        function u(e, o) {
            o = 0 === o ? 0 : o || 10;
            var i = t(e).toHsl();
            return i.l -= o / 100, i.l = y(i.l), t(i)
        }

        function p(e, o) {
            var i = t(e).toHsl(),
                a = (i.h + o) % 360;
            return i.h = 0 > a ? 360 + a : a, t(i)
        }

        function h(e) {
            var o = t(e).toHsl();
            return o.h = (o.h + 180) % 360, t(o)
        }

        function f(e) {
            var o = t(e).toHsl(),
                i = o.h;
            return [t(e), t({
                h: (i + 120) % 360,
                s: o.s,
                l: o.l
            }), t({
                h: (i + 240) % 360,
                s: o.s,
                l: o.l
            })]
        }

        function g(e) {
            var o = t(e).toHsl(),
                i = o.h;
            return [t(e), t({
                h: (i + 90) % 360,
                s: o.s,
                l: o.l
            }), t({
                h: (i + 180) % 360,
                s: o.s,
                l: o.l
            }), t({
                h: (i + 270) % 360,
                s: o.s,
                l: o.l
            })]
        }

        function m(e) {
            var o = t(e).toHsl(),
                i = o.h;
            return [t(e), t({
                h: (i + 72) % 360,
                s: o.s,
                l: o.l
            }), t({
                h: (i + 216) % 360,
                s: o.s,
                l: o.l
            })]
        }

        function b(e, o, i) {
            o = o || 6, i = i || 30;
            var a = t(e).toHsl(),
                n = 360 / i,
                r = [t(e)];
            for (a.h = (a.h - (n * o >> 1) + 720) % 360; --o;) a.h = (a.h + n) % 360, r.push(t(a));
            return r
        }

        function v(e, o) {
            o = o || 6;
            for (var i = t(e).toHsv(), a = i.h, n = i.s, r = i.v, l = [], s = 1 / o; o--;) l.push(t({
                h: a,
                s: n,
                v: r
            })), r = (r + s) % 1;
            return l
        }

        function w(e) {
            return e = parseFloat(e), (isNaN(e) || 0 > e || e > 1) && (e = 1), e
        }

        function k(t, o) {
            var i;
            "string" == typeof(i = t) && -1 != i.indexOf(".") && 1 === parseFloat(i) && (t = "100%");
            var a, n = "string" == typeof(a = t) && -1 != a.indexOf("%");
            return t = L(o, F(0, parseFloat(t))), n && (t = parseInt(t * o, 10) / 100), e.abs(t - o) < 1e-6 ? 1 : t % o / parseFloat(o)
        }

        function y(e) {
            return L(1, F(0, e))
        }

        function C(e) {
            return parseInt(e, 16)
        }

        function $(e) {
            return 1 == e.length ? "0" + e : "" + e
        }

        function S(e) {
            return 1 >= e && (e = 100 * e + "%"), e
        }

        function x(t) {
            return e.round(255 * parseFloat(t)).toString(16)
        }

        function A(e) {
            return C(e) / 255
        }

        function T(e) {
            return !!N.CSS_UNIT.exec(e)
        }
        var _ = /^\s+/,
            M = /\s+$/,
            E = 0,
            P = e.round,
            L = e.min,
            F = e.max,
            B = e.random;
        t.prototype = {
            isDark: function() {
                return this.getBrightness() < 128
            },
            isLight: function() {
                return !this.isDark()
            },
            isValid: function() {
                return this._ok
            },
            getOriginalInput: function() {
                return this._originalInput
            },
            getFormat: function() {
                return this._format
            },
            getAlpha: function() {
                return this._a
            },
            getBrightness: function() {
                var e = this.toRgb();
                return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3
            },
            getLuminance: function() {
                var t, o, i, a = this.toRgb();
                return t = a.r / 255, o = a.g / 255, i = a.b / 255, .2126 * (.03928 >= t ? t / 12.92 : e.pow((t + .055) / 1.055, 2.4)) + .7152 * (.03928 >= o ? o / 12.92 : e.pow((o + .055) / 1.055, 2.4)) + .0722 * (.03928 >= i ? i / 12.92 : e.pow((i + .055) / 1.055, 2.4))
            },
            setAlpha: function(e) {
                return this._a = w(e), this._roundA = P(100 * this._a) / 100, this
            },
            toHsv: function() {
                var e = i(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    v: e.v,
                    a: this._a
                }
            },
            toHsvString: function() {
                var e = i(this._r, this._g, this._b),
                    t = P(360 * e.h),
                    o = P(100 * e.s),
                    a = P(100 * e.v);
                return 1 == this._a ? "hsv(" + t + ", " + o + "%, " + a + "%)" : "hsva(" + t + ", " + o + "%, " + a + "%, " + this._roundA + ")"
            },
            toHsl: function() {
                var e = o(this._r, this._g, this._b);
                return {
                    h: 360 * e.h,
                    s: e.s,
                    l: e.l,
                    a: this._a
                }
            },
            toHslString: function() {
                var e = o(this._r, this._g, this._b),
                    t = P(360 * e.h),
                    i = P(100 * e.s),
                    a = P(100 * e.l);
                return 1 == this._a ? "hsl(" + t + ", " + i + "%, " + a + "%)" : "hsla(" + t + ", " + i + "%, " + a + "%, " + this._roundA + ")"
            },
            toHex: function(e) {
                return a(this._r, this._g, this._b, e)
            },
            toHexString: function(e) {
                return "#" + this.toHex(e)
            },
            toHex8: function(e) {
                return t = this._r, o = this._g, i = this._b, a = this._a, n = e, r = [$(P(t).toString(16)), $(P(o).toString(16)), $(P(i).toString(16)), $(x(a))], n && r[0].charAt(0) == r[0].charAt(1) && r[1].charAt(0) == r[1].charAt(1) && r[2].charAt(0) == r[2].charAt(1) && r[3].charAt(0) == r[3].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) + r[3].charAt(0) : r.join("");
                var t, o, i, a, n, r
            },
            toHex8String: function(e) {
                return "#" + this.toHex8(e)
            },
            toRgb: function() {
                return {
                    r: P(this._r),
                    g: P(this._g),
                    b: P(this._b),
                    a: this._a
                }
            },
            toRgbString: function() {
                return 1 == this._a ? "rgb(" + P(this._r) + ", " + P(this._g) + ", " + P(this._b) + ")" : "rgba(" + P(this._r) + ", " + P(this._g) + ", " + P(this._b) + ", " + this._roundA + ")"
            },
            toPercentageRgb: function() {
                return {
                    r: P(100 * k(this._r, 255)) + "%",
                    g: P(100 * k(this._g, 255)) + "%",
                    b: P(100 * k(this._b, 255)) + "%",
                    a: this._a
                }
            },
            toPercentageRgbString: function() {
                return 1 == this._a ? "rgb(" + P(100 * k(this._r, 255)) + "%, " + P(100 * k(this._g, 255)) + "%, " + P(100 * k(this._b, 255)) + "%)" : "rgba(" + P(100 * k(this._r, 255)) + "%, " + P(100 * k(this._g, 255)) + "%, " + P(100 * k(this._b, 255)) + "%, " + this._roundA + ")"
            },
            toName: function() {
                return 0 === this._a ? "transparent" : !(this._a < 1) && (H[a(this._r, this._g, this._b, !0)] || !1)
            },
            toFilter: function(e) {
                var o = "#" + n(this._r, this._g, this._b, this._a),
                    i = o,
                    a = this._gradientType ? "GradientType = 1, " : "";
                if (e) {
                    var r = t(e);
                    i = "#" + n(r._r, r._g, r._b, r._a)
                }
                return "progid:DXImageTransform.Microsoft.gradient(" + a + "startColorstr=" + o + ",endColorstr=" + i + ")"
            },
            toString: function(e) {
                var t = !!e;
                e = e || this._format;
                var o = !1,
                    i = this._a < 1 && this._a >= 0;
                return !t && i && ("hex" === e || "hex6" === e || "hex3" === e || "hex4" === e || "hex8" === e || "name" === e) ? "name" === e && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === e && (o = this.toRgbString()), "prgb" === e && (o = this.toPercentageRgbString()), ("hex" === e || "hex6" === e) && (o = this.toHexString()), "hex3" === e && (o = this.toHexString(!0)), "hex4" === e && (o = this.toHex8String(!0)), "hex8" === e && (o = this.toHex8String()), "name" === e && (o = this.toName()), "hsl" === e && (o = this.toHslString()), "hsv" === e && (o = this.toHsvString()), o || this.toHexString())
            },
            clone: function() {
                return t(this.toString())
            },
            _applyModification: function(e, t) {
                var o = e.apply(null, [this].concat([].slice.call(t)));
                return this._r = o._r, this._g = o._g, this._b = o._b, this.setAlpha(o._a), this
            },
            lighten: function() {
                return this._applyModification(c, arguments)
            },
            brighten: function() {
                return this._applyModification(d, arguments)
            },
            darken: function() {
                return this._applyModification(u, arguments)
            },
            desaturate: function() {
                return this._applyModification(r, arguments)
            },
            saturate: function() {
                return this._applyModification(l, arguments)
            },
            greyscale: function() {
                return this._applyModification(s, arguments)
            },
            spin: function() {
                return this._applyModification(p, arguments)
            },
            _applyCombination: function(e, t) {
                return e.apply(null, [this].concat([].slice.call(t)))
            },
            analogous: function() {
                return this._applyCombination(b, arguments)
            },
            complement: function() {
                return this._applyCombination(h, arguments)
            },
            monochromatic: function() {
                return this._applyCombination(v, arguments)
            },
            splitcomplement: function() {
                return this._applyCombination(m, arguments)
            },
            triad: function() {
                return this._applyCombination(f, arguments)
            },
            tetrad: function() {
                return this._applyCombination(g, arguments)
            }
        }, t.fromRatio = function(e, o) {
            if ("object" == typeof e) {
                var i = {};
                for (var a in e) e.hasOwnProperty(a) && (i[a] = "a" === a ? e[a] : S(e[a]));
                e = i
            }
            return t(e, o)
        }, t.equals = function(e, o) {
            return !(!e || !o) && t(e).toRgbString() == t(o).toRgbString()
        }, t.random = function() {
            return t.fromRatio({
                r: B(),
                g: B(),
                b: B()
            })
        }, t.mix = function(e, o, i) {
            i = 0 === i ? 0 : i || 50;
            var a = t(e).toRgb(),
                n = t(o).toRgb(),
                r = i / 100;
            return t({
                r: (n.r - a.r) * r + a.r,
                g: (n.g - a.g) * r + a.g,
                b: (n.b - a.b) * r + a.b,
                a: (n.a - a.a) * r + a.a
            })
        }, t.readability = function(o, i) {
            var a = t(o),
                n = t(i);
            return (e.max(a.getLuminance(), n.getLuminance()) + .05) / (e.min(a.getLuminance(), n.getLuminance()) + .05)
        }, t.isReadable = function(e, o, i) {
            var a, n, r, l, s, c = t.readability(e, o);
            switch (n = !1, "AA" !== (l = ((r = (r = i) || {
                level: "AA",
                size: "small"
            }).level || "AA").toUpperCase()) && "AAA" !== l && (l = "AA"), "small" !== (s = (r.size || "small").toLowerCase()) && "large" !== s && (s = "small"), (a = {
                level: l,
                size: s
            }).level + a.size) {
                case "AAsmall":
                case "AAAlarge":
                    n = c >= 4.5;
                    break;
                case "AAlarge":
                    n = c >= 3;
                    break;
                case "AAAsmall":
                    n = c >= 7
            }
            return n
        }, t.mostReadable = function(e, o, i) {
            var a, n, r, l, s = null,
                c = 0;
            n = (i = i || {}).includeFallbackColors, r = i.level, l = i.size;
            for (var d = 0; d < o.length; d++)(a = t.readability(e, o[d])) > c && (c = a, s = t(o[d]));
            return t.isReadable(e, s, {
                level: r,
                size: l
            }) || !n ? s : (i.includeFallbackColors = !1, t.mostReadable(e, ["#fff", "#000"], i))
        };
        var D, I, R, O = t.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                rebeccapurple: "663399",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            },
            H = t.hexNames = function(e) {
                var t = {};
                for (var o in e) e.hasOwnProperty(o) && (t[e[o]] = o);
                return t
            }(O),
            N = (I = "[\\s|\\(]+(" + (D = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", R = "[\\s|\\(]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")[,|\\s]+(" + D + ")\\s*\\)?", {
                CSS_UNIT: new RegExp(D),
                rgb: new RegExp("rgb" + I),
                rgba: new RegExp("rgba" + R),
                hsl: new RegExp("hsl" + I),
                hsla: new RegExp("hsla" + R),
                hsv: new RegExp("hsv" + I),
                hsva: new RegExp("hsva" + R),
                hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            });
        "undefined" != typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd ? define(function() {
            return t
        }) : window.tinycolor = t
    }(Math),
    function(e) {
        e.isBreakpoint = function(t) {
            var o, i, a;
            switch (t) {
                case "xs":
                    a = "d-block d-sm-none";
                    break;
                case "sm":
                    a = "d-none d-sm-block d-md-none";
                    break;
                case "md":
                    a = "d-none d-md-block d-lg-none";
                    break;
                case "lg":
                    a = "d-none d-lg-block d-xl-none";
                    break;
                case "xl":
                    a = "d-none d-xl-block"
            }
            return i = (o = e("<div/>", {
                class: a
            }).appendTo("body")).is(":visible"), o.remove(), i
        }, e.extend(e, {
            isXs: function() {
                return e.isBreakpoint("xs")
            },
            isSm: function() {
                return e.isBreakpoint("sm")
            },
            isMd: function() {
                return e.isBreakpoint("md")
            },
            isLg: function() {
                return e.isBreakpoint("lg")
            },
            isXl: function() {
                return e.isBreakpoint("xl")
            }
        })
    }(jQuery);
App = function() {
    "use strict";
    return App.ajaxLoader = function() {
        var e = new Mprogress;
        e.start(), setTimeout(function() {
            e.end()
        }, 3e3), $(".toggle-loader").click(function() {
            e.start(), setTimeout(function() {
                e.inc()
            }, 1e3), setTimeout(function() {
                e.end()
            }, 3e3)
        })
    }, App
}(), App = function() {
    "use strict";
    return App.booking = function() {
        $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {
                rightIcon: "mdi mdi-chevron-right",
                leftIcon: "mdi mdi-chevron-left"
            }
        }), $(".select2").select2({
            width: "100%"
        }), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".bslider").bootstrapSlider()
    }, App
}(), App = function() {
    "use strict";
    return App.ChartJs = function() {
        var e, t, o, i, a, n, r, l, s, c, d, u, p, h, f, g, m, b, v, w, k, y, C, $, S, x, A = function() {
            return Math.round(100 * Math.random())
        };
        e = tinycolor(App.color.primary), t = tinycolor(App.color.primary).lighten(22), o = document.getElementById("line-chart"), i = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            tooltips: {
                enabled: !0,
                position: "average"
            },
            datasets: [{
                label: "My First dataset",
                borderColor: e.toString(),
                backgroundColor: e.setAlpha(.8).toString(),
                data: [A(), A(), A(), A(), A(), A(), A()]
            }, {
                label: "My Second dataset",
                borderColor: t.toString(),
                backgroundColor: t.setAlpha(.5).toString(),
                data: [A(), A(), A(), A(), A(), A(), A()]
            }]
        }, new Chart(o, {
            type: "line",
            data: i
        }), a = tinycolor(App.color.success), n = tinycolor(App.color.warning), r = document.getElementById("bar-chart"), l = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Credit",
                borderColor: a.toString(),
                backgroundColor: a.setAlpha(.8).toString(),
                data: [A(), A(), A(), A(), A(), A(), A()]
            }, {
                label: "Debit",
                borderColor: n.toString(),
                backgroundColor: n.setAlpha(.5).toString(),
                data: [A(), A(), A(), A(), A(), A(), A()]
            }]
        }, new Chart(r, {
            type: "bar",
            data: l,
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                        borderColor: "rgb(0, 255, 0)",
                        borderSkipped: "bottom"
                    }
                }
            }
        }), s = tinycolor(App.color.grey), c = tinycolor(App.color.danger), d = document.getElementById("radar-chart"), u = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [{
                label: "First Year",
                backgroundColor: s.setAlpha(.3).toString(),
                borderColor: s.toString(),
                pointBackgroundColor: s.toString(),
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: s.toString(),
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: "Second Year",
                backgroundColor: c.setAlpha(.4).toString(),
                borderColor: c.toString(),
                pointBackgroundColor: c.toString(),
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: c.toString(),
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        }, new Chart(d, {
            type: "radar",
            data: u
        }), p = App.color.primary, h = App.color.success, f = App.color.warning, g = App.color.danger, m = App.color.grey, b = document.getElementById("polar-chart"), new Chart(b, {
            type: "polarArea",
            data: {
                datasets: [{
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [g, h, f, m, p],
                    label: "My dataset"
                }],
                labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
            }
        }), v = App.color.primary, w = tinycolor(App.color.primary).lighten(12).toString(), k = tinycolor(App.color.primary).lighten(22).toString(), y = document.getElementById("pie-chart"), new Chart(y, {
            type: "pie",
            data: {
                labels: ["Red", "Blue", "Yellow"],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [v, w, k],
                    hoverBackgroundColor: [v, w, k]
                }]
            }
        }), C = App.color.success, $ = tinycolor(App.color.success).lighten(12).toString(), S = tinycolor(App.color.success).lighten(22).toString(), x = document.getElementById("donut-chart"), new Chart(x, {
            type: "doughnut",
            data: {
                labels: ["Red", "Blue", "Yellow"],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [C, $, S],
                    hoverBackgroundColor: [C, $, S]
                }]
            }
        })
    }, App
}(), App = function() {
    "use strict";
    return App.chartsMorris = function() {
        var e, t, o, i, a, n, r, l, s, c, d = [{
            period: "2013",
            licensed: 400,
            sorned: 550
        }, {
            period: "2012",
            licensed: 450,
            sorned: 400
        }, {
            period: "2011",
            licensed: 350,
            sorned: 550
        }, {
            period: "2010",
            licensed: 500,
            sorned: 700
        }, {
            period: "2009",
            licensed: 250,
            sorned: 380
        }, {
            period: "2008",
            licensed: 350,
            sorned: 240
        }, {
            period: "2007",
            licensed: 180,
            sorned: 300
        }, {
            period: "2006",
            licensed: 300,
            sorned: 250
        }, {
            period: "2005",
            licensed: 200,
            sorned: 150
        }];
        e = App.color.primary, t = tinycolor(App.color.primary).lighten(15).toString(), new Morris.Line({
            element: "line-chart",
            data: d,
            xkey: "period",
            ykeys: ["licensed", "sorned"],
            labels: ["Licensed", "Off the road"],
            lineColors: [e, t]
        }), o = tinycolor(App.color.success).lighten(15).toString(), i = tinycolor(App.color.success).brighten(3).toString(), Morris.Bar({
            element: "bar-chart",
            data: [{
                device: "iPhone",
                geekbench: 136,
                macbench: 180
            }, {
                device: "iPhone 3G",
                geekbench: 137,
                macbench: 200
            }, {
                device: "iPhone 3GS",
                geekbench: 275,
                macbench: 350
            }, {
                device: "iPhone 4",
                geekbench: 380,
                macbench: 500
            }, {
                device: "iPhone 4S",
                geekbench: 655,
                macbench: 900
            }, {
                device: "iPhone 5",
                geekbench: 1571,
                macbench: 1700
            }],
            xkey: "device",
            ykeys: ["geekbench", "macbench"],
            labels: ["Geekbench", "Macbench"],
            barColors: [o, i],
            barRatio: .4,
            xLabelAngle: 35,
            hideHover: "auto"
        }), a = App.color.warning, n = App.color.success, r = App.color.primary, Morris.Donut({
            element: "donut-chart",
            data: [{
                label: "Facebook",
                value: 33
            }, {
                label: "Google",
                value: 33
            }, {
                label: "Twitter",
                value: 33
            }],
            colors: [a, n, r],
            formatter: function(e) {
                return e + "%"
            }
        }), l = App.color.primary, s = App.color.success, c = App.color.warning, Morris.Area({
            element: "area-chart",
            data: [{
                period: "2010 Q1",
                iphone: 2666,
                ipad: null,
                itouch: 2647
            }, {
                period: "2010 Q2",
                iphone: 2778,
                ipad: 2294,
                itouch: 2441
            }, {
                period: "2010 Q3",
                iphone: 4912,
                ipad: 1969,
                itouch: 2501
            }, {
                period: "2010 Q4",
                iphone: 3767,
                ipad: 3597,
                itouch: 5689
            }, {
                period: "2011 Q1",
                iphone: 6810,
                ipad: 1914,
                itouch: 2293
            }, {
                period: "2011 Q2",
                iphone: 5670,
                ipad: 4293,
                itouch: 1881
            }, {
                period: "2011 Q3",
                iphone: 4820,
                ipad: 3795,
                itouch: 1588
            }, {
                period: "2011 Q4",
                iphone: 15073,
                ipad: 5967,
                itouch: 5175
            }, {
                period: "2012 Q1",
                iphone: 10687,
                ipad: 4460,
                itouch: 2028
            }, {
                period: "2012 Q2",
                iphone: 8432,
                ipad: 5713,
                itouch: 1791
            }],
            xkey: "period",
            ykeys: ["iphone", "ipad", "itouch"],
            labels: ["iPhone", "iPad", "iPod Touch"],
            lineColors: [l, s, c],
            pointSize: 2,
            hideHover: "auto"
        })
    }, App
}(), App = function() {
    "use strict";
    return App.chartsSparklines = function() {
        var e = App.color.primary,
            t = App.color.warning,
            o = App.color.success,
            i = App.color.danger;
        $("#spark1").sparkline("html", {
            width: "85",
            height: "35",
            lineColor: e,
            highlightSpotColor: e,
            highlightLineColor: e,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), $("#spark2").sparkline("html", {
            type: "bar",
            width: "85",
            height: "35",
            barWidth: 3,
            barSpacing: 3,
            chartRangeMin: 0,
            barColor: t
        }), $("#spark3").sparkline("html", {
            type: "discrete",
            width: "85",
            height: "35",
            lineHeight: 20,
            lineColor: o,
            xwidth: 18
        }), $("#spark4").sparkline("html", {
            width: "85",
            height: "35",
            lineColor: i,
            highlightSpotColor: i,
            highlightLineColor: i,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        });
        var a = tinycolor(App.color.primary),
            n = tinycolor(App.color.danger),
            r = tinycolor(App.color.warning),
            l = tinycolor(App.color.success);
        e = a.toString(), t = n.toString(), o = r.toString(), i = l.toString();
        $.fn.sparkline.defaults.common.lineColor = e, $.fn.sparkline.defaults.common.fillColor = a.setAlpha(.3).toString(), $.fn.sparkline.defaults.line.spotColor = e, $.fn.sparkline.defaults.line.minSpotColor = e, $.fn.sparkline.defaults.line.maxSpotColor = e, $.fn.sparkline.defaults.line.highlightSpotColor = e, $.fn.sparkline.defaults.line.highlightLineColor = e, $.fn.sparkline.defaults.bar.barColor = e, $.fn.sparkline.defaults.bar.negBarColor = t, $.fn.sparkline.defaults.bar.stackedBarColor[0] = e, $.fn.sparkline.defaults.bar.stackedBarColor[1] = t, $.fn.sparkline.defaults.tristate.posBarColor = e, $.fn.sparkline.defaults.tristate.negBarColor = t, $.fn.sparkline.defaults.discrete.thresholdColor = t, $.fn.sparkline.defaults.bullet.targetColor = e, $.fn.sparkline.defaults.bullet.performanceColor = t, $.fn.sparkline.defaults.bullet.rangeColors[0] = n.setAlpha(.2).toString(), $.fn.sparkline.defaults.bullet.rangeColors[1] = n.setAlpha(.5).toString(), $.fn.sparkline.defaults.bullet.rangeColors[2] = n.setAlpha(.45).toString(), $.fn.sparkline.defaults.pie.sliceColors[0] = e, $.fn.sparkline.defaults.pie.sliceColors[1] = t, $.fn.sparkline.defaults.pie.sliceColors[2] = o, $.fn.sparkline.defaults.box.medianColor = e, $.fn.sparkline.defaults.box.boxFillColor = n.setAlpha(.5).toString(), $.fn.sparkline.defaults.box.boxLineColor = e, $.fn.sparkline.defaults.box.whiskerColor = i, $(".compositebar").sparkline("html", {
            type: "bar",
            barColor: t
        }), $(".compositebar").sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
            composite: !0,
            fillColor: !1
        }), $(".sparklinebasic").sparkline(), $(".linecustom").sparkline("html", {
            height: "1.5em",
            width: "8em",
            lineColor: o,
            fillColor: r.setAlpha(.4).toString(),
            minSpotColor: !1,
            maxSpotColor: !1,
            spotColor: i,
            spotRadius: 3
        }), $(".sparkbar").sparkline("html", {
            type: "bar"
        }), $(".sparktristate").sparkline("html", {
            type: "tristate"
        }), $(".compositeline").sparkline("html", {
            fillColor: !1,
            changeRangeMin: 0,
            chartRangeMax: 10
        }), $(".compositeline").sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7], {
            composite: !0,
            fillColor: !1,
            lineColor: t,
            changeRangeMin: 0,
            chartRangeMax: 10
        }), $(".normalline").sparkline("html", {
            fillColor: !1,
            normalRangeMin: -1,
            normalRangeMax: 8
        }), $(".discrete1").sparkline("html", {
            type: "discrete",
            xwidth: 18
        }), $(".discrete2").sparkline("html", {
            type: "discrete",
            thresholdValue: 4
        }), $(".sparkbullet").sparkline("html", {
            type: "bullet"
        }), $(".sparkpie").sparkline("html", {
            type: "pie",
            height: "1.0em"
        }), $(".sparkboxplot").sparkline("html", {
            type: "box"
        })
    }, App
}(), App = function() {
    "use strict";
    return App.charts = function() {
        function e() {
            return Math.floor(31 * Math.random()) + 10
        }

        function t(e, t) {
            $("#" + e).bind("plothover", function(e, o, i) {
                var a = $(".tooltip-chart").width();
                i ? $(".tooltip-chart").css({
                    top: i.pageY - t,
                    left: i.pageX - a / 2
                }).fadeIn(200) : $(".tooltip-chart").hide()
            })
        }
        var o, i, a, n, r, l, s, c, d, u, p, h, f, g, m, b, v;
        o = tinycolor(App.color.primary).lighten(5).toString(), $.plot($("#line-chart3"), [{
                data: [
                    [0, 20],
                    [1, 30],
                    [2, 25],
                    [3, 39],
                    [4, 35],
                    [5, 40],
                    [6, 30],
                    [7, 45]
                ],
                label: "Page Views"
            }], {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: .1
                            }, {
                                opacity: .1
                            }]
                        }
                    },
                    points: {
                        show: !0
                    },
                    shadowSize: 0
                },
                legend: {
                    show: !1
                },
                grid: {
                    margin: {
                        left: 23,
                        right: 30,
                        top: 20,
                        botttom: 40
                    },
                    labelMargin: 15,
                    axisMargin: 500,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0.15)",
                    borderWidth: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [o],
                xaxis: {
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    ticks: 4,
                    tickSize: 15,
                    tickDecimals: 0
                }
            }), t("line-chart3", 60), i = App.color.success, a = tinycolor(App.color.success).lighten(22).toString(), $.plot($("#bar-chart2"), [{
                data: [
                    [0, 7],
                    [1, 13],
                    [2, 17],
                    [3, 20],
                    [4, 26],
                    [5, 37],
                    [6, 35],
                    [7, 28],
                    [8, 38],
                    [9, 38],
                    [10, 32]
                ],
                label: "Page Views"
            }, {
                data: [
                    [0, 15],
                    [1, 10],
                    [2, 15],
                    [3, 25],
                    [4, 30],
                    [5, 29],
                    [6, 25],
                    [7, 33],
                    [8, 45],
                    [9, 43],
                    [10, 38]
                ],
                label: "Unique Visitor"
            }], {
                series: {
                    bars: {
                        order: 2,
                        align: "center",
                        show: !0,
                        lineWidth: 1,
                        barWidth: .35,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                        }
                    },
                    shadowSize: 2
                },
                legend: {
                    show: !1
                },
                grid: {
                    margin: {
                        left: 23,
                        right: 30,
                        top: 20,
                        botttom: 40
                    },
                    labelMargin: 10,
                    axisMargin: 200,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0.15)",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.15)"
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [i, a],
                xaxis: {
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    ticks: 4,
                    tickDecimals: 0
                }
            }), t("bar-chart2", 60), n = App.color.primary, $.plot($("#line-chart1"), [{
                data: [
                    [0, 20],
                    [1, 30],
                    [2, 25],
                    [3, 39],
                    [4, 35],
                    [5, 40],
                    [6, 30],
                    [7, 45]
                ],
                label: "Page Views"
            }], {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: .35
                            }, {
                                opacity: .35
                            }]
                        }
                    },
                    points: {
                        show: !0
                    },
                    shadowSize: 0
                },
                legend: {
                    show: !1
                },
                grid: {
                    margin: {
                        left: -8,
                        right: -8,
                        top: 0,
                        bottom: 0
                    },
                    show: !1,
                    labelMargin: 15,
                    axisMargin: 500,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0.15)",
                    borderWidth: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [n],
                xaxis: {
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    autoscaleMargin: .5,
                    ticks: 4,
                    tickDecimals: 0
                }
            }), t("line-chart1", 45), r = tinycolor(App.color.danger).brighten(9).toString(), l = tinycolor(App.color.danger).lighten(13).toString(), s = tinycolor(App.color.danger).lighten(20).toString(), c = tinycolor(App.color.danger).lighten(27).toString(), $.plot("#pie-chart4", [{
                label: "Google",
                data: 45
            }, {
                label: "Dribbble",
                data: 25
            }, {
                label: "Twitter",
                data: 20
            }, {
                label: "Facebook",
                data: 10
            }], {
                series: {
                    pie: {
                        show: !0,
                        innerRadius: .35,
                        shadow: {
                            top: 5,
                            left: 15,
                            alpha: .3
                        },
                        stroke: {
                            width: 0
                        },
                        label: {
                            show: !0,
                            formatter: function(e, t) {
                                return '<div style="font-size:12px;text-align:center;padding:2px;color:#333;">' + e + "</div>"
                            }
                        },
                        highlight: {
                            opacity: .08
                        }
                    }
                },
                grid: {
                    hoverable: !0,
                    clickable: !0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart arrow-none'> <div class='label'> <div class='label-x'> %x.0% </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [r, l, s, c],
                legend: {
                    show: !1
                }
            }), d = tinycolor(App.color.warning).lighten(25).toString(), u = tinycolor(App.color.warning).brighten(3).toString(), $.plot($("#bar-chart1"), [{
                data: [
                    [0, 15],
                    [1, 15],
                    [2, 19],
                    [3, 28],
                    [4, 30],
                    [5, 37],
                    [6, 35],
                    [7, 38],
                    [8, 48],
                    [9, 43],
                    [10, 38],
                    [11, 32],
                    [12, 38]
                ],
                label: "Page Views"
            }, {
                data: [
                    [0, 7],
                    [1, 10],
                    [2, 15],
                    [3, 23],
                    [4, 24],
                    [5, 29],
                    [6, 25],
                    [7, 33],
                    [8, 35],
                    [9, 38],
                    [10, 32],
                    [11, 27],
                    [12, 32]
                ],
                label: "Unique Visitor"
            }], {
                series: {
                    bars: {
                        align: "center",
                        show: !0,
                        lineWidth: 1,
                        barWidth: .6,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                        }
                    },
                    shadowSize: 2
                },
                legend: {
                    show: !1
                },
                grid: {
                    margin: 0,
                    show: !1,
                    labelMargin: 10,
                    axisMargin: 500,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0.15)",
                    borderWidth: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [d, u],
                xaxis: {
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    autoscaleMargin: .5,
                    ticks: 4,
                    tickDecimals: 0
                }
            }), t("bar-chart1", 60), p = tinycolor(App.color.success).lighten(7).toString(), h = App.color.success, $.plot("#linechart-mini1", [{
                data: [
                    [1, 20],
                    [2, 50],
                    [3, 35],
                    [4, 50],
                    [5, 25]
                ],
                canvasRender: !0
            }, {
                data: [
                    [1, 50],
                    [2, 20],
                    [3, 55],
                    [4, 30],
                    [5, 65]
                ],
                canvasRender: !0
            }], {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 0,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: .7
                            }, {
                                opacity: .7
                            }]
                        }
                    },
                    fillColor: "rgba(0, 0, 0, 1)",
                    shadowSize: 0,
                    curvedLines: {
                        apply: !0,
                        active: !0,
                        monotonicFit: !0
                    }
                },
                legend: {
                    show: !1
                },
                grid: {
                    show: !1,
                    hoverable: !0,
                    clickable: !0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [p, h],
                xaxis: {
                    autoscaleMargin: 0,
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    autoscaleMargin: .5,
                    ticks: 5,
                    tickDecimals: 0
                }
            }), t("linechart-mini1", 45),
            function() {
                var e = App.color.success,
                    o = [],
                    i = 100;

                function a() {
                    for (o.length > 0 && (o = o.slice(1)); o.length < i;) {
                        var e = (o.length > 0 ? o[o.length - 1] : 50) + 10 * Math.random() - 5;
                        e < 0 ? e = 0 : e > 100 && (e = 100), o.push(e)
                    }
                    for (var t = [], a = 0; a < o.length; ++a) t.push([a, o[a]]);
                    return t
                }
                var n = 500,
                    r = $.plot("#live-data", [a()], {
                        series: {
                            shadowSize: 0,
                            lines: {
                                show: !0,
                                lineWidth: 1,
                                fill: !0,
                                fillColor: {
                                    colors: [{
                                        opacity: .35
                                    }, {
                                        opacity: .35
                                    }]
                                }
                            }
                        },
                        grid: {
                            show: !0,
                            margin: {
                                top: 3,
                                bottom: 0,
                                left: 0,
                                right: 0
                            },
                            labelMargin: 0,
                            axisMargin: 0,
                            hoverable: !0,
                            clickable: !0,
                            tickColor: "rgba(0,0,0,0)",
                            borderWidth: 0,
                            minBorderMargin: 0
                        },
                        tooltip: {
                            show: !0,
                            cssClass: "tooltip-chart",
                            content: "<div class='content-chart'> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                            defaultTheme: !1
                        },
                        colors: [e],
                        yaxis: {
                            show: !1,
                            autoscaleMargin: .2,
                            ticks: 5,
                            tickDecimals: 0
                        },
                        xaxis: {
                            show: !1,
                            autoscaleMargin: 0
                        }
                    });
                t("live-data", 45),
                    function e() {
                        r.setData([a()]), r.draw(), setTimeout(e, n)
                    }()
            }(), f = tinycolor(App.color.primary).lighten(22), g = App.color.primary, m = [
                [1, e()],
                [2, e()],
                [3, 2 + e()],
                [4, 3 + e()],
                [5, 5 + e()],
                [6, 10 + e()],
                [7, 15 + e()],
                [8, 20 + e()],
                [9, 25 + e()],
                [10, 30 + e()],
                [11, 35 + e()],
                [12, 25 + e()],
                [13, 15 + e()],
                [14, 20 + e()],
                [15, 45 + e()],
                [16, 50 + e()],
                [17, 65 + e()],
                [18, 70 + e()],
                [19, 85 + e()],
                [20, 80 + e()],
                [21, 75 + e()],
                [22, 80 + e()],
                [23, 75 + e()]
            ], b = [
                [1, e()],
                [2, e()],
                [3, 10 + e()],
                [4, 15 + e()],
                [5, 20 + e()],
                [6, 25 + e()],
                [7, 30 + e()],
                [8, 35 + e()],
                [9, 40 + e()],
                [10, 45 + e()],
                [11, 50 + e()],
                [12, 55 + e()],
                [13, 60 + e()],
                [14, 70 + e()],
                [15, 75 + e()],
                [16, 80 + e()],
                [17, 85 + e()],
                [18, 90 + e()],
                [19, 95 + e()],
                [20, 100 + e()],
                [21, 110 + e()],
                [22, 120 + e()],
                [23, 130 + e()]
            ], $.plot($("#line-chart-live"), [{
                data: b,
                showLabels: !0,
                label: "New Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF"
            }, {
                data: m,
                showLabels: !0,
                label: "Old Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF"
            }], {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 1.5,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: .5
                            }, {
                                opacity: .5
                            }]
                        }
                    },
                    fillColor: "rgba(0, 0, 0, 1)",
                    points: {
                        show: !1,
                        fill: !0
                    },
                    shadowSize: 0
                },
                legend: {
                    show: !1
                },
                grid: {
                    show: !1,
                    margin: {
                        top: -20,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    labelMargin: 0,
                    axisMargin: 0,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    minBorderMargin: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [f, g],
                xaxis: {
                    autoscaleMargin: 0,
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    autoscaleMargin: .2,
                    ticks: 5,
                    tickDecimals: 0
                }
            }), t("line-chart-live", 60), v = App.color.primary, $("#line-chart2"), $.plot("#line-chart2", [{
                data: [
                    [1, 10],
                    [2, 30],
                    [3, 55],
                    [4, 36],
                    [5, 57],
                    [6, 80],
                    [7, 65],
                    [8, 50],
                    [9, 80],
                    [10, 70],
                    [11, 90],
                    [12, 67],
                    [12, 67]
                ],
                showLabels: !0,
                label: "New Visitors",
                labelPlacement: "below",
                canvasRender: !0,
                cColor: "#FFFFFF"
            }], {
                series: {
                    lines: {
                        show: !0,
                        lineWidth: 2,
                        fill: !0,
                        fillColor: {
                            colors: [{
                                opacity: .35
                            }, {
                                opacity: .35
                            }]
                        }
                    },
                    fillColor: "rgba(0, 0, 0, 1)",
                    points: {
                        show: !0,
                        fill: !0,
                        fillColor: v
                    },
                    shadowSize: 0
                },
                legend: {
                    show: !1
                },
                grid: {
                    show: !1,
                    margin: {
                        left: -8,
                        right: -8,
                        top: 0,
                        botttom: 0
                    },
                    labelMargin: 0,
                    axisMargin: 0,
                    hoverable: !0,
                    clickable: !0,
                    tickColor: "rgba(0, 0, 0, 0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: !0,
                    cssClass: "tooltip-chart",
                    content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                    defaultTheme: !1
                },
                colors: [v],
                xaxis: {
                    autoscaleMargin: 0,
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    autoscaleMargin: .5,
                    ticks: 5,
                    tickDecimals: 0
                }
            }), t("line-chart2", 60)
    }, App
}(), App = function() {
    "use strict";
    return App.codeEditor = function() {
        var e = $("#code1").html();
        e = (e = e.replace(/&lt;/g, "<")).replace(/&gt;/g, ">"), console.log(e);
        var t = CodeMirror($("#console")[0], {
            lineNumbers: !0,
            theme: "monokai",
            value: e,
            mode: "text/html",
            tabSize: 2
        });
        setTimeout(function() {
            t.refresh()
        }, 200)
    }, App
}(), App = function() {
    "use strict";
    return App.dashboard = function() {
        var e, t, o, i, a, n, r, l, s, c, d, u, p, h, f, g, m, b;
        $('[data-toggle="counter"]').each(function(e, t) {
            var o = $(this),
                i = "",
                a = "",
                n = 0,
                r = 0,
                l = 0,
                s = 2.5;
            o.data("prefix") && (i = o.data("prefix")), o.data("suffix") && (a = o.data("suffix")), o.data("start") && (n = o.data("start")), o.data("end") && (r = o.data("end")), o.data("decimals") && (l = o.data("decimals")), o.data("duration") && (s = o.data("duration")), new CountUp(o.get(0), n, r, l, s, {
                suffix: a,
                prefix: i
            }).start()
        }), $(".toggle-loading").on("click", function() {
            var e = $(this).parents(".widget, .panel");
            e.length && (e.addClass("be-loading-active"), setTimeout(function() {
                e.removeClass("be-loading-active")
            }, 3e3))
        }), e = App.color.primary, t = App.color.warning, o = App.color.success, i = App.color.danger, $("#spark1").sparkline([0, 5, 3, 7, 5, 10, 3, 6, 5, 10], {
            width: "85",
            height: "35",
            lineColor: e,
            highlightSpotColor: e,
            highlightLineColor: e,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), $("#spark2").sparkline([5, 8, 7, 10, 9, 10, 8, 6, 4, 6, 8, 7, 6, 8], {
            type: "bar",
            width: "85",
            height: "35",
            barWidth: 3,
            barSpacing: 3,
            chartRangeMin: 0,
            barColor: t
        }), $("#spark3").sparkline([2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 4, 5, 6, 5, 4, 4, 5], {
            type: "discrete",
            width: "85",
            height: "35",
            lineHeight: 20,
            lineColor: o,
            xwidth: 18
        }), $("#spark4").sparkline([2, 5, 3, 7, 5, 10, 3, 6, 5, 7], {
            width: "85",
            height: "35",
            lineColor: i,
            highlightSpotColor: i,
            highlightLineColor: i,
            fillColor: !1,
            spotColor: !1,
            minSpotColor: !1,
            maxSpotColor: !1,
            lineWidth: 1.15
        }), n = App.color.primary, r = tinycolor(App.color.primary).lighten(13).toString(), l = tinycolor(App.color.primary).lighten(20).toString(), $.plot($("#main-chart"), [{
            data: [
                [1, 35],
                [2, 60],
                [3, 40],
                [4, 65],
                [5, 45],
                [6, 75],
                [7, 35],
                [8, 40],
                [9, 60]
            ],
            showLabels: !0,
            label: "Purchases",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }, {
            data: [
                [1, 20],
                [2, 40],
                [3, 25],
                [4, 45],
                [5, 25],
                [6, 50],
                [7, 35],
                [8, 60],
                [9, 30]
            ],
            showLabels: !0,
            label: "Plans",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }, {
            data: [
                [1, 35],
                [2, 15],
                [3, 20],
                [4, 30],
                [5, 15],
                [6, 18],
                [7, 28],
                [8, 10],
                [9, 30]
            ],
            showLabels: !0,
            label: "Services",
            labelPlacement: "below",
            canvasRender: !0,
            cColor: "#FFFFFF"
        }], {
            series: {
                lines: {
                    show: !0,
                    lineWidth: 0,
                    fill: !0,
                    fillColor: {
                        colors: [{
                            opacity: 1
                        }, {
                            opacity: 1
                        }]
                    }
                },
                fillColor: "rgba(0, 0, 0, 1)",
                shadowSize: 0,
                curvedLines: {
                    apply: !0,
                    active: !0,
                    monotonicFit: !0
                }
            },
            legend: {
                show: !1
            },
            grid: {
                show: !0,
                margin: {
                    top: 20,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                labelMargin: 0,
                minBorderMargin: 0,
                axisMargin: 0,
                tickColor: "rgba(0,0,0,0.05)",
                borderWidth: 0,
                hoverable: !0,
                clickable: !0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [n, r, l],
            xaxis: {
                tickFormatter: function() {
                    return ""
                },
                autoscaleMargin: 0,
                ticks: 11,
                tickDecimals: 0,
                tickLength: 0
            },
            yaxis: {
                tickFormatter: function() {
                    return ""
                },
                ticks: 4,
                tickDecimals: 0
            }
        }), a = 60, $("#main-chart").bind("plothover", function(e, t, o) {
            var i = $(".tooltip-chart").width();
            o ? $(".tooltip-chart").css({
                top: o.pageY - a,
                left: o.pageX - i / 2
            }).fadeIn(200) : $(".tooltip-chart").hide()
        }), $('[data-color="main-chart-color1"]').css({
            "background-color": n
        }), $('[data-color="main-chart-color2"]').css({
            "background-color": r
        }), $('[data-color="main-chart-color3"]').css({
            "background-color": l
        }), s = App.color.success, c = App.color.warning, d = App.color.primary, $.plot("#top-sales", [{
            label: "Services",
            data: 33
        }, {
            label: "Standard Plans",
            data: 33
        }, {
            label: "Services",
            data: 33
        }], {
            series: {
                pie: {
                    radius: .75,
                    innerRadius: .58,
                    show: !0,
                    highlight: {
                        opacity: .1
                    },
                    label: {
                        show: !1
                    }
                }
            },
            grid: {
                hoverable: !0
            },
            legend: {
                show: !1
            },
            colors: [s, c, d]
        }), $('[data-color="top-sales-color1"]').css({
            "background-color": s
        }), $('[data-color="top-sales-color2"]').css({
            "background-color": c
        }), $('[data-color="top-sales-color3"]').css({
            "background-color": d
        }), u = $("#calendar-widget"), p = new Date, h = p.getFullYear(), f = p.getMonth(), g = [h + "-" + (f + 1) + "-16", h + "-" + (f + 1) + "-20"], $.extend($.datepicker, {
            _updateDatepicker_original: $.datepicker._updateDatepicker,
            _updateDatepicker: function(e) {
                this._updateDatepicker_original(e);
                var t = this._get(e, "afterShow");
                t && t.apply(e, [e])
            }
        }), void 0 !== jQuery.ui && u.datepicker({
            showOtherMonths: !0,
            selectOtherMonths: !0,
            beforeShowDay: function(e) {
                var t = e.getMonth(),
                    o = e.getDate(),
                    i = e.getFullYear();
                return -1 != $.inArray(i + "-" + (t + 1) + "-" + o, g) ? [!0, "has-events", "This day has events!"] : [!0, "", ""]
            },
            afterShow: function(e) {
                var t;
                t = e.dpDiv, 6 == $("tbody tr", t).length ? t.addClass("ui-datepicker-6rows") : t.removeClass("ui-datepicker-6rows")
            }
        }), m = tinycolor(App.color.primary).lighten(15).toHexString(), b = tinycolor(App.color.primary).lighten(8).toHexString(), tinycolor(App.color.primary).toHexString(), $("#map-widget").vectorMap({
            map: "world_en",
            backgroundColor: null,
            color: m,
            hoverOpacity: .7,
            selectedColor: b,
            enableZoom: !0,
            showTooltip: !0,
            values: {
                ru: "14",
                us: "14",
                ca: "10",
                br: "10",
                au: "11",
                uk: "3",
                cn: "12"
            },
            scaleColors: [m, b],
            normalizeFunction: "polynomial"
        })
    }, App
}(), App = function() {
    "use strict";
    return App.formElements = function() {
        $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            navIcons: {
                rightIcon: "mdi mdi-chevron-right",
                leftIcon: "mdi mdi-chevron-left"
            }
        }), $(".select2").select2({
            width: "100%",
            placeholder: "Select a state"
        }), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".bslider").bootstrapSlider(), $(".inputfile").each(function() {
            var e = $(this),
                t = e.next("label"),
                o = t.html();
            e.on("change", function(e) {
                var i = "";
                this.files && this.files.length > 1 ? i = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length) : e.target.value && (i = e.target.value.split("\\").pop()), i ? t.find("span").html(i) : t.html(o)
            })
        })
    }, App
}(), App = function() {
    "use strict";
    return App.masks = function() {
        $("[data-mask='date']").mask("99/99/9999"), $("[data-mask='phone']").mask("(999) 999-9999"), $("[data-mask='phone-ext']").mask("(999) 999-9999? x99999"), $("[data-mask='phone-int']").mask("+33 999 999 999"), $("[data-mask='taxid']").mask("99-9999999"), $("[data-mask='ssn']").mask("999-99-9999"), $("[data-mask='product-key']").mask("a*-999-a999"), $("[data-mask='percent']").mask("99%"), $("[data-mask='currency']").mask("$999,999,999.99")
    }, App
}(), App = function() {
    "use strict";
    return App.formMultiselect = function() {
        $("#my-select").multiSelect(), $("#pre-selected-options").multiSelect(), $("#callbacks").multiSelect({
            afterSelect: function(e) {
                alert("Select value: " + e)
            },
            afterDeselect: function(e) {
                alert("Deselect value: " + e)
            }
        }), $("#optgroup").multiSelect({
            selectableOptgroup: !0
        }), $("#disabled-attribute").multiSelect(), $("#custom-headers").multiSelect({
            selectableHeader: "<div class='custom-header'>Selectable items</div>",
            selectionHeader: "<div class='custom-header'>Selection items</div>"
        }), $("#searchable").multiSelect({
            selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Search'>",
            afterInit: function(e) {
                var t = this,
                    o = t.$selectableUl.prev(),
                    i = t.$selectionUl.prev(),
                    a = "#" + t.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)",
                    n = "#" + t.$container.attr("id") + " .ms-elem-selection.ms-selected";
                t.qs1 = o.quicksearch(a).on("keydown", function(e) {
                    if (40 === e.which) return t.$selectableUl.focus(), !1
                }), t.qs2 = i.quicksearch(n).on("keydown", function(e) {
                    if (40 == e.which) return t.$selectionUl.focus(), !1
                })
            },
            afterSelect: function() {
                this.qs1.cache(), this.qs2.cache()
            },
            afterDeselect: function() {
                this.qs1.cache(), this.qs2.cache()
            }
        })
    }, App
}(), App = function() {
    "use strict";
    return App.wizard = function() {
        $(".wizard-ux").wizard(), $(".wizard-ux").on("changed.fu.wizard", function() {
            $(".bslider").slider()
        }), $(".wizard-next").click(function(e) {
            var t = $(this).data("wizard");
            $(t).wizard("next"), e.preventDefault()
        }), $(".wizard-previous").click(function(e) {
            var t = $(this).data("wizard");
            $(t).wizard("previous"), e.preventDefault()
        }), $(".select2").select2({
            width: "100%"
        }), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $("#credit_slider").slider().on("slide", function(e) {
            $("#credits").html("$" + e.value)
        }), $("#rate_slider").slider().on("slide", function(e) {
            $("#rate").html(e.value + "%")
        })
    }, App
}(), App = function() {
    "use strict";
    return App.textEditors = function() {
        $("#editor1").summernote({
            height: 300
        })
    }, App
}(), App = function() {
    "use strict";
    return App.IconsFilter = function() {
        $(".select2").select2({
            width: "100%"
        });
        var e = [],
            t = $(".be-icons-list"),
            o = $(".icon-category", t),
            i = $(".input-search input", t),
            a = $("#icon-category", t);
        o.each(function(t, o) {
            $(".icon-class", o).each(function(t, i) {
                var a = {
                    name: i.innerHTML,
                    element: i,
                    category: o
                };
                e.push(a)
            })
        }), i.on("keyup", function() {
            var i = [],
                n = $(this).val().toLowerCase();
            if ("all" == a.val() ? o.show() : $("#" + a.val()).show(), n) {
                $(".icon-visible", o).removeClass("icon-visible");
                var r = $.grep(e, function(e, t) {
                    var o = e.name.search(n) > -1;
                    return o && i.indexOf(e.category) < 0 && i.push(e.category), o
                });
                $.each(r, function(e, t) {
                    $(t.element).parents(".col-sm-6").addClass("icon-visible")
                }), t.addClass("hide-icons"), o.not(i).hide().addClass("icon-category--hide-icons")
            } else t.removeClass("hide-icons")
        }), a.on("change", function() {
            var e = $(this).val();
            "all" == e ? o.show() : (o.hide(), $("#" + e).show())
        })
    }, App
}(), App = function() {
    "use strict";
    return App.loaders = function() {
        $(".toggle-loading").on("click", function() {
            var e = $(this).parents(".widget, .card");
            e.length && (e.addClass("be-loading-active"), setTimeout(function() {
                e.removeClass("be-loading-active")
            }, 3e3))
        })
    }, App
}(), App = function() {
    "use strict";
    return App.mailCompose = function() {
        $(".tags").select2({
            tags: 0,
            width: "100%"
        }), $("#email-editor").summernote({
            height: 200
        })
    }, App
}(), App = function() {
    "use strict";
    return App.mailInbox = function() {
        $(".be-select-all input").on("change", function() {
            var e = $(".email-list").find('input[type="checkbox"]');
            $(this).is(":checked") ? e.prop("checked", !0) : e.prop("checked", !1)
        })
    }, App
}(), App = function() {
    "use strict";
    return App.mapsGoogle = function() {
        var e = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        new google.maps.Map(document.getElementById("map_one"), e);
        e = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        new google.maps.Map(document.getElementById("map_two"), e);
        e = {
            zoom: 14,
            center: new google.maps.LatLng(-33.877827, 151.188598),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        new google.maps.Map(document.getElementById("map_three"), e)
    }, App
}(), App = function() {
    "use strict";
    return App.mapsVector = function() {
        var e = App.color.primary,
            t = App.color.success,
            o = App.color.danger,
            i = App.color.warning,
            a = App.color.success,
            n = App.color.primary,
            r = tinycolor(App.color.grey).lighten(5).toString(),
            l = App.color.danger;
        $("#usa-map").vectorMap({
            map: "us_merc_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: e
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#france-map").vectorMap({
            map: "fr_merc_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: t
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#uk-map").vectorMap({
            map: "uk_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: o
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#chicago-map").vectorMap({
            map: "us-il-chicago_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: i
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#australia-map").vectorMap({
            map: "au_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: a
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#india-map").vectorMap({
            map: "in_mill_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: n
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        }), $("#vector-map").vectorMap({
            map: "map",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: r,
                    "fill-opacity": .8,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": .8
                }
            },
            markerStyle: {
                initial: {
                    r: 10
                }
            },
            markers: [{
                coords: [100, 100],
                name: "Marker 1",
                style: {
                    fill: "#acb1b6",
                    stroke: "#cfd5db",
                    "stroke-width": 3
                }
            }, {
                coords: [200, 200],
                name: "Marker 2",
                style: {
                    fill: "#acb1b6",
                    stroke: "#cfd5db",
                    "stroke-width": 3
                }
            }]
        }), $("#canada-map").vectorMap({
            map: "ca_lcc_en",
            backgroundColor: "transparent",
            regionStyle: {
                initial: {
                    fill: l
                },
                hover: {
                    "fill-opacity": .8
                }
            }
        })
    }, App
}(), App = function() {
    "use strict";
    return App.megaMenu = function() {
        var e, t = {
            megaMenuSectionClass: "be-mega-menu-section",
            navTabsClass: "be-nav-tabs",
            subNavClass: "be-sub-nav"
        };
        var o, i = (o = {}, function(e, t, i) {
            i || (i = "x1x2x3x4"), o[i] && clearTimeout(o[i]), o[i] = setTimeout(e, t)
        });
        $(".be-sub-header .nav-link, .be-sub-header .dropdown-item", e).on("click", function(e) {
            var o = $(this),
                i = o.parent(),
                a = i.siblings(".open"),
                n = o.next("." + t.subNavClass),
                r = t.leftSidebarSlideSpeed;

            function l(e) {
                var o = $(e).parent(),
                    i = $(".nav-item.open, ." + t.megaMenuSectionClass + ".open", o);
                e.slideUp({
                    duration: r,
                    complete: function() {
                        o.removeClass("open"), i.removeClass("open"), $(this).removeAttr("style")
                    }
                })
            }
            $.isSm() ? (n.length && (i.hasClass("open") ? l(n) : function(e) {
                var o = e.parent(),
                    i = !1;
                if (i = o.siblings(".open"), o.hasClass(t.megaMenuSectionClass)) {
                    var a = o.parent();
                    i = i.add(a.siblings().find("." + t.megaMenuSectionClass + ".open"))
                }
                i && l($("> ." + t.subNavClass, i)), e.slideDown({
                    duration: r,
                    complete: function() {
                        o.addClass("open"), $(this).removeAttr("style")
                    }
                })
            }(n), e.preventDefault()), e.stopPropagation()) : i.parent().hasClass("navbar-nav") && n.length && (a.removeClass("open"), i.addClass("open"), e.preventDefault())
        }), $(window).resize(function() {
            i(function() {
                var t;
                $.isSm() || (t = $(".navbar-nav > .nav-item", e)).filter(".open").length || t.filter(":first-child").addClass("open")
            }, 100, "sync_tabs")
        })
    }, App
}(), App = function() {
    "use strict";
    return App.pageCalendar = function() {
        $("#external-events .fc-event").each(function() {
            $(this).data("event", {
                title: $.trim($(this).text()),
                stick: !0
            }), $(this).draggable({
                zIndex: 999,
                revert: !0,
                revertDuration: 0
            })
        }), $("#calendar").fullCalendar({
            header: {
                left: "title",
                center: "",
                right: "month,agendaWeek,agendaDay, today, prev,next"
            },
            defaultDate: "2016-06-12",
            editable: !0,
            eventLimit: !0,
            droppable: !0,
            drop: function() {
                $("#drop-remove").is(":checked") && $(this).remove()
            },
            events: [{
                title: "All Day Event",
                start: "2016-06-01"
            }, {
                title: "Long Event",
                start: "2016-06-07",
                end: "2016-06-10"
            }, {
                id: 999,
                title: "Repeating Event",
                start: "2016-06-09T16:00:00"
            }, {
                id: 999,
                title: "Repeating Event",
                start: "2016-06-16T16:00:00"
            }, {
                title: "Conference",
                start: "2016-06-11",
                end: "2016-06-13"
            }, {
                title: "Meeting",
                start: "2016-06-12T10:30:00",
                end: "2016-06-12T12:30:00"
            }, {
                title: "Lunch",
                start: "2016-06-12T12:00:00"
            }, {
                title: "Meeting",
                start: "2016-06-12T14:30:00"
            }, {
                title: "Happy Hour",
                start: "2016-06-12T17:30:00"
            }, {
                title: "Dinner",
                start: "2016-06-12T20:00:00"
            }, {
                title: "Birthday Party",
                start: "2016-06-13T07:00:00"
            }, {
                title: "Click for Google",
                url: "http://google.com/",
                start: "2016-06-28"
            }]
        })
    }, App
}(), App = function() {
    "use strict";
    return App.pageGallery = function() {
        var e = $(".gallery-container");
        e.masonry({
            columnWidth: 0,
            itemSelector: ".item"
        }), $("#sidebar-collapse").click(function() {
            e.masonry()
        }), $(".image-zoom").magnificPopup({
            type: "image",
            mainClass: "mfp-with-zoom",
            zoom: {
                enabled: !0,
                duration: 300,
                easing: "ease-in-out",
                opener: function(e) {
                    return $(e).parents("div.img")
                }
            }
        }), e.masonry()
    }, App
}(), App = function() {
    "use strict";
    return App.pageProfile = function() {
        var e, t, o;
        t = App.color.primary, o = tinycolor(App.color.primary).lighten(22).toString(), $.plot($("#bar-chart1"), [{
            data: [
                [0, 7],
                [1, 13],
                [2, 17],
                [3, 20],
                [4, 26],
                [5, 37],
                [6, 35],
                [7, 28],
                [8, 38],
                [9, 38],
                [10, 32],
                [11, 25]
            ],
            label: "Page Views"
        }, {
            data: [
                [0, 15],
                [1, 10],
                [2, 15],
                [3, 25],
                [4, 30],
                [5, 29],
                [6, 25],
                [7, 33],
                [8, 45],
                [9, 43],
                [10, 38],
                [11, 36]
            ],
            label: "Unique Visitor"
        }], {
            series: {
                bars: {
                    order: 2,
                    align: "center",
                    show: !0,
                    barWidth: .3,
                    lineWidth: .7,
                    fill: !0,
                    fillColor: {
                        colors: [{
                            opacity: 1
                        }, {
                            opacity: 1
                        }]
                    }
                },
                shadowSize: 2
            },
            legend: {
                show: !1
            },
            grid: {
                margin: 0,
                show: !1,
                labelMargin: 10,
                axisMargin: 500,
                hoverable: !0,
                clickable: !0,
                tickColor: "rgba(0,0,0,0.15)",
                borderWidth: 0
            },
            tooltip: {
                show: !0,
                cssClass: "tooltip-chart",
                content: "<div class='content-chart'> <span> %s </span> <div class='label'> <div class='label-x'> %x.0 </div> - <div class='label-y'> %y.0 </div> </div></div>",
                defaultTheme: !1
            },
            colors: [t, o],
            xaxis: {
                ticks: 11,
                tickDecimals: 0
            },
            yaxis: {
                ticks: 4,
                tickDecimals: 0
            }
        }), e = 60, $("#bar-chart1").bind("plothover", function(t, o, i) {
            var a = $(".tooltip-chart").width();
            i ? $(".tooltip-chart").css({
                top: i.pageY - e,
                left: i.pageX - a / 2
            }).fadeIn(200) : $(".tooltip-chart").hide()
        })
    }, App
}(), App = function() {
    "use strict";
    return App.tableFilters = function() {
        $(".select2").select2({
            width: "100%"
        }), $(".tags").select2({
            tags: !0,
            width: "100%"
        }), $(".bslider").bootstrapSlider(), $(".datetimepicker").datetimepicker({
            autoclose: !0,
            componentIcon: ".mdi.mdi-calendar",
            format: "mm/dd/yyyy",
            navIcons: {
                rightIcon: "mdi mdi-chevron-right",
                leftIcon: "mdi mdi-chevron-left"
            }
        }), $.fn.dataTable.ext.search.push(function(e, t, o, i, a) {
            var n = $("#milestone_slider").val().split(","),
                r = $(e.aoData[o].anCells[3]).data("progress").split(","),
                l = $(".select2").val(),
                s = $(e.aoData[o].anCells[2]).data("project"),
                c = "" !== $("#dateSince").val() ? new Date($("#dateSince").val()) : new Date("01/01/1999"),
                d = "" !== $("#dateTo").val() ? new Date($("#dateTo").val()) : new Date("01/01/2099"),
                u = new Date($(".date", e.aoData[o].anCells[5]).html()),
                p = $("#toDo").is(":checked"),
                h = $("#inProgress").is(":checked"),
                f = $("#inReview").is(":checked"),
                g = $("#done").is(":checked"),
                m = $(e.aoData[o].nTr).attr("class").split(" ");
            return parseInt(r[1]) >= parseInt(n[0]) && parseInt(r[1]) <= parseInt(n[1]) && ((l == s || "All" == l) && (u >= c && u <= d && (0 == p && 0 == h && 0 == f && 0 == g || 1 == p && "to-do" == m[1] || 1 == h && "in-progress" == m[1] || 1 == f && "in-review" == m[1] || 1 == g && "done" == m[1])))
        });
        var e = $("#table1").DataTable({
            pageLength: 5,
            dom: "<'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        });
        $("#milestone_slider").slider().on("slide", function(t) {
            var o = t.value[0],
                i = t.value[1];
            $("#slider-value").html(o + "% - " + i + "%"), e.draw()
        }), $(".select2").on("change", function() {
            e.draw()
        }), $("#dateSince, #dateTo").on("change", function() {
            e.draw()
        }), $("#toDo, #inProgress, #inReview, #done").on("click", function() {
            e.draw()
        })
    }, App
}(), App = function() {
    "use strict";
    return App.dataTables = function() {
        $.fn.DataTable.ext.pager.numbers_length = 4, $.extend(!0, $.fn.dataTable.defaults, {
            dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6'f>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        }), $("#table1").dataTable(), $("#table2").dataTable({
            pageLength: 6,
            dom: "<'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        }), $("#table3").dataTable({
            buttons: ["copy", "csv", "excel", "pdf", "print"],
            lengthMenu: [
                [6, 10, 25, 50, -1],
                [6, 10, 25, 50, "All"]
            ],
            dom: "<'row be-datatable-header'<'col-sm-6'l><'col-sm-6 text-right'B>><'row be-datatable-body'<'col-sm-12'tr>><'row be-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
        }), $("#table4").dataTable({
            responsive: !0
        }), $("#table5").dataTable({
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.childRowImmediate,
                    type: ""
                }
            }
        }), $("#table6").dataTable({
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function(e) {
                            e.data();
                            return "Details"
                        }
                    }),
                    renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                        tableClass: "table"
                    })
                }
            }
        })
    }, App
}(), App = function() {
    "use strict";
    return App.uiNestableLists = function() {
        function e(e, t) {
            var o = $(e).nestable("serialize");
            $(t).html(window.JSON.stringify(o))
        }
        $(".dd").nestable(), e("#list1", "#out1"), e("#list2", "#out2"), $("#list1").on("change", function() {
            e("#list1", "#out1")
        }), $("#list2").on("change", function() {
            e("#list2", "#out2")
        })
    }, App
}(), App = function() {
    "use strict";
    return App.uiNotifications = function() {
        $("#not-basic").click(function() {
            return $.gritter.add({
                title: "Samantha new msg!",
                text: "You have a new Thomas message, let's checkout your inbox.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar.png",
                time: "",
                class_name: "img-rounded"
            }), !1
        }), $("#not-theme").click(function() {
            return $.gritter.add({
                title: "Welcome home!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/avatar5.png",
                class_name: "clean img-rounded",
                time: ""
            }), !1
        }), $("#not-sticky").click(function() {
            return $.gritter.add({
                title: "Sticky Note",
                text: "Your daily goal is 130 new code lines, don't forget to update your work.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/slack_logo.png",
                class_name: "clean",
                sticky: !0,
                time: ""
            }), !1
        }), $("#not-text").click(function() {
            return $.gritter.add({
                title: "Just Text",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum.",
                class_name: "clean",
                time: ""
            }), !1
        }), $("#not-tr").click(function() {
            return $.extend($.gritter.options, {
                position: "top-right"
            }), $.gritter.add({
                title: "Top Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-tl").click(function() {
            return $.extend($.gritter.options, {
                position: "top-left"
            }), $.gritter.add({
                title: "Top Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-bl").click(function() {
            return $.extend($.gritter.options, {
                position: "bottom-left"
            }), $.gritter.add({
                title: "Bottom Left",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-br").click(function() {
            return $.extend($.gritter.options, {
                position: "bottom-right"
            }), $.gritter.add({
                title: "Bottom Right",
                text: "This is a simple Gritter Notification. Etiam efficitur efficitur nisl eu dictum, nullam non orci elementum",
                class_name: "clean"
            }), !1
        }), $("#not-facebook").click(function() {
            return $.gritter.add({
                title: "You have comments!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/fb-icon.png",
                class_name: "color facebook"
            }), !1
        }), $("#not-twitter").click(function() {
            return $.gritter.add({
                title: "You have new followers!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/tw-icon.png",
                class_name: "color twitter"
            }), !1
        }), $("#not-google-plus").click(function() {
            return $.gritter.add({
                title: "You have new +1!",
                text: "You can start your day checking the new messages.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/gp-icon.png",
                class_name: "color google-plus"
            }), !1
        }), $("#not-dribbble").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/db-icon.png",
                class_name: "color dribbble"
            }), !1
        }), $("#not-flickr").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/fl-icon.png",
                class_name: "color flickr"
            }), !1
        }), $("#not-linkedin").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/in-icon.png",
                class_name: "color linkedin"
            }), !1
        }), $("#not-youtube").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/yt-icon.png",
                class_name: "color youtube"
            }), !1
        }), $("#not-pinterest").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/pi-icon.png",
                class_name: "color pinterest"
            }), !1
        }), $("#not-github").click(function() {
            return $.gritter.add({
                title: "You have new forks!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/gh-icon.png",
                class_name: "color github"
            }), !1
        }), $("#not-tumblr").click(function() {
            return $.gritter.add({
                title: "You have new comments!",
                text: "You can start your day checking the new comments.",
                image: App.conf.assetsPath + "/" + App.conf.imgPath + "/tu-icon.png",
                class_name: "color tumblr"
            }), !1
        }), $("#not-primary").click(function() {
            $.gritter.add({
                title: "Primary",
                text: "This is a simple Gritter Notification.",
                class_name: "color primary"
            })
        }), $("#not-success").click(function() {
            $.gritter.add({
                title: "Success",
                text: "This is a simple Gritter Notification.",
                class_name: "color success"
            })
        }), $("#not-warning").click(function() {
            $.gritter.add({
                title: "Warning",
                text: "This is a simple Gritter Notification.",
                class_name: "color warning"
            })
        }), $("#not-danger").click(function() {
            $.gritter.add({
                title: "Danger",
                text: "This is a simple Gritter Notification.",
                class_name: "color danger"
            })
        }), $("#not-dark").click(function() {
            $.gritter.add({
                title: "Dark Color",
                text: "This is a simple Gritter Notification.",
                class_name: "color dark"
            })
        })
    }, App
}(), App = function() {
    "use strict";
    return App.uiSweetalert2 = function() {
        $("#swal-basic").click(function() {
            return swal({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis.",
                confirmButtonText: "Proceed",
                showCloseButton: !0
            }), !1
        }), $("#swal-title").click(function() {
            return swal({
                title: "Sweetalert example",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis.",
                confirmButtonText: "Proceed",
                showCloseButton: !0
            }), !1
        }), $("#swal-icon").click(function() {
            return swal({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis.",
                type: "question",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                customClass: "content-text-center"
            }), !1
        }), $("#swal-long").click(function() {
            return swal({
                imageUrl: "https://placeholder.pics/svg/300x1500",
                imageHeight: 1500,
                imageAlt: "A tall image",
                confirmButtonText: "Proceed",
                showCloseButton: !0
            }), !1
        }), $("#swal-tr").click(function() {
            return swal({
                position: "top-end",
                type: "success",
                title: "Sweetalert example",
                showConfirmButton: !1,
                timer: 1500,
                customClass: "content-header-center"
            }), !1
        }), $("#swal-tl").click(function() {
            return swal({
                position: "top-start",
                type: "success",
                title: "Sweetalert example",
                showConfirmButton: !1,
                timer: 1500,
                customClass: "content-header-center"
            }), !1
        }), $("#swal-bl").click(function() {
            return swal({
                position: "bottom-start",
                type: "success",
                title: "Sweetalert example",
                showConfirmButton: !1,
                timer: 1500,
                customClass: "content-header-center"
            }), !1
        }), $("#swal-br").click(function() {
            return swal({
                position: "bottom-end",
                type: "success",
                title: "Sweetalert example",
                showConfirmButton: !1,
                timer: 1500,
                customClass: "content-header-center"
            }), !1
        }), $("#swal-close").click(function() {
            return swal({
                title: "Close example",
                type: "info",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                focusConfirm: !1,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: "Thumbs up, great!"
            }), !1
        }), $("#swal-success").click(function() {
            return swal({
                title: "Custom background.",
                text: "This is a sweetalert with custom background",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "modal-full-color modal-full-color-success"
            }), !1
        }), $("#swal-primary").click(function() {
            return swal({
                title: "Custom background.",
                text: "This is a sweetalert with custom background",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "modal-full-color modal-full-color-primary"
            }), !1
        }), $("#swal-warning").click(function() {
            return swal({
                title: "Custom background.",
                text: "This is a sweetalert with custom background",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "modal-full-color modal-full-color-warning"
            }), !1
        }), $("#swal-danger").click(function() {
            return swal({
                title: "Custom background.",
                text: "This is a sweetalert with custom background",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "modal-full-color modal-full-color-danger"
            }), !1
        }), $("#swal-dark").click(function() {
            return swal({
                title: "Custom background.",
                text: "This is a sweetalert with custom background",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "modal-full-color modal-full-color-dark"
            }), !1
        }), $("#swal-col-success").click(function() {
            return swal({
                title: "Sweetalert colored header.",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis. Donec fermentum mattis velit id pretium. Suspendisse sed tortor sed diam lobortis tempus at sed lacus. Phasellus semper ex auctor libero scelerisque ultricies.",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "colored-header colored-header-success"
            }), !1
        }), $("#swal-col-primary").click(function() {
            return swal({
                title: "Sweetalert colored header.",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis. Donec fermentum mattis velit id pretium. Suspendisse sed tortor sed diam lobortis tempus at sed lacus. Phasellus semper ex auctor libero scelerisque ultricies.",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "colored-header colored-header-primary"
            }), !1
        }), $("#swal-col-warning").click(function() {
            return swal({
                title: "Sweetalert colored header.",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis. Donec fermentum mattis velit id pretium. Suspendisse sed tortor sed diam lobortis tempus at sed lacus. Phasellus semper ex auctor libero scelerisque ultricies.",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "colored-header colored-header-warning"
            }), !1
        }), $("#swal-col-danger").click(function() {
            return swal({
                title: "Sweetalert colored header.",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis. Donec fermentum mattis velit id pretium. Suspendisse sed tortor sed diam lobortis tempus at sed lacus. Phasellus semper ex auctor libero scelerisque ultricies.",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "colored-header colored-header-danger"
            }), !1
        }), $("#swal-col-dark").click(function() {
            return swal({
                title: "Sweetalert colored header.",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices euismod lobortis. Donec fermentum mattis velit id pretium. Suspendisse sed tortor sed diam lobortis tempus at sed lacus. Phasellus semper ex auctor libero scelerisque ultricies.",
                confirmButtonText: "Proceed",
                showCloseButton: !0,
                showCancelButton: !0,
                customClass: "colored-header colored-header-dark"
            }), !1
        }), $("#swal-auto").click(function() {
            var e = 0;
            return swal({
                title: "Auto close alert!",
                html: "I will close in <strong></strong> seconds.",
                timer: 2e3,
                customClass: "content-actions-center",
                onOpen: function() {
                    swal.showLoading(), e = setInterval(function() {
                        swal.getContent().querySelector("strong").textContent = swal.getTimerLeft()
                    }, 100)
                },
                onClose: function() {
                    clearInterval(e)
                }
            }).then(function(e) {
                e.dismiss === swal.DismissReason.timer && console.log("I was closed by the timer")
            }), !1
        }), $("#swal-queue").click(function() {
            return swal.mixin({
                input: "text",
                confirmButtonText: "Next &rarr;",
                showCancelButton: !0,
                customClass: "content-header-center content-header-title-left content-actions-left",
                progressSteps: ["1", "2", "3"]
            }).queue(["Question 1", "Question 2", "Question 3"]).then(function(e) {
                e.value && swal({
                    title: "All done!",
                    html: "Your answers: <pre><code>" + JSON.stringify(e.value) + "</code></pre>",
                    confirmButtonText: "Lovely!"
                })
            }), !1
        }), $("#swal-image").click(function() {
            return swal({
                title: "Sweet!",
                text: "Modal with a custom image.",
                confirmButtonText: "Proceed",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            }), !1
        }), $("#swal-html").click(function() {
            return swal({
                title: "<strong>HTML <u>example</u></strong>",
                type: "info",
                html: 'You can use <b>bold text</b>, <a href="//github.com">links</a> and other HTML tags',
                showCloseButton: !0,
                showCancelButton: !0,
                focusConfirm: !1,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: "Thumbs up, great!",
                customClass: "content-text-center"
            }), !1
        }), $("#swal-input").click(function() {
            return swal({
                title: "Enter anything",
                input: "text",
                confirmButtonText: "Proceed",
                showCancelButton: !0,
                inputValidator: function(e) {
                    return !e && "You need to write something!"
                }
            }), !1
        }), $("#swal-textarea").click(function() {
            return swal({
                title: "Enter anything",
                confirmButtonText: "Proceed",
                input: "textarea",
                inputPlaceholder: "Type your message here...",
                showCancelButton: !0,
                inputValidator: function(e) {
                    return !e && "You need to write something!"
                }
            }), !1
        }), $("#swal-select").click(function() {
            return swal({
                title: "Select country",
                confirmButtonText: "Proceed",
                input: "select",
                inputOptions: {
                    SRB: "Serbia",
                    UKR: "Ukraine",
                    HRV: "Croatia"
                },
                inputPlaceholder: "Select country",
                showCancelButton: !0
            }), !1
        }), $("#swal-radio").click(function() {
            return swal({
                title: "Select color",
                confirmButtonText: "Proceed",
                input: "radio",
                inputOptions: {
                    "#ff0000": "Red",
                    "#00ff00": "Green",
                    "#0000ff": "Blue"
                },
                inputValidator: function(e) {
                    return !e && "You need to choose something!"
                }
            }), !1
        }), $("#swal-checkbox").click(function() {
            return swal({
                title: "Terms and conditions",
                confirmButtonText: "Proceed",
                input: "checkbox",
                inputValue: 1,
                inputPlaceholder: "I agree with the terms and conditions",
                inputValidator: function(e) {
                    return !e && "You need to agree with T&C"
                }
            }), !1
        }), $("#swal-file").click(function() {
            return swal({
                title: "Select image",
                confirmButtonText: "Proceed",
                input: "file",
                inputAttributes: {
                    accept: "image/*",
                    "aria-label": "Upload your profile picture"
                }
            }), !1
        })
    }, App
}();