import MyEditor from '/imports/avatar-editor';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random';

var templateName = 'editProfileImage';
var instance;
Template[templateName].onCreated(function(){
  instance = this;
  instance.preTemplateData = null;

  instance.imageData = this.data;
  // instance.imageSrc = this.data.img;

  var currentImage = {
    img : global.fn_makeImageSrc(this.data.profileImg, '')
  };

  if(this.data.data){
    instance.preTemplateData = this.data.data;
  }

  instance.setDefaultImg = false;
  instance.profileImgOriginRe = null;
  // instance.imageUrl = new ReactiveVar(this.data.imageSrc);
  instance.targetFile = new ReactiveVar(null);
  Session.set('useImageEditor', false);
  Session.set('previewImageInfo', null);
  Session.set('imageInfo', currentImage);
  // global.fn_setS3UploadInfo(global.s3.folder.profile);
  // <img src={{preview.img}}/>
  //instance.useImageEditor = new ReactiveVar(false);
});

Template[templateName].helpers({
  AvatarEditor: function(){
    return MyEditor;
  },
  hpImageSrc: function(){
    return Session.get('imageInfo');
  },
  hpImageTarget: function(){
    return Template.instance().targetFile.get();
  },
  hpUseImageEditor: function(){
    return  Session.get('useImageEditor');
  }
});


