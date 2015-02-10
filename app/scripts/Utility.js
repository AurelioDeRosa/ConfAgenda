'use strict';

var JSONSelect = require('jsonselect');
/* global -Promise */
var Promise = global.Promise || require('es6-promise').Promise;

var DATABASEURL = 'database.json';
var database = null;

/**
 * Retrieves the data of the presentations
 *
 * @returns {Promise}
 */
function getConference() {
   return new Promise(function(resolve, reject) {
      if (database) {
         resolve(database.conference);
         return;
      }

      var request = new XMLHttpRequest();
      request.open('GET', DATABASEURL);
      request.onload = function() {
         if (request.status >= 200 && request.status < 400) {
            database = JSON.parse(request.responseText);
            resolve(database.conference);
         } else {
            reject(Error('Data not found'));
         }
      };
      request.onerror = function() {
         reject(Error('Network error'));
      };
      request.send();
   });
}

/**
 * Retrieves the data about the conference
 *
 * @returns {Promise}
 */
function getAbout() {
   return new Promise(function(resolve, reject) {
      if (database) {
         resolve(database.about);
         return;
      }

      var request = new XMLHttpRequest();
      request.open('GET', DATABASEURL);
      request.onload = function() {
         if (request.status >= 200 && request.status < 400) {
            database = JSON.parse(request.responseText);
            resolve(database.about);
         } else {
            reject(Error('Data not found'));
         }
      };
      request.onerror = function() {
         reject(Error('Network error'));
      };
      request.send();
   });
}

/**
 * Searches a speaker based on the twitter handle provided
 *
 * @param twitterHandle {string}
 * @returns {*}
 */
function searchSpeaker(twitterHandle) {
   if (typeof twitterHandle !== 'string') {
      throw Error('The twitterHandle parameter must be a string');
   }

   return getConference().then(function(data) {
      try {
         return data ?
            JSONSelect.match('.speaker :has(.twitter:val("' + twitterHandle + '"))', database.conference)[0] :
            null;
      } catch(ex) {
         return null;
      }
   });
}

/**
 * Searches a talk based on the title provided
 *
 * @param title {string}
 * @returns {*}
 */
function searchTalk(title) {
   if (typeof title !== 'string') {
      throw Error('The title parameter must be a string');
   }

   return getConference().then(function(data) {
      try {
         return data ?
            JSONSelect.match(':has(.title:val("' + title + '"))', database.conference)[0] :
            null;
      } catch(ex) {
         return null;
      }
   });
}

var Utility = {
   getConference: getConference,
   getAbout: getAbout,
   searchSpeaker: searchSpeaker,
   searchTalk: searchTalk
};

module.exports = Utility;