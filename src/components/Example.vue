<template>
  <div class="wrapper">
    <div class="map" ref="map"></div>
    <MaskCanvas :event="event" :map="map" :items="items"/>
  </div>
</template>

<script>
import { L, CreateMap } from "../utils/map";
import MaskCanvas from "./MaskCanvas";

export default {
  components: {
    MaskCanvas
  },
  data() {
    return {
      map: null,
      event: null
    };
  },
  computed: {
    items() {
      const list = [];
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          list.push({
            pos: [23.065437 + 0.002 * i, 113.5728853 + 0.002 * j],
            text: `${i * 20 + j}`
          });
        }
      }
      return list;
    }
  },
  mounted() {
    this.map = CreateMap(this.$refs.map, {
      zoomSnap: 0.2
    });
    this.map.on("drag", ev => {
      this.event = ev;
    });
    this.map.on("zoom", ev => {
      this.event = ev;
    });
    const group = L.featureGroup();
    this.items.forEach(item => {
      const layer = L.marker(item.pos, {
        icon: L.divIcon({
          html: `<div style="font-size: 15px;font-weight: bold;color: #fff;">${
            item.text
          }</div>`,
          className: ""
        })
      });
      group.addLayer(layer);
    });
    // group.addTo(this.map);
    this.map.fitBounds(group.getBounds());
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.map {
  position: relative;
  height: 100%;
  z-index: 10;
}
</style>
