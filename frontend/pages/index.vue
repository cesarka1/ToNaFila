<template>
    <div class="min-h-screen bg-[#E1DADA] p-4">
      <h1 class="text-[#7297E0] font-black text-3xl pt-10">Encontre sua fila</h1>
      
       <div class="flex items-center flex-row gap-2">
         <Badge icon="👶" text="Pediatria" />
         <Badge icon="👁️" text="Oftalmo" />
         <Badge icon="🦷" text="Dentista" />
         <Badge icon="🤸‍♂️" text="Esporte" />
       </div>
      
      <div class="pt-6 mb-4">
        <h1 class="font-light text-xl text-zinc-900">Popular</h1>
      </div>
      
      <div class="space-y-4">
        <NuxtLink to="/Queue">
        <div class="w-[400px] h-[220px] bg-[#98ACD5] rounded-lg overflow-hidden">
          <img class="w-full h-[100px] object-cover" src="../public/image-1.png" alt="Imagem do consultório">
          <div class="p-4">
            <h2 class="text-lg font-bold text-zinc-50">MedGrandma</h2>
            <p class="text-sm text-zinc-700">Ambulatório</p>
            <div class="flex justify-between items-center mt-4">
              <div class="w-[105px] h-[30px] bg-[#6B8ED3] rounded-full text-center flex items-center justify-center text-sm text-zinc-50 font-bold">7h - 12h</div>
              <span class="text-sm text-zinc-700">Preferencial</span>
            </div>
          </div>
        </div>
      </NuxtLink>
  
        <div class="w-[400px] h-[220px] bg-[#98ACD5] rounded-lg overflow-hidden">
          <img class="w-full h-[100px] object-cover" src="../public/image-1.png" alt="Imagem do consultório">
          <div class="p-4">
            <h2 class="text-lg font-bold text-zinc-50">Saúde Mil</h2>
            <p class="text-sm text-zinc-700">Ambulatório</p>
            <div class="flex justify-between items-center mt-4">
              <div class="w-[105px] h-[30px] bg-[#6B8ED3] rounded-full text-center flex items-center justify-center text-sm text-zinc-50 font-bold">7h - 12h</div>
              <span class="text-sm text-zinc-700">Comum</span>
            </div>
          </div>
        </div>
  
        <div class="w-[400px] h-[220px] bg-[#98ACD5] rounded-lg overflow-hidden">
          <img class="w-full h-[100px] object-cover" src="../public/image-1.png" alt="Imagem do consultório">
          <div class="p-4">
            <h2 class="text-lg font-bold text-zinc-50">VidaClinic</h2>
            <p class="text-sm text-zinc-700">Ambulatório</p>
            <div class="flex justify-between items-center mt-4">
              <div class="w-[105px] h-[30px] bg-[#6B8ED3] rounded-full text-center flex items-center justify-center text-sm text-zinc-50 font-bold">7h - 12h</div>
              <span class="text-sm text-zinc-700">Preferencial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  