/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../src/assets/js/core/app.js":
/*!************************************!*\
  !*** ../src/assets/js/core/app.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swiper/bundle */ "../node_modules/swiper/swiper-bundle.esm.js");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/**
 * ------------------------------------------------------------------------
 * More Imports
 * ------------------------------------------------------------------------
 */
// Swiper

/**
 * ------------------------------------------------------------------------
 * Rahisi Functions
 * ------------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  const windowEl = window,
        html = document.html,
        body = document.body,
        pageWrapEl = document.querySelector(".page-wrap"),
        bgImgsEls = document.querySelectorAll(".bg-img"),
        svgEls = document.querySelectorAll("svg"),
        sliders = document.querySelectorAll(".js-slider"),
        photoPoppers = document.querySelectorAll(".js-photo-pop"),
        arrSum = arr => arr.reduce((a, b) => a + b, 0),
        nodeToArrayConverter = nodelist => Array.prototype.slice.call(nodelist),
        whichAnimationEvent = () => {
    let t,
        el = document.createElement("fakeelement");
    let animations = {
      animation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
      MozAnimation: "mozAnimationEnd"
    };

    for (t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  },
        getVendorPrefix = arrayOfPrefixes => {
    let tmp = document.createElement("div");
    let result = "";

    for (let i = 0; i < arrayOfPrefixes.length; ++i) {
      if (typeof tmp.style[arrayOfPrefixes[i]] != "undefined") {
        result = arrayOfPrefixes[i];
        break;
      } else {
        result = null;
      }
    }

    return result;
  },
        animationDelayPrefix = getVendorPrefix(["animationDelay", "webkitAnimationDelay", "mozAnimationDelay", "oAnimationDelay"]),
        animationDurationPrefix = getVendorPrefix(["animationDuration", "webkitAnimationDuration", "mozAnimationDuration", "oAnimationDuration"]),
        transformPrefix = getVendorPrefix(["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"]),
        svgScaling = el => {
    let svgParent = ".svg-scaler";

    if ($(el).closest(svgParent).length > 0) {
      let svgEl = el,
          svgElViewBox = svgEl.getAttribute("viewBox"),
          svgElViewBoxArray = svgElViewBox.search(",") === -1 ? svgElViewBox.split(" ") : svgElViewBox.split(","),
          svgWidth = svgElViewBoxArray[2],
          svgHeight = svgElViewBoxArray[3],
          svgRatio = 100 * svgHeight / svgWidth;
      $(svgEl).closest(svgParent).css({
        paddingBottom: svgRatio + "%"
      });
    }
  },
        doAnimations = (elements, prefix = "animate__") => {
    let animationEndEvents = whichAnimationEvent();
    elements.each(function () {
      let $this = $(this),
          animationName = `${prefix}${$this.data("animation")}`,
          animationDuration = $this.data("animation-duration"),
          animationDelay = $this.data("animation-delay"),
          animationClasses = `${prefix}animated ${animationName}`;
      $this[0].style[animationDelayPrefix] = animationDelay;
      $this[0].style[animationDurationPrefix] = animationDuration;
      $this.addClass(animationClasses).one(animationEndEvents, function () {
        $this.removeClass(animationClasses);
      });
    });
  },
        zeroStartView = num => parseInt(num) > 9 ? parseInt(num) : `0${parseInt(num)}`,
        imgToBg = el => {
    let $img = $(el).find("img"),
        imgUrl = $img.attr("src");
    $(el).css({
      backgroundImage: `url("${imgUrl}")`
    });
    $img.hide();
  },
        htmlPageAnimate = (targetElem, offsetVal) => {
    if (targetElem.length) {
      let targetElemOffsetTop = offsetVal;
      $("html, body").stop().animate({
        scrollTop: targetElemOffsetTop
      }, 1000);
    }
  };

  const app = {
    appinit: () => {
      app.bgImgs();
      app.svgScaling();
      app.slider();
      app.photoPopUp();
    },
    bgImgs: () => {
      let allBgImgsConts = [],
          bgImgsArray = nodeToArrayConverter(bgImgsEls);
      allBgImgsConts = allBgImgsConts.concat(bgImgsArray);
      allBgImgsConts.forEach(bgImgCont => {
        imgToBg(bgImgCont);
      });
    },
    svgScaling: () => {
      const svgElsArray = nodeToArrayConverter(svgEls);
      svgElsArray.forEach(svgEl => {
        svgScaling(svgEl);
      });
    },
    slider: () => {
      if (sliders.length) {
        const slidersArr = nodeToArrayConverter(sliders);
        slidersArr.forEach(slider => {
          const pagination = slider.querySelector(".swiper-pagination");
          const prevNavigation = slider.querySelector(".swiper-button-prev");
          const nextNavigation = slider.querySelector(".swiper-button-next");
          const sliderCustomOptionsAttr = slider.getAttribute("data-slider-settings");
          const sliderCustomOptions = sliderCustomOptionsAttr == null || sliderCustomOptionsAttr === "" ? {} : JSON.parse(sliderCustomOptionsAttr);
          const sliderSettings = {
            default: {
              pagination: {
                el: pagination,
                type: "bullets",
                clickable: true
              },
              navigation: {
                nextEl: nextNavigation,
                prevEl: prevNavigation
              }
            },
            custom: sliderCustomOptions,

            get combinedSettings() {
              return $.extend({}, this.default, this.custom);
            }

          };
          console.log(sliderSettings);
          const swiper = new swiper_bundle__WEBPACK_IMPORTED_MODULE_0__["default"](slider.querySelector(".swiper"), sliderSettings.combinedSettings);
        });
      }
    },
    photoPopUp: () => {
      if (photoPoppers.length) {
        const photoPoppersArray = nodeToArrayConverter(photoPoppers);
        photoPoppersArray.forEach(photoPopper => {
          $(photoPopper).magnificPopup({
            type: "image",
            closeOnContentClick: true,
            mainClass: "mfp-img-mobile",
            image: {
              verticalFit: true
            }
          });
        });
      }
    }
  };
  $(document).ready(() => {
    app.appinit();
  });
})(jQuery);

/***/ }),

