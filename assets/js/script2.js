function animasiIntro() {
  $("#text span").velocity("transition.slideLeftIn", {
    stagger: 150,
    complete: function () {
      animasiButtonStart();
    },
  });
}

function animasiButtonStart() {
  $("#start")
    .velocity("transition.bounceUpIn")
    .mouseenter(function () {
      $(this).velocity({ width: 125 });
    })
    .mouseleave(function () {
      $(this).velocity({ width: 100 });
    });
}

function animasiButtonStartOut() {
  $("#start").attr("disabled", true).css({ color: "black" }); //fungsi disabled true sebuah button tidak akan bisa di klik lagi
  $("#start").velocity("transition.whirlOut", {
    stagger: 100,
    complete: function () {
      $("#text").velocity(
        { "font-size": "40px", top: "95%" },
        {
          complete: function () {
            callMenu();
            $("#menu ul li a[href='menu1']").trigger("click");
            $("#start").attr("disabled", false).css({ color: "black" });
          },
        }
      );
    },
  });
}

function callMenu() {
  $("#menu ul li").velocity("transition.slideLeftIn", {
    stagger: 150,
  });

  $("#menu ul li a")
    .off()
    .click(function (event) {
      //keitka fungsi ini di klik dia akan off terlebih dahulu kemudian diizinkan kembali sehingga dapat menjalankan fungis didalamnya
      event.preventDefault(); //memberhentikan default dari tag a
      $(this).parent("li").addClass("active");
      $(this).parent("li").siblings().removeClass("active");

      var hrefString = $(this).attr("href");

      if (hrefString == "back_intro") {
        back_intro();
      } else {
        if (!$("#" + hrefString).is(":visible")) {
          $(".container-content").fadeOut(1000); //ketika container content sedang berjalan dan ketika sudah 1000ms maka akan dijalankan

          setTimeout(function () {
            $("#" + hrefString).show();
            window[hrefString](); //menjadikan hrefString menjadi function, function tsbt adalah function menu1
          }, 1000);
        }
      }
    });
}

function menu1() {
  $("#menu1 img").velocity("transition.flipYIn", { duration: 1500 });
  $("#menu1 .title").velocity("transition.slideUp", { duration: 1500 });
  $("#menu1 div").velocity("transition.slideDownIn", { duration: 1500 });
}

function our_team() {
  $(".members.top240").velocity("transition.slideUpIn", { stagger: 1000 });
  $(".members.top170").velocity("transition.slideDownIn", { stagger: 1000 });
}

function back_intro() {
  $("#menu ul li").hide();
  $(".container-content").hide();
  $("#text").velocity(
    { "font-size": "70px", top: "45%" },
    {
      duration: 1000,
      complete: function () {
        $("#start").velocity("transition.whirlIn");
      },
    }
  );
}

$(document).ready(function () {
  animasiIntro();
});
