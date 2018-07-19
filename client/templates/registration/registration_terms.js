//회원가입 > 약관동의
var templateName = "registrationTerms";


Template.registrationTerms.onCreated(function(){

});

Template.registrationTerms.onRendered(function(){
  var height = $(window).height();
  $(".registration").height(height);
});

Template.registrationTerms.helpers({
  helper: function(){

  }
});

Template.registrationTerms.events({
  "click .back": function(e, t){
    e.preventDefault();
    Router.go('login',{},{replaceState: false});
  },
  "click #registNextPage":function(e,t){
    var check1 = $("#check01").prop("checked") ;
    var check2 = $("#check02").prop("checked") ;
    var check3 = $("#check03").prop("checked") ;

    if (check1 && check2 ) {
      regData = {
        service: check1,
        privateInfo: check2,
        event: check3,
      };

      var template = {
        templateName : 'registration',
        header : false,
        data : regData
      };
      Session.set("index_contentsTemplate", template);
    } else {
      // return alert('필수항목에 동의해주세요.');
      var confrimData = {
        title : '필수항목에 동의해주세요.',
        context : '',
        templateName : 'findPassword02',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    }
  },
  "click .box-head": function(e, t){
    if(e.target.type !== 'checkbox'){
      if($(e.currentTarget).siblings().hasClass('display-none')){
        $(e.currentTarget).siblings().removeClass('display-none');
      } else {
        $(e.currentTarget).siblings().addClass('display-none');
      }
    }
  }
});
