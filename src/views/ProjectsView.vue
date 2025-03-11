<template>
    <div class="projects-container">
        <masonry-wall :items="projects" :column-width="300" :gap="5">
            <template #default="{ index, item }">
                <div :gap="5">
        <p>{{ item.name}}</p>
      </div>
            </template>
        </masonry-wall>
        <!-- <ul v-for="item in projects" :key="item.id">
            <li><router-link :to="`/projects/${item.id}`"><h2>{{ item.name }}</h2></router-link></li>
            <p>{{ item.description }}</p>
        </ul> -->
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceClass } from '@/db';
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';
import MasonryWall from '@yeger/vue-masonry-wall';

const projects = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'
const numItems = ref(50) //this is the number of items to fetch

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value, numItems.value);
    projects.value = translateResponse(response);
    console.log(projects.value);
    //sort by name value
    projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
});

const translateResponse = (response: any) => {
    return response.map((item: any) => {
        return {
            id: item['o:id'],
            name: item['o:title'],
            description: Array.isArray(item['dcterms:description']) ? item['dcterms:description'][0]?.['@value'] : item['dcterms:description']?.['@value'],
            subject: item['dcterms:subject'], //array
            funding: item['vivo:hasFundingVehicle'], //array
            contributingRole: item['vivo:contributingRole'], //array
            timeInterval: item['vivo:dateTimeInterval'], //array
            subjectArea: item['vivo:hasSubjectArea'], //array
        }
    });
}

</script>

<style scoped>
.projects-container {
    padding: 55px;
}
li {
    
    list-style: none;
}

/* ::v-deep .masonry-column:nth-child(2n) > :nth-child(2n + 1) .wide-card {
  background-color: rgb(250 250 250);
}
::v-deep .masonry-column:nth-child(2n + 1) > :nth-child(2n) .wide-card {
  background-color: rgb(250 250 250);
} */

</style>