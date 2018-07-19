import {global} from '/imports/global/global_things.js';
Template.login.onCreated(function(){
  // if(Meteor.userId()){
  //   if(!Meteor.user().profile){
  //     console.log("top profile");
  //     Router.go('registrationSns',{},{replaceState: false});
  //     return;
  //   }
  //   Router.go('endingNote',{},{replaceState: false});
  // }
  // else{
  if(Meteor.userId()){
    Meteor.call("checkSNSUserProfile",function(err,res){
      if(!res){
          Meteor.logout();
      }
    });
  }


    Meteor.autorun(function () {
      if (Meteor.userId()) {
        if(window.webkit){
          // alert('애플')
          window.webkit.messageHandlers.updateUserId.postMessage(Meteor.userId());
        } else if(window.Android){
          // alert('안드로이드');
          Android.updateUserId(Meteor.userId());
        } else {
          // alert('브라우져');
        }
        // var mobile = (/iphone|ipad|ipod|android|diordna/i.test(navigator.userAgent.toLowerCase()));
        // alert('3 :' + navigator.userAgent.toLowerCase());
        // if (mobile) {
        //     var userAgent = navigator.userAgent.toLowerCase();
        //     if (userAgent.search("diordna") > -1 || userAgent.search("android") > -1) {
        //         /* android */
        //         Android.updateUserId(Meteor.userId());
        //     } else {
        //       window.webkit.messageHandlers.updateUserId.postMessage(Meteor.userId());
        //     }
        // }

        //소셜로그인 데이터 없는 유져
        // console.log("Meteor.user().profile :"+Meteor.user().profile);
        // if(!Meteor.user().profile){
          // console.log("not profile");
          // // Meteor.logout();
          // Router.go('registrationSns',{},{replaceState: true});
          // return;



          Meteor.call("checkSNSUserProfile",function(err,res){
            if(!res){
                Router.go('registrationSns',{},{replaceState: false});
            }else{

              Meteor.call('checkGuide', 'guide01', Meteor.userId(), function(error, result){
                if(error){
                  console.log(error);
                } else {
                  if(!result){
                    // 1. 로그 사용여부확인
                    if(global.writeLog){
                      //2. 로그 생성
                      Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', 'GD0001'); //가이드 시작
                    }
                    Router.go('guide',{num:'01'},{replaceState: true});
                  } else {
                    Router.go('endingNote',{},{replaceState: true});
                  }
                }
              });
            }
          });

        // } else {
        //   Meteor.call('checkGuide', 'guide01', Meteor.userId(), function(error, result){
        //     if(error){
        //       console.log(error);
        //     } else {
        //       global.fn_resetSession();
        //
        //       if(!result){
        //       // if(false){
        //         // 1. 로그 사용여부확인
        //         if(global.writeLog){
        //           //2. 로그 생성
        //           Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', 'endingNote'); //가이드 시작
        //         }
        //         Router.go('guide',{num:'01'},{replaceState: true});
        //       } else {
        //         // Router.go('bucketList',{menu:'my'},{replaceState: false});
        //         Router.go('endingNote',{},{replaceState: true});
        //
        //         //자동 로그아웃 확인용 세션
        //         global.selfLogout = false;
        //       }
        //
        //     }
        //   });
        // }

      }
    });
  // }
});

Template.login.onRendered(function(){
  var height = $(window).height();
  $(".login").css('min-height',height);
  // Accounts._loginButtonsSession.set('dropdownVisible', true);
});

Template.login.helpers({
  hpIsShow: function(){
    if(Meteor.settings.public.serverType === 'dev'){
      return true;
    } else {
      return false;
    }
  }
});

