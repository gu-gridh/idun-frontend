<template>
    <div class="Platforms">
        <div class="projects grey-gradient">
            <div class="projects-container ">

                <h1>Databases, and Archives</h1>
                <masonry-wall v-if="tools && tools.length" :column-width="220" :items="tools" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ProjectItem :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText" />
                    </template>
                </masonry-wall>
            </div>

            <div class="projects-container ">
                <h1>Apps and Tools</h1>
                
            </div>

            <div class="projects-container ">
                <h1>Other</h1>
                
            </div>
        </div>
        <div class="projects">
            <div class="projects-container" style="padding-top:10px;">
                <h1>Legacy Resources</h1>

                <h2>These resources are not actively developed and maintained.</h2>

                <masonry-wall v-if="legacy && legacy.length" :column-width="440" :items="legacy" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ProjectItemLegacy :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText" />
                    </template>
                </masonry-wall>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { fetchByResourceTemplate } from '@/db';
    import type { Tool } from '@/types';
    import { onMounted, ref } from 'vue';
    import MasonryWall from '@yeger/vue-masonry-wall';
    import ProjectItem from '@/components/ProjectItem.vue';
    import ProjectItemLegacy from '@/components/ProjectItemLegacy.vue';


    const tools = ref(<Tool[] > []);
    const legacy = ref(<Tool[] > []);

    onMounted(async () => {
        const response = await fetchByResourceTemplate(6)
        tools.value = await translateResponse(response)
     
        //then randomize the order

        //set them as either active or legacy tools according to legacy value
        tools.value.forEach((tool) => {
            if (tool.legacy?.[0]?.['@value'] === 'Legacy') {
                legacy.value.push(tool);
            } else if (tool.legacy?.[1]?.['@value'] === 'Active') {
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
            //funding: item['vivo:hasFundingVehicle'] || [],
            //contributingRole: item['vivo:contributingRole'] || [],
            //timeInterval: item['vivo:dateTimeInterval'] || [],
            subjectArea: item['dcterms:subject'] || [],
            descriptionText: item['bibo:shortDescription'] || [],
            image: item['thumbnail_display_urls'] || {},
            links: item['foaf:homepage'] || [],
            legacy: item['bibo:status'] || [],
        }));
    };
</script>

<style scoped>
    h1 {
        font-weight: 200;
    }

    h2 {
        font-weight: 200;
    }

    .projects {
        width: 100%;
        display: block;
  

    }

    .projects-container {
        width: calc(100% - 120px);
        padding-left: 60px;
        padding-bottom:40px;
    }

    .projects-container li {
        list-style: none;
    }

    .legacy {
        border-top: thin dotted rgba(0 0 0 / 0.5);
        padding-bottom: 50px;
        padding-top: 20px;
        margin-top: 60px;
        width: calc(100% - 0px);
    }

    .masonry-column {}

    .masonry-item {}
</style>