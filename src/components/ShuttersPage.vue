<template>
  <div class="contenedorTabla">

      <div  v-for=" (dato, index) in serviceShutters_Out" :key="index" >


        <div class="card">
         <!--  :class="{ important: dato.important }" -->
          <div class="card-header" >

        <button style="float: right; border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Ocultar Trayecto</a>
        </div>

            <div class="header_status">
              <div><strong>{{ "Carro 1 "}}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{"dato.actualTime"}}
                  </div>
              <div> {{ "En Trasito" }}
                <i class="ubication bi bi-geo-alt-fill"></i>
              </div>

            </div>






          </div>
          <div class="card-body">
            <div class="row" style="height: auto">

              <div class=" col-lg-8 col-xl-9 col-md-7 col-sm-8 col-8 "
                style=" position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ "dato.start_label "}}

                </div>
                <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">
      
                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">

                    {{"activo: "+" Hoy" }}
                  </div>

                  <div class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="25"></div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ "Destino Final" }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{66}}</span>{{ Min }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
                <div class="text-center" style="border-right:dashed #bcbab9; padding-right: 20px;">
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ 25 + " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{ "hoy"}}</span>
                </div>



              </div>

            </div>

          </div>

        </div>
        <br>
      </div>


 



  </div>
</template>

<script setup>

  import { ref } from 'vue';

  import { find_Service_Shuttle,    } from './DataConector.js' 

  let serviceShutters_Out= ref([])


if (window.$cookies.isKey('authorized')){

  find_Service_Shuttle(window.$cookies.get('authorized').user.hash).then(listShutter=>{
     serviceShutters_Out.value=listShutter
    console.log(listShutter)

})

}else{
  console.log("Logeate Please")
}



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Truculenta:opsz,wght@12..72,100..900&display=swap');

 .contenedorTabla {
height: 85vh;
margin-left: auto;
margin-right: auto;
padding-top:0px;
width: 95%;
overflow: auto
}


.btn-circle.btn-xl {
  width: auto;
  height: 100%;
  border-radius: 50%;
  font-size: 12px;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #606060;
  color: white;
}

.tituloBola {
  font-size: 40px;
  font-family: "Truculenta", sans-serif;
  font-weight: bold;

}
.important{
  background-color:pink;
}

.etaBT {
  position: absolute;
  right: 8px;
  bottom: -5px;
  width: 31%;
  max-width: 40px
}

.login {
  text-align: center;


}

.ubication:hover {
  cursor: pointer;
}

@media (max-width: 1230px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 80%;
    margin-top: 10%;
    margin-bottom: 10%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 38px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

}

@media (max-width: 730px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 70%;
    margin-top: 20%;
    margin-bottom: 20%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 30px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

}

.card {
  box-shadow: rgba(0, 0, 0, 0.49) 5px 0px 9px 0px;
}


.estado {
  position: absolute;
  top: 0px;
  left: 40%;
}

.header_status {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.header_status strong {
  float: left;
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
