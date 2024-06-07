<template>
<div>
  <NavHeader />

<div>


      <h1 class="text-center">Tiempo y distancia estimada de llegada</h1>

  <div style="display: flex; width: 100%;" >

    <div style="padding-left: 40px; width: 200px;">
      <ul class="nav nav-pills flex-column mb-auto" >
      <li  style="cursor: pointer;" class="menuTitles">
        <i   class="bi bi-ui-checks-grid"></i> <span>Home</span> 
      </li>
      <li  class="menuTitles">
          <i  class="bi bi-bell"></i><span class="mlMenu" > Plantillas</span>
      </li>

      <li class="menuTitles">
         <!--  :class="{ pestanaActual: !historicoShowing}" -->
        <i class="bi bi-bookmark-dash"  ></i><span class="mlMenu" > Reportes</span>
      </li>


        <li style="cursor: pointer;" class="menuTitles">
       
          <div data-toggle="collapse" class="mlMenu"  href="#multiCollapseExample1"  aria-expanded="false" aria-controls="multiCollapseExample1" > <i  class="bi bi-gear"></i> Shutters <i class="bi bi-chevron-down"></i></div>
       
          <div class="collapse multi-collapse" id="multiCollapseExample1">
             <div  style="cursor: pointer;" >Shutters</div>
             <div  style="cursor: pointer;" >Asignar Shutters</div>
          </div>

    
      </li>
    </ul>
    </div>

    <div style="width: 100%;">

      <div style="display: flex;">
<h3>Nuevo Trayecto</h3>

<router-link to="/add">
    <button style="border-radius: 50%; margin-left: 5px;" type="button" class="btn btn-primary">
        <i class="bi bi-plus-lg"></i>
    </button>

</router-link>


</div>

<TrayectosPage />
 

</div>




  </div>


 </div>


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