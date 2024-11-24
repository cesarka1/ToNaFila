<script setup>
import { ref, onMounted, computed } from 'vue';
import { useNuxtApp } from '#app'; 
import { ref as dbRef, onValue } from 'firebase/database';
import CategoryBadge from '@/components/CategoryBadge.vue';
import QueueCard from '@/components/QueueCard.vue';

const categories = [
  { icon: '👶', text: 'Pediatria', type: 'medical' },
  { icon: '👁️', text: 'Oftalmo', type: 'medical' },
  { icon: '🦷', text: 'Dentista', type: 'medical' },
  { icon: '🏦', text: 'Banco', type: 'bank' },
  { icon: '⚖️', text: 'Jurídico', type: 'legal' },
  { icon: '💼', text: 'Atendimento', type: 'general' },
];


const queues = ref([]); 
const selectedCategory = ref('all'); 
const loading = ref(true); 
const error = ref(null);


const fetchQueues = async () => {
  try {
    const response = await fetch('https://tonafila.onrender.com/queue');
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    const data = await response.json();
    queues.value = data || [];
  } catch (err) {
    error.value = 'Erro ao carregar filas. Tente novamente mais tarde.';
    console.error('Erro ao buscar filas pela API:', err);
  } finally {
    loading.value = false;
  }
};

const setupRealtimeUpdates = () => {
  const { $database } = useNuxtApp(); 
  const queuesRef = dbRef($database, 'queues');
  onValue(queuesRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      queues.value = queues.value.map(queue => ({
        ...queue,
        ...data[queue.id],
      })).concat(
        Object.entries(data)
          .filter(([id]) => !queues.value.some(queue => queue.id === id))
          .map(([id, details]) => ({ id, ...details }))
      );
    }
  }, (error) => {
    console.error('Erro ao acessar Firebase Realtime Database:', error);
    error.value = 'Erro ao acessar atualizações em tempo real.';
  });
};

const filteredQueues = computed(() => {
  if (selectedCategory.value === 'all') return queues.value;
  return queues.value.filter(queue => queue.type === selectedCategory.value);
});

onMounted(() => {
  fetchQueues();
  setupRealtimeUpdates();
});
</script>

<template>
  <div class="min-h-screen bg-[#E1DADA] p-4">

    <h1 class="text-[#7297E0] font-black text-3xl pt-10">Encontre sua fila</h1>

    <div class="scroll-container overflow-x-auto py-4">
      <div class="flex items-center gap-2 min-w-max">
        <CategoryBadge 
          v-for="category in categories" 
          :key="category.text"
          :icon="category.icon"
          :text="category.text"
          :active="selectedCategory.value === category.type"
          @click="selectedCategory.value = category.type"
        />
      </div>
    </div>
    
    <!-- Título e botão "Ver todas" -->
    <div class="pt-6 mb-4 flex justify-between items-center">
      <h2 class="font-light text-xl text-zinc-900">Filas Disponíveis</h2>
      <button 
        class="text-[#7297E0] hover:underline"
        @click="selectedCategory.value = 'all'"
      >
        Ver todas
      </button>
    </div>
    
    <!-- Exibição de carregamento ou erro -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7297E0]"></div>
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>
    
    <!-- Lista de filas -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <QueueCard 
        v-for="queue in filteredQueues" 
        :key="queue.id" 
        :queue="queue" 
      />
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
