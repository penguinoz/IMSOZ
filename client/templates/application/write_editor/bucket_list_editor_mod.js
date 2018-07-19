import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

// 나는 > 글쓰기(추억작성)
var templateName = 'bucketListEditorMod';

var imgFirstTimeUpload = true;
var imageArray = [];
var addImageTemp = [];
var removeImageList=[];
var image = {};



Template[templateName].onCreated(function(){
  removeImageList=[];
  imageArray = [];
  addImageTemp = [];
  image = {};

  var instance = this;
  instance.bucketLockInfo = false;
  instance.codeType = new ReactiveVar('bucket');
  instance.imageList = new ReactiveVar();
  instance.bucketData = new ReactiveVar();
  instance.contentId = this.data._id;

  // Meteor.call('getBucketById', this.data._id, function(err, res){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     instance.bucketData.set(res);
  //     instance.$('div.froala-reactive-meteorized').froalaEditor('html.set',res.context);
  //
  //     if(res.images.length > 0){
  //       instance.imageList.set(res.images);
  //     }
  //   }
  // });

});


Template[templateName].onRendered(function(){
  var instance = Template.instance();
  Meteor.call('getBucketById', Template.instance().data._id, function(err, res){
    if(err){
      console.log(err);
    } else {
      instance.bucketData.set(res);

      $('div.froala-reactive-meteorized').froalaEditor('html.set',res.context);

      if(res.images.length > 0){
        instance.imageList.set(res.images);
      }

      if(res.contextImage && res.contextImage.length > 0){
        imageArray = res.contextImage;
      }
    }
  });
});

Template[templateName].helpers({
  hpGetContext: function () {
    var self = this;
    return {
      key: global.editorSettings.key,
      heightMin : global.editorSettings.heightMin,
      imageMaxSize: global.editorSettings.imageMaxSize,
      toolbarStickyOffset: 56,
      toolbarSticky: true,
      toolbarButtons: global.editorSettings.toolbarButtons,
      toolbarButtonsMD: global.editorSettings.toolbarButtons,
      toolbarButtonsSM: global.editorSettings.toolbarButtons,
      toolbarButtonsXS: global.editorSettings.toolbarButtons,
      imageUploadToS3: global.editorSettings.imageUploadToS3,
      imageEditButtons: global.editorSettings.imageEditButtons,
      linkInsertButtons: ['linkBack'],
      linkEditButtons: ['linkEdit', 'linkRemove'],
      videoEditButtons: ['videoReplace', 'videoRemove', '|', 'videoDisplay', 'videoAlign', 'videoSize'],
      videoDefaultAlign: 'left',
      videoDefaultWidth: 200,
      imageDefaultAlign: 'left',
      imagePaste: false,
      pluginsEnabled: ['image','codeView','draggable','fontSize', 'url','colors','align','link', 'video'],
      initOnClick: false,
      placeholderText: null,
      charCounterCount: false,
      dragInline: true,

      "_onimage.loaded": function (e, editor, img) {
        //originRe이미지로 에디터에 이미지를 교체

        // 이미지 소스를 변경하면 다시 loaded가 동작하는것을 방지하기 위해서 imgFirstTimeUpload사용
        setTimeout(function(){
          if(imgFirstTimeUpload){
            //에디터 등록 화면에 등록될 이미지를 보여주기 위해서 originRe를 선 Upload한다 (이미지 방향전환, 재 정의된 이미지 사용)
            editor.image.get().removeAttr('src').attr('src',global.fn_makeImageSrc(image , 'origin'));
            imgFirstTimeUpload = false;
            $(".loading").hide();
          }
        }, 500);
      }, //end _onimage.loaded

      "_onimage.beforeUpload": function (e, editor, img) {
        $(".loading").show();
        image = {};
        var imageObj = img[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageObj);
        var extension = imageObj.name.substring(imageObj.name.lastIndexOf('.')+1);

        reader.onload = function  () {
          var tempImage = new Image();
          tempImage.src = reader.result;
          tempImage.onload = function () {
            var targetImage = this;

            //원본수정(thumbnail)용 canvas생성
            //휴대전화 rotate된 사진 똑바로 보이게 수정
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
              var newFilePath = global.s3.bucketPath + global.s3.folder.bucketList + '/' + newFileName + '_thumb.' + extension;

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

              newFilePath = global.s3.bucketPath + global.s3.folder.bucketList + '/' + newFileName + '_origin.' + extension;

              //위치정보 저장
              var latitued = EXIF.getTag(this, "GPSLatitude");
              var longitude = EXIF.getTag(this, "GPSLongitude");

              image ={
                type : '_origin',
                bucketUrl : global.s3.bucketPath,
                folder : global.s3.folder.bucketList + '/',
                fileName : newFileName,
                extension : extension,
                data : [
                  // {uri: dataURI, type:'_thumb'},
                  {uri: dataURI, type:'_origin'}
                ],
                lat : latitued ? global.fn_toDecimal(latitued) : null,
                lng : longitude ? global.fn_toDecimal(longitude) : null,
                imageClass : imageClass
              };

              // 저장할 데이터
              addImageTemp.push(image);
              // imageArray.push(image);
              // imageList = imageArray;

              // console.log(imageList);
              //썸내일을 위해 미리 업로드
              global.fn_upLoadeS3Image(image);
              imgFirstTimeUpload = true;
            });
          };
        };
      },
      "_onimage.beforeRemove": function (e, editor, img) { //이미지 삭제전
        if($(img[0]).attr("src").split("iml-images/")[1]){
          var deleteString = $(img[0]).attr("src").split("iml-images/")[1];
          var fileString = deleteString.split(global.s3.folder.bucketList + '/')[1];
          var extension = fileString.split('_origin.')[1];
          var fileName = fileString.split('_origin.')[0];

          var delImage ={
            folder : global.s3.folder.bucketList + '/',
            fileName : fileName,
            extension : extension,
          };

          var unionImage = _.union(addImageTemp, imageArray);

          imageArray = global.fn_removeObjInArr(unionImage, 'fileName', delImage.fileName);
          removeImageList.push(delImage);
        }
      } // end _onimage.beforeRemove

    };
  },
});

