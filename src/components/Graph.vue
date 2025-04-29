<template>
  <div ref="graphContainer" class="w-full h-full relative graph-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ForceGraph from 'force-graph';
import * as d3 from 'd3';

const graphContainer = ref(null);
let graphInstance = null;
let resizeObserver = null;

const fetchGraphData = async () => {
  const response = await fetch('/force_graph.json');
  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }
  return await response.json();
};

onMounted(async () => {
  if (!graphContainer.value) return;

  const themeColor1 = getComputedStyle(document.documentElement).getPropertyValue('--theme-livedata1').trim() || '#f194b8';
  const themeColor2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-livedata2').trim() || '#9b8bf4';
  const interpolator = d3.interpolateRgb(themeColor1, themeColor2);

  const graphData = await fetchGraphData();

  const groupList = [...new Set(graphData.nodes.map(n => n.group))];
  const groupColors = {};
  groupList.forEach((group, index) => {
    const factor = groupList.length <= 1 ? 0 : index / (groupList.length - 1);
    groupColors[group] = interpolator(factor);
  });

  graphInstance = ForceGraph()(graphContainer.value)
  .graphData(graphData)
  // .width(graphContainer.value.clientWidth)
  // .height(graphContainer.value.clientHeight)
  .nodeId('id')
  .nodeLabel(node => node.id)
  .nodeColor(node => groupColors[node.group] || '#cccccc')
  .nodeRelSize(6)
  .enableNodeDrag(true)
  .onNodeDragEnd(node => {
    node.fx = node.x;
    node.fy = node.y;
  })
  .linkWidth(2)
  .linkColor(() => '#aaa')
  .linkDirectionalArrowLength(0)
  .linkDirectionalArrowRelPos(0)

  // .nodeCanvasObject((node, ctx, globalScale) => {
  //   const label = node.id;
  //   const fontSize = 10 / globalScale;
  //   ctx.font = `${fontSize}px Sans-Serif`;
  //   ctx.fillStyle = groupColors[node.group] || '#444';
  //   ctx.textAlign = 'center';
  //   ctx.textBaseline = 'top';
  //   ctx.fillText(label, node.x, node.y + 8);
  // });
    
  // Resize handler
  resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    graphInstance?.width(width).height(height);

    // ⬇️ set canvas size explicitly
    const canvas = graphContainer.value?.querySelector('canvas');
    if (canvas) {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
  }
});

  resizeObserver.observe(graphContainer.value);
});


onBeforeUnmount(() => {
  if (resizeObserver && graphContainer.value) {
    resizeObserver.unobserve(graphContainer.value);
  }
});
</script>

<style scoped>
.w-full.h-full.relative {
  width: 100%;
  height: 100%;
}

.graph-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.graph-container canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  max-height: 100%;
  pointer-events: auto ;
}

</style>
