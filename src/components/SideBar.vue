<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList>
      <VListItem prepend-avatar="/8bitnael.png" title="L5IT03" subtitle="d.castrovinci@gmail.com"></VListItem>
    </VList>
    <v-divider></v-divider>

    <v-card class="mx-auto" max-width="400">
      <v-list nav>
        <v-list-item-group v-model="model" active-class="border" color="primary">  
          <v-list-item v-if="!isAuthenticated" v-for="item in itemsNoAuth" :key="item.value" :prepend-icon="item.icon" :title="item.title"
            :value="item.value"  link @click="$router.push({ path: item.route })" />
        </v-list-item-group>

        <v-list-item-group v-model="model" active-class="border" color="primary"> 
          <v-list-item v-if="isAuthenticated" v-for="item in items" :key="item.value" :prepend-icon="item.icon" :title="item.title"
            :value="item.value"  link @click="$router.push({ path: item.route })" />
        </v-list-item-group>
       
        <v-list-item-group v-model="model" active-class="border" color="primary"> 
          <v-list-item v-if="isAuthenticated" v-for="item in itemLogout" :key="item.value" :prepend-icon="item.icon" :title="item.title"
            :value="item.value"  link  @click="logout" />
        </v-list-item-group>

      </v-list>
 
    </v-card>
    <v-divider></v-divider>
  </VNavigationDrawer>
</template>

<script>
import sidebar from "../data/sidebar.json";
import sidebarNoAuth from "../data/sidebarNoAuth.json";
import logout from "../data/sidebarLogout.json";
 
export default {
  name: "sidebar",
  props: {
    isAuthenticated: Boolean,
    logout: Function,
  },
  data() {
    return {
      model: 1,
      name: "MenuDrawer",
      items: sidebar.items,
      itemsNoAuth: sidebarNoAuth.items,
      itemLogout: logout.item, 
    }
  }
}
</script>
 

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>