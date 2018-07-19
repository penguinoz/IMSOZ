import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

var template = 'contentsEditor';
var dragFlag = false;
Template.contentsEditor.onCreated(function(){
  var instance = this;

  instance.contentType = new ReactiveVar();
  instance.contentSubType = new ReactiveVar();
  instance.dateTitle = new ReactiveVar();
  instance.dateTitleName = new ReactiveVar();
  instance.hint = new ReactiveVar();
  instance.editorTitle = new ReactiveVar();
  instance.extraData = new ReactiveVar();
  instance.showCamera = new ReactiveVar(false);
  instance.showUser = new ReactiveVar(false);
  instance.imageList = new ReactiveVar();
  instance.imageArray = [];
  instance.initLock = new ReactiveVar();
  instance.question = new ReactiveVar();

  instance.selectedFamily = new ReactiveVar();
  instance.checkCodeOption = new ReactiveVar();


  Session.set('editor_search_user_show',false); //친구검색 화면 띄우는 flag;


  if(Session.get('editor_addUserList') && Session.get('editor_addUserList').length > 0){
    instance.showUser.set(true);
  } //검색, 등록 화면에서 처리된 결과 넘겨받음;

  // Session.set('confrim_center', false);

  //네비게이션 데이터
  var navData ={
    prevTemplate : "contentsEditor"
  };
  //1. 이전 페이지 정보 (새로고침되기전가지 계속 유지)
  Session.set('nav_contentsEditor', Session.get('navData'));
  //2. 넘길 정보
  Session.set('navData', navData);


  var contentType = 'IM'; //기본;
  var contentSubType = 'IM0001';
  var dateTitle = 'DT0001';
  var dateTitleName = '날짜'; //기본 '날짜'
  var editorTitle = '글쓰기';
  var lock = false;
  var question = false;
  var hint = {
    type : "P",
    text : "이야기를 작성해보세요",
  };

  if(Session.get('nav_contentsEditor') && Session.get('nav_contentsEditor').type){
    editorTitle = Session.get('nav_contentsEditor').editorTitle ? Session.get('nav_contentsEditor').editorTitle : editorTitle;
    contentType = Session.get('nav_contentsEditor').type ? Session.get('nav_contentsEditor').type : contentType;
    contentSubType = Session.get('nav_contentsEditor').subType ? Session.get('nav_contentsEditor').subType : contentSubType;
    hint = Session.get('nav_contentsEditor').hint ? Session.get('nav_contentsEditor').hint : hint;
    dateTitle = Session.get('nav_contentsEditor').dateTitle ? Session.get('nav_contentsEditor').dateTitle : dateTitle;
    dateTitleName = global.fn_getCodeName('dateTitle', dateTitle);
    lock = Session.get('nav_contentsEditor').lock ? Session.get('nav_contentsEditor').lock : lock;
    question = Session.get('nav_contentsEditor').question ? Session.get('nav_contentsEditor').question : false;

    switch(contentType){
      case 'BL':
        if(contentSubType === 'BS0001'){
          contentType = 'BS';
        }
      break;
      default:
    }

    // if(contentType === "BL"){
    //   contentType = "BS";
    // } else if(contentType === "TQ"){
    //   contentType = Session.get('nav_contentsEditor').data.type;
    //   instance.contentSubType.set(Session.get('nav_contentsEditor').data.subType);
    //   Meteor.call('getFamilyData', Meteor.userId(), Session.get('nav_contentsEditor').data.subType, function(error, result){
    //     if(error){
    //       console.log(error);
    //     } else {
    //       Session.set('editor_addUserList', result);
    //     }
    //   });
    // } else if (contentType === "BD"){
    //   instance.contentSubType.set(contentType);
    //   Meteor.call('getFamilyData', Meteor.userId(), 'BD0001', function(error, result){
    //     if(error){
    //       console.log(error);
    //     } else {
    //       Session.set('editor_addUserList', result);
    //     }
    //   });
    // } else if (contentType === "TC"){
    //   // instance.contentSubType.set(Session.get('nav_contentsEditor').subType);
    //   instance.contentSubType.set('TC0002');
    // }
  }

  // 추가데이터 설정
  if(Session.get('nav_contentsEditor') && Session.get('nav_contentsEditor').data){
    instance.extraData.set(Session.get('nav_contentsEditor').data);
  }

  instance.contentType.set(contentType);
  // Session.set('contentType', contentType);
  instance.contentSubType.set(contentSubType);
  instance.dateTitle.set(dateTitle);
  instance.dateTitleName.set(dateTitleName);
  instance.hint.set(hint);
  instance.editorTitle.set(editorTitle);
  instance.initLock.set(lock);
  instance.question.set(question);
});

