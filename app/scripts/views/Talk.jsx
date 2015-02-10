var React = require('react/addons');
var Link = require('react-router').Link;
var MyTrack = require('../MyTrack.js');
var Speaker = require('./Speaker.jsx');

var Talk = React.createClass({
   propTypes: {
      startTime: React.PropTypes.string.isRequired,
      endTime: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      speaker: React.PropTypes.array.isRequired,
      language: React.PropTypes.string,
      onChange: React.PropTypes.func.isRequired
   },

   getInitialState: function() {
      return {
         isStarred: false
      }
   },

   componentDidMount: function() {
      this.setState({isStarred: MyTrack.exists(this.props.title)});
   },
   componentWillReceiveProps: function() {
      this.setState({isStarred: MyTrack.exists(this.props.title)});
   },

   clickHandler: function() {
      this.setState({
         isStarred: !this.state.isStarred
      },
      function() {
         this.props.onChange(this.props.title, this.state.isStarred);
      });
   },

   render: function() {
      var starClasses = React.addons.classSet({
         talk__star: true,
         'icon--star-empty': !this.state.isStarred,
         'talk__star--active': this.state.isStarred,
         'icon--star': this.state.isStarred
      });
      var language = '';
      if (this.props.language) {
         language = <span className="talk__language">{this.props.language}</span>;
      }
      var buttonText = 'Attend this talk';
      if (this.state.isStarred) {
         buttonText = 'You are attending this talk';
      }

      return (
         <div className="talk">
            <div className="talk__time">
               <time>{this.props.startTime}</time> - <time>{this.props.endTime}</time>
            </div>
            <div className="talk__info">
               <h2 className="talk__title">
                  <Link to="talk" params={{title: this.props.title}}>
                     {this.props.title}
                  </Link>
               </h2>
               <p className="talk__speaker">
                  {this.props.speaker.map(function(speaker) {
                     return <Speaker twitter={speaker.twitter} name={speaker.name} key={speaker.twitter} />;
                  })}
               </p>
               <button className={starClasses} onClick={this.clickHandler}>
                  {buttonText}
               </button>
               {language}
            </div>
         </div>
      );
   }
});

module.exports = Talk;