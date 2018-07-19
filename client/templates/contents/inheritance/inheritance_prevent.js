var templateName = "inheritancePrevent";

Template.inheritancePrevent.onCreated(function(){

});


Template.inheritancePrevent.events({
  "click .btn-close": function(e, t){
    e.preventDefault();
    $('#pointPrevent').addClass("display-none");
    $('.black-over').addClass("display-none");
    // Router.go('inheritanceTo',{},{replaceState: false});
  }
});
