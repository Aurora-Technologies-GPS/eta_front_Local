<template>
  <div class="targetasContainer">

    <h2 v-if="dataOut.length<1">Listado Vacio</h2>

       <div class="card" v-for=" (dato, index) in dataOut" :key="index">

      <div class="text-right">

        <button  style="border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="text-center dropdown-menu text-right" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a @click="deleteTemplate(dato.id)" class="dropdown-item" href="#">Ocultar Trayecto</a>
        </div>
        
      </div>



      <div class="d-none">
      <span><b>id: </b></span>
      <span>{{ dato.id}}</span>
      </div>

      <div class="d-none">
      <span><b>clientId: </b></span>
      <span>{{ dato.clientId}}</span>
      </div>

      <div>
      <span><b>Name: </b></span>
      <span>{{ dato.name}}</span>
      </div>

      <div>
      <span><b>Origen: </b></span>
      <span>{{ get_places_Label(dato.startPlaceId)}}</span>
      </div>

      <div>
      <span><b>Destino: </b></span>
      <span>{{ get_places_Label(dato.endPlaceId)}}</span>
      </div>

      <div>
      <span><b>Salida: </b></span>
      <span>{{ getTimeAndDate(dato.departureDue)}}</span>
      </div>

      <div>
      <span><b>Llegada: </b></span>
      <span>{{ getTimeAndDate(dato.arrivalDue)}}</span>
      </div>

      



      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { findShuttle, placeList, deleteShuttle } from './DataConector.js'; 

const places_List =ref( new Map())

let dataOut= ref([])

function updater(){
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
}

updater();


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


function deleteTemplate(id){

  if (window.$cookies.isKey('authorized')){
    deleteShuttle(window.$cookies.get('authorized').user.hash, id).then(response_del=>{
      console.log(response_del)
      updater()
    })
  }else{
    console.log("No esta logueado")
  }
}



</script>

<style scoped>

.targetasContainer{
 display: flex;
 flex-wrap: wrap;
  flex-direction: row;
/* justify-content: space-around;*/
}

.card {
 padding: 10px;
 margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #f8f9fa;
  cursor: pointer;
}

</style>
