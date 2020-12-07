import history from './services/history';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import SearchPage from './navigation/SearchPage';
import NotFoundPage from './navigation/NotFoundPage';
import AddItemsPage from './navigation/AddItemsPage';
import ViewItemsPage from './navigation/ViewItemsPage';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path='/' render={() => <Redirect to='/search'/>}/>
        <Route exact={true} path='/search' component={SearchPage}/>
        <Route exact={true} path='/create' component={AddItemsPage}/>
        <Route exact={true} path='/view' component={ViewItemsPage}/>
        <Route exact={true} path='/404' component={NotFoundPage}/>
        <Redirect to='/404'/>
      </Switch>
    </Router>
  );
}

export default App;
