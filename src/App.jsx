import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import { auth } from './firebase';
import {useDispatch, useSelector} from 'react-redux';
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from './components/ProfileScreen/ProfileScreen';

function App() {

  const user = useSelector(selectUser);
  const disptach = useDispatch();

  useEffect(() => {
    const unsubscribe =  auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logged in
        disptach(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
        
      }else {
        // Logged out
        disptach(logout());
      }
    });
    return () => {
      unsubscribe();
    }
  }, [disptach]);

  return (
    <div className="app">
      <Router>
        { !user
          ? <Login />
          : (
            <Switch>
              <Route path="/" exact>
                <HomeScreen />
              </Route>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
            </Switch>
            )
        }
      </Router>

    </div>
  );
}

export default App;
