<template>
    <div>
        <h1>Projects</h1>
        <ul v-for="item in project" :key="item.id">
            <li><router-link :to="`/projects/${item.id}`"><h2>{{ item.name }}</h2></router-link></li>
            <p>{{ item.description }}</p>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceClass } from '@/db';
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';

const project = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'
const numItems = ref(50) //this is the number of items to fetch

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value, numItems.value);
    project.value = translateResponse(response);
    console.log(project.value);
    //sort by name value
    project.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
p {
    font-size: 0.9em;
}

li {
    
    list-style: none;
}

</style>