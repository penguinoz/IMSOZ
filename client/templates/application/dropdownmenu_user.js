import {global} from '/imports/global/global_things.js';
var templateName = 'dropdownmenuUser';

Template.dropdownmenuUser.onCreated(function(){
  var instance = this;
  instance.userId = new ReactiveVar();
  instance.userId.set(this.data.userId); //선택된 스토리의 작성자 Id
  instance.relation = new ReactiveVar();
  instance.writeCapsule = new ReactiveVar(false);
  instance.relation = new ReactiveVar();
  instance.isShow = new ReactiveVar(true);
  Session.set('confrim_center', false);
  var relation = {};

  if(Meteor.userId()){
    if(Meteor.userId() === instance.userId.get()){
      instance.isShow.set(false);
    } else {
      Meteor.call('getRelation', Meteor.userId(), function(error, result){
        if(error){
          console.log(error);
        } else {
          //풍선에 표시될 값 설정
          if(_.contains(_.pluck(result.accept, 'userId'), instance.userId.get())){
            //친구 (엔딩노트(활성) | 친구(비활성))
            relation = {
              type : 'FRN',
              enable : false,
              value : '친구'
            };
            instance.relation.set(relation);
            instance.writeCapsule.set(true);

          } else if(_.contains(_.pluck(result.request, 'userId'), instance.userId.get())){
            //요청중 (엔딩노트(비활성) | 요청중(비활성))
            relation = {
              type: 'FRQ',
              enable : false,
              value : '친구요청중'
            };
            instance.relation.set(relation);

          } else if(_.contains(_.pluck(result.receive, 'userId'), instance.userId.get())){
            //요청받음 (엔딩노트(비활성) | 수락(활성))
            relation = {
              type: 'FRP',
              enable : true,
              value : '친구수락'
            };
            instance.relation.set(relation);

          } else {
            // 없는경우 (그외 > 엔딩노트(비활성) | 친구요청(활성))
            relation = {
              type: 'NFR',
              enable : true,
              value : '친구요청'
            };
            instance.relation.set(relation);

          }
        }
      });
    }
  } else {
    relation = {
      type: 'NAN',
      enable : false,
      value : '친구요청'
    };
    instance.relation.set(relation);
  }

});

Template.dropdownmenuUser.helpers({
  hpWriteCapsule: function(){
    return Template.instance().writeCapsule.get();
  },
  hpRelation : function(){
    return Template.instance().relation.get();
  },
  hpIsShow: function(){
    return Template.instance().isShow.get();
  },
  hpConfrimData : function(){
  return Session.get('confrim_center');
},

});

Template.dropdownmenuUser.events({
  "click .wirte-time-capsule": function(e, t){
    e.preventDefault();
    if(Meteor.userId()){
      if(t.relation.get().type === 'FRN'){
        //친구일 경우만 페이지 이동
        // console.log('친구');
        // var encId = global.fn_passCode(t.userId.get(), 'EC');
        // console.log(encId);
        // Session.set("timelineData",null);
        // Session.set('bucketListData',null);
        // Session.set("bucketListStatus", null);
        // Session.set("scrollPosition", null);
        //
        // Session.set("timelineDataVs",null);
        // Session.set('bucketListDataVs',null);
        // Session.set("bucketListStatusVs", null);
        // Session.set("scrollPositionVs", null);
        //
        // Router.go('endingNoteVs', {_id:encId},{replaceState: false});

        Meteor.call('getProfileData', t.userId.get(), function(error, result){
          if(error){

          } else {
            // console.log(result);
            // console.log(Session.get('navData'));
            var navData = Session.get('navData');
            navData.type = 'TC';
            navData.subType = 'TC0002';

            var data = {
              _id : result.userId,
              username : result.loginId,
              profileImg : result.profileImg,
              name : result.name,
            };

            Session.set('editor_addUserList', [data]);
            Session.set('navData', navData);
            Router.go("writeStory",{},{replaceState: false});
          }
        });

      } else {
        //친구아 아닌경우 alert 띄우고 친구 요청 하라는 메시지 표시
        // alert('친구의 엔딩노트만 방문 할 수 있습니다.');
        var confrimData = {
          title : '친구에게만 타임캡슐을 보낼 수 있습니다.',
          context : '',
          templateName : 'dropdownmenuUser',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };


        Session.set('confrim_center', confrimData);
      }
    } else {
      // alert('로그인이 필요한 기능입니다.');
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
  },
  "click .relation-info": function(e, t){
    e.preventDefault();
    if(Meteor.userId()){
      //수락, 친구요청일 경우에만 기능 동작
      var type = t.relation.get().type;
      switch(type){
        case 'FRP':
        //친구수락 처리
        Meteor.call("doAcceptFriend",t.userId.get(),function(err,res){
          if(err){
            console.log(err);
          }else{
            relation = {
              type : 'FRN',
              enable : false,
              value : '친구'
            };
            t.relation.set(relation);
            t.endingNote.set(true);

            var confrimData = {
              title : '친구수락 하였습니다',
              context : '',
              templateName : 'dropdownmenuUser',
              returnData : null,
              singleBtn : true,
              btnName : '확인'
            };


            Session.set('confrim_center', confrimData);

            // alert('친구수락 하였습니다.');
          }
        });
        break;
        case 'NFR':
          //친구요청 처리
          Meteor.call("addRelationFrien",t.userId.get(),function(err,res){
            if(err){
              console.log(err);
            } else {

              relation = {
                type: 'FRQ',
                enable : false,
                value : '친구요청중'
              };
              t.relation.set(relation);

              var confrimData = {
                title : '친구요청 하였습니다',
                context : '',
                templateName : 'dropdownmenuUser',
                returnData : null,
                singleBtn : true,
                btnName : '확인'
              };


              Session.set('confrim_center', confrimData);
              // alert('친구요청 하였습니다.');
            }
          });
        break;
        default:
        //아무것도 하지 않는다.
        return;
      }
    } else {
      // alert('로그인이 필요한 기능입니다.');
      var confrimData = {
        title : '로그인 후에 사용가능합니다.',
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
  },
});
