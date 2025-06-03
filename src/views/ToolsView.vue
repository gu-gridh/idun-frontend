<template>
    <div class="Platforms">
        <div class="projects grey-gradient">
            <div class="projects-container ">

                <h1>Databases and Archives</h1>
                <masonry-wall v-if="tools && databases.length" :column-width="220" :items="databases" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ResourceItem :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText" 
                            :color="item.color?.[0]?.['@value'] || ''"/>
                    </template>
                </masonry-wall>
            </div>

            <div class="projects-container ">
                <h1>Apps and Tools</h1>
                <masonry-wall v-if="tools && apps.length" :column-width="220" :items="apps" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ResourceItem :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText"
                            :color="item.color?.[0]?.['@value'] || ''"/>
                    </template>
                </masonry-wall>
            </div>

            <div class="projects-container ">
                <h1>Other</h1>
                <masonry-wall v-if="tools && other.length" :column-width="220" :items="other" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ResourceItem :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText"
                            :color="item.color?.[0]?.['@value'] || ''"/>
                    </template>
                </masonry-wall>
            </div>
        </div>
        <div class="projects">
            <div class="projects-container" style="padding-top:10px;">
                <h1>Legacy Resources</h1>

                <h2>These resources are not actively developed and maintained.</h2>

                <masonry-wall v-if="legacy && legacy.length" :column-width="440" :items="legacy" :gutter="0"
                    :responsive="true" :resize="true">
                    <template #default="{ index, item }">
                        <ResourceItemLegacy :id="item.id" :title="item.name" :url="item.links?.[0]?.['@id'] || ''"
                            :image="item.image?.large || ''" :subjectArea="item.subjectArea || []"
                            :description="item.descriptionText" 
                            :color="item.color?.[0]?.['@value'] || ''"/>
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
    import ResourceItem from '@/components/ResourceItem.vue';
    import ResourceItemLegacy from '@/components/ResourceItemLegacy.vue';


    const tools = ref(<Tool[] > []);
    const databases = ref(<Tool[] > []);
    const apps = ref(<Tool[] > []);
    const other = ref(<Tool[] > []);
    const legacy = ref(<Tool[] > []);

    onMounted(async () => {
        window.scrollTo(0, 0);
        const response = await fetchByResourceTemplate(6);
        const allTools = await translateResponse(response);

        const activeTools: Tool [] = [];
        const legacyTools: Tool[] = [];

        allTools.forEach((tool: Tool) => {
            if (tool.legacy?.[0]?.['@value'] === 'Legacy') {
                legacyTools.push(tool);
            } else if (tool.legacy?.[0]?.['@value'] === 'Active') {
                activeTools.push(tool);
            } else {
                console.log('Unknown tool', tool.name);
            }
        });

        tools.value = activeTools.sort(() => Math.random() - 0.5);
        legacy.value = legacyTools;
        sortByType(tools.value);
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
            type: item['schema:category'] || [],
            color: item['schema:color'] || [],
        }));
    };

    const sortByType = (tools: Tool[]) => {
        //sort by type 'Databases and Archives', 'Apps and Tools', 'Other'
        tools.forEach((tool: Tool) => {
            if (tool.type?.[0]?.['@value'] === 'Databases and Archives') {
                databases.value.push(tool);
            } else if (tool.type?.[0]?.['@value'] === 'Apps and Tools') {
                apps.value.push(tool);
            } else if (tool.type?.[0]?.['@value'] === 'Other') {
                other.value.push(tool);
            } else {
                console.log('Unknown type', tool.name, tool.type?.[0]?.['@value']);
            }
        });
        
    };
</script>

<style scoped>
    h1 {
        font-weight: 300;
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