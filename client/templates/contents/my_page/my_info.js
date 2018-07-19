
import {global} from '/imports/global/global_things.js';
var instance

Template.myInfo.onCreated(function(){
  instance = this;
  instance.callSMSInterval = true;
  instance.authCheckData = ""
  instance.myInfoData=  new ReactiveVar();
  Session.set('confrim_center', false);

  // var myInfoData = {
  //   _id : '0120jf101j2f12f0j0',
  //   profileImg : '/images/common/icon_avata_img.png',
  //   userName : '박혜민',
  //   userId : 'ponysmakeup',
  //   phone : '010-4418-1234',
  //   email : 'pony@naver.com',
  //   birthDay : '1986.06.11',
  //   introduction : '안녕 난 박혜민이라고해'
  // };
  Meteor.call("getUserInfoByUidSocialData",Meteor.userId(),function(err,res){
    if(err){
      console.log(err);
    }
    if(res){
      var myInfoData = {
        _id : Meteor.userId(),
        profileImg : res.profile.profileImg,
        userName : res.profile.name,
        nickName : res.profile.nickName,
        userId : res.username,
        phone : res.profile.mobile,
        email : res.profile.email,
        birthDay : res.profile.birthday,
        introduction : res.profile.introduction,
        isSocialServices : res.isSocialServices
      };
      instance.myInfoData.set(myInfoData);
    }
  });
});

Template.myInfo.onRendered(function(){

});

Template.myInfo.helpers({
  hpMyinfoData: function(){
    return Template.instance().myInfoData.get();
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpConfirmCallBack: function(_callBack){

    if(window.webkit){
      // alert('애플')
      window.webkit.messageHandlers.disconnectFcmToken.postMessage(Meteor.userId());
    } else if(window.Android){
      // alert('안드로이드');
      Android.disconnectFcmToken();
    } else {
      // alert('브라우져');
    }

    // var mobile = (/iphone|ipad|ipod|android|diordna/i.test(navigator.userAgent.toLowerCase()));
    //
    // if (mobile) {
    //     var userAgent = navigator.userAgent.toLowerCase();
    //     if (userAgent.search("diordna") > -1 || userAgent.search("android") > -1) {
    //         /* android */
    //           // console.log('tokenup');
    //           Android.disconnectFcmToken();
    //     } else {
    //       window.webkit.messageHandlers.disconnectFcmToken.postMessage(Meteor.userId());
    //     }
    // }
    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0002', Meteor.userId(),'', ''); //로그아웃
    }
    //자동 로그아웃 확인용 세션

    global.logout();
  },
});