/***/ "../src/assets/js/custom.js":
/*!**********************************!*\
  !*** ../src/assets/js/custom.js ***!
  \**********************************/
/***/ (() => {



/***/ }),

/***/ "../node_modules/swiper/swiper-bundle.esm.js":
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/swiper/swiper-bundle.esm.js from dll-reference library ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference library */ "dll-reference library"))(351);

/***/ }),

/***/ "../node_modules/jquery/dist/jquery.js":
/*!*********************************************************************************!*\
  !*** delegated ./node_modules/jquery/dist/jquery.js from dll-reference library ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference library */ "dll-reference library"))(563);

/***/ }),

/***/ "../node_modules/tw-elements/dist/js/index.min.js":
/*!********************************************************************************************!*\
  !*** delegated ./node_modules/tw-elements/dist/js/index.min.js from dll-reference library ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference library */ "dll-reference library"))(777);

/***/ }),

/***/ "../node_modules/magnific-popup/dist/jquery.magnific-popup.min.js":
/*!************************************************************************************************************!*\
  !*** delegated ./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js from dll-reference library ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference library */ "dll-reference library"))(802);

/***/ }),

/***/ "dll-reference library":
/*!**************************!*\
  !*** external "library" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = library;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tw_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tw-elements */ "../node_modules/tw-elements/dist/js/index.min.js");
