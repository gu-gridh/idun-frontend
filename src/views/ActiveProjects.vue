<template>
    <div>
        <div v-for="project in projects" :key="project.id" class="project">
            <router-link :to="'/projects/' + project.id">
                <!-- <img :src="project.image?.large" alt="Project Image" v-if="project.image?.large" /> -->

                <h2>{{ project.name || 'Untitled Project' }}</h2>

                <!-- Short Description -->
                <h3 v-if="project.shortDescription?.[0]?.['@value']">
                    {{ project.shortDescription[0]['@value'] }}
                </h3>
                <p v-else>No short description available</p>

                <!-- Owners -->
                <div class="metadata-group">
                    Project owner:
                    <h4 v-if="project.owner?.length" v-for="(owner, i) in project.owner" :key="i">
                        {{ owner?.display_title || 'Unnamed owner' }}
                    </h4>
                    <p v-else>Not specified</p>
                </div>

                <!-- Funders -->
                <div class="metadata-group">
                    Funded by:
                    <h4 v-if="project.funding?.length" v-for="(funding, i) in project.funding" :key="i">
                        {{ funding?.display_title || 'Unnamed funder' }}
                    </h4>
                    <p v-else>Not specified</p>
                </div>
            </router-link>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Projects } from '@/types';
import { fetchByResourceClass} from '@/db';
//import { useRoute } from 'vue-router';

const projects = ref<Projects[]>([]);
const projectsId = ref(99) //this is the id for resource class 'Projects'

onMounted (async () => {
    const response = await fetchByResourceClass(projectsId.value);
    projects.value = await translateResponse(response);
    projects.value.sort((a, b) => (a.name > b.name) ? 1 : -1);
    //loop and keep items with status active
    projects.value = projects.value.filter((item) => {
        const statusVal = item.status?.[0]?.['@value']?.toLowerCase();
        return statusVal === 'active';
        });
});

const translateResponse = (response: any) => {
  return response.map((item: any) => {
    return {
      id: item['o:id'],
      name: item['o:title'] || 'Untitled Project',
      subject: item['dcterms:subject'] || [],
      funding: item['vivo:hasFundingVehicle'] || [],
      subjectArea: item['vivo:hasSubjectArea'] || [],
      shortDescription: item['bibo:shortDescription'] || [],
      image: item['thumbnail_display_urls'] || {},
      owner: item['bibo:owner'] || [],
      status: Array.isArray(item['schema:status'])
        ? item['schema:status']
        : item['schema:status']
          ? [item['schema:status']]
          : [],
    };
  });
};

</script>

<style scoped>
</style>