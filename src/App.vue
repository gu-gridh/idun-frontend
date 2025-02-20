<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
      <RouterLink to="/">GRIDH</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
    </nav>
    <div class="container">
      <RouterView />
    </div>
</template>

<style scoped>
/* container */
.container {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 80px;
  display: flex;
  margin: 15px;
}
</style>
