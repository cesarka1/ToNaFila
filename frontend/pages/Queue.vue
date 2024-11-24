<template>
  <div class="min-h-screen bg-[#E1DADA] p-4 flex justify-center items-center">
    <div
      class="w-[400px] h-[400px] bg-[#98ACD5] rounded-lg flex justify-center items-center"
    >
      <button
        @click="sendPostRequest"
        class="w-[140px] h-[40px] bg-[#6B8ED3] rounded-md text-center mt-2 flex items-center justify-center font-light text-zinc-50"
      >
        ENTRE NA FILA
      </button>
    </div>
  </div>
</template>

<script setup lang="js">
document.addEventListener("DOMContentLoaded", () => {
    const { createApp } = Vue;
    const app = createApp({
      data() {
        return {
          queueDetails: { 
            userCount: 0
          },
          userPosition: null,
          usersAhead: 0,
          queueId: "-OCMULlETgaThP7CzdXT",
        };
      },
      methods: {
        // Atualiza os detalhes da fila
        async updateQueueDetails() {
          try {
            const response = await fetch(`https://tonafila.onrender.com/queues/${this.queueId}`);
            const data = await response.json();
            this.queueDetails.userCount = data.userCount;
            
            // Se o usuário está na fila, atualiza sua posição
            const uid = localStorage.getItem("queueUid");
            if (uid) {
              const position = data.users.findIndex(user => user.uid === uid);
              if (position !== -1) {
                this.userPosition = position + 1;
                this.usersAhead = position; // Quantidade de pessoas na frente
              }
            }
          } catch (error) {
            console.error("Erro ao atualizar detalhes da fila:", error);
          }
        },
  
        // Listener em tempo real para monitorar alterações na fila
        listenToQueue() {
          const queueRef = db.ref(`queues/${this.queueId}`);
          
          queueRef.on("value", async (snapshot) => {
            const queueData = snapshot.val();
            if (!queueData) return;
  
            const users = queueData.users || {};
            this.queueDetails.userCount = Object.keys(users).length;
  
            const uid = localStorage.getItem("queueUid");
            if (uid && users) {
              const usersList = Object.entries(users)
                .map(([key, user]) => ({
                  ...user,
                  key
                }))
                .sort((a, b) => a.joinedAt - b.joinedAt);
  
              const position = usersList.findIndex(user => user.uid === uid);
              if (position !== -1) {
                this.userPosition = position + 1;
                this.usersAhead = position;
              } else {
                this.userPosition = null;
                this.usersAhead = 0;
              }
            } else {
              this.userPosition = null;
              this.usersAhead = 0;
            }
          });
        },
  
        // Adicionar o usuário à fila
        async joinQueue() {
          try {
            const storedUid = localStorage.getItem("queueUid");
            const uid = storedUid || `user-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
            
            if (!storedUid) {
              localStorage.setItem("queueUid", uid);
            }
  
            const response = await fetch(
              `https://tonafila.onrender.com/queues/${this.queueId}/users`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                  uid, 
                  name: "Usuário Anônimo",
                  joinedAt: Date.now() 
                }),
              }
            );
  
            const data = await response.json();
  
            if (response.ok) {
              if (data.message === "Usuário já está na fila.") {
                alert("Você já está na fila!");
              } else {
                this.userPosition = data.position;
                this.usersAhead = data.position - 1;
                await this.updateQueueDetails();
                alert(`Você entrou na fila! Sua posição é: ${data.position}`);
              }
            } else {
              alert(data.error || "Erro ao entrar na fila.");
            }
          } catch (error) {
            console.error("Erro ao entrar na fila:", error);
            alert("Erro ao entrar na fila. Tente novamente.");
          }
        },
  
        // Remover o usuário da fila
        async leaveQueue() {
          try {
            const uid = localStorage.getItem("queueUid");
            if (!uid) {
              alert("Você não está na fila.");
              return;
            }
  
            const response = await fetch(
              `https://tonafila.onrender.com/queues/${this.queueId}/users/${uid}`,
              {
                method: "DELETE",
              }
            );
  
            const data = await response.json();
  
            if (response.ok) {
              this.userPosition = null;
              this.usersAhead = 0;
              await this.updateQueueDetails();
              alert("Você saiu da fila.");
            } else {
              alert(data.error || "Erro ao sair da fila.");
            }
          } catch (error) {
            console.error("Erro ao sair da fila:", error);
            alert("Erro ao sair da fila. Tente novamente.");
          }
        },
      },
      mounted() {
        this.listenToQueue();
        this.updateQueueDetails();
      },
      template: `
        <div>
          <h1>Detalhes da Fila</h1>
          <p>Quantidade total de pessoas na fila: {{ queueDetails.userCount }}</p>
          <template v-if="userPosition !== null">
            <p>Sua posição na fila: {{ userPosition }}</p>
            <p>Pessoas na sua frente: {{ usersAhead }}</p>
          </template>
          <p v-else>Você ainda não entrou na fila.</p>
          <button @click="joinQueue" v-if="userPosition === null">Entrar na Fila</button>
          <button @click="leaveQueue" v-if="userPosition !== null">Sair da Fila</button>
        </div>
      `,
    });
  
    app.mount("#app");
  });
</script>