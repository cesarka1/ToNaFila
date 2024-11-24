<template>
  <div class="mt-4 flex items-center gap-2">
    <div
      class="w-[110px] h-[30px] bg-[#6B8ED3] rounded-full text-center mt-2 flex items-center justify-center font-light text-zinc-50"
    >
      {{ icon }}
      {{ "" }}
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  icon: string;
}>();
</script>
