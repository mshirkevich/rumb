"use strict";

document.addEventListener("DOMContentLoaded", function () {
  $(".hero__slider").slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
    slidesToShow: 1,
    arrows: false
  });
  $(".open-popup").magnificPopup({
    type: "inline",
    showCloseBtn: false
  });
  $(".popup__close").on("click", function () {
    $.magnificPopup.close();
  });
  $(".thanks__btn").on("click", function () {
    $.magnificPopup.close();
  });
  function closeMenu() {
    $(".menu__wrapper").fadeOut();
    $(".menu__list").css("visibility", "hidden").css("transform", "translateX(100%)");
    $("body").css("overflow", "auto");
  }
  $(".menu__burger").click(function (event) {
    event.preventDefault();
    $(".menu__wrapper").fadeIn();
    $(".menu__list").css("visibility", "visible").css("transform", "translateX(0)");
    $("body").css("overflow", "hidden");
  });
  $(".menu__close").click(function () {
    closeMenu();
  });
  if (window.innerWidth < 1320) {
    $(document).mouseup(function (e) {
      var container = $(".menu__list");
      if (container.has(e.target).length === 0) {
        closeMenu();
      }
    });
  }

  // const anchors = document.querySelectorAll('.anchor-link[href*="#"]');
  // for (let anchor of anchors) {
  //   anchor.addEventListener("click", function (e) {
  //     e.preventDefault();

  //     const blockID = anchor.getAttribute("href").substr(1);

  //     document.getElementById(blockID).scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });

  //   });
  // }

  var $page = $("html, body");
  $('.anchor-link[href*="#"]').click(function () {
    $page.animate({
      scrollTop: $($.attr(this, "href")).offset().top - 50
    }, 400);
    if (window.innerWidth < 1320) {
      closeMenu();
    }
    return false;
  });
  var accordionItems = document.querySelectorAll(".accordion__item");
  accordionItems.forEach(function (item) {
    var accordionItemHeader = item.querySelector(".accordion__item_header");
    var accordionItemContent = item.querySelector(".accordion__item_content");
    accordionItemHeader.addEventListener("click", function () {
      accordionItemHeader.classList.toggle("is-expanded");
      accordionItemContent.classList.toggle("is-collapsed");
      accordionItemContent.classList.toggle("animateIn");
    });
  });
  var tabs = document.querySelector(".tabs");
  var tabItem = document.querySelectorAll(".tabs__header_item");
  tabItem.forEach(function (item) {
    item.addEventListener("click", function () {
      var currentActive = tabs.querySelector(".tabs__header_item.is-active");
      var currentContentActive = tabs.querySelector(".tabs__content.is-active");
      currentActive.classList.remove("is-active");
      currentContentActive.classList.remove("is-active");
      item.classList.add("is-active");
      tabs.querySelector("#".concat(item.dataset.type)).classList.add("is-active", "animateOut");
    });
  });
  var customSelect = document.querySelector(".js-choice");
  var choices = new Choices(customSelect, {
    searchEnabled: false,
    position: "bottom"
  });
  var contactCity = document.querySelector(".contactCity");
  var contactPhone = document.querySelector(".contactPhone");
  choices.passedElement.element.addEventListener("change", function (event) {
    var choice = event.detail.value;
    var data = contactsArray.find(function (item) {
      return item.value === choice;
    });
    console.log(data);
    contactCity.textContent = data.city;
    contactPhone.textContent = data.phone;
    contactPhone.setAttribute("href", "tel:".concat(data.phone));
  });
  var services = document.querySelectorAll(".service-item");
  services.forEach(function (item) {
    var serviceButtons = item.querySelectorAll(".service-item__list_btn");
    var serviceImage = item.querySelector(".service-item__image img");
    serviceButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.dataset.target;
        var targetImg = servicesArray.find(function (item) {
          return item.name === target;
        });
        serviceImage.setAttribute("src", "./images/services/".concat(targetImg.url, ".jpg"));
      });
    });
  });
  var forms = document.querySelectorAll(".contact-form__wrapper");
  forms.forEach(function (form) {
    var phoneInput = form.querySelector("input[type='tel']");
    var im = new Inputmask("+375 (99) 999-99-99");
    im.mask(phoneInput);
  });
  var submitForm = document.querySelector("#form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var submitFormName = submitForm.querySelector("#name");
    var submitFormPhone = submitForm.querySelector("#phone");
    var valid = false;
    if (submitFormName.value.length > 0) {
      submitFormName.classList.add("valid");
      submitFormName.classList.remove("invalid");
      valid = true;
    } else {
      submitFormName.classList.remove("valid");
      submitFormName.classList.add("invalid");
    }
    var phone = submitFormPhone.inputmask.unmaskedvalue();
    if (Number(phone) && phone.length === 9) {
      valid = valid ? true : false;
      submitFormPhone.classList.add("valid");
      submitFormPhone.classList.remove("invalid");
    } else {
      submitFormPhone.classList.remove("valid");
      submitFormPhone.classList.add("invalid");
      valid = false;
    }
    if (valid) {
      document.querySelector(".process__form .contact-form").style.display = "none";
      document.querySelector(".process__form_reply").style.display = "block";
    }
  });
  var submitFormPopup = document.querySelector("#popup-form");
  submitFormPopup.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var submitFormName = submitFormPopup.querySelector("#popup-name");
    var submitFormPhone = submitFormPopup.querySelector("#popup-phone");
    var valid = false;
    if (submitFormName.value.length > 0) {
      submitFormName.classList.add("valid");
      submitFormName.classList.remove("invalid");
      valid = true;
    } else {
      submitFormName.classList.remove("valid");
      submitFormName.classList.add("invalid");
    }
    var phone = submitFormPhone.inputmask.unmaskedvalue();
    if (Number(phone) && phone.length === 9) {
      valid = valid ? true : false;
      submitFormPhone.classList.add("valid");
      submitFormPhone.classList.remove("invalid");
    } else {
      submitFormPhone.classList.remove("valid");
      submitFormPhone.classList.add("invalid");
      valid = false;
    }
    if (valid) {
      $.magnificPopup.close();
      $.magnificPopup.open({
        items: {
          src: "#thanks"
        }
      }, 0);
      submitFormPopup.reset();
      submitFormName.classList.remove("valid");
      submitFormName.classList.remove("invalid");
      submitFormPhone.classList.remove("valid");
      submitFormPhone.classList.remove("invalid");
    }
  });
});
var contactsArray = [{
  value: "minsk",
  city: "Минск",
  phone: "8О445677464"
}, {
  value: "brest",
  city: "Брест",
  phone: "80445677464"
}, {
  value: "pinsk",
  city: "Пинск",
  phone: "80297791317"
}, {
  value: "vitebsk",
  city: "Витебск",
  phone: "80445677464"
}, {
  value: "grodno",
  city: "Гродно",
  phone: "80333622226"
}, {
  value: "bobrujsk",
  city: "Бобруйск",
  phone: "80292474393"
}, {
  value: "lida",
  city: "Лида",
  phone: "80295882266"
}, {
  value: "gomel",
  city: "Гомель",
  phone: "80445677464"
}, {
  value: "molodechno",
  city: "Молодечно",
  phone: "80445677464"
}, {
  value: "baranovichi",
  city: "Барановичи",
  phone: "80445677464"
}, {
  value: "polock",
  city: "Полоцк",
  phone: "80445677464"
}, {
  value: "mogilev",
  city: "Могилёв",
  phone: "80445677464"
}, {
  value: "mozyr",
  city: "Мозырь",
  phone: "80445677464"
}];
var servicesArray = [{
  name: "magazines",
  url: "magazines"
}, {
  name: "books",
  url: "books"
}, {
  name: "newspapers",
  url: "newspapers"
}, {
  name: "archives",
  url: "archives"
}, {
  name: "cardboard",
  url: "cardboard"
}, {
  name: "slick1",
  url: "slick1"
}, {
  name: "slick2",
  url: "slick2"
}, {
  name: "slick3",
  url: "slick3"
}, {
  name: "boxes",
  url: "boxes"
}, {
  name: "pipes",
  url: "pipes"
}, {
  name: "buckets",
  url: "buckets"
}, {
  name: "equipment",
  url: "equipment"
}, {
  name: "frames",
  url: "frames"
}, {
  name: "documents",
  url: "documents"
}, {
  name: "cards",
  url: "cards"
}, {
  name: "wares",
  url: "wares"
}, {
  name: "press",
  url: "press"
}, {
  name: "containers",
  url: "containers"
}];