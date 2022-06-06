<template>
  <canvas class="mask" ref="canvas"></canvas>
</template>

<script>
import L from "leaflet";

export default {
  props: {
    map: Object,
    event: Object,
    items: Array
  },
  watch: {
    event() {
      if (!this.event) {
        return;
      }
      this.draw();
    },
    map() {
      this.init();
    }
  },
  methods: {
    clear() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    draw() {
      if (!this.map) {
        return;
      }
      this.clear();
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const zoomLevel = this.map.getZoom();
      const isInView = center => {
        return this.map
          .getBounds()
          .pad(0.1)
          .contains(center);
      };
      if (zoomLevel < 13) {
        return;
      }
      this.items.forEach(item => {
        const center = L.latLng(item.pos);
        if (!isInView(center)) {
          return;
        }
        const pos = this.map.latLngToContainerPoint(center);
        ctx.fillStyle = "#000000";
        ctx.font = `bold ${zoomLevel - 3}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(item.text, pos.x, pos.y);
      });
    },
    init() {
      if (!this.map) {
        return;
      }
      const map = this.map;
      const canvas = this.$refs.canvas;
      const size = map.getSize();
      canvas.setAttribute("width", size.x);
      canvas.setAttribute("height", size.y);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
};
</script>

<style scoped>
.mask {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 20;
}
</style>
