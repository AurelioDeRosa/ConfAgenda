var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var MainNav = require('./MainNav.jsx');

var ConfAgenda = React.createClass({
   render: function () {
      return (
         <div>
            <RouteHandler />
            <MainNav />
         </div>
      );
   }
});

module.exports = ConfAgenda;