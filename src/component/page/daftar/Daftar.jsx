// library
import React, { Component, Fragment } from 'react';
import swal from 'sweetalert';
import API from '../../../services';
import { Link, Redirect } from 'react-router-dom';

// image
import Logo from '../../../asset/icon/logo.svg';

// style
import './Daftar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Daftar extends Component{
    constructor(props){
        super(props)
        this.state={
            'isLoading': false,
            'user':{
                'nama':'',
                'email':'',
                'password':''
            }
        }
    }
    valueChange = (e) =>{
        this.setState({
            ...this.state,
            'user':{
                ...this.state.user,
                [e.target.name]:e.target.value
            }
        })
    }
    daftar = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            'isLoading':true
        })

        API.PostUser(this.state.user)
        .then(res=>{
            this.setState({
                ...this.state,
                'isLoading':false
            })
            if(!res.data.error){
                this.setState({
                    ...this.state,
                    'user':{
                        'nama':'',
                        'email':'',
                        'password':''
                    }
                })
                swal({
                    'title':'Success',
                    'text':'silahkan masuk ke aplikasi',
                    'icon':'success'
                })
            }else{
                swal({
                    'title':'Oops',
                    'text':res.data.message,
                    'icon':'error'
                })  
            }
        })
        .catch(err=>{
            this.setState({
                ...this.state,
                'isLoading':false
            })
            swal({
                'title':'Oops',
                'text':err.response.data.message,
                'icon':'error'
            })
        })
    }
    render(){
        if(localStorage.getItem('loggedIn')){
            return <Redirect to="/" />
        }
        return(
            <Fragment>
                <div className="container">
                    <div className="row m-row m-row-bg">
                        <div className="page col-lg-4 col-md-4 col-12 offset-lg-4 offset-md-4">
                            <div className="logo">
                                <img src={Logo} alt="epent"/>
                            </div>
                            <div className="card m-card">
                                <form onSubmit={this.daftar}>
                                    <div className="form-group">
                                        <label htmlFor="nama">Nama Lengkap</label>
                                        <input type="nama" name="nama" id="nama" className="form-control" placeholder="Masukkan nama lengkap" required autoFocus onChange={this.valueChange} value={this.state.nama}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Masukkan Email" required onChange={this.valueChange} value={this.state.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="Masukkan Password" required onChange={this.valueChange} value={this.state.password}/>
                                    </div>
                                    <input type="submit" value="DAFTAR" className="btn btn-blue mt-15 btn-submit" disabled={this.state.isLoading}/>
                                </form>
                                <Link className="btn btn-blue-border mt-10" to="/masuk">MASUK</Link>
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

export default Daftar;