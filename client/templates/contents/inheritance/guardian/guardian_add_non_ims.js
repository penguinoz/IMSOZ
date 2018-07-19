// guardianAddNonIms
Template.guardianAddNonIms.onCreated(function(){

});

Template.guardianAddNonIms.events({
  "click .next": function(e, t){
    e.preventDefault();

    //이름, 메일, 연락처정보를 입력받아 다음으로 넘어간다
    //필수 요소는 이름, 연락처다
    var templateData = {
      profile : {
        profileImg : '', //기본이미지로 대체
        name : $('#name').val(),
        email : $('#email').val(),
        phone : $('#phone').val(),
        templateName : 'guardianAddNonIms'
      }
    };

    if(!templateData.profile.name || !templateData.profile.phone){
      // alert("이름과 연락처는 필수입력입니다.");
      var confrimData = {
        title : '이름과 연락처는 필수입력입니다.',
        context : '',
        templateName : 'guardianAddNonIms',
        returnData : null,
        singleBtn : true,
        btnName : '확인'
      };

      Session.set('confrim_center', confrimData);
      return;
    } else {
      var template = {
        templateName : 'guardianAddFin',
        header : false,
        data : templateData
      };
      Session.set("guardianAdd_selectedTemplate", template);

    }
  }
});
