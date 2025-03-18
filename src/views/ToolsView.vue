<template>
    <div>
        <p v-for = "tool in tools" :key="tool.id">{{ tool.name }}</p>
    </div>
</template>

<script setup lang="ts">
import { fetchByResourceTemplate } from '@/db';
import type { Tool } from '@/types';
import { onMounted, ref } from 'vue';

const tools = ref(<Tool[]>[]);

onMounted(async () => {
    const response = await fetchByResourceTemplate(6)
    tools.value = await response.json()
    tools.value = translateResponse(tools.value)
    console.log(tools.value)
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
            image: item['thumbnail_display_urls']
        }
    });
}
</script>