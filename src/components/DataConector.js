import axios from 'axios';

const api = process.env.VUE_APP_API;


export async function placeList(hash) {
    let data= []
    await axios.get(api+'/v1/place/list/'+hash).then(response=>{
    data=response.data
      
   }).catch(error => {
      console.log(error)

   });

    return data
}

export async function auth(params) {
    let data= []

    await axios.post(api+'/v1/auth/login',params).then(response=>{
    data=response.data
      
   }).catch(error => {
      
      console.log(error)
      return data=false

   });

    return data
}



export async function logout(hash) {
    let data= []
    await axios.get(api+'/v1/auth/logout/'+hash).then(response=>{
    data=response.data
      
   }).catch(error => {
      console.log(error)

   });

    return data
}

export async function saveShuttle(params) {
    let data= []

    await axios.post(api+'/v1/saveShuttle',params).then(response=>{
    data=response.data
      
   }).catch(error => {
      
      console.log(error)
      return data=false

   });

    return data
}

