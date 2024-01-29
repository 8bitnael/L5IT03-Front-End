<template>
  <v-app fixed>
    <SideBar/> 
    <v-main>
      <router-view />
    </v-main>
    <Footer/>  
  </v-app>
</template>

<script lang="ts" setup>

import SideBar from "./components/SideBar.vue";
//import Footer from "./components/Footer.vue";
import '@/assets/css/font8bit.css';
 
</script>

<style>
  /* Personalizza lo stile della scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #666565;
    border: 2px solid #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #2eca20;
    border-radius: 8px;
    border: 2px solid #f5f5f5;
  }

  .v-application--wrap {
    min-height: 100vh;
    height: auto;
  }
</style>
