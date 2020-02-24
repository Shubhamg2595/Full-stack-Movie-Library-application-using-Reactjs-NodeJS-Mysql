/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import WatchList from '../WatchList';

import Home from '../Home';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/watchList" component={WatchList} />
      {/* <Route path="/features" component={FeaturePage} />
      <Route path="" component={NotFoundPage} /> */}
    </Switch>
  );
}
