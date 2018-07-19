import {global} from '/imports/global/global_things.js';
// var templateName = 'myFriends';
var instance;
Template.myFriends.onCreated(function(){
  instance = this;
  instance.myFriendsId = [];
  // instance.friendsInfo = ReactiveVar();
  instance.selectedIndex = ReactiveVar();
  instance.selectedUser = ReactiveVar();
  // instance.myRecFriendsId = [];
  instance.resFriendsCnt = new ReactiveVar(0);
  instance.reqFriendsCnt = new ReactiveVar(0);
  instance.infinityCount = ReactiveVar();
  instance.selectedUser = new ReactiveVar();
  // Session.set("myPage_selectedTemplate", "myFriends");
  Session.set('friendsInfo', []);
  Session.set('myFriends_addConfirmPageOpen', false);
  Session.set('myFriends_deleteConfirmPageOpen', false);
  instance.infinityCount.set(10);
  // instance.isClickedNext = ReactiveVar(false);

  //친구검색
  searchMyFriends();

  //나를 추가한 리스트
  Meteor.call("getReceiveFriends",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      // res.forEach(function(val){
      //   instance.myRecFriendsId.push(val.userId);
      // });
      // $("#resFrienCount").text(instance.myRecFriendsId.length);
      // $("#resFrienCount").text(res.length);
      instance.resFriendsCnt.set(res.length);
    }
  });
  //내가 추가한 리스트
  Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      // $("#recFrienCount").text(res.length);
      instance.reqFriendsCnt.set(res.length);
    }
  });

  //이미있는 유져 관계 테이블 생성 todo 정식에선 삭제 필요
  Meteor.call("relationTableUpdate");


  //네비게이션 데이터
  var navData ={
    prevTemplate : "myPageFriends"
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  if(!Session.get('nav_myFriends')){
    Session.set('nav_myFriends', Session.get('navData'));
  }
  //2. 넘길 정보
  Session.set('navData', navData);
});

Template.myFriends.onRendered(function(){
  // $(".addUser").height($(window).height());
  $(window).scroll(function() {
    var calc =  $(window).scrollTop() / ($(document).height() - $(window).height()) * 100;
    // Session.set('scorllData', calc);
    // console.log( $(window).scrollTop(), $(document).height() - $(window).height());
    // if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
    if (calc > 70) {

      var infiCount = instance.infinityCount.get();
      instance.infinityCount.set(infiCount + 5);
    }
  });
});


