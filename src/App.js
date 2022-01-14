import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style2.css";
import Header from "./components/Header";
import SearchForCoin from "./components/SearchForCoin";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import CompareCrypto from "./components/CompareCrypto";
import facade from "./apiFacade";
import AdminPage from "./components/AdminPage";
import Portfolio from "./components/Portfolio";

export default function App({ facade }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };
  const signup = (user, pass) => {
    facade.signup(user, pass).then((res) => setSignedUp(true));
  };

  return (
    <Router>
      <div>
        <ul className="header">
          <Header facade={facade} loggedIn={loggedIn} logout={logout} />
        </ul>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/portfolio">
              <Portfolio
                facade={facade}
                setLoggedIn={setLoggedIn}
                login={login}
              />
            </Route>
            <Route path="/search">
              <SearchForCoin facade={facade} />
            </Route>
            <Route path="/adminpage">
              <AdminPage facade={facade} />
            </Route>
            <Route path="/login">
              <LoginPage
                login={login}
                logout={logout}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                facade={facade}
              />
            </Route>
            <Route path="/signup">
              <SignupPage
                signup={signup}
                signedUp={signedUp}
                setSignedUp={setSignedUp}
                facade={facade}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return <CompareCrypto facade={facade} />;
}
