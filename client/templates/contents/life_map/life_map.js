import {global} from '/imports/global/global_things.js';

var instance;
Template.lifeMap.onCreated(function(){
// instance.mapData = new ReactiveVar();
  instance = this;
  instance.pageOwnerId = this.data._id;
  instance.userId = global.fn_passCode(this.data._id, 'DC');
  instance.contentType = new ReactiveVar('ALL');
  instance.userInfo = new ReactiveVar();
  // instance.contentId = new ReactiveVar();
  // Session.set('lifeMapDetailShow', false);
  instance.startDate = '';
  instance.endDate = '';
  instance.isVisit = new ReactiveVar(true);

  // 친구노트 방문시 userId 변경설정
  if(Meteor.userId() === instance.userId){
    instance.isVisit.set(false);
  }

  //기대수명 정보, 생일
  Meteor.call('getExpectAge', instance.userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.userInfo.set(result);
      // console.log(result);
      // instance.dateInfo.set(result);
      instance.startDate = result.birthDate;
      instance.endDate = result.dDate;
    }
  });


});

Template.lifeMap.onRendered(function(){

  var height = $(window).height();
  $(".lifeMap").css('min-height',height);


  var position = Session.get("scrollPosition");
  if(position){
    var scrollPosition = $("#"+position).offset().top;
    $('html, body').animate({
          scrollTop: scrollPosition-250
    }, 0);
  }
  Session.set("scrollPosition", null);
  Session.set("scrollPositionVs", null);


});

Template.lifeMap.helpers({
  hpContentType: function() {
    return Template.instance().contentType.get();
  },
  hpUserInfo : function() {
    return Template.instance().userInfo.get();
  },
  hpIsVisit : function() {
    return Template.instance().isVisit.get();
  },
});

Template.lifeMap.events({
  "click #close": function(e, t){
    e.preventDefault();
    window.history.back();
    // if(t.isVisit.get()){
    //   Router.go('endingNoteVs', {_id:t.pageOwnerId},{replaceState: false});
    // } else {
    //   Router.go('endingNote',{},{replaceState: false});
    // }
    // Session.set('lifeMap_show', false);
  },
  "click #createMap": function(e, t){
    e.preventDefault();


    var searchObj = {
      "userId" : t.userId,
      "type" : $("#category").val(),
      "subType" : $("#subcategory").val(),
      "startDate" : $('#startDate').val(),
      "endDate" : $('#endDate').val(),
      "lock" : t.isVisit.get() ? false : $('#lock')[0].checked,
    };
    //1. 검색 정보를 스트링으로 수정
      var searchString = searchObj.type+'_'+searchObj.subType+'_'+searchObj.startDate+'_'+searchObj.endDate+'_'+searchObj.lock;
    //2. 암호화
      var enSearchStr = global.fn_passCode(searchString, 'EC');
    //3. view화면 호출
    // location.href="/lifeMap/map/" + t.pageOwnerId +"/" + enSearchStr;
    Session.set("scrollPosition", null);
    Session.set('mapData', null); //라이프맵 데이터 초기화 여기서 한 이유는 스크롤 포지션 때문
    Router.go('lifeMapView', {_id: t.pageOwnerId, searchStr : enSearchStr},{replaceState: false});
  },
  "change #category": function(e, t){
    t.contentType.set($('#category').val());
  },
  "change #startDate": function(e, t){
    e.preventDefault();

    if($('#startDate').val() > t.endDate){
      // alert('시작일은 종료일보다 클 수 없습니다.');
      var confrimData = {
        title : '시작일은 종료일보다 클 수 없습니다.',
        context : '',
        templateName : 'lifeMap',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);

      $('#startDate').val(t.startDate);
      return;
    }

  },
  "change #endDate": function(e, t){
    e.preventDefault();

    if($('#endDate').val() < t.startDate){
      // alert('종료일은 시작일보다 클 수 없습니다.');
      var confrimData = {
        title : '종료일은 시작일보다 클 수 없습니다.',
        context : '',
        templateName : 'lifeMap',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      $('#endDate').val(t.endDate);
      return;
    }

  },
});
