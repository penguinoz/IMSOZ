import {global} from '/imports/global/global_things.js';
// import {collections as CLT} from '/imports/global/collections.js';

var tempalteName = "endingNote";
var instance = this;
var metoerCallControl = false;

Template.endingNoteVs.onCreated(function(){
  instance.timelineData = new ReactiveVar();
  instance.res = new ReactiveVar();
  instance.pageOwnerId = this.data.pageOwnerId;
  instance.userId = new ReactiveVar(global.fn_passCode(this.data.pageOwnerId, 'DC'));
  metoerCallControl = false;

  // console.log("FRFR:", global.fn_passCode(this.data.pageOwnerId, 'DC'));
  var dateArr = [];
  var dataCount = 0;
  var searchObj = {
    text:'',
    type : '',
    subType:'',
    showLock : true,
  };
if(!Session.get("timelineDataVs")){
  Meteor.call("getEndingNoteData",instance.userId.get(), searchObj, dataCount, dateArr, function(error, result){
    if(error){
      console.log(error);
    } else {
      result.pageOwnerId = instance.pageOwnerId;
      // instance.timelineData.set(result);
      Session.set("timelineDataVs",result);
      $(".loading").hide();
    }
  });
}

  var navData ={
    type : 'IM',
    category:"writeStory",
    prevTemplate : "endingNoteVs",
  };

  Session.set('navData', navData);
});

Template.endingNoteVs.onRendered(function(){
  // $(".loading").show();
  var position = Session.get("scrollPosition");
  if(!Session.get("timelineDataVs")){
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
      if (calc > 70) {

    //기존 데이터 가져오기
     var insData = instance.timelineData.get();
     var insData = Session.get("timelineDataVs");

     var dataCount = 0;
     // 타임라인 정보가 있을경우, 해당 타임라인의 갯수 저장
     if( insData.timelineInfo && insData.timelineInfo.length){
       dataCount = insData.timelineInfo.length;
     }

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
     Meteor.call("getEndingNoteData", instance.userId.get(), insData.searchObj, dataCount, insData.dateArr, function(error, result){
       if(error){
         console.log(error);
       } else {
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
           result.pageOwnerId = instance.pageOwnerId;
           // instance.timelineData.set(result);
           Session.set("timelineDataVs",result);
         }
       }
       metoerCallControl = false;
       $(".loading").hide();
     });
   }
  });
});

Template.endingNoteVs.helpers({
  hpTimeline: function(){
    // return instance.timelineData.get();
    return Session.get("timelineDataVs");
  },
  //searchBox 템플릿으로 인자와 함께 부터 호출받음
  hpSearchCallBack :  function(_searchObj){
    // var insData = instance.timelineData.get();
    var insData = Session.get("timelineDataVs");
    if(metoerCallControl)return;
    metoerCallControl = true;
    var dateArr = [];

    Meteor.call("getEndingNoteData", instance.userId.get(), _searchObj, 0, dateArr,function(error, result){
      if(error){
        console.log(error);
      } else {
        result.pageOwnerId = instance.pageOwnerId;
        // instance.timelineData.set(result);
        Session.set("timelineDataVs",result);
      }
      metoerCallControl = false;
    });
  },
  hpPageUser : function(){
    return instance.pageOwnerId;
  }
});

Template.endingNoteVs.events({
});

Template.endingNoteVs.onDestroyed(function(){
  $(window).off('scroll');
  $(".loading").hide();
});
