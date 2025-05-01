<template>

  <div class="intro-space" style="">
    <div class="text-module-title">Cutting Edge Expertise</div>
    <div class="intro-title">
      A resource for research!
    </div>
    <div class="intro-article">
      <p> The Gothenburg Research Infrastructure in Digital Humanities (GRIDH) is a research node and infrastructure
        that offer expertise in <span>deep learning and artificial intelligence</span>, <span>visualisation</span> and
        <span>visual analysis</span>, <span>spatio-temporal
          interfaces</span>, and <span>natural language processing</span>. Our mission is to strengthen, renew and
        enrich research and
        teaching through digital source material, tools and methods.
      </p>

      <p>We help researchers to develop research applications and navigate datasets, and is a resource for memory
        institutions that seek new ways to make their collections and archives available for research and public
        alike. We publish both human and machine readable interfaces for a number of our research projects.</p>
    </div>
  </div>


  <div class="container">


    <!---- will fetch 3 page blocks from Omeka S API -->
    <div class="content">
      <div class="row grey-gradient">
        <div class="info-module">
          <div class="info-module-slogan left">
            <div class="text-module-title">Application Experts</div>
            <h1>So many projects!</h1>
            <h2>GRIDH has to date been involved in more than <span>{{ projectsNum }}</span> research projects, and
              helped gather more
              than <span>{{ totFunding }} million</span> in funding.</h2>
            <div class="text-module-link hoverable contact-us">Contact us and start a project
            </div>
            <!-- <span v-html="redData1.html"></span> -->
          </div>
        </div>
        <div class="data-module">
          <div class="text-module">
            <div class="text-module-title">Projects </div>
            <div class="text-module-data"><router-link to="/active"> <span class="livedata-pulse">8</span> active
                projects</router-link> </div>
            <div class="text-module-description">Active projects info text </div>

            <div class="text-module-data"><router-link to="/tools"> <span class="livedata-pulse">{{ toolsNum }}</span>
                portals and tools </router-link> </div>
            <div class="text-module-description">Portals and tools info text </div>


            <div class="text-module-data"><span class="livedata-pulse">{{ totFunding }}</span> million in funding</div>
            <div class="text-module-description">Money-maker info text </div>


            <div class="text-module-link hoverable"><router-link to="/projects">See all projects</router-link></div>

          </div>
        </div>
      </div>


      <div class="row">
        <div class="data-module">
          <div class="buffer">
            <div class="module theme-gradient-1 graph-wrapper">
              <Graph />
            </div>
          </div>
        </div>
        <div class="info-module">
          <div class="info-module-slogan right">
            <div class="text-module-title">University wide support</div>
            <h1>Transdisciplinary collaborations!</h1>
            <h2 v-html="redData2.html"></h2>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- some kind of vizualisation -->
        <div class="info-module">
          <div class="info-module-slogan left">
            <div class="text-module-title">Data stewardship</div>
            <h1>So much data!</h1>
            <h2 v-html="redData1.html"></h2>
          </div>
        </div>
        <div class="data-module">
          <div class="buffer">
            <div class="module hoverable theme-gradient-2">

            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="data-module">
          <div class="buffer">
            <div class="module hoverable theme-gradient-map">
              <Map />
            </div>
          </div>
        </div>
        <!-- Map -->
        <div class="info-module">
          <div class="info-module-slogan right">
            <div class="text-module-title">Global datasets</div>
            <h1>From all over the place!</h1>
            <h2 v-html="redData3.html"></h2>

          </div>
        </div>
      </div>


      <div class="row pink-gradient-inverted">
        <!-- Puffs -->

        <div class="links">
          <div class="link-item hoverable">
            <div class="link-title">
              ProCURE infrastructure
            </div>
          </div>
          <div class="link-item hoverable">
            <div class="link-title">
              Resurssida för AI-verktyg
            </div>
          </div>
          <div class="link-item hoverable">
            <div class="link-title">
              Resurssida för teknisk infrastruktur
            </div>
          </div>
          <div class="link-item hoverable">
            <div class="link-title">
              <a href="https://github.com/gu-gridh" target="_blank">
                <img src="@/assets/githubLogo.png" alt="github logo" style="width: 150px;" />
              </a>
            </div>
          </div>
        </div>
        <!-- Active projects --> <!-- should be marked out in database -->
        <div class="project-container">

          <!-- TODO: hook up the title, link, and image to something that cna be decided in the backend -->
          <h3>Highlighted Resources</h3>
          <div class="projects">
            <div class="project-item ocean" style="border-radius:10px 0 0 10px;">
              <div class="project-image"
                style="background: linear-gradient(180deg, rgb(253, 149, 242) 0%, rgb(0, 53, 199) 100%), url(https://idun.dh.gu.se/files/large/bc1bb1c389814bae436d6328357d21a0946b3358.jpg);background-size: cover; background-position: 50%; ">
              </div>
              <div class="project-title">
                Saint Sophia's Inscriptions
              </div>
            </div>
            <div class="project-item" style="">
              <div class="project-image"
                style="background: linear-gradient(180deg, rgb(105, 188, 148) 0%, rgb(39, 197, 254) 100%), url(https://idun.dh.gu.se/files/large/fb5565201c7c7bb2e9423cfdc88f42405b98ec0e.jpg);  background-size: cover; background-position: 50%;">
              </div>
              <div class="project-title">
                Dawit Isaak Database of Censorship
              </div>
            </div>
            <div class="project-item" style="border-radius:0px 10px 10px 0px;">
              <div class="project-image"
                style="  background: linear-gradient(180deg, rgb(253, 149, 242) 0%, rgb(211, 254, 39) 100%), url(https://idun.dh.gu.se/files/large/f64a8a5f8606fd201d3a6706172468169f1b150f.jpg); background-size: cover; background-position: 50%;">
              </div>
              <div class="project-title">
                Etruscan Chamber Tombs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project-button">
      <div class="text-module-link hoverable"><router-link to="/projects">See all projects</router-link></div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { fetchAllPages, fetchCount, fetchByResourceClass } from '@/db';
  import { onMounted, ref } from 'vue';
  import Map from '@/components/Map.vue';
  import Graph from '@/components/Graph.vue';

  const redData1 = ref({ html: '' });
  const redData2 = ref({ html: '' });
  const redData3 = ref({ html: '' });
  const projectsNum = ref(0);
  const toolsNum = ref(0);
  const totFunding = ref(0);

  onMounted(async () => {
    //fetch html data from Omeka pages
    await fetchPageData();
    //fetch number of projects
    await fetchCount('items?resource_class_id=99')
      .then(data => {
        projectsNum.value = data.total
      });
    await fetchCount('items?resource_template_id=6')
      .then(data => {
        toolsNum.value = data.total
      });
    //fetch projects funding
    const response = await fetchByResourceClass(99)
    //for each item, get the funding array and sum it
    totFunding.value = 0
    response.forEach((item: any) => {
      if (item['schema:funding']) {
        item['schema:funding'].forEach((funding: any) => {
          const amount = Number(funding['@value'])
          if (!isNaN(amount)) {
            totFunding.value += amount
          } else {
            console.log('not a number', funding['@value'])
          }
        })
      }
    })
    totFunding.value = totFunding.value / 1000000
    //do not show decimals
    totFunding.value = Math.round(totFunding.value)
  });

  const fetchPageData = async () => {
    //fetch html text data
    await fetchAllPages()
      .then((response) => {
        redData1.value = convertToJson(response[1])
        redData2.value = convertToJson(response[2])
        redData3.value = convertToJson(response[3])
        console.log('redData1', redData1.value)
        console.log('redData2', redData2.value)
        console.log('redData3', redData3.value)
      })

  };

  //since the omeka returns json ld data, convert it to more readable json
  const convertToJson = (data: any) => {
    const parsed = {
      html: data['o:block'][1]['o:data']['html'] //this is the html data and might be different in the future
    }
    return parsed;
  };
