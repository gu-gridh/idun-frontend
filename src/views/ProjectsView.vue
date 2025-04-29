<template>
    <div class="projects-container">
        <div v-for="project in projects" :key="project.id" class="project">
            <h2>{{ project.name }}</h2>
            <p v-for="description in project.shortDescription">{{ description['@value'] }}</p>
            <!-- <p v-for="subject in project.subject">{{ subject['@value'] }}</p> -->
             <p v-for="owner in project.owner">{{ owner.display_title}}</p> <!-- TODO add URL? -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceClass } from '@/db';
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';

const projects = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'
const numItems = ref(50) //this is the number of items to fetch

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value);
    console.log(response);
    projects.value = await translateResponse(response);
    //console.log(projects.value);
    //sort by name value
    projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
});

const translateResponse = (response: any) => {
    return response.map((item: any) => {
        return {
            id: item['o:id'],
            name: item['o:title'],
            //description: Array.isArray(item['dcterms:description']) ? item['dcterms:description'][0]?.['@value'] : item['dcterms:description']?.['@value'],
            subject: item['dcterms:subject'], //array
            // funding: item['vivo:hasFundingVehicle'], //array
            // contributingRole: item['vivo:contributingRole'], //array
            // timeInterval: item['vivo:dateTimeInterval'], //array
            subjectArea: item['vivo:hasSubjectArea'], //arraye
            shortDescription: item['bibo:shortDescription'], //array
            image: item['thumbnail_display_urls'],
            owner: item['bibo:owner'], //array
        }
    });
}

</script>

<style scoped>


.project {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
.project h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

</style>