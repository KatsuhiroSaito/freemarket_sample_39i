$(function(){


  // 中カテゴリーの1つにホバーしたとき、その親の大カテゴリーに'active-parent'というクラス名を与える。
  $('.header-find-box-child__list').hover(
    function(){
      $(this).parent('ul.header-find-box-child').parent('li.header-find-box-parent__list').addClass("active-parent");
    },
    function() {
      $(this).parent('ul.header-find-box-child').parent('li.header-find-box-parent__list').removeClass("active-parent");
    }
  );


  // 小カテゴリーの1つにホバーしたとき、その親の中カテゴリーに'active-child'というクラス名を与える。
  $('.header-find-box-grandchild__list').hover(
    function(){
      $(this).parent('ul.header-find-box-grandchild').parent('li.header-find-box-child__list').addClass("active-child");
    },
    function() {
      $(this).parent('ul.header-find-box-grandchild').parent('li.header-find-box-child__list').removeClass("active-child");
    }
  );
});
