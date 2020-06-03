// library
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

// image
import Logo from '../../../asset/icon/logo.svg';
import API from '../../../services';

// style
import './Masuk.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authentikasi from '../../../auth/authentikasi';

class Masuk extends Component{
    constructor(props){
        super(props)
        this.state={
            'isLoading':false,
            'form':{
                'email': '',
                'password': ''
            }
        }
    }
    changeValue = (e) =>{
        this.setState({
            ...this.state,
            'form':{
                ...this.state.form,
                [e.target.name]  : e.target.value
            }
        })
    }
    masuk = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            'isLoading':true
        })

        API.Masuk(this.state.form)
        .then(res=>{
            if(res.data.error){
                swal({
                    'title': 'Oops',
                    'text':res.data.message,
                    'icon':'error'
                })
                this.setState({
                    ...this.state,
                    'isLoading':false
                })
            }else{
                let data = {
                    email:res.data.data.email,
                    id:res.data.data.id,
                    username: res.data.data.name
                }
                Authentikasi.login(data);
                this.props.history.push('/')
            }
        })
    }
    render(){
        return(
            <Fragment>
                <div className="container">
                    <div className="row m-row m-row-bg">
                        <div className="page col-lg-4 col-md-4 col-12 offset-lg-4 offset-md-4">
                            <div className="logo">
                                <img src={Logo} alt="epent"/>
                            </div>
                            <div className="card m-card">
                                <form onSubmit={this.masuk}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Masukkan Email" required autoFocus onChange={this.changeValue} value={this.state.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Masukkan Password" required onChange={this.changeValue} value={this.state.password}/>
                                    </div>
                                    <input type="submit" value="MASUK" className="btn btn-blue mt-15 btn-submit" disabled={this.state.isLoading}/>
                                </form>
                                <Link className="btn btn-blue-border mt-10" to="/daftar">DAFTAR</Link>
                            </div>
                            <div className="motto">
                                <p className="nama-app">EPENT</p>
                                <p>Find your happinest</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Masuk;