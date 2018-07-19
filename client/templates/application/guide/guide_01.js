import {global} from '/imports/global/global_things.js';

Template.guide01.onCreated(function(){
  // Meteor.call('checkGuide', 'guide01', Meteor.userId(), function(error, result){
  //   if(error){
  //     console.log(error);
  //   } else {
  //     if(result){
  //       Router.go('endingNote',{},{replaceState: false});
  //     }
  //
  //   }
  // });
});

Template.guide01.onRendered(function(){
  // $('#carousel').slick({
  //   infinite:false,
  //   dots:true,
  //   arrows:false,
  //   variableWidth: true,
  //   centerMode: true,
  //   waitForAnimate : false,
  //   touchMove:true,
  //   speed:250,
  // });
  //
  // var height = $(window).height();
  // var width = $(window).width();
  // $(".item").css('height',height);
  // $(".item").css('width',width);
});

Template.guide01.events({
  "click #start": function(e, t){
    e.preventDefault();

    Meteor.call('setGuideComplete', 'guide01', Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
      } else {
        Router.go('endingNote',{},{replaceState: true});
        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
          Meteor.call('setLog', 'LG0051', Meteor.userId(),'GD', 'GD0002'); //가이드 완료
        }
      }
    });

  }
});



Template.carousel.onRendered(function(){
  $('#carousel').on('init', function(slick){
    $(".guide-slider").removeClass('display-none');
    var height = $(window).height();
    var width = $(window).width();
    $(".item").css('height',height);
    $(".item").css('width',width);
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
  $(".item").css('height',height);
  $(".item").css('width',width);
});
