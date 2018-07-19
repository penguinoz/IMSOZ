//#####################################################################################
// 전역
//#####################################################################################
var global = {};

global.fn_dateFormat = function(_date) {
  if (_.isUndefined(_date) || _.isNull(_date) || _.isEmpty(_date)) {

    if(Meteor.isClient){
      if(!TimeSync.isSynced()){
        TimeSync.resync();
      } else {
        _date = Deps.nonreactive(function(){
          return new Date(TimeSync.serverTime()).toISOString();
        });
      }
    } else {
      _date = new Date().toISOString();
    }
  }
  return {
    date: _date,
    HMS: new Date(_date).format('yyyy-MM-dd HH:mm:ss'),
    YMD: new Date(_date).format('yyyy-MM-dd'),
    YM : new Date(_date).format('yyyy-MM'),
    YMDdot: new Date(_date).format('yyyy.MM.dd'),
    YMdot: new Date(_date).format('yyyy.MM'),
    kor: new Date(_date).format('yyyy년 MM월 dd일 HH:mm:ss'),
    korYMDhm: new Date(_date).format('yyyy년 MM월 dd일 HH:mm'),
    korYMD: new Date(_date).format('yyyy년 MM월 dd일'),
    hm: new Date(_date).format('HH:mm'), // 시/분
    md: new Date(_date).format('MM-dd'),
    korYMDH: new Date(_date).format('yyyy년 MM월 dd일 HH시'),
    psCD: new Date(_date).format('MMdd'),
  };
};

global.fn_getDatePart = function(_type, _date) {
  var result;

  var dateValue = new Date(_date);
  var year = dateValue.getFullYear();
  var month = global.fn_numPad(dateValue.getMonth() + 1, 2);
  var date = global.fn_numPad(dateValue.getDate(),2);
  var day = dateValue.getDay();


  var week = new Array('일', '월', '화', '수', '목', '금', '토');

  switch(_type){
    case 'year':
    result = year;
    break;
    case 'month':
    result = month;
    break;
    case 'date':
    result = date;
    break;
    case 'day':
    result = day;
    break;
    case 'yearMonth': //2018.12
    result = year + '.' + month;
    case 'monthDate': //01.22
    result = month + '.' + date;
    break;
    case 'monthDateDay': //01.22 화
    result = month + '.' + date + ' ' + week[day];
    break;
    case 'yearMonthDateDay': //01.22 화
    result = year + '.' + month + '.' + date + ' ' + week[day];
    break;
    default:
    result = date;
  }

  return result;
};


global.fn_getDateNewType = function(_date){
  var date = global.fn_dateFormat(_date).HMS;
  var result = '';
  // 1. 오늘날짜와 대상날짜의 차이 구하기
  var toDate = new Date(); // 현재 ('2009-01-01 12:30:00')

  var targeDate  = new Date(date);    // 시작일시 ('2009-10-01 17:20:10')
  // console.log(targeDate);

  // 두 일자(startTime, endTime) 사이의 차이를 구한다.
  var dateGap = toDate.getTime() - targeDate.getTime();
  var timeGap = new Date(0, 0, 0, 0, 0, 0, toDate - targeDate);

  // 두 일자(startTime, endTime) 사이의 간격을 "일-시간-분"으로 표시한다.
  diffRes = {
    diffYear : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) : 0, // 일수
    diffMonth : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) : 0, // 일수
    diffDay  : Math.floor(dateGap / (1000 * 60 * 60 * 24)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24)) : 0, // 일수
    diffHour : timeGap.getHours() ? timeGap.getHours() : 0,          // 시간
    diffMin  : timeGap.getMinutes() ? timeGap.getMinutes() : 0,      // 분
    diffSec  : timeGap.getSeconds() ? timeGap.getSeconds() : 0,      // 초
  };

  // console.log(diffRes);
  if(diffRes.diffDay >= 30){
    if(diffRes.diffMonth >= 12) {
      result = diffRes.diffYear + '년 전';
    } else {
      result = diffRes.diffMonth + '달 전';
    }
  } else {
    if(diffRes.diffDay > 0){
      result = diffRes.diffDay + '일 전';
    } else {
      if(diffRes.diffHour > 0){
        result = diffRes.diffHour + '시간 전';
      } else {
        if(diffRes.diffMin === 0 && diffRes.diffSec > 0){
          result = '1분 전';
        } else if (diffRes.diffMin === 0 && diffRes.diffSec === 0){
          result = '지금';
        } else {
          result = diffRes.diffMin + '분 전';
        }
      }
    }
  }
  //1일 넘어가면

  //   // 0~1시간 미만이면  (1~59분전)
  //   // 1시간 ~ 24시간 미만 (n시간전)
  //   // 24 초과 (1일전)
  //   // 1일 초과넘어가면 (날짜로 표시)

  return result;
};

