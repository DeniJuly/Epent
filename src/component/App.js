// library
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './component/protectedRoute/protected.route';
import { UnprotectedRoute } from './component/protectedRoute/unprotected.route';

// page
import Masuk from './page/masuk/Masuk';
import Daftar from './page/daftar/Daftar';
import Home from './page/home/Home';
import Disukai from './page/disukai/Disukai';
import Profile from './page/profile/Profile';
import DetailEvent from './page/detail-event/DetailEvent';
import globalProvider from '../context/context';
import notFound from './page/notFound/notFound';
import Cari from './page/cari/cari';

// style
import './App.css';

class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    {/* Protected route */}
                    <ProtectedRoute path="/" exact component={Home} />
                    <ProtectedRoute path="/disukai" component={Disukai} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/detail-event/:id" component={DetailEvent} />
                    <ProtectedRoute path="/cari/:key" component={Cari} />
                    {/* Unprotected Route */}
                    <UnprotectedRoute path="/daftar" component={Daftar} />
                    <UnprotectedRoute path="/masuk" component={Masuk} />

                    <Route path="*" component={notFound} />
                </Switch>
            </Router>
        )
    }
}

export default globalProvider(App);