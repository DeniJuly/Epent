import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentikasi from '../../../auth/authentikasi';

export const ProtectedRoute = ({component: Children, ...rest}) => {
    return(
        <Route 
            {...rest} 
            render={props=>{
                const login = Authentikasi.isLogin();
                if(login){
                    return <Children {...props} />
                }else{
                    return <Redirect to="/masuk" />
                }
            }} 
        />
    )
}