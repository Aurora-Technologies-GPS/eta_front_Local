<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
    <img src="../assets/auroraLogob.png" style="width: 150px;" alt="Logo">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <form class="d-none form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
    <div style="padding-right: 5px"><strong>{{email}}</strong></div>

    <form @submit.prevent="salir" class="form-inline my-2 my-lg-0" style="padding-right: 5px;">
        <button type="submit" class="btn btn-primary" data-mdb-ripple-init>logOUT</button>
    </form>

  </div>
</nav>
</template>
<script setup>

import { ref } from 'vue'

import { logout } from './DataConector.js' //

  let email=ref(' ')

if (window.$cookies.isKey('authorized')){

  email.value= window.$cookies.get('authorized').user.username

 
}else{
   window.location.replace("./");
}

function salir(){

  logout(window.$cookies.get('authorized').user.hash).then(res_logout=>{

    if (res_logout) {
      console.log(res_logout)  
      window.$cookies.remove('authorized') 
      window.location.replace("./");

    }else{
      console.log("No se Pudo hacer Logout")
    }
  })
}



  
</script>