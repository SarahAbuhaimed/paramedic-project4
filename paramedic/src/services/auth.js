
export const setToken = (token) =>{
    //save token to localstorage
 localStorage.setItem('apiKey', token)
 localStorage.setItem('auth', true)
 
}

export const getToken = () =>{
 return localStorage.getItem('apiKey')
}

export const getAuth = ()=>{
    return localStorage.getItem('auth')
}

export const logout = () => {
 localStorage.removeItem('apiKey')
 localStorage.removeItem('auth')
}