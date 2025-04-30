<template>
    <div class="projects-container">
        <masonry-wall v-if="tools && tools.length" :column-width="200" :items="tools":gutter="20" :responsive="true" :resize="true">
            <template #default="{ index, item }">
                <ProjectItem
                :id="item.id"
                :title="item.name"
                :url="item.links?.[0]?.['@id'] || ''"
                :image="item.image?.large || ''"
                :subjectArea="item.subjectArea || []"
                :description="item.descriptionText"
                />
            </template>
        </masonry-wall>   
    </div>
    <div class="projects-container">
        Legacy
        <masonry-wall v-if="legacy && legacy.length" :column-width="200" :items="legacy":gutter="20" :responsive="true" :resize="true">
            <template #default="{ index, item }">
                <ProjectItem
                :id="item.id"
                :title="item.name"
                :url="item.links?.[0]?.['@id'] || ''"
                :image="item.image?.large || ''"
                :subjectArea="item.subjectArea || []"
                :description="item.descriptionText"
                />
            </template>
        </masonry-wall>
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceTemplate } from '@/db';
import type { Tool } from '@/types';
import { onMounted, ref } from 'vue';
import MasonryWall from '@yeger/vue-masonry-wall';
import ProjectItem from '@/components/ProjectItem.vue';


const tools = ref(<Tool[]>[]);
const legacy = ref(<Tool[]>[]);

onMounted(async () => {
    const response = await fetchByResourceTemplate(6)
    tools.value = await translateResponse(response)
    //then randomize the order
    
    //set them as either active or legacy tools according to legacy value
    tools.value.forEach((tool) => {
        if (tool.legacy?.[0]?.['@value'] === 'Legacy') {
            legacy.value.push(tool);
        } else if (tool.legacy?.[0]?.['@value'] === 'Active') {
            tools.value.push(tool);
        }
        else return
    });

    tools.value = tools.value.sort(() => Math.random() - 0.5);
    
});

const translateResponse = (response: any) => {
    return response.map((item: any) => ({
        id: item['o:id'] || '',
        name: item['o:title'] || 'No title',
        subject: item['dcterms:subject'] || [],
        funding: item['vivo:hasFundingVehicle'] || [],
        contributingRole: item['vivo:contributingRole'] || [],
        timeInterval: item['vivo:dateTimeInterval'] || [],
        subjectArea: item['dcterms:subject'] || [],
        descriptionText: item['bibo:shortDescription'] || [],
        image: item['thumbnail_display_urls'] || {},
        links: item['foaf:homepage'] || [],
        legacy: item['bibo:status'] || [],
    }));
};
</script>

<style scoped>
.projects-container {
    width: calc(100% - 140px);
    padding-left: 60px;
}
li {
    
    list-style: none;
}</style>