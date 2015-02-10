var React = require('react');

var DateSelect = React.createClass({
   propTypes: {
      dates: React.PropTypes.array.isRequired,
      onChange: React.PropTypes.func.isRequired
   },

   getDefaultProps: function() {
      return {
         dates: [],
         onChange: function() {}
      };
   },

   changeHandler: function() {
      this.props.onChange(this.refs['day-select'].getDOMNode().value);
   },

   render: function () {
      return (
         <div className="date-select">
            <label htmlFor="day-select">Select a date:</label>
            <select id="day-select" ref="day-select" onChange={this.changeHandler}>
               {this.props.dates.map(function(date, index) {
                  return <option value={date} key={index}>{new Date(date).toLocaleDateString()}</option>;
               })}
            </select>
         </div>
      );
   }
});

module.exports = DateSelect;