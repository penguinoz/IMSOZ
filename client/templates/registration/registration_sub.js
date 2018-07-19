Template.registrationSub.onRendered(function(){
  $(window).scrollTop(0);
  var height = $(window).height();
  $(".registration.sub").height(height);
});

Template.registrationSub.events({
  "click .back": function(e, t){
    e.preventDefault();
    window.history.back();
    // Router.go('login',{},{replaceState: false});
  },

  "focusout #email" : function(e, t){

  },

  "focusout #userName" : function(e, t){

  },

  "focusout #userName" : function(e, t){

  },

  "click #registSubMenu":function(e, t){
    // if(!$('#secureCheck').is(":checked")){
    //   //todo alert 그냥 쓰나???
    //   alert("이용약관에 동의하지 않으셨습니다.");
    //   return;
    // }

    function chk(re, tar, msg){
      if(re.test(tar.val().trim())) {
        return true;
      }
      var confrimData = {
        title : msg,
        context : '',
        templateName : 'findPassword02',
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
    //이름확인
    if (!chk(/^[가-힣|a-z|A-Z|\*]+$/,$("#userName"),"이름은 한글/영문 만 가능합니다.")){
      return false;
    }
    //닉네임 확인
    if (!chk(/^[가-힣|a-z|A-Z|0-9|\*]+$/,$("#userNickName"),"닉네은 한글/영문/숫자 만 가능합니다.")){
      return false;
    }
    //이메일 확인
    if (!chk(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,$("#email"),"이메일 형태를 확인해 주세요.")){
      return false;
    }


    var tData = t.data;

    var regData = {};
    regData.username = tData.userId;
    regData.password = tData.password;
    regData.authority = 'user';
    regData.profile = {
      name: $("#userName").val().trim(),
      nickName: $("#userNickName").val().trim(),
      // profileImg: [],
      sex: $("[name=sex]:checked").val().trim(),
      birthday: $('#birthDay').val().trim(),
      email : $("#email").val().trim(),
      mobile : tData.phone,
      joinRoute: "",
      introduction: $("#userName").val().trim() + '의 엔딩노트입니다.',
      declareDeath: [],
      agreement: tData.agreement,
      isPassAway : false, //사망여부
    };

    // console.log(regData.profile);

    Meteor.call("checkUserNickDup", $("#userNickName").val() ,function(err,res){
      if(err){
        console.log(err);
        return ;
      }
      if(res){
        //res가 true 중복
        var confrimData = {
          title : '중복된 닉네임 입니다.',
          context : '',
          templateName : 'myInfo',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return;
      }else{
        //false 중복없음
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
      }
    });


  },
});
