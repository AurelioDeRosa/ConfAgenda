var React = require('react');
var Swiper = require('swiper');
var Utility = require('../Utility.js');
var MyTrack = require('../MyTrack.js');
var Track = require('./Track.jsx');

React.initializeTouchEvents(true);

var Day = React.createClass({
   propTypes: {
      date: React.PropTypes.string.isRequired,
      tracks: React.PropTypes.object.isRequired
   },

   getDefaultProps: function() {
      return {
         date: '',
         tracks: {}
      };
   },

   componentDidMount: function() {
      var root = React.findDOMNode(this);
      new Swiper(root, {
         mode: 'horizontal',
         calculateHeight: true,
         keyboardControl: true,
         pagination: root.querySelector('.swiper-pagination'),
         paginationClickable: true
      });
   },

   changeHandler: function(talkTitle, isStarred) {
      if (isStarred) {
         Utility.searchTalk(talkTitle).then(function(talk) {
            MyTrack.addTalk(talk, this.props.date);
            this.forceUpdate();
         }.bind(this));
      } else {
         MyTrack.removeTalk(talkTitle, this.props.date);
         this.forceUpdate();
      }
   },

   render: function() {
      return (
         <div className="day swiper-container">
            <ul className="day__tracks swiper-wrapper">
               {Object.keys(this.props.tracks).map(function(trackName) {
                  return (
                     <li key={trackName} className="swiper-slide">
                        <Track name={trackName} talks={this.props.tracks[trackName]} onChange={this.changeHandler} />
                     </li>
                  );
               }, this)}
            </ul>
            <div className="swiper-pagination"></div>
         </div>
      );
   }
});

module.exports = Day;