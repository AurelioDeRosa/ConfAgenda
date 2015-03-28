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
 * Tests if a given date string exists in the dates of the conference
 *
 * @param {string} date
 * @returns {Promise|!Promise.<RESULT>|*}
 */
function dateExists(date) {
   return getConference().then(function(conference) {
      var datesFound = Object.keys(conference).filter(function(currentDate) {
         return currentDate === date;
      });

      return datesFound.length > 0;
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
 * @param {string} twitterHandle
 * @returns {Promise|!Promise.<RESULT>|*}
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
 * @param {string} title
 * @returns {Promise|!Promise.<RESULT>|*}
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

/**
 * Converts a string representing a date into a string
 * more suitable to be used as a part of a URL
 *
 * @param {string} date
 * @returns {string}
 */
function dateStringToUrlDate(date) {
   return date === '' ? date : date.split('/').join('-');
}

/**
 * Converts a string containing a date in a format suitable
 * to be used as a part of a URL into a string containing a date
 *
 * @param {string} date
 * @returns {string}
 */
function urlDateToDateString(date) {
   return date === '' ? date : date.split('-').join('/');
}

var Utility = {
   getConference: getConference,
   dateExists: dateExists,
   getAbout: getAbout,
   searchSpeaker: searchSpeaker,
   searchTalk: searchTalk,
   dateStringToUrlDate: dateStringToUrlDate,
   urlDateToDateString: urlDateToDateString
};

module.exports = Utility;