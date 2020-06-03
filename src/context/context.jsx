import React, { createContext, Component } from 'react';

const rootContext = createContext();

// provider
const Provider = rootContext.Provider;

const globalProvider = (Children) =>{
    return(
        class parentProvider extends Component{
            state ={
                username:'',
                email: '',
                idUser: '',
                loggedIn: false
            }
            dispatch = (ACTION) =>{
                switch (ACTION.type) {
                    case 'MASUK':
                        this.setState({
                            username:ACTION.username,
                            email: ACTION.email,
                            idUser:ACTION.idUser,
                            loggedIn: true
                        })
                        break;
                    case 'KELUAR':
                        this.setState({
                            username:'',
                            email: '',
                            idUser: '',
                            loggedIn: false
                        })
                        break;
                    default:
                        break;
                }
            }
            render(){
                return(
                    <Provider value={{
                        state : this.state,
                        dispatch: this.dispatch
                    }}
                    >
                        <Children {...this.props} />
                    </Provider>
                )
            }
        }
    )
}

export default globalProvider;

// consumer
const Consumer = rootContext.Consumer;
export const globalConsumer = (Children) =>{
    return(
        class parentConsumer extends Component{
            render(){
                return(
                    <Consumer>
                        {
                            value=>{
                                return(
                                    <Children {...this.props} {...value} />
                                )
                            }
                        }
                    </Consumer>
                )
            }
        }
    )
}