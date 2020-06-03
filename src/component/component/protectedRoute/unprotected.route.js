import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authentikasi from '../../../auth/authentikasi';

export const UnprotectedRoute = ({component:Children,...rest}) =>{
    return(
        <Route
            {...rest}
            render={props=>{
                let data = Authentikasi.isLogin();
                if(data === false){
                    return <Children {...props} />
                }else{
                    return <Redirect to="/" />
                }
            }}
        />
    )
}