global.fn_getAge = function(_birthDay){
  // var date = global.fn_dateFormat(_startDate).HMS;
  var result = '';
  // 1. 오늘날짜와 대상날짜의 차이 구하기

  var startDate  = new Date(_birthDay); // 시작일시 ('2009-10-01 17:20:10')
  var endDate = new Date(); // 종료일시 ('2009-01-01 12:30:00')
  // console.log(targeDate);

  // 두 일자(startTime, endTime) 사이의 차이를 구한다.
  var dateGap = endDate.getTime() - startDate.getTime();
  var timeGap = new Date(0, 0, 0, 0, 0, 0, endDate - startDate);

  // 두 일자(startTime, endTime) 사이의 간격을 "일-시간-분"으로 표시한다.
  diffRes = {
    diffYear : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) : 0, // 일수
    diffMonth : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) : 0, // 일수
    diffDay  : Math.floor(dateGap / (1000 * 60 * 60 * 24)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24)) : 0, // 일수
    diffHour : timeGap.getHours() ? timeGap.getHours() : 0,          // 시간
    diffMin  : timeGap.getMinutes() ? timeGap.getMinutes() : 0,      // 분
    diffSec  : timeGap.getSeconds() ? timeGap.getSeconds() : 0,      // 초
  };

  // console.log(diffRes);
  if(diffRes.diffDay >= 30){
    if(diffRes.diffMonth >= 12) {
      result = (diffRes.diffYear + 1) + '세';
    } else {
      result = diffRes.diffMonth + '달';
    }
  } else {
    if(diffRes.diffDay > 0){
      result = diffRes.diffDay + '일';
    } else {
      result = '1일';
      // if(diffRes.diffHour > 0){
      //   result = diffRes.diffHour + '시간 전';
      // } else {
      //   if(diffRes.diffMin === 0 && diffRes.diffSec > 0){
      //     result = '1분 전';
      //   } else if (diffRes.diffMin === 0 && diffRes.diffSec === 0){
      //     result = '지금';
      //   } else {
      //     result = diffRes.diffMin + '분 전';
      //   }
      // }
    }
  }
  //1일 넘어가면

  //   // 0~1시간 미만이면  (1~59분전)
  //   // 1시간 ~ 24시간 미만 (n시간전)
  //   // 24 초과 (1일전)
  //   // 1일 초과넘어가면 (날짜로 표시)

  return result;
};

global.fn_getDateRange = function(_startDate, _endDate){
  // var date = global.fn_dateFormat(_startDate).HMS;
  var result = '';
  // 1. 오늘날짜와 대상날짜의 차이 구하기

  var startDate  = new Date(_startDate); // 시작일시 ('2009-10-01 17:20:10')
  var endDate = new Date(); // 종료일시 ('2009-01-01 12:30:00')
  if(_endDate){
    endDate = new Date(_endDate);
  }
  // console.log(targeDate);

  // 두 일자(startTime, endTime) 사이의 차이를 구한다.
  var dateGap = endDate.getTime() - startDate.getTime();
  var timeGap = new Date(0, 0, 0, 0, 0, 0, endDate - startDate);

  // 두 일자(startTime, endTime) 사이의 간격을 "일-시간-분"으로 표시한다.
  diffRes = {
    diffYear : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30 * 12)) : 0, // 일수
    diffMonth : Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24 * 30)) : 0, // 일수
    diffDay  : Math.floor(dateGap / (1000 * 60 * 60 * 24)) ? Math.floor(dateGap / (1000 * 60 * 60 * 24)) : 0, // 일수
    diffHour : timeGap.getHours() ? timeGap.getHours() : 0,          // 시간
    diffMin  : timeGap.getMinutes() ? timeGap.getMinutes() : 0,      // 분
    diffSec  : timeGap.getSeconds() ? timeGap.getSeconds() : 0,      // 초
  };

  // console.log(diffRes);
  if(diffRes.diffDay >= 30){
    if(diffRes.diffMonth >= 12) {
      result = diffRes.diffYear + '세';
    } else {
      result = diffRes.diffMonth + '개월';
    }
  } else {
    if(diffRes.diffDay > 0){
      result = diffRes.diffDay + '일';
    } else {
      result = '1일';
    }
  }
  return result;
};


