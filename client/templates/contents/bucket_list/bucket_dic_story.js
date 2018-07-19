import {global} from '/imports/global/global_things.js';
var templateName = "bucketDicStory";

var dragFlag = false;
var instance;
var metoerCallControl = false;

Template.bucketDicStory.onCreated(function(){
  instance = this;
  instance.selectedUser = new ReactiveVar();
  instance.likeComCount = new ReactiveVar();
  instance.selectedCategory = new ReactiveVar('BL0001');
  instance.codeList = new ReactiveVar();

  instance.userId = null;
  instance.toDate = global.fn_dateFormat(new Date()).HMS;
  metoerCallControl = false;


  //둘러보기 일 경우
  var isVisitor = false;
  if(Meteor.userId()){
    instance.userId = Meteor.userId();
  }


  //버키스토리 전체 데이터 가져오기
  var dataCount = 0;
  var searchObj = {
    text : "",
    type : ['BL0001'],
  };
  var bsDataList = Session.get('bucketDicStoryData') ? Session.get('bucketDicStoryData').buckyStoryData : null;
  if(!bsDataList){
    fn_getAllDicBuckyStory(dataCount, searchObj, instance.toDate);
  }

  //네비게이션 데이터
  var navData ={
    type : 'BL',
    prevTemplate : "bucketList",
    menu : 'buckystory'
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  Session.set('nav_bucketDicStory', navData);
  //2. 넘길 정보
  Session.set('navData', navData);

  Meteor.call('checkCodeOptionLoad', function(error, result){
    if(error){
      console.log(error);
    } else {
      var codeList = global.fn_getCodeList('bucket');
      instance.codeList.set(codeList);
    }
  });
});

Template.bucketDicStory.onRendered(function(){
  var position = Session.get("scrollPosition");
  if(!Session.get("bucketDicStoryData")){
    $(".loading").show();
  } else if(position){
    setTimeout(function () {
      if($("#"+position)[0]){
        var scrollPosition = $("#"+position).offset().top;
        $('html, body').animate({
          scrollTop: scrollPosition-250
        }, 0);
      }
    });
    // $(".loading").hide();
  }
  Session.set("scrollPosition",null);


  //무한스크롤
  $(window).scroll(function() {

    // if(  $(window).scrollTop() > 145) {
    //   $(".bucket-list .category-slide").slideUp(0);
    //   $(".bucket-list .category-slide-mini").slideDown(0);
    //
    // } else if(  $(window).scrollTop() < 1){
    //   $(".bucket-list .category-slide").slideDown(0);
    //   $(".bucket-list .category-slide-mini").slideUp(0);
    // }

    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    if (calc > 70 && !Session.get('guidePopTemplate')) {
    //기존 데이터 가져오기
     // var insData = instance.bucketDicStoryData.get();
     var insData = Session.get('bucketDicStoryData');

     var dataCount = 0;
     // 타임라인 정보가 있을경우, 해당 타임라인의 갯수 저장
     if( insData.buckyStoryData && insData.buckyStoryData.length > 0){
       dataCount = insData.buckyStoryData.length;
     }
     // if(insData.searchWord ){
     //   datacount = 0;
     // }

     // if(!insData.isDataExist || insData.isFinalData){
     //   // console.log("this is final");
     //   return;
     // }

     if(metoerCallControl){
       $(".loading").hide();
       return;
     }

     metoerCallControl = true;

    fn_getAllDicBuckyStory(dataCount, insData.searchObj, instance.toDate);
   }
  });
});

Template.bucketDicStory.helpers({
  hpBuckyStoryData: function(){
    // return Template.instance().bucketDicStoryData.get();
    // console.log(Session.get('bucketDicStoryData').bucketData.length);
    return Session.get('bucketDicStoryData');
  },
  hpSearchCallBack :  function(_searchObj){
    // var insData = instance.bucketDicStoryData.get();
    // var insData = Session.get('bucketDicStoryData');
    if(metoerCallControl)return;
    metoerCallControl = true;
    var insType = instance.selectedCategory.get();
    _searchObj.type = [insType];

    fn_getAllDicBuckyStory(0, _searchObj, instance.toDate);
  },
  hpSelectedUser : function(_userId){
    var result = false;
    if(_userId === Template.instance().selectedUser.get()){
      result = true;
    }
    return result;
  },
  hpGetLikeCount : function(id){
    var likeData = Template.instance().likeComCount.get().likeCount;
    var resData = 0;
    for(var i=0; i<likeData.length ; i++){
      if(likeData[i]._id === id){
        resData = likeData[i].likeCount;
      }
    }
    return resData
  },
  hpSelectedCategory :  function(){
    return Template.instance().selectedCategory.get();
  },
  hpCodeList : function(){
    return Template.instance().codeList.get();
  }
});

Template.bucketDicStory.events({
  //해당 버킷리스트 상세보기
  "click #userProfile": function(e, t){
    t.selectedUser.set(this.userId);
  },
  //버키스토리 상세보기
  "click #storyContent": function(e, t){
    e.preventDefault();
    if(!Meteor.userId()){
      // alert('로그인 하면 상세스토리를 확인 할 수 있습니다.');
      var confrimData = {
        title : '로그인 하면 상세스토리를 확인 할 수 있습니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0017', Meteor.userId(),'BL', 'BS0001'); //버키스토리 상세보기
    }
    // var contentId = this.type;
    Router.go("contentDetail", {_id: this._id},{replaceState: false});
  },
  "change #category": function(e, t){
    var searchObj = {
      text : '',
      type : [$('#category').val()]
    };

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0058', Meteor.userId(), 'BL', $('#category').val()); //버킷리스트 분류 선택
    }

    fn_getAllDicBuckyStory(0, searchObj, t.toDate);
    Session.set('searchObj', null);
  },
});

Template.bucketDicStory.onDestroyed(function(){
  $(window).off('scroll');
  $(".loading").hide();
});

function fn_getAllDicBuckyStory(_dataCount, _searchObj, _date){
  // console.log(_userId, _filter);
  // $(".loading").show();
  Meteor.call("getAllDicBuckyStory",  _dataCount, _searchObj, _date, function(error, result){
    if (error){
      console.log(error);
    } else {

      if(_dataCount > 0){
        // var prevData = instance.bucketDicStoryData.get();
        var prevData = Session.get('bucketDicStoryData').buckyStoryData;
        // console.log(prevData, result);
        prevData = prevData.concat(result.buckyStoryData);
        result.buckyStoryData = prevData;
      }
      metoerCallControl = false;

      // instance.bucketDicStoryData.set(result);
      Session.set('bucketDicStoryData',result);
      $(".loading").hide();
    }
  });
}