Template[templateName].events({
  "click #back": function(e,t){
    e.preventDefault();
    window.history.back();
    // Router.go('bucketList',{menu:'all'},{replaceState: false});
  },
  "click #saveWriteMe, click #saveTemp": function(e, t){
    e.preventDefault();

    var tempSave = true;
    if(e.currentTarget.id === "saveWriteMe"){
      tempSave = false;
    }

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
    }  else if( $("#category").val() === 'BL0001'){
      var confrimData = {
        title : '카테고리를 선택해주세요.',
        context : '',
        templateName : 'contentsEditor',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
    }

    if(removeImageList && removeImageList.length > 0){
      global.fn_deleteS3Img(removeImageList);
    }

    //대표이미지 업로드
    if(t.imageList.get().length > 0 && removeImageList && removeImageList.length > 0){
      global.fn_upLoadeS3Image(t.imageList.get());

      var tempArray = [];
      _.each(t.imageList.get(), function(item){
        tempArray.push( _.omit(item, 'data'));
      });
      t.imageList.set(tempArray);
    }

    //불필요 데이터 제거
    if(imageArray.length > 0){
      var tempArray = [];
      _.each(imageArray, function(item){
        tempArray.push( _.omit(item, 'data'));
      });
      imageArray = tempArray;
    }

    $('.mCS_img_loaded').removeClass('fr-dragging');
    //태그 분리
    var contentId;
    var tagArray = [];
    if($('#tag').val()){
      var tagString = $('#tag').val();
      _.each(tagString.split(','), function(tag){
        tagArray.push(tag.trim());
      });
    }

    var context = t.$('div.froala-reactive-meteorized').froalaEditor('html.get', true, {imagePasteProcess: true});
    var bucketData = {
      title : $('#title').val(),					//제목
      context : context,
      pureContext : context.replace(/(<([^>]+)>)/gi, ""),
      images : t.imageList.get(),
      contextImage : _.union(addImageTemp, imageArray),											// 업로드 이미지
      tagList : tagArray,
      updateDate: global.fn_dateFormat().HMS,
      type : 'BL',
      category : $("#category").val(),
      followCnt : 0,
      tempSave : tempSave,
    };

    // console.log(bucketData);



    Meteor.call('setBucketList', t.contentId, bucketData, function(error, result){
      if(error){
        console.log(error);
      } else {
        // console.log('finished');

        //화면이동
        //bucket리스트 홈으로 이동
        Router.go('bucketList',{menu:'all'},{replaceState: true});
      }
    });

    addImageTemp = [];
    imageArray = [];
    removeImageList = [];
  },
  "click #cancelWriteMe": function(e, t){
    //취소버튼
    //1. alert
    //2. 취소 진행
    // 1) 첨부된 이미지 있으면 삭제
    // if(addImageTemp && addImageTemp.length > 0){
    //   global.fn_deleteS3Img(addImageTemp);
    // }

    removeImageList = [];

    // if(removeImageList && removeImageList.length > 0){
    //   global.fn_deleteS3Img(removeImageList);
    // }
    // 2) 버킷홈 화면으로 이동
    Router.go('bucketList',{menu:'all'},{replaceState: true});
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
            var newFilePath = global.s3.bucketPath + global.s3.folder.bucketList + '/' + newFileName + '_thumb.' + extension;

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

            newFilePath = global.s3.bucketPath + global.s3.folder.bucketList + '/' + newFileName + '_origin.' + extension;

            //위치정보 저장
            var latitued = EXIF.getTag(this, "GPSLatitude");
            var longitude = EXIF.getTag(this, "GPSLongitude");

            var image ={
              type : '_origin',
              bucketUrl : global.s3.bucketPath,
              folder : global.s3.folder.bucketList + '/',
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
            if(t.imageList.get()){
              removeImageList = t.imageList.get();
            }
            t.imageList.set([image]);
          });
        };
      }; //reader.onload = function
    }); //each

  },
  "click #btnDelete":function(e, t){
    // var result = global.fn_removeObjInArr(t.imageArray, 'fileName', this.fileName);
    // t.imageArray = result;
    removeImageList = t.imageList.get();
    t.imageList.set('');
  },
  "click #removeBucket":function(e, t){
    e.preventDefault();

    // 등록된 버킷리스트 삭제
    Meteor.call('removeBucketList', t.contentId, function(error, result){
      if(error){
        console.log(error);
      } else {
        // 등록된 s3 이미지 모두 삭제
        if(t.imageList.get() && t.imageList.get().length > 0){
          global.fn_deleteS3Img(t.imageList.get());
        }

        if(imageArray && imageArray.length > 0){
          global.fn_deleteS3Img(imageArray);
        }
        if(removeImageList && removeImageList.length > 0){
          global.fn_deleteS3Img(removeImageList);
        }

        //페이지 전환
        Router.go('bucketList',{menu:'all'},{replaceState: true});
      }
    });
  }

});


Template[templateName].helpers({
  hpCodeType: function() {
    return Template.instance().codeType.get();
  },
  hpImageList: function(){
    return Template.instance().imageList.get();
  },
  hpBucketData : function(){
    return Template.instance().bucketData.get();
  }
});

Template[templateName].onDestroyed(function(){
  //취소했을경우 기존 올렸던 이미지 삭제 필요
  if(addImageTemp && addImageTemp.length > 0){
    global.fn_deleteS3Img(addImageTemp);
  }
  if(removeImageList && removeImageList.length > 0){
    global.fn_deleteS3Img(removeImageList);
  }

  Session.set('delegate_image', null);
  $(".loading").hide();
});
