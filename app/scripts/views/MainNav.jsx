var React = require('react');
var Link = require('react-router').Link;

var MainNav = React.createClass({
   render: function() {
      return (
         <nav className="main-menu">
            <ul>
               <li>
                  <Link to="conference" className="main-menu__link">
                     <i className="icon--home"></i>
                     <span>Tracks</span>
                  </Link>
               </li>
               <li>
                  <Link to="my-track" className="main-menu__link">
                     <i className="icon--star"></i>
                     <span>My Track</span>
                  </Link>
               </li>
               <li>
                  <Link to="about" className="main-menu__link">
                     <i className="icon--info"></i>
                     <span>About</span>
                  </Link>
               </li>
            </ul>
         </nav>
      );
   }
});

module.exports = MainNav;