<template>
    <div class="projects-container">
        <masonry-wall v-if="tools && tools.length" :items="tools" :column-width="300" :gutter="20" :responsive="true" :resize="true">
            <template #default="{ index, item }">
                <ProjectItem
                    :id="item.id"
                    :title="item.name"
                    :url="item.links?.[0]?.['@id'] || ''"
                    :image="item.image.large"
                >
                    <!-- <span v-if="item.shortDescription">{{ item.shortDescription[0]['@value'] }}</span> -->
                </ProjectItem>
            </template>
        </masonry-wall>
        <!-- <p v-for = "tool in tools" :key="tool.id">{{ tool.name }}</p> -->
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceTemplate } from '@/db';
import type { Tool } from '@/types';
import { onMounted, ref } from 'vue';
import MasonryWall from '@yeger/vue-masonry-wall';
import ProjectItem from '@/components/ProjectItem.vue';


const tools = ref(<Tool[]>[]);

onMounted(async () => {
    const response = await fetchByResourceTemplate(6)
    console.log(response);
    tools.value = await translateResponse(response)
    
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
            shortDescription: item['bibo:shortDescription'], //array
            image: item['thumbnail_display_urls'],
            links: item['foaf:homepage'], //array
        }
    });
}
</script>

<style scoped>
.projects-container {
    width: calc(100% - 140px);
    padding-left: 60px;
}
li {
    
    list-style: none;
}</style>