global.fn_diffDateTime = function(endDateTime){
  var result = {};
  var startTime = new Date(global.fn_dateFormat().HMS); // 시작일시 ('2009-01-01 12:30:00')

  var endTime  = new Date(global.fn_dateFormat(endDateTime).HMS);    // 종료일시 ('2009-10-01 17:20:10')

  // 두 일자(startTime, endTime) 사이의 차이를 구한다.
  var dateGap = endTime.getTime() - startTime.getTime();
  var timeGap = new Date(0, 0, 0, 0, 0, 0, endTime - startTime);

  // 두 일자(startTime, endTime) 사이의 간격을 "일-시간-분"으로 표시한다.

  result = {
    diffDay  : global.fn_numPad(Math.floor(dateGap / (1000 * 60 * 60 * 24)), 1), // 일수
    diffHour : timeGap.getHours(),       // 시간
    diffMin  : timeGap.getMinutes(),      // 분
    diffSec  : timeGap.getSeconds(),      // 초
  };

  return result;
};

global.fn_diffDate = function(eDate, sDate){
  var result = {};

  // var startDate = new Date(sDate);
  // var endDate  = new Date(eDate);    // 종료일시 ('2009-10-01')

  var startDate = Date.parse(sDate);
  var endDate = Date.parse(eDate);
  var flag = '-';


  // console.log(global.fn_dateFormat().HMS);
  // 두 일자(startTime, endTime) 사이의 차이를 구한다.

  var dateGap = endDate - startDate;
  // var dateGap = endDate.getTime() - startDate.getTime();
  dateGap = Math.floor(dateGap / (1000 * 60 * 60 * 24));

  if(dateGap < 0){
    dateGap = dateGap.toString().substring(1);
    flag = '+';
  } else if( dateGap === 0){
    dateGap = 'day';
  } else {
    dateGap = dateGap.toString();
  }

  result = {
    diffDay  : global.fn_numPad(dateGap, 1), // 일수
    flag : flag
  };

  return result;
};


global.fn_getCalDate = function(_date, _day, _type){
  var date = new Date(_date);
  switch(_type){
    case 'SUM' : //더하기
    date.setDate(date.getDate() + _day);
    break;
    case 'SUB' : //빼기
    date.setDate(date.getDate() - _day);
    break;
  }
  return date.toISOString();
};

global.fn_getCalDateByMonth = function(_date, _month, _type){
  var date = new Date(_date);
  switch(_type){
    case 'SUM' : //더하기
    date.setMonth(date.getMonth() + _month);
    break;
    case 'SUB' : //빼기
    date.setMonth(date.getMonth() - _month);
    break;
  }
  return date.toISOString();
};

global.fn_getCalDateByYear = function(_date, _year, _type){
  var date = new Date(_date);
  switch(_type){
    case 'SUM' : //더하기
    date.setYear(date.getFullYear() + _year);
    break;
    case 'SUB' : //빼기
    date.setYear(date.getFullYear() - _year);
    break;
  }
  return date.toISOString();
};

//2개값 덧셈
global.fn_sumation = function(param1, param2){
  return Number(param1) + Number(param2);
};

//2개값 뺄셈
global.fn_subtraction = function(_param1, _param2){
  var param1 = _param1 ? _param1 : 0;
  var param2 = _param2 ? _param2 : 0;
  return Number(param1) - Number(param2);
};

////////////////////////이미지 업로드///////////////////////////////////
global.fn_upLoadeS3Image = function(_imgInfo){
Meteor.call('uploadS3Image', _imgInfo, function(error, result){
  if(error){
    console.log(error);
  } else {

  }
});
};

