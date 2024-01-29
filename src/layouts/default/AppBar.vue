<template>
  <v-app-bar app color="light">
    <v-toolbar>
      <v-toolbar-title class="font-lucida centered-title">
        {{ $route.name }}
      </v-toolbar-title>
    </v-toolbar>
  </v-app-bar>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
.centered-title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
