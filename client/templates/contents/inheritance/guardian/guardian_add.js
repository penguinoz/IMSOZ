Template.guardianAdd.onCreated(function(){
  var instance = this;
  instance.isSelected = new ReactiveVar("imsUser");

  var template = {
    templateName : "guardianAddIms",
    header : true
  };
  Session.set("guardianAdd_selectedTemplate", template);

});

Template.guardianAdd.events({
  "click #back": function(e, t){
    e.preventDefault();

    Router.go(Session.get('navData').prevTemplate,{},{replaceState: false});
  },
  "click .menu": function(e, t){
    e.preventDefault();

    var menuId = e.currentTarget.id;
    t.isSelected.set(menuId);

    var template = {
      templateName : "guardianAddIms",
      header : true
    };

    switch(menuId){
      case 'imsUser':
        template.templateName = "guardianAddIms";
        Session.set("guardianAdd_selectedTemplate", template);
      break;
      case 'nonImsUser':
        template.templateName = "guardianAddNonIms";
        Session.set("guardianAdd_selectedTemplate", template);
      break;
      default:
        Session.set("guardianAdd_selectedTemplate", template);
    }
  }
});

Template.guardianAdd.helpers({
  hpSelected: function(_menu){
    var result = false;
    if(_menu === Template.instance().isSelected.get()){
      result = true;
    }
    return result;
  },
  hpSelectedTemplate: function(){
    return Session.get("guardianAdd_selectedTemplate");
  },
});
