import {global} from '/imports/global/global_things.js';
var templateName = "inheritanceFromList";

var dragFlag = false;
var x, y, pre_x, pre_y;

var instance;
Template.inheritanceFromList.onCreated(function(){
  instance = this;
  instance.inhFromListData = new ReactiveVar();
  instance.lastLetterSenders = new ReactiveVar();
  Session.set("opneToglePamamSession",false);
  Session.set('inheritance_info_pop_show', false);


  fn_initAcceptInh();

  Meteor.call("getLastLetterInheritors", Meteor.userId(), function(err, res){
    if(err){
      console.log(err);
    } else {
      instance.lastLetterSenders.set(res);
    }
  });

  var navData ={
    type : 'IH',
    category:"insertIhCode",
    prevTemplate : "inheritanceFromList"
  };

  Session.set('navData', navData);
});

Template.inheritanceFromList.onRendered(function(){

});

Template.inheritanceFromList.helpers({
  hpInhListData: function(){
      return Template.instance().inhFromListData.get();
  },
  hpInhFromCodePopup:function(){
    return Session.get("opneToglePamamSession");
  },
  hpInPophInfo : function(){
    return Session.get('inheritance_info_pop_show');
  },
  hpInhCodeCallBack : function(){
    fn_initAcceptInh();
  },
  hpIsExistLetter: function(_senderId){
    if(_.contains(Template.instance().lastLetterSenders.get(), _senderId))
    {
      return true;
    }
    return false;
  },
});

Template.inheritanceFromList.events({
  "click figure": function(e, t){
    e.preventDefault();

  },
  //float버튼으로 처리했음
  "click .float-button a":function(e,t){
    e.preventDefault();

    if(!Meteor.userId()){
      //비유져 방지
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

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0053', Meteor.userId(),'', ''); //상속코드입력버튼 클릭
    }

    Session.set("opneToglePamamSession",true);

  },
  "mousedown .category-slide-wrap": function(e, t){
    dragFlag = true;
    var obj = $(".category-slide-wrap");
    x = obj.scrollLeft();
    y = obj.scrollTop();

    pre_x = e.screenX;
    pre_y = e.screenY;

    $(".category-slide-wrap").css("cursor", "pointer");


    // $('#result').text(dragFlag);
  },
  "mousemove .category-slide-wrap": function(e, t){
    if (dragFlag) {
      var obj = $(".category-slide-wrap");
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);

      //$('#result').text((x - e.screenX + pre_x) + "," + (y - e.screenY + pre_y));
      return false;
    }
  },
  "mouseup .category-slide-wrap": function(e, t){
    dragFlag = false;
    $(".category-slide-wrap").css("cursor", "default");
  },
  "click .profile" : function(e, t){
    //사망여부 체크
    var thisData = this;
    Meteor.call("checkIsPassAwayResMsg",this._id,function(err,res){
      if(err)console.log(err);
      if(res){
        if(res.isPassAway){
          var encId = global.fn_passCode(thisData._id, 'EC');
          // console.log(encId);
          global.fn_resetSession();
          // Session.set("timelineData",null);
          // Session.set('bucketListData',null);
          // Session.set("bucketListStatus", null);
          // Session.set("scrollPosition", null);
          Router.go('endingNoteVs', {_id:encId});
        }else{
          //위로 이동하면 끝

          //사망하지 않았으면 상속알림 메시지 창 띄우기
          var inhInfo = {
            title : "<span>It's my story</span><br/><br/>아직 상속시점이 도래하지 않았습니다.<br/>",
            context :   res.message,
            templateName : 'bucketDicDetail',
            profileImg : thisData.profileImg,
            name : thisData.name,
            // returnData : {
            //   type : 'complete',
            //   contentId : t.contentId,
            // },
            singleBtn : true,
            btnName : '확인'
          };
          Session.set('inheritance_info_pop_show', inhInfo);
        }
      }
    });
      //사망했으면 피상속인 엔딩노트 이동



  },
  "click #delInhUser" : function(e, t){
    // console.log(e);
    if (confirm("받은 상속인을 삭제 하시겠습니까?") == false) {
        return;
    }
    Meteor.call("pullMyInhData",this._id,function(err,res){
      if(err){
        console.log(err);
      }
/////////////////////////////todo reload 중복코딩/////////////////////////////
      Meteor.call("getAcceptInhIds",Meteor.userId(),function(err,res){
        if(err){
          console.log(err);
        }
        if(res){
          Meteor.call("getUserInfoByUid", res,function(err,res){
            if(err){
              console.log(err);
            }
            if(res){
              var sassData = [];
              for(var i=0; i<res.length ; i++){
                var editDataForm =
                {
                    _id:res[i]._id,
                    // introduction:res[i].profile.introduction,
                    //todo image 고정값
                    image : "/images/bg/blank_inheritance_img2.png",
                    profileImg : res[i].profile.profileImg,
                    name : res[i].profile.name,
                    isPassAway : res[i].profile.isPassAway
                };
                sassData.push(editDataForm);
              }

              t.inhFromListData.set(sassData);
              // console.log(t.usersInfo.get());
            }
          });
        }
      });
//////////////////////////////////////////////////////////////////////
    });
  },
  //마지막 편지 보기
  "click #note" : function(e, t){
    e.preventDefault();

    Meteor.call('getLetterId', this._id, Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
      } else {
        //마지막 편지 화면 이동
        Router.go('lastLetterDetail', {_id:result._id});
      }
    })
  }
});

Template.inheritanceFromList.onDestroyed(function(){
  Session.set("opneToglePamamSession",null);
  // Session.set('inhFromListData',null);
});

function fn_initAcceptInh(){
  Meteor.call("getAcceptInhIds",Meteor.userId(),function(err,res){
    if(err){
      console.log(err);
    }
    if(res){
      Meteor.call("getUserInfoByUid", res,function(err,res){
        if(err){
          console.log(err);
        }
        if(res){
          var sassData = [];
          for(var i=0; i<res.length ; i++){
            var editDataForm =
            {
                _id:res[i]._id,
                // introduction:res[i].profile.introduction,
                //todo image 고정값
                image : "/images/bg/blank_inheritance_img2.png",
                profileImg : res[i].profile.profileImg,
                name : res[i].profile.name,
                isPassAway : res[i].profile.isPassAway,
            };
            sassData.push(editDataForm);
          }

          instance.inhFromListData.set(sassData);
          // console.log(t.usersInfo.get());
        }
      });
    }
  });
}