Template.myFriends.events({
  "click [name=myDelfriend]": function(e, t){
    e.preventDefault();
    t.selectedIndex.set(e.currentTarget.id);
    t.selectedUser.set(this);
    // console.log(e);
    // console.log(e.currentTarget.children[0].id);
    // console.log(e.target);

    if(e.currentTarget.children[0].id === 'add'){
      Session.set('myFriends_addConfirmPageOpen', true);
    } else {
      Session.set('myFriends_deleteConfirmPageOpen', true);
    }

  },
  //보낸 친구요청 확인
  "click #reqUserList": function(e, t){
    e.preventDefault();

    if(t.reqFriendsCnt.get() === 0){
      var confrimData = {
        title : '보낸친구요청이 없습니다.',
        context : '',
        templateName : 'myFriends',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return;
    }

    var templateData = {};
    templateData.templateName = 'myFriends';
    // templateData.userIds = t.myRecFriendsId;
    templateData.isFrom = "receive"

    var template = {
      templateName : 'myFriendsResponse',
      header : false,
      data : templateData
    };
    Session.set("myPage_selectedTemplate", template);


    var template = {
      templateName : 'myPage',
      header : false,
    };
    Session.set("index_contentsTemplate", template);
  },
  //받은 친구요청 확인
  "click #resUserList": function(e, t){
    e.preventDefault();

    if(t.resFriendsCnt.get() === 0){
      var confrimData = {
        title : '받은친구요청이 없습니다.',
        context : '',
        templateName : 'myFriends',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return;
    }

    var templateData = {};
    templateData.templateName = 'myFriends';
    // templateData.userIds = t.myRecFriendsId;
    templateData.isFrom = "reponse"

    var template = {
      templateName : 'myFriendsResponse',
      header : false,
      data : templateData
    };
    Session.set("myPage_selectedTemplate", template);


    var template = {
      templateName : 'myPage',
      header : false,
    };
    Session.set("index_contentsTemplate", template);
  },
  'keypress #searchWord': function (e,t) {
    // e.preventDefault();
    if (e.which === 13) {
      var searchWord = $("#searchWord").val();
      if(!searchWord){
        searchMyFriends();
        return;
      }

      searchNameText();

      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
        Meteor.call('setLog', 'LG0034', Meteor.userId(),'', ''); //마이페이지 친구검색수행
      }
    }
  },
  //친구검색
  "click #searchFrdList" : function(e,t){
    var searchWord = $("#searchWord").val();
    if(!searchWord){
      searchMyFriends();
      return;
    }

    searchNameText();

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0034', Meteor.userId(),'', ''); //마이페이지 친구검색수행
    }
  },

  "click [name=cancleRecfriend]" : function(e,t){
    Meteor.call("delRelationReqFrien",this._id,function(err,res){
      if(err){
        console.log(err);
      }else{

        /////////////////todo 중복코딩//////////////////////////
        var searchWord = $("#searchWord").val();
        var options = {};

        Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
          if(err){
              console.log(err);
          }
          if(res){
            var resArr = [];
            resArr = _.pluck(res, 'userId');
            // res.forEach(function(val){
            //   resArr.push(val.userId);
            // });
            Meteor.call("findFriendUserList", searchWord, options, resArr,function(err,res){
              if(err){
                console.log(err);
              }
              if(res){
                // console.log(t.usersInfo.get());
                Session.set('friendsInfo', res);
                //count초기화
                countReFlesh();
              }
            });
          }
        });

        /////////////////////////////////////////////////

      }
    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0037', Meteor.userId(),'', ''); //마이페이지 친구요청 취소
    }
  },

  "click [name=addfriend]" : function(e,t){
    var targetId = this._id;
    var friendName = this.profile.name
    Meteor.call("addRelationFrien",this._id,function(err,res){
      if(err){
        console.log(err);
      }else{
        //////////////////fcm 전송부분 //////////////////
        var fcmCode = global.fcmHistoryCode();
        // Meteor.call('checkUpdateFcmHistory', [targetId], fcmCode.addFriend, "", function(err, res){
        //   if(err)console.log(err);
        //   if(res && res.length){
            Meteor.call("getTokenIds", [targetId], function(err,res){
              if(err)console.log(err);
              if(res && res.length){
                //fcm전송
                //여기서 res는 무조건 하나
                var sendObj = {
                  tokenId : res[0].fcmToken,
                  body : "친구요청이 있습니다. 지금 앱에서 확인해 보세요!",
                  title : "It's my story",
                  url : global.siteUrl +"/myPage/friends"
                }
                global.sendFcmMessage(sendObj);
              }
            });
        //   }
        // });
        /////////////////////// end fcm /////////////////////


        var confrimData = {
          title : friendName +'님에게 친구를 요청했습니다.',
          context : '',
          templateName : 'myFriends',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);

        $("#searchWord").val('');
        countReFlesh();
        searchMyFriends();

        // /////////////////todo 중복코딩//////////////////////////
        // var searchWord = $("#searchWord").val();
        // var options = {};
        //
        // Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
        //   if(err){
        //       console.log(err);
        //   }
        //   if(res){
        //     var resArr = [];
        //     res.forEach(function(val){
        //       resArr.push(val.userId);
        //     });
        //     Meteor.call("findFriendUserList", searchWord, options, resArr,function(err,res){
        //       if(err){
        //         console.log(err);
        //       }
        //       if(res){
        //         // console.log(t.usersInfo.get());
        //         Session.set('friendsInfo', res);
        //         //count초기화
        //         countReFlesh();
        //       }
        //     });
        //   }
        // });

        /////////////////////////////////////////////////
      }

    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0035', Meteor.userId(),'', ''); //마이페이지 친구요청
    }

  },
  "click [name=acceptRec]" : function(e,t){
    var friendName = this.profile.name
    Meteor.call("doAcceptFriend",this._id,function(err,res){
      if(err){
        console.log(err);
      }else{
        var confrimData = {
          title : friendName +'님과 친구가 되었습니다.',
          context : '',
          templateName : 'myFriends',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);

        $("#searchWord").val('');
        countReFlesh();
        searchMyFriends();

        /////////////////todo 중복코딩//////////////////////////
        // var searchWord = $("#searchWord").val();
        // var options = {};
        //
        // Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
        //   if(err){
        //       console.log(err);
        //   }
        //   if(res){
        //     var resArr = [];
        //     res.forEach(function(val){
        //       resArr.push(val.userId);
        //     });
        //     Meteor.call("findFriendUserList", searchWord, options, resArr,function(err,res){
        //       if(err){
        //         console.log(err);
        //       }
        //       if(res){
        //         // console.log(t.usersInfo.get());
        //         Session.set('friendsInfo', res);
        //         //count초기화
        //         countReFlesh();
        //       }
        //     });
        //   }
        // });
        //
        // /////////////////////////////////////////////////
      }

    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0036', Meteor.userId(),'', ''); //마이페이지 친구 수락
    }
  },
  "click #userProfile": function(e, t){
    t.selectedUser.set(this._id);
  }
  // "click .btn-select": function(e, t){
  //   e.preventDefault();
  //
  //   console.log(e.currentTarget);
  //   console.log(e.Target);
  //
  // }
});


Template.myFriends.helpers({
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpFriendsData: function(){
    // return Template.instance().friendsInfo.get();
    return Session.get('friendsInfo');
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
  hpAddConfirmPageOpen : function(){
    return Session.get('myFriends_addConfirmPageOpen');
  },
  hpDeteleConfirmPageOpen : function(){
    return Session.get('myFriends_deleteConfirmPageOpen');
  },
  // hpIsFriend : function(_type){
  //   var result = false;
  //   if(_type === 'FRD'){
  //     result = true;
  //   }
  //   return result;
  // },
  // hpCheckFriend : function(userId){
  //   if(Template.instance() && Template.instance().myFriendsId){
  //     return Template.instance().myFriendsId.indexOf(userId) !== -1;
  //   } else{
  //     return false;
  //   }
  // },
  hpInfinityCount : function(index){
    // console.log(index >= instance.infinityCount.get());
    return index >= instance.infinityCount.get();
  },
  //사용자 프로필 사진 클릭시 dropdown-toggle 표시
  hpSelectedUser : function(_userId){
    var result = false;
    if(_userId === Template.instance().selectedUser.get()){
      result = true;
    }
    return result;
  },
  hpDelFriendConfirmCallBack : function(_deleteUserInfo){
    delFriends(_deleteUserInfo)
  },
  hpReqFriendCnt : function(){
    return Template.instance().reqFriendsCnt.get();
  },
  hpResFriendCnt : function(){
    return Template.instance().resFriendsCnt.get();
  }
});

Template.myFriends.onDestroyed(function(){
  Session.set('friendsInfo', null);
});

function countReFlesh(){
  Meteor.call("getReceiveFriends",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      // var myRecFriendsId = [];
      // myRecFriendsId = _.pluck(res, 'userId');
      // $("#resFrienCount").text(myRecFriendsId.length);
      // instance.myRecFriendsId = [];
      // res.forEach(function(val){
      //   instance.myRecFriendsId.push(val.userId);
      // });
      // $("#resFrienCount").text(instance.myRecFriendsId.length);
      instance.resFriendsCnt.set(res.length);
      // $("#resFrienCount").text(res.length);
    }
  });
  //내가 추가한 리스트
  Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      instance.reqFriendsCnt.set(res.length);
      // $("#recFrienCount").text(res.length);
    }
  });
}
//내친구 검색
function searchMyFriends(){
  Meteor.call("getMyFriends",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){

      var friendsIds = [];
      friendsIds = _.pluck(res, 'userId');

      Meteor.call("getUserInfoByUid", friendsIds, function(err,res){
        if(err){

        }
        if(res){
          // console.log(res);
          res.forEach(function(val){
            val.responMe = false;
            val.type = false;
            val.myFrien = true;
          })
          //testonly
          // for(var i=0 ; i < 40 ; i++){
          //   res.push(res[0]);
          // }
          Session.set('friendsInfo', res);
        }
      });
    }
  });
}

