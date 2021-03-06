import {global} from '/imports/global/global_things.js';
var templateName = "bucketDicMy";

var dragFlag = false;
var x, y, pre_x, pre_y;

var instance;
var metoerCallControl = false;
var blHomeStatue;
Template.bucketDicMy.onCreated(function(){
  instance = this;
  instance.selectedCategory = new ReactiveVar('BL0001');
  instance.codeList = new ReactiveVar();



  instance.userId = null;
  metoerCallControl = false;

  //둘러보기 일 경우
  var isVisitor = false;
  if(Meteor.userId()){
    instance.userId = Meteor.userId();
  }

  //데이터 없으면 초기 데이터 만듬
  // Meteor.call("createNewSampleBucketLs",bucketListData);

  //버킷리스트 전체 데이터 가져오기

  var dataCount = 0;
  var searchObj = {
    text : "",
    type : ['BL0001'],
  };
  var bkDataList = Session.get('bucketListData');
  if(!bkDataList){
    fn_getMyBucketList(instance.userId, dataCount, searchObj);
  }

  //네비게이션 데이터
  var navData ={
    type : 'BL',
    prevTemplate : "bucketList",

  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  Session.set('nav_bucketDicMy', navData);
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

Template.bucketDicMy.onRendered(function(){
  var position = Session.get("scrollPosition");
  if(!Session.get("bucketListData")){
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


    //작은매뉴
    // if(  $(window).scrollTop() > 145) {
    //   $(".bucket-list .category-slide").slideUp(0);
    //   $(".bucket-list .category-slide-mini").slideDown(0);
    //
    // } else if(  $(window).scrollTop() < 1){
    //   $(".bucket-list .category-slide").slideDown(0);
    //   $(".bucket-list .category-slide-mini").slideUp(0);
    // }

    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    if (calc > 70  && !Session.get('guidePopTemplate')) {
    //기존 데이터 가져오기
     // var insData = instance.bucketListData.get();
     var insData = Session.get('bucketListData');

     var dataCount = 0;
     // 타임라인 정보가 있을경우, 해당 타임라인의 갯수 저장
     if( insData.bucketData && insData.bucketData.length){
       dataCount = insData.bucketData.length;
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

     fn_getMyBucketList(instance.userId, dataCount, insData.searchObj);
   }
  });
});

Template.bucketDicMy.helpers({
  hpBucketListData: function(){
    // return Template.instance().bucketListData.get();
    // console.log(Session.get('bucketListData').bucketData.length);
    return Session.get('bucketListData');
  },
  hpSearchCallBack :  function(_searchObj){
    // var insData = instance.bucketListData.get();
    // var insData = Session.get('bucketListData');
    if(metoerCallControl)return;
    metoerCallControl = true;
    var insType = instance.selectedCategory.get();
    _searchObj.type = [insType];



    fn_getMyBucketList(instance.userId, 0, _searchObj);
  },
  hpSelectedCategory :  function(){
    return Template.instance().selectedCategory.get();
  },
  hpCodeList : function(){
    return Template.instance().codeList.get();
  }
});

Template.bucketDicMy.events({
  "click figure.bucket-dic-content": function(e, t){
    e.preventDefault();

    var navData ={
      prevTemplate : "bucketList",
      contentId : this._id,
      type : 'BS',
      menu : 'my',
      // category: t.category, //this.category.charAt(this.category.length-1),
    };


    Session.set('navData', navData);
    Session.set("bucketListStatus",{filter:t.data.filter});
    Router.go('bucketDetail', {_id: this._id},{replaceState: false});

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0017', Meteor.userId(),'BL', 'BL0001'); //버킷리스트 컨텐츠 클릭
    }
  },
  //내 버킷 추가
  "click #addBucket": function(e, t){
    Session.set("bucketListStatus",{filter:t.data.filter});
    Router.go("writeBucket",{},{replaceState: false});
  },
  "mousedown .category-slide-wrap": function(e, t){
    dragFlag = true;
    var obj = $(".category-slide-wrap");
    x = obj.scrollLeft();
    y = obj.scrollTop();

    pre_x = e.screenX;
    pre_y = e.screenY;

    $(".category-slide-wrap").css("cursor", "pointer");
  },
  "mousemove .category-slide-wrap": function(e, t){
    if (dragFlag) {
      var obj = $(".category-slide-wrap");
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);

      return false;
    }
  },
  "mouseup .category-slide-wrap": function(e, t){
    dragFlag = false;
    $(".category-slide-wrap").css("cursor", "default");
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

    fn_getMyBucketList(instance.userId, 0, searchObj);
    Session.set('searchObj', null);
  },
});

Template.bucketDicMy.onDestroyed(function(){
  $(window).off('scroll');
});

function fn_getMyBucketList(_userId, _dataCount, _searchObj){
  Meteor.call("getMyBucketList", _userId, _dataCount, _searchObj,  function(error, result){
    if (error){
      console.log(error);
    } else {

      if(_dataCount > 0){
        // var prevData = instance.bucketListData.get();
        var prevData = Session.get('bucketListData');
        // console.log(prevData, result);
        prevData.bucketData = prevData.bucketData.concat(result.bucketData);
        result.bucketData = prevData.bucketData;
      }
      metoerCallControl = false;

      // instance.bucketListData.set(result);
      Session.set('bucketListData',result);
      $(".loading").hide();
    }
  });
}

Template.bucketDicMy.onDestroyed(function(){
  $(".loading").hide();
});
