(function (d, a, c) {
   var f = d.requestAnimationFrame || d.webkitRequestAnimationFrame || d.mozRequestAnimationFrame || d.oRequestAnimationFrame || d.msRequestAnimationFrame || function (g) {
         d.setTimeout(g, 1000 / 60)
      };
   var b = (function () {
      var k = {};
      var l = a.createElement("div").style;
      var i = (function () {
         var p = ["t", "webkitT", "MozT", "msT", "OT"], n, o = 0, m = p.length;
         for (; o < m; o++) {
            n = p[o] + "ransform";
            if (n in l) {
               return p[o].substr(0, p[o].length - 1)
            }
         }
         return false
      })();

      function j(m) {
         if (i === false) {
            return false
         }
         if (i === "") {
            return m
         }
         return i + m.charAt(0).toUpperCase() + m.substr(1)
      }

      k.getTime = Date.now || function g() {
            return new Date().getTime()
         };
      k.extend = function (o, n) {
         for (var m in n) {
            o[m] = n[m]
         }
      };
      k.addEvent = function (p, o, n, m) {
         p.addEventListener(o, n, !!m)
      };
      k.removeEvent = function (p, o, n, m) {
         p.removeEventListener(o, n, !!m)
      };
      k.prefixPointerEvent = function (m) {
         return d.MSPointerEvent ? "MSPointer" + m.charAt(9).toUpperCase() + m.substr(10) : m
      };
      k.momentum = function (s, o, p, m, t, u) {
         var n = s - o, q = c.abs(n) / p, v, r;
         u = u === undefined ? 0.0006 : u;
         v = s + (q * q) / (2 * u) * (n < 0 ? -1 : 1);
         r = q / u;
         if (v < m) {
            v = t ? m - (t / 2.5 * (q / 8)) : m;
            n = c.abs(v - s);
            r = n / q
         } else {
            if (v > 0) {
               v = t ? t / 2.5 * (q / 8) : 0;
               n = c.abs(s) + v;
               r = n / q
            }
         }
         return {destination: c.round(v), duration: r}
      };
      var h = j("transform");
      k.extend(k, {
         hasTransform: h !== false,
         hasPerspective: j("perspective") in l,
         hasTouch: "ontouchstart" in d,
         hasPointer: d.PointerEvent || d.MSPointerEvent,
         hasTransition: j("transition") in l
      });
      k.isBadAndroid = /Android /.test(d.navigator.appVersion) && !(/Chrome\/\d/.test(d.navigator.appVersion));
      k.extend(k.style = {}, {
         transform: h,
         transitionTimingFunction: j("transitionTimingFunction"),
         transitionDuration: j("transitionDuration"),
         transitionDelay: j("transitionDelay"),
         transformOrigin: j("transformOrigin")
      });
      k.hasClass = function (n, o) {
         var m = new RegExp("(^|\\s)" + o + "(\\s|$)");
         return m.test(n.className)
      };
      k.addClass = function (n, o) {
         if (k.hasClass(n, o)) {
            return
         }
         var m = n.className.split(" ");
         m.push(o);
         n.className = m.join(" ")
      };
      k.removeClass = function (n, o) {
         if (!k.hasClass(n, o)) {
            return
         }
         var m = new RegExp("(^|\\s)" + o + "(\\s|$)", "g");
         n.className = n.className.replace(m, " ")
      };
      k.offset = function (m) {
         var o = -m.offsetLeft, n = -m.offsetTop;
         while (m = m.offsetParent) {
            o -= m.offsetLeft;
            n -= m.offsetTop
         }
         return {left: o, top: n}
      };
      k.preventDefaultException = function (o, n) {
         for (var m in n) {
            if (n[m].test(o[m])) {
               return true
            }
         }
         return false
      };
      k.extend(k.eventType = {}, {
         touchstart: 1,
         touchmove: 1,
         touchend: 1,
         mousedown: 2,
         mousemove: 2,
         mouseup: 2,
         pointerdown: 3,
         pointermove: 3,
         pointerup: 3,
         MSPointerDown: 3,
         MSPointerMove: 3,
         MSPointerUp: 3
      });
      k.extend(k.ease = {}, {
         quadratic: {
            style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fn: function (m) {
               return m * (2 - m)
            }
         },
         circular: {
            style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
            fn: function (m) {
               return c.sqrt(1 - (--m * m))
            }
         },
         back: {
            style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            fn: function (n) {
               var m = 4;
               return (n = n - 1) * n * ((m + 1) * n + m) + 1
            }
         },
         bounce: {
            style: "", fn: function (m) {
               if ((m /= 1) < (1 / 2.75)) {
                  return 7.5625 * m * m
               } else {
                  if (m < (2 / 2.75)) {
                     return 7.5625 * (m -= (1.5 / 2.75)) * m + 0.75
                  } else {
                     if (m < (2.5 / 2.75)) {
                        return 7.5625 * (m -= (2.25 / 2.75)) * m + 0.9375
                     } else {
                        return 7.5625 * (m -= (2.625 / 2.75)) * m + 0.984375
                     }
                  }
               }
            }
         },
         elastic: {
            style: "", fn: function (m) {
               var n = 0.22, o = 0.4;
               if (m === 0) {
                  return 0
               }
               if (m == 1) {
                  return 1
               }
               return (o * c.pow(2, -10 * m) * c.sin((m - n / 4) * (2 * c.PI) / n) + 1)
            }
         }
      });
      k.tap = function (o, m) {
         var n = a.createEvent("Event");
         n.initEvent(m, true, true);
         n.pageX = o.pageX;
         n.pageY = o.pageY;
         o.target.dispatchEvent(n)
      };
      k.click = function (o) {
         var n = o.target, m;
         if (!(/(SELECT|INPUT|TEXTAREA)/i).test(n.tagName)) {
            m = a.createEvent("MouseEvents");
            m.initMouseEvent("click", true, true, o.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, 0, null);
            m._constructed = true;
            n.dispatchEvent(m)
         }
      };
      return k
   })();

   function e(j, g) {
      this.wrapper = typeof j == "string" ? a.querySelector(j) : j;
      this.scroller = this.wrapper.children[0];
      this.scrollerStyle = this.scroller.style;
      this.options = {
         startX: 0,
         startY: 0,
         scrollY: true,
         directionLockThreshold: 5,
         momentum: true,
         bounce: true,
         bounceTime: 600,
         bounceEasing: "",
         preventDefault: true,
         preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/},
         HWCompositing: true,
         useTransition: true,
         useTransform: true
      };
      for (var h in g) {
         this.options[h] = g[h]
      }
      this.translateZ = this.options.HWCompositing && b.hasPerspective ? " translateZ(0)" : "";
      this.options.useTransition = b.hasTransition && this.options.useTransition;
      this.options.useTransform = b.hasTransform && this.options.useTransform;
      this.options.eventPassthrough = this.options.eventPassthrough === true ? "vertical" : this.options.eventPassthrough;
      this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
      this.options.scrollY = this.options.eventPassthrough == "vertical" ? false : this.options.scrollY;
      this.options.scrollX = this.options.eventPassthrough == "horizontal" ? false : this.options.scrollX;
      this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
      this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
      this.options.bounceEasing = typeof this.options.bounceEasing == "string" ? b.ease[this.options.bounceEasing] || b.ease.circular : this.options.bounceEasing;
      this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;
      if (this.options.tap === true) {
         this.options.tap = "tap"
      }
      this.x = 0;
      this.y = 0;
      this.directionX = 0;
      this.directionY = 0;
      this._events = {};
      this._init();
      this.refresh();
      this.scrollTo(this.options.startX, this.options.startY);
      this.enable()
   }

   e.prototype = {
      version: "5.1.3", _init: function () {
         this._initEvents()
      }, destroy: function () {
         this._initEvents(true);
         this._execEvent("destroy")
      }, _transitionEnd: function (g) {
         if (g.target != this.scroller || !this.isInTransition) {
            return
         }
         this._transitionTime();
         if (!this.resetPosition(this.options.bounceTime)) {
            this.isInTransition = false;
            this._execEvent("scrollEnd")
         }
      }, _start: function (h) {
         if (b.eventType[h.type] != 1) {
            if (h.button !== 0) {
               return
            }
         }
         if (!this.enabled || (this.initiated && b.eventType[h.type] !== this.initiated)) {
            return
         }
         if (this.options.preventDefault && !b.isBadAndroid && !b.preventDefaultException(h.target, this.options.preventDefaultException)) {
            h.preventDefault()
         }
         var g = h.touches ? h.touches[0] : h, i;
         this.initiated = b.eventType[h.type];
         this.moved = false;
         this.distX = 0;
         this.distY = 0;
         this.directionX = 0;
         this.directionY = 0;
         this.directionLocked = 0;
         this._transitionTime();
         this.startTime = b.getTime();
         if (this.options.useTransition && this.isInTransition) {
            this.isInTransition = false;
            i = this.getComputedPosition();
            this._translate(c.round(i.x), c.round(i.y));
            this._execEvent("scrollEnd")
         } else {
            if (!this.options.useTransition && this.isAnimating) {
               this.isAnimating = false;
               this._execEvent("scrollEnd")
            }
         }
         this.startX = this.x;
         this.startY = this.y;
         this.absStartX = this.x;
         this.absStartY = this.y;
         this.pointX = g.pageX;
         this.pointY = g.pageY;
         this._execEvent("beforeScrollStart")
      }, _move: function (l) {
         if (!this.enabled || b.eventType[l.type] !== this.initiated) {
            return
         }
         if (this.options.preventDefault) {
            l.preventDefault()
         }
         var n = l.touches ? l.touches[0] : l, i = n.pageX - this.pointX, h = n.pageY - this.pointY, m = b.getTime(), g, o, k, j;
         this.pointX = n.pageX;
         this.pointY = n.pageY;
         this.distX += i;
         this.distY += h;
         k = c.abs(this.distX);
         j = c.abs(this.distY);
         if (m - this.endTime > 300 && (k < 10 && j < 10)) {
            return
         }
         if (!this.directionLocked && !this.options.freeScroll) {
            if (k > j + this.options.directionLockThreshold) {
               this.directionLocked = "h"
            } else {
               if (j >= k + this.options.directionLockThreshold) {
                  this.directionLocked = "v"
               } else {
                  this.directionLocked = "n"
               }
            }
         }
         if (this.directionLocked == "h") {
            if (this.options.eventPassthrough == "vertical") {
               l.preventDefault()
            } else {
               if (this.options.eventPassthrough == "horizontal") {
                  this.initiated = false;
                  return
               }
            }
            h = 0
         } else {
            if (this.directionLocked == "v") {
               if (this.options.eventPassthrough == "horizontal") {
                  l.preventDefault()
               } else {
                  if (this.options.eventPassthrough == "vertical") {
                     this.initiated = false;
                     return
                  }
               }
               i = 0
            }
         }
         i = this.hasHorizontalScroll ? i : 0;
         h = this.hasVerticalScroll ? h : 0;
         g = this.x + i;
         o = this.y + h;
         if (g > 0 || g < this.maxScrollX) {
            g = this.options.bounce ? this.x + i / 3 : g > 0 ? 0 : this.maxScrollX
         }
         if (o > 0 || o < this.maxScrollY) {
            o = this.options.bounce ? this.y + h / 3 : o > 0 ? 0 : this.maxScrollY
         }
         this.directionX = i > 0 ? -1 : i < 0 ? 1 : 0;
         this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0;
         if (!this.moved) {
            this._execEvent("scrollStart")
         }
         this.moved = true;
         this._translate(g, o);
         if (m - this.startTime > 300) {
            this.startTime = m;
            this.startX = this.x;
            this.startY = this.y
         }
      }, _end: function (l) {
         if (!this.enabled || b.eventType[l.type] !== this.initiated) {
            return
         }
         if (this.options.preventDefault && !b.preventDefaultException(l.target, this.options.preventDefaultException)) {
            l.preventDefault()
         }
         var n = l.changedTouches ? l.changedTouches[0] : l, i, h, k = b.getTime() - this.startTime, g = c.round(this.x), q = c.round(this.y), p = c.abs(g - this.startX), o = c.abs(q - this.startY), j = 0, m = "";
         this.isInTransition = 0;
         this.initiated = 0;
         this.endTime = b.getTime();
         if (this.resetPosition(this.options.bounceTime)) {
            return
         }
         this.scrollTo(g, q);
         if (!this.moved) {
            if (this.options.tap) {
               b.tap(l, this.options.tap)
            }
            if (this.options.click) {
               b.click(l)
            }
            this._execEvent("scrollCancel");
            return
         }
         if (this._events.flick && k < 200 && p < 100 && o < 100) {
            this._execEvent("flick");
            return
         }
         if (this.options.momentum && k < 300) {
            i = this.hasHorizontalScroll ? b.momentum(this.x, this.startX, k, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
               destination: g,
               duration: 0
            };
            h = this.hasVerticalScroll ? b.momentum(this.y, this.startY, k, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
               destination: q,
               duration: 0
            };
            g = i.destination;
            q = h.destination;
            j = c.max(i.duration, h.duration);
            this.isInTransition = 1
         }
         if (g != this.x || q != this.y) {
            if (g > 0 || g < this.maxScrollX || q > 0 || q < this.maxScrollY) {
               m = b.ease.quadratic
            }
            this.scrollTo(g, q, j, m);
            return
         }
         this._execEvent("scrollEnd")
      }, _resize: function () {
         var g = this;
         clearTimeout(this.resizeTimeout);
         this.resizeTimeout = setTimeout(function () {
            g.refresh()
         }, this.options.resizePolling)
      }, resetPosition: function (h) {
         var g = this.x, i = this.y;
         h = h || 0;
         if (!this.hasHorizontalScroll || this.x > 0) {
            g = 0
         } else {
            if (this.x < this.maxScrollX) {
               g = this.maxScrollX
            }
         }
         if (!this.hasVerticalScroll || this.y > 0) {
            i = 0
         } else {
            if (this.y < this.maxScrollY) {
               i = this.maxScrollY
            }
         }
         if (g == this.x && i == this.y) {
            return false
         }
         this.scrollTo(g, i, h, this.options.bounceEasing);
         return true
      }, disable: function () {
         this.enabled = false
      }, enable: function () {
         this.enabled = true
      }, refresh: function () {
         var g = this.wrapper.offsetHeight;
         this.wrapperWidth = this.wrapper.clientWidth;
         this.wrapperHeight = this.wrapper.clientHeight;
         this.scrollerWidth = this.scroller.offsetWidth;
         this.scrollerHeight = this.scroller.offsetHeight;
         this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
         this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
         this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
         this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
         if (!this.hasHorizontalScroll) {
            this.maxScrollX = 0;
            this.scrollerWidth = this.wrapperWidth
         }
         if (!this.hasVerticalScroll) {
            this.maxScrollY = 0;
            this.scrollerHeight = this.wrapperHeight
         }
         this.endTime = 0;
         this.directionX = 0;
         this.directionY = 0;
         this.wrapperOffset = b.offset(this.wrapper);
         this._execEvent("refresh");
         this.resetPosition()
      }, on: function (h, g) {
         if (!this._events[h]) {
            this._events[h] = []
         }
         this._events[h].push(g)
      }, off: function (i, h) {
         if (!this._events[i]) {
            return
         }
         var g = this._events[i].indexOf(h);
         if (g > -1) {
            this._events[i].splice(g, 1)
         }
      }, _execEvent: function (j) {
         if (!this._events[j]) {
            return
         }
         var h = 0, g = this._events[j].length;
         if (!g) {
            return
         }
         for (; h < g; h++) {
            this._events[j][h].apply(this, [].slice.call(arguments, 1))
         }
      }, scrollBy: function (g, j, h, i) {
         g = this.x + g;
         j = this.y + j;
         h = h || 0;
         this.scrollTo(g, j, h, i)
      }, scrollTo: function (g, j, h, i) {
         i = i || b.ease.circular;
         this.isInTransition = this.options.useTransition && h > 0;
         if (!h || (this.options.useTransition && i.style)) {
            this._transitionTimingFunction(i.style);
            this._transitionTime(h);
            this._translate(g, j)
         } else {
            this._animate(g, j, h, i.fn)
         }
      }, scrollToElement: function (h, i, g, l, k) {
         h = h.nodeType ? h : this.scroller.querySelector(h);
         if (!h) {
            return
         }
         var j = b.offset(h);
         j.left -= this.wrapperOffset.left;
         j.top -= this.wrapperOffset.top;
         if (g === true) {
            g = c.round(h.offsetWidth / 2 - this.wrapper.offsetWidth / 2)
         }
         if (l === true) {
            l = c.round(h.offsetHeight / 2 - this.wrapper.offsetHeight / 2)
         }
         j.left -= g || 0;
         j.top -= l || 0;
         j.left = j.left > 0 ? 0 : j.left < this.maxScrollX ? this.maxScrollX : j.left;
         j.top = j.top > 0 ? 0 : j.top < this.maxScrollY ? this.maxScrollY : j.top;
         i = i === undefined || i === null || i === "auto" ? c.max(c.abs(this.x - j.left), c.abs(this.y - j.top)) : i;
         this.scrollTo(j.left, j.top, i, k)
      }, _transitionTime: function (g) {
         g = g || 0;
         this.scrollerStyle[b.style.transitionDuration] = g + "ms";
         if (!g && b.isBadAndroid) {
            this.scrollerStyle[b.style.transitionDuration] = "0.001s"
         }
      }, _transitionTimingFunction: function (g) {
         this.scrollerStyle[b.style.transitionTimingFunction] = g
      }, _translate: function (g, h) {
         if (this.options.useTransform) {
            this.scrollerStyle[b.style.transform] = "translate(" + g + "px," + h + "px)" + this.translateZ
         } else {
            g = c.round(g);
            h = c.round(h);
            this.scrollerStyle.left = g + "px";
            this.scrollerStyle.top = h + "px"
         }
         this.x = g;
         this.y = h
      }, _initEvents: function (g) {
         var h = g ? b.removeEvent : b.addEvent, i = this.options.bindToWrapper ? this.wrapper : d;
         h(d, "orientationchange", this);
         h(d, "resize", this);
         if (this.options.click) {
            h(this.wrapper, "click", this, true)
         }
         if (!this.options.disableMouse) {
            h(this.wrapper, "mousedown", this);
            h(i, "mousemove", this);
            h(i, "mousecancel", this);
            h(i, "mouseup", this)
         }
         if (b.hasPointer && !this.options.disablePointer) {
            h(this.wrapper, b.prefixPointerEvent("pointerdown"), this);
            h(i, b.prefixPointerEvent("pointermove"), this);
            h(i, b.prefixPointerEvent("pointercancel"), this);
            h(i, b.prefixPointerEvent("pointerup"), this)
         }
         if (b.hasTouch && !this.options.disableTouch) {
            h(this.wrapper, "touchstart", this);
            h(i, "touchmove", this);
            h(i, "touchcancel", this);
            h(i, "touchend", this)
         }
         h(this.scroller, "transitionend", this);
         h(this.scroller, "webkitTransitionEnd", this);
         h(this.scroller, "oTransitionEnd", this);
         h(this.scroller, "MSTransitionEnd", this)
      }, getComputedPosition: function () {
         var h = d.getComputedStyle(this.scroller, null), g, i;
         if (this.options.useTransform) {
            h = h[b.style.transform].split(")")[0].split(", ");
            g = +(h[12] || h[4]);
            i = +(h[13] || h[5])
         } else {
            g = +h.left.replace(/[^-\d.]/g, "");
            i = +h.top.replace(/[^-\d.]/g, "")
         }
         return {x: g, y: i}
      }, _animate: function (p, o, j, g) {
         var m = this, l = this.x, k = this.y, h = b.getTime(), n = h + j;

         function i() {
            var q = b.getTime(), s, r, t;
            if (q >= n) {
               m.isAnimating = false;
               m._translate(p, o);
               if (!m.resetPosition(m.options.bounceTime)) {
                  m._execEvent("scrollEnd")
               }
               return
            }
            q = (q - h) / j;
            t = g(q);
            s = (p - l) * t + l;
            r = (o - k) * t + k;
            m._translate(s, r);
            if (m.isAnimating) {
               f(i)
            }
         }

         this.isAnimating = true;
         i()
      }, handleEvent: function (g) {
         switch (g.type) {
            case"touchstart":
            case"pointerdown":
            case"MSPointerDown":
            case"mousedown":
               this._start(g);
               break;
            case"touchmove":
            case"pointermove":
            case"MSPointerMove":
            case"mousemove":
               this._move(g);
               break;
            case"touchend":
            case"pointerup":
            case"MSPointerUp":
            case"mouseup":
            case"touchcancel":
            case"pointercancel":
            case"MSPointerCancel":
            case"mousecancel":
               this._end(g);
               break;
            case"orientationchange":
            case"resize":
               this._resize();
               break;
            case"transitionend":
            case"webkitTransitionEnd":
            case"oTransitionEnd":
            case"MSTransitionEnd":
               this._transitionEnd(g);
               break;
            case"wheel":
            case"DOMMouseScroll":
            case"mousewheel":
               this._wheel(g);
               break;
            case"keydown":
               this._key(g);
               break;
            case"click":
               if (!g._constructed) {
                  g.preventDefault();
                  g.stopPropagation()
               }
               break
         }
      }
   };
   e.utils = b;
   if (typeof module != "undefined" && module.exports) {
      module.exports = e
   } else {
      d.IScroll = e
   }
})(window, document, Math);