global.fn_deleteS3Img = function(_imgInfo){
  Meteor.call('deleteS3Img', _imgInfo, function(error, result){
    if(error){
      console.log(error);
    } else {

    }
  });
};

global.fn_deleteS3SingleImg = function(_imageString){
  if(Meteor.isServer){
    var s3Bucket = new AWS.S3();
    var imgData = {
          Bucket: global.s3.bucketName,
          Key: _imageString.split("iml-images/")[1]
      };

      // console.log(item);
      s3Bucket.deleteObject(imgData, function (err, data) {
        if (err) {
          console.log("Check if you have sufficient permissions : "+err);
        }
      });
  }
};

global.fn_inputResizing = function(target){
  $('body').append('<span class="new_width">'+$(target).val()+'</span>');
  var textWidth = $('.new_width').width();
  $(target).width(textWidth);
  $('.new_width').remove();
};

//target이 source보다 크면 true
global.fn_isGreaterThan = function(target, source){
  return target > source;
};

//target이 source보다 작으면 true
global.fn_isLessThan = function(target, source){
  return target < source;
};

global.fn_getCodeName = function(_type, _code){
  var resParam = "";
  _.map(global.code[_type],function(obj){
    if(obj.code === _code ){
      resParam = obj.name;
    }
  });

  if(resParam===""){
    resParam = '엔딩노트';
  }

  return resParam;
};

global.fn_getSubjectInfo = function(_code){
  if(_code === "DEFAULT"){
    _code = "BS0001";
  }
  return _.findWhere(global.code['subject'], {code : _code});
};

global.fn_getSubjectList = function(_code){
  var result = [];
  switch(_code){
    case 'BS': case 'TQ': case 'LL':
      result = _.where(global.code.subject, {code : _code});
      break;
    default:
      result = _.sortBy(_.where(global.code.subject, {group : 'g0002'}),'order');
  }
  return result;
};

global.fn_getAllSubjectList = function(){
  var result = [];
  result = _.filter(global.code['subject'], function(item){return item.pCode === undefined;});
  return result;
};

global.fn_getSubjectChild = function(_pCode){
  return _.sortBy(_.where(global.code.subject, {pCode : _pCode}),'order');
};

global.fn_getCodeList = function(_type){
  return _.sortBy(global.code[_type],'order');
};

global.fn_getSearchCode = function(_type){
  var result = [];
  var result = _.sortBy(_.filter(global.code[_type], function(item){
    return item.code !=='BS';
  }),'order');
  return result;
};


global.fn_getLifeMapSubject = function(){
  var result = [];
  result = _.sortBy(_.filter(global.code['searchCode'], function(item){
    return item.group === 'g0001' && item.code !=='BS';
  }),'order');
  return result;
};

global.fn_getLifeMapSubjectChild = function(_pCode){
  if(_pCode === 'BL'){
    var bucketList = _.sortBy(_.where(global.code.searchCode, {pCode : _pCode}),'order');
    var buckeyStroy = _.sortBy(_.where(global.code.searchCode, {pCode : 'BS'}),'order');
    return _.union(bucketList, buckeyStroy);
  } else {
    return _.sortBy(_.where(global.code.searchCode, {pCode : _pCode}),'order');
  }
};

global.fn_getSysMessage = function(_code){
  // console.log(global.message);
  return _.findWhere(global.message, {code : _code});
};

global.fn_getMyAge = function(_birthday, _thisday){

  var birthDay = new Date(_birthday);
  var toDay = new Date(_thisday);

  var myAge = toDay.getFullYear() - birthDay.getFullYear() + 1;
  return myAge;
};

global.fn_isExist = function(target) {
  if(target){
    var type = Object.prototype.toString.call(target);
    switch(type){
      case "[object Object]":
      //빈 object?
      if(Object.getOwnPropertyNames(target).length === 0){
        return false;
      }else{
        return true;
      }
      break;
      case "[object Array]":
      //빈 array???
      if(target.length === 0){
        return false;
      }else{
        for(var i in target ){
          if(target[i]){
            if(Object.prototype.toString.call(target[i])==="[object Object]" && Object.getOwnPropertyNames(target).length === 0){
              return false;
            }
            return true;
          }
        }
        return false;
      }
      break;
      default:
      return true;
    }
  } else {
    return false;
  }
};

