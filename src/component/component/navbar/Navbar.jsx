// import
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// icon
import NLike from '../../../asset/icon/like-grey.svg';
import NLikeBlue from '../../../asset/icon/like-blue.svg';
import NHomeBlue from '../../../asset/icon/home-blue.svg';
import NHome from '../../../asset/icon/home-grey.svg';
import NUser from '../../../asset/icon/user-grey.svg';
import NUserBlue from '../../../asset/icon/user-blue.svg';

const Navbar = () =>{
    const [home,setHome] = useState(false)
    const [disukai,setDisukai] = useState(false)
    const [profile,setProfile] = useState(false)
    const getPath = () =>{
        if(window.location.pathname === '/'){
            setHome(true)
            setDisukai(false)
            setProfile(false)
        }else if(window.location.pathname === '/disukai'){
            setHome(false)
            setDisukai(true)
            setProfile(false)
        }else if(window.location.pathname === '/profile'){
            setHome(false)
            setDisukai(false)
            setProfile(true)
        }
    }
    useEffect(() => {
        getPath()
    })
    return(
        <nav className="navbar fixed-bottom navbar-light bg-light col-12 col-lg-4 col-md-4 offset-lg-4 offset-md-4 m-navbar-buttom">
            <div className="menu">
                <Link to="/">
                    <div className="item">
                        <img src={home ? NHomeBlue : NHome} alt=""/>
                        <p>Beranda</p>
                    </div>
                </Link>
                <Link to="/disukai">
                    <div className="item">
                        <img src={disukai ? NLikeBlue : NLike} alt=""/>
                        <p>Event Disukai</p>
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="item">
                        <img src={profile ? NUserBlue: NUser} alt=""/>
                        <p>Profile</p>
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;