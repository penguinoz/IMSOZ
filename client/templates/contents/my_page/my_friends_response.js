import {global} from '/imports/global/global_things.js';
// var templateName = 'myFriendsResponse';
var instance;
Template.myFriendsResponse.onCreated(function(){
  instance = this;
  instance.myRecFriendsId = [];
  instance.friendsInfo = ReactiveVar();
  instance.selectedIndex = ReactiveVar();
  instance.selectedUser = ReactiveVar();
  instance.infinityCount = ReactiveVar();
  // var recFrienList = instance.data.userIds;
  instance.infinityCount.set(10);


  // if(recFrienList){
  //   recFrienList.forEach(function(val){
  //     instance.myRecFriendsId.push(val);
  //   });
  //
  //   Meteor.call("getUserInfoByUid",instance.myRecFriendsId,function(err,res){
  //     if(err){
  //       console.log(err);
  //     }
  //     if(res){
  //       instance.friendsInfo.set(res);
  //     }
  //   });
  //
  // }
  getTypeUserList(instance.data.isFrom);


});

Template.myFriendsResponse.onRendered(function(){
  // $(".addUser").height($(window).height());
  $(window).scroll(function() {
    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    if (calc > 70) {

      var infiCount = instance.infinityCount.get();
      instance.infinityCount.set(infiCount + 10);
    }
  });
});


Template.myFriendsResponse.events({
  "click #backFriend": function(e, t){
    var template = {
      header: true,
      templateName : "myFriends"
    };
    // Router.go('myPageFriends',{},{replaceState: false});
    Session.set("myPage_selectedTemplate", template);
    // window.history.back();
    var template = {
      templateName : 'myPage',
      header : true,
    };
    Session.set("index_contentsTemplate", template);
  },
  "click [name=cancleReqFriend]": function(e, t){
    e.preventDefault();
    Meteor.call("delRelationReqFrien",this._id,function(err,res){
      if(err){
        console.log(err);
      }else{
        //////////////////중복코딩 todo 중복처리///////////////////
        Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            t.myRecFriendsId = [];
            res.forEach(function(val){
              t.myRecFriendsId.push(val.userId);
            });

            Meteor.call("getUserInfoByUid",t.myRecFriendsId,function(err,res){
              if(err){
                console.log(err);
              }
              if(res.length > 0){
                t.friendsInfo.set(res);
              } else {
                var template = {
                  header: true,
                  templateName : "myFriends"
                };
                Router.go('myPageFriends',{},{replaceState: false});
                Session.set("myPage_selectedTemplate", template);
              }
            });

          }
        });
        //////////////////////////////////////////////////////
      }
    });
    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0037', Meteor.userId(),'', ''); //마이페이지 친구요청 취소
    }
  },
  "click [name=acceptFrien]": function(e, t){
    var friendId = this._id;
    var friendName = this.profile.name;
    Meteor.call("doAcceptFriend",friendId,function(err,res){
      if(err){
        console.log(err);
      }else{

        //////////////////fcm 전송부분 //////////////////
        var fcmCode = global.fcmHistoryCode();
        // Meteor.call('checkUpdateFcmHistory', [friendId], fcmCode.acceptFriend, "", function(err, res){
        //   if(err)console.log(err);
        //   if(res && res.length){
        Meteor.call("getTokenIds", [friendId], function(err,res){
          if(err)console.log(err);
          if(res && res.length){
            //fcm전송
            //여기서 res는 무조건 하나
            var sendObj = {
              tokenId : res[0].fcmToken,
              body : "친구요청이 수락 되었습니다. 앱에서 확인하세요!",
              title : "It's my story",
              url : global.siteUrl +"/myPage/friends"
            }
            global.sendFcmMessage(sendObj);
          }
        });

        var confrimData = {
          title : friendName +'님을 친구로 등록했습니다.',
          context : '',
          templateName : 'myFriendsResponse',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        //   }
        // });
        /////////////////////// end fcm /////////////////////

        Meteor.call('setPoint', 'PO0009', Meteor.userId(), 'get',  'MY', 'DEFAULT', '');
        Meteor.call('setPoint', 'PO0009', friendId, 'get',  'MY', 'DEFAULT', '');
        //////////////////중복코딩 todo 중복처리///////////////////
        Meteor.call("getReceiveFriends",Meteor.userId(),function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            t.myRecFriendsId = [];
            res.forEach(function(val){
              t.myRecFriendsId.push(val.userId);
            });

            Meteor.call("getUserInfoByUid",t.myRecFriendsId,function(err,res){
              if(err){
                console.log(err);
              }
              if(res.length > 0){
                t.friendsInfo.set(res);
              } else {
                var template = {
                  header: true,
                  templateName : "myFriends"
                };
                Router.go('myPageFriends',{},{replaceState: false});
                Session.set("myPage_selectedTemplate", template);
              }
            });

          }
        });
        //////////////////////////////////////////////////////
      }

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
        Meteor.call('setLog', 'LG0036', Meteor.userId(),'', ''); //마이페이지 친구 수락
      }
    });
  }
});


Template.myFriendsResponse.helpers({
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpFriendsData: function(){
    return Template.instance().friendsInfo.get();
  },
  hpSelect: function(_index){
    var result = false;
    var index = parseInt(Template.instance().selectedIndex.get());
    if(index === _index){
      result = true;
    }
    // console.log(Template.instance().selectedIndex.get(), ", "+_index, result);
    return result;
  },
  hpInfinityCount : function(index){
    // console.log(index >= instance.infinityCount.get());
    return index >= instance.infinityCount.get();
  },
  hpSelectedFrom : function(){
    return Template.instance().data.isFrom !== "receive";
  }
});

function getTypeUserList(param){
  if(param==="receive"){
    Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
      if(err){
        console.log(err);
      }
      if(res){
        res.forEach(function(val){
          instance.myRecFriendsId.push(val.userId);
        });

        Meteor.call("getUserInfoByUid",instance.myRecFriendsId,function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            instance.friendsInfo.set(res);
          }
        });

      }
    });
  }else{
    Meteor.call("getReceiveFriends",Meteor.userId(),function(err,res){
      if(err){
        console.log(err);
      }
      if(res){
        res.forEach(function(val){
          instance.myRecFriendsId.push(val.userId);
        });

        Meteor.call("getUserInfoByUid",instance.myRecFriendsId,function(err,res){
          if(err){
            console.log(err);
          }
          if(res){
            instance.friendsInfo.set(res);
          }
        });

      }
    });
  }
}
