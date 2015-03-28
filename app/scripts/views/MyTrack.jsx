var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Utility = require('../Utility.js');
var MyTrackModel = require('../MyTrack.js');
var Talk = require('./Talk.jsx');
var DateSelect = require('./DateSelect.jsx');

var MyTrack = React.createClass({
   contextTypes: {
      router: React.PropTypes.func
   },

   mixins: [PureRenderMixin],

   getInitialState: function() {
      return {
         date: '',
         track: {}
      };
   },

   componentDidMount: function() {
      var date = Utility.urlDateToDateString(
         this.context.router.getCurrentParams().date || ''
      );
      var myTrack = MyTrackModel.load();

      if (!myTrack[date]) {
         date = Object.keys(myTrack).shift() || '';
      }

      this.setState({
            track: myTrack,
            date: date
         },
         function() {
            if (date && !myTrack[date]) {
               this.context.router.replaceWith('my-track');
            }
         }.bind(this)
      );
   },

   componentWillReceiveProps: function() {
      var date = Utility.urlDateToDateString(
         this.context.router.getCurrentParams().date || ''
      );

      if (date && date !== this.state.date) {
         if (this.state.track[date]) {
            this.setState({date: date});
         } else {
            this.setState({
                  date: Object.keys(this.state.track).shift()
               },
               function() {
                  this.context.router.replaceWith('my-track');
               }.bind(this)
            );
         }
      }
   },

   changeHandler: function(title) {
      var myTrack = MyTrackModel.removeTalk(title, this.state.date);
      var date = myTrack[this.state.date] ? this.state.date : Object.keys(myTrack).shift() || '';

      this.setState({
            track: myTrack,
            date: date
         },
         function() {
            this.context.router.transitionTo('my-track', {date: Utility.dateStringToUrlDate(this.state.date)});
         }.bind(this)
      );
   },

   changeDateHandler: function(date) {
      this.setState({
            date: date
         },
         function() {
            this.context.router.transitionTo('my-track', {date: Utility.dateStringToUrlDate(this.state.date)});
         }.bind(this)
      );
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
         daySelect = <DateSelect dates={dates} selectedDate={this.state.date} onChange={this.changeDateHandler} />;
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