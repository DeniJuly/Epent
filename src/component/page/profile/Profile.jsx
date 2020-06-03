// library
import React, { Component } from 'react';
import Navbar from '../../component/navbar/Navbar';
import { Link } from 'react-router-dom';
import { rootImg } from '../../../services/config';

// image
import MProfile from '../../../asset/icon/edit-profile-blue.svg';
import Mlogout from '../../../asset/icon/logout-blue.svg';

// style
import './Profile.css';
import Authentikasi from '../../../auth/authentikasi';
import API from '../../../services';

class Profile extends Component{
    state={
        username:'',
        email:'',
        fotoProfile:''
    }
    logOut = () =>{
        Authentikasi.logout()
        this.props.history.push('/masuk')
    }
    getProfile = () =>{
        let user = {
            'id': Authentikasi.getId()
        }
        API.PostProfile(user)
        .then(res=>{
            this.setState({
                username:res.data.data.name,
                email:res.data.data.email,
                fotoProfile:`${rootImg}/foto-profile/${res.data.data.foto_profile}`
            })
        })
    }
    componentDidMount(){
        this.getProfile()      
    }
    render(){
        return(
            <div className="page col-12 col-lg-4 col-md-4 offset-lg-4 offset-md-4 pt-5 bg-white">
                <Navbar />
                <div className="foto-profile">
                    <img src={this.state.fotoProfile} alt=""/>
                </div>
                <div className="detail-user">
                    <p className="nama">{this.state.username}</p>
                    <p className="email">{this.state.email}</p>
                </div>
                <div className="menu-profile">
                    <Link to="/">
                        <div className="item">
                            <img src={MProfile} alt=""/>
                            <p>Edit Profile</p>
                        </div>
                    </Link>
                    <button className="item" onClick={this.logOut}>
                        <img src={Mlogout} alt=""/>
                        <p>Keluar</p>
                    </button>
                </div>
            </div>
        )
    }
}
export default Profile;