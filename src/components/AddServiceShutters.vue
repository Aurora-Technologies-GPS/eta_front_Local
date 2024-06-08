<template>

<div>

<div  v-show="addingShowing" class="popContainer">



  <div style="position: relative; text-align: left;">
    <strong><i @click="hidePop()" style="position: absolute; top: 10px; right: 15px;"
            class="bi bi-x-lg"></i></strong>
  </div>

  <div style="position: relative; margin-top: 20px; width: 100%">
    <h2 class="text-center">Selecciona Un Dispositivo</h2>

    <form class="container" @submit.prevent="add_trayecto" >

    <div class="form-row">
        <div class="form-group col-md-6">
      <strong>       
      <h5>{{ params.name }}</h5>
      </strong>
      <div class="row" style="width: 100%;">
        <div class="col-6">
          <div>{{get_places_Label(params.origen) }}</div>
        </div>
        <div class="col-6">
          <div>{{get_places_Label(params.destino) }}</div>
        </div>
      </div>
  
    </div>
    <div class="form-group col-md-6">

      <strong><label for="inputDestino">Dispositivo (Tracker)</label></strong>
      <select v-model="params.tracker_id" id="inputDestino" class="form-control" required>
        <option value="2935572">Ficha 1</option>

<!--       <option :value="dato.id" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato.name}}
      </option> -->

      </select>
    </div>
  </div>
    <div class="text-center mb-5">
  <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>

  </div>

</div>

<h3> Asignar Nuevo Service Shutters</h3>
<h5> Selecciona uno de los template </h5>

  <div class="targetasContainer">

    <h2 v-if="dataOut.length<1">Listado Vacio</h2>

       <div class="card" v-for=" (dato, index) in dataOut" :key="index">
        <div @click="showPop( dato)">

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
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { findShuttle, placeList, saveShuttleService } from './DataConector.js'; 

let addingShowing = ref(false)

let params=ref({
      hash: window.$cookies.get('authorized').user.hash,
      name:null,
      origen:null,
      destino:null,
      shuttle_id: 31,
      tracker_id:2935572
    })

function showPop( datos ) {
  params.value.shuttle_id = datos.id
  params.value.name = datos.name
  params.value.origen = datos.startPlaceId
  params.value.destino = datos.endPlaceId 
  addingShowing.value= true

}

function hidePop() {
  addingShowing.value = false
}


  function add_trayecto(){
    if (window.$cookies.isKey('authorized')){
      console.log("bienvenido")

    saveShuttleService(params.value).then(res_createTrayectos=>{
      
      console.log(res_createTrayectos)
    })
  }else{
    console.log("please log in")

  }
}

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

.popContainer {
  /* background-color: #1e1f24; */
  background-color: white;
  position: absolute;
  /* color: white; */
  color: black;
  width: 50%;
  min-height: 50%;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}

</style>
