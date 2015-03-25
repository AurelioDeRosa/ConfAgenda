var React = require('react');
var Swiper = require('swiper');
var Utility = require('../Utility.js');
var MyTrack = require('../MyTrack.js');
var Track = require('./Track.jsx');

React.initializeTouchEvents(true);

var Day = React.createClass({
   contextTypes: {
      router: React.PropTypes.func
   },

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
      var tracksNames = Object.keys(this.props.tracks);
      var selectedTrackIndex = tracksNames.indexOf(this.context.router.getCurrentParams().track);

      if (selectedTrackIndex === -1) {
         selectedTrackIndex = 0;
      }

      this.swiper = new Swiper(root, {
         mode: 'horizontal',
         initialSlide: selectedTrackIndex,
         calculateHeight: true,
         keyboardControl: true,
         pagination: root.querySelector('.swiper-pagination'),
         paginationClickable: true,
         onSlideChangeEnd: function(swiper) {
            this.context.router.transitionTo('conference', {
               date: Utility.dateStringToUrlDate(this.props.date),
               track: encodeURIComponent(tracksNames[swiper.activeIndex])
            });
         }.bind(this)
      });
   },

   componentWillReceiveProps: function() {
      var tracksNames = Object.keys(this.props.tracks);
      var track = this.context.router.getCurrentParams().track;

      if (track) {
         var selectedTrackIndex = tracksNames.indexOf(track);

         if (selectedTrackIndex === -1) {
            this.context.router.replaceWith('conference', {
               date: Utility.dateStringToUrlDate(this.props.date)
            });
         } else if(this.swiper.activeIndex !== selectedTrackIndex) {
            this.swiper.swipeTo(selectedTrackIndex, 0);
         }
      } else {
         this.swiper.swipeTo(0, 0);
      }
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