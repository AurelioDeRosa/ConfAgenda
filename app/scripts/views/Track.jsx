var React = require('react');
var Talk = require('./Talk.jsx');

var Track = React.createClass({
   propTypes: {
      name: React.PropTypes.string.isRequired,
      talks: React.PropTypes.array.isRequired,
      onChange: React.PropTypes.func.isRequired
   },

   getDefaultProps: function() {
      return {
         name: '',
         talks: [],
         onChange: function(){}
      };
   },

   render: function() {
      return (
         <div className="track">
            <h2 className="track__name">{this.props.name}</h2>
            <ul className="track__talks">
               {this.props.talks.map(function(talk) {
                  return (
                     <li key={talk.title}>
                        <Talk {...talk} onChange={this.props.onChange} />
                     </li>
                  );
               }, this)}
            </ul>
         </div>
      );
   }
});

module.exports = Track;