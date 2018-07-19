import {global} from '/imports/global/global_things.js';
Template.anyDatePicker.onCreated(function(){
  var instance = this;
  instance.date = new ReactiveVar();

  if(this.data && this.data.date){
    instance.date.set(this.data.date);
  }
});

Template.anyDatePicker.onRendered(function(){
  var date = global.fn_dateFormat(new Date()).YMD;
  if(Template.instance().date.get()){
    date = Template.instance().date.get();
  }
  $('#mDate').val(date);

  $j("#mDate").AnyPicker(
    {
      mode: "datetime",
      dateTimeFormat: "yyyy-MM-dd",
      theme: "Android", // "Default", "iOS", "Android", "Windows"
      lang: "ko-kr",
      selectedDate: date,
    });
  });
