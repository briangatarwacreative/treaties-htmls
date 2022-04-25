/**
 * ------------------------------------------------------------------------
 * More Imports
 * ------------------------------------------------------------------------
 */

// Swiper
import Swiper from "swiper/bundle";

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
    arrSum = (arr) => arr.reduce((a, b) => a + b, 0),
    nodeToArrayConverter = (nodelist) => Array.prototype.slice.call(nodelist),
    whichAnimationEvent = () => {
      let t,
        el = document.createElement("fakeelement");

      let animations = {
        animation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "mozAnimationEnd",
      };

      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    },
    getVendorPrefix = (arrayOfPrefixes) => {
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
    animationDelayPrefix = getVendorPrefix([
      "animationDelay",
      "webkitAnimationDelay",
      "mozAnimationDelay",
      "oAnimationDelay",
    ]),
    animationDurationPrefix = getVendorPrefix([
      "animationDuration",
      "webkitAnimationDuration",
      "mozAnimationDuration",
      "oAnimationDuration",
    ]),
    transformPrefix = getVendorPrefix([
      "transform",
      "msTransform",
      "MozTransform",
      "WebkitTransform",
      "OTransform",
    ]),
    svgScaling = (el) => {
      let svgParent = ".svg-scaler";

      if ($(el).closest(svgParent).length > 0) {
        let svgEl = el,
          svgElViewBox = svgEl.getAttribute("viewBox"),
          svgElViewBoxArray =
            svgElViewBox.search(",") === -1
              ? svgElViewBox.split(" ")
              : svgElViewBox.split(","),
          svgWidth = svgElViewBoxArray[2],
          svgHeight = svgElViewBoxArray[3],
          svgRatio = (100 * svgHeight) / svgWidth;

        $(svgEl)
          .closest(svgParent)
          .css({
            paddingBottom: svgRatio + "%",
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
    zeroStartView = (num) =>
      parseInt(num) > 9 ? parseInt(num) : `0${parseInt(num)}`,
    imgToBg = (el) => {
      let $img = $(el).find("img"),
        imgUrl = $img.attr("src");

      $(el).css({
        backgroundImage: `url("${imgUrl}")`,
      });

      $img.hide();
    },
    htmlPageAnimate = (targetElem, offsetVal) => {
      if (targetElem.length) {
        let targetElemOffsetTop = offsetVal;

        $("html, body")
          .stop()
          .animate({ scrollTop: targetElemOffsetTop }, 1000);
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

      allBgImgsConts.forEach((bgImgCont) => {
        imgToBg(bgImgCont);
      });
    },
    svgScaling: () => {
      const svgElsArray = nodeToArrayConverter(svgEls);

      svgElsArray.forEach((svgEl) => {
        svgScaling(svgEl);
      });
    },
    slider: () => {
      if (sliders.length) {
        const slidersArr = nodeToArrayConverter(sliders);

        slidersArr.forEach((slider) => {
          const pagination = slider.querySelector(".swiper-pagination");

          const prevNavigation = slider.querySelector(".swiper-button-prev");

          const nextNavigation = slider.querySelector(".swiper-button-next");

          const sliderCustomOptionsAttr = slider.getAttribute(
            "data-slider-settings"
          );

          const sliderCustomOptions =
            sliderCustomOptionsAttr == null || sliderCustomOptionsAttr === ""
              ? {}
              : JSON.parse(sliderCustomOptionsAttr);

          const sliderSettings = {
            default: {
              pagination: {
                el: pagination,
                type: "bullets",
                clickable: true,
              },
              navigation: {
                nextEl: nextNavigation,
                prevEl: prevNavigation,
              },
            },
            custom: sliderCustomOptions,
            get combinedSettings() {
              return $.extend({}, this.default, this.custom);
            },
          };

          console.log(sliderSettings);
          const swiper = new Swiper(
            slider.querySelector(".swiper"),
            sliderSettings.combinedSettings
          );
        });
      }
    },
    photoPopUp: () => {
      if (photoPoppers.length) {
        const photoPoppersArray = nodeToArrayConverter(photoPoppers);

        photoPoppersArray.forEach((photoPopper) => {
          $(photoPopper).magnificPopup({
            type: "image",
            closeOnContentClick: true,
            mainClass: "mfp-img-mobile",
            image: {
              verticalFit: true,
            },
          });
        });
      }
    },
  };

  $(document).ready(() => {
    app.appinit();
  });
})(jQuery);