Template.myInfo.events({
  // "click #saveMyInfo": function(e, t){
  //   e.preventDefault();
  //   var passw = $("#password").val();
  //   var passconf = $("#passwordConfirm").val()
  //   var introd = $("#introText").val();
  //
  //   var editPrfObj = {};
  //   editPrfObj.introduction = introd;
  //
  //   function checkValid(re, tar, msg){
  //           if(re.test(tar.val())) return true;
  //           var confrimData = {
  //             title : msg,
  //             context : '',
  //             templateName : 'myInfo',
  //             returnData : null,
  //             singleBtn : true,
  //             btnName : '확인'
  //           };
  //           Session.set('confrim_center', confrimData);
  //           // alert(msg);
  //           // tar.value="";
  //           tar.focus();
  //           return false;
  //   }
  //   if (!checkValid( /^[A-za-z0-9]{5,15}$/g,$('#password'),"영문+숫자 8~30자를 입력해 주세요")){
  //     return false;
  //   }
  //
  //   if(passw || passconf){
  //     if(passw === passconf){
  //       editPrfObj.password = passw;
  //     }else{
  //       // alert("비밀번호가 일치하지 않습니다.");
  //       var confrimData = {
  //         title : '비밀번호가 일치하지 않습니다.',
  //         context : '',
  //         templateName : 'myInfo',
  //         returnData : null,
  //         singleBtn : true,
  //         btnName : '확인'
  //       };
  //       Session.set('confrim_center', confrimData);
  //       return;
  //     }
  //   }
  //   Meteor.call("editUserProfile",editPrfObj,function(err,res){
  //     if(err){
  //       console.log(err);
  //     }
  //     if(res){
  //       Router.go('login',{},{replaceState: false});
  //     }
  //
  //   });
  //
  // },
  "click .edit-img": function(e, t){
    e.preventDefault();
  },
  "click .profile-img": function(e,t){
    e.preventDefault();

    var template = {
      templateName : 'editProfileImage',
      header : false,
      data : {
        fromTemp : "myInfo",
        profileImg : t.myInfoData.get().profileImg
      }
    };

    Session.set("index_contentsTemplate", template);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0006', Meteor.userId(),'MY', ''); //프로필 사진 변경 클릭
    }
  },
  "click .txt-readonly" : function(e, t){
    var divArrs = ["introTextDiv","passwordDiv","phoneDiv","emailDiv","nickNameDiv","birthDayDiv"];
    if(t.myInfoData.get().isSocialServices){
      divArrs.splice(1,1)
    }
    for(var i=0; i<divArrs.length ; i++){
      if($("#"+divArrs[i]).attr("class").search("hidden") >= 0){
        $("#"+divArrs[i]).removeClass("hidden");
        $("#"+divArrs[i]+"Edit").addClass("hidden");
      };
    }
    var targetId = e.currentTarget.id;
    $("#"+targetId).addClass("hidden");
    $("#"+targetId+"Edit").removeClass("hidden");
  },
  "click .my-info-edit" : function(e, t){
    if(e.target.id === "closeEdit"){
      var targetId = e.currentTarget.id;
      targetId = targetId.replace("Edit","");
      $("#"+targetId).removeClass("hidden");
      $("#"+targetId+"Edit").addClass("hidden");
    }
  },
  "click #checkPhoneAuth" : function(e, t){
    if(!t.callSMSInterval){
      // console.log("return");
      return;
    }
    var phoneNum = $('#phoneEdit').val()
    if (!checkValid( /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,$('#phoneEdit'),"휴대폰 번호가 정확하지 않습니다.")){
      return false;
    }
    Meteor.call("callSMSAuth", phoneNum, true ,function(err,res){
      if(err)console.log(err);;
      if(res){
        if(res === "isThere"){
          // alert("이미 등록되어있는 핸드폰 입니다.");
          var confrimData = {
            title : '이미 등록 된 번호입니다.',
            context : '',
            templateName : 'myInfo',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        }else{
          t.authCheckData = res;
          sendSMSTime();
        }
      }
    });
    $("#checkPhoneAuth").css("color", "#b7b7b7");
    t.callSMSInterval = false;
    setTimeout(function(){
      t.callSMSInterval = true;
      $("#checkPhoneAuth").css("color", "#ff6960");
    }, 6000);
  },
  //폰번호 수정
  "click #phoneEditSave" : function(e, t){
    if(!t.authCheckData){
      // alert("인증번호가 아직 발송되지 않았습니다.");
      var confrimData = {
        title : '인증번호가 아직 발송되지 않았습니다.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    var checkPhoneAuthNum = $("#phoneAuthCode").val();
    var requestPhoneNum = $('#phoneEdit').val();

    if(checkPhoneAuthNum !== t.authCheckData.authNum){
      // alert("인증번호가 올바르지 않습니다.");
      var confrimData = {
        title : '인증번호가 올바르지 않습니다',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    if(requestPhoneNum !== t.authCheckData.phoneNum){
      // alert("인증요청한 번호가 다릅니다.");
      var confrimData = {
        title : '인증번호를 확인해주세요.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    if(!timeLimit){
      // alert("인증시간이 초과하였습니다.")
      var confrimData = {
        title : '인증확인 시간이 만료되었습니다.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    clearInterval(x);
    timeLimit = false;
    // document.getElementById("phoneAuthInput").placeholder = "";
    // alert('인증 성공!');
    //최종 입력번호와 인증번호비교 위함
    Meteor.call("editPhoneNumber",requestPhoneNum,function(err, res){
      if(err)console.log(err);
        $("#phoneDiv").removeClass("hidden");
        $("#phoneDivEdit").addClass("hidden");
        reloadMyinfo()
    });
    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'PHONE'); //내 정보 수정
    }
  },
  "click #savePassword" : function(e, t){
    var newpass = $("#passworEdit").val();
    if (!checkValid( /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,30}$/,$("#passworEdit"),"비밀번호는 영문과 숫자를 포함한 8~30자를 입력해 주세요")){
      return false;
    }
    if($("#passworEdit").val() !== $("#passworEditCheck").val()){
      // alert("입력한 비밀번호가 다릅니다.");
      var confrimData = {
        title : '입력한 비밀번호가 다릅니다.',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }else{
      Meteor.call("userPassChange",Meteor.userId(),newpass,function(err,res){
        if(err){
          console.log(err);
        }else{
          // alert('비밀번호 변경완료');
          var confrimData = {
            title : '비밀번호가 변경되었습니다.',
            context : '',
            templateName : 'myInfo',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);

          // 1. 로그 사용여부확인
          if(global.writeLog){
            //2. 로그 생성
             Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'PASSWORD'); //내 정보 수정
          }
          return;
        }

      });
    }
  },
  "click #saveEmailInfo" : function(e, t){
    if (!checkValid(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,$("#emailEdit"),"이메일 형태를 확인해 주세요.")){
      return false;
    }
    Meteor.call("editEmailInfo",$("#emailEdit").val(),function(err,res){
      if(err){
        console.log(err);
      }else{
        $("#emailDiv").removeClass("hidden");
        $("#emailDivEdit").addClass("hidden");
        reloadMyinfo()
      }
    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'EMAIL'); //내 정보 수정
    }
  },
  "click #saveIntroText" : function(e, t){
    var introText = $("#introTextEdit").val();
    Meteor.call("updateUserIntro", introText,function(err,res){
      if(err)console.log(err);
      $("#introTextDiv").removeClass("hidden");
      $("#introTextDivEdit").addClass("hidden");
      reloadMyinfo()
    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'INTRODUCE'); //내 정보 수정
    }
  },
  "click #saveNickNameInfo" : function(e, t){
    var nickNameText = $("#nickNameEdit").val();
    Meteor.call("updateUserNickName", nickNameText,function(err,res){
      if(err)console.log(err);
      if(res){
        $("#nickNameDiv").removeClass("hidden");
        $("#nickNameDivEdit").addClass("hidden");
        reloadMyinfo()
      }else{
        var confrimData = {
          title : '중복된 닉네임 입니다.',
          context : '',
          templateName : 'myInfo',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
      }

    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'NICKNAME'); //내 정보 수정
    }
  },
  "click #saveBirthDayInfo" : function(e, t){
    // var birthDayData = $("#birthDayEdit").val();
    var birthDayData = $("#mDate").val();
    Meteor.call("updateUserBirthDay", birthDayData,function(err,res){
      if(err)console.log(err);
        $("#birthDayDiv").removeClass("hidden");
        $("#birthDayDivEdit").addClass("hidden");
        reloadMyinfo()
    });

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0008', Meteor.userId(),'MY', 'BIRTH'); //내 정보 수정
    }
  },
  // "click #logout": function(e, t){
  //   e.preventDefault();
  //
  //   //confrim창 열가
  //   var confrimData = {
  //     title : '로그아웃 하시겠습니까?',
  //     context : '',
  //     templateName : 'myInfo',
  //     returnData : Meteor.userId(),
  //     singleBtn : false,
  //     btnName : ''
  //   };
  //
  //   Session.set('confrim_center', confrimData);
  //   // t.removeConfirmData.set(confrimData);
  //
  //
  // },
});

function checkValid(re, tar, msg){
        if(re.test(tar.val())) return true;
        var confrimData = {
          title : msg,
          context : '',
          templateName : 'myInfo',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };
        Session.set('confrim_center', confrimData);
        // alert(msg);
        // tar.value="";
        tar.focus();
        return false;
}
//////////////////////// countdown ////////////////////////////////////
var x;
var timeLimit = false;
function sendSMSTime(){

  var countDownDate = new Date().getTime() + 3*60000;
  if(x){
    clearInterval(x);
  }
  timeLimit = true;
  x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"d
    // document.getElementById("phoneAuthInput").placeholder = minutes + "분 " + seconds + "초 ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        timeLimit = false;
        // document.getElementById("phoneAuthInput").placeholder = "";
    }
  }, 1000);
}
/////////////////////////////////////////////////////////////////////////

function reloadMyinfo(){
  Meteor.call("getUserInfoByUid",[Meteor.userId()],function(err,res){
    if(err){
      console.log(err);
    }
    if(res){
      if(!res.length){
        return;
      }
      var myInfoData = {
        _id : Meteor.userId(),
        profileImg : res[0].profile.profileImg,
        userName : res[0].profile.name,
        nickName : res[0].profile.nickName,
        userId : res[0].username,
        phone : res[0].profile.mobile,
        email : res[0].profile.email,
        birthDay : res[0].profile.birthday,
        introduction : res[0].profile.introduction
      };
      instance.myInfoData.set(myInfoData);
    }
  });
}


function showToken(currentToken) {
  // Show token in console and UI.
  var tokenElement = document.querySelector('#email');
  tokenElement.textContent = currentToken;
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function updateUIForPushPermissionRequired() {
  showHideDiv(tokenDivId, false);
  showHideDiv(permissionDivId, true);
}

function showHideDiv(divId, show) {
  const div = document.querySelector('#' + divId);
  if (show) {
    div.style = 'display: visible';
  } else {
    div.style = 'display: none';
  }
}
