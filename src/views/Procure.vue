<template>
    <div class="Platforms">
        <div class="projects">
            <div class="grey-gradient">
                <div class="intro-space" style="padding-bottom:0px;">

                    <div class="intro-title" style="line-height:0.9; padding-bottom:10px;">
                        ProCURE: <br>Protection of Cultural Resources
                    </div>
                    <div class="intro-article">
                        <p>ProCURE, hosted by the Gothenburg Research Infrastructure in Digital Humanities (GRIDH),
                            is a <span>Centre of Excellence</span> dedicated to advancing expertise, developing software
                            solutions,
                            and providing both high-end equipment and accessible solutions for digital preservation and
                            access to <span>remote or endangered cultural resources.</span>
                            It serves as a global hub for heritage digitization, ensuring that at-risk cultural heritage
                            is
                            documented,
                            analyzed, and made accessible for <span>research, education, and public engagement.</span>
                        </p>

                        <p>Through strategic collaborations and training programs,
                            ProCURE is designed to empower heritage professionals,
                            researchers, and institutions with the tools and knowledge
                            needed to safeguard cultural assets for future generations.
                            To digitize cultural heritage is a monumental task always in need of
                            state-of-the-art expertise and broader perspectives.</p>
                    </div>
                </div>

                <div class="row">
                    <div class="info-module left" style="padding: 0px 0px 20px 0px; margin-top:0px">
                        <div class="text-module left" style="padding-right:40px;">
                            <div class="text-module-data">
                                <span>3</span> courses
                            </div>
                            <div class="text-module-description">Courses info text </div>

                            <div class="text-module-data"><span>6</span> organisations </div>
                            <div class="text-module-description">Portals and tools info text </div>
                        </div>
                    </div>

                    <div class="data-module">
                        <div class="text-module">
                            <div class="text-module-data"><span class="livedata-pulse">6</span>
                                active projects</div>
                            <div class="text-module-description">Active projects info text </div>

                            <div class="text-module-data"> <span class="livedata-pulse">1200</span>
                                users </div>
                            <div class="text-module-description">Portals and tools info text </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="projects-container">

                <div class="row">
                    <div class="row">
                        <div class="data-module">
                            <div class="buffer">
                                <div class="module">
                                    <div class="image-stack">
                                        <div class="image-stack-items-container">

                                            <div class="image-stack-item"
                                                style="background-image:url(procure/sophia1.jpg); background-size:cover; z-index:2;">
                                            </div>
                                            <div class="image-stack-item"
                                                style="background-image:url(procure/etruscan1.jpg); background-size:cover; z-index:2; margin-top:50px; margin-left:-200px;">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="info-module">
                            <div class="info-module-slogan right">
                                <div class="text-module-title">ProCURE: Protection of Cultural Resources</div>
                                <h1>A Centre of Excellence</h1>
                                <h2></h2>
                            </div>
                        </div>
                    </div>


                    <div class="row">

                        <div class="info-module">
                            <div class="info-module-slogan left">
                                <div class="text-module-title">ProCURE: Protection of Cultural Resources</div>
                                <h1>A Centre of Excellence</h1>
                                <h2></h2>
                            </div>
                        </div>
                        <div class="data-module">
                            <div class="buffer">
                                <div class="module">
                                    <div class="image-stack" style="margin-left:-10px; margin-right:0px; ">
                                        <div class="image-stack-items-container"
                                            style=" justify-content: left; margin-left:0px;  margin-right:0px; overflow:hidden;">

                                            <div class="image-stack-item"
                                                style="background-image:url(procure/etruscan2.jpg); background-size: cover;z-index:3;  margin-top:60px; ">
                                            </div>
                                            <div class="image-stack-item"
                                                style="background-image:url(procure/sophia5.jpg); background-size: cover; z-index:2;margin-left:-100px;">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row pink-gradient-inverted">
                    <div class="data-module">
                        <div class="buffer">
                            <div class="module">
                                <div class="image-stack">
                                    <div class="image-stack-items-container">

                                        <div class="image-stack-item"
                                            style="background-image:url(procure/sophia3.jpg); background-size:cover; z-index:2;">
                                        </div>
                                        <div class="image-stack-item"
                                            style="background-image:url(procure/sophia6.jpg); background-size:cover; z-index:2; margin-top:50px; margin-left:-200px;">
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info-module">
                        <div class="info-module-slogan right">
                            <div class="text-module-title">ProCURE: Protection of Cultural Resources</div>
                            <h1>A Centre of Excellence</h1>
                            <h2></h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { fetchByResourceTemplate } from '@/db';
    import type { Tool } from '@/types';
    import { onMounted, ref } from 'vue';





    onMounted(async () => {


        //then randomize the order

        //set them as either active or legacy tools according to legacy value




    });

    const translateResponse = (response: any) => {

    };
</script>

<style scoped>
    .module {
        overflow: visible;
    }

    .row {
        margin-top: 30px;
    }

    .image-stack {
        width: calc(100% + 0px);
        margin-left: -50px;
        margin-top: -20px;
        height: auto;
        padding: 0px 0px;
    }

    .image-stack-items-container {
        width: calc(100% + 50px);
        height: auto;
        overflow: visible;
        padding: 0px 0px;
        display: flex;
        flex-direction: row;
        justify-content: right;
        margin-left: -0px;

    }

    .image-stack-item {
        flex: none;
        width: 525px;
        height: 250px;
        border-radius: 5px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .image-stack-item:hover {
        transform: translateX(30px);
    }

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