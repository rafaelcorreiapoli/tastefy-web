// import { FilesCollection } from 'meteor/ostrio:files';
// import _ from 'lodash'
// import request from 'request'
// import client from './knox_client'
//
// const cfdomain = 'https://d17hjp58dxb13h.cloudfront.net'
// const storagePath = 'assets/app/uploads/uploadedFiles'
// const collectionName = 'uploadedFiles'
// import { Random } from 'meteor/random'
//
// const generateFilePath = (Version, extension) => `files/${Random.id()}-${version}.${extension}`
//
//
// const collection = new FilesCollection({
//   debug: true, // Change to `true` for debugging
//   throttle: false,
//   allowClientCode: false,
//   storagePath,
//   collectionName,
//   onAfterUpload(fileRef) {
//     // In onAfterUpload callback we will move file to AWS:S3
//     const self = this;
//     _.each(fileRef.versions, function (vRef, version) {
//       const filePath = generateFilePath(version, fileRef.extension)
//       client.putFile(vRef.path, filePath, (error) => {
//         Meteor.bindEnvironment(() => {
//           let upd;
//           if (error) {
//             console.error(error);
//           } else {
//             upd = {
//               $set: {},
//             };
//             upd.$set[`versions.${version}.meta.pipeFrom`] = `${cfdomain}/${filePath}`;
//             upd.$set[`versions.${version}.meta.pipePath`] = filePath;
//             self.collection.update({
//               _id: fileRef._id,
//             },
//             upd,
//             updateError => {
//               if (updateError) {
//                 console.error(updateError);
//               } else {
//                 // Unlink original files from FS
//                 // after successful upload to AWS:S3
//                 self.unlink(self.collection.findOne(fileRef._id), version);
//               }
//             });
//           }
//         });
//       });
//     });
//   },
//   interceptDownload(http, fileRef, version) {
//     let path, ref, ref1, ref2;
//     path = (ref = fileRef.versions) != null ? (ref1 = ref[version]) != null ? (ref2 = ref1.meta) != null ? ref2.pipeFrom : void 0 : void 0 : void 0;
//     if (path) {
//       // If file is moved to S3
//       // We will pipe request to S3
//       // So, original link will stay always secure
//       request({
//         url: path,
//         headers: _.pick(http.request.headers, 'range', 'accept-language', 'accept', 'cache-control', 'pragma', 'connection', 'upgrade-insecure-requests', 'user-agent'),
//       }).pipe(http.response);
//       return true;
//     } else {
//       // While file is not yet uploaded to S3
//       // We will serve file from FS
//       return false;
//     }
//   },
// });
//
// // Intercept File's collection remove method
// // to remove file from S3
// const _origRemove = collection.remove;
//
// collection.remove = (search) => {
//   const cursor = this.collection.find(search);
//   cursor.forEach((fileRef) => {
//     _.each(fileRef.versions, (vRef) => {
//       let ref;
//       if (vRef !== null ? (ref = vRef.meta) !== null ? ref.pipePath : void 0 : void 0) {
//         client.deleteFile(vRef.meta.pipePath, (error) => {
//           Meteor.bindEnvironment(() => {
//             if (error) {
//               console.error(error);
//             }
//           });
//         });
//       }
//     });
//   });
//   // Call original method
//   _origRemove.call(this, search);
// };
//
// export default collection
