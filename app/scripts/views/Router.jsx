var React = require('react');
var ReactRouter = require('react-router');
var ConfAgenda = require('./ConfAgenda.jsx');
var Conference = require('./Conference.jsx');
var MyTrack = require('./MyTrack.jsx');
var About = require('./About.jsx');
var SpeakerDetails = require('./SpeakerDetails.jsx');
var TalkDetails = require('./TalkDetails.jsx');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Redirect = ReactRouter.Redirect;

var routes = (
   <Route name="confagenda" path="/" handler={ConfAgenda}>
      <Route name="conference" path="/conference/:date?/?:track?" handler={Conference} />
      <Route name="my-track" path="/my-track/:date?" handler={MyTrack} />
      <Route name="about" handler={About} />

      <Route name="speaker" path="speaker/:twitter" handler={SpeakerDetails} />
      <Route name="talk" path="talk/:title" handler={TalkDetails} />

      <DefaultRoute handler={Conference} />
      <NotFoundRoute handler={Conference} />
      <Redirect from="/" to="conference" />
   </Route>
);

ReactRouter.run(routes, function (Handler) {
   React.render(<Handler />, document.body);
});