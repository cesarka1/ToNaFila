<template>
  <div class="min-h-screen bg-[#E1DADA] flex justify-center items-center">
    <Title 
    :titles="[
      'Ajude seus clientes, crie uma fila totalmente auto-gerenciável!', 
      'A gente cuida da fila pois você já se irritou com ela um dia!'
    ]" 
    ::interval="3000" 
    />
    <div class="w-[400px] h-[500px] bg-[#98ACD5] rounded-lg flex flex-col justify-center items-center text-center p-4">
      <form class="w-full flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Nome da fila"
          class="w-[90%] p-2 rounded-full border-2 border-[#E1DADA] focus:outline-none focus:ring-2 focus:ring-zinc-50"
        />
        <select
          class="w-[90%] p-2 rounded-full border-2 border-[#E1DADA] focus:outline-none focus:ring-2 focus:ring-zinc-50 bg-white"
        >
          <option value="pediatria">Pediatria</option>
          <option value="oftalmo">Oftalmo</option>
          <option value="dentista">Dentista</option>
          <option value="banco">Banco</option>
          <option value="atendimento">Atendimento</option>
        </select>
        <select
          class="w-[90%] p-2 rounded-full border-2 border-[#E1DADA] focus:outline-none focus:ring-2 focus:ring-zinc-50 bg-white"
        >
          <option value="comum">Comum</option>
          <option value="preferencial">Preferencial</option>
        </select>
        <input
          type="number"
          placeholder="Máximo de pessoas na fila"
          class="w-[90%] p-2 rounded-full border-2 border-[#E1DADA] focus:outline-none focus:ring-2 focus:ring-zinc-50"
        />
        <button
          type="button"
          class="w-[90%] p-2 rounded-full bg-[#7297E0] text-zinc-50 font-bold hover:bg-zinc-50 hover:text-[#98ACD5] transition"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>
