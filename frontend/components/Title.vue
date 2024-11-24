<template>
    <h1 class="text-[#7297E0] font-bold text-3xl">{{ currentTitle }}</h1>
  </template>
  
  <script>
  export default {
    props: {
      titles: {
        type: Array,
        required: true,
      },
      interval: {
        type: Number,
        default: 3000,
      },
    },
    data() {
      return {
        currentTitle: this.titles[0],
        titleIndex: 0,
      };
    },
    methods: {
      updateTitle() {
        this.titleIndex = (this.titleIndex + 1) % this.titles.length;
        this.currentTitle = this.titles[this.titleIndex];
      },
    },
    mounted() {
      setInterval(this.updateTitle, this.interval);
    },
  };
  </script>

  