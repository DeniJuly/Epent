// library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../services';
import { rootImg } from '../../../services/config';

// component
import ItemComment from '../../component/comment/ItemComment';

// icon
import Back from '../../../asset/icon/back.svg';
import Like from '../../../asset/icon/like-grey.svg';
import LikeBlue from '../../../asset/icon/like-blue.svg';
import DateBlue from '../../../asset/icon/date-blue.svg';
import ClockBlue from '../../../asset/icon/clock-blue.svg';
import LocationBlue from '../../../asset/icon/location-blue.svg';

// style
import './DetailEvent.css';
import Authentikasi from '../../../auth/authentikasi';

class DetailEvent extends Component{
    state = {
        'rootPoster': `${rootImg}poster-event/`,
        'detailEvent': [],
        'comment':[],
        'userComment':{
            'id_event': '',
            'id_user' : '',
            'isi' : ''
        },
        'showBackground':false,
        'uLike':0
    };
    getDetailEvent = () =>{
        API.GetEventById(this.props.match.params.id)
        .then(res=>{
            this.setState({
                ...this.state,
                'detailEvent': res.data.data
            },()=>{
                this.getComment()
                this.isLike()
                this.setState({
                    ...this.state,
                    'showBackground':true
                })
            })
        })
    }
    isLike = () =>{
        API.GetisLike(this.state.detailEvent.id,Authentikasi.getId())
        .then(res=>{
            this.setState({
                ...this.state,
                'uLike': res.data.data.length
            })
        })
    }
    getComment = () =>{
        API.GetComment(this.state.detailEvent.id)
        .then(res=>{
            this.setState({
                ...this.state,
                'comment':res.data.data
            })
        })
    }
    commentChange = (e) =>{
        this.setState({
            ...this.state,
            'userComment': {
                'id_event': this.state.detailEvent.id,
                'id_user' : Authentikasi.getId(),
                'isi' : e.target.value
            }
        })
    }
    postComment = (e) =>{
        e.preventDefault()
        API.PostComment(this.state.userComment)
        .then(()=>{
            this.getComment()
            this.setState({
                ...this.state,
                'userComment': {
                    'id_event': this.state.detailEvent.id,
                    'id_user' : Authentikasi.getId(),
                    'isi' : ''
                }
            })
        })
    }
    componentDidMount(){
        this.getDetailEvent()
    }
    render(){
        return(
            <div className="page col-12 col-lg-4 col-md-4 offet-lg-4 offset-md-4 p-0">
                <div className="header-detail-event">
                    <Link to="/">
                        <img src={Back} alt=""/>
                    </Link>
                </div>
                <div className="detail-event-poster" style={this.state.showBackground ? {'background': `url(${this.state.rootPoster}${this.state.detailEvent.poster})`} : null}>
                </div>
                <div className="card-detail-event card">
                    <div className="header">
                        <p>{this.state.detailEvent.judul}</p>
                        <div className="like">
                            <button className="btn btn-like">
                                <img src={this.state.uLike ? LikeBlue : Like} alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="detail-event">
                        <div className="item">
                            <img src={DateBlue} alt=""/>
                            <p>{this.state.detailEvent.tgl}</p>
                        </div>
                        <div className="item">
                            <img src={ClockBlue} alt=""/>
                            <p>{this.state.detailEvent.mulai_event} - {this.state.detailEvent.akhir_event}</p>
                        </div>
                        <div className="item">
                            <img src={LocationBlue} alt=""/>
                            <p>{this.state.detailEvent.tempat}</p>
                        </div>
                        <div className="section">
                            <p className="header">About</p>
                            <p className="deskripsi-event">{this.state.detailEvent.deskripsi_event}</p>
                        </div>
                        <div className="section">
                            <div className="header">Komentar</div>
                            <div className="comment-form">
                                <form onSubmit={this.postComment}>
                                    <textarea name="komentar" className="form-control" cols="30" rows="5" placeholder="komentar mu" onChange={this.commentChange} value={this.state.userComment.isi} required></textarea>
                                    <input type="submit" value="Kirim" className="btn-send-comment"/>
                                </form>
                            </div>
                            <div className="list-komentar">
                                {
                                    this.state.comment.length?
                                        this.state.comment.map(komentar=>{
                                            return <ItemComment key={komentar.id} foto={komentar.foto_profile} nama={komentar.name} isi={komentar.isi} />
                                        })
                                    : <p className="text-center">No Comments</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailEvent;