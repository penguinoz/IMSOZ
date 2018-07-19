import {global} from '/imports/global/global_things.js';
Template.bucketList.onCreated(function(){
  var instance = this;
  var blStatue = Session.get("bucketListStatus")
  // if(blStatue){
  //   instance.selectedMenu = new ReactiveVar(blStatue.filter);
  // }else{
    // instance.selectedMenu = new ReactiveVar('BL0001');
  instance.selectedMenu = new ReactiveVar(this.data.menu);
  // }
  // Session.set("bucket_selectedMenu", 'BL0001');
  switch(this.data.menu){
    case 'my':
      template = {
        templateName : 'bucketDicMy',
      };
    break;
    case 'all':
      template = {
        templateName : 'bucketDicAll',
      };
    break;
    case 'buckystory':
      template = {
        templateName : 'bucketDicStory',
      };
    break;
    default :
      template = {
        templateName : 'bucketDicMy',
      };
  }
  Session.set("bucketList_Template", template);

});

Template.bucketList.onRendered(function(){
  var scroll = $(window);
  Session.set('editor_addUserList', null);
  // $(window).scroll( function() {
  //   // console.log('check :', scroll.scrollTop());
  //   if(scroll.scrollTop() > 145) {
  //     $(".bucket-list .category-slide").slideUp(0);
  //     $(".bucket-list .category-slide-mini").slideDown(0);
  //
  //   } else if(scroll.scrollTop() < 1){
  //     $(".bucket-list .category-slide").slideDown(0);
  //     $(".bucket-list .category-slide-mini").slideUp(0);
  //   }
  // });

  if(Meteor.userId()){
    var guideType = 'guide02_BL0001';
    Meteor.call('checkGuide', guideType, Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
      } else {
        if(!result){
          //가이드 문서
          var template = {};
          template.templateName = 'guide02'; //슬라이드
          template.data = "/images/bg/guide/guide_버킷리스트.jpg";
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
    });
  }
});

Template.bucketList.helpers({
  hpSelected: function(_id){
    // var seletedId = Session.get("bucket_selectedMenu");
    var seletedId = Template.instance().selectedMenu.get();
    var result = false;
    if(_id === seletedId){
      result = true;
    }
    return result;
  },
  hpBucketFilter: function(){
    // console.log('필터변경', Template.instance().selectedMenu.get());
    return Template.instance().selectedMenu.get();
  },
  hpContentsTemplate: function(){
    return Session.get("bucketList_Template");
  },
});

Template.bucketList.events({
  "click .top-sub-menu a": function(e, t){
    e.preventDefault();
    // Session.set('bucketListData', null);

    var menuId = e.currentTarget.id;

    if(t.selectedMenu.get() === menuId){
      return;
    }
    // switch(menuId){
    //   case 'BL0001':
    //   Router.go('bucketList',{menu:'my'},{replaceState: false});
    //   break;
    //   case 'BL0002':
    //   Router.go('bucketList',{menu:'all'},{replaceState: false});
    //   break;
    //   case 'BL0003':
    //   Router.go('bucketList',{menu:'buckystory'},{replaceState: false});
    //   break;
    //   case 'BL0004':
    //   Router.go('bucketList',{category:'4'},{replaceState: false});
    //   break;
    //   case 'BL0005':
    //   Router.go('bucketList',{category:'5'},{replaceState: false});
    //   break;
    //   case 'BL0006':
    //   Router.go('bucketList',{category:'6'},{replaceState: false});
    //   break;
    //   default :
    //   Router.go('bucketList',{menu:'my'},{replaceState: false});
    // }

    var template ={
      templateName : 'bucketDicMy',
      data : {},
    };
    var logType = "MY";
    switch(menuId){
      case 'my':
        logType = "MY";
        template = {
          templateName : 'bucketDicMy',
        };
        Router.go('bucketList',{menu:'my'},{replaceState: false});
      break;
      case 'all':
        logType = "ALL";
        template = {
          templateName : 'bucketDicAll',
        };
        Router.go('bucketList',{menu:'all'},{replaceState: false});
      break;
      case 'buckystory':

        // var confrimData = {
        //   title : '서비스 준비중입니다.',
        //   context : '',
        //   templateName : 'bucketList',
        //   returnData : null,
        //   singleBtn : true,
        //   btnName : '확인'
        // };
        //
        // Session.set('confrim_center', confrimData);
        // return;
        logType = "BS";
        template = {
          templateName : 'bucketDicStory',
        };
        Router.go('bucketList',{menu:'buckystory'},{replaceState: false});
      break;
      default :
      Router.go('bucketList',{menu:'all'},{replaceState: false});
    }

    t.selectedMenu.set(menuId);
    Session.set('searchObj', null);
    Session.set('bucketListData',null);
    Session.set('bucketDicStoryData',null);
    Session.set("bucketList_Template", template);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
      Meteor.call('setLog', 'LG0016', Meteor.userId(), 'BL', logType); //버킷리스트 카테고리 클BL
    }
    // Session.set("bucket_selectedMenu", menuId);

    //
    // { group:'g0006', code : 'BL0001',  name : '전체', order : 1, regDate : global.fn_dateFormat().HMS},
    // { group:'g0006', code : 'BL0002',  name : '먹고싶은', order : 2, regDate : global.fn_dateFormat().HMS},
    // { group:'g0006', code : 'BL0003',  name : '가고싶은', order : 3, regDate : global.fn_dateFormat().HMS},
    // { group:'g0006', code : 'BL0004',  name : '하고싶은', order : 4, regDate : global.fn_dateFormat().HMS},
    // { group:'g0006', code : 'BL0005',  name : '갖고싶은', order : 5, regDate : global.fn_dateFormat().HMS},
    // { group:'g0006', code : 'BL0006',  name : '되고싶은', order : 6, regDate : global.fn_dateFormat().HMS},
    //
    // switch(menuId){
    //   case 'BL0001':
    //     t.selectedMenu.set('BL0001');
    //     // Router.go('inheritanceTo');
    //     // t.selectedTemplate.set('inheritanceToList');
    //     break;
    //   case 'BL0002':
    //     t.selectedMenu.set('BL0002');
    //     // Router.go('inheritanceFrom');
    //     // t.selectedTemplate.set('inheritanceFromList');
    //     break;
    //   case 'BL0003':
    //     t.selectedMenu.set('BL0003');
    //     // Router.go('guardian');
    //     // t.selectedTemplate.set('guardianToList');
    //     break;
    //   case 'BL0004':
    //     t.selectedMenu.set('BL0004');
    //     // $('.funaral-menu').removeClass("display-none");
    //     // $('.black-over').removeClass("display-none");
    //     break;
    //   case 'BL0005':
    //     t.selectedMenu.set('BL0005');
    //     // $('.funaral-menu').removeClass("display-none");
    //     // $('.black-over').removeClass("display-none");
    //     break;
    //   case 'BL0006':
    //     t.selectedMenu.set('BL0006');
    //     // $('.funaral-menu').removeClass("display-none");
    //     // $('.black-over').removeClass("display-none");
    //     break;
    //   default :
    //     t.selectedMenu.set('BL0001');
    // }
  },
});
