<template>
  <a :href="url" target="_blank" rel="noopener noreferrer">
    <div class="vertical-card" >
      <figure>
      <img :src="image" alt="Project image" />
    </figure>
      <div class="card-info" :style="{
    backgroundColor:
      typeof color === 'string' && color.length === 6
        ? '#' + color
        : '#efefef'
  }">
        <h3 class="card-title">
          {{ title }}
        </h3>
        <div class="card-body">
          {{ Array.isArray(description) && description[0]?.['@value'] || '' }}
        </div>

        <div class="card-links">
        To the resource
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
defineProps(["id", "title", "image", "url", "subjectArea", "description", "isPartOf", "color" ]);
</script>

<style scoped>
  a{
padding:0px;
  }
.vertical-card {
  position: relative;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  cursor: pointer;
  max-width: 300px;
  /* background-color:#efefef; */
}

.vertical-card:hover {
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
  font-size: 1.4rem;
  margin-block: 0 0.5rem;
  font-weight:400;
  line-height: 1.0;
  margin-top:10px;

/*   -webkit-hyphens: auto;
   -moz-hyphens: auto;
    -ms-hyphens: auto;
        hyphens: auto; */
}
.card-body {
  margin-block: 0.8rem;
  font-size: 1.0rem;
  font-weight:300;
  line-height: 1.1;
}
.card-links {
  margin-block: 1rem;
  font-size:20px;
  font-weight:300;
  background: url("https://data.dh.gu.se/ui-icons/arrow_link_black_circle.png");
  background-size: 22px;
  background-position: 0px 50%;
  background-repeat: no-repeat;
  padding-left: 30px;
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
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  display: flex;
  flex-wrap: wrap;
}
</style>