Template[templateName].events({
  "click #saveStep1" : function(e, t){
    // //에디터에서 이벤트 걸려있음 (avatar-editor.js 참고)
    // Session.set('useImageEditor', false);
    // var img = editor.getImageScaledToCanvas().toDataURL();
    // var rect = editor.getCroppingRect();
    //
    // //여기서 원본, thumb, originRe를 구분해서 던져줘야 함;;;;
    // var imageInfo = {
    //     img:img,
    //     rect:rect,
    //     scale: this.state.scale,
    //     width: this.state.width,
    //     height: this.state.height,
    //     borderRadius: this.state.borderRadius
    // };
    // Session.set('imageInfo', imageInfo);
    // handleSave();
  },
  "click #cancelStep1": function(e, t){
    t.targetFile.set(null);
    Session.set('useImageEditor', false);
  },
  "click .setDefault":function(e, t){
    //팝업을 띄워서삭제 확인 여부 체크
    var imageInfo = {
      img : _.sample(global.defaultProfileImg)
    };
    Session.set('imageInfo', imageInfo);
    t.setDefaultImg = true;
    t.targetFile.set(null);
  },
  // [프로필관리] 프로필업로드
  "change .txtImageFile": function(e, t){
    e.preventDefault();

    t.targetFile.set(e.target.files[0]);
    // $('.black-over').css('background-color','#000000');
    Session.set('useImageEditor', true);
  },
  "click #back": function(e, t){
    e.preventDefault();

    if(Session.get('useImageEditor')){
      // $('.black-over').css('background-color','#ffffff');
      Session.set('useImageEditor', false);
    } else {
      switch (t.data.fromTemp) {
        case 'myInfo':
          // Router.go('myPageInfo',{},{replaceState: false});
          // template = {};
          // template.templateName = "myInfo";
          // Session.set("myPage_selectedTemplate", template);
          // Session.set("footer_selectedMenu", 'myInfo');
          Session.set("footer_selectedMenu", 'myInfo');
          var template = {
            templateName : 'myPage',
            header : false
          };
          Session.set("index_contentsTemplate", template);
        break;
        case 'addFamily':

          var data = {
            _id: t.preTemplateData._id,
            isShow : true,
            name : t.preTemplateData.name,
            birthday : t.preTemplateData.birthday,
            sex : t.preTemplateData.sex,
            subType: t.preTemplateData.subType,
            profileImg : t.data.profileImg,
          };
          Session.set('editor_add_family_data',data);

          data = {
            isShow : false,
          };
          Session.set('addFamily_showProfileImgEditor', data);

        break;
        default:
          // Session.set("footer_selectedMenu", 'endingNote');
          Session.set("footer_selectedMenu", 'endingNote');
          // var contentId = this.params._id;
          var template = {
            templateName : 'endingNote',
            header : true,
          };
          Session.set("index_contentsTemplate", template);

      }

    }
  },

  "click #saveStep2" : function(e, t){
    e.preventDefault();

    var template = {};
    switch (instance.data.fromTemp) {
      case 'myInfo':
        // Session.set("footer_selectedMenu", 'myInfo');
        Session.set("footer_selectedMenu", 'myInfo');
        template = {
          templateName : 'myPage',
          header : false,
        };
      break;
      default:
        // Session.set("footer_selectedMenu", 'endingNote');
        Session.set("footer_selectedMenu", 'endingNote');
        template = {
          templateName : 'endingNote',
          header : true,
        };
    }

    // console.log("saveStep2");
    //새로운 이미지 있으면
    if(t.targetFile.get()){
      $(".loading").show();
      var dataURI = Session.get('imageInfo').img;
      // 새로운 데이터 업로드


      var newFileName = Random.id();
      // var newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_thumb.' + extension;

      var image ={
        type: '_origin',
        bucketUrl : global.s3.bucketPath,
        folder : global.s3.folder.profile + '/',
        fileName : newFileName,
        extension : 'png',
        data : [
          {uri: dataURI, type:'_origin'},
        ],
      };

      global.fn_upLoadeS3Image(image); //추가된 image등록
      //

      if(instance.data.fromTemp === 'addFamily'){
        // 가족 프로필 이미지 변경
        //이미지 정보만 리턴해줘야함

        setTimeout(function () {
          //이미지 정보 리턴
          var data = {
            _id: t.preTemplateData._id,
            isShow : true,
            name : t.preTemplateData.name,
            birthday : t.preTemplateData.birthday,
            sex : t.preTemplateData.sex,
            subType: t.preTemplateData.subType,
            profileImg : image
          }

          Session.set('editor_add_family_data',data);

          //프로필 이미지 편집 닫기
          var imageData = {
            isShow : false,
          };

          Session.set('addFamily_showProfileImgEditor', imageData);
          $(".loading").hide();
        }, 1000);

      } else {
        //프로필 이미지, 엔딩노트 이미지 변경
        Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.profileImg':image}}, function(error, result){
          if(error){
            console.log(error);
          } else {

            setTimeout(function () {
              $(".loading").hide();
              Session.set("index_contentsTemplate", template);
            }, 1000);

          }
        });
      }


      //기존데이터 있으면 삭제
      if(t.imageData && t.imageData.profileImg){
        // console.log('기존에 등록된 이미지 있음');
        // console.log('기존데이터 삭제');
        global.fn_deleteS3Img(t.imageData.profileImg);
      } else {
        // console.log('기존에 등록된 이미지 없음');
      }

    } else { //이미지 변경/추가 하지 않았을 경우
      // console.log('추가된 데이터 없음');

      //기본이미지 선택
      if (t.setDefaultImg && t.imageData && t.imageData.profileImg){
        // console.log('기존데이터 삭제');
        global.fn_deleteS3Img(t.imageData.profileImg);

        //DB업데이트
        if(instance.data.fromTemp === 'addFamily'){
          // 가족 프로핑 이미지 기본이미지로 변경
          // 이미지 정보만 리턴해줘야함
            //이미지 정보 리턴
          var data = {
            isShow : true,
            name : t.preTemplateData.name,
            birthday : t.preTemplateData.birthday,
            sex : t.preTemplateData.sex,
            subType: t.preTemplateData.subType,
            profileImg : ''
          };

          Session.set('editor_add_family_data',data);

          //프로필 이미지 편집 닫기
          var imageData = {
            isShow : false,
          };

          Session.set('addFamily_showProfileImgEditor', imageData);
          $(".loading").hide();
        } else {
          //프로필 이미지, 엔딩노트 이미지 변경
          Meteor.users.update({_id: Meteor.userId()},{$set:{'profile.profileImg':''}}, function(error){
            if(error){
              console.log(error);
            } else {
              Session.set("index_contentsTemplate", template);
            }
          });
        }
      } else {
        if(instance.data.fromTemp === 'addFamily'){
          // 가족 프로핑 이미지 기본이미지로 변경
          // 이미지 정보만 리턴해줘야함
            //이미지 정보 리턴
          var data = {
            _id: t.preTemplateData._id,
            isShow : true,
            name : t.preTemplateData.name,
            birthday : t.preTemplateData.birthday,
            sex : t.preTemplateData.sex,
            subType: t.preTemplateData.subType,
            profileImg : ''
          };

          Session.set('editor_add_family_data',data);

          //프로필 이미지 편집 닫기
          var imageData = {
            isShow : false,
          };

          Session.set('addFamily_showProfileImgEditor', imageData);
          $(".loading").hide();
        } else {
          Session.set("index_contentsTemplate", template);
        }

      }
    }

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0007', Meteor.userId(),'', ''); //프로필 사진 수정
    }
  },
});

Template[templateName].onDestroyed(function(){
  $(".loading").hide();
});
