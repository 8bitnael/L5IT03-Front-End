<template>
  <v-app fixed>
    <SideBar :isAuthenticated="isAuthenticated" :logout="logout"/> 
    <v-main>
      <router-view />
    </v-main>
    <Footer/>  
  </v-app>
</template>

<script setup>
import firebase from "firebase";
import SideBar from "./components/SideBar.vue";
import Footer from "./components/Footer.vue";

</script>

<script>
export default {
  components: {
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    // Controlla lo stato di autenticazione all'avvio dell'applicazione
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuthenticated = user !== null;
      if(this.isAuthenticated){
        this.$router.push("/customize");
      }
    });
  },
  mounted() {},
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem("uuid");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
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
