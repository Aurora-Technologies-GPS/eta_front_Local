<template>
<div>
  <NavHeader />

<div>


      <h1 class="text-center">Tiempo y distancia estimada de llegada</h1>

  <div style="display: flex; width: 100%;" >

    <div style="padding-left: 40px; width: 200px;">
      <ul class="nav nav-pills flex-column mb-auto" >
      <li  @click="vew_Shutters()" style="cursor: pointer;" class="menuTitles">
        <i   class="bi bi-ui-checks-grid"></i> <span>Home</span> 
      </li>

              <li style="cursor: pointer;" class="menuTitles">
       
          <div data-toggle="collapse" class="mlMenu"  href="#multiCollapseExample1"  aria-expanded="false" aria-controls="multiCollapseExample1" > <i class="bi bi-hourglass-split"></i> Shutters <i class="bi bi-chevron-down"></i></div>
       
          <div class="collapse multi-collapse" id="multiCollapseExample1">
             <div @click="vew_add_trayecto()" style="cursor: pointer;" >Asignar</div>
          </div>

    
      </li>

        <li style="cursor: pointer;" class="menuTitles">
       
          <div data-toggle="collapse" class="mlMenu"  href="#Asignar"  aria-expanded="false" aria-controls="Asignar" > <i class="bi bi-back"></i> Templates <i class="bi bi-chevron-down"></i></div>
       
          <div class="collapse multi-collapse" id="Asignar">
            <!--  <div  style="cursor: pointer;" >Templates</div> -->
             <div @click="vew_add_template()" style="cursor: pointer;" >Asignar</div>
          </div>

    
      </li>


        <li class="menuTitles">
         <!--  :class="{ pestanaActual: !historicoShowing}" -->
        <i class="bi bi-bookmark-dash"  ></i><span class="mlMenu" > Reportes</span>
      </li>

    </ul>
    </div>

    <div style="width: 100%;">

<TemplatesPage v-show="views.template" />
<AddServiceShutters v-show="views.addServiceShutters" />
<ShuttersPage style="padding-right:20px; padding-top:40px" v-show="views.shutters"/>

</div>




  </div>


 </div>


</div>

</template>

<script setup>
  import NavHeader from './NavHeader.vue';
  import { ref } from 'vue';
  
  import TemplatesPage from './TemplatesPage.vue';
  import AddServiceShutters from './AddServiceShutters.vue'
  import ShuttersPage from './ShuttersPage.vue'

  let views=ref({
    template:false,
    addServiceShutters:false,
    shutters:true
  })

  function vew_add_trayecto(){
    views.value.template=false
    views.value.shutters=false
    views.value.addServiceShutters=true
  }

  function vew_add_template(){
    views.value.shutters=false
    views.value.addServiceShutters=false
    views.value.template=true
  }

    function vew_Shutters(){
    views.value.addServiceShutters=false
    views.value.template=false
    views.value.shutters=true
  }


  if (window.$cookies.isKey('authorized')){
    console.log("bienvenido")

  }else if(!window.$cookies.isKey('authorized')){
    setTimeout(()=>{
      window.location.replace("./");
    },2000)


 }
</script>