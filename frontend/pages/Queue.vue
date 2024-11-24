<template>
  <div class="min-h-screen bg-[#E1DADA] flex justify-center items-center">
    <div class="w-[400px] h-[400px] bg-[#98ACD5] rounded-lg flex flex-col justify-center items-center text-center">
      <p class="text-zinc-50 font-bold mb-12">Quantidade atual de pessoas nessa fila: 32</p>

      <div v-if="activeButton === 'join'" class="mb-8">
        <p class="text-zinc-50 font-medium">Sua posição na fila: 2</p>
        <p class="text-zinc-50 font-medium">Pessoas na sua frente: 1</p>
      </div>

      <div class="flex gap-4">
        <button
          v-if="!activeButton || activeButton === 'leave'"
          class="w-[140px] h-[40px] bg-[#6B8ED3] rounded-md text-center flex items-center justify-center font-light text-zinc-50 hover:bg-[#5A7BBF]"
          @click="activateButton('join')"
        >
          ENTRE NA FILA
        </button>

        <button
          v-if="activeButton === 'join'"
          class="w-[140px] h-[40px] bg-[#6B8ED3] rounded-md text-center flex items-center justify-center font-light text-zinc-50 hover:bg-[#5A7BBF]"
          @click="activateButton('leave')"
        >
          SAIR DA FILA
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeButton: null,
    };
  },
  methods: {
    activateButton(button) {
      this.activeButton = button;
    },
  },
};
</script>
