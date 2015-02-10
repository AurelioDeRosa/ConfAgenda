var React = require('react');
var MyTrackModel = require('../MyTrack.js');
var Talk = require('./Talk.jsx');
var DateSelect = require('./DateSelect.jsx');

var MyTrack = React.createClass({
   getInitialState: function() {
      return {
         date: '',
         track: {}
      };
   },

   componentDidMount: function() {
      var myTrack = MyTrackModel.load();
      this.setState({
         track: myTrack,
         date: Object.keys(myTrack).shift() || ''
      });
   },

   changeHandler: function(title) {
      var myTrack = MyTrackModel.removeTalk(title, this.state.date);
      var date = myTrack[this.state.date] ? this.state.date : Object.keys(myTrack).shift() || '';
      this.setState({
         track: myTrack,
         date: date
      });
   },
   changeDateHandler: function(date) {
      this.setState({date: date});
   },

   render: function() {
      var track = <p>You haven't starred any talk yet</p>;
      var dates = Object.keys(this.state.track);
      var daySelect;

      if (this.state.date) {
         track = this.state.track[this.state.date].map(function(talk) {
               return (
                  <li key={talk.title}>
                     <Talk {...talk} onChange={this.changeHandler} />
                  </li>
               );
            }, this);
      }

      if (dates.length === 1) {
         daySelect = <h3>{new Date(dates[0]).toLocaleDateString()}</h3>;
      } else if (dates.length > 1) {
         daySelect = <DateSelect dates={dates} onChange={this.changeDateHandler} />;
      }

      return (
         <div className="track island island--block">
            <h1 className="track__name">My Track</h1>
            {daySelect}
            <ul className="track__talks">
               {track}
            </ul>
         </div>
      );
   }
});

module.exports = MyTrack;