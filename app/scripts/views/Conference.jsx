var React = require('react');
var Utility = require('../Utility.js');
var DateSelect = require('./DateSelect.jsx');
var Day = require('./Day.jsx');

/* global -Promise */
var Promise = global.Promise || require('es6-promise').Promise;

var Conference = React.createClass({
   contextTypes: {
      router: React.PropTypes.func
   },

   getInitialState: function() {
      return {
         conference: {},
         date: ''
      };
   },

   componentDidMount: function() {
      var date = Utility.urlDateToDateString(
         this.context.router.getCurrentParams().date || ''
      );

      Promise
         .all([Utility.getConference(), date ? Utility.dateExists(date) : false])
         .then(function(values) {
            this.setState(
               {
                  conference: values[0],
                  date: values[1] ? date : Object.keys(values[0]).shift()
               },
               function() {
                  if (!values[1]) {
                     this.context.router.replaceWith('conference');
                  }
               }
            );
         }.bind(this));
   },

   componentWillReceiveProps: function() {
      var date = Utility.urlDateToDateString(
         this.context.router.getCurrentParams().date || ''
      );

      if (date && date !== this.state.date) {
         Utility.dateExists(date).then(function(dateExists) {
            if (dateExists) {
               this.setState({date: date});
            } else {
               this.setState({
                     date: Object.keys(this.state.conference).shift()
                  },
                  function() {
                     this.context.router.replaceWith('conference');
                  }
               );
            }
         }.bind(this));
      }
   },

   changeHandler: function(date) {
      this.setState({
            date: date
         },
         function() {
            this.context.router.transitionTo('conference', {date: Utility.dateStringToUrlDate(this.state.date)});
         }.bind(this)
      );
   },

   render: function() {
      var currentDay = this.state.conference[this.state.date];
      var dates = Object.keys(this.state.conference);
      var day;
      var daySelect;

      if (dates.length > 1) {
         daySelect = <DateSelect dates={dates} selectedDate={this.state.date} onChange={this.changeHandler} />;
      }
      if (currentDay) {
         day = <Day date={this.state.date} tracks={currentDay} />;
      }

      return (
         <div className="island island--block">
            <h1>Agenda</h1>
            {daySelect}
            {day}
         </div>
      );
   }
});

module.exports = Conference;