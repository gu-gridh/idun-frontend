<template>
  <div class="graph-wrapper" :class="{ 'graph-wrapper--fullscreen': isFullscreen }">
    <button type="button" class="graph-fullscreen-btn" @click="toggleFullscreen">
      <img class="graph-fullscreen-btn__icon" :src="isFullscreen ? iconUrls.compress : iconUrls.expand" alt="" />
    </button>
    <div ref="graphContainer"
      :class="['w-full h-full relative graph-container', { 'graph-container--fullscreen': isFullscreen }]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ForceGraph from 'force-graph';
import * as d3 from 'd3';

const graphContainer = ref(null);
const isFullscreen = ref(false);
const iconUrls = {
  expand: 'https://data.dh.gu.se/ui-icons/expand_white.svg',
  compress: 'https://data.dh.gu.se/ui-icons/compress_white.svg'
};
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

  graphData.nodes.forEach(node => {
    node.degree = graphData.links.filter(
      l => l.source === node.id || l.target === node.id
    ).length;
  });

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

    // Comment out to remove label on hover
    //.nodeLabel(node => node.id)
    .nodeColor(node => groupColors[node.group] || '#cccccc')
    .nodeRelSize(8)
    .nodeVal(node => (node.degree || 0) + 1)
    .enableNodeDrag(true)
    .onNodeDragEnd(node => {
      node.fx = node.x;
      node.fy = node.y;
    })

    .d3Force('charge', d3.forceManyBody().strength(-250)) //repulsion + attraction of nodes
    .d3Force('link', d3.forceLink().distance(180)) //spacing between nodes
    .nodeCanvasObjectMode(() => 'after')
    .nodeCanvasObject((node, ctx, globalScale) => {
      const label = node.id;
      const fontSize = (12 + (node.degree || 0)) / globalScale;
      const paddingX = 8 / globalScale;
      const paddingY = 4 / globalScale;

      ctx.save();
      ctx.font = `${fontSize}px 'Barlow Condensed', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const nodeRelSize = 8;
      const r = Math.cbrt((node.degree || 0) + 1) * nodeRelSize;
      const y = node.y - (r + (fontSize + paddingY * 6) / 2);

      const textWidth = ctx.measureText(label).width;
      const boxWidth = textWidth + paddingX * 2;
      const boxHeight = fontSize + paddingY * 2;
      const boxX = node.x - boxWidth / 2;
      const boxY = y - boxHeight / 2;
      const radius = 6 / globalScale;
      const curvatureMinMax = 0.5;

      ctx.fillStyle = '#ffffff90'; //background color
      ctx.strokeStyle = groupColors[node.group] || '#aaa';
      ctx.lineWidth = 0.5 / globalScale;


      //draw rounded edges
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, radius);
      ctx.fill();
      //ctx.stroke();

      ctx.fillStyle = '#999'; //text color
      ctx.fillText(label, node.x, y);

      ctx.restore();
    })

    .nodePointerAreaPaint((node, color, ctx) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 22, 0, 2 * Math.PI, false); // << larger hit area
      ctx.fill();
    })
    .linkWidth(0.5)
    .linkColor(() => '#aaa')
    .linkDirectionalArrowLength(0)
    .linkDirectionalArrowRelPos(0)
    // .linkDirectionalParticles(1)
    // .linkDirectionalParticleWidth(2.5)
    .linkCurvature(-0.3)
    .onNodeClick(node => {
      // Center/zoom on node
      graphInstance.centerAt(node.x, node.y, 1000);
      graphInstance.zoom(1.0, 1000);
    });


  //resize handler
  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      graphInstance?.width(width).height(height);

      const canvas = graphContainer.value?.querySelector('canvas');
      if (canvas) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
    }

  });

  resizeObserver.observe(graphContainer.value);
  graphInstance.zoom(0.5, 2000);
});

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  document.body.classList.toggle('graph-fullscreen-active', isFullscreen.value);
  requestAnimationFrame(() => {
    if (!graphContainer.value || !graphInstance) return;
    const { width, height } = graphContainer.value.getBoundingClientRect();
    graphInstance.width(width).height(height);
  });
};

onBeforeUnmount(() => {
  document.body.classList.remove('graph-fullscreen-active');
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

.graph-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.graph-wrapper--fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  border-radius: 0;
  z-index: 999;
}

.graph-container--fullscreen {
  border-radius: 0;
}

.graph-fullscreen-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  color: #1b1c24;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.graph-fullscreen-btn:hover {
  background: #ffffff;
  transform: scale(1.05);
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
  pointer-events: auto;
}

:global(body.graph-fullscreen-active) {
  overflow: hidden;
}

.graph-fullscreen-btn__icon {
  width: 20px;
  height: 20px;
  display: block;
  filter: brightness(0) saturate(100%);
}
</style>