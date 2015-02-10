var React = require('react');
var Utility = require('../Utility.js');
var DateSelect = require('./DateSelect.jsx');
var Day = require('./Day.jsx');

var Conference = React.createClass({
   getInitialState: function() {
      return {
         conference: {},
         date: ''
      };
   },

   componentDidMount: function() {
      Utility.getConference().then(function(data) {
         this.setState({
            conference: data,
            date: Object.keys(data).shift()
         });
      }.bind(this));
   },

   changeHandler: function(date) {
      this.setState({date: date});
   },

   render: function() {
      var currentDay = this.state.conference[this.state.date];
      var dates = Object.keys(this.state.conference);
      var day;
      var daySelect;
      if (dates.length > 1) {
         daySelect = <DateSelect dates={dates} onChange={this.changeHandler} />;
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