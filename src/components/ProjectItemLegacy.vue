<template>
  <a :href="url" target="_blank" rel="noopener noreferrer">
    <div class="horizontal-card"> <!-- TODO every other alterntate between two very light grey tones (look at old dh portal) -->
      <figure>
      <img :src="image" alt="Project image" />
    </figure>
      <div class="card-info">
        <h3 class="card-title">
          {{ title }}
        </h3>
        <div class="card-body">
          {{ Array.isArray(description) && description[0]?.['@value'] || '' }}
        </div>

        <div class="card-tags">
          <span v-for="subject in subjectArea" :key="subject['@id']" class="tag">
            #{{ subject['@value'] }}
          </span>
        </div>
      </div>
    </div>
  </a>  
</template>

<script setup lang="ts">
defineProps(["id", "title", "image", "url", "subjectArea", "description" ]);
</script>

<style scoped>
  a{
padding:0px;
  }
.horizontal-card {
  position: relative;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  cursor: pointer;
  max-width: auto;
  max-height:150px;
  background-color:#efefef;
  margin-top:0px!important;
  display:flex;

}

.horizontal-card:hover {
  transform: scale(1.03);
  filter: brightness(110%);
  z-index: 10;
  box-shadow: 0px 4px 20px 0px rgb(0 0 0 / 20%), 0 6px 40px 0 rgb(0 0 0 / 19%);
  border-radius: 10px;
}

figure{
  display: flex;
    margin: 0;
    overflow: hidden;
    width:150px;
    height:150px;
}

img {
  display: block;
  max-width: 100%;
  width: 100%;
  object-fit: cover;
}
.card-info {
  padding: 0.5rem 1rem;
}
.card-title {
  font-size: 1.5rem;
  margin-block: 0 0.5rem;
  font-weight:200;
  line-height: 1.0;
  margin-top:10px;
}
.card-body {
  margin-block: 0.8rem;
  padding-right: 5px;
  font-size: 1.0rem;
  font-weight:300;
  line-height: 1.1;
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

  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  display: flex;
  flex-wrap: wrap;
}
</style>

