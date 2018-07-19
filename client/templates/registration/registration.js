
Template.registration.onCreated(function(){
  this.idChecked = false;
  this.phonAuthCheckComp = false
  this.userPhoneNum = "";
  this.callSMSInterval = true;
});

Template.registration.onRendered(function(){
  $(window).scrollTop(0);
  var height = $(window).height();
  $(".registration").height(height);
});

Template.registration.events({
  "click .back": function(e, t){
    e.preventDefault();

    var template = {
      templateName : 'registrationTerms',
      header : false
    };
    Session.set("index_contentsTemplate", template);
    // window.history.back();
    // Router.go('login',{},{replaceState: false});

  },
  //id 중복확인
  "focusout #userIdInput": function(e, t){
    var user = e.target.value;
    //아이디 중복확인
    // console.log('focusout');
    Meteor.call("joinUserInfo",user,function(err,res){
      if(err){
        console.log(err);
      }else{
        if(res){
          // todo 보여주늠 방식 수정 필요
          t.idChecked = false;
          // alert("사용중인 아이디 입니다.");
          var confrimData = {
            title : '사용중인 아이디 입니다.',
            context : '',
            templateName : 'registration',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
          return;
        }else{
          t.idChecked = true;
        }

      }
    });
  },

  "click #registNextPage":function(e,t){
    function checkValid(re, tar, msg){
            if(re.test(tar.val().trim())) return true;
            // alert(msg);
            var confrimData = {
              title : msg,
              context : '',
              templateName : 'registration',
              returnData : null,
              singleBtn : true,
              btnName : '확인'
            };

            Session.set('confrim_center', confrimData);
            // tar.value="";
            tar.focus();
            return false;
    }

    ////////////////////////////////유효성////////////////////////
    //id check
    var userId = $('.name input');
    var password = $('.password input');
    if (!checkValid(/[\D]/,$('.name input'),"영문이 포함되어야 합니다.")){
      return false;
    }
    if (!checkValid(/^[a-zA-Z0-9]{3,11}$/,$('.name input'),"아이디는 공백없이 영문 또는 영문 + 숫자 4~12자를 입력해 주세요")){
      return false;
    }

    //아이디 확인
    if(!t.idChecked){
      var confrimData = {
        title : '사용중인 아이디 입니다.',
        context : '',
        templateName : 'registration',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
    }



    //pass sinc
    var passwordCheck = $('.password-check input').val();
    if(password.val() !== passwordCheck){
      $('.password-check input').focus();
      // alert("비밀번호가 일치하지 않습니다.");
      var confrimData = {
        title : '비밀번호가 일치하지 않습니다.',
        context : '',
        templateName : 'registration',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);

      return false;
    }



    //pass check
    if (!checkValid( /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{5,30}$/,$('.password input'),"비밀번호는 영문과 숫자를 포함한 8~30자를 입력해 주세요")){
      return false;
    }


    //이름 확인
    if (!checkValid(/^[가-힣|a-z|A-Z|\*]+$/,$("#userName"),"이름은 한글/영문 만 가능합니다.")){
      return false;
    }

    // 임시 (튜토리얼 진행 후 제거항목)//////////////////////////////////////////////////////////////////////////////////////////////
    //닉네임 확인
    if (!checkValid(/^[가-힣|a-z|A-Z|0-9|\*]+$/,$("#userNickName"),"닉네은 한글/영문/숫자 만 가능합니다.")){
      return false;
    }

    //생일 확인
    // if(!$('#birthDay').val().trim()){
    if(!$('#mDate').val().trim()){
      // alert("모바일 인증이 필요합니다!");
      var confrimData = {
        title : '생일을 입력해주세요.',
        context : '',
        templateName : 'registration',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return false;
    }
    // 임시 (튜토리얼 진행 후 제거항목)//////////////////////////////////////////////////////////////////////////////////////////////


    //이메일 확인
    if (!checkValid(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,$("#email"),"이메일 형태를 확인해 주세요.")){
      return false;
    }

    //phone check
    if(!t.phonAuthCheckComp){
      // alert("모바일 인증이 필요합니다!");
      var confrimData = {
        title : '모바일 인증이 필요합니다.',
        context : '',
        templateName : 'registration',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return false;
    }
    if(t.userPhoneNum !== $('.phone input').val()){
      // alert("인증받은 휴대폰 번호와 다릅니다.")
      var confrimData = {
        title : '인증받은 휴대폰 번호와 다릅니다.',
        context : '',
        templateName : 'registration',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return false;
    }
    if (!checkValid( /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,$('.phone input'),"휴대폰 번호가 정확하지 않습니다.")){
      return false;
    }
    //////////////////////////////////////////////////////////////


    // console.log(regData);
    // var template = {
    //   templateName : 'registrationSub',
    //   header : false,
    //   data : regData
    // };
    // Session.set("index_contentsTemplate", template);

    // regData = {
    //   userId : $('.name input').val().trim(),
    //   password : $('.password input').val().trim(),
    //   passwordCheck : $('.password-check input').val().trim(),
    //   phone : $('.phone input').val().trim(),
    //   aggrement : t.data,
    //   // checkNumber : $('.confirm input').val(), 인증번
    // };

    var regData = {};
    regData.username = $('.name input').val().trim();
    regData.password = $('.password input').val().trim();
    regData.auth = 'user';
    regData.profile = {
      name: $("#userName").val().trim(),
      nickName: $("#userNickName").val().trim(), //임시 (튜토리얼 생성시 제거)//////////////////////////////////////////////////////////////////////////////////////////////
      // profileImg: [],
      sex: $("[name=sex]:checked").val().trim(), //임시 (튜토리얼 생성시  제거)//////////////////////////////////////////////////////////////////////////////////////////////
      // birthday: $('#birthDay').val().trim(), //임시 (튜토리얼 생성시  제거) //////////////////////////////////////////////////////////////////////////////////////////////
      birthday: $('#mDate').val().trim(), //임시 (튜토리얼 생성시  제거) //////////////////////////////////////////////////////////////////////////////////////////////
      email : $("#email").val().trim(),
      mobile : $('.phone input').val().trim(),
      joinRoute: "",
      introduction: $("#userName").val().trim() + '의 엔딩노트입니다.',
      declareDeath: [],
      agreement: t.data,
      isPassAway : false, //사망여부
    };

    Meteor.call("registUserData",regData,function(err,res){
      if(err){
        console.log(err);
      }else if(res){

        var confrimData = {
          title : '회원가입 환영',
          context : $("#userName").val() + '님<br/>잇츠마이스토리에 가입하신것을<br/>진심으로 축하드립니다.<br/><br/>로그인 후 사용하시면 됩니다.',
          templateName : 'findPassword02',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        //회원가입 포인트 적립
        Meteor.call('setPoint', 'PO0001', res, 'get', 'NU', 'DEFAULT', '');
        Router.go('endingNote',{},{replaceState: false});
        // console.log(res);
        Router.go('login',{},{replaceState: false});
      }
    });

  },
  "click #checkPhoneAuth" : function(e, t){
    if(!t.callSMSInterval){
      return;
    }
    var phoneNum = $('.phone input').val();
    if (!checkValid( /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,$('.phone input'),"휴대폰 번호가 정확하지 않습니다.")){
      return false;
    }
    Meteor.call("callSMSAuth", phoneNum, true ,function(err,res){
      if(err)console.log(err);
      if(res){
        // if(res === "isThere"){
        //   // alert("이미 등록되어있는 핸드폰 입니다.");
        //   // return;
        //   var confrimData = {
        //     title : '이미 등록되어있는 휴대폰 입니다.',
        //     context : '',
        //     templateName : 'findPassword02',
        //     returnData : null,
        //     singleBtn : true,
        //     btnName : '확인'
        //   };
        //
        //   Session.set('confrim_center', confrimData);
        //   return false;
        // }else{
          t.authCheckData = res;
          $("#phoneAuthBt").removeClass("hidden");
          sendSMSTime();
        // }
      }
    });
    $("#checkPhoneAuth").css("color", "#b7b7b7");
    t.callSMSInterval = false;
    // setTimeout(function(){
    //   t.callSMSInterval = true;
    //   $("#checkPhoneAuth").css("color", "#ff6960");
    // }, 6000);


  },
  "click #phoneAuthBt" : function(e, t){
    if(!t.authCheckData){
      // alert("인증번호가 아직 발송되지 않았습니다.");
      var confrimData = {
        title : '인증번호가 아직 발송되지 않았습니다.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
    var checkPhoneAuthNum = $("#phoneAuthInput").val();
    var requestPhoneNum = $('.phone input').val();

    if(checkPhoneAuthNum !== t.authCheckData.authNum){
      // alert("인증번호가 올바르지 않습니다.");
      var confrimData = {
        title : '인증번호가 올바르지 않습니다.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      return;
    }
    if(requestPhoneNum !== t.authCheckData.phoneNum){
      // alert("인증요청한 번호가 다릅니다.");
      var confrimData = {
        title : '인증요청한 번호가 다릅니다.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      return;
    }
    if(!timeLimit){
      // alert("인증시간이 초과하였습니다.")
      var confrimData = {
        title : '인증요청 시간이 만료되었습니다.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      t.phonAuthCheckComp = false;
      t.callSMSInterval = true;
      $("#checkPhoneAuth").css("color", "#ff6960");
      return;
    }
    clearInterval(x);
    timeLimit = false;
    document.getElementById("phoneAuthInput").placeholder = "";
    // alert('인증 성공!');
    var confrimData = {
      title : '휴대전화 인증이 완료되었습니다.',
      context : '',
      templateName : 'findPassword02',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    $("#phoneAuthBt").addClass("hidden");
    t.phonAuthCheckComp = true;
    //최종 입력번호와 인증번호비교 위함
    t.userPhoneNum = requestPhoneNum;

    //???? 안쓰남?
    // if(checkPhoneAuthNum === t.authCheckData.authNum && requestPhoneNum === t.authCheckData.phoneNum && timeLimit){
    //   t.phonAuthCheckComp = true;
    //   t.userPhoneNum = requestPhoneNum;
    // }else{
    //   t.phonAuthCheckComp = false;
    // }

  }
});

Template.registration.onDestroyed(function(){
  clearInterval(x);
  timeLimit = false;
  document.getElementById("phoneAuthInput").placeholder = "";
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
    document.getElementById("phoneAuthInput").placeholder = minutes + "분 " + seconds + "초 ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        timeLimit = false;
        document.getElementById("phoneAuthInput").placeholder = "";
    }
  }, 1000);
}
/////////////////////////////////////////////////////////////////////////
