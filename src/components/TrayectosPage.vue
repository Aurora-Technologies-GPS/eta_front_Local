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
      <span>{{ dato.startPlaceId}}</span>
      </div>

      <div>
      <span><b>endPlaceId: </b></span>
      <span>{{ dato.endPlaceId}}</span>
      </div>



      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { findShuttle } from './DataConector.js'; 


let dataOut= ref([])


if (window.$cookies.isKey('authorized')){

findShuttle(window.$cookies.get('authorized').user.hash).then(result=>{
  
  console.log(result)
  dataOut.value=result

}) 
 
}else{
  console.log("No authorized")
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
