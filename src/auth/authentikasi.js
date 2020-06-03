const login = (data) =>{
    let user = {
        leggedIn: true,
        email: data.email,
        userId: data.id,
        username: data.username
    }
    let dataUser = JSON.stringify(user)
    sessionStorage.setItem('userData',dataUser)
}
const logout = () =>{
    sessionStorage.clear()
}
const isLogin = () =>{
    let data = sessionStorage.getItem('userData')
    if(data === null){
        return false
    }else{
        return true
    }
}
const getId = () =>{
    let data = sessionStorage.getItem('userData')
    let user = JSON.parse(data)
    return user.userId
}
const getEmail = () =>{
    let data = sessionStorage.getItem('userData')
    let user = JSON.parse(data)
    return user.email
}
const getUsername = () =>{
    let data = sessionStorage.getItem('userData')
    let user = JSON.parse(data)
    return user.username
}
const Authentikasi = {
    login,
    logout,
    isLogin,
    getId,
    getEmail,getUsername
}
export default Authentikasi;