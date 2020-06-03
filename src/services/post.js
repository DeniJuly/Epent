import Axios from 'axios';

const Post = (url,data) =>{
    const promise = new Promise((resolve,reject)=>{
        Axios.post(url,data)
        .then((res)=>{
            resolve(res)
        },(err)=>{
            reject(err)
        })
    })
    return promise;
}

export default Post;