import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import './App.css';
const LoginPage = lazy(() => import('./Pages/LoginPage/LoginPage.js'));
const HomePage = lazy(() => import('./Pages/HomePage/HomePage.js'));

const App = () => (
  <React.Fragment>
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/home" component={HomePage}/>
      </Switch>
    </Suspense>
  </Router>
  </React.Fragment>
);

export default App;
