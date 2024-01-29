<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList>
      <VListItem prepend-avatar="/8bitnael.png" title="vdanael" subtitle="vdanael@icloud.com"></VListItem>
    </VList>
    <v-divider></v-divider>

    <v-card class="mx-auto" max-width="400">
      <v-list nav>
        <v-list-item-group v-model="model" active-class="border" color="primary"> <!-- colore sidebar-->
          <v-list-item v-for="item in items" :key="item.value" :prepend-icon="item.icon" :title="item.title"
            :value="item.value" link @click="$router.push({ path: item.route })" />
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-divider></v-divider>

    <v-list>
      <v-list-item title="FACEBOOK" prepend-icon="mdi-facebook" href="https://www.facebook.com/Vdanael" target="_blank">
      </v-list-item>
      <v-list-item title="LINKEDIN" prepend-icon="mdi-linkedin"
        href="https://www.linkedin.com/in/daniele-castrovinci-a0446014/" target="_blank">
      </v-list-item>
       <v-list-item title="GITHUB" prepend-icon="mdi-github"
        href="https://github.com/8bitnael" target="_blank">
      </v-list-item>
    </v-list>
    <v-divider></v-divider>



  </VNavigationDrawer>
</template>

<script>
import sidebar from "../data/sidebar.json";
 
export default {
  components: {
    
  },
  data() {
    return {
      model: 1,
      name: "MenuDrawer",
      items: sidebar.items,
    }
  }
}
</script>
 

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>