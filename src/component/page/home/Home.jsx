// library
import React, { Component, Fragment } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Redirect } from 'react-router-dom';
import API from '../../../services';
import Navbar from '../../component/navbar/Navbar';
import { globalConsumer } from '../../../context/context';
import Authentikasi from '../../../auth/authentikasi';
import ContentLoader from 'react-content-loader';

// component
import ItemEvent from '../../component/event/ItemEvent';
import ItemKategori from '../../component/kategori/ItemKategori';
import FormSearch from '../../component/formSearch/formSearch';

// style
import './Home.css';
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Home extends Component{
    state = {
        'eventTerbaru':[],
        'eventTerpopuler':[],
        'kategori':[],
        'showKategori':false,
        'showEventTerbaru': false,
        'showEventTerpopuler': false,
        'show':0
    }
    getEventTerbaru = () =>{
        API.GetEventTerbaru()
        .then((res)=>{
            this.setState({
                ...this.state,
                'eventTerbaru':res.data.data
            },()=>{
                this.setState({
                    ...this.state,
                    'showEventTerbaru':true
                })
            })
        })
    }
    getEventTerpopuler = () =>{
        API.GetEventTerpopuler()
        .then(res=>{
            this.setState({
                ...this.state,
                'eventTerpopuler':res.data.data
            },()=>{
                this.setState({
                    ...this.state,
                    'showEventTerpopuler':true
                })
            })
        })
    }
    getKategori = () =>{
        API.GetKategori()
        .then(res=>{
            this.setState({
                ...this.state,
                'kategori':res.data.data
            },()=>{
                this.setState({
                    ...this.state,
                    'showKategori':true
                })
            })
        })
    }
    componentDidMount(){
        this.getKategori()
        this.getEventTerbaru()
        this.getEventTerpopuler()
    }
    render(){
        const isLogin = Authentikasi.isLogin()
        if(isLogin === false){
            return <Redirect to="/masuk" />
        }
        return(
            <Fragment>
                <div className="page col-12 col-lg-4 col-md-4 offset-lg-4 offset-md-4 p-0 bg-white">
                    <Navbar />
                    <div className="container m-container p-0">
                        {/* search */}
                        <FormSearch />
                        {/* banner */}
                        <div className="banner">
                            <p>TEMUKAN EVENT-EVENT TERBARU</p>
                        </div>
                        {/* kategori */}
                        <div className="kategori section p-0">
                            <p className="title-section">Kategori Event</p>
                            {
                                this.state.showKategori ?
                                    <OwlCarousel 
                                        items={4}  
                                        nav={false}
                                        dots={false}
                                        className="owl-theme">

                                        {
                                            this.state.kategori.map(kategori=>{
                                                return <ItemKategori key={kategori.id} image={kategori.foto_kategori} title={kategori.kategori} />
                                            })
                                        }
                                        
                                    </OwlCarousel>
                                :   
                                    <ContentLoader 
                                        speed={3}
                                        width={350}
                                        height={90}
                                        viewBox="0 0 350 90"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect x="0" y="0" rx="3" ry="3" width="20%" height="100%" />
                                        <rect x="90" y="0" rx="3" ry="3" width="20%" height="100%" />
                                        <rect x="180" y="0" rx="3" ry="3" width="20%" height="100%" />
                                        <rect x="270" y="0" rx="3" ry="3" width="20%" height="100%" />
                                    </ContentLoader>
                            }
                        </div>
                        {/* event terbaru */}
                        <div className="terbaru section p-0">
                            <p className="title-section">Event Terbaru</p>
                            {
                                this.state.showEventTerbaru ?
                                    <OwlCarousel
                                        items={1}
                                        nav={false}
                                        dots={false}
                                        stagePadding={20}
                                        margin={10}
                                        className="owl-theme"
                                    >
                                        {
                                            this.state.eventTerbaru.map(event =>{
                                                return <ItemEvent 
                                                            key={event.id} 
                                                            id_event={event.id} 
                                                            id_user={Authentikasi.getId()}
                                                            judul={event.judul} 
                                                            tempat={event.tempat} 
                                                            poster={event.poster}
                                                        />
                                            })
                                        }
                                    </OwlCarousel>
                                :
                                    <ContentLoader
                                        speed={3}
                                        width={'100%'}
                                        height={197}
                                        viewBox="0 0 400 197"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#DDDDDD"
                                    >
                                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="197" />
                                    </ContentLoader>
                            }
                        </div>
                        {/* event terpopuler */}
                        <div className="terpopuler section p-0">
                            <p className="title-section">Event Terpopuler</p>
                            {
                                this.state.showEventTerpopuler ?
                                    <OwlCarousel
                                        items={1}
                                        nav={false}
                                        dots={false}
                                        stagePadding={20}
                                        margin={10}
                                    >
                                        {
                                            this.state.eventTerpopuler.map(event =>{
                                                return <ItemEvent
                                                            key={event.id_event}
                                                            id_event={event.id_event}
                                                            id_user={Authentikasi.getId()}
                                                            judul={event.judul}
                                                            tempat={event.tempat}
                                                            poster={event.poster}
                                                            />
                                            })
                                        }
                                    </OwlCarousel>
                                :
                                    <ContentLoader
                                        speed={3}
                                        width={'100%'}
                                        height={197}
                                        viewBox="0 0 400 197"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#DDDDDD"
                                    >
                                        <rect x="0" y="0" width="100%" height="100%" />
                                    </ContentLoader>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default globalConsumer(Home);