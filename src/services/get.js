import Axios from "axios";

const Get = (url) =>{
    const promise = new Promise((resolve,reject)=>{
        Axios.get(`${url}`)
        .then((res)=>{
            resolve(res)
        },(err)=>{
            reject(err)
        })
    })
    return promise;
}

export default Get;