</script>



<style>
  .intro-space {
    width: calc(100% - 140px);
    padding-left: 60px;
    margin-top: 50px;
  }

  .intro-title {
    font-size: 50px;
    font-weight: 600;
    color: var(--theme-heading);
  }

  .intro-article {
    columns: 2;
    column-gap: 70px;
    column-rule: 1px solid lightgrey;
    font-size: 20px;
    font-weight: 300;
    text-align: justify;
    margin-top: -10px;
    margin-bottom: 20px;
  }

  .intro-article span {
    color: var(--theme-livedata1);
    font-weight: 700;
  }

  h2{
    margin-top:-15px!important;
  }

  @media screen and (max-width: 1100px) {
    .intro-article {
      columns: 1;

    }
  }

  .contact-us{
    width:250px;
    margin-top:30px;
  }

  .float-tooltip-kap {
    position: absolute;
    white-space: nowrap;
    top: 100px;
    right: 20px;
    font-family: sans-serif !important;
    font-size: 16px !important;
    font-weight: 100;
    padding: 5px 8px 5px 8px !important;
    border-radius: 5px !important;
    color: black !important;
    background: rgba(255, 255, 255, 0.9) !important;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2) !important;

    /* by default */
  }


  .content {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    gap: 0px;
    margin: 0;
  }

  .pink-gradient {
    background: linear-gradient(360deg, rgba(255, 0, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .blue-gradient {
    background: linear-gradient(360deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .grey-gradient {
    background: linear-gradient(360deg, rgba(100, 100, 100, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .pink-gradient-inverted {
    background: linear-gradient(180deg, rgba(100, 100, 200, 0.1) 0%, rgba(255, 255, 255, 1) 100%);
  }

  .theme-gradient-1 {
    background: linear-gradient(360deg, rgba(255, 0, 200, 0.1) 0%, rgba(240, 240, 240, 1) 100%);
  }

  .theme-gradient-2 {
    background: linear-gradient(360deg, rgba(0, 0, 200, 0.1) 0%, rgba(240, 240, 240, 1) 100%);
  }

  .theme-gradient-map {
    background: linear-gradient(360deg, rgb(235, 239, 241) 30%, rgb(233, 194, 231) 70%);
  }

  .hoverable {
    transition: all 0.2s ease-in-out;
  }

  .hoverable:hover {
    transform: scale(1.03);
  }

  .data-module {
    width: 50%;
  }

  .buffer {
    padding: 50px 40px;

  }


  .text-module {
    background-color: none;
    padding: 20px;
    color: var(--theme-heading);
    padding-bottom: 40px;
    padding-left: 30px
  }

  .text-module-title {
    font-size: 18px;

  }

  .text-module-data {
    font-size: 32px;
    font-weight: bold;
  }

  .text-module-description {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .text-module-link {
    color: var(--theme-heading);
    font-size: 22px;
    width: 150px;
    cursor: pointer;
  }

  .text-module span {
    color: var(--theme-livedata1);
  }

  .module {
    border-radius: 15px;
    width: 100%;
    min-height: 300px;
    height: 30vh;
  }




  .info-module {
    width: 50%;
    height: 100%;
  }

  .info-module .left {
    text-align: right;
    padding: 0px 40px 0px 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

  }

  .info-module .right {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    justify-content: center;
    padding: 0px 60px 0px 30px;
  }


  .info-module-slogan {}

  .info-module-slogan span {
    color: var(--theme-livedata1);
    font-weight: 600;
  }


  .info-module-slogan h1 {
    color: var(--theme-heading);
    font-size: 50px;
    margin-top: 10px;
    line-height: 1.0;
  }

  .info-module-slogan h2 {
    color: var(--theme-heading);
    margin-top: -30px;
    max-width: 600px;
    font-weight: 300;
    font-size: 20px;
  }


  .links {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    margin-top: 0px;
    margin-bottom: 0px;
    gap: 15px;
    padding: 40px 40px;
  }

  .project-container {
    width: calc(100% - 80px);
    padding-top: 30px;
    padding: 0px 40px;
  }

  .project-container h3 {
    font-size: 30px;
    font-weight: 300;
  }


  .projects {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    gap: 0px;

  }





  .link-item {
    background: linear-gradient(180deg, rgba(255, 0, 100, 0.1) 0%, rgba(230, 230, 230, 1) 100%);
    height: 100px;
    padding: 10px;
    flex: 1 1 0;
    border-radius: 15px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .link-title {
    width: 100%;
  }

  .project-title {
    width: 100%;
    position: relative;
    color: black;
    font-size: 25px;
    font-weight: 600;
    margin-top: -150px;
    text-align: center;
    pointer-events: none;
  }

  .project-item {

    height: 190px;
    padding: 0px;
    flex: 1 1 0;
    width: 0;
    overflow: hidden;

  }

  .project-image {
    cursor: pointer;
    background-blend-mode: lighten;
    filter: blur(0.0rem);
    width: 120%;
    height: 120%;
    margin-top: -5px;
    margin-left: -20px;
    opacity: 0.3;
    transition: all 0.2s ease-in-out;
  }

  .project-image:hover {
    opacity: 0.8
  }

  .ocean {
    background: linear-gradient(180deg, rgba(00, 200, 250, 0.2) 0%, rgba(255, 240, 255, 1) 100%);

  }

  .pink {
    background: linear-gradient(180deg, rgba(255, 0, 200, 0.2) 0%, rgba(240, 240, 250, 1) 100%);

  }

  .yellow {
    background: linear-gradient(180deg, rgba(255, 255, 00, 0.2) 0%, rgba(210, 250, 230, 1) 100%);

  }

  .project-button{
    display:flex;
    margin-top:20px;
    flex-direction: row;
    align-items: center;
    justify-content:center;
  }

  .network {
    background-image: url(https://cylynx.imgix.net/uploads/graphvis_visjs.jpg?auto=format,compress);
    background-size: cover;
    background-position: 50%;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }

  .graph-wrapper {
    width: 100%;
    height: 300px;
    position: relative;
  }


  @media screen and (max-width: 900px) {
    .content {
      flex-direction: column;
      justify-content: left;
      width:auto;
    }

    .intro-space{
      width:calc(100% - 120px);
    }
   
    .text-module-link {
    width: 100%;
    text-align: center;
  }

  .contact-us{
    width:100%;
    margin-top:30px;
  }

    .info-module-slogan{
   width:100%;
  }

    .data-module {
      width: 100%;
      text-align: center;
    }

    .info-module {
      width: 80vw;
      text-align: left!important;
      justify-content: left;
      padding-left:40px;
    }
   

    .info-module .left {
      text-align: left;
      padding: 0px 20px 30px 20px;
      align-items: flex-start;
      width:100%;
    }

    .info-module .right {
      text-align: left;
      padding: 0px 20px 30px 20px;
    }

    .links {
      flex-direction: row;
      flex-wrap:wrap;
      padding: 20px 20px;
    }

    .project-container {
      width: 100%;
      padding: 0px 20px;
    }



  

    .buffer {
      padding: 20px 20px;
    }

    .link-item { 
   min-width:300px;
  }

  .projects {
    display: block;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    margin-top: 10px;
    gap: 0px;

  }

  .project-item {
    margin-bottom:20px;
padding: 0px;
flex: 1 1 0;
width: 100%;
border-radius:15px!important;
}
#footer{
  display:none;
}
.gu-logo{
  display:none;
}
.title-space {

    width: calc(90%);
 
  }
  }
</style>