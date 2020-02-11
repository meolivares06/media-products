import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import CrudTable from "./components/CrudTable";
import FormProduct from "./components/FormProduct";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <Router>
      <Header />

      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Manage media products</h1>

            <p>
              <Link className="btn btn-primary my-2" to="/add">
                Add product
              </Link>

              <Link className="btn btn-secondary my-2" to="/list">
                List products
              </Link>
            </p>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <Switch>
                <Route path="/add">
                  <ProductPage editing={0} />
                </Route>
                <Route path="/list">
                  <CrudTable />
                </Route>
                <Route path="/edit/:id">
                  <ProductPage editing={1} />
                </Route>
                <Route path="/"></Route>
              </Switch>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
