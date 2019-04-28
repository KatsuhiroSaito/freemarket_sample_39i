$(function(){
  var link = $('.mypage-sidebar-list__link');
  var currentUrl = location.pathname;

  $(link).each(function() {
    if ($(this).attr("href") == currentUrl) {
      $(this).addClass("js-mypage-sidebar-current-page");
    }
  })
});