(function (a, b, c) {
   if (typeof module !== "undefined" && module.exports) {
      module.exports = b(a, c)
   } else {
      if (typeof define === "function" && define.amd) {
         define(b(a, c))
      } else {
         a.TagNav = b.call(a, a, c)
      }
   }
})(this, function (a, e) {
   var b = (function () {
      var d = {};
      return {
         subscribe: function (g, h) {
            if (!d[g]) {
               d[g] = {queue: []}
            }
            var f = d[g].queue.push(h) - 1;
            return (function (j, i) {
               return {
                  remove: function () {
                     delete d[j].queue[i]
                  }
               }
            })(g, f)
         }, publish: function (h, k) {
            if (!d[h] || !d[h].queue.length) {
               return
            }
            var g = d[h].queue;
            for (var j = 0, f = g.length; j < f; j++) {
               if (typeof g[j] === "function") {
                  g[j](k || {})
               }
            }
         }
      }
   })();

   function c(d, f) {
      return (this instanceof c) ? this._init(d, f) : new c(d, f)
   }

   c.prototype = {
      constructor: c, _init: function (h, i) {
         var d = this, g = $(h), f = g.find("ul").first(), j = g.find("li");
         d.el = h;
         d.opts = i || {};
         d.type = this.opts.type || "simple";
         d.curClassName = d.opts.curClassName || "weui-state-active";
         d.index = d.opts.index;
         d.iScroll = new IScroll(d.el, {
            scrollX: true,
            scrollY: false,
            click: true
         });
         if (d.index === undefined) {
            d.index = d.index || f.find("." + d.curClassName).index();
            if (d.index < 0) {
               d.index = 0
            }
         }
         switch (this.opts.type) {
            case"scrollToFirst":
               d._scrollToFirstEvent();
               break;
            case"scrollToNext":
               d._scrollToNextEvent();
               break
         }
         j.on("click", function (k) {
            d.switchTo($(this).index(), k)
         });
         d.$list = f;
         d.$items = j;
         d.switchTo(d.index)
      }, _scrollToFirstEvent: function () {
         var d = this;
         b.subscribe("select", function (g) {
            var f = d.$items.eq(g.index)[0];
            setTimeout(function () {
               d.iScroll.scrollToElement(f, 400)
            }, 180)
         })
      }, _scrollToNextEvent: function () {
         var d = this, f;
         b.subscribe("select", function (k) {
            if (f === undefined) {
               f = d.index ? 0 : 1
            }
            var j = k.index > f, l = d.$items.eq(k.index)[j ? "next" : "prev"](), m = l.offset() || d.$items.eq(k.index).offset(), i = $(d.el).offset(), h;
            if (j ? m.left + m.width > i.left + i.width : m.left < i.left) {
               h = d.$list.offset();
               var g = j ? i.width - m.left + h.left - m.width : h.left - m.left;
               setTimeout(function () {
                  d.iScroll.scrollTo(g, 0, 400)
               }, 180)
            }
            f = k.index
         })
      }, switchTo: function (f, g) {
         var d = this, h;
         h = d.$items.removeClass(d.curClassName).eq(f).addClass(d.curClassName);
         d.index = f;
         b.publish("select", {index: f})
      }, unselect: function () {
         this.index = -1;
         this.$items.removeClass(self.curClassName)
      }, getIndex: function () {
         return this.index
      }
   };
   return c
}, document);
