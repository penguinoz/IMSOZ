import {global} from '/imports/global/global_things.js';
Template.sharedUser.onCreated(function(){
  var instance = this;
  instance.isSelected = new ReactiveVar("imsUser");
  instance.contentd = this.data;

  instance.usersInfo = new ReactiveVar();
  instance.selectedUser = new ReactiveVar([]);
  instance.preTempUser = [];
  instance.deletedUser = [];

  if(Session.get('editor_addUserList')){
    instance.selectedUser.set(Session.get('editor_addUserList'));
    instance.preTempUser = _.pluck(Session.get('editor_addUserList'),'_id');
  }

  Meteor.call("getSearchMyFriends",Meteor.userId(), '',function(err,res){
    if(err){
      console.log(err);
    }else{
      instance.usersInfo.set(res);
    }
  });
});

Template.sharedUser.events({
  "click #backsharedUser": function(e, t){
    e.preventDefault();

    Session.set('editor_shared_user_show',false);
  },
  "click .btn-select": function(e, t){
    e.preventDefault();

    var tempUser = [];
    var tempUserId = _.pluck(t.selectedUser.get(), '_id');

    var userData = {
      _id : this._id,
      username : this.username,
      profileImg : this.profile.profileImg,
      name : this.profile.name,
      nickName : this.profile.nickName,
    };

    if(_.contains(tempUserId, userData._id)){
      //제외
      tempUser = global.fn_removeObjInArr(t.selectedUser.get(), '_id', userData._id);

      //기존 유져에 포함되어 있다면, 데이터 삭제 대상으로 추가
      if(_.contains(t.preTempUser, userData._id)){
        t.deletedUser.push(userData._id);
      }
    } else {
      //포함
      tempUser = t.selectedUser.get();
      tempUser.push(userData);
    }

    t.selectedUser.set(tempUser);
  },
  //확인버튼
  "click .confirm" : function(e, t){
    if(t.selectedUser.get().length === 0){
      // alert('대상을 선택해 주세요');
      var confrimData = {
        title : '대상을 선택해 주세요',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else {

      //나도 그룹에 넣는다.
      var groupUsers = _.pluck(t.selectedUser.get(),'_id');
      groupUsers.push(Meteor.userId());

      //정보 생성
      // var userInfo = t.selectedUser.get();

      //새로운 유져 =  현재선택유져에서 기존 유져를 제외
      var newUserInfo = _.reject(t.selectedUser.get(), function(item){return _.contains(t.preTempUser, item._id);});



      var contentId = t.contentd;
      var toDate = global.fn_dateFormat(new Date()).HMS;

      //내 데이터 수정 (공유자 추가)
      var data = {
        updateDate : toDate,
        isSend : true,
        groupUsers : groupUsers,
        deleted : false,
      };

      Meteor.call('updateSharedData', data, contentId, function(error, result){
        if(error){
          console.log(error);
        } else {

        }
      });


      if(t.deletedUser && t.deletedUser.length > 0){
        //지워야할 데이터의 contentIds를 구해야함
        Meteor.call('getSharedData', contentId, t.deletedUser, function(error, result){
          if(error){
            console.log(error);
          } else {
            //result = ['sss','ddddd','bbbb'];
            //구한 ID를 가지고 데이터 삭제
            Meteor.call('removeSharedData', result, function(error, result){
              if(error){
                console.log(error);
              }
            });
          }
        });
      }

      //새로선택된 친구데이터만 등록
      if(newUserInfo && newUserInfo.length > 0){
        //선택된 사용자들에게 해당 컨텐츠 생성
        Meteor.call('getContentData', t.contentd, function(error, result){
          if(error){
            console.log(error);
          } else {

            // var contentData = result;

            var subType = result.subType;
            //result 내가 작성한글 >>>> 2명의 글을 작성 >>>
            var sharedData = [];
            _.each(newUserInfo, function(item){
              var contentData = {};
              contentData.parentId = contentId;

              contentData.userId = item._id;
              contentData.groupUsers = groupUsers;
              contentData.isSend = false;
              contentData.regDate = toDate;
              contentData.updateDate = toDate;
              contentData.deleted = false;
              contentData.dateTitle = result.dateTitle;
              contentData.profileEtc  = result.profileEtc;
              contentData.type = result.type;
              contentData.subType = result.subType;
              contentData.mDate = result.mDate;
              contentData.lock = result.lock;
              contentData.title = result.title;
              contentData.context = result.context;
              contentData.images = result.images;
              contentData.tagList = result.tagList;
              contentData.bucketId = result.bucketId;
              contentData.targetId = result.targetId ? result.targetId : undefined;

              sharedData.push(contentData);
            });




            //여러 로우를 한꺼번에 넣을 수 있게끔 수정
            Meteor.call('setSharedDatas', sharedData, function(error, result){
              if(error){
                console.log(Error);
              }else {


                //공유 알림
                var fcmInfo = result;
                var fmcInfoCnt = fcmInfo.length;
                // 나머지 친구들에게 알림을 보낸다 ()
                _.map(fcmInfo, function(_item, _index){
                  var item = _item;
                  var index = _index;
                  if(Meteor.userId() !== item.userId){
                    Meteor.call("getTokenIds", [item.userId], function(err,res){
                      if(err)console.log(err);
                      if(res && res.length){
                        //fcm전송
                        //여기서 res는 무조건 하나
                        var sendObj = {
                          tokenId : res[0].fcmToken,
                          body : "친구가 글을 공유했습니다. 앱에서 확인하세요",
                          title : "It's my story",
                          url : global.siteUrl +"/story/detail/"+item._id
                        };
                        // console.log('여러명 친구 : ',sendObj);
                        global.sendFcmMessage(sendObj);

                        // console.log(index, fmcInfoCnt);
                        if((index + 1) === fmcInfoCnt){
                          Session.set('editor_shared_user_show',false);
                          Session.set('editor_addUserList', null);
                          global.fn_resetSession();
                          // Session.set("timelineData",null);
                          // Session.set('bucketListData',null);
                          // Session.set("bucketListStatus", null);
                          // Session.set("scrollPosition", null);
                        }
                      }
                    });

                  }
                });

                //화면 전환
                // 상세 화면으로 이동
                // Router.go("contentDetail", {_id: t.contentd},{replaceState: false});
                //친구들에게 공유되었습니다. 알림 표시
                var confrimData = {
                  title : '친구들에게 해당 컨텐츠가 공유되었습니다.',
                  context : '',
                  templateName : 'contentDetail',
                  returnData : null,
                  singleBtn : true,
                  btnName : '확인'
                };
                Session.set('confrim_center', confrimData);

                // 1. 로그 사용여부확인
                if(global.writeLog){
                  //2. 로그 생성
                  Meteor.call('setLog', 'LG0049', Meteor.userId(), '', subType); //공유
                }
                // location.href="/story/detail/" + contentId;
              }

            });
          }
        });
      } else {
        Session.set('editor_shared_user_show',false);
        Session.set('editor_addUserList', null);
        global.fn_resetSession();
        // Session.set("timelineData",null);
        // Session.set('bucketListData',null);
        // Session.set("bucketListStatus", null);
        // Session.set("scrollPosition", null);
      }
    }
  },
  "click #searchFrdList" : function(e,t){
    var searchWord = $("#searchWord").val();
    var options = {};
    Meteor.call("getSearchMyFriends",Meteor.userId(), searchWord,function(err,res){
      if(err){
        console.log(err);
      }else{
        t.usersInfo.set(res);
      }
    });
  },
  'keypress #searchWord': function (e,t) {
    // e.preventDefault();
    if (e.which === 13) {
      var searchWord = e.currentTarget.value;
      // console.log(searchWord);
      var options = {};
      Meteor.call("getSearchMyFriends",Meteor.userId(), searchWord,function(err,res){
        if(err){
          console.log(err);
        }else{
          t.usersInfo.set(res);
        }
      });
    }
  },
  'click .remove-user' : function(e, t){
    var tempUser = [];
    var userData = {
      _id : this._id,
      username : this.username,
      profileImg : this.profileImg,
      name : this.name,
    };
    tempUser = global.fn_removeObjInArr(t.selectedUser.get(), '_id', userData._id);

    //기존 유져에 포함되어 있다면, 데이터 삭제 대상으로 추가
    if(_.contains(t.preTempUser, userData._id)){
      t.deletedUser.push(userData._id);
    }

    t.selectedUser.set(tempUser);
  }
});

Template.sharedUser.helpers({
  hpSelected: function(_menu){
    var result = false;
    if(_menu === Template.instance().isSelected.get()){
      result = true;
    }
    return result;
  },
  hpSelectedUserInfo: function(){
    return Template.instance().selectedUser.get();
  },
  hpSearchResult: function(){
    return Template.instance().usersInfo.get();
  },
  hpSelect: function(_userId){
    var result = false;
    var tempUserId = _.pluck(Template.instance().selectedUser.get(), '_id');
    if(_.contains(tempUserId, _userId)){
      result = true;
    }
    return result;
  }
});

Template.sharedUser.onDestroyed(function(){
  Session.set('editor_addUserList',null);
});
