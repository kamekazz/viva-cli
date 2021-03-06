import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import reducers from './reducers';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import PlayListPlayar from './components/playar/PlayListPlayar';
import ListPlayar from './components/guess/ListPlayar';
import Signup2 from './components/guess/Signup2';
import Start from './components/guess/Start';
import './index.css'
// import FloatingActionButtonZoom from './components/layout/Test';
import Dashboard from './components/dashboard/Dashboard';
import history from './history';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducers,
    {
        auth: { authenticated: localStorage.getItem('token') }
    },
    applyMiddleware(reduxThunk)
);


const theme = createMuiTheme({
    palette: {
      primary: { main: '#000000' }, 
      secondary: { main: '#E54B4B' }, 
      error: { main: '#ff0000' },  
    },
});


  
  ReactDOM.render(
    <Provider store={store}>
        <Router  history={history}>
            <MuiThemeProvider theme={theme}>
                <App>
                <Switch>
                    {/* <Route path="/test" component={FloatingActionButtonZoom} /> */}
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/feature" component={Dashboard} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/playlist/:id/:name" component={PlayListPlayar} />
                    <Route path="/x/start/:id"  component={Start} />
                    <Route path="/x/signin/:id"  component={Signup2} />
                    <Route path="/guess/:id" component={ListPlayar} />
                </Switch>
                </App>
            </MuiThemeProvider>
        </Router>
    </Provider>
   , document.querySelector('#root')
  );

  serviceWorker.unregister();