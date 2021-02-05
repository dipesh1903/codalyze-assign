import React ,{lazy, Suspense} from 'react';
import {Redirect, Switch, Route} from "react-router-dom";
import {HOME} from './constants/RoutesEnum';
import LoadingComp from './components/loading';

const ReceipeListComp = lazy(() => import('./pages/MainComp'));

function App() {
  return (
    <Suspense fallback={<LoadingComp/>}>
      <Switch>
        <Route exact path={HOME} component={ReceipeListComp}/>
        <Redirect to={HOME}/>
      </Switch>
    </Suspense>

  );
}

export default App;
