import {global} from '/imports/global/global_things.js';
Template.commentControl.onCreated(function(){
  var instance = this;
  instance.commentId = this.data.commentId;
  instance.groupId = this.data.groupId;



  $("html").addClass('scroll-hidden');
});

Template.commentControl.onRendered(function(){
  // $('.prevent.over-pop').removeClass('display-none');
  $('.prevent.over-pop').slideDown(300);
});


Template.commentControl.events({
  "click .btn-cancel": function(e, t){
    e.preventDefault();

    $("html").removeClass('scroll-hidden');
    Session.set('commentControlOpen', false);
  },
  "click .btn-confirm":function(e, t){
    e.preventDefault();
    //삭제 method 추가되어야 함
    Meteor.call('removeComment', t.commentId, function(err, res){
      if(err) {
        console.log(err);
      } else {
        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
           Meteor.call('setLog', 'LG0010', Meteor.userId(),'', ''); //댓글 삭제
        }

        $("html").removeClass('scroll-hidden');
        Session.set('commentControlOpen', false);
        Template.contentDetail.__helpers.get('hpCommentDeleteCallBack')(t.groupId);
      }
    });
  }
});


Template.commentControl.helpers({
  hpAddUserInfo: function(){
    return Template.instance().addUserInfo.get();
  }
});

//
// hpMapDataCallBack: function(){
//   var sessionParam = Session.get('timeCapsuleDetail collection');
//   sessionParam.buryPlace = callbackData.placeName;
//   sessionParam.buryLat = callbackData.location.lat;
//   sessionParam.buryLng = callbackData.location.lng;
//
//   $("#landPlace").val(callbackData.placeName);
//   $("#lat").val(callbackData.location.lat);
//   $("#lng").val(callbackData.location.lng);
//
//   Session.set('timeCapsuleDetail collection',sessionParam);
//   $("#capsuleImageViewer").attr("hidden", true);
//   $("#map-canvas").attr("hidden", false);
//   $('#abucketMap').addClass('active');
//   $('#abucketImage').removeClass('active');
// }
