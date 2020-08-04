$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../icons/carousel/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/carousel/right.png"></button>',
    responsive: [
      {
        breakpoint: 545,
        settings: {
          // dots: true,
          infinite: true,
          arrows: false,
          adaptiveHeight: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  // переключатель для картинок
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // modal
  // при клике кнопки с дата атрибутом появляется медленно окно и фон
  $("[data-modal=consultwindow]").on("click", function () {
    $(".overlay, #consultwindow").fadeIn("slow");
  });

  // закрываем окна
  $(".modal__close").on("click", function () {
    $(".overlay, #consultwindow, #orderwindow, #thankswindow ").fadeOut("slow");
  });
  // вызов окна заказа
  // $(".button_mini").on("click", function () {
  //   $(".overlay, #orderwindow").fadeIn("slow");
  // });

  // выбираем кнопку
  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#orderwindow .modal__descr").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #orderwindow").fadeIn("slow");
    });
  });

  // validate

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите минимум {0} символа"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой электронный адрес",
          email: "Неправильно введен адрес",
        },
      },
    });
  }

  validateForms("#orderwindow form");
  validateForms("#consultation-form");
  validateForms("#consultwindow form");

  // mask for phone
  //  to do скачать файл jquery.maskedinput.min.js
  // вставитть скрипт в index

  $("input[name=phone]").mask("(999) 999-99-99");

  // send mail

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultwindow, #orderwindow").fadeOut();
      $(".overlay, #thankswindow").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  // Scroll page up

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  // плавный скролл
  // используем атрибут ссылки начинающий с решетки
  //  срабатывает при клике на ссылку

  $("a[href^=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();

  //при изменении размера экрана меняется анимация

  $(function () {
    const widthWin = $("body").innerWidth();
    //console.log(widthWin);
    if (widthWin < 768) {
      $(".feed__info").removeClass("fadeInUp").addClass("fadeInRight");
    }
  });
});

// $(document).ready(function () {
//     $('.carousel__inner').slick({
//       speed:1200,
//     //   adaptiveHeight: true,
//       prevArrow:  '<button type="button" class="slick-prev"><img src="../icons/carousel/left.png"></button>',
//       nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/right.png"></button>',
//       responsive: [
//         {
//             breakpoint: 768,
//             settings: {
//                 dots: true,
//                 arrows: false,
//                 fade: true
//             }
//         }
//       ]
//     });
// });
