// library
import React, { Component } from 'react';
import API from '../../../services';
import { rootImg } from '../../../services/config';

// icon
import Like from '../../../asset/icon/like-grey.svg';
import LikeBlue from '../../../asset/icon/like-blue.svg';
import { Link } from 'react-router-dom';
import Authentikasi from '../../../auth/authentikasi';

class ItemEvent extends Component{

    state={
        rootPoster : `${rootImg}poster-event/`,
        like : 0,
        uLike : 0,
        'changeLike':{
            'id_event':this.props.id_event,
            'id_user':Authentikasi.getId()
        }
    }

    getLike = () =>{
        API.GetCountLike(this.props.id_event)
        .then(res=>{
            this.setState({
                ...this.state,
                'like':res.data.data
            },()=>{
                if(res.data.data.length > 0){
                    const userLike = this.state.like;
                    userLike.filter(like=>{
                        if(Authentikasi.getId() === like.id_user){
                            console.log('add like')
                            this.setState({
                                ...this.state,
                                'uLike':1
                            })
                        }else{
                            this.setState({
                                ...this.state,
                                'uLike':0
                            })
                        }
                        return null
                    })
                }else{
                    this.setState({
                        ...this.state,
                        'uLike':0
                    })
                }
            })
        })
    }
    deleteLike = () =>{
        API.DeleteLike(this.state.changeLike)
        .then(()=>{
            this.getLike()
        })
    }
    addLike = () =>{
        API.AddLike(this.state.changeLike)
        .then(()=>{
            this.getLike()
        })
    }
    componentDidMount(){
        this.getLike()
    }
    render(){
        return(
            <div className="item event-item mt-2">
                <div className="poster-event">
                    <img src={`${this.state.rootPoster}${this.props.poster}`} alt=""/>
                </div>
                <div className="info-event">
                    <div className="detail-event">
                        <div className="tgl">
                            <p>12 MAR</p>
                        </div>
                        <Link to={`/detail-event/${this.props.id_event}`}>
                            <div className="info">
                                <p className="title">{this.props.judul}</p>
                                <p>{this.props.tempat}</p>
                            </div>
                        </Link>
                    </div>
                    <div className="like">
                        {
                            this.state.uLike ?
                                <button className="btn-like-item-event" onClick={this.deleteLike}>
                                    <img src={ LikeBlue } alt=""/>
                                </button>
                            :
                                <button className="btn-like-item-event" onClick={this.addLike}>
                                    <img src={ Like } alt=""/>
                                </button>
                        }
                        <p>{this.state.like.length}</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default ItemEvent;