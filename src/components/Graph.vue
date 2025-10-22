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
      .nodeRelSize(8)
      .enableNodeDrag(true)
      .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
      })

      //add text 
      .nodeCanvasObjectMode(() => 'after') // 👈 ensures labels are drawn AFTER all nodes
      .nodeCanvasObject((node, ctx, globalScale) => {
        ctx.save();

        const label = node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const nodeRelSize = 8;
        const r = Math.cbrt(node.val || 1) * nodeRelSize;
        const offset = r + 10 / globalScale; // further away from node

        // text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(label, node.x, node.y + offset);

        // improve contrast
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.4 / globalScale;
        ctx.strokeText(label, node.x, node.y + offset);

        ctx.restore();
      })

      
      .nodePointerAreaPaint((node, color, ctx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI, false); // << larger hit area
        ctx.fill();
      })
      .linkWidth(2)
      .linkColor(() => '#aaa')
      .linkDirectionalArrowLength(0)
      .linkDirectionalArrowRelPos(0)

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
    pointer-events: auto;
  }
</style>