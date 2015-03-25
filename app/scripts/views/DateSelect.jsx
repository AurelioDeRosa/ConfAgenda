var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var DateSelect = React.createClass({
   propTypes: {
      dates: React.PropTypes.array.isRequired,
      selectedDate: React.PropTypes.string.isRequired,
      onChange: React.PropTypes.func.isRequired
   },

   mixins: [PureRenderMixin],

   getDefaultProps: function() {
      return {
         dates: [],
         selectedDate: '',
         onChange: function() {}
      };
   },

   changeHandler: function() {
      this.props.onChange(React.findDOMNode(this.refs['day-select']).value);
   },

   render: function () {
      return (
         <div className="date-select">
            <label htmlFor="day-select">Select a date:</label>
            <select id="day-select" ref="day-select" onChange={this.changeHandler} value={this.props.selectedDate}>
               {this.props.dates.map(function(date, index) {
                  return <option value={date} key={index}>{new Date(date).toLocaleDateString()}</option>;
               })}
            </select>
         </div>
      );
   }
});

module.exports = DateSelect;