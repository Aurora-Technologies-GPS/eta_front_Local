<template>
  <div class="container targetasContainer">

    <div class="card" v-for=" (dato, index) in dataOut" :key="index">
      <div>
      <span><b>id: </b></span>
      <span>{{ dato.id}}</span>
      </div>

      <div>
      <span><b>clientId: </b></span>
      <span>{{ dato.clientId}}</span>
      </div>

      <div>
      <span><b>Name: </b></span>
      <span>{{ dato.name}}</span>
      </div>

      <div>
      <span><b>startPlaceId: </b></span>
      <span>{{ get_places_Label(dato.startPlaceId)}}</span>
      </div>

      <div>
      <span><b>endPlaceId: </b></span>
      <span>{{ get_places_Label(dato.endPlaceId)}}</span>
      </div>

      <div>
      <span><b>departureDue: </b></span>
      <span>{{ getTimeAndDate(dato.departureDue)}}</span>
      </div>

      <div>
      <span><b>arrivalDue: </b></span>
      <span>{{ getTimeAndDate(dato.arrivalDue)}}</span>
      </div>

      



      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { findShuttle, placeList } from './DataConector.js'; 

const places_List =ref( new Map())

let dataOut= ref([])


if (window.$cookies.isKey('authorized')){

findShuttle(window.$cookies.get('authorized').user.hash).then(result=>{
  
  console.log(result)
  dataOut.value=result

   placeList(window.$cookies.get('authorized').user.hash).then(places=>{
       //   console.log(places)

    if (places) {
     try{

        places.list.forEach(elem_places=>{
        places_List.value.set(elem_places.id,elem_places);
        })

      }catch(error){
        console.log(error)
      }

    }else{
      console.log("ocurrio Un error al Buscar Places")
    }

  })

}) 
 
}else{
  console.log("No authorized")
}

function get_places_Label(place_id){
 try{
    return places_List.value.get(place_id).name
  }catch{
    return "N/A"
  }

  //return place_id
}

function getTimeAndDate(isoDate){

 try{
    let dateOut=new Date(isoDate)

    return dateOut.toLocaleString()

  }catch{
    return "N/A"
  } 

   //return isoDate
}




</script>

<style scoped>

.targetasContainer{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.card {
  padding: 20px;
  margin-top: 10px;
  background-color: #f8f9fa;
  cursor: pointer;
}

</style>
