import {global} from '/imports/global/global_things.js';

Template.timeline.onCreated(function(){
  var instance = this;
  instance.expDate = new ReactiveVar();
  instance.questionData = new ReactiveVar();

  Session.set('confrim_center', false);
  Session.set('confrim_capsule_open', false);

  Meteor.call('getExpectAge',Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.expDate.set(result);
    }
  });

  Meteor.call('getQeustionData', Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.questionData.set(result);
    }
  });
});

Template.timeline.onRendered(function(){

  var sticky = $(".sticky-menu");
  var scroll = $(window);


  $(window).scroll( function() {
    // console.log('check :', scroll.scrollTop());
    if(scroll.scrollTop() > 145) {
      // $(".birth-info").addClass('margin-bottom-150');
      sticky.addClass("sticky");
      // $(".ending-note .user-profile").slideUp(300);
      $(".question").slideDown(300);
      $(".question-sticky").slideDown(300);

    } else if(scroll.scrollTop() < 1){

      sticky.removeClass("sticky");
      // $(".ending-note .user-profile").slideDown(300);
      $(".question").slideDown(300);
      $(".question-sticky").slideUp(300);
      // $(".birth-info").removeClass('margin-bottom-150');
    }
  });

  //로딩 닫기
  $(".loading").hide();
});

Template.timeline.helpers({
  hpExpDate: function(){
    return Template.instance().expDate.get();
  },
  hpGetSession: function(){
    return Session.get('templateData');
  },
  hpIftype: function(dataType){
    if(dataType === "1"){
      return true;
    }else{
      return false;
    }
  },
  // hpTimelineContents: function(){
  //   return this.timelineInfo;
  //   // return Template.instance().timelineData.get();
  // },
  hpQuestion: function(){
    // console.log(Template.instance().questionData.get());
    return Template.instance().questionData.get();
  },
  hpConfrimData : function(){
      return Session.get('confrim_center');
  },
  hpConfirmCallBack :  function(_data){
    fn_openCapsule(_data.contentId, _data.capsuleId, _data.userId, _data.senderId);
  },
  hpOpenCapsuleConfirmData : function(){
    return Session.get('confrim_capsule_open');
  },
  // hpScrollData: function(){
  //   return Session.get('scorllData');
  // }
  hpIfTypeReturnId : function(type){
    return type==="BL";
  }
});


