// FoodApp.js  //CommentBox.js
import React, { Component } from 'react'; 
import {BrowserRouter, Route} from "react-router-dom";

import Home from "./components/Home";
import Shopprofile from "./components/Shopprofile";
import StarRating from './components/StarRating';
import Map1 from './components/Map1';
import Auth from './services/Auth/Auth';
import Callback from './callback/Callback';
import Profile from './profiles/Profile';


const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

class FoodApp extends Component {
  
  render() {
      return (

          <BrowserRouter>
              <div>


              
            
              <Route path="/" render={(props) => <Home auth={auth} {...props} />} exact />
              <Route path="/profile" render={(props) => <Profile auth={auth} {...props} />} />
              <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
              <Route path="/shopprofile" component={Shopprofile} exact strict/>
              <Route path="/StarRating" component={StarRating} />
              <Route path="/Map1" component={Map1} />
              <Route path="/callback" render={(props) => {
                        handleAuthentication(props);
                    return <Callback {...props} /> 
               }}/>

              </div>
          </BrowserRouter>

    );
  }
}

export default FoodApp;