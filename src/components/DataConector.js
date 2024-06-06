import axios from 'axios';

const api = process.env.VUE_APP_API;

export async function placeList(hash) {
    let data = []
    await axios.get(api+'/v1/place/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function auth(params) {
    let data = []
    await axios.post(api+'/v1/auth/login', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
        return data = false
    });
    return data
}

export async function logout(hash) {
    let data = []
    await axios.get(api+'/v1/auth/logout/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function tracker(hash) {
    let data = []
    await axios.get(api+'/v1/tracker/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function findShuttle(hash) {
    let data = []
    await axios.get(api+'/v1/shuttle/list/' + hash).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function saveShuttle(params) {
    let data = []

    await axios.post(api+'/v1/shuttle/create',params).then(response => {
            console.log("Success ========>", response);
            data=response
        })
        .catch(error => {
            console.log("Error ========>", error);
        }
    )
    return data
}

export async function getSaveShuttle(params) {
    let data = []

/*    console.log(paramst)*/

/*   const params= {
    hash: "d2b4a3a8f6ff0d0ed0919ad7501cda32",
    clientId: 300310,
    arrivalDue: "2024-06-03T22:44:57-04:00",
    userId: 300310,
    startPlaceId: 2117241,
    endPlaceId: 2117261,
    departureDue: "2024-06-03T22:44:57-04:00",
    name: "JEJE"

}*/

const tempDates={
    departureDue:'2024-06-03T22:44:57-04:00',
    arrivalDue :'2024-06-03T22:44:57-04:00'
}
    await axios.get(api+`/v1/shuttle/create/${params.hash}/${params.name}/${params.startPlaceId}/${params.endPlaceId}/${tempDates.departureDue}/${tempDates.arrivalDue}`).then(response => {

        data = response.data
    }).catch(error => {
        console.log(error)
    });
    return data
}