global.fn_toDecimal = function (number) {
  return number[0].numerator + number[1].numerator /
  (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
};

global.fn_getTimelineTempInfo = function (_code, _subType){
  var result = {};
  var subjectInfo = global.fn_getSubjectInfo(_subType);
  result.icon = subjectInfo.icon;

  switch(_code){
    case "BL": //버킷리스트
      result.tempType = 'temp3';
      result.lineColor = 'color-' + _code;
      result.templateName = "timelineTemplate03";
      break;

    case "BS": //버키스토리
      result.tempType = 'temp4';
      result.lineColor = 'color-' + _code;
      result.templateName = "timelineTemplate04";
      break;

    case "IM": case "DR": case "SC":  case "CR"://추억, 꿈, 학교, 커리어
      result.tempType = 'temp1';
      result.lineColor = 'color-' + _subType;
      result.templateName = "timelineTemplate01";
      break;

    case "BD": //육아일기
      result.tempType = 'temp6';
      result.lineColor = 'color-' + _subType;
      result.templateName = "timelineTemplate06";
      break;

    case "TC": //타임캡슐,
      result.tempType = 'temp5';
      result.lineColor = 'color-' + _subType;
      result.templateName = "timelineTemplate05";
      break;

    case "EN": //유서
      result.tempType = 'temp1';
      result.lineColor = 'color-' + _subType;
      result.templateName = "timelineTemplate01";
      break;

    case "TQ": //오늘의 질문
      result.tempType = 'temp2';
      result.lineColor = 'color-' + _subType;
      result.templateName = "timelineTemplate02";
      break;
    default:
    result.tempType = 'temp1';
      result.templateName = "timelineTemplate01";
  }

  return result;
};

global.fn_getUserCommonInfo = function(_userId) {
  var result = {};
  var userInfo = Meteor.users.find({_id: _userId},{fields:{'profile':1, 'username':1, 'nickName':1}}).fetch()[0];


  if(userInfo && userInfo.profile){
    //프로필 이미지
    var profileImg = null;
    if(userInfo.profile.profileImg){
      profileImg = userInfo.profile.profileImg;
    }

    result = {
      userId : _userId, //사용자 고유번호
      loginId : userInfo.username, //사용자 아이디
      name : userInfo.profile.name, //사용자 이름
      nickName : userInfo.profile.nickName, //사용자 별명
      introduction : userInfo.profile.introduction ? userInfo.profile.introduction : '안녕하세요 ' + userInfo.profile.name + ' 입니다.', //자기소개
      profileImg : profileImg,
    };
  }

  return result;
};

//타킷 Array(키없음)에서 일치하는 값 제거
global.fn_removeInArr = function(_targetArr, _value){
  var result = [];
  return _.reject(_targetArr, function(obj){ return obj === _value; });
};

//타깃ArrayObject 데이터에서 값이 일치하는 항목 지우기
global.fn_removeObjInArr = function(_targetArr, _key, _value){
  var result = [];
  return _.reject(_targetArr, function(obj){ return obj[_key] === _value; });
};

// 두개의 ArrayData를 비교하여 target과 일치하지 않는 데이터만 반환
global.fn_getDifferenceData =  function(arrayTarget, arrSource){
  var resultTarget = _.reject(arrayTarget, function(obj){ return _.findWhere(arrSource, obj); });
  return resultTarget;
};

global.fn_makeImageSrc =  function(_imageInfo, _type){
  var result = '';

  if(_imageInfo){
    var imageType = _type ? '_' + _type : _imageInfo.type;
    result = _imageInfo.bucketUrl + _imageInfo.folder + _imageInfo.fileName + imageType + '.' + _imageInfo.extension;
  } else {
    result = _.sample(global.defaultProfileImg);
  }

  return result;
};

global.fn_getDigit =  function(_num) {
  var result = {};
  _num = _num.toString();
  var i=0;
  var generation = 10;
  while(_num[i]) { generation=_num[0]; i++;  }

  result = {
    generation : generation,
    digit : i
  };

  return result;
};

global.fn_numPad = function(n, width){
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

global.logout = function(){
  global.selfLogout = true;
  Meteor.logout();
  // Router.go('login',{},{replaceState: false});
};

// 암호화 & 복호화
global.fn_passCode = function(message, type) {
  var result = null;
  var password = global.fn_dateFormat(new Date()).psCD;
  var hashedPassword = CryptoJS.SHA256(password).toString();

  switch(type) {
    // 암호화
    case 'EC':
      var encrypt = CryptoJS.AES.encrypt(message, hashedPassword);
      // url의 '/'를 없애기 위한 base64로 변경이후 url에 표시
      var wordArray = CryptoJS.enc.Utf8.parse(encrypt);
      result = CryptoJS.enc.Base64.stringify(wordArray);
    break;

    // 복호화
    case 'DC':
      // base64를 복호화한뒤 message를 AES 256복호화 작업
      var parsedWordArray = CryptoJS.enc.Base64.parse(message);
      parsedWordArray = parsedWordArray.toString(CryptoJS.enc.Utf8);

      var decrypt = CryptoJS.AES.decrypt(parsedWordArray, hashedPassword);
      result = decrypt.toString(CryptoJS.enc.Utf8);
    break;
  }
  return result;
};

global.fn_makeCodeFormate= function(_code){
  return _code.toString().replace(/\B(?=(\d{4})+(?!\d))/g, "-");
};
global.fn_sendEmail = function(type, email, title, conText, fromEmail){
  var emailInfo = {};
  emailInfo = emailSend = {
    to: email,
    from: '잇츠마이스토리 <support@itsmystory.com>',
    subject: title,
    text: conText
  };

  // if(type === 'cert') {
  //   emailInfo.from = '더푸르츠 인증 <noreply@itsmystory.com>';
  // } else if('invite'){
  //   emailInfo.from = fromEmail;
  // } else {
  //   emailInfo.from = '잇츠마이스토리 <support@itsmystory.com>';
  // }

  return emailInfo;
};

//fcm 타겟 전송
//{title:string , body:string, url:string, tokenId:string}
global.sendFcmMessage = function(sendObj){
  //token array 변경으로 인한 임시 방어코딩
  if(sendObj.tokenId && typeof sendObj.tokenId === "string"){
    sendObj.tokenId = [sendObj.tokenId];
  }
  if(!sendObj.tokenId || !sendObj.tokenId.length){
    return;
  }
  var key = 'AIzaSyCxCHPt0hypNZoMdUP_DKgsDEAX4eD7Kts';
  HTTP.call('POST',"https://fcm.googleapis.com/fcm/send",
  {
    data: {
      "registration_ids": sendObj.tokenId,
      "notification":{
        "body" : sendObj.body,
        "title" : sendObj.title,
      },
      "data" : {
        "custom_field" : "abcdef",
        "url" : sendObj.url
      }
    },
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'key=' + key,
    }
  },
  function( error, response ) {
    if ( error ) {
      console.log( error );
    } else {
      // console.log( response );
      if(response.statusCode === 202){

      }

    }
  });

  return;
};

//fcm code관리
global.fcmHistoryCode = function(){
  return resObj = {
    "addFriend":'F0001',     //친구요청시
    "acceptFriend":'F0002',  //친구승인시
    "like":'F0003',          //좋아요 받을때
    "comment":'F0004',       //댓글작성시
  };
};

//[어레이]에서 n명을 제외한 나머지는 갯수로 표시 (ex xxx외 n명)
// return {cnt:3, arr:[]};
global.chooseAndCnt = function(_arrStr, _count){
  var result = {};
  var cnt = 0;
  var arr = [];
  if(_count === 0){
    arr = _arrStr;
  } else {
    arr = _.first(_arrStr, _count);
  }
  if(_arrStr.length > _count){
    cnt  = _arrStr.length - _count;
  }
  result = {
    cnt : cnt,
    arr : arr
  };
  return result;
};

global.fn_resetSession= function(){
  if(Meteor.isClient){
    Session.set("timelineData",null);
    Session.set('bucketListData',null);
    Session.set("bucketListStatus", null);
    Session.set('bucketDicStoryData', null);
    Session.set("scrollPosition", null);

    Session.set("timelineDataVs",null);
    Session.set('bucketListDataVs',null);
    Session.set("bucketListStatusVs", null);
    Session.set("scrollPositionVs", null);
  }
};

export {global};
