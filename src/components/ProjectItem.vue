<template>
  <router-link :to="'/projects/' + id">
    <div class="vertical-card">
      <figure>
        <img :src="image" alt="Project image" />
      </figure>
      <div class="card-info">
        <h3 class="card-title">
          {{ title }}
        </h3>
        <div class="card-body">
          <slot />
        </div>
      </div>
    </div>
  <div class="vertical-card"> <!-- TODO random background color? -->
    <figure>
    <img :src="image.src" alt="Project image" />
  </figure>
    <!-- <PreviewLabel v-if="previewLabel">{{ previewLabel }}</PreviewLabel> -->
    <div class="card-info">
      <h3 class="card-title">
        {{ title }}
      </h3>
      <div class="card-body">
        <slot />
      </div>

      <div class="card-tags">
        <!-- <Tag v-for="tag in tags" :key="tag">#{{ tag }}</Tag> -->
      </div>
    </div>
  </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps(["id", "title", "image", "links", ]);
</script>

<style scoped>
.vertical-card {
  position: relative;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  cursor: pointer;
}

.vertical-card:hover {
  transform: scale(1.03);
  filter: brightness(110%);
  z-index: 10;
  box-shadow: 0px 4px 20px 0px rgb(0 0 0 / 20%), 0 6px 40px 0 rgb(0 0 0 / 19%);
  border-radius: 10px;
}

img {
  display: block;
  max-width: 100%;
}
.card-info {
  padding: 0.5rem 1rem;
}
.card-title {
  font-size: 1.2rem;
  margin-block: 0 0.5rem;
  font-weight:400;
  line-height: 0.9;
  margin-top:10px;
}
.card-body {
  margin-block: 0.5rem;
  font-size: 0.9rem;
  font-weight:300;
  line-height: 1.0;
}
.card-links {
  margin-block: 1rem;
}
.button-link {
  display: block;
  min-width: auto;
  font-size: 1.0rem;
  font-weight:300;
}
.button-link:hover {
  background: inherit;
}
.card-tags {
  border-top: thin dotted rgba(0 0 0 / 0.5);
  padding-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}
</style>