/* harmony import */ var tw_elements__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tw_elements__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var magnific_popup_dist_jquery_magnific_popup_min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! magnific-popup/dist/jquery.magnific-popup.min */ "../node_modules/magnific-popup/dist/jquery.magnific-popup.min.js");
/* harmony import */ var magnific_popup_dist_jquery_magnific_popup_min__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(magnific_popup_dist_jquery_magnific_popup_min__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_js_core_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/js/core/app */ "../src/assets/js/core/app.js");
/* harmony import */ var _assets_js_custom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assets/js/custom */ "../src/assets/js/custom.js");
/* harmony import */ var _assets_js_custom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_js_custom__WEBPACK_IMPORTED_MODULE_4__);
// Vendor Scripts


 // Rahisi Core JS

 // Custom Scripts


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0NBR0E7O0NBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL2Fzc2V0cy9qcy9jb3JlL2FwcC5qcyIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIDM1MSBmcm9tIGRsbC1yZWZlcmVuY2UgbGlicmFyeSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIDU2MyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlicmFyeSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIDc3NyBmcm9tIGRsbC1yZWZlcmVuY2UgbGlicmFyeSIsIndlYnBhY2s6Ly8vZGVsZWdhdGVkIDgwMiBmcm9tIGRsbC1yZWZlcmVuY2UgbGlicmFyeSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwibGlicmFyeVwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTW9yZSBJbXBvcnRzXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8vIFN3aXBlclxyXG5pbXBvcnQgU3dpcGVyIGZyb20gXCJzd2lwZXIvYnVuZGxlXCI7XHJcblxyXG4vKipcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFJhaGlzaSBGdW5jdGlvbnNcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIGNvbnN0IHdpbmRvd0VsID0gd2luZG93LFxyXG4gICAgaHRtbCA9IGRvY3VtZW50Lmh0bWwsXHJcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keSxcclxuICAgIHBhZ2VXcmFwRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhZ2Utd3JhcFwiKSxcclxuICAgIGJnSW1nc0VscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmctaW1nXCIpLFxyXG4gICAgc3ZnRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKSxcclxuICAgIHNsaWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLXNsaWRlclwiKSxcclxuICAgIHBob3RvUG9wcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtcGhvdG8tcG9wXCIpLFxyXG4gICAgYXJyU3VtID0gKGFycikgPT4gYXJyLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApLFxyXG4gICAgbm9kZVRvQXJyYXlDb252ZXJ0ZXIgPSAobm9kZWxpc3QpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVsaXN0KSxcclxuICAgIHdoaWNoQW5pbWF0aW9uRXZlbnQgPSAoKSA9PiB7XHJcbiAgICAgIGxldCB0LFxyXG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpO1xyXG5cclxuICAgICAgbGV0IGFuaW1hdGlvbnMgPSB7XHJcbiAgICAgICAgYW5pbWF0aW9uOiBcImFuaW1hdGlvbmVuZFwiLFxyXG4gICAgICAgIFdlYmtpdEFuaW1hdGlvbjogXCJ3ZWJraXRBbmltYXRpb25FbmRcIixcclxuICAgICAgICBNb3pBbmltYXRpb246IFwibW96QW5pbWF0aW9uRW5kXCIsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKHQgaW4gYW5pbWF0aW9ucykge1xyXG4gICAgICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uc1t0XTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRWZW5kb3JQcmVmaXggPSAoYXJyYXlPZlByZWZpeGVzKSA9PiB7XHJcbiAgICAgIGxldCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlPZlByZWZpeGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0bXAuc3R5bGVbYXJyYXlPZlByZWZpeGVzW2ldXSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSBhcnJheU9mUHJlZml4ZXNbaV07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9LFxyXG4gICAgYW5pbWF0aW9uRGVsYXlQcmVmaXggPSBnZXRWZW5kb3JQcmVmaXgoW1xyXG4gICAgICBcImFuaW1hdGlvbkRlbGF5XCIsXHJcbiAgICAgIFwid2Via2l0QW5pbWF0aW9uRGVsYXlcIixcclxuICAgICAgXCJtb3pBbmltYXRpb25EZWxheVwiLFxyXG4gICAgICBcIm9BbmltYXRpb25EZWxheVwiLFxyXG4gICAgXSksXHJcbiAgICBhbmltYXRpb25EdXJhdGlvblByZWZpeCA9IGdldFZlbmRvclByZWZpeChbXHJcbiAgICAgIFwiYW5pbWF0aW9uRHVyYXRpb25cIixcclxuICAgICAgXCJ3ZWJraXRBbmltYXRpb25EdXJhdGlvblwiLFxyXG4gICAgICBcIm1vekFuaW1hdGlvbkR1cmF0aW9uXCIsXHJcbiAgICAgIFwib0FuaW1hdGlvbkR1cmF0aW9uXCIsXHJcbiAgICBdKSxcclxuICAgIHRyYW5zZm9ybVByZWZpeCA9IGdldFZlbmRvclByZWZpeChbXHJcbiAgICAgIFwidHJhbnNmb3JtXCIsXHJcbiAgICAgIFwibXNUcmFuc2Zvcm1cIixcclxuICAgICAgXCJNb3pUcmFuc2Zvcm1cIixcclxuICAgICAgXCJXZWJraXRUcmFuc2Zvcm1cIixcclxuICAgICAgXCJPVHJhbnNmb3JtXCIsXHJcbiAgICBdKSxcclxuICAgIHN2Z1NjYWxpbmcgPSAoZWwpID0+IHtcclxuICAgICAgbGV0IHN2Z1BhcmVudCA9IFwiLnN2Zy1zY2FsZXJcIjtcclxuXHJcbiAgICAgIGlmICgkKGVsKS5jbG9zZXN0KHN2Z1BhcmVudCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxldCBzdmdFbCA9IGVsLFxyXG4gICAgICAgICAgc3ZnRWxWaWV3Qm94ID0gc3ZnRWwuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKSxcclxuICAgICAgICAgIHN2Z0VsVmlld0JveEFycmF5ID1cclxuICAgICAgICAgICAgc3ZnRWxWaWV3Qm94LnNlYXJjaChcIixcIikgPT09IC0xXHJcbiAgICAgICAgICAgICAgPyBzdmdFbFZpZXdCb3guc3BsaXQoXCIgXCIpXHJcbiAgICAgICAgICAgICAgOiBzdmdFbFZpZXdCb3guc3BsaXQoXCIsXCIpLFxyXG4gICAgICAgICAgc3ZnV2lkdGggPSBzdmdFbFZpZXdCb3hBcnJheVsyXSxcclxuICAgICAgICAgIHN2Z0hlaWdodCA9IHN2Z0VsVmlld0JveEFycmF5WzNdLFxyXG4gICAgICAgICAgc3ZnUmF0aW8gPSAoMTAwICogc3ZnSGVpZ2h0KSAvIHN2Z1dpZHRoO1xyXG5cclxuICAgICAgICAkKHN2Z0VsKVxyXG4gICAgICAgICAgLmNsb3Nlc3Qoc3ZnUGFyZW50KVxyXG4gICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206IHN2Z1JhdGlvICsgXCIlXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRvQW5pbWF0aW9ucyA9IChlbGVtZW50cywgcHJlZml4ID0gXCJhbmltYXRlX19cIikgPT4ge1xyXG4gICAgICBsZXQgYW5pbWF0aW9uRW5kRXZlbnRzID0gd2hpY2hBbmltYXRpb25FdmVudCgpO1xyXG4gICAgICBlbGVtZW50cy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IGAke3ByZWZpeH0keyR0aGlzLmRhdGEoXCJhbmltYXRpb25cIil9YCxcclxuICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uID0gJHRoaXMuZGF0YShcImFuaW1hdGlvbi1kdXJhdGlvblwiKSxcclxuICAgICAgICAgIGFuaW1hdGlvbkRlbGF5ID0gJHRoaXMuZGF0YShcImFuaW1hdGlvbi1kZWxheVwiKSxcclxuICAgICAgICAgIGFuaW1hdGlvbkNsYXNzZXMgPSBgJHtwcmVmaXh9YW5pbWF0ZWQgJHthbmltYXRpb25OYW1lfWA7XHJcblxyXG4gICAgICAgICR0aGlzWzBdLnN0eWxlW2FuaW1hdGlvbkRlbGF5UHJlZml4XSA9IGFuaW1hdGlvbkRlbGF5O1xyXG4gICAgICAgICR0aGlzWzBdLnN0eWxlW2FuaW1hdGlvbkR1cmF0aW9uUHJlZml4XSA9IGFuaW1hdGlvbkR1cmF0aW9uO1xyXG5cclxuICAgICAgICAkdGhpcy5hZGRDbGFzcyhhbmltYXRpb25DbGFzc2VzKS5vbmUoYW5pbWF0aW9uRW5kRXZlbnRzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkdGhpcy5yZW1vdmVDbGFzcyhhbmltYXRpb25DbGFzc2VzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgemVyb1N0YXJ0VmlldyA9IChudW0pID0+XHJcbiAgICAgIHBhcnNlSW50KG51bSkgPiA5ID8gcGFyc2VJbnQobnVtKSA6IGAwJHtwYXJzZUludChudW0pfWAsXHJcbiAgICBpbWdUb0JnID0gKGVsKSA9PiB7XHJcbiAgICAgIGxldCAkaW1nID0gJChlbCkuZmluZChcImltZ1wiKSxcclxuICAgICAgICBpbWdVcmwgPSAkaW1nLmF0dHIoXCJzcmNcIik7XHJcblxyXG4gICAgICAkKGVsKS5jc3Moe1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybChcIiR7aW1nVXJsfVwiKWAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJGltZy5oaWRlKCk7XHJcbiAgICB9LFxyXG4gICAgaHRtbFBhZ2VBbmltYXRlID0gKHRhcmdldEVsZW0sIG9mZnNldFZhbCkgPT4ge1xyXG4gICAgICBpZiAodGFyZ2V0RWxlbS5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0RWxlbU9mZnNldFRvcCA9IG9mZnNldFZhbDtcclxuXHJcbiAgICAgICAgJChcImh0bWwsIGJvZHlcIilcclxuICAgICAgICAgIC5zdG9wKClcclxuICAgICAgICAgIC5hbmltYXRlKHsgc2Nyb2xsVG9wOiB0YXJnZXRFbGVtT2Zmc2V0VG9wIH0sIDEwMDApO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICBjb25zdCBhcHAgPSB7XHJcbiAgICBhcHBpbml0OiAoKSA9PiB7XHJcbiAgICAgIGFwcC5iZ0ltZ3MoKTtcclxuICAgICAgYXBwLnN2Z1NjYWxpbmcoKTtcclxuICAgICAgYXBwLnNsaWRlcigpO1xyXG4gICAgICBhcHAucGhvdG9Qb3BVcCgpO1xyXG4gICAgfSxcclxuICAgIGJnSW1nczogKCkgPT4ge1xyXG4gICAgICBsZXQgYWxsQmdJbWdzQ29udHMgPSBbXSxcclxuICAgICAgICBiZ0ltZ3NBcnJheSA9IG5vZGVUb0FycmF5Q29udmVydGVyKGJnSW1nc0Vscyk7XHJcblxyXG4gICAgICBhbGxCZ0ltZ3NDb250cyA9IGFsbEJnSW1nc0NvbnRzLmNvbmNhdChiZ0ltZ3NBcnJheSk7XHJcblxyXG4gICAgICBhbGxCZ0ltZ3NDb250cy5mb3JFYWNoKChiZ0ltZ0NvbnQpID0+IHtcclxuICAgICAgICBpbWdUb0JnKGJnSW1nQ29udCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHN2Z1NjYWxpbmc6ICgpID0+IHtcclxuICAgICAgY29uc3Qgc3ZnRWxzQXJyYXkgPSBub2RlVG9BcnJheUNvbnZlcnRlcihzdmdFbHMpO1xyXG5cclxuICAgICAgc3ZnRWxzQXJyYXkuZm9yRWFjaCgoc3ZnRWwpID0+IHtcclxuICAgICAgICBzdmdTY2FsaW5nKHN2Z0VsKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2xpZGVyOiAoKSA9PiB7XHJcbiAgICAgIGlmIChzbGlkZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlcnNBcnIgPSBub2RlVG9BcnJheUNvbnZlcnRlcihzbGlkZXJzKTtcclxuXHJcbiAgICAgICAgc2xpZGVyc0Fyci5mb3JFYWNoKChzbGlkZXIpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBzbGlkZXIucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItcGFnaW5hdGlvblwiKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBwcmV2TmF2aWdhdGlvbiA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1idXR0b24tcHJldlwiKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBuZXh0TmF2aWdhdGlvbiA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1idXR0b24tbmV4dFwiKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBzbGlkZXJDdXN0b21PcHRpb25zQXR0ciA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIFwiZGF0YS1zbGlkZXItc2V0dGluZ3NcIlxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBzbGlkZXJDdXN0b21PcHRpb25zID1cclxuICAgICAgICAgICAgc2xpZGVyQ3VzdG9tT3B0aW9uc0F0dHIgPT0gbnVsbCB8fCBzbGlkZXJDdXN0b21PcHRpb25zQXR0ciA9PT0gXCJcIlxyXG4gICAgICAgICAgICAgID8ge31cclxuICAgICAgICAgICAgICA6IEpTT04ucGFyc2Uoc2xpZGVyQ3VzdG9tT3B0aW9uc0F0dHIpO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHNsaWRlclNldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImJ1bGxldHNcIixcclxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogbmV4dE5hdmlnYXRpb24sXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IHByZXZOYXZpZ2F0aW9uLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN1c3RvbTogc2xpZGVyQ3VzdG9tT3B0aW9ucyxcclxuICAgICAgICAgICAgZ2V0IGNvbWJpbmVkU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHQsIHRoaXMuY3VzdG9tKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29uc29sZS5sb2coc2xpZGVyU2V0dGluZ3MpO1xyXG4gICAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihcclxuICAgICAgICAgICAgc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyXCIpLFxyXG4gICAgICAgICAgICBzbGlkZXJTZXR0aW5ncy5jb21iaW5lZFNldHRpbmdzXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGhvdG9Qb3BVcDogKCkgPT4ge1xyXG4gICAgICBpZiAocGhvdG9Qb3BwZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHBob3RvUG9wcGVyc0FycmF5ID0gbm9kZVRvQXJyYXlDb252ZXJ0ZXIocGhvdG9Qb3BwZXJzKTtcclxuXHJcbiAgICAgICAgcGhvdG9Qb3BwZXJzQXJyYXkuZm9yRWFjaCgocGhvdG9Qb3BwZXIpID0+IHtcclxuICAgICAgICAgICQocGhvdG9Qb3BwZXIpLm1hZ25pZmljUG9wdXAoe1xyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlXCIsXHJcbiAgICAgICAgICAgIGNsb3NlT25Db250ZW50Q2xpY2s6IHRydWUsXHJcbiAgICAgICAgICAgIG1haW5DbGFzczogXCJtZnAtaW1nLW1vYmlsZVwiLFxyXG4gICAgICAgICAgICBpbWFnZToge1xyXG4gICAgICAgICAgICAgIHZlcnRpY2FsRml0OiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG4gICAgYXBwLmFwcGluaXQoKTtcclxuICB9KTtcclxufSkoalF1ZXJ5KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgZGxsLXJlZmVyZW5jZSBsaWJyYXJ5ICovIFwiZGxsLXJlZmVyZW5jZSBsaWJyYXJ5XCIpKSgzNTEpOyIsIm1vZHVsZS5leHBvcnRzID0gKF9fd2VicGFja19yZXF1aXJlX18oLyohIGRsbC1yZWZlcmVuY2UgbGlicmFyeSAqLyBcImRsbC1yZWZlcmVuY2UgbGlicmFyeVwiKSkoNTYzKTsiLCJtb2R1bGUuZXhwb3J0cyA9IChfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBkbGwtcmVmZXJlbmNlIGxpYnJhcnkgKi8gXCJkbGwtcmVmZXJlbmNlIGxpYnJhcnlcIikpKDc3Nyk7IiwibW9kdWxlLmV4cG9ydHMgPSAoX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgZGxsLXJlZmVyZW5jZSBsaWJyYXJ5ICovIFwiZGxsLXJlZmVyZW5jZSBsaWJyYXJ5XCIpKSg4MDIpOyIsIm1vZHVsZS5leHBvcnRzID0gbGlicmFyeTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gVmVuZG9yIFNjcmlwdHNcclxuaW1wb3J0IFwianF1ZXJ5XCI7XHJcbmltcG9ydCBcInR3LWVsZW1lbnRzXCI7XHJcbmltcG9ydCBcIm1hZ25pZmljLXBvcHVwL2Rpc3QvanF1ZXJ5Lm1hZ25pZmljLXBvcHVwLm1pblwiO1xyXG5cclxuLy8gUmFoaXNpIENvcmUgSlNcclxuaW1wb3J0IFwiLi9hc3NldHMvanMvY29yZS9hcHBcIjtcclxuXHJcbi8vIEN1c3RvbSBTY3JpcHRzXHJcbmltcG9ydCBcIi4vYXNzZXRzL2pzL2N1c3RvbVwiO1xyXG4iXSwibmFtZXMiOlsiU3dpcGVyIiwiJCIsIndpbmRvd0VsIiwid2luZG93IiwiaHRtbCIsImRvY3VtZW50IiwiYm9keSIsInBhZ2VXcmFwRWwiLCJxdWVyeVNlbGVjdG9yIiwiYmdJbWdzRWxzIiwicXVlcnlTZWxlY3RvckFsbCIsInN2Z0VscyIsInNsaWRlcnMiLCJwaG90b1BvcHBlcnMiLCJhcnJTdW0iLCJhcnIiLCJyZWR1Y2UiLCJhIiwiYiIsIm5vZGVUb0FycmF5Q29udmVydGVyIiwibm9kZWxpc3QiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsIndoaWNoQW5pbWF0aW9uRXZlbnQiLCJ0IiwiZWwiLCJjcmVhdGVFbGVtZW50IiwiYW5pbWF0aW9ucyIsImFuaW1hdGlvbiIsIldlYmtpdEFuaW1hdGlvbiIsIk1vekFuaW1hdGlvbiIsInN0eWxlIiwidW5kZWZpbmVkIiwiZ2V0VmVuZG9yUHJlZml4IiwiYXJyYXlPZlByZWZpeGVzIiwidG1wIiwicmVzdWx0IiwiaSIsImxlbmd0aCIsImFuaW1hdGlvbkRlbGF5UHJlZml4IiwiYW5pbWF0aW9uRHVyYXRpb25QcmVmaXgiLCJ0cmFuc2Zvcm1QcmVmaXgiLCJzdmdTY2FsaW5nIiwic3ZnUGFyZW50IiwiY2xvc2VzdCIsInN2Z0VsIiwic3ZnRWxWaWV3Qm94IiwiZ2V0QXR0cmlidXRlIiwic3ZnRWxWaWV3Qm94QXJyYXkiLCJzZWFyY2giLCJzcGxpdCIsInN2Z1dpZHRoIiwic3ZnSGVpZ2h0Iiwic3ZnUmF0aW8iLCJjc3MiLCJwYWRkaW5nQm90dG9tIiwiZG9BbmltYXRpb25zIiwiZWxlbWVudHMiLCJwcmVmaXgiLCJhbmltYXRpb25FbmRFdmVudHMiLCJlYWNoIiwiJHRoaXMiLCJhbmltYXRpb25OYW1lIiwiZGF0YSIsImFuaW1hdGlvbkR1cmF0aW9uIiwiYW5pbWF0aW9uRGVsYXkiLCJhbmltYXRpb25DbGFzc2VzIiwiYWRkQ2xhc3MiLCJvbmUiLCJyZW1vdmVDbGFzcyIsInplcm9TdGFydFZpZXciLCJudW0iLCJwYXJzZUludCIsImltZ1RvQmciLCIkaW1nIiwiZmluZCIsImltZ1VybCIsImF0dHIiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJoaWRlIiwiaHRtbFBhZ2VBbmltYXRlIiwidGFyZ2V0RWxlbSIsIm9mZnNldFZhbCIsInRhcmdldEVsZW1PZmZzZXRUb3AiLCJzdG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImFwcCIsImFwcGluaXQiLCJiZ0ltZ3MiLCJzbGlkZXIiLCJwaG90b1BvcFVwIiwiYWxsQmdJbWdzQ29udHMiLCJiZ0ltZ3NBcnJheSIsImNvbmNhdCIsImZvckVhY2giLCJiZ0ltZ0NvbnQiLCJzdmdFbHNBcnJheSIsInNsaWRlcnNBcnIiLCJwYWdpbmF0aW9uIiwicHJldk5hdmlnYXRpb24iLCJuZXh0TmF2aWdhdGlvbiIsInNsaWRlckN1c3RvbU9wdGlvbnNBdHRyIiwic2xpZGVyQ3VzdG9tT3B0aW9ucyIsIkpTT04iLCJwYXJzZSIsInNsaWRlclNldHRpbmdzIiwiZGVmYXVsdCIsInR5cGUiLCJjbGlja2FibGUiLCJuYXZpZ2F0aW9uIiwibmV4dEVsIiwicHJldkVsIiwiY3VzdG9tIiwiY29tYmluZWRTZXR0aW5ncyIsImV4dGVuZCIsImNvbnNvbGUiLCJsb2ciLCJzd2lwZXIiLCJwaG90b1BvcHBlcnNBcnJheSIsInBob3RvUG9wcGVyIiwibWFnbmlmaWNQb3B1cCIsImNsb3NlT25Db250ZW50Q2xpY2siLCJtYWluQ2xhc3MiLCJpbWFnZSIsInZlcnRpY2FsRml0IiwicmVhZHkiLCJqUXVlcnkiXSwic291cmNlUm9vdCI6IiJ9