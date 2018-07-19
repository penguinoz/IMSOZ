import {global} from '/imports/global/global_things.js';
// import {collections as CLT} from '/imports/global/collections.js';

var tempalteName = "endingNote";
var instance = this;
var metoerCallControl = false;

Template.endingNote.onCreated(function(){
  // instance.timelineData = new ReactiveVar();
  // console.log("test");
  // Meteor.call("loginWithoutPass");
  metoerCallControl = false;
  instance.res = new ReactiveVar();
  instance.userId = Meteor.userId();
  // Session.set('lifeMap_show', false);

  //다른사람의 페이지 방문일 경우 사용자 아이디 변경
  //if(instance.data && instance.data.userId)
  // {instance.userId = instance.data.userId}
  instance.showNoti = new ReactiveVar(false);

  //쿠키에 Y이면 오늘 하루 보여주지 않는다.
  // console.log(fn_getCookie("notToday"));

  if(fn_getCookie("notToday") !== "Y" && !Session.get('colsedNoti')){
    // $("#main_popup").show('fade');
    var today = global.fn_dateFormat(new Date()).HMS;
    Meteor.call('getOfficialNotiCount', today, function(error, result){
      if(error){

      } else {
        //공지할게 있으면
        if(result > 0){
          instance.showNoti.set(true);
          $("html").addClass('scroll-hidden');
        }
      }
    });
  } else {
    instance.showNoti.set(false);
    $("html").removeClass('scroll-hidden');
  }

  var dateArr = [];
  var dataCount = 0;
  var searchObj = {
    text:'',
    type : '',
    subType:'',
    showLock : true,
    showShared : true,
  };
  if(!Session.get("timelineData")){
    Meteor.call("getEndingNoteData",instance.userId, searchObj, dataCount, dateArr, function(error, result){
      if(error){
        console.log(error);
      } else {
        // instance.timelineData.set(result);
        Session.set("timelineData",result);
        $(".loading").hide();
      }
    });
  }

  //네비게이션 데이터
  var navData ={
    type : 'IM',
    prevTemplate : "endingNote"
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  Session.set('nav_endingNote', navData);
  //2. 넘길 정보
  Session.set('navData', navData);
});

Template.endingNote.onRendered(function(){
  Session.set('editor_addUserList', null);
  var position = Session.get("scrollPosition");
  if(!Session.get("timelineData")){
    $(".loading").show();
  }else if(position){
    var scrollPosition = $("#"+position).offset().top;
    $('html, body').animate({
      scrollTop: scrollPosition-250
    }, 0);
  }
  Session.set("scrollPosition", null);

  //무한스크롤
  $(window).scroll(function() {
    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    // Session.set('scorllData', calc);
    // console.log( $(window).scrollTop(), $(document).height() - $(window).height());
    // if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    if (calc > 70 && !Session.get('guidePopTemplate')) {

      //기존 데이터 가져오기
      // var insData = instance.timelineData.get();
      var insData = Session.get("timelineData");

      var dataCount = 0;
      // 타임라인 정보가 있을경우, 해당 타임라인의 갯수 저장
      if( insData.timelineInfo && insData.timelineInfo.length){
        dataCount = insData.timelineInfo.length;
      }
      // if(insData.searchObj ){
      //   datacount = 0;
      // }

      if(!insData.isDataExist || insData.isFinalData){
        // console.log("this is final");
        return;
      }

      if(metoerCallControl){
        $(".loading").hide();
        return;
      }

      metoerCallControl = true;
      // console.log(insData.searchObj, dataCount);
      Meteor.call("getEndingNoteData", instance.userId, insData.searchObj, dataCount, insData.dateArr, function(error, result){
        if(error){
          console.log(error);
        } else {
          // console.log("return this");
          // var resParam = instance.timelineData.get();
          var resParam = insData;
          //중복 concat 방어코딩
          var checkId = "";
          if(result.timelineInfo[0] && result.timelineInfo[0]._id){
            checkId = result.timelineInfo[0]._id;
          }
          if( _.findWhere(resParam.timelineInfo,{"_id":checkId}) === undefined ){
            resParam.timelineInfo = resParam.timelineInfo.concat(result.timelineInfo);
            result.timelineInfo = resParam.timelineInfo;
            // instance.timelineData.set(result);
            Session.set("timelineData",result);
          }
        }
        metoerCallControl = false;
        $(".loading").hide();
      });
    }
  });
});

Template.endingNote.helpers({
  hpTimeline: function(){
    // return instance.timelineData.get();
    return Session.get("timelineData");
  },
  //searchBox 템플릿으로 인자와 함께 부터 호출받음
  hpSearchCallBack :  function(_searchObj){
    // instance.searchObj = _searchObj;
    // var insData = instance.timelineData.get();
    var insData = Session.get("timelineData");
    if(metoerCallControl)return;
    metoerCallControl = true;
    var dateArr = [];

    Meteor.call("getEndingNoteData", Meteor.userId(), _searchObj, 0, dateArr,function(error, result){
      if(error){
        console.log(error);
      } else {
        // instance.timelineData.set(result);
        Session.set("timelineData",result);
      }
      metoerCallControl = false;
    });
  },
  hpShowNoti : function(){
    return instance.showNoti.get();
  },
  hpCategoryPopup: function(){
    return Session.get('categoryMenuPopup');
  },
  hpIsLogin: function(){
    if(Meteor.userId()){
      return true;
    } else {
      return false;
    }
  }
  // hpLifeMapShow : function(){
  //   return Session.get('lifeMap_show');
  // },
});

Template.endingNote.events({
  // "click .float-button a": function(e, t){
  //
  //   // if(Meteor.userId()){
  //     Session.set('categoryMenuPopup', true);
  //
  //     if(global.writeLog){
  //       //로그 생성
  //       Meteor.call('setLog', 'LG0040', Meteor.userId(), '', '');
  //     }
  //   // } else {
  //   //   var confrimData = {
  //   //     title : '로그인 후에 사용가능합니다.',
  //   //     context : '',
  //   //     templateName : 'endingNote',
  //   //     returnData : null,
  //   //     singleBtn : true,
  //   //     btnName : '확인'
  //   //   };
  //   //
  //   //   Session.set('confrim_center', confrimData);
  //   // }
  // }
});

Template.endingNote.onDestroyed(function(){
  $(window).off('scroll');
  $(".loading").hide();
});


function fn_getCookie(name) {
  var cName = name + "=";
  var x = 0;
  while ( x <= document.cookie.length )
  {
    var y = (x+cName.length);
    if ( document.cookie.substring( x, y ) == cName )
    {
      if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
      endOfCookie = document.cookie.length;
      return unescape( document.cookie.substring( y, endOfCookie ) );
    }
    x = document.cookie.indexOf( " ", x ) + 1;
    if ( x == 0 )
    break;
  }
  return "";
}
