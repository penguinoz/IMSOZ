import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

var template = 'contentsEditorBucket';
var dragFlag = false;
Template.contentsEditorBucket.onCreated(function(){
  var instance = this;

  instance.contentType = new ReactiveVar();
  instance.category = new ReactiveVar();
  instance.dateTitle = new ReactiveVar();
  instance.dateTitleName = new ReactiveVar();
  instance.hint = new ReactiveVar();
  instance.extraData = new ReactiveVar();
  instance.showCamera = new ReactiveVar(false);
  instance.showUser = new ReactiveVar(false);
  instance.imageList = new ReactiveVar();
  instance.imageArray = [];
  instance.codeList = new ReactiveVar();


  instance.selectedFamily = new ReactiveVar();



  Meteor.call('checkCodeOptionLoad', function(error, result){
    if(error){
      console.log(error);
    } else {
      var codeList = global.fn_getCodeList('bucket');
      codeList = global.fn_removeObjInArr(codeList, 'code', 'BL0001');
      instance.codeList.set(codeList);
    }
  });


  //네비게이션 데이터
  var navData ={
    prevTemplate : "contentsEditorBucket"
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  Session.set('nav_contentsEditorBucket', Session.get('navData'));
  //2. 넘길 정보
  Session.set('navData', navData);


  var contentType = 'BL'; //기본;
  var category = 'BL0004';
  // var dateTitle = 'DT0001';
  // var dateTitleName = '날짜'; //기본 '날짜'
  // var hint = {
  //   type : "P",
  //   text : "이야기를 작성해보세요",
  // };

  // if(Session.get('nav_contentsEditorBucket') && Session.get('nav_contentsEditorBucket').type){
  //   contentType = Session.get('nav_contentsEditorBucket').type ? Session.get('nav_contentsEditorBucket').type : contentType;
  //   category = Session.get('nav_contentsEditorBucket').subType ? Session.get('nav_contentsEditorBucket').subType : category;
    // hint = Session.get('nav_contentsEditorBucket').hint ? Session.get('nav_contentsEditorBucket').hint : hint;
    // dateTitle = Session.get('nav_contentsEditorBucket').dateTitle ? Session.get('nav_contentsEditorBucket').dateTitle : dateTitle;
    // dateTitleName = global.fn_getCodeName('dateTitle', dateTitle);
  // }

  // 추가데이터 설정
  // if(Session.get('nav_contentsEditorBucket').data){
  //   instance.extraData.set(Session.get('nav_contentsEditorBucket').data);
  // }

  instance.contentType.set(contentType);
  instance.category.set(category);
  // instance.dateTitle.set(dateTitle)
  // instance.dateTitleName.set(dateTitleName);
  // instance.hint.set(hint);
});

Template.contentsEditorBucket.onRendered(function(){
  $('#mDate').val(global.fn_dateFormat(new Date()).YMD);
  // $(".camera-slide").addClass('display-none-force');
  // $(".btn-camera").removeClass('selected');
  // $(".user-slide").addClass('display-none-force');
  // $(".btn-user").removeClass('selected');
  // $("#scroller").mobiscroll().date();
  // $('#datepicker').datepick({dateFormat: 'yyyy-mm-dd'});
  // mobiscroll.date('#datepicker', {
  //     theme: 'ios',
  //     display: 'bottom',
  // });
  // var mobiscroll = require('/modules/mobiscroll.javascript.lite/js/mobiscroll.javascript.lite.min');
  // mobiscroll.date('#scroller');
  //   $('#my-datepicker').datepicker({
  //     calendarWeeks: false,
  //     todayHighlight: true,
  //     autoclose: true,
  //     format: "yyyy-mm-dd",
  //     language: "kr",
  //   });
  //
  // $('#my-datepicker').find('.datepicker-days thead th.datepicker-switch')
  // 			.text(year + '년 ' + dates[this.o.language].months[month]);


  // days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //   daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  //   months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  //   monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   today: "Today",
  //   clear: "Clear",
  //   format: "mm/dd/yyyy",
  //   titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
  //   weekStart: 0
});

Template.contentsEditorBucket.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    // Router.go('bucketList',{menu:'my'},{replaceState: false});
  },
  "click .btn-camera": function(e,t){
    // console.log(t.showCamera);
    if(t.showCamera.get()){
      t.showCamera.set(false);
      t.showUser.set(false);
      // $(".camera-slide").slideUp();
      $(".camera-slide").addClass('display-none-force');
      $(".content-editor .step2 .pop-top").height(41);
      $(".btn-camera").removeClass('selected');
    } else {
      t.showCamera.set(true);
      t.showUser.set(false);
      // $(".camera-slide").slideDown();
      $(".user-slide").addClass('display-none-force');
      $(".btn-user").removeClass('selected');

      $(".camera-slide").removeClass('display-none-force');
      $(".content-editor .step2 .pop-top").height(121);
      $(".btn-camera").addClass('selected');
    }
  },
  "mousedown .slide": function(e, t){
    // console.log('mousedown');
    dragFlag = true;
    var obj = $(".slide");
    x = obj.scrollLeft();
    y = obj.scrollTop();

    pre_x = e.screenX;
    pre_y = e.screenY;

    $(".slide").css("cursor", "pointer");
  },
  "mousemove .slide": function(e, t){
    // console.log('mousemove');
    if (dragFlag) {
      var obj = $(".slide");
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);

      //$('#result').text((x - e.screenX + pre_x) + "," + (y - e.screenY + pre_y));
      return false;
    }
  },
  "mouseup .slide": function(e, t){
    // console.log('mouseup');
    dragFlag = false;
    $(".slide").css("cursor", "default");
  },
  "change #addImage": function(e, t){
    var imageObjs = e.target.files;
    // console.log(e.target.files);

    _.each(imageObjs, function(imageObj){
      var reader = new FileReader();
      reader.readAsDataURL(imageObj);

      // var fName = imageObj.name.substring(0, imageObj.name.lastIndexOf('.'));
      var extension = imageObj.name.substring(imageObj.name.lastIndexOf('.')+1);

      // $("[name=fileName]").val(imageObj.name);

      reader.onload = function  () {
        var tempImage = new Image();
        tempImage.src = reader.result;
        // console.log(reader.result);
        tempImage.onload = function () {
          // var tempImg = new Image();
          // tempImg.src = reader.result;
          var targetImage = this;

          EXIF.getData(imageObj, function(e,r) {
            var width = targetImage.width;
            var height = targetImage.height;
            var orientation = 1;
            var imageClass = 'height-100';
            /////////////thumb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //이미지 사이즈 조정
            if(targetImage.width >= targetImage.height){
              imageClass ='height-100';
              if(targetImage.width > 400){
                width = 400;
                height = targetImage.height * (400/targetImage.width);
              }
            } else {
              imageClass ='width-100';
              if(targetImage.height > 312){
                height = 312;
                width = targetImage.width * (312/targetImage.height);
              }
            }

            //보기용 canvas생성 (thumbnail용)
            var canvas2 = document.createElement('canvas');
            var canvasContext2 = canvas2.getContext("2d");

            orientation = EXIF.getTag(this, "Orientation");
            if ([5,6,7,8].indexOf(orientation) > -1) {
              canvas2.width = height;
              canvas2.height = width;
            } else {
              canvas2.width = width;
              canvas2.height = height;
            }

            //이미지 회전 (휴대폰 이미지 방향 문제)
            switch (orientation) {
              case 2: canvasContext2.transform(-1, 0, 0, 1, width, 0); break;
              case 3: canvasContext2.transform(-1, 0, 0, -1, width, height ); break;
              case 4: canvasContext2.transform(1, 0, 0, -1, 0, height ); break;
              case 5: canvasContext2.transform(0, 1, 1, 0, 0, 0); break;
              case 6: canvasContext2.transform(0, 1, -1, 0, height , 0); break;
              case 7: canvasContext2.transform(0, -1, -1, 0, height , width); break;
              case 8: canvasContext2.transform(0, -1, 1, 0, 0, width); break;
              default: canvasContext2.transform(1, 0, 0, 1, 0, 0);
            }


            canvasContext2.drawImage(targetImage, 0, 0, width, height);
            var dataURIThumb = canvas2.toDataURL("image/jpeg");
            // var dataURIThumb = tempImage.src;

            var newFileName = Random.id();
            var newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_thumb.' + extension;

            // console.log(dataURIThumb);
            //썸네일
            // var imgThumb = {
            //   type : '_thumb',
            //   bucketUrl : global.s3.bucketPath,
            //   folder : global.s3.folder.story + '/',
            //   fileName : newFileName,
            //   extension : extension,
            //   data : dataURIThumb,
            //   imageClass : imageClass
            // };
            /////////////origin/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            width = targetImage.width;
            height = targetImage.height;

            if(targetImage.width >= targetImage.height){
              if(targetImage.width > 1024){
                width = 1024;
                height = targetImage.height * (1024/targetImage.width);
              }
            } else {
              if(targetImage.height > 800){
                height = 800;
                width = targetImage.width * (800/targetImage.height);
              }
            }

            var canvas = document.createElement('canvas');
            var canvasContext = canvas.getContext("2d");

            orientation = EXIF.getTag(this, "Orientation");
            if ([5,6,7,8].indexOf(orientation) > -1) {
              canvas.width = height;
              canvas.height = width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }

            switch (orientation) {
              case 2: canvasContext.transform(-1, 0, 0, 1, width, 0); break;
              case 3: canvasContext.transform(-1, 0, 0, -1, width, height ); break;
              case 4: canvasContext.transform(1, 0, 0, -1, 0, height ); break;
              case 5: canvasContext.transform(0, 1, 1, 0, 0, 0); break;
              case 6: canvasContext.transform(0, 1, -1, 0, height , 0); break;
              case 7: canvasContext.transform(0, -1, -1, 0, height , width); break;
              case 8: canvasContext.transform(0, -1, 1, 0, 0, width); break;
              default: canvasContext.transform(1, 0, 0, 1, 0, 0);
            }

            canvasContext.drawImage(targetImage, 0, 0, width, height);
            // var dataURI = tempImage.src;
            var dataURI = canvas.toDataURL("image/jpeg");

            newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_origin.' + extension;

            //위치정보 저장
            var latitued = EXIF.getTag(this, "GPSLatitude");
            var longitude = EXIF.getTag(this, "GPSLongitude");

            var image ={
              type : '_origin',
              bucketUrl : global.s3.bucketPath,
              folder : global.s3.folder.story + '/',
              fileName : newFileName,
              extension : extension,
              data : [
                {uri: dataURI, type:'_origin'},
                {uri: dataURIThumb, type:'_thumb'}
              ],
              lat : latitued ? global.fn_toDecimal(latitued) : null,
              lng : longitude ? global.fn_toDecimal(longitude) : null,
              imageClass : imageClass
            };

            // 저장할 데이터
            t.imageArray.push(image);
            t.imageList.set(t.imageArray);
          });
        };
      }; //reader.onload = function
    }); //each

  },
  "click .save":function(e, t){
    e.preventDefault();

    // 데이터 검증
    if(!$('#title').val().trim()){
      // alert('제목을 입력해 주세요.');
      $(".loading").hide();
      var confrimData = {
        title : '제목을 입력해 주세요.',
        context : '',
        templateName : 'contentsEditorBucket',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else if(!$('#context').val().trim()){
      // alert('내용을 입력해 주세요.');
      $(".loading").hide();
      var confrimData = {
        title : '내용을 입력해 주세요.',
        context : '',
        templateName : 'contentsEditorBucket',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else if( $("#category").val() === 'BL0001'){
      var confrimData = {
        title : '카테고리를 선택해주세요.',
        context : '',
        templateName : 'contentsEditor',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else if(!t.imageArray || t.imageArray.length <= 0){
      var confrimData = {
        title : '버킷리스트는 하나 이상의<br/> 이미지를 등록해야합니다.',
        context : '',
        templateName : 'contentsEditor',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    //로딩 인디케이터 시작
    $(".loading").show();

    // 이미지 업로드
    if(t.imageArray.length > 0){
      global.fn_upLoadeS3Image(t.imageArray);

      var tempArray = [];
      _.each(t.imageArray, function(item){
        tempArray.push( _.omit(item, 'data'));
      });
      t.imageArray = tempArray;
    }

    //태그 분리
    var contentId;
    var tagArray = [];
    if($('#tag').val()){
      var tagString = $('#tag').val();
      _.each(tagString.split(','), function(tag){
        var trimTag = tag.trim();
        var pureTag = trimTag.replace(/#/gi,"");
        if(pureTag){
          tagArray.push(pureTag);
        }
      });
    }

    //줄 바꿈 문자를 기준으로 textarea 문자열을 분리
    var context = $("#context").val().replace(/ /g, "&nbsp;");
    var txtBox = document.getElementById("inputbox");
    var lines = context.split("\n");

    //내용을 HTML 버전으로 변경
    var resultString  = "<p>";
    for (var i = 0; i < lines.length; i++) {
      // if(lines[i].trim()){
      resultString += lines[i] + "<br>";
      // }
    }
    resultString += "</p>";


    //DB에 저장 (영역별 저장 내용 수정)
    // var date = global.fn_dateFormat().HMS;
    // var data = {
    //   _id : _id,
    //   userId : Meteor.userId(),
    //   title : $('#title').val(),
    //   context : resultString,
    //   dateTitle : t.dateTitle.get(),
    //   images : t.imageArray,
    //   tagList : tagArray,
    //   type : t.contentType.get(),
    //   subType : t.category.get(),
    //   mDate : $('#mDate').val(),
    //   lock : t.contentType.get() === 'BS' ? $('#lock')[0].checked : false,
    //   question : false,
    //   bucketId : t.contentType.get() === 'BS' ? Session.get('nav_contentsEditorBucket').contentId : undefined,
    //
    //   updateDate : date,
    // };

    var date = global.fn_dateFormat().HMS;
    var bucketData = {
      userId : Meteor.userId(),
      title : $('#title').val(),					//제목
      context : resultString,
      pureContext : resultString.replace(/(<([^>]+)>)/gi, ""),
      images : t.imageArray,
      contextImage : t.imageArray,											// 업로드 이미지
      tagList : tagArray,
      updateDate: date,
      type : t.contentType.get(),
      category : $("#category").val(),
      followCnt : 0,
      tempSave : false,
      lock : $('#lock')[0].checked ? false : true,
      // lock : true,
    };

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0003', _data.userId, t.contentType.get(), 'BL0001'); //컨텐츠 작성
    }

    Meteor.call('setBucketList', '', bucketData, function(error, result){
      if(error){
        console.log(error);
      } else {
        // console.log('finished');

        //화면이동
        //bucket리스트 홈으로 이동
        global.fn_resetSession();
        // Session.set("timelineData",null);
        // Session.set('bucketListData',null);
        // Session.set("bucketListStatus", null);
        // Session.set("scrollPosition", null);
        Router.go('bucketList',{menu:'my'},{replaceState: true});

        followBucket(result.insertedId, Meteor.userId());


      }
    });


  },
  //이미지 삭제
  "click #btnDelete":function(e, t){
    var result = global.fn_removeObjInArr(t.imageArray, 'fileName', this.fileName);
    t.imageArray = result;
    t.imageList.set(result);
  },
  "focus textarea": function(e, t){
    if(t.showCamera.get()){
      t.showCamera.set(false);
      t.showUser.set(false);

      // $(".camera-slide").slideUp();
      $(".camera-slide").addClass('display-none-force');
      $(".btn-camera").removeClass('selected');

      $(".user-slide").addClass('display-none-force');
      $(".btn-user").removeClass('selected');


      $(".content-editor .step2 .pop-top").height(41);
    }
  },
  "click #addherf": function(e, t){
    $("#addherf").attr("href", "javascript:document.getElementById('addImage').click();");
    // location.href="javascript:document.getElementById('addImage').click();";
  },
  "change #lock":function(e, t){
    // console.log('onChange');
    if($('#lock')[0].checked){
      var confrimData = {
        title : '버킷리스트 공개',
        context : '<span class="color-red">전체공개</span> 설정은<br/>다른 회원들과 버킷리스트를<br/>공유하게 되므로, 글의 <span class="color-red">삭제</span> 및 <span class="color-red">수정</span>이<br/>제한 될 수 있습니다.',
        templateName : 'contentsEditorBucketMod',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
    }
  },
});

Template.contentsEditorBucket.helpers({
  hpImageList: function(){
    return Template.instance().imageList.get();
  },
  hpContentType: function() {
    return Template.instance().contentType.get();
  },
  hpCodeList: function() {
    return Template.instance().codeList.get();
  },
  // hpDateTitle: function() {
  //   return Template.instance().dateTitleName.get();
  // },
  // hpHint : function() {
  //   return Template.instance().hint.get();
  // },
  // hpExtraData : function() {
  //   return Template.instance().extraData.get();
  // },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpShowCamera : function(){
    return Template.instance().showCamera.get();
  },
  // hpShowUser  : function(){
  //   return Template.instance().showUser.get();
  // },
});

Template.contentsEditorBucket.onDestroyed(function(){
  $(".loading").hide();
});

function followBucket(_contentId, _userId){
  var currentDate = global.fn_dateFormat().HMS;
  Meteor.call('setFollowBucket', _contentId, _userId, function(error, result){
    if(error){
      console.log(error);
    } else {


      // console.log(result);
      //디테일 화면 변경
      // 1. 따라하기 아이콘 변경
      // var bucketData = instance.bucketData.get();
      // bucketData.dic.followCnt += 1; //따라하기 카운트 1증
      // bucketData.dic.myBucketId = result; //등록된 BL스토리 컨텐츠 ID
      // instance.bucketData.set(bucketData);


      //라이프맵 데이터 (따라하기)입력
      var subjectInfo = global.fn_getSubjectInfo('BL0001');
      var lifeMapObj = {
        contentId: _contentId,
        userId: Meteor.userId(),
        keyword: subjectInfo.keyword,
        images: subjectInfo.images,
        mDate: global.fn_dateFormat(currentDate).YMD,
        updateDate: currentDate,
        batchDate: '',
        isUpdated: 'true',
        type : 'BL',
        subType : 'BL0001', //따라하기 코드
        lock : false,
      };
      Meteor.call('setLifeMap', '', lifeMapObj);

      //따라하기 포인트 추가
      Meteor.call('setPoint', 'PO0007', _userId, 'get', 'BL','DEFAULT', _contentId);
    }
  });
}
