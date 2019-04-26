$(function(){
  $(".js-mypage-tab").click(function() {
    $(this).prev("li").removeClass("js-mypage-tab-active");
    $(this).addClass("js-mypage-tab-active");

    if ($(this).hasClass("js-mypage-tab-transaction-now")) {
      $("#js-mypage-transaction-now").addClass("js-mypage-content-active");
      $("#js-mypage-transaction-old").removeClass("js-mypage-content-active");
    } else if ($(this).hasClass("js-mypage-tab-transaction-old")) {
      $("#js-mypage-transaction-old").addClass("js-mypage-content-active");
      $("#js-mypage-transaction-now").removeClass("js-mypage-content-active");
    }

    if ($(this).hasClass("js-mypage-tab-notification")) {
      $("#js-mypage-notification").addClass("js-mypage-content-active");
      $("#js-mypage-todo").removeClass("js-mypage-content-active");
    } else if($(this).hasClass("js-mypage-tab-todo")){
      $("#js-mypage-todo").addClass("js-mypage-content-active");
      $("#js-mypage-notification").removeClass("js-mypage-content-active");
    }
  })
  $(".js-mypage-tab").click(function() {
    $(this).next("li").removeClass("js-mypage-tab-active");
    $(this).addClass("js-mypage-tab-active");
  })
});
