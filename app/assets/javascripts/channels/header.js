$(function(){


  // 「カテゴリーから探す」にホバーしたときに、大カテゴリー一覧を表示する。
  $('.header-find__list').mouseenter(function(){
    $(this).find('.header-find-box-parent').css('display', 'block');
  });
  $('.header-find__list').mouseleave(function(){
    $('.header-find-box-parent').css('display', 'none');
  });


  // // 大カテゴリーの1つにホバーしたとき、中カテゴリーの一覧を表示する。
  $('.header-find-box-parent__list').mouseenter(function(){
    $(this).find('.header-find-box-child').css('display', 'block');
  });
  $('.header-find-box-parent__list').mouseleave(function() {
    $('.header-find-box-child').css('display', 'none');
  });


  // 中カテゴリーの1つにホバーしたとき、小カテゴリーの一覧を表示する。
  $('.header-find-box-child__list').mouseenter(function(){
    $(this).find('.header-find-box-grandchild').css('display', 'block');
  });
  $('.header-find-box-child__list').mouseleave(function(){
    $(this).find('.header-find-box-grandchild').css('display', 'none');
  });
});
