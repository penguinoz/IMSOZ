import {global} from '/imports/global/global_things.js';


Template.endingNoteProfile.onCreated(function(){
  // console.log(this);
  var instance = this;
  instance.profileData = new ReactiveVar();
  instance.charCount = new ReactiveVar();
  instance.storyCount = new ReactiveVar();

  Session.set('confrim_center', false);


  if(Meteor.userId()){
    Meteor.call("getProfileData", Meteor.userId(), function(error, result){
      if(error){
        console.log(error);
      } else {
        // console.log(result);
        instance.profileData.set(result);
      }
    });

    Meteor.call('getContentCount', Meteor.userId(), false, function(error, result){
      if(error){
        console.log(error);
      } else {
        instance.storyCount.set(result);
      }
    });
  }


});

Template.endingNoteProfile.helpers({
  hpProfileData: function(){
    return Template.instance().profileData.get();
  },
  hpCharCount: function(){
    return Template.instance().charCount.get();
  },
  hpConfrimData : function(){
    return Session.get('confrim_center');
  },

});

Template.endingNoteProfile.events({
  // 프로필 이미지 수정
  "click .profile-img img": function(e,t){
    e.preventDefault();



    var template = {
      templateName : 'editProfileImage',
      header : false,
      data : {
        fromTemp : "endingNote",
        profileImg : t.profileData.get().profileImg
      }
    };

    Session.set("index_contentsTemplate", template);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0006', Meteor.userId(),'ED', ''); //프로필 사진 변경 클릭
    }
  },
  "keyup #introduction": function(e,t){
    if (e.which === 13) {
      //마우스커서 빼기
      $('#introduction').blur();
    } else {
      var stVal = $('#introduction').val();
      var j = 0;
      var count = 0;
      for(var i = 0;i < stVal.length;i++) {
        val = escape(stVal.charAt(i)).length;
        if(val == 6){
          j++;
        }
        j++;
        if(j <= 30){
          count++;
        }
      }

      if(j > 30){
        // alert('글자수는 한글15자, 영문30자로 제한됩니다.');
        var confrimData = {
          title : '글자수는 한글15자, 영문30자로 제한됩니다.',
          context : '',
          templateName : 'endingNoteProfile',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        $('#introduction').val(stVal.substr(0, count));
        return;
      }


      // console.log(j);
      t.charCount.set(j);
    }
  },
  "focusin  #introduction": function(e, t){
    $("#charCount").removeClass('display-none');
    $("#introduction").css("text-decoration", "underline");
    var stVal = $('#introduction').val();
    var j = 0;
    var count = 0;
    for(var i = 0;i < stVal.length;i++) {
      val = escape(stVal.charAt(i)).length;
      if(val == 6){
        j++;
      }
      j++;
      if(j <= 30){
        count++;
      }
    }
    t.charCount.set(j);
  },
  "focusout #introduction": function(e, t){
    $("#charCount").addClass('display-none');
    $("#introduction").css("text-decoration", "");

    // var reg = new RegExp('([^0-9])','g');
    var stVal = $('#introduction').val();

    var setObj = {
      introduction : stVal
    };

    Meteor.call('editUserProfile', setObj, function(err,res){
      if(err){
        console.log(err);
      } else {

        // 1. 로그 사용여부확인
        if(global.writeLog){
          //2. 로그 생성
          Meteor.call('setLog', 'LG0060', Meteor.userId(), 'ED', ''); //자기소개글 수정
        }

        Meteor.call('getProfileData', Meteor.userId(), function(error, result){
          if(error){
            console.log(error);
          } else {
            t.profileData.set(result);
          }
        });
      }
    });
  },
  "click #lifeMap": function(e, t){
    e.preventDefault();
    // Session.set('lifeMap_show', true);

    // 1. 로그 사용여부확인
    if(global.writeLog){
      //2. 로그 생성
       Meteor.call('setLog', 'LG0055', Meteor.userId(),'', ''); //라이프맵 클릭
    }

    if(t.storyCount.get() >= global.lifeMapMinCnt){
      var searchObj = Session.get('searchObj');
      if(searchObj){
        searchObj = {
          text : searchObj.text ? searchObj.text : '',
          type : searchObj.type ? searchObj.type : 'AL',
          subType : searchObj.subType ? searchObj.subType : 'AL',
          showLock : searchObj.showLock ? searchObj.showLock : false,
          showShared : searchObj.showShared ? searchObj.showShared : false,
        };
      } else {
        searchObj = {
          text : '',
          type : 'AL',
          subType : 'AL',
          showLock : false,
          showShared : false,
        };
      }


      //1. 검색 정보를 스트링으로 수정
        // var searchString = +searchObj.type+'_'+searchObj.subType+'_'+searchObj.startDate+'_'+searchObj.endDate+'_'+searchObj.lock;
        var searchString = searchObj.text+'_'+searchObj.type+'_'+searchObj.subType+'_'+searchObj.showLock+'_'+searchObj.showShared;
      //2. 암호화
        var enSearchStr = global.fn_passCode(searchString, 'EC');
      //3. view화면 호출
      // location.href="/lifeMap/map/" + t.pageOwnerId +"/" + enSearchStr;
      Session.set("scrollPosition", null);
      Session.set('mapData', null); //라이프맵 데이터 초기화 여기서 한 이유는 스크롤 포지션 때문
      var encId = global.fn_passCode(Meteor.userId(), 'EC');
      Router.go('lifeMapView', {_id: encId, searchStr : enSearchStr},{replaceState: false});

      // var encId = global.fn_passCode(Meteor.userId(), 'EC');
      //
      // Router.go('lifeMap', {_id: encId},{replaceState: false});

    } else {
      var confrimData = {
        title : "라이프 맵은 글이 "+ global.lifeMapMinCnt+"개 이상<br/>등록되어야 확인 가능합니다.",
        context : '',
        templateName : 'endingNoteProfile',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }





    // Router.go('lifeMap', {_id: Meteor.userId()},{replaceState: false});

    // html2canvas(document.body, {
    //         allowTaint: true,
    //         logging:true,
    //         onrendered: function(canvas) {
    //         imagestring = canvas.toDataURL("image/png");
    //         console.log(imagestring);
    //         document.body.appendChild(canvas);
    //         }
    //     });
    // //
    // html2canvas($("#warp"), {
    // 		allowTaint: true,
    // 		//taintTest: false,
    // 		// useCORS: true,
    // 		// proxy: '/etc/proxy_image',
    // 		onrendered: function(canvas) {
    // 			// var image = canvas.toDataURL();
    // 			// $("#imgTarget").attr("src", image);
    //       document.body.appendChild(canvas);
    // 		}
    // 	});


    // html2canvas(document.body).then(function(canvas) {
    //   document.body.appendChild(canvas);
    // });
  },
});
