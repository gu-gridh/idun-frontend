<template>
  <div class="container">

    <!---- will fetch 3 page blocks from Omeka S API -->
    <div class="content">
      <div class="row grey-gradient">
        <div class="info-module">
          <div class="info-module-slogan left">
            <div class="text-module-title">Application Experts</div>
            <h1>So many projects!</h1>
            <h2>GRIDH has to date been involved in more than <span>{{ projectsNum }}</span> research projects, and helped gather more
              than <span>{{ totFunding }} million</span> in funding.</h2>
              <div class="text-module-link hoverable" style="width:150px;">Contact us and start a project</div>
            <span v-html="redData1.html"></span>
          </div>
        </div>
        <div class="data-module">
          <div class="text-module">
            <div class="text-module-title">Projects </div>
            <div class="text-module-data"><router-link to="/active"> <span class="livedata-pulse">8</span> active projects</router-link> </div>
            <div class="text-module-description">Active projects info text </div>

            <div class="text-module-data"><router-link to="/tools"> <span class="livedata-pulse">{{ toolsNum }}</span> portals and tools </router-link> </div>
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
            <div class="module hoverable theme-gradient-1 graph-wrapper">
              <Graph/>
            </div>
          </div>
        </div>
        <div class="info-module">
          <div class="info-module-slogan right">
            <div class="text-module-title">University wide support</div>
            <h1>Collaborations</h1>
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
            <div class="module hoverable theme-gradient-1">
              <Map/>
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
                <img src="@/assets/githubLogo.png" alt="github logo" style="width: 150px;"/>
              </a>
          </div>
          </div>
        </div>
        <!-- Active projects --> <!-- should be marked out in database -->
        <div class="project-container">
          <h3>Aktuella projekt</h3>
          <div class="projects">
            <div class="project-item ocean" style="border-radius:10px 0 0 10px">
              <div class="link-title">
              Aktiva projekt
            </div>
            </div>
            <div class="project-item pink">
              <div class="link-title">
              Aktiva projekt
            </div>
            </div>
            <div class="project-item yellow" style="border-radius:0px 10px 10px 0px">
              <div class="link-title">
              Aktiva projekt
            </div>
            </div>
          </div>
        </div>
      </div>
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

  .hoverable{
    transition: all 0.2s ease-in-out;
  }

  .hoverable:hover{
transform:scale(1.03);
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
    color:var(--theme-heading);
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
    color:var(--theme-heading);
    font-size: 22px;
    width:150px;
    cursor:pointer;
  }

  .text-module span {
    color:var(--theme-livedata1);
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
    padding: 0px 40px 30px 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .info-module .right {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    padding: 0px 60px 30px 30px;
  }


  .info-module-slogan {

  }

  .info-module-slogan span {
    color:var(--theme-livedata1);
    font-weight:600;
  }


  .info-module-slogan h1 {
    color:var(--theme-heading);
    font-size: 50px;
    margin-top: 10px;
    line-height: 0.85;
  }

  .info-module-slogan h2 {
    color:var(--theme-heading);
    margin-top: -20px;
    max-width: 600px;
    font-weight:300;
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
   font-weight:300;
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
    text-align:center;
    display:flex;
    flex-direction: row;
    align-items: center;
  }

  .link-title {
   width:100%;
  }

  .project-item {
    text-align:center;
    display:flex;
    flex-direction: row;
    align-items: center;
    height: 190px;
    padding: 10px;
    flex: 1 1 0;
    width: 0;
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

  .network{
   background-image:url(https://cylynx.imgix.net/uploads/graphvis_visjs.jpg?auto=format,compress); 
   background-size: cover; 
   background-position: 50%;
   width:100%;
   height:100%;
   opacity:0.6;
  }

  .graph-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
}


  @media screen and (max-width: 800px) {
    .content {
      flex-direction: column;
    }
    .data-module {
      width: 100%;
    }
    .info-module {
      width: 100%;
    }

    .info-module .left {
      text-align: left;
      padding: 0px 20px 30px 20px;
    }
    .info-module .right {
      text-align: left;
      padding: 0px 20px 30px 20px;
    }

    .links {
      flex-direction: row;
      padding: 20px 20px;
    }
    .project-container {
      width: 100%;
      padding: 0px 20px;
    }
    .project-item {
      height: 150px;
    }
    .buffer {
      padding: 20px 20px;
    }

    
  }

</style>