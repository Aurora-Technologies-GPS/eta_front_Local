<template>
<div>
  <NavHeader />

<div class="container">


      <h1 class="text-center">Tiempo y distancia estimada de llegada</h1>

<div style="display: flex; margin: 15px;">
<h3>Nuevo Trayecto</h3>

<router-link to="/add">
    <button style="border-radius: 50%; margin-left: 5px;" type="button" class="btn btn-primary">
        <i class="bi bi-plus-lg"></i>
    </button>

</router-link>
</div>
 </div>

<TrayectosPage /> 
</div>

</template>

<script setup>
  import NavHeader from './NavHeader.vue';
  import TrayectosPage from './TrayectosPage.vue';

  if (window.$cookies.isKey('authorized')){
    console.log("bienvenido")
  }else if(!window.$cookies.isKey('authorized')){
    setTimeout(()=>{
      window.location.replace("./");
    },2000)


 }
</script>