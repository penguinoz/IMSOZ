import {global} from '/imports/global/global_things.js';
var templateName = "inheritanceToList";

var dragFlag = false;
var x, y, pre_x, pre_y;


Template.inheritanceToList.onCreated(function(){
  var instance = this;
  instance.inhToListData = new ReactiveVar();
  instance.nonUserinhListData = new ReactiveVar();
  instance.lastLetterUsers = new ReactiveVar();
  // instance.inhToListData.set(inhToListData);

  // 마지막편지를 받은 사용자 리스트 return 값 ['_id','_id'....]
  Meteor.call("getLastLetterUsers", Meteor.userId(), function(err, res){
    if(err){
      console.log(err);
    } else {
      instance.lastLetterUsers.set(res);
    }
  });

  Meteor.call("getSendInhList",Meteor.userId(),function(err,res){
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
            image : "/images/bg/blank_inheritance_img.png",
            profileImg : res[i].profile.profileImg,
            // letterId : res[i].letterId,
            // isExistLetter : res[i].isExistLetter,
            name : res[i].profile.name,
        };
        sassData.push(editDataForm);
      }

      instance.inhToListData.set(sassData);
    }
  });

  //비유져 조회
  getNonUserFc(instance);

  var navData ={
    type : 'IH',
    category:"addInheritor",
    prevTemplate : "inheritanceTo"
  };

  Session.set('navData', navData);
});

Template.inheritanceToList.onRendered(function(){
});

Template.inheritanceToList.helpers({
  hpInhListData: function(){
    return Template.instance().inhToListData.get();
  },
  hpIsExistLetter: function(_userId){
    if(_.contains(Template.instance().lastLetterUsers.get(), _userId))
    {
      return true;
    }
    return false;
  },
  hpNonUserInhListData : function(){
    return Template.instance().nonUserinhListData.get();
  }
});

Template.inheritanceToList.events({
  "click figure": function(e, t){
    e.preventDefault();

  },
  "click #delInhUser": function(e,t){
    e.preventDefault();
    if (confirm("상속인을 삭제 하시겠습니까?") == false) {
        return;
    }

    var letterId = this.letterId;
    Meteor.call("pullInhUser",this._id,function(err,res){
      if(err){
        console.log(err);
      }
      if(res){
        ////////////todo 새로고침 위에랑 중복코딩 추후 수정 //////////////
        Meteor.call("getSendInhList",Meteor.userId(),function(err,res){
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
                  image :  "/images/bg/blank_inheritance_img.png",
                  profileImg : res[i].profile.profileImg,
                  name : res[i].profile.name,
              };
              sassData.push(editDataForm);
            }

            t.inhToListData.set(sassData);
          }
        });
        //////////////////////////////////////////////////////////
        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
          Meteor.call('setLog', 'LG0028', Meteor.userId(),'', ''); //상속인 삭제
        }
      }
    });
  },
  //nonuser 삭제
  "click #delNonUserInhUser" : function(e, t){
    if (confirm("비회원 상속인을 삭제 하시겠습니까?") == false) {
        return;
    }
    Meteor.call("delNonUserInh", this._id, function(err,res){
      if(err) console.log(err);
      if(res){
        getNonUserFc(t);
      }
    })
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
  "click #note":function(e, t){
    var navData ={
      type : 'LL',
      subType :'LL0001',
      prevTemplate : "inheritanceTo",
      dateTitle : 'DT0001',
      editorTitle : '마지막편지',
      hint: {
        type: 'P',
        text: '소중한 사람에게 남기고 싶은 이야기를 작성해 보세요',
      },
      data : {
        inheritorId : this._id // 상속인 id
      }
    };
    Session.set('navData', navData);


    //작성해준 아이디

    if(_.contains(t.lastLetterUsers.get(), this._id)){
      //수정
      Meteor.call('getLetterId', Meteor.userId(), this._id, function(err, res){
        if(err){
          console.log(err);
        } else {
          Router.go('editStory',{_id: res._id},{replaceState: false});
          // 1. 로그 사용여부확인
          if(global.writeLog){
            //2. 로그 생성
            Meteor.call('setLog', 'LG0032', Meteor.userId(),'', ''); //마지막편지 수정
          }
        }
      });
      // Router.go('writeStory',{},{replaceState: false});
    } else {
      //신규
      Router.go('writeStory',{},{replaceState: false});
      // 1. 로그 사용여부확인
      if(global.writeLog){
        //2. 로그 생성
        Meteor.call('setLog', 'LG0031', Meteor.userId(),'', ''); //마지막편지 작성
      }
    }

  },
  //상속 클릭시
  "click .float-button a": function(e, t){
    e.preventDefault();
    //점수있는지 확인
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
       Meteor.call('setLog', 'LG0025', Meteor.userId(),'', ''); //상속하기 버튼 클릭
    }

    Meteor.call("getPoint",Meteor.userId(), 0, function(err,res){
      if(err)console.log(err);
      if(res){
        if(res.pointSum >= 1000){
          Router.go('addInheritor',{},{replaceState: false});
        }else{
          $('#myPointInfo').text(res.pointSum+" P");
          $('#pointPrevent').removeClass("display-none");
          $('.black-over').removeClass("display-none");
        }

      }
    });
  }
});


function getNonUserFc(ins){
  Meteor.call("getNonUserInhList",Meteor.userId(),function(err,res){
    if(err)console.log(err);
    if(res){
      var resArr = [];
      res.forEach(function(v){
        var pushObj = {
          image : "/images/bg/blank_inheritance_img.png",
          introduction : "",
          name : v.name,
          profileImg : "",
          _id : v._id
        }
        resArr.push(pushObj);
      })
      ins.nonUserinhListData.set(resArr);
    };
  });
}
