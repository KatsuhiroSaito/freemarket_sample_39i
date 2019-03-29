$(function(){


  // 「カテゴリーから探す」にホバーしたときに、大カテゴリー一覧を表示する。
  $('.header-find__list').hover(
    function(){
      $(this).find('.header-find-box-parent').css('display', 'block');
  },
    function() {
      $('.header-find-box-parent').css('display', 'none');
  });


  // // 大カテゴリーの1つにホバーしたとき、中カテゴリーの一覧を表示する。
  $('.header-find-box-parent__list').hover(
    function(){
      $(this).find('.header-find-box-child').css('display', 'block');
  },
    function() {
      $('.header-find-box-child').css('display', 'none');
  });


  // 中カテゴリーの1つにホバーしたとき、小カテゴリーの一覧を表示する。
  $('.header-find-box-child__list').hover(
    function(){
      $(this).find('.header-find-box-grandchild').css('display', 'block');
  },
    function() {
      $('.header-find-box-grandchild').css('display', 'none');
  });
});
