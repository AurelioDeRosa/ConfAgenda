'use strict';

var MYTRACKKEY = 'my-track';

/**
 * Saves the list of the talks
 *
 * @param myTrack
 */
function save(myTrack) {
   localStorage.setItem(MYTRACKKEY, JSON.stringify(myTrack));
}

/**
 * Loads the talks
 *
 * @returns {*|{}}
 */
function load() {
   return JSON.parse(localStorage.getItem(MYTRACKKEY)) || {};
}

/**
 * Sort the days of the custom track based on their dates
 *
 * @param myTrack {Object}
 * @returns {object}
 */
function sortTrack(myTrack) {
   var dates = Object.keys(myTrack);
   if (dates.length > 1) {
      dates.sort(function(a, b) {
         return Date.parse(a) - Date.parse(b);
      });
      var obj = {};
      for(var i = 0; i < dates.length; i++) {
         obj[dates[i]] = myTrack[dates[i]];
      }
      myTrack = obj;
   }

   return myTrack;
}

/**
 * Adds a new talk with a specified date
 *
 * @param talk {object}
 * @param date {string}
 * @returns {object}
 */
function addTalk(talk, date) {
   if (typeof talk !== 'object' || typeof date !== 'string') {
      throw Error('Invalid arguments supplied');
   }

   var myTrack = load();
   if (myTrack[date]) {
      for (var i = 0; i < myTrack[date].length; i++) {
         if (myTrack[date][i].startTime === talk.startTime) {
            myTrack[date][i] = talk;
            break;
         } else if (myTrack[date][i].startTime > talk.startTime) {
            myTrack[date].splice(i, 0, talk);
            break;
         }
      }

      if (i === myTrack[date].length) {
         myTrack[date].push(talk);
      }
   } else {
      myTrack[date] = [talk];
   }

   myTrack = sortTrack(myTrack);

   save(myTrack);

   return myTrack;
}

/**
 * Removes a talk
 *
 * @param title {string}
 * @param date {string}
 * @returns {object}
 */
function removeTalk(title, date) {
   if (typeof title !== 'string' || typeof date !== 'string') {
      throw Error('Invalid arguments supplied');
   }

   var myTrack = load();
   if (!myTrack[date] || myTrack[date].length === 0) {
      return;
   }

   myTrack[date] = myTrack[date].filter(function(talk) {
      return talk.title !== title;
   });

   if (myTrack[date].length === 0) {
      delete myTrack[date];

      if (Object.keys(myTrack).length === 0) {
         myTrack = {};
      }
   }

   save(myTrack);

   return myTrack;
}

/**
 * Tests if a talk exists
 *
 * @param title
 * @param date
 * @returns {boolean}
 */
function exists(title, date) {
   if (typeof title !== 'string' || (date !== undefined && typeof date !== 'string')) {
      throw Error('Invalid arguments supplied');
   }

   var myTrack = load();
   if (date && !myTrack[date]) {
      return false;
   }

   date = date ? [date]: Object.keys(myTrack);
   for(var i = 0; i < date.length; i++) {
      var talks = myTrack[date[i]];
      for (var j = 0; j < talks.length; j++) {
         if (talks[j].title === title) {
            return true;
         }
      }
   }

   return false;
}

var MyTrack = {
   addTalk: addTalk,
   removeTalk: removeTalk,
   exists: exists,
   load: load
};

module.exports = MyTrack;