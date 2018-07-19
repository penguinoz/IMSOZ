import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

var template = 'contentsEditorMod';
var dragFlag = false;
Template.contentsEditorMod.onCreated(function(){
  var instance = this;

  instance.contentId = instance.data._id;
  instance.storyData = new ReactiveVar();
  instance.imageList = new ReactiveVar();
  instance.contentType = new ReactiveVar();
  instance.contentSubType = new ReactiveVar();
  instance.dateTitle = new ReactiveVar();
  instance.dateTitleName = new ReactiveVar();
  instance.editorTitle = new ReactiveVar();
  instance.extraData = new ReactiveVar();
  instance.showCamera = new ReactiveVar(false);
  instance.showUser = new ReactiveVar(false);
  instance.bucketId = '';
  instance.imageArray = [];
  instance.imageUploadArray=[];
  instance.imageDelArray = [];
  instance.sharedUsers = [];

  Session.set('addFamily_showProfileImgEditor', false); //가족 프로필 사진 편집 화면
  Session.set('editor_search_user_show',false); //친구검색 화면 띄우는 flag;
  Session.set('editor_add_family_data',false); //가족등록 화면 띄우는 flag;
  Session.set('editor_addUserList',null); //검색, 등록 화면에서 처리된 결과 넘겨받음;

  Session.set('confrim_center', false);

  var dateTitleName = '날짜'; //기본
  var dateTitle = 'DT0001';
  var editorTitle = '글수정';

  Meteor.call("getEditStoryById",instance.data._id, function(err,res){
    if(err){
      console.log(err);
    } else {
      if(res){
        dateTitle = res.dateTitle;
        dateTitleName = res.dateTitle ? global.fn_getCodeName('dateTitle', res.dateTitle) : '날짜';
        instance.storyData.set(res);
        if(res.images.length > 0){
          instance.imageArray = res.images;
          instance.imageList.set(res.images);
          instance.showCamera.set(true);
        }
        instance.sharedUsers = global.fn_removeInArr(res.groupUsers, Meteor.userId());
        instance.contentType.set(res.type);
        instance.contentSubType.set(res.subType);
        instance.dateTitle.set(res.dateTitle);
        instance.dateTitleName.set(dateTitleName);
        instance.editorTitle.set(global.fn_getCodeName('subject',res.type));

        switch(res.type){
          case 'BD':
            Meteor.call('getFamilyData', Meteor.userId(), res.subType, function(error, result){
              if(error){
                console.log(error);
              } else {
                var selectedFamily = _.filter(result, function(item){return _.contains(res.targetId, item._id);});
                Session.set('editor_addUserList', selectedFamily);
                if(selectedFamily.length > 0 && !instance.showCamera.get()){
                  instance.showUser.set(true);
                }
              }
            });
          break;
          case 'BS':
            instance.bucketId = res.bucketId;
          break;
          case 'TC':
            if(res.subType === 'TC0002'){
              Meteor.call("getSearchMyFriends", Meteor.userId(), '',function(error,result){
                if(error){
                  console.log(error);
                }else{
                  _.each(result, function(item){
                    item.name = item.profile.name;
                    item.profileImg = item.profile.profileImg;
                  });
                  var selectedFriends = _.filter(result, function(item){return _.contains(res.targetId, item._id);});
                  Session.set('editor_addUserList', selectedFriends);
                  if(selectedFriends.length > 0 && !instance.showCamera.get()){
                    instance.showUser.set(true);
                  }
                }
              });
            }
          break;
        }
      } else {
        Meteor.call("getLastLetter",instance.data._id, function(err,res){
          if(err){
            console.log(err);
          } else {
            instance.storyData.set(res);
            if(res.images.length > 0){
              instance.imageArray = res.images;
              instance.imageList.set(res.images);
              instance.showCamera.set(true);
            }

            instance.contentType.set(res.type);
            instance.contentSubType.set(res.subType);
            instance.dateTitle.set(res.dateTitle);
            instance.dateTitleName.set(dateTitleName);
            instance.editorTitle.set('마지막편지');
          }
        });
      }






    }
  });











  // if(Session.get('navData') && Session.get('navData').type){
  //   switch(Session.get('navData').type){
  //     //미지막편지 수정
  //     case 'LL':
  //     Meteor.call("getLastLetter",instance.data._id, function(err,res){
  //       if(err){
  //         console.log(err);
  //       } else {
  //         instance.storyData.set(res);
  //         if(res.images.length > 0){
  //           instance.imageArray = res.images;
  //           instance.imageList.set(res.images);
  //           instance.showCamera = true;
  //         }
  //
  //         instance.contentType.set(res.type);
  //       }
  //     });
  //     break;
  //     //육아일기 수정
  //     case 'BD':
  //     Meteor.call("getEditStoryById",instance.data._id, function(err,res){
  //       if(err){
  //         console.log(err);
  //       } else {
  //         instance.storyData.set(res);
  //         if(res.images.length > 0){
  //           instance.imageArray = res.images;
  //           instance.imageList.set(res.images);
  //           instance.showCamera = true;
  //         }
  //
  //         instance.contentType.set(res.type);
  //         instance.contentSubType.set(res.subType);
  //         instance.selectedFamily.set(res.targetId);
  //
  //         Meteor.call('getFamilyData', Meteor.userId(), res.subType, function(error, result){
  //           if(error){
  //             console.log(error);
  //           } else {
  //             Session.set('editor_addUserList', result);
  //           }
  //         });
  //
  //       }
  //     });
  //
  //     break;
  //     case "TC":
  //     //전달받은 contentId를 통해서 데이터 로드
  //     Meteor.call("getEditStoryById",instance.data._id, function(err,res){
  //       if(err){
  //         console.log(err);
  //       } else {
  //         instance.contentSubType.set('TC0002');
  //         instance.storyData.set(res);
  //         if(res.images.length > 0){
  //           instance.imageArray = res.images;
  //           instance.imageList.set(res.images);
  //           instance.showCamera = true;
  //         }
  //
  //         instance.contentType.set(res.type);
  //       }
  //     });
  //     break;
  //     default :
  //     //전달받은 contentId를 통해서 데이터 로드
  //     Meteor.call("getEditStoryById",instance.data._id, function(err,res){
  //       if(err){
  //         console.log(err);
  //       } else {
  //         instance.storyData.set(res);
  //         if(res.images.length > 0){
  //           instance.imageArray = res.images;
  //           instance.imageList.set(res.images);
  //           instance.showCamera = true;
  //         }
  //
  //         instance.contentType.set(res.type);
  //       }
  //     });
  //   }
  // }

  if(Session.get('navData') && Session.get('navData').data){
    instance.extraData.set(Session.get('navData').data);
  }
});

