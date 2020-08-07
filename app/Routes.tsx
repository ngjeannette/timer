/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpacck
const LazyTimerPage = React.lazy(() =>
  import(/* webpackChunkName: "TimerPage" */ './containers/TimerPage')
);
const LazyStartTimerPage = React.lazy(() =>
  import(/* webpackChunkName: "StartTimerPage" */ './containers/StartTimerPage')
);

const TimerPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyTimerPage {...props} />
  </React.Suspense>
);
const StartTimerPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyStartTimerPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.STARTTIMER} component={StartTimerPage} />
        <Route path={routes.TIMER} component={TimerPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
