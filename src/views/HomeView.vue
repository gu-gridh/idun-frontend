<template>
  <div class="container">
    <!---- will fetch 3 page blocks from Omeka S API -->
    <div class="row">
      <div class="column">
        <div>
          <span v-html="redData1.html"></span>
        </div>
      </div>
      <div class="column">
        <div class="pink">
          Visualisering
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div class="green">
            Visualisering
          </div>
        </div>
        <div class="column">
          <div>
            <span v-html="redData2.html"></span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <div>
            <span v-html="redData3.html"></span>
          </div>
        </div>
        <div class="column">
          <div class="orange">
            Visualisering
          </div>
        </div>
      </div>
      <!-- Puffs -->
      <div class="links">
        <div class="col-blue">
          Resurssida för AI-verktyg
        </div>
        <div class="col-blue">
          Resurssida för teknisk infrastruktur
        </div>
        <div class="col-blue">
          GITHUB
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { fetchAllPages } from '@/db';
import { onMounted, ref } from 'vue';

const redData1 = ref({ html: '' });
const redData2 = ref({ html: '' });
const redData3 = ref({ html: '' });

onMounted(() => {
  //fetch data from Omeka pages
  fetchPageData();
});

const fetchPageData = async () => {
  //fetch html text data
  await fetchAllPages()
  .then((response) => {
    redData1.value = convertToJson(response[1])
    redData2.value = convertToJson(response[2])
    redData3.value = convertToJson(response[3])
    
  })

};

//since the omeka returns json ld data, convert it to more readable json
const convertToJson = (data: any) => {
  const parsed = {
    html: data['o:block'][1]['o:data']['html'] //this is the html data and might be different in the future
  }
  return parsed;
};
</script>



<style scoped>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
}

.links {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  margin-top: 30px;;
}

.column {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  width: 50%;
  padding: 10px;
  margin: 10px;
  
}

.pink {
  background-color: #fd1daf;
  height: 150px;
  padding: 10px;
}

.green {
  background-color: #60d937;
  height: 150px;
  padding: 10px;
}

.orange {
  background-color: #feae00;
  height: 150px;
  padding: 10px;
}

.col-blue {
  background-color: #00a1ff;
  height: 100px;
  padding: 10px;
  margin: 10px;
  flex: 1 1 0;
  width: 0;
}

</style>
