var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Utility = require('../Utility.js');

var About = React.createClass({
   mixins: [PureRenderMixin],

   getInitialState: function() {
      return {
         name: '',
         logoUrl: '',
         location: '',
         date: '',
         twitter: '',
         website: ''
      };
   },

   componentDidMount: function() {
      Utility.getAbout().then(function(data) {
         this.setState({
            name: data.name,
            logoUrl: data.logoUrl,
            location: data.location,
            date: data.date,
            twitter: data.twitter,
            website: data.website
         });
      }.bind(this));
   },

   render: function() {
      return (
         <div>
            <div className="about island island--block">
               <h1 className="about__name">{this.state.name}</h1>
               <img className="about__logo" src={this.state.logoUrl} />
               <span className="about__location">{this.state.location}</span>
               {' — '}
               <span className="about__date">{this.state.date}</span>
               <a href={this.state.website} className="about__website">
                  {this.state.website}
               </a>
               <p>
                  Follow us on Twitter
                  at <a href={'https://twitter.com/' + this.state.twitter} className="about__twitter">
                     @{this.state.twitter}
                  </a>
               </p>
            </div>
            <div className="copyright">
               <small>
                  This web application is powered
                  by <a href="https://confagenda.audero.it">ConfAgenda</a>,
                  created by <a href="https://twitter.com/AurelioDeRosa">@AurelioDeRosa</a>
               </small>
            </div>
         </div>
      )
   }
});

module.exports = About;