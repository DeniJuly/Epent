import React, { Component } from 'react';

// icon
import Search from '../../../asset/icon/search.svg';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class FormSearch extends Component{
    state ={
        'key':''
    }
    formChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    cari = (e) =>{
        e.preventDefault()
        const path = `/cari/${this.state.key}`;
        return <Redirect to={path} />
    }
    render(){
        return(
            <div className="search">
                <form onSubmit={this.cari} className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text m-basic-addon" id="basic-addon1">
                            <img src={Search} alt=""/>
                        </span>
                    </div>
                    <input type="text" name="key" id="search" className="form-control" placeholder="Cari Event" required onChange={this.formChange} value={this.state.key}/>
                </form>
            </div>
        )
    }
}

export default FormSearch;