<template>
  <!-- <g>
    <svg :y="y + 55">
      <rect
        :fill="fill"
        ref="handle"
        x="0"
        y="0"
        rx="3"
        ry="3"
        width="10"
        height="10"
        @mouseenter="enter"
        @mouseleave="leave"
        @mousedown="startDragNewLink"
        @mouseup="mouseup"
      />
      <text x="12" y="9" font-size="8pt" fill="#000000">{{name}}</text>
    </svg>
  </g>-->
  <g>
    <svg :y="y + 55" v-if="type === PORT_TYPE.IN">
      <rect
        :fill="fill"
        ref="handle"
        x="0"
        y="0"
        rx="3"
        ry="3"
        width="10"
        height="10"
        @mouseenter="enter"
        @mouseleave="leave"
        @mousedown="startDragNewLink"
        @mouseup="mouseup"
      />
      <text x="12" y="9" font-size="8pt" fill="#000000">{{name}}</text>
    </svg>
    <svg :y="y + 55" v-else>
      <rect
        :fill="fill"
        ref="handle"
        :x="nodeWidth"
        y="0"
        rx="3"
        ry="3"
        width="10"
        height="10"
        @mouseenter="enter"
        @mouseleave="leave"
        @mousedown="startDragNewLink"
        @mouseup="mouseup"
      />
      <text :x="nodeWidth - 6" y="9" text-anchor="end" font-size="8pt" fill="#000000">{{name}}</text>
    </svg>
  </g>
</template>
<script>
import { PORT_TYPE } from "../constant";

export default {
  name: "DiagramPort",
  props: ["id", "y", "type", "name", "nodeWidth", "nodeIndex"],
  data() {
    return {
      PORT_TYPE,
      fill: "#606266"
    };
  },
  methods: {
    mouseup() {
      this.$emit("mouseUpPort", this.id);
    },

    enter() {
      this.fill = "#E6A23C";
    },

    leave() {
      this.fill = "#606266";
    },
    startDragNewLink() {
      this.$emit("onStartDragNewLink", this.id);
    }
  }
};
</script>
