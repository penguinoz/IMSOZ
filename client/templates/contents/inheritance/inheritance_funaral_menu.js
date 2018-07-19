Template.inheritanceFunaralMenu.events({
  "click .btn-close": function(e, t){
    e.preventDefault();

    $('.funaral-menu').addClass("display-none");
    $('.black-over').addClass("display-none");
  },
  "click #icon-my": function(e, t){
    e.preventDefault();

    // alert("서비스 준비중입니다.");
    var confrimData = {
      title : '서비스 준비중입니다.',
      context : '',
      templateName : 'inheritanceFunaralMenu',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    return;
  },
  "click #injector": function(e, t){
    e.preventDefault();

    // alert("서비스 준비중입니다.");
    var confrimData = {
      title : '서비스 준비중입니다.',
      context : '',
      templateName : 'inheritanceFunaralMenu',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    return;
  },
  "click #graveston": function(e, t){
    e.preventDefault();

    // alert("서비스 준비중입니다.");
    var confrimData = {
      title : '서비스 준비중입니다.',
      context : '',
      templateName : 'inheritanceFunaralMenu',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    return;
  },
  "click #writeDocument": function(e, t){
    e.preventDefault();


    var confrimData = {
      title : '서비스 준비중입니다.',
      context : '',
      templateName : 'inheritanceFunaralMenu',
      returnData : null,
      singleBtn : true,
      btnName : '확인'
    };

    Session.set('confrim_center', confrimData);
    return;

    // 임시로 서비스 막아놓음
    // Meteor.call('isThereTestament',Meteor.userId(),function(err,res){
    //   if(err){
    //     console.log(err);
    //   }
    //   if(res){
    //     //유언이 있으
    //     Router.go("contentDetail", {_id: res._id},{replaceState: false});
    //   }else{
    //     //없으면
    //     var navData ={
    //       type : 'TQ',
    //       category : 'writeStory',
    //       prevTemplate : "endingNote",
    //       data : {
    //         editorTitle : '오늘의 질문',
    //         qCode : "TQ0012",
    //         title : "유언장 작성",
    //         titleReadOnly : true,
    //         context :  "",
    //       }
    //     };
    //     Session.set('navData', navData);
    //
    //     Router.go("writeStory",{},{replaceState: false});
    //   }
    // });






  }
});
