import React, { Component } from 'react';
import API from '../../../services';

class Cari extends Component{
    getEvent = () =>{
        API.SearchEvent(this.props.match.params)
        .then(res=>{
            console.log(res)
        })
    }
    componentDidMount(){
        this.getEvent()
    }
    render(){
        return(
            <h1>Cari</h1>
        )
    }
}

export default Cari;