<template>
    <div ref="graphContainer" class="w-full h-full"></div>
  </template>
  
  <script>
  import ForceGraph from 'force-graph';
  import { onMounted, ref } from 'vue';
  
  export default {
    name: 'ForceGraph2D',
    props: {
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 400
      }
    },
    setup(props) {
      const graphContainer = ref(null);
  
      const data = {
        nodes: [
          { id: 'GRIDH', group: 'central' },
          { id: 'University of Knowledge', group: 'university' },
          { id: 'City Museum', group: 'museum' },
          { id: 'Science Academy', group: 'university' },
          { id: 'Art Museum', group: 'museum' },
          { id: 'History University', group: 'university' },
          { id: 'Modern Art Center', group: 'museum' },
          { id: 'Global University', group: 'university' },
          { id: 'National Museum', group: 'museum' },
          { id: 'Innovation Hub', group: 'university' },
          { id: 'Heritage Museum', group: 'museum' }
        ],
        links: [
          { source: 'GRIDH', target: 'University of Knowledge' },
          { source: 'GRIDH', target: 'City Museum' },
          { source: 'GRIDH', target: 'Science Academy' },
          { source: 'GRIDH', target: 'Art Museum' },
          { source: 'GRIDH', target: 'History University' },
          { source: 'GRIDH', target: 'Modern Art Center' },
          { source: 'GRIDH', target: 'Global University' },
          { source: 'GRIDH', target: 'National Museum' },
          { source: 'GRIDH', target: 'Innovation Hub' },
          { source: 'GRIDH', target: 'Heritage Museum' }
        ]
      };
  
      onMounted(() => {
        ForceGraph()(graphContainer.value)
          .width(props.width)
          .height(props.height)
          .graphData(data)
          .nodeId('id')
          .nodeLabel('id')
          .nodeAutoColorBy('group')
          .linkDirectionalArrowLength(5)
          .linkDirectionalArrowRelPos(1);
      });
  
      return { graphContainer };
    }
  };
  </script>
  
  <style scoped>
  .w-full.h-full {
    width: 100%;
    height: 100%;
  }
  </style>
  