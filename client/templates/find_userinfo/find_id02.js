Template.findId02.onRendered(function(){
  var instance = this;
  instance.userId = new ReactiveVar();
  $("#checkId").val(this.data.username);
});

Template.findId02.events({
  "click .back": function(e, t){
    e.preventDefault();
    var template = {
      templateName : 'findId',
      header : false,
      data : t.userId.get()
    };

    Session.set("index_contentsTemplate", template);
  },
  "click #login":function(e,t){
    Router.go('login',{},{replaceState: false});
  },
  "click #findPasswd": function(e, t){

  }
});
