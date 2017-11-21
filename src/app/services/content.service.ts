import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


export class Image {
  $key: string;
  file: File;
  description: string;
  url: string;
  progress: number;
  constructor(file: File) {
    this.file = file;
  }
}



@Injectable()
export class ContentService {



  // The contructor function runs automatically on service load, each and every time it's called
  constructor(public router: Router) { }



  // Retrieves and returns content for a particular page from Firebase
  getPageContent(pageName) {
    return firebase.database().ref('/' + pageName).once('value').then(function (pageContent) {
      return pageContent.val();
    });
  }



  // Plain image
  // Uploads file to Firebase storage, and updates the database with the file's URL
  pushUpload(pageName, whichElement, upload: Image) {
    // Returns a promise, so we can use .then() when pushUpload is called
    return new Promise((resolve, reject) => {
      // Upload the file
      const uploadTask = firebase.storage().ref().child(`${pageName}/${whichElement}`).put(upload.file);
      // Based on how the upload is going, perform the following actions:
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // Upload in progress, show a flash message with the % complete
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          upload.progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        },
        (error) => {
          // Upload failed, output error to the console and show a flash error message
          console.log('Error in content.service.ts in the pushUpload function:');
          console.log(error);
        },
        () => {
          // Upload succeeded, update the url in the database
          // Pull relevant information out of the returned info from storage
          upload.url = uploadTask.snapshot.downloadURL;
          // Make database call to update info
          const thisSaved = this;
          firebase.database().ref('/' + pageName + '/' + whichElement).update({
            description: upload.description,
            url: upload.url,
          }).then(function () {
            // Successfully updated database, return the new url
            resolve(upload.url);
          }).catch(function (err) {
            // Error updating url in database, output error to console and show flash error message.
            console.log('Error updating new image URL inside content.service.ts:');
            console.log(err);
          });
        }
      ); // End of uploadTask.on()
    }); // End of returned promise
  } // End of pushUpload() for regular image



}
