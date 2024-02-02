<template>
    <v-container class="fill-height">
      <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            A.Attractive web interface where each department can customize their theme accordingly (2.1)<br>
          </v-card-text>
      </v-card>

      <v-responsive class="d-flex align-center text-center fill-height">
        <div class="text-body-2 font-weight-light mb-n1">Department</div>
        <h1 class="text-h2 font-weight-bold">Theme customization (2.1)</h1>
        <div class="py-5" />
        <v-row class="d-flex align-center justify-center">
          <v-col cols="auto"> <v-btn color="primary"> Primary </v-btn> </v-col>
          <v-col cols="auto">
            <v-btn color="secondary"> Secondary </v-btn>
          </v-col>
          <v-col cols="auto"> <v-btn color="error"> Error </v-btn> </v-col>
        </v-row>
        <div class="py-5" />
        <v-row class="d-flex align-center justify-center">
          <v-col cols="4">
            <v-select
              label="Select Theme"
              v-model="selectedTheme"
              :items="myThemes"
              @update:modelValue="setTheme()"
            ></v-select>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useTheme } from "vuetify";
  
  const theme = useTheme();
  const myThemes = ["light", "dark", "customLightTheme", "customDarkTheme"];
  const selectedTheme = ref(myThemes[0]);
  
  const setTheme = () => {
    theme.global.name.value = selectedTheme.value;
    console.log(selectedTheme.value);
  };
  </script>