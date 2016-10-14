import { DDP } from 'meteor/ddp-client'
import { Mongo } from 'meteor/mongo'
import { FilesCollection } from 'meteor/rafa93br:files-custom-ddp';

const filesDDPUrl = Meteor.settings.public.filesDDPUrl
if (!filesDDPUrl) throw new Error('Must config filesDDPUrl in settings.json!')

export const FileDDP = DDP.connect(filesDDPUrl)

const collection = new Mongo.Collection('files', {
  connection: FileDDP,
})

window.FileDDP = FileDDP;

export default new FilesCollection({
  ddp: FileDDP,
  debug: true,
  collection,
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (/png|jpg|jpeg|bmp/i.test(file.extension) || file.type === 'image/webp') {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});
