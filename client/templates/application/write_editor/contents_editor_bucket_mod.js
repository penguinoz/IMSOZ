import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

var template = 'contentsEditorBucketMod';
var dragFlag = false;

Template.contentsEditorBucketMod.onCreated(function(){
  var instance = this;

  instance.contentId = instance.data._id;
  instance.bucketData = new ReactiveVar();
  instance.imageList = new ReactiveVar();
  instance.dateTitle = new ReactiveVar();
  instance.dateTitleName = new ReactiveVar();
  instance.showCamera = new ReactiveVar(false);
  instance.codeList = new ReactiveVar();

  instance.bucketId = '';
  instance.imageArray = [];
  instance.imageUploadArray=[];
  instance.imageDelArray = [];

  Session.set('confrim_center', false);

  var dateTitleName = '날짜'; //기본
  var dateTitle = 'DT0001';

  Meteor.call('checkCodeOptionLoad', function(error, result){
    if(error){
      console.log(error);
    } else {
      var codeList = global.fn_getCodeList('bucket');
      codeList = global.fn_removeObjInArr(codeList, 'code', 'BL0001');
      instance.codeList.set(codeList);
    }
  });


  Meteor.call('getBucketById', instance.contentId, function(err, res){
    if(err){
      console.log(err);
    } else {
      instance.bucketData.set(res);
      if(res.images.length > 0){
        instance.imageArray = res.images;
        instance.imageList.set(res.images);
        instance.showCamera.set(true);
      }
      instance.dateTitle.set(res.dateTitle);
      instance.dateTitleName.set(dateTitleName);

      res.context = res.context.replace(/<p>/g, "");
      res.context = res.context.replace(/<\/p>/g, "");
      res.context = res.context.replace(/<br>/g, "\n");
      res.context = res.context.replace(/&nbsp;/g, " ");

      instance.bucketData.set(res);
    }
  });
});

Template.contentsEditorBucketMod.onRendered(function(){

});

