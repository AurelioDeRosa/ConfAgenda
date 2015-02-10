var React = require('react');
var Link = require('react-router').Link;

var Speaker = React.createClass({
   propTypes: {
      name: React.PropTypes.string.isRequired,
      twitter: React.PropTypes.string.isRequired
   },

   getDefaultProps: function() {
      return {
         name: '',
         twitter: ''
      };
   },

   render: function() {
      return (
         <Link to="speaker" params={{twitter: this.props.twitter}}>
            {this.props.name}
         </Link>
      );
   }
});

module.exports = Speaker;