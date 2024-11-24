<script setup>
defineProps({
  icon: String,
  text: String,
  active: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button 
    class="px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
    :class="active ? 'bg-[#7297E0] text-white' : 'bg-white text-zinc-700 hover:bg-[#7297E0] hover:text-white'"
  >
    <span>{{ icon }}</span>
    <span class="font-medium">{{ text }}</span>
  </button>
</template>
