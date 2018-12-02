import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Welcome from './components/Welcome';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import reducers from './reducers';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Feature from './components/Feature';
import PlayListPlayar from './components/playar/PlayListPlayar';
import ListPlayar from './components/guess/ListPlayar';
import Signup2 from './components/guess/Signup2';
import Start from './components/guess/Start';
import './index.css'



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
      option: { main: '#ce6f22' },
      error: { main: '#ff0000' },  
    },
});


  
  ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/feature" component={Feature} />
                    <Route path="/signout" component={Signout} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/playlist/:id/:name" component={PlayListPlayar} />
                    <Route path="/x/start/:id"  component={Start} />
                    <Route path="/x/signin/:id"  component={Signup2} />
                    <Route path="/guess/:id" component={ListPlayar} />
                </App>
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
   , document.querySelector('#root')
  );