Template.contentsEditor.onRendered(function(){


  var subType=Template.instance().contentSubType.get();
  var guideType = 'guide02_'+subType;

  Meteor.call('checkGuide', guideType, Meteor.userId(), function(error, result){
    if(error){
      console.log(error);
    } else {
      if(!result){
        //가이드 문서
        var template = {};
        template.templateName = 'guide02'; //슬라이드
        switch(subType){
          case 'IM0001': //스토리
          template.data = "/images/bg/guide/guide_스토리.jpg";
          break;
          case 'BD0001'://육아일기
            template.data = "/images/bg/guide/guide_육아일기.jpg";
          break;
          case 'BD0002'://반려동물
            template.data = "/images/bg/guide/guide_반려동물.jpg";
          break;
          case 'TC0001': //타임캡슐
            template.data = "/images/bg/guide/guide_타임캡슐_나.jpg";
          break;
          case 'TC0002': //타임캡슐
            template.data = "/images/bg/guide/guide_타임캡슐_친구.jpg";
          break;
          case 'EN0001': //미리써보는 유서
            template.data = "/images/bg/guide/guide_유서.jpg";
          break;
          case 'BS0001': //버키스토리
          break;
        }

        if(subType !== 'LL0001' && subType !== 'BS0001' && !Session.get('nav_contentsEditor').question){
          Session.set('guidePopTemplate', template);
          //가이드 완료 체크
          Meteor.call('setGuideComplete', guideType, Meteor.userId(), function(error, result){
            if(error){
              console.log(error);
            } else {
            }
          });
        }

      }
    }


  });

  // var date = global.fn_dateFormat(new Date()).YMD;
  // if(Template.instance().date.get()){
  //   date = Template.instance().date.get();
  // }
  // $('#mDate').val(date);

  // $('#mDate').val(global.fn_dateFormat(new Date()).YMD);

  var date = global.fn_dateFormat(new Date()).YMD;
  if(Template.instance().contentType.get() === "TC"){
    date = global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat().YMD, global.timeCapsuleMinDay, 'SUM')).YMD;
  }
  $('#mDate').val(date);

  $j("#mDate").AnyPicker(
  {
    mode: "datetime",
    dateTimeFormat: "yyyy-MM-dd",
    theme: "Android", // "Default", "iOS", "Android", "Windows"
    lang: "ko-kr",
    selectedDate: date,
    minValue : Template.instance().contentType.get() === "TC" ? new Date(new Date().getTime()+1000*60*60*24) : null
    // onChange: function(iRow, iComp, oSelectedValues)
		// {
		// 	console.log("Changed Value : " + iRow + " " + iComp + " " + oSelectedValues);
    //
    //
    //   if(Session.get('contentType') === 'TC'){
    //
    //     var selectedDate =_.pluck(oSelectedValues.values, 'label');
    //     selectedDate = selectedDate[0] +"-"+ selectedDate[1] +"-"+ selectedDate[2];
    //     var diffDays = global.fn_diffDateTime(selectedDate).diffDay;
    //     if(diffDays + 1 < global.timeCapsuleMinDay){
    //       var confrimData = {
    //         title : '타임캡슐 개봉일은 오늘을 기준으로<br/>' + global.timeCapsuleMinDay + '일 이후부터 선택 가능합니다.',
    //         context : '',
    //         templateName : 'contentsEditor',
    //         returnData : null,
    //         singleBtn : true,
    //         btnName : '확인'
    //       };
    //
    //       Session.set('confrim_center', confrimData);
    //       $('#mDate').val(global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat().YMD, global.timeCapsuleMinDay, 'SUM')).YMD);
    //     }
    //   }
		// }
  });






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

