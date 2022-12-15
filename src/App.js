import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AnaSayfa from "./AnaSayfa";
import Form from "./Form";
import "./reset.css";
import "./index.css";
import "./form.css";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <h1>Teknolojik Yemekler</h1>
          <p>
            <Link to="/">Ana Sayfa</Link>
          </p>
          <p>
            <Link to="/pizza">Sipariş Formu</Link>
          </p>
        </div>

        <Route exact path="/" component={AnaSayfa} />
        <Route path="/pizza" component={Form} />
      </Router>
    </>
  );
};

export default App;
