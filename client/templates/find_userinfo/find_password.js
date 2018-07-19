Template.findPassword.onCreated(function(){
  var instance = this;
  instance.userId = new ReactiveVar();
});

Template.findPassword.onRendered(function(){
  $(window).scrollTop(0);
});

Template.findPassword.events({
  "click .back": function(e, t){
    e.preventDefault();
    // window.history.back();
    Router.go('login',{},{replaceState: false});
  },
  "click #findIdNextPage":function(e,t){
    e.preventDefault();
    var userId = $("#userIdInput").val().trim();
    Meteor.call("checkIsThereId",userId , function(err, res){
      if(err)console.log(err);
      if(res){
        var template = {
          templateName : 'findPassword02',
          header : false,
          data : t.userId.get()
        };
        Session.set("index_contentsTemplate", template);
      }else{
        // alert("일치하는 아이디가 없습니다.");
        var confrimData = {
          title : '일치하는 아이디가 없습니다.',
          context : '',
          templateName : 'findPassword',
          returnData : null,
          singleBtn : true,
          btnName : '확인'
        };

        Session.set('confrim_center', confrimData);
        return;
      }
    });
  },
});
