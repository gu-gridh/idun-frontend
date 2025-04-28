<template>
    <div>
        <div v-for="project in projects" :key="project.id">
            <router-link :to="'/projects/' + project.id">
                <!-- <img :src="project.image.large" alt="Project Image" /> -->
                <h3>{{ project.name }}</h3>
                <p v-if="project.shortDescription">{{ project.shortDescription[0]['@value'] }}</p>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';
import { fetchByResourceClass} from '@/db';
import { useRoute } from 'vue-router';

const projects = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value);
    projects.value = await translateResponse(response);
    //loop and keep items with status active
    projects.value = projects.value.filter((item) => {
        return item.status[0]['@value'] === 'Active'
    });
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
            status: item['schema:status'], //array
        }
    });
}
</script>

<style scoped>
</style>