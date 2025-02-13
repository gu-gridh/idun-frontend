<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
    </nav>
    <div class="container">
      <RouterView />
    </div>
</template>

<style scoped>
/* container */
.container {
  max-width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