//이름검색
function searchNameText(){
  var searchWord = $("#searchWord").val();
  var options = {};
  Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
    if(err){
        console.log(err);
    }
    if(res){
      var resArr = [];
      res.forEach(function(val){
        resArr.push(val.userId);
      });
      Meteor.call("findFriendUserList", searchWord, options, resArr,function(err,res){
        if(err){
          console.log(err);
        }
        if(res){
          // console.log(t.usersInfo.get());
          Session.set('friendsInfo', res);
        }
      });
    }
  });
}

function delFriends(_delUserInfo){
  Meteor.call("removeAcceptFriend", _delUserInfo._id,function(err,res){
    if(err){
      console.log(err);
    }else{
      $("html").removeClass('scroll-hidden');

      var searchWord = $("#searchWord").val();
      searchMyFriends();

      // Meteor.call("findRecFrienList",Meteor.userId(),function(err,res){
      //   if(err){
      //       console.log(err);
      //   }
      //   if(res){
      //     var resArr = [];
      //     res.forEach(function(val){
      //       resArr.push(val.userId);
      //     });
      //     Meteor.call("findFriendUserList", searchWord, options, resArr,function(err,res){
      //       if(err){
      //         console.log(err);
      //       }
      //       if(res){
      //         // console.log(t.usersInfo.get());
      //         Session.set('friendsInfo', null);
      //         setTimeout(function () {
      //           Session.set('friendsInfo', res);
      //         }, 1000);
      //
      //       }
      //     });
      //   }
      // });
    }
  });
  // 1. 로그 사용여부확인
  if(global.writeLog){
    //2. 로그 생성
    Meteor.call('setLog', 'LG0038', Meteor.userId(),'', ''); //마이페이지 친구삭제
  }
}
