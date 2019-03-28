$(function(){
  $('.header-find__list').mouseenter(function(){
    $('.header-find-box__parent').css('display', 'block');
    console.log('hello');
  });
  $('.header-find__list').mouseleave(function(){
    $('.header-find-box__parent').css('display', 'none');
  });
});