Template.contentsEditor.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    // if(Session.get('nav_contentsEditor') && Session.get('nav_contentsEditor').prevTemplate){
    //   if(Session.get('nav_contentsEditor').pageOwnerId && Session.get('nav_contentsEditor').contentId){
    //     //방문자용
    //     Router.go(Session.get('nav_contentsEditor').prevTemplate,  {_id: Session.get('nav_contentsEditor').pageOwnerId, contentId:Session.get('nav_contentsEditor').contentId},{replaceState: false});
    //   }else {
    //     switch(Session.get('nav_contentsEditor').prevTemplate){
    //       case 'bucketDetail':
    //       Router.go('bucketDetail',   {_id: Session.get('nav_contentsEditor').contentId},{replaceState: false});
    //       break;
    //       case 'lifeMap':
    //       if(Session.get('nav_contentsEditor').type === 'BL'){
    //         Router.go('bucketDetail',{_id:Session.get('nav_contentsEditor').contentId},{replaceState: false});
    //       } else {
    //         Router.go('contentDetail',{_id:Session.get('nav_contentsEditor').contentId},{replaceState: false});
    //       }
    //       break;
    //       case 'myPageFriends':
    //       Router.go('myPageFriends',{},{replaceState: false});
    //       break;
    //       case 'contentDetail':
    //       Router.go('contentDetail',{_id: Session.get('nav_contentsEditor').contentId},{replaceState: false});
    //       break;
    //       default:
    //       Router.go('endingNote',{},{replaceState: false});
    //     }
    //   }
    // } else {
    //   Router.go('endingNote',{},{replaceState: false});
    // }
  },
  // "click .next": function(e, t){
  //
  //   //타임캡슐 > '친구에게'' 일 경우 대상을 반드시 선택해야 넘어감
  //   if($('#subcategory').val() === 'TC0002'){
  //     if(!Session.get('editor_addUserList')){
  //       alert('타임캡슐을 보낼 대상을 선택하세요');
  //       return;
  //     }
  //   }
  //
  //   t.displayStep1.set(false);
  // },
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
  //추가된 유저 목록 확인
  "click .btn-user": function(e,t){
    // console.log(t.showCamera);
    if(t.contentSubType.get() !== 'TC0002' && t.contentType.get() !== 'BD'){
      return;
    }


    if(t.showUser.get()){
      t.showUser.set(false);
      t.showCamera.set(false);
      // $(".camera-slide").slideUp();
      $(".user-slide").addClass('display-none-force');
      $(".content-editor .step2 .pop-top").height(41);
      $(".btn-user").removeClass('selected');
    } else {
      t.showUser.set(true);
      t.showCamera.set(false);
      // $(".camera-slide").slideDown();
      $(".camera-slide").addClass('display-none-force');
      $(".btn-camera").removeClass('selected');

      $(".user-slide").removeClass('display-none-force');
      $(".btn-user").addClass('selected');
      $(".content-editor .step2 .pop-top").height(121);
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
  "click #addherf": function(e, t){
    $("#addherf").attr("href", "javascript:document.getElementById('addImage').click();");
    // location.href="javascript:document.getElementById('addImage').click();";
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
  // "change #mDate": function(e, t){
  //   e.preventDefault();
  //
  //   // 임시로 막아놓음 테스트를 위해서
  //   if(t.contentType.get() === 'TC'){
  //     var diffDays = global.fn_diffDateTime($('#mDate').val()).diffDay;
  //     if(diffDays < global.timeCapsuleMinDay){
  //       var confrimData = {
  //         title : '타임캡슐 개봉일은 오늘을 기준으로<br/>' + global.timeCapsuleMinDay + '일 이후부터 선택 가능합니다.',
  //         context : '',
  //         templateName : 'contentsEditor',
  //         returnData : null,
  //         singleBtn : true,
  //         btnName : '확인'
  //       };
  //
  //       Session.set('confrim_center', confrimData);
  //       $('#mDate').val(global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat().YMD, global.timeCapsuleMinDay, 'SUM')).YMD);
  //     }
  //   }
  // },
  // "focusout #mDate": function(e, t){
  //   e.preventDefault();
  //   // 임시로 막아놓음 테스트를 위해서
  //   if(t.contentType.get() === 'TC'){
  //     var diffDays = global.fn_diffDateTime($('#mDate').val()).diffDay;
  //     if(diffDays < global.timeCapsuleMinDay){
  //       var confrimData = {
  //         title : '타임캡슐 개봉일은 오늘을 기준으로<br/>' + global.timeCapsuleMinDay + '일 이후부터 선택 가능합니다.',
  //         context : '',
  //         templateName : 'contentsEditor',
  //         returnData : null,
  //         singleBtn : true,
  //         btnName : '확인'
  //       };
  //
  //       Session.set('confrim_center', confrimData);
  //       $('#mDate').val(global.fn_dateFormat(global.fn_getCalDate(global.fn_dateFormat().YMD, global.timeCapsuleMinDay, 'SUM')).YMD);
  //     }
  //   }
  // },
  "click .save":function(e, t){
    e.preventDefault();

    // 데이터 검증
    if(!$('#title').val().trim()){
      // alert('제목을 입력해 주세요.');
      $(".loading").hide();
      var confrimData = {
        title : '제목을 입력해 주세요.',
        context : '',
        templateName : 'contentsEditor',
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
        templateName : 'contentsEditor',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else if (!$('#mDate').val()){
      $(".loading").hide();
      var confrimData = {
        title : '날짜를 선택해 주세요.',
        context : '',
        templateName : 'contentsEditor',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }

    //타입별 필수 정보 확인
    switch(t.contentType.get()){
      case 'BD':
        if(!Session.get('editor_addUserList') || Session.get('editor_addUserList').length <= 0){

          var title = "육아일기 대상을 선택해주세요."
          if(t.contentSubType.get() === 'BD0002'){
            title = "반려동물일기 대상을 선택해주세요."
          }
          var confrimData = {
            title : title,
            context : '',
            templateName : 'contentsEditor',
            returnData : null,
            singleBtn : true,
            btnName : '확인'
          };

          Session.set('confrim_center', confrimData);
            $(".loading").hide();
          return;
        }
      break;
      case 'TC':
       if(t.contentSubType.get() === 'TC0002' && (!Session.get('editor_addUserList') || Session.get('editor_addUserList').length <= 0)){
         var confrimData = {
           title : '캡슐을 전달할 친구를 선택해주세요.',
           context : '',
           templateName : 'contentsEditor',
           returnData : null,
           singleBtn : true,
           btnName : '확인'
         };

         Session.set('confrim_center', confrimData);
           $(".loading").hide();
         return;
       }
      break;
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
    var _id = Random.id();
    var date = global.fn_dateFormat().HMS;
    var data = {
      _id : _id,
      userId : Meteor.userId(),
      title : $('#title').val(),
      context : resultString,
      dateTitle : t.dateTitle.get(),
      images : t.imageArray,
      tagList : tagArray,
      type : t.contentType.get(),
      subType : t.contentSubType.get(),
      mDate : $('#mDate').val(),
      lock : t.contentType.get() === 'BS' ? $('#lock')[0].checked : false,
      question : false,
      bucketId : t.contentType.get() === 'BS' ? Session.get('nav_contentsEditor').contentId : undefined,

      updateDate : date,
    };

    //오늘의 질문을 통해서 스토리로 작성이 될 수 있음
    if(Session.get('nav_contentsEditor').question){
      data.question = true;
      if(t.extraData.get().profileEtc){
        data.profileEtc = t.extraData.get().profileEtc;
      }
    }


    switch(t.contentType.get()){
      case 'LL': //마지막편지
        data.inheritorId = t.extraData.get().inheritorId;
        setLastLetter(t, data);
      break;
      case 'BD': //육아일기
        data.targetId = Session.get('editor_addUserList') ? _.pluck(Session.get('editor_addUserList'), '_id') : []; //자녀, 반려동물 정보 등록 ['_id','_id','_id','_id','_id']
        data.regDate = date;
        setStory(t, data);
        break;
      case 'TC': //타임캡슐
        data.targetId = Session.get('editor_addUserList') ? _.pluck(Session.get('editor_addUserList'), '_id') : [];
        data.isOpened = false;
        data.isSend = true;
        data.deleted = false;
        data.regDate = date;
        setStory(t, data);

        //친구타임라인에 타임캡슐 정보 추가해준다.
        if(data.subType === 'TC0002'){
          //친구에게 쓸때 친구의 타임라인에도 저장한다.
          _.each(Session.get('editor_addUserList'), function(item){
            data._id = Random.id();
            data.userId = item._id;
            data.targetId = [Meteor.userId()];
            data.capsuleId = _id;
            data.isSend = false;
            data.regDate = date;
            setStory(t, data);
          });

          var friendsIds = _.pluck(Session.get('editor_addUserList'),'_id');
          Meteor.call("getTokenIds", friendsIds, function(err,res){
            if(err)console.log(err);
            if(res && res.length){
              //fcm전송
              var sendObj = {
                tokenId :_.uniq(_.flatten(_.pluck(res, 'fcmToken'))),
                body : global.fn_getSysMessage('msg0001').message,
                title : "It's my story",
                url : global.siteUrl +"/endingNote"
              };
              global.sendFcmMessage(sendObj);
            }
          });
        }
      break;
      default:
        data.regDate = date;
        setStory(t, data);
      break;
    }
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
  //타임캡슐 친구검색 창 오픈
  "click #addFriends":function(e, t){
    Session.set('editor_search_user_show',true);
  },
  //육아일기 자녀/반려동물 검색 창 오픈
  "click #addFamily":function(e,t){
    Session.set('editor_search_user_show',true);
  },
  // 타임캡슐 친구 선택 해제
  "click #delUser": function(e, t){
    var tempUsers = [];
    tempUsers = Session.get('editor_addUserList');
    tempUsers = global.fn_removeObjInArr(tempUsers, '_id', this._id);

    Session.set('editor_addUserList', tempUsers);
  },
  // 육아일기 대상 선택 해제
  "click #delFamily": function(e,t){
    if (confirm("선택된 구성원(" +this.name+ ")의 정보가 영구삭제됩니다.\n\n진행하시겠습니까?") === false) {
      return;
    }
    Meteor.call('removeFamilyData', Meteor.userId(), this._id, function(error, result){
      if(error){
        console.log(error);
      } else {
        //목록 갱신
        Meteor.call('getFamilyData', Meteor.userId(), $('#subcategory').val(), function(error, result){
          if(error){
            console.log(error);
          } else {
            Session.set('editor_addUserList', result);
          }
        });
      }
    });
  },
  "click #headerTitle": function(e, t){
    var subType = t.contentSubType.get();
    var template = {};
    template.templateName = 'guide02'; //슬라이드
    switch(subType){
      case 'IM0001': //스토리
      template.data = "/images/bg/guide/guide_스토리.jpg";
      break;
      case 'BD0001'://육아일기
        template.data = "/images/bg/guide/guide_육아일기.jpg";
      break;
      case 'BD0002'://반려동물
        template.data = "/images/bg/guide/guide_반려동물.jpg";
      break;
      case 'TC0001': //타임캡슐
        template.data = "/images/bg/guide/guide_타임캡슐_나.jpg";
      break;
      case 'TC0002': //타임캡슐
        template.data = "/images/bg/guide/guide_타임캡슐_친구.jpg";
      break;
      case 'EN0001': //미리써보는 유서
        template.data = "/images/bg/guide/guide_유서.jpg";
      break;
    }
    Session.set('guidePopTemplate', template);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0050', Meteor.userId(),'GD', subType); //가이드 시작
    }
  },
  // "keydown textarea":function(e, t){
  //   var el = e.target;
  //   setTimeout(function(){
  //     el.style.cssText = 'height:auto; padding:0';
  //     // for box-sizing other than "content-box" use:
  //     // el.style.cssText = '-moz-box-sizing:content-box';
  //     el.style.cssText = 'height:' + el.scrollHeight + 'px';
  //   },0);
  // }

  // "click #selectFamily": function(e, t){
  //   if(_.contains(t.selectedFamily.get(), this._id)){
  //     //제외
  //     t.selectedFamily.set(global.fn_removeInArr(t.selectedFamily.get(), this._id));
  //   } else {
  //     //선택
  //     var temp = t.selectedFamily.get()? t.selectedFamily.get() :[];
  //     temp.push(this._id);
  //     t.selectedFamily.set(temp);
  //   }
  // }
});

Template.contentsEditor.helpers({
  hpImageList: function(){
    return Template.instance().imageList.get();
  },
  hpContentType: function() {
    return Template.instance().contentType.get();
  },
  hpContentSubType : function(){
    return Template.instance().contentSubType.get();
  },
  hpDateTitle: function() {
    return Template.instance().dateTitleName.get();
  },
  hpHint : function() {
    return Template.instance().hint.get();
  },
  hpEditorTitle : function() {
    return Template.instance().editorTitle.get();
  },
  hpExtraData : function() {
    return Template.instance().extraData.get();
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpSearchShow : function(){
    return  Session.get('editor_search_user_show');
  },
  hpAddUserList : function(){
    return Session.get('editor_addUserList');
  },
  hpCheckCodeOption : function(){
    return Template.instance().checkCodeOption.get();
  },
  hpShowCamera : function(){
    return Template.instance().showCamera.get();
  },
  hpShowUser  : function(){
    return Template.instance().showUser.get();
  },
  hpLockChecked : function() {
    if(Template.instance().initLock.get()){
      return "checked";
    } else {
      return "";
    }
  },
  hpIsQuestion : function() {
    return Template.instance().question.get();
  }
});

Template.contentsEditor.onDestroyed(function(){
  $(".loading").hide();
  Session.set('editor_addUserList',null);
});

//스토리 저장
function setStory(_instance, _contentData){
  Meteor.call('insertStory', _contentData, function(err, res){
    if(err){
      console.log(err);
    } else {
      if(res){
        var _id = res;
        //오늘의 질문 답변시
        if(Session.get('nav_contentsEditor').question){
          var questionObj = {
            userId : Meteor.userId(),
            qCode : _instance.extraData.get().qCode,
            dueDate : _instance.extraData.get().dueDate,
            regDate : global.fn_dateFormat().HMS,
            contentId : _id,
          };

          Meteor.call('setQuestionHistory', questionObj, function(error, result){
            if(error){
              console.log(error);
              $(".loading").hide();
            } else {

            }
          });

          //프로파일 일 경우 프로파일 정보 추가
          if( _instance.extraData.get().profileEtc){
            Meteor.call('setProfileEtcData', Meteor.userId(), _instance.extraData.get().profileEtc, _contentData.mDate, function(error, result){
              if(error){
                console.log(error);
                $(".loading").hide();
              } else {
                //~~
              }
            });
          }

        }


        // _code, _getUse, _type, _content

        setTimeout(function () {
          $(".loading").hide();
          //스크롤 위치를 위해 저장했떤 데이터 삭제
          global.fn_resetSession();
          // Session.set("timelineData",null);
          // Session.set('bucketListData',null);
          // Session.set("bucketListStatus", null);
          // Session.set("scrollPosition", null);
          //
          // Session.set("timelineDataVs",null);
          // Session.set('bucketListDataVs',null);
          // Session.set("bucketListStatusVs", null);
          // Session.set("scrollPositionVs", null);

          if(Session.get('nav_contentsEditor') && Session.get('nav_contentsEditor').prevTemplate){
            switch(Session.get('nav_contentsEditor').prevTemplate){
              case 'endingNote':
              Router.go('endingNote', {},{replaceState: true});
              break;
              case 'bucketDetail' :
              if(Session.get('nav_contentsEditor').pageOwnerId){
                Router.go('bucketDetailVs',  {_id: Session.get('nav_contentsEditor').pageOwnerId, contentId:Session.get('nav_contentsEditor').contentId},{replaceState: true});
              } else {
                Router.go('bucketDetail', {_id:Session.get('nav_contentsEditor').contentId},{replaceState: true});
              }
              break;
              case 'lifeMap':
              if(Session.get('nav_contentsEditor').type==='BL'){
                Router.go('bucketDetail', {_id:Session.get('nav_contentsEditor').contentId},{replaceState: true});
              } else {
                Router.go('endingNote', {},{replaceState: true});
              }
              break;
              default:
              Router.go('endingNote', {},{replaceState: true});
              break;
            }
          } else {
            Router.go('endingNote', {},{replaceState: true});
          }
        }, 2000);

      }
    }
  });
}

//마지막 편지 저장
function setLastLetter(_instance, _contentData){
  Meteor.call('setLastLetter', _contentData, function(error, result){
    if(error){
      console.log(error);
    } else {
      //상속 화면으로 이동
      $(".loading").hide();
      Router.go('inheritanceTo',{},{replaceState: true});
    }
  });
}
