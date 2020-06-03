import React from 'react';
import './kategori.css';
import { rootImg } from '../../../services/config';

const ItemKategori = (props) =>{
    const rootImage = `${rootImg}kategori/`;
    return(
        <div className="item">
            <img src={`${rootImage}${props.image}`} alt=""/>
            <p>{props.title}</p>
        </div>
    )
}

export default ItemKategori;