Template.contentsEditorMod.onRendered(function(){
  // $(".camera-slide").hide();
  // $(".content-editor .step2 .pop-top").height(125);
  // $("#mDate").AnyPicker(
  // {
  //   mode: "datetime",
  //   dateTimeFormat: "yyyy-MM-dd",
  //   theme: "Android", // "Default", "iOS", "Android", "Windows"
  //   lang: "ko-kr"
  // });
  $("#addherf").attr("href", "javascript:document.getElementById('addImage').click();");
});

Template.contentsEditorMod.events({
  "click #back": function(e, t){
    e.preventDefault();
    window.history.back();
    // if(Session.get('navData') && Session.get('navData').prevTemplate){
    //   if(Session.get('navData').pageOwnerId && Session.get('navData').contentId){
    //     Router.go(Session.get('navData').prevTemplate,  {_id: Session.get('navData').pageOwnerId, contentId:Session.get('navData').contentId},{replaceState: false});
    //   }else {
    //     switch(Session.get('navData').prevTemplate){
    //       case 'inheritanceTo':
    //         Router.go('inheritanceTo', {},{replaceState: false});
    //         break;
    //       default:
    //         Router.go('contentDetail',  {_id:t.contentId},{replaceState: false});
    //         break;
    //     }
    //   }
    // } else {
    //   Router.go('contentDetail',{_id:t.contentId},{replaceState: false});
    // }
  },
  // "click .next": function(e, t){
  //
  //   if($('#subcategory').val() === 'TC0002'){
  //     if(!Session.get('editor_addUserList')){
  //       alert('타임캡슐을 보낼 대상을 선택하세요');
  //       return;
  //     }
  //   }
  //
  //
  //   // 처음시작할때 herf가 등록되지 않는 문제가 있어서 추가함
  //   $("#addherf").attr("href", "javascript:document.getElementById('addImage').click();");
  // },
  "click .btn-camera": function(e,t){
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

    // console.log(t.showCamera);
    // if(t.showCamera){
    //   t.showCamera=false;
    //   // $(".camera-slide").slideUp();
    //   $(".camera-slide").hide();
    //   $(".content-editor .step2 .pop-top").height(46);
    // } else {
    //   t.showCamera=true;
    //   // $(".camera-slide").slideDown();
    //   $(".camera-slide").show();
    //   $(".content-editor .step2 .pop-top").height(125);
    // }

  },
  //추가된 유저 목록 확인
  "click .btn-user": function(e,t){
    // console.log(t.showCamera);
    if(t.contentSubType.get() === 'TC0002'){
      var confrimData = {
        title : '타임캡슐은 대상을 수정 할 수 없습니다.',
        context : '',
        templateName : 'contentsEditorMod',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
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


    // $('#result').text(dragFlag);
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
        templateName : 'contentsEditorMod',
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
        templateName : 'contentsEditorMod',
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
          var confrimData = {
            title : '육아일기 대상을 선택해주세요',
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
           title : '캡슐을 전달할 친구를 선택해주세요',
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
      // if(lines[i].trim()){
      resultString += lines[i] + "<br>";
      // }
    }
    resultString += "</p>";




    //DB에 저장
    var _id = Random.id();
    var date = global.fn_dateFormat().HMS;
    var data = {
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
      bucketId : t.contentType.get() === 'BS' ? t.bucketId : undefined,
      updateDate : date,
      // userId: Meteor.userId(),
    };

    // if( t.storyData.get().profileEtc){
    //   data.profileEtc = t.storyData.get().profileEtc;
    // }

    switch(t.contentType.get()){
      case 'LL':
        //마지막 편지 저장
        data.inheritorId = t.extraData.get().inheritorId;
        setLastLetter(t, data);
      break;
      case 'BD':
        data.targetId = Session.get('editor_addUserList') ? _.pluck(Session.get('editor_addUserList'), '_id') : []; //자녀, 반려동물 정보 등록 ['_id','_id','_id','_id','_id']
        setStory(t, contentId, data);
        //공유된 사용자 것 같이 수정
        if(t.sharedUsers && t.sharedUsers.length > 0){
          //공유된 컨텐츠 ID 확인
          Meteor.call('getSharedData', contentId, t.sharedUsers, function(error, result){
            if(error){
              console.log(error);
            } else {
              //result = ['sss','ddddd','bbbb'];
              _.each(result, function(item){
                setStory(t, item, data);
              });
            }
          });
        }
      break;
      case 'TC':
        // data.targetId = Session.get('editor_addUserList') ? _.pluck(Session.get('editor_addUserList'), '_id') : [];
        // data.isOpened = false;
        // data.isSend = true;
        // data.deleted = false;
        setStory(t, contentId, data);

        //친구캡슐의 정보도 수정해준다.
        if(data.subType === 'TC0002'){
          Meteor.call('getReceiversContents', contentId, 'TC', function(error, result){
            if(error){
              console.log(error);
            } else {
              //친구에게 쓸때 친구의 타임라인에도 저장한다.
              _.each(result, function(item){

                // data.userId = item.userId;
                // data.targetId = [Meteor.userId()];
                // data.capsuleId = contentId;
                // data.isSend = false;
                setStory(t, item._id, data);
              });
            }
          });
        }
      break;
      default:
        setStory(t, contentId, data);

        //공유된 사용자 것 같이 수정
        if(t.sharedUsers && t.sharedUsers.length > 0){
          //공유된 컨텐츠 ID 확인
          Meteor.call('getSharedData', contentId, t.sharedUsers, function(error, result){
            if(error){
              console.log(error);
            } else {
              //result = ['sss','ddddd','bbbb'];
              _.each(result, function(item){
                setStory(t, item, data);
              });
            }
          });
        }
      break;
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0004', Meteor.userId(), t.contentType.get(), t.contentSubType.get()); //컨텐츠 수정
    }
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
});

Template.contentsEditorMod.helpers({
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
  hpExtraData : function() {
    return Template.instance().extraData.get();
  },
  hpStoryData: function(){
    return Template.instance().storyData.get();
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
  hpShowCamera : function(){
    return Template.instance().showCamera.get();
  },
  hpShowUser  : function(){
    return Template.instance().showUser.get();
  },
  hpEditorTitle : function(){
    return Template.instance().editorTitle.get();
  },
  hpLockChecked : function() {
    if(Template.instance().storyData.get().lock){
      return "checked";
    } else {
      return "";
    }
  }
});


Template.contentsEditorMod.onDestroyed(function(){
  $(".loading").hide();
  Session.set('editor_addUserList',null);
});

//스토리 저장
function setStory(_instance, _contentId, _contentData){
  // console.log(setData);
  Meteor.call('storyUpsert', _contentId, _contentData, function(err, res){
    if(err){
      console.log(err);
    } else {

      //프로파일ETC에 정보수정
      if(_contentData.profileEtc){
        Meteor.call('setProfileEtcData', Meteor.userId(), _contentData.profileEtc, _contentData.mDate, function(error, result){
          if(error){
            console.log(error);
            $(".loading").hide();
          } else {
            //~~
          }
        });
      }

      var typeCheck = _contentData.type
      if(typeCheck === 'TC'){
        typeCheck = 'TC';
      }

      setTimeout(function () {
        $(".loading").hide();
        // Router.go('contentDetail',  {_id: contentId},{replaceState: false});
        //스크롤 위치를 위해 저장했떤 데이터 삭제
        global.fn_resetSession();
        // Session.set("timelineData",null);
        // Session.set('bucketListData',null);
        // Session.set("bucketListStatus", null);
        // Session.set("scrollPosition", null);

        // Session.set("timelineDataVs",null);
        // Session.set('bucketListDataVs',null);
        // Session.set("bucketListStatusVs", null);
        // Session.set("scrollPositionVs", null);


        if(Session.get('navData') && Session.get('navData').prevTemplate && typeCheck !== 'TC'){
          if(Session.get('navData').pageOwnerId){
            Router.go('contentDetailVs',  {_id: Session.get('navData').pageOwnerId, contentId:_contentId},{replaceState: true});
          } else {
            switch(Session.get('navData').prevTemplate){
              case 'inheritanceTo':
                Router.go('inheritanceTo', {},{replaceState: true});
                break;
              default:
                Router.go('contentDetail',  {_id:_contentId},{replaceState: true});
                break;
            }
          }
        } else {
          Router.go('endingNote', {},{replaceState: true});
        }

      }, 2000);


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
