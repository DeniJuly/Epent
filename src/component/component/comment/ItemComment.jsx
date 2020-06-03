import React from 'react';
import { rootImg } from '../../../services/config';
import './ItemComment.css';

const ItemComment = (props) =>{
    const rootImage = `${rootImg}foto-profile/`;
    return(
        <div className="item-komentar">
            <div className="foto-profile-komentar">
                <img src={`${rootImage}${props.foto}`} alt=""/>
            </div>
            <div className="detail">
                <p className="nama">{props.nama}</p>
                <p>{props.isi}</p>
            </div>
        </div>
    )
}
export default ItemComment;