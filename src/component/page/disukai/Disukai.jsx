// library
import React, { Component } from 'react';
import ItemEvent from '../../component/event/ItemEvent';
import API from '../../../services';
import Navbar from '../../component/navbar/Navbar';
import Authentikasi from '../../../auth/authentikasi';

class Disukai extends Component{
    state = {
        'event' :[]
    }
    componentDidMount(){
        API.GetEventDisukai(Authentikasi.getId())
        .then((res)=>{
            this.setState({
                'event': res.data.data
            })
        })
    }
    render(){
        return(
            <div className="page col-12 col-lg-4 col-md-4 offset-lg-4 offset-md-4 m-container pt-3 bg-white">
                <Navbar />
                {
                    this.state.event.map(event=>{
                        return <ItemEvent 
                            key={event.id_event} 
                            id_event={event.id_event} 
                            id_user={event.id_user}
                            judul={event.judul} 
                            tempat={event.tempat} 
                            poster={event.poster}
                            className="mt-2"/>
                    })
                }
            </div>
        )
    }
}
export default Disukai;