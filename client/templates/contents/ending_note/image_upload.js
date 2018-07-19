// "change #capsuleImage": function(e, t){
//     var imageObj = e.target.files[0];
//
//     var reader = new FileReader();
//     reader.readAsDataURL(imageObj);
//
//     // var fName = imageObj.name.substring(0, imageObj.name.lastIndexOf('.'));
//     var extension = imageObj.name.substring(imageObj.name.lastIndexOf('.')+1);
//
//     $("[name=fileName]").val(imageObj.name);
//     reader.onload = function  () {
//       var tempImage = new Image();
//       tempImage.src = reader.result;
//
//       tempImage.onload = function () {
//         targetImage = this;
//         var width = targetImage.width;
//         var height = targetImage.height;
//         var orientation = 1;
//         EXIF.getData(imageObj, function(e,r) {
//
//           if(targetImage.width >= targetImage.height){
//             if(targetImage.width > 1024){
//               width = 1024;
//               height = targetImage.height * (1024/targetImage.width);
//             }
//           } else {
//             if(targetImage.height > 800){
//               height = 800;
//               width = targetImage.width * (800/targetImage.height);
//             }
//           }
//
//           var canvas = document.createElement('canvas');
//           var canvasContext = canvas.getContext("2d");
//
//           orientation = EXIF.getTag(this, "Orientation");
//           if ([5,6,7,8].indexOf(orientation) > -1) {
//             canvas.width = height;
//             canvas.height = width;
//           } else {
//             canvas.width = width;
//             canvas.height = height;
//           }
//
//           switch (orientation) {
//                 case 2: canvasContext.transform(-1, 0, 0, 1, width, 0); break;
//                 case 3: canvasContext.transform(-1, 0, 0, -1, width, height ); break;
//                 case 4: canvasContext.transform(1, 0, 0, -1, 0, height ); break;
//                 case 5: canvasContext.transform(0, 1, 1, 0, 0, 0); break;
//                 case 6: canvasContext.transform(0, 1, -1, 0, height , 0); break;
//                 case 7: canvasContext.transform(0, -1, -1, 0, height , width); break;
//                 case 8: canvasContext.transform(0, -1, 1, 0, 0, width); break;
//                 default: canvasContext.transform(1, 0, 0, 1, 0, 0);
//           }
//
//           canvasContext.drawImage(targetImage, 0, 0, width, height);
//           var dataURI = canvas.toDataURL("image/jpeg");
//           document.querySelector('#capsuleImageViewer').src = dataURI;
//           // var newFileName = Meteor.uuid()  + '-' + fName;
//           var newFileName = Meteor.uuid();
//           var newFilePath = global.s3.bucketPath + global.s3.folder.story + '/' + newFileName + '_originRe.' + extension;
//
//           //위치정보 저장
//           var latitued = EXIF.getTag(this, "GPSLatitude");
//           var longitude = EXIF.getTag(this, "GPSLongitude");
//
//           //원본파일 줄인것
//           imgOriginRe = {
//             filePath : newFilePath,
//             fileName : newFileName,
//             type : 'originRe',
//             extension : extension,
//             data : dataURI,
//             lat : latitued ? global.fn_toDecimal(latitued) : null,
//             lng : longitude ? global.fn_toDecimal(longitude) : null
//           };
//
//           // $("#capsuleImageViewer").attr("hidden", false);
//           // $("#mapViewDiv").attr("hidden", true);
//         });
//       };
//     };
//   },
//
//
// var capsuleimg = {};
//
//   global.fn_upLoadeS3Image(imgOriginRe);
// }
