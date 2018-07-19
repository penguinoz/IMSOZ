import {global} from '/imports/global/global_things.js';
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound' ,
  // data: function() {
  //   return {
  //     loginUser: Meteor.users.find({_id: Meteor.userId()}).fetch()[0]
  //   };
  // },
  // waitOn: function() {
  //   return Meteor.subscribe('userOneInfo', Meteor.userId());
  // }
});
// TODO : Add otherwise



Router.map(function() {
  // this.onBeforeAction(function () {
  //   if (!Meteor.userId()) {
  //     Meteor.logout();
  //     // this.render('login');
  //     // console.log('logged out');
  //   } else {
  //     console.log('logged in');
  //     this.next();
  //   }
  // });

  this.route('/', {
    template:'index',
    layoutTemplate: 'layout',
    data:function(){
      returnData = "root";
      return returnData;
    }
  });

  this.route('login', {
    path : '/login',
    layoutTemplate: 'layout',
    template: 'login',
    data: function(){
      var template = {
        templateName : 'login',
        header : true
      };
      return Session.set("index_contentsTemplate", template);
    }
  });

  this.route('tutorialinput', {
    path : '/tutorialinput',
    layoutTemplate: 'layout',
    template: 'tutorial',
    data: function(){
      var template = {
        templateName : 'tutorial',
        header : true
      };
      return Session.set("index_contentsTemplate", template);
    }
  });

  this.route('registration', {
    path: '/registration',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'registrationTerms',
        header : false
      };
      return Session.set("index_contentsTemplate", template);
    }
  });

  this.route('registrationSns', {
    path: '/registration/sns',
    layoutTemplate: 'layout',
    template: 'registrationSns',
    data: function(){
      var template = {
        templateName : 'registrationSns',
        header : false
      };
      return Session.set("index_contentsTemplate", template);
    }
  });

  this.route('endingNote', {
    path : '/endingNote',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // Session.set("footer_selectedMenu", 'endingNote');
      Session.set("footer_selectedMenu", 'endingNote');
      // var contentId = this.params._id;
      var template = {
        templateName : 'endingNote',
        header : true,
      };

      // Session.set('scrollPosition',$(window).scrollTop());
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  // this.route('bucketList', {
  //   path:'/bucketList/home/:category',
  //   layoutTemplate: 'layout',
  //   template: 'index',
  //   data: function(){
  //     Session.set("footer_selectedMenu", 'bucketList');
  //     var template = {
  //       templateName : 'bucketList',
  //       header : true
  //     };
  //     $(window).scrollTop(0);
  //     // Session.set('scrollPosition',$(window).scrollTop());
  //     Session.set("index_contentsTemplate", template);
  //     return true;
  //   }
  // });

  this.route('bucketList', {
    path:'/bucketList/home/:menu',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      Session.set("footer_selectedMenu", 'bucketList');
      // Session.set("footer_selectedMenu", 'bucketList');
      var template = {
        templateName : 'bucketList',
        header : true,
        data : {
          menu : this.params.menu
        }
      };
      $(window).scrollTop(0);
      // Session.set('scrollPosition',$(window).scrollTop());
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('inheritanceTo', {
    path: '/inheritance/to',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // Session.set("footer_selectedMenu", 'inheritance');
      Session.set("footer_selectedMenu", 'inheritance');
      Session.set("inherit_selectedMenu", 'btn_to');
      // var contentId = this.params._id;
      var template = {
        templateName : 'inheritance',
        header : true,
        data : {
          mainMenu : 'inheritance',
          subMenu : 'inheritanceToList'
        }
      };
      $(window).scrollTop(0);
      Session.set('scrollPosition',$(window).scrollTop());
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('inheritanceFrom', {
    path: '/inheritance/from',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // Session.set("footer_selectedMenu", 'inheritance');
      Session.set("footer_selectedMenu", 'inheritance');
      Session.set("inherit_selectedMenu", 'btn_from');
      // var contentId = this.params._id;
      var template = {
        templateName : 'inheritance',
        header : true,
        data : {
          mainMenu : 'inheritance',
          subMenu : 'inheritanceFromList'
        }
      };
      $(window).scrollTop(0);
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('addInheritor', {
    path: '/inheritance/addInh',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // var contentId = this.params._id;
      var template = {
        templateName : 'ihnAddUser',
        header : false,
        // data : {
        //     _id : contentId
        // }
      };
      $(window).scrollTop(0);
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('guardian', {
    path : '/inheritance/guardian',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // Session.set("footer_selectedMenu", 'inheritance');
      Session.set("footer_selectedMenu", 'inheritance');
      Session.set("inherit_selectedMenu", 'btn_guardian');
      // var contentId = this.params._id;
      var template = {
        templateName : 'inheritance',
        header : true,
        data : {
          mainMenu : 'inheritance',
          subMenu : 'guardianToList'
        }
      };
      $(window).scrollTop(0);
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('addGuardian', {
    path: '/inheritance/guardian/addGuardian',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      // var contentId = this.params._id;
      var template = {
        templateName : 'guardianAdd',
        header : false,
        // data : {
        //     _id : contentId
        // }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('bucketDetail', {
    path: '/bucketList/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'bucketDicDetail',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('contentDetail', {
    path: '/story/detail/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'contentDetail',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('contentDetailBuckystory', {
    path: '/buckystory/detail/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'contentDetailBuckystory',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('lastLetterDetail', {
    path: '/lastLetter/detail/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'lastLetterDetail',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });


  this.route('myPagePoint', {
    path:'/myPage/point',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      Session.set("myPage_selectedMenu", 'myPoint');
      var template = {
        templateName : 'myPage',
        header : true
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('myPageFriends', {
    path:'/myPage/friends',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      Session.set("myPage_selectedMenu", 'myFriends');
      var template = {
        templateName : 'myPage',
        header : true
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('myPageInfo', {
    path:'/myPage/profile',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      Session.set("myPage_selectedMenu", 'myInfo');
      var template = {
        templateName : 'myPage',
        header : true
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('imsAdminConfig', {
    path:'/imsAdminConfig/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      Session.set("myPage_selectedMenu", 'admin');
      var template = {
        templateName : 'myPage',
        header : true
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('writeStory', {
    path:'/write',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'contentsEditor',
        header : false
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });
  this.route('editStory', {
    path:'/edit/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'contentsEditorMod',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('writeBucket', {
    path:'/write/bucket',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'contentsEditorBucket',
        header : false
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });
  this.route('editBucket', {
    path:'/edit/bucket/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var contentId = this.params._id;
      var template = {
        templateName : 'contentsEditorBucketMod',
        header : false,
        data : {
          _id : contentId
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });



  this.route('lifeMap', {
    path: '/lifeMap/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'lifeMap',
        header : false,
        data : {
          _id : this.params._id,
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('lifeMapView', {
    path: '/lifeMap/map/:_id/:searchStr',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'lifeMapView',
        header : false,
        data : {
          _id : this.params._id,
          searchOption : this.params.searchStr,
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('lifeMapViewDetail', {
    path: '/lifeMap/detail/:_id/:navStr',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'contentDetail',
        header : false,
        data : {
          _id : this.params._id,
          navStr : this.params.navStr,
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('lifeMapViewDetailBl', {
    path: '/lifeMap/detail/bucket/:_id/:navStr',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'bucketDicDetail',
        header : false,
        data : {
          _id : this.params._id,
          navStr : this.params.navStr,
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });


  this.route('findId', {
    path: '/find/i',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'findId',
        header : false
      };
      return Session.set("index_contentsTemplate", template);
    }
  });

  this.route('findPassword', {
    path: '/find/p',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'findPassword',
        header : false
      };
      return Session.set("index_contentsTemplate", template);
    }
  });



  // 친구 방문 라우팅 /////////////////////////////////////////////////////////////////////////

  this.route('endingNoteVs', {
    path : '/endingNote/:_id',
    layoutTemplate: 'layout2',
    template: 'index',
    data: function(){
      Session.set("footer_selectedMenu", 'endingNote');
      // Session.set("footer_selectedMenu", 'endingNote');
      // var contentId = this.params._id;
      // console.log(global.fn_passCode(this.params._id, 'DC'));
      var template = {
        templateName : 'endingNoteVs',
        header : true,
        data : {
          pageOwnerId : this.params._id
        }
      };

      Session.set("index_contentsTemplate", template);
      return false;
      // Session.set('scrollPosition',$(window).scrollTop());
    }
  });

  this.route('bucketDetailVs', {
    path: '/bucketList/detail/:_id/:contentId',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'bucketDicDetailVs',
        header : false,
        data : {
          _id : this.params.contentId,
          pageOwnerId : this.params._id
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('contentDetailVs', {
    path: '/story/detail/:_id/:contentId',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'contentDetailVs',
        header : false,
        data : {
          _id : this.params.contentId,
          pageOwnerId : this.params._id
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('bucketListEditor', {
    path:'/bucketEdit',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'bucketListEditor',
        header : false
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('bucketListEditorMod', {
    path:'/bucketEdit/:_id',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'bucketListEditorMod',
        header : false,
        data : {
          _id : this.params._id,
        }
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });

  this.route('privatePolicy', {
    path:'/legal/privacy',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'legalPrivacyPolicy',
        header : false,

      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });


  this.route('guide', {
    path:'/guide/:num',
    layoutTemplate: 'layout',
    template: 'index',
    data: function(){
      var template = {
        templateName : 'guide'+this.params.num,
        header : false,
      };
      Session.set("index_contentsTemplate", template);
      return true;
    }
  });


    // this.route('contentBucketDetail', {
    //   path: '/bucket/detail/:_id',
    //   layoutTemplate: 'layout',
    //   template: 'index',
    //   data: function(){
    //     var contentId = this.params._id;
    //     var template = {
    //       templateName : 'contentBucketDetail',
    //       header : false,
    //       data : {
    //         _id : contentId
    //       }
    //     };
    //     Session.set("index_contentsTemplate", template);
    //     return true;
    //   }
    // });

    // this.route('saveData', {
    //   path : '/saveData',
    //   layoutTemplate: 'layout',
    //   template: 'index',
    //   data: function(){
    //     Session.set("footer_selectedMenu", 'saveData');
    //     var template = {
    //       templateName : 'saveData',
    //       header : true
    //     };
    //     Session.set("index_contentsTemplate", template);
    //     return true;
    //   }
    // });
    this.route('appDown', {
        path : '/appDown',
        layoutTemplate: 'layout',
        template: 'appDownRedirection',
    });

  Router.route( "/disconnectFcmToken", { where: "server" } )
    .post( function() {
      // If a POST request is made, create the user's profile.
      data = this.request.body;
      // console.log(data);
      Meteor.call('disconnectFcmToken',data,function(err, res){
        if(err)console.log(err);
      });
      // console.log(data);
      this.response.statusCode = 200;
      this.response.end("");
    });

  Router.route( "/registFcmToken", { where: "server" } )
    .post( function() {
      // If a POST request is made, create the user's profile.
      console.log("registFcmToken");
      // var name = this.params.name;
      data = this.request.body;
      // console.log(data);
      Meteor.call('setFcmTokenId',data,function(err, res){
        if(err)console.log(err);
      });
      this.response.statusCode = 200;
      this.response.end("");
    });

  Router.route( "/checkAppVersion/ios", { where: "server" } )
    .post( function() {
      // If a POST request is made, create the user's profile.
      // var name = this.params.name;
      // data = this.request.body;
      os = 'ios';
      //os = 'ios/android'
      // console.log(data);
      var thisObj = this;
      Meteor.call('getAppVersion', os, function(err, res){
        if(err)console.log(err);
        else {
          thisObj.response.statusCode = 200;
          thisObj.response.setHeader('Content-Type', 'application/json');
          thisObj.response.end(JSON.stringify(res));
        }
      });
    });

    Router.route( "/checkAppVersion/android", { where: "server" } )
      .post( function() {
        // If a POST request is made, create the user's profile.
        // var name = this.params.name;
        // data = this.request.body;
        os = 'android';
        console.log("checkVersion");
        //os = 'ios/android'
        // console.log(data);
        var thisObj = this;
        Meteor.call('getAppVersion', os, function(err, res){
          if(err)console.log(err);
          else {
            thisObj.response.statusCode = 200;
            thisObj.response.setHeader('Content-Type', 'application/json');
            thisObj.response.end(JSON.stringify(res));
          }
        });
      });
});



// Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Router.onBeforeAction(requireLogin, {only: 'myenoteMain'});
