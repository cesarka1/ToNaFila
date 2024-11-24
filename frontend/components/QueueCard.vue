<script setup>
const props = defineProps({
  queue: {
    type: Object,
    required: true
  }
});

const userCount = computed(() => {
  return props.queue.users ? Object.keys(props.queue.users).length : 0;
});

const getTypeColor = (type) => {
  const colors = {
    'medical': '#98ACD5',
    'bank': '#95D5A6',
    'legal': '#D595D1'
  };
  return colors[type] || '#98ACD5';
};

const getTypeImage = (type) => {
  const images = {
    'medical': '/medical-bg.png',
    'bank': '/bank-bg.jpg',
    'legal': '/legal-bg.png'
  };
  return images[type] || '/default-bg.jpg';
};
</script>

<template>
  <NuxtLink :to="`/queue`" class="block transform hover:scale-105 transition-transform">
    <div 
      class="w-full md:w-[400px] h-[220px] rounded-lg overflow-hidden shadow-lg"
      :style="{ backgroundColor: getTypeColor(queue.type) }"
    >
      <img 
        class="w-full h-[100px] object-cover"
        :src="getTypeImage(queue.type)"
        :alt="queue.name || 'Fila'"
      >
      <div class="p-4">
        <h2 class="text-lg font-bold text-zinc-50">{{ queue.name || 'Nome Indisponível' }}</h2>
        <p class="text-sm text-zinc-700">{{ queue.description || 'Sem descrição' }}</p>
        <div class="flex justify-between items-center mt-4">
          <div 
            class="px-4 py-1 bg-opacity-80 rounded-full text-center flex items-center justify-center text-sm text-zinc-50 font-bold"
            :style="{ backgroundColor: getTypeColor(queue.type) }"
          >
            {{ queue.schedule || 'Horário não definido' }}
          </div>
          <span class="text-sm text-zinc-700">
            {{ userCount }} pessoa{{ userCount !== 1 ? 's' : '' }} na fila
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
