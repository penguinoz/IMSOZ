import {global} from '/imports/global/global_things.js';

Template.guide03.onCreated(function(){

});

Template.guide03.onRendered(function(){
  $("html").addClass('scroll-hidden');

  $('#carousel').on('init', function(slick){
    $(".guide-slider").removeClass('display-none');
    var height = $(window).height();
    var width = $(window).width();
    $(".guide-slider .item").css('height',height);
    $(".guide-slider .item").css('width',width);
  });

  $('#carousel').slick({
    infinite:false,
    dots:true,
    arrows:false,
    variableWidth: true,
    // centerMode: true,
    waitForAnimate : false,
    // touchMove:true,
    // speed:250,
  });

  var height = $(window).height();
  var width = $(window).width();
  $(".guide-slider .item").css('height',height);
  $(".guide-slider .item").css('width',width);
});

Template.guide03.events({
  "click #start": function(e, t){
    $("html").removeClass('scroll-hidden');
    Session.set('guidePopTemplate', false);
  },
  "click #btn-cancel": function(e, t){
    $("html").removeClass('scroll-hidden');
    Session.set('guidePopTemplate', false);
  }
});
