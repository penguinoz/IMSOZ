import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random'

Template.tutorial.onCreated(function(){

});

var expYear;  //기대수명
var nickDupCheck; //닉네임

Template.tutorial.onRendered(function(){
  var height = $(window).height();
  var width = $(window).width();
  $(".tutorial-input-page").css('height',height);
  $(".tutorial-input-page").css('background-size',width+"px "+height+"px");
  self = this;
  self.autorun(function(auto) {
    if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.tutoPage) {
      $(".tutorial-input-page").addClass("display-none");
      $("#"+Meteor.user().profile.tutoPage).removeClass("display-none");
      $(".nameplace").text(Meteor.user().profile.name);
      auto.stop();
    }else{
      // $("#tutoPage1").removeClass("display-none");
    }
  });

});

Template.tutorial.events({
  //다음페이지
  "click .next-click": function(e, t){
    jumpNextPage(e.currentTarget.id.substr(0,2));
    //단계저장
  },
  "click .select-item" : function(e, t){
    $(".check-item").removeClass("check-item");
    $(e.currentTarget).addClass("check-item");
  },
  "click [name=firstStep]" : function(e, t){
    var data = {
      bucketId:undefined,
      context:"<p>샘플용 생성데이터입니다.</p>",
      dateTitle:"DT0001",
      images:[],
      lock:false,
      mDate:global.fn_dateFormat().YMD,
      question:false,
      regDate:global.fn_dateFormat().HMS,
      subType:"IM0001",
      tagList:[],
      title:"tete",
      type:"IM",
      updateDate:"2018-06-28 13:14:47",
      userId:Meteor.userId(),
      _id:Random.id()
    }
    Meteor.call('insertStory', data, function(err, res){
      if(err){
        console.log(err);
      }else{

      }
    });
  },


  //본인 생년월일 입력
  "click [name=inputBirth]": function(e, t){
    var birthday = $("#tutoMyBirth").val();
    if(birthDayRegEx(birthday)){
      var dataFrom = birthday.slice(0,4)+"-"+ birthday.slice(4,6) +"-"+ birthday.slice(6,8);
      setTutoDatas({'profile.birthday':dataFrom});
      jumpNextPage(e.currentTarget.id.substr(0,2));
    };
  },
  //본인 프로필 입력
  "click [name=inputProfile]": function(e, t){
    var sex = "M";
    if($("#selectM")[0].className.indexOf("check-item") === -1){
      sex = "W";
    }
    var nickName = nickDupCheck;
    if(!nickName){
      var confrimData = {
        title : '닉네임을 작성해주세요',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return false;
    }else{
      var introduct = $("#tutoIntroduct").val();
      setTutoDatas({'profile.sex':sex});
      setTutoDatas({"profile.nickName":nickName});
      setTutoDatas({"profile.introduction":introduct});
      jumpNextPage(e.currentTarget.id.substr(0,2));
    }
  },
  //기대수명 입력
  "click [name=hopeDay]": function(e, t){
    var expLife = Number(expYear);
    if(typeof expLife !== "number" || expLife === 0){
      var confrimData = {
        title : '기대수명을 작성해 주세요 예) 86 ',
        context : '',
        templateName : 'myInfo',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return;
    }else{
      setTutoDatas({"profile.expLife":expLife});
      jumpNextPage(e.currentTarget.id.substr(0,2));
    }
  },
  //자식 또는 펫입력 BD0001 아이 0002 동물
  "click [name=inputMySonOrPet]": function(e, t){
    var relationCode = "BD0001";
    if($("#selectSonM")[0].className.indexOf("check-item") === -1){
      relationCode = "BD0002";
    }

    var sex = "W";
    if($('#checkOne').is(':checked')){
      sex = "M";
    }else if(!$('#checkTwo').is(':checked')){
      var confrimData = {
        title : '성별을 선택해주세요.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return;
    }

    var birthday = $("#sonBirth").val();
    var dataFrom = "";
    if(birthDayRegEx(birthday)){
      dataFrom = birthday.slice(0,4)+"-"+ birthday.slice(4,6) +"-"+ birthday.slice(6,8);
    }else{
      return;
    }

    var sonName = $("#sonName").val();
    if(!sonName){
      var confrimData = {
        title : '이름을 입력해 주세요.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      return
    }

    var inputObj = {
      _id:Random.id(),
      sex:sex,
      birthday:dataFrom,
      name:sonName,
      relation:relationCode
    }
    Meteor.call("setFamilyData",Meteor.userId(),inputObj)
    jumpNextPage(e.currentTarget.id.substr(0,2));
  },
  "focusout #expLife": function(e, t){
    e.preventDefault();
    // console.log('focusout');
    expYear = "";
    var reg = new RegExp('([^0-9])','g');
    var stVal = $('#expLife').val();

    if(stVal === "" || reg.exec(stVal) !== null){
      // alert('숫자를 입력해 주세요');
      var confrimData = {
        title : '숫자를 입력해 주세요',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      $('#expLife').focus();
      return;
    }
    if(parseInt(stVal) > 150){
      // alert('150세 이상 입력 할수 없습니다.');
      var confrimData = {
        title : '150세 이상 입력 할수 없습니다.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      $('#expLife').focus();
      Session.set('confrim_center', confrimData);
      return;
    }

    var countdate = parseInt(stVal) - global.fn_getMyAge(Meteor.user().profile.birthday, global.fn_dateFormat().YMD);
    if(countdate <= 0){
      // alert('기대 수명은 지금 나이보다 적을 수 없습니다.');
      var confrimData = {
        title : '기대 수명은 지금 나이보다 적을 수 없습니다.',
        context : '',
        templateName : 'timeline',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      $('#expLife').focus();
      Session.set('confrim_center', confrimData);
      return;
    }

    expYear = $('#expLife').val();
  },
  "focusout #tutoNickName" : function(err,res){
    nickDupCheck = "";
    if(!$("#tutoNickName").val()){
      return false;
    }
    Meteor.call("checkUserNickDup", $("#tutoNickName").val() ,function(err,res){
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
      }else{
        nickDupCheck = $("#tutoNickName").val();
      }
    });
  }

});
//내 스텝 디비저장
function setTutoStep(stepNum){
  // var inputdepth = {'profile.tutoPage':stepNum};
  // Meteor.call("setUserProfileData",inputdepth ,function(err,res){
  //   if(err){
  //     console.log(err);
  //   }else{
  //
  //   }
  // });
}
//프로필들 디비저장
function setTutoDatas(data){
  Meteor.call("setUserProfileData",data ,function(err,res){
    if(err){
      console.log(err);
    }else{

    }
  });
}
//다음으로 페이지로 이동
function jumpNextPage(pageNum){
  pageNum = parseInt(pageNum);
  setTutoStep("tutoPage"+(pageNum+1));
  $(".tutorial-input-page").addClass("display-none");
  $("#tutoPage"+(pageNum+1)).removeClass("display-none");
}

//날자유효성검사
function birthDayRegEx(dateStr){
  if(dateStr.length !== 8 || !Number(dateStr)){
    var confrimData = {
      title : '출생 년월일을 8자리로 입력해 주세요. 예)20180101',
      context : '',
      templateName : 'timeline',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };
    Session.set('confrim_center', confrimData);
    return false;
  }

   var year = Number(dateStr.substr(0,4));
   var month = Number(dateStr.substr(4,2));
   var day = Number(dateStr.substr(6,2));
   var today = new Date(); // 날자 변수 선언
   var yearNow = today.getFullYear();
   var adultYear = yearNow;


   if (year < 1900 || year > adultYear){
        alert("년도를 확인하세요. "+adultYear+"년생 이전 출생자만 등록 가능합니다.");
        return false;
   }
   if (month < 1 || month > 12) {
        alert("달은 1월부터 12월까지 입력 가능합니다.");
        return false;
   }
  if (day < 1 || day > 31) {
        alert("일은 1일부터 31일까지 입력가능합니다.");
        return false;
   }
   if ((month==4 || month==6 || month==9 || month==11) && day==31) {
        alert(month+"월은 31일이 존재하지 않습니다.");
        return false;
   }
   if (month == 2) {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day>29 || (day==29 && !isleap)) {
             alert(year + "년 2월은  " + day + "일이 없습니다.");
             return false;
        }
   }
   return true;
}
