var React = require('react');
var Speaker = require('./Speaker.jsx');
var Utility = require('../Utility.js');

var TalkDetails = React.createClass({
   contextTypes: {
      router: React.PropTypes.func
   },

   getInitialState: function() {
      return {
         title: '',
         description: '',
         startTime: '',
         endTime: '',
         speaker: [],
         website: ''
      };
   },

   componentDidMount: function() {
      var title = decodeURIComponent(this.context.router.getCurrentParams().title);
      if (title) {
         Utility.searchTalk(title).then(function (data) {
            if (data !== null) {
               this.setState(data);
            }
         }.bind(this));
      }
   },

   render: function() {
      return (
         <div className="talk-details island island--block">
            <h1 className="talk-details__name">{this.state.title}</h1>
            <p className="talk-details__description">{this.state.description}</p>
            <dl>
               <dt>Time</dt>
               <dd>
                  <time className="talk-details__time talk-details__time--start">{this.state.startTime}</time>
                  {' - '}
                  <time className="talk-details__time talk-details__time--end">{this.state.endTime}</time>
               </dd>
               <dt>Speaker</dt>
               <dd className="talk-details__speaker">
                  {this.state.speaker.map(function(speaker) {
                     return <Speaker twitter={speaker.twitter} name={speaker.name} key={speaker.twitter} />;
                  })}
               </dd>
               {this.state.language ? <dt>Language</dt> : ''}
               {this.state.language ? <dd className="talk-details__language">{this.state.language}</dd> : ''}
            </dl>
         </div>
      );
   }
});

module.exports = TalkDetails;