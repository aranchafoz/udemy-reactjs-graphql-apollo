import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
        <div className="container">
            <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item dropdown mr-lg-2 mb-2 mb-lg-0">
                      <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                        >
                        Customers
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navegation"
                      >
                        <Link to="/customers" className="dropdown-item">
                          See Customers
                        </Link>
                        <Link to="/customer/new" className="dropdown-item">
                          New Customer
                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                        >
                        Products
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navegation"
                      >
                        <Link to="/products" className="dropdown-item">
                          See Products
                        </Link>
                        <Link to="/product/new" className="dropdown-item">
                          New Product
                        </Link>
                      </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;
