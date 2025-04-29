<template>
  <div ref="graphContainer" class="w-full h-full relative"></div>
</template>

<script>
import ForceGraph from 'force-graph';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as d3 from 'd3';

export default {
  name: 'ForceGraph2D',
  setup() {
    const graphContainer = ref(null);
    let graphInstance = null;
    let resizeObserver = null;

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
      const themeColor1 = getComputedStyle(document.documentElement).getPropertyValue('--theme-livedata1').trim() || '#f194b8';
      const themeColor2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-livedata2').trim() || '#9b8bf4';

      const interpolator = d3.interpolateRgb(themeColor1, themeColor2);

      const groupList = [...new Set(data.nodes.map(n => n.group))];
      const groupColors = {};

      groupList.forEach((group, index) => {
        const factor = groupList.length <= 1 ? 0 : index / (groupList.length - 1);
        groupColors[group] = interpolator(factor);
      });

      graphInstance = ForceGraph()(graphContainer.value)
        .graphData(data)
        .nodeId('id')
        .nodeLabel('id')
        .nodeColor(node => groupColors[node.group] || '#cccccc')
        .linkDirectionalArrowLength(0)
        .linkDirectionalArrowRelPos(0);

      // ResizeObserver to watch for div size changes
      resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          graphInstance.width(width);
          graphInstance.height(height);
        }
      });

      resizeObserver.observe(graphContainer.value);
    });

    onBeforeUnmount(() => {
      if (resizeObserver && graphContainer.value) {
        resizeObserver.unobserve(graphContainer.value);
      }
    });

    return { graphContainer };
  }
};
</script>

<style scoped>
.w-full.h-full.relative {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
