<template>
  <v-footer
      color="dark" dark>
      <v-row
        justify="center"
        class="my-4 text-center"
      >
    
        <v-col cols="12">
          <v-btn
            v-for="icon in icons"
            :key="icon"
            text
            dark
          >
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          class="align-center"
          >&copy; 2023 Vdanael</v-col
        >
      </v-row>
    </v-footer>
</template>
<script>
 export default {
  data: () => {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-youtube',
      ],
    };
  },
};
</script>