Template.contentsEditorBucketMod.events({
  "click #back": function(e, t){
    e.preventDefault();

    window.history.back();
    // Router.go('bucketDetail',{_id:t.contentId},{replaceState: false});
  },
  "click .btn-camera": function(e,t){
    if(t.showCamera.get()){
      t.showCamera.set(false);

      $(".camera-slide").addClass('display-none-force');
      $(".content-editor .step2 .pop-top").height(41);
      $(".btn-camera").removeClass('selected');
    } else {
      t.showCamera.set(true);

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
    if (dragFlag) {
      var obj = $(".slide");
      obj.scrollLeft(x - e.screenX + pre_x);
      obj.scrollTop(y - e.screenY + pre_y);

      return false;
    }
  },
  "mouseup .slide": function(e, t){
    dragFlag = false;
    $(".slide").css("cursor", "default");
  },
  "click #addherf": function(e, t){
    $("#addherf").attr("href", "javascript:document.getElementById('addImage').click();");
  },
  "change #addImage": function(e, t){
    var imageObjs = e.target.files;

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

            // newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_origin.' + extension;

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
            t.imageUploadArray.push(image); //업로드용
            t.imageArray.push(image); //DB입력용
            t.imageList.set(t.imageArray); //화면 출력용
          });
        };
      }; //reader.onload = function
    }); //each

  },
  "click .save":function(e, t){
    e.preventDefault();

    //데이터 검증
    if(!$('#title').val().trim()){
      // alert('제목을 입력해 주세요.');
      $(".loading").hide();
      var confrimData = {
        title : '제목을 입력해 주세요.',
        context : '',
        templateName : 'contentsEditorBucketMod',
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
        templateName : 'contentsEditorBucketMod',
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
    if(t.imageUploadArray.length > 0){
      global.fn_upLoadeS3Image(t.imageUploadArray); //추가된 image등록

      var tempArray = [];
      _.each(t.imageArray, function(item){
        tempArray.push( _.omit(item, 'data'));
      });
      t.imageArray = tempArray;
    }

    if(t.imageDelArray.length > 0){
      global.fn_deleteS3Img(t.imageDelArray); //삭제된 image 삭제
    }

    //태그 분리
    var contentId = t.contentId;
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
      resultString += lines[i] + "<br>";
    }
    resultString += "</p>";




    //DB에 저장
    var _id = Random.id();
    var date = global.fn_dateFormat().HMS;
    var bucketData = {
      title : $('#title').val(),					//제목
      context : context,
      pureContext : context.replace(/(<([^>]+)>)/gi, ""),
      images : t.imageList.get(),
      contextImage : t.imageList.get(),											// 업로드 이미지
      tagList : tagArray,
      updateDate: date,
      category : $("#category").val(),
      tempSave : false,
      lock : $('#lock')[0].checked ? false : true,
    };

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0004', Meteor.userId(), 'BL', 'BL0001'); //컨텐츠 수정
    }

    Meteor.call('setBucketList', t.contentId, bucketData, function(error, result){
      if(error){
        console.log(error);
      } else {
        //화면이동 (버킷리스트 상세)
        Router.go('bucketDetail',{_id:t.contentId},{replaceState: true});
      }
    });

    //함수 호출
  },
  "click #btnDelete":function(e, t){
    if(_.findWhere(t.imageUploadArray, {fileName : this.fileName})){
      // console.log('삭제안해도 됨 : ', this.fileName);
    } else {
      // console.log('삭제해야됨 : ', this.fileName);
      t.imageDelArray.push(this);
    }

    //2. 이후 DB와 화면에 표시될 데이터를 처리한다.
    t.imageArray = global.fn_removeObjInArr(t.imageArray, 'fileName', this.fileName);

    //3. 업로드 대상일경우 대상에서 제외시킴
    t.imageUploadArray = global.fn_removeObjInArr(t.imageUploadArray, 'fileName', this.fileName);

    //4.화면 갱신
    t.imageList.set(t.imageArray);
  },
  "focus textarea": function(e, t){
    if(t.showCamera.get()){
      t.showCamera.set(false);

      $(".camera-slide").addClass('display-none-force');
      $(".btn-camera").removeClass('selected');

      $(".content-editor .step2 .pop-top").height(41);
    }
  },
  "change #lock":function(e, t){
    // console.log('onChange');
    if(!t.bucketData.get().lock){
      var confrimData = {
        title : '버킷리스트 공개해제',
        context : '이미 전체공개 설정된 버킷리스트는<br/><span class="color-red">전체공개 해제를</span> 할 수 없습니다.',
        templateName : 'contentsEditorBucketMod',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };
      Session.set('confrim_center', confrimData);
      $('#lock').prop('checked', true);
      return;
    } else {
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
    }
  },
  // "click #lock": function(e, t){
  //   if($('#lock')[0].checked){
  //     var confrimData = {
  //       title : '버킷리스트 공개',
  //       context : '이미 전체공개 설정된 버킷리스트는 <span class="color-red">전체공개 해제를</span> 할 수 없습니다.',
  //       templateName : 'contentsEditorBucketMod',
  //       returnData : null,
  //       singleBtn : true,
  //       btnName : '확인'
  //     };
  //
  //     Session.set('confrim_center', confrimData);
  //     // Meteor.call("getOtherStoryCount", instance.data._id, instance.userId, function(err,res){
  //     //   if(err){
  //     //     console.log(err);
  //     //   } else {
  //     //     if(!t.lock && res > 0){
  //     //       //공개글이고 남의 글이 있으면
  //     //       var confrimData = {
  //     //         title : '공개 버킷리스트 삭제',
  //     //         context : '다른 회원들이 작성한 버키스토리가 있기 때문에,<br/>버킷리스트를 <span class="color-red">삭제</span> 할 수 없습니다.',
  //     //         templateName : 'bucketDicDetail',
  //     //         returnData : null,
  //     //         singleBtn : true,
  //     //         btnName : '확인'
  //     //       };
  //     //
  //     //       Session.set('confrim_center', confrimData);
  //     //       return;
  //     //     } else {
  //     //       //컨펌
  //     //       var confrimData = {
  //     //         title : '버킷리스트 삭제',
  //     //         context : '버킷리스트를 삭제하면<br/>내가 작성한 <span class="color-red">버키스토리</span>도<br/>함께 <span class="color-red">삭제</span>됩니다.<br/><br/>삭제 하시겠습니까?',
  //     //         templateName : 'bucketDicDetail',
  //     //         returnData : {
  //     //           type : 'bucketDelete',
  //     //           params : 'delete',
  //     //           contentId : t.contentId,
  //     //         },
  //     //         singleBtn : false,
  //     //         btnName : ''
  //     //       };
  //     //
  //     //       Session.set('confrim_center', confrimData);
  //     //     }
  //     //   };
  //
  //   }
  // }
});

Template.contentsEditorBucketMod.helpers({
  hpImageList: function(){
    return Template.instance().imageList.get();
  },
  hpDateTitle: function() {
    return Template.instance().dateTitleName.get();
  },
  hpBucketData: function(){
    return Template.instance().bucketData.get();
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },
  hpShowCamera : function(){
    return Template.instance().showCamera.get();
  },
  hpCodeList: function() {
    return Template.instance().codeList.get();
  },
  hpLockChecked : function() {
    if(Template.instance().bucketData.get().lock){
      return "";
    } else {
      return "checked";
    }
  }
});


Template.contentsEditorBucketMod.onDestroyed(function(){
  $(".loading").hide();
});