Template.timeline.events({
  "click .template-group": function(e, t){
    e.preventDefault();

    if(!Meteor.userId()){
      var confrimData = {
        title : '로그인 후 사용가능합니다.<br/>로그인 페이지로 이동합니다',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      Router.go('login',{},{replaceState: false});
      return;
    }


    var contentId = this._id;
    var navData ={
      prevTemplate : "endingNote",
      type : this.type
    };
    // var contentId = this.type;
    switch(this.type){
      case 'BL':
        navData.contentId = this.bucketId;
        Router.go('bucketDetail', {_id: this.bucketId},{replaceState: false});
      break;
      case 'TC':
        //오프인일 계산하는 기능 추가
        var capsuleId = this.capsuleId;
        var openDay = this.mDate;
        var senderId = this.senderId;

        if(this.isOpened){
          Router.go("contentDetail", {_id: contentId},{replaceState: false});
        } else {
          // if(!capsuleId && this.targetId.length > 0){
          //   //친구꺼
          //   // alert('아직 친구분이 타임캡슐을 개봉하지 않았네요!!.');
          //   var confrimData = {
          //     title : '아직 친구분이 타임캡슐을 개봉하지 않았네요!!.',
          //     context : '',
          //     templateName : 'timeline',
          //     returnData : null,
          //     singleBtn : true,
          //     btnName : '확인'
          //   };
          //
          //   Session.set('confrim_center', confrimData);
          // } else {
            if(openDay <= global.fn_dateFormat(new Date()).YMD){
              //opne하겠냐는 confirm 필요
              var confrimData = {
                title : '타임캡슐을<br/> 개봉할 준비가 되었습니다!!',
                context : '회원님의 소중한 타임캡슐을<br/>개봉하시겠습니까?',
                templateName : 'timeline',
                returnData : {
                  contentId : contentId,
                  capsuleId : capsuleId,
                  userId : Meteor.userId(),
                  senderId : senderId,
                },
                singleBtn : false,
                btnName : ''
              };

              Session.set('confrim_capsule_open', confrimData);
              // alert('타임캡슐이 개봉되었습니다.');
              // var confrimData = {
              //   title : '타임캡슐을 개봉할 준비가 되었습니다!!',
              //   context : '회원님의 소중한 타임캡슐을<br/>개봉하시겠습니까?',
              //   templateName : 'timeline',
              //   returnData : null,
              //   singleBtn : true,
              //   btnName : '확인'
              // };
              //
              // Session.set('confrim_center', confrimData);
              //isOpened true로 바꿔주는 Meteod 필요

            } else {
              // alert('타임캡슐 개봉일이 아닙니다.'); //문구수정 필요
              var confrimData = {
                title : '타임캡슐 개봉일이 아닙니다.',
                context : '',
                templateName : 'timeline',
                returnData : null,
                singleBtn : true,
                btnName : '확인'
              };

              Session.set('confrim_center', confrimData);
            }
          // }
        }
      break;
      default:
        Router.go("contentDetail", {_id: this._id},{replaceState: false});
    }
    Session.set('navData', navData);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0014', Meteor.userId(), 'ED', this.subType); //타임라인 컨텐츠 클릭
    }


  },
  "keyup #expAge": function(e,t){
    var string = $(e.currentTarget).val().replace(/[^0-9]/gi, "");
    $(e.currentTarget).val(string);
    if (e.which === 13) {
      //마우스커서 빼기
      $('#expAge').blur();
    }
  },
  "focusout #expAge": function(e, t){
    e.preventDefault();
    // console.log('focusout');

    var reg = new RegExp('([^0-9])','g');
    var stVal = $('#expAge').val();

    if(stVal === "" || reg.exec(stVal) !== null){
      // alert('숫자를 입력해 주세요');
      var confrimData = {
        title : '숫자를 입력해 주세요',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      $('#expAge').focus();
      return;
    }
    if(parseInt(stVal) > 150){
      // alert('150세 이상 입력 할수 없습니다.');
      var confrimData = {
        title : '150세 이상 입력 할수 없습니다.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      $('#expAge').focus();
      Session.set('confrim_center', confrimData);
      return;
    }

    var countdate = parseInt(stVal) - global.fn_getMyAge(Meteor.user().profile.birthday, global.fn_dateFormat().YMD);
    if(countdate <= 0){
      // alert('기대 수명은 지금 나이보다 적을 수 없습니다.');
      var confrimData = {
        title : '기대 수명은 지금 나이보다 적을 수 없습니다.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      $('#expAge').focus();
      Session.set('confrim_center', confrimData);
      return;
    }

    Meteor.call('setExpectLife', Meteor.userId(), stVal, function(err,res){
      if(err){
        console.log(err);
      } else {
        Meteor.call('getExpectAge',Meteor.userId(), function(error, result){
          if(error){
            console.log(error);
          } else {
            t.expDate.set(result);

            // 1. 로그 사용여부확인
            if(global.writeLog){
              //2. 로그 생성
               Meteor.call('setLog', 'LG0015', Meteor.userId(),'ED',''); //기대수명 변경
            }
          }
        });
      }
    });
  },
  //오늘의 질문 클릭
  "click #todayQuestion": function(e, t){
    e.preventDefault();

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0059', Meteor.userId(), '', ''); //오늘의 질문 작성 클릭
    }

    var dueDate = null;

    if(t.questionData.get().cycle === -1){
      //반복하지 않는 질문등록
      dueDate = null;
    } else if(t.questionData.get().cycle === 0){
      //계속 반복되는 질문 등록
      dueDate = global.fn_dateFormat(t.questionData.get().regDate).YMD;
    } else {
      //주기를 갖고 반복되는 질문
      // dueDate = global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat(t.questionData.get().regDate).YMD, t.questionData.get().cycle, 'SUM')).YMD;
      var date = new Date(t.questionData.get().regDate);
      date.setDate(date.getDate() + t.questionData.get().cycle);
      var dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      dueDate = global.fn_dateFormat(dateString).YMD;
    }

    var navData ={
      // type : 'TQ',
      question : true,
      type : t.questionData.get().type,
      subType : t.questionData.get().subType,
      // category : 'writeStory',
      prevTemplate : "endingNote",
      dateTitle : t.questionData.get().dateTitle,//global.fn_getCodeName('dateTitle',t.questionData.get().dateTitle),
      hint: {
        type: t.questionData.get().hintType,
        text: t.questionData.get().hint,
      },
      data : {
        // editorTitle : '오늘의 질문',
        qCode : t.questionData.get().qCode,
        title : t.questionData.get().question,
        // titleReadOnly : true,
        dueDate : dueDate,
        profileEtc : t.questionData.get().profileEtc ? t.questionData.get().profileEtc : '',
      }
    };



    Session.set('navData', navData);

    Router.go("writeStory",{},{replaceState: false});
  }
});


function fn_openCapsule(_contentId, _capsuleId, _userId, _senderId){

  if(_senderId){
    Meteor.call("getTokenIds", [_senderId], function(err,res){
      if(err)console.log(err);
      if(res && res.length){
        //fcm전송
        var sendObj = {
          tokenId :_.uniq(_.flatten(_.pluck(res, 'fcmToken'))),
          body : Meteor.user().profile.name + global.fn_getSysMessage('msg0002').message,
          title : "It's my story",
          url : global.siteUrl +"/endingNote"
        };
        global.sendFcmMessage(sendObj);
      }
    });
  }

  Meteor.call('setTimeCapsuleOpen', _contentId, _capsuleId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {
      global.fn_resetSession();
      // Session.set("timelineData",null);
      // Session.set('bucketListData',null);
      // Session.set("bucketListStatus", null);
      // Session.set("scrollPosition", null);
      Router.go("contentDetail", {_id: _contentId},{replaceState: false});
    }
  });
}
