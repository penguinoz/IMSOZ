import {global} from '/imports/global/global_things.js';

Template.timelineVs.onCreated(function(){
  var instance = this;
  instance.expDate = new ReactiveVar();
  instance.pageOwnerId = this.data.pageOwnerId;

  Meteor.call('getExpectAge', global.fn_passCode(this.data.pageOwnerId, 'DC'), function(error, result){
    if(error){
      console.log(error);
    } else {
      instance.expDate.set(result);
    }
  });
});

Template.timelineVs.onRendered(function(){
  var sticky = $(".sticky-menu");
  var scroll = $(window);

  $(window).scroll( function() {
    if(scroll.scrollTop() > 145) {
      sticky.addClass("sticky");
      $(".ending-note .user-profile").slideUp(300);

    } else if(scroll.scrollTop() < 1){

      sticky.removeClass("sticky");
      $(".ending-note .user-profile").slideDown(300);
    }
  });

  //로딩 닫기
  $(".loading").hide();
});

Template.timelineVs.helpers({
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
  hpIfTypeReturnId : function(type){
    return type==="BL";
  }
});


Template.timelineVs.events({
  "click .template-group": function(e, t){
    e.preventDefault();

    var contentId = this._id;
    var capsuleId = this.capsuleId;

    var navData ={
      prevTemplate : "endingNoteVs",
      type : this.type,
    };

    // var contentId = this.type;
    switch(this.type){
      case 'BL':
        navData.contentId = this.bucketId;
        Router.go('bucketDetailVs', {_id: t.pageOwnerId, contentId:this.bucketId},{replaceState: false});
      break;
      case 'TC':
        //오프인일 계산하는 기능 추가
        var openDay = this.mDate;

        if(this.isOpened){
          Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:contentId},{replaceState: false});
        } else {
          // alert('친구의소중한 타임캡슐은 개봉되기 전엔 볼 수 없어요!!');
          var confrimData = {
            title : '친구가 받은 소중한 타임캡슐은<br/>개봉되기 전엔 볼 수 없어요!!',
            context : '',
            templateName : 'contentDetailVs',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        }
      break;
      default:
        Router.go("contentDetailVs", {_id: t.pageOwnerId, contentId:contentId},{replaceState: false});
    }
      Session.set('navData', navData);
  },
  // "keyup #expAge": function(e,t){
  //   if (e.which === 13) {
  //     //마우스커서 빼기
  //     $('#expAge').blur();
  //   }
  // },
  // "focusout #expAge": function(e, t){
  //   e.preventDefault();
  //   console.log('focusout');
  //
  //   var reg = new RegExp('([^0-9])','g');
  //   var stVal = $('#expAge').val();
  //
  //   if(stVal === "" || reg.exec(stVal) !== null){
  //     alert('숫자를 입력해 주세요');
  //     return;
  //   }
  //   if(parseInt(stVal) > 150){
  //     alert('150세 이상 입력 할수 없습니다.');
  //     return;
  //   }
  //
  //   var countdate = parseInt(stVal) - global.fn_getMyAge(Meteor.user().profile.birthday, global.fn_dateFormat().YMD);
  //   if(countdate <= 0){
  //     alert('기대 수명은 지금 나이보다 적을 수 없습니다.');
  //     return;
  //   }
  //
  //   Meteor.call('setExpectLife', Meteor.userId(), stVal, function(err,res){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       Meteor.call('getExpectAge', function(error, result){
  //         if(error){
  //           console.log(error);
  //         } else {
  //           t.expDate.set(result);
  //         }
  //       });
  //     }
  //   });
  // },
  // //오늘의 질문 클릭
  // "click #todayQuestion": function(e, t){
  //   e.preventDefault();
  //
  //   var navData ={
  //     type : 'TQ',
  //     category : 'writeStory',
  //     prevTemplate : "endingNote",
  //     data : {
  //       qCode : t.questionData.get().qCode,
  //       title : t.questionData.get().question,
  //       context :  t.questionData.get().hint
  //     }
  //   };
  //
  //
  //   Session.set('navData', navData);
  //
  //   Router.go("writeStory",{},{replaceState: false});
  // }
});
