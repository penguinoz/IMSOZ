import {global} from '/imports/global/global_things.js';

Template.myAdminConfig.onCreated(function(){
  var instance = this;
  instance.adminTemplate = new ReactiveVar();
  var template = {
    templateName : 'logList'
  }

  instance.adminTemplate.set(template);
});

Template.myAdminConfig.events({
  "click .menu-button" : function(e,t){
    e.preventDefault();

    var items = document.querySelectorAll('.circle a');
    for(var i = 0, l = items.length; i < l; i++) {
      items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
      items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    }
    document.querySelector('.circle').classList.toggle('open');
  },
  "click #userLog" : function(e, t){
    var template = {
      templateName : 'logList'
    }
    t.adminTemplate.set(template);
  },
  "click #userInfo" : function(e, t){
    var template = {
      templateName : 'userJoinInfo'
    }
    t.adminTemplate.set(template);
  },
});

Template.myAdminConfig.helpers({
  hpAmdinTemplate: function(){
    return Template.instance().adminTemplate.get()
  }
});
