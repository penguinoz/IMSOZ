import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';
import { Random } from 'meteor/random'

var imgOriginRe=[];

Template.saveData.onCreated(function(){

});

Template.saveData.events({
  "change #capsuleImage": function(e, t){
    // console.log(Random.id()+"test");
      var imageObj = e.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(imageObj);

      // var fName = imageObj.name.substring(0, imageObj.name.lastIndexOf('.'));
      var extension = imageObj.name.substring(imageObj.name.lastIndexOf('.')+1);

      $("[name=fileName]").val(imageObj.name);
      reader.onload = function  () {
        var tempImage = new Image();
        tempImage.src = reader.result;

        tempImage.onload = function () {
          targetImage = this;
          var width = targetImage.width;
          var height = targetImage.height;
          var orientation = 1;
          /////thumb//////////////////


          ///////////////////////////


          EXIF.getData(imageObj, function(e,r) {

            /////////////thumb//////////////////////////
            var canvas2 = document.createElement('canvas');
            var canvasContext2 = canvas2.getContext("2d");
            orientation = EXIF.getTag(this, "Orientation");
            if ([5,6,7,8].indexOf(orientation) > -1) {
              canvas2.width = height;
              canvas2.height = width;
            } else {
              canvas2.width = width;
              canvas2.height = height;
            }

            switch (orientation) {
              case 2: canvasContext2.transform(-1, 0, 0, 1, width, 0); break;
              case 3: canvasContext2.transform(-1, 0, 0, -1, width, height ); break;
              case 4: canvasContext2.transform(1, 0, 0, -1, 0, height ); break;
              case 5: canvasContext2.transform(0, 1, 1, 0, 0, 0); break;
              case 6: canvasContext2.transform(0, 1, -1, 0, height , 0); break;
              case 7: canvasContext2.transform(0, -1, -1, 0, height , width); break;
              case 8: canvasContext2.transform(0, -1, 1, 0, 0, width); break;
              default: canvasContext2.transform(1, 0, 0, 1, 0, 0);
            }

            // canvas.width = 47;
            // canvas.height = 47;
            canvasContext2.drawImage(targetImage, 0, 0, width, height);
            var dataURI2 = canvas2.toDataURL("image/jpeg");

            //썸네일
            imgThumb = {
              fileName : 'fileName',
              folder : global.s3.folder.story,
              type : 'thumb',
              extension : extension,
              data : ''
            };


            ////////////////////////////////////////////


            if(targetImage.width >= targetImage.height){
              if(targetImage.width > 150){
                width = 150;
                height = targetImage.height * (150/targetImage.width);
              }
            } else {
              if(targetImage.height > 150){
                height = 150;
                width = targetImage.width * (150/targetImage.height);
              }
            }

            var canvas = document.createElement('canvas');
            var canvasContext = canvas.getContext("2d");

            orientation = EXIF.getTag(this, "Orientation");
            if ([5,6,7,8].indexOf(orientation) > -1) {
              canvas.width = height;
              canvas.height = width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }

            switch (orientation) {
                  case 2: canvasContext.transform(-1, 0, 0, 1, width, 0); break;
                  case 3: canvasContext.transform(-1, 0, 0, -1, width, height ); break;
                  case 4: canvasContext.transform(1, 0, 0, -1, 0, height ); break;
                  case 5: canvasContext.transform(0, 1, 1, 0, 0, 0); break;
                  case 6: canvasContext.transform(0, 1, -1, 0, height , 0); break;
                  case 7: canvasContext.transform(0, -1, -1, 0, height , width); break;
                  case 8: canvasContext.transform(0, -1, 1, 0, 0, width); break;
                  default: canvasContext.transform(1, 0, 0, 1, 0, 0);
            }

            canvasContext.drawImage(targetImage, 0, 0, width, height);
            var dataURI = canvas.toDataURL("image/jpeg");

            // document.querySelector('#capsuleImageViewer').src = dataURI;
            // var newFileName = Meteor.uuid()  + '-' + fName;
            var newFileName = Random.id();
            var newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_originRe.' + extension;
            $("#saveDataSumImages").append("<div><img class='timecapsul-map' src="+ dataURI  +" alt='' id='capsuleImageViewer'> <button id='delThis' value="+newFileName+">삭제</button></div>");
            //위치정보 저장
            // var latitued = EXIF.getTag(this, "GPSLatitude");
            // var longitude = EXIF.getTag(this, "GPSLongitude");

            //원본파일 줄인것
            imgThumb.fileName = imgThumb.fileName.replace('fileName', newFileName);
            imgThumb.data = dataURI;
            imgOriginRe.push(imgThumb);
            imgOriginRe.push({
              filePath : newFilePath,
              folder : global.s3.folder.story,
              fileName : newFileName,
              type : 'originRe',
              extension : extension,
              data : dataURI2,
              // lat : latitued ? global.fn_toDecimal(latitued) : null,
              // lng : longitude ? global.fn_toDecimal(longitude) : null
            });

            // $("#capsuleImageViewer").attr("hidden", false);
            // $("#mapViewDiv").attr("hidden", true);
          });
        };
      };
    },
    "click #save":function(e,t){
      global.fn_upLoadeS3Image(imgOriginRe);
      var exParam = {
        "type" : "IM",
        "userId" : "test",
        "open" : 0,
        "title" : "",
        "content" : "<p>resar</p>",
        "startDate" : "2018-04-06",
        "images" : imgOriginRe,
        "tagList" : [],
        "updateDate" : "",
        "lock" : false,
      }
      var _date = new Date().toISOString();
      var result = new Date(_date).format('yyyy-MM-dd HH:mm:ss');
      exParam.title = t.find('input[id="meTitle"]').value;
      exParam.content = t.find('input[id="content"]').value;
      exParam.updateDate = t.find('input[id="my-datepicker1"]').value;
      // exParam.regDate = result;
      tagArray = [];
      var _id;

      $('#tagUlList').find('li').each(function(index){
        if($(this).text()!== ""){
          var splitTage = $( this ).text().replace('#','');
          tagArray.push(splitTage);
        }
      });
      exParam.tagList = tagArray;
      Meteor.call('storyUpsert', _id, exParam);


    },
    "click #delThis":function(e, t){
      // console.log(imgOriginRe+"");
      for(var i = 0 ; i < imgOriginRe.length; i++){
        if(imgOriginRe[i].fileName === e.target.value){
          imgOriginRe.splice(i,1);
        }
      }
      $(e.currentTarget.parentElement).remove();
    },

    "keydown #inputTag": function(e, t){
      if(e.target.value.length >= 15 && e.which !== 8){
        // console.log(e.target.value.length);
        return;
      }
    },

    "keyup #inputTag": function(e, t){
      var tag = t.find('input[id="inputTag"]').value;
      if(e.keyCode === 13 && tag !== ""){
        $("#inputTag").before("<li><a ><strong>#</strong>"+tag+"</a><a class=\"btn-tagDelete\"></a></li>");
        t.find('input[id="inputTag"]').value = "";
      }
      //inputbox width리사이징을 위한 function global
      global.fn_inputResizing(e.target);
    }
});
