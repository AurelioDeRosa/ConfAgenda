var React = require('react');
var State = require('react-router').State;
var Utility = require('../Utility.js');

var SpeakerDetails = React.createClass({
   mixins: [State],

   getInitialState: function() {
      return {
         name: '',
         bio: '',
         avatar: '',
         twitter: '',
         website: ''
      };
   },

   componentDidMount: function() {
      var twitterHandle = this.getParams().twitter;
      if (twitterHandle) {
         Utility.searchSpeaker(twitterHandle).then(function (data) {
            if (data !== null) {
               this.setState(data);
            }
         }.bind(this));
      }
   },

   render: function() {
      return (
         <div className="speaker island island--block">
            <h1 className="speaker__name">{this.state.name}</h1>
            <div>
               <img src={this.state.avatar} alt={this.state.name + ' avatar'} className="speaker__avatar" />
               <a href={'https://twitter.com/' + this.state.twitter} className="speaker__twitter">
                  @{this.state.twitter}
               </a>
               <a href={this.state.website} className="speaker__website">{this.state.website}</a>
            </div>
            <p className="speaker__bio">{this.state.bio}</p>
         </div>
      );
   }
});

module.exports = SpeakerDetails;