Template.login.events({
  'click #facebookLogin'(event) {
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email', 'user_birthday' ,'user_gender'  ]}, function(err,res){
        if (err) {
            console.log('Handle errors here: ', err);
        }
        console.log(res);

    });
  },
  'click #googleLogin'(event) {
    event.preventDefault();
    Meteor.loginWithGoogle({requestPermissions: ['email']}, function(err){
        if (err) {
            console.log('Handle errors here: ', err);
        }
    });
  },
  'click #kakaoLogin'(event) {
    event.preventDefault();
    Meteor.loginWithKakao({requestPermissions:['profile','account_email','gender','birthday']}, function(err){
        if (err) {
            console.log('Handle errors here: ', err);
        }
    });
  },
  // 'click button.log-out'(event) {
  //     event.preventDefault();
  //     Meteor.logout();
  // },
  "click #registration": function(e, t){
    e.preventDefault();

    Router.go("registration",{},{replaceState: false});
  },
  "click #findPasswd": function(e, t){
    e.preventDefault();

    Router.go("findPassword",{},{replaceState: false});
  },
  "click #findId": function(e,t){
    e.preventDefault();

    Router.go("findId",{},{replaceState: false});
  },
  "keyup #loginUserId, keyup #loginPassword": function(e, t){
    if(e.keyCode === 13){
      login();
    }
    if($("#loginUserId").val() === "facebooklogin"){
      $(".btn-facebook").removeClass("hidden");
      $(".btn-kakao").removeClass("hidden");
      // $("#googleLogin").removeClass("hidden");
      $("#sociallogin").removeClass("hidden");
    }
  },
  "click .btn-login": function(e, t){
    e.preventDefault();

    login();
  },
  // "click .sendEmail": function(e, t){
  //   e.preventDefault();
  //   Meteor.call("sendAllUserSMSMessage",function(err,res){
  //     if(err){
  //       console.log(err);
  //     }
  //   });
  // },
  "click #movePreview" : function(e,t){
    e.preventDefault();
    // Meteor.call("loginWithoutPass");
    Router.go('bucketList',{menu:'all'},{replaceState: false});
    // Router.go('endingNote',{},{replaceState: false});

  }
});

function login(){
  var userId  = $("#loginUserId").val().trim();
  var password  = $("#loginPassword").val();

  if(!userId){
    // alert('아이디를 입력해 주세요.');
    var confrimData = {
      title : '아이디를 입력해 주세요.',
      context : '',
      templateName : 'login',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    $("#loginUserId").focus();
    return;
  }

  if(!password){
    // alert('비밀번호를 입력해 주세요.');
    var confrimData = {
      title : '비밀번호를 입력해 주세요.',
      context : '',
      templateName : 'login',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    $("#loginPassword").focus();
    return;
  }

//todo 원래 틀리면 서버에 에러로그 남기나????

  Meteor.loginWithPassword(userId, password, function(err) {
    if(err){
      // alert('아이디와 비밀번호가 일치하지 않습니다.');
      var confrimData = {
        title : '아이디와 비밀번호가 일치하지 않습니다.',
        context : '',
        templateName : 'login',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else {
    }
  });
}


Accounts.onLogin(function () {
  //로그인 로그 작성
  // 1. 로그 사용여부확인
  if(global.writeLog){
    //2. 로그 생성
    Meteor.call('setLog', 'LG0001', Meteor.userId(),'IMS', '');
  }


});

// Tracker.autorun(function () {
//   if (Meteor.user()) {
//     Meteor.logoutOtherClients(function(){
//
//     });
//   }
// });


Accounts.onLogout(function () {
  global.fn_resetSession();
  // Session.set("timelineData",null);
  // Session.set('bucketListData',null);
  // Session.set("bucketListStatus", null);
  // Session.set("scrollPosition", null);
  if(window.webkit){
    // alert('애플')
    window.webkit.messageHandlers.disconnectFcmToken.postMessage("");
  } else if(window.Android){
    // alert('안드로이드');
    Android.disconnectFcmToken();
  } else {
    // alert('브라우져');
  }

  Router.go('login',{},{replaceState: false});
  // if(global.selfLogout === true){
  //   var confrimData = {
  //     title : '로그아웃 되었습니다.',
  //     context : '',
  //     templateName : 'login',
  //     returnData : null,
  //     singleBtn : true,
  //     btnName : '확인'
  //   };
  //
  //   Session.set('confrim_center', confrimData);
  // } else {
  //   var confrimData = {
  //     title : '다른 기기에서 로그인하여<br/>로그아웃 되었습니다.',
  //     context : '',
  //     templateName : 'login',
  //     returnData : null,
  //     singleBtn : true,
  //     btnName : '확인'
  //   };
  //
  //   Session.set('confrim_center', confrimData);
  // }


function loginCallbackFunc(){
}
});
