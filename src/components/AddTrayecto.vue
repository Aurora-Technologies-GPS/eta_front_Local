
<template>
<div>

<div v-show="saved.succed" class="popContainer">
  <h1 class="text-center" style="margin-top: 20%; color: green;">{{saved.message}}</h1>
</div>

  <NavHeader />
    <div class="container mt-5">
   <form @submit.prevent="enviar" >

  <div class="form-row">
    <div class="form-group col-md-6">
      <strong><label for="inputName">Nombre</label></strong>
      <input v-model="adding.name" type="text" class="form-control" id="inputName" required>

    </div>
    <div class="form-group col-md-6">
      <strong><label for="inputDestino">Description</label></strong>
        <input type="text" class="form-control" id="inputName" >
    </div>
  </div>
        <div class="form-row">
    <div class="form-group col-md-3">
      <strong><label for="inputDestino">ORIGEN</label></strong>
      <select v-model="adding.startPlaceId" id="inputDestino" class="form-control" required>

      <option :value="dato.id" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato.name}}
      </option>

      </select>
    </div>
        <div class="form-group col-md-3">
      <strong><label for="inputDestino">DESTINO</label></strong>
      <select v-model="adding.endPlaceId" id="inputDestino" class="form-control" required>

      <option :value="dato.id" v-for=" (dato, index) in datos.poi" :key="index">
        {{dato.name}}
      </option>

      </select>
    </div>
    <div class="form-group col-md-3">
      <strong><label for="departureDue">Tiempo de salida</label></strong>
 
        <input v-model="adding.departureDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
  
    </div>
    <div class="form-group col-md-3">
      <strong><label for="arrivalDue">Tiempo de LLegada</label></strong>

        <input  v-model="adding.arrivalDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
  
    </div>
  </div>

  <div class="text-center mb-5">
  <button type="submit" class="btn btn-primary">Guardar</button>
  </div>

</form>
    </div>
</div>

</template>
<script setup>

  import { ref } from 'vue';
  import NavHeader from './NavHeader.vue';
  import { placeList, saveShuttle ,   } from './DataConector.js' // saveShuttle getSaveShuttle


let datos=ref({ 
    poi:[{label:"fulanito"},{label:"noelito"}]
})

let saved=ref({
  message:"No Se guardaron los Datos",
  succed:false
})

let data=ref({
  hash:null,
  clientId:0,
  userId:0
})

if (window.$cookies.isKey('authorized')){

  data.value.hash=window.$cookies.get('authorized').user.hash

  data.value.clientId= window.$cookies.get('authorized').user.clientId

  data.value.userId= window.$cookies.get('authorized').user.id

  //console.log(window.$cookies.get('authorized').user.hash)


 placeList(window.$cookies.get('authorized').user.hash).then(places=>{

       //   console.log(places)

    if (places) {

      datos.value.poi=[]

     try{

        places.list.forEach(elem_places=>{

          datos.value.poi.push(elem_places)
        })

      }catch(error){
        console.log(error)
      }

    }else{
      console.log("ocurrio Un error al Buscar Places")
    }

  })

}else{
  console.log("No Esta Logueado")
}

let adding=ref({

  hash: data.value.hash,
  name:null,
  clientId:data.value.clientId,
  userId:data.value.clientId,
  departureDue:"2024-06-12T19:30",
  arrivalDue:"2024-06-12T19:30",
  startPlaceId:null,
  endPlaceId:null

})


function enviar(){

  saveShuttle(adding.value).then(result=>{
    console.log(result)

        if(result){

    saved.value.succed=result
    saved.value.message="Guardado Correctamente"

    setTimeout(()=>{
     window.location.replace("./");
    },2000)

    }else{
      saved.value.succed=true
      saved.value.message="No se Guardaron los Datos"

    setTimeout(()=>{
      saved.value.succed=false
    },3000)

    }
  })

}


</script>

<style scoped>
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