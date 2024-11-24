<template>
  <div class="min-h-screen bg-[#E1DADA] p-4">
    <!-- Header com botão de voltar -->
    <div class="max-w-2xl mx-auto mb-6">
      <button
        @click="$router.push('/')"
        class="flex items-center gap-2 text-[#7297E0] hover:text-[#5A7BBF] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Voltar para filas
      </button>
    </div>

    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Header do card -->
        <div class="bg-[#98ACD5] p-6">
          <h1 class="text-2xl font-bold text-white mb-2">
            {{ queueDetails.name || "Fila de Atendimento" }}
          </h1>
          <p class="text-white/80">{{ formatDateTime }}</p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="text-sm text-gray-500 mb-1">Total na fila</p>
              <p class="text-2xl font-bold text-[#7297E0]">
                {{ queueDetails.userCount }}
              </p>
            </div>

            <div v-if="isInQueue" class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="text-sm text-gray-500 mb-1">Sua posição</p>
              <p class="text-2xl font-bold text-[#7297E0]">
                #{{ userPosition }}
              </p>
            </div>

            <div v-if="isInQueue" class="bg-gray-50 p-4 rounded-lg text-center">
              <p class="text-sm text-gray-500 mb-1">Pessoas à frente</p>
              <p class="text-2xl font-bold text-[#7297E0]">{{ usersAhead }}</p>
            </div>
          </div>

          <div v-if="isInQueue" class="mb-8">
            <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 class="text-sm font-medium text-blue-800 mb-1">
                Tempo estimado de espera
              </h3>
              <p class="text-blue-600">{{ calculateEstimatedTime }} minutos</p>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="font-medium text-gray-700 mb-4">Pessoas na fila</h3>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <div
                v-for="(user, index) in sortedUsers"
                :key="user.key"
                class="flex items-center justify-between p-3 rounded-lg"
                :class="[
                  user.uid === currentUid
                    ? 'bg-blue-50 border border-blue-100'
                    : 'bg-gray-50',
                ]"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="w-6 h-6 flex items-center justify-center rounded-full bg-[#98ACD5] text-white text-sm"
                  >
                    {{ index + 1 }}
                  </span>
                  <span :class="{ 'font-medium': user.uid === currentUid }">
                    {{ user.uid === currentUid ? "Você" : user.name }}
                  </span>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatTime(user.joinedAt) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-4">
            <button
              v-if="!isInQueue"
              @click="joinQueue"
              :disabled="loading"
              class="px-6 py-3 bg-[#7297E0] text-white rounded-lg font-medium hover:bg-[#5A7BBF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span
                v-if="loading"
                class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              ></span>
              {{ loading ? "Entrando..." : "Entrar na Fila" }}
            </button>

            <button
              v-if="isInQueue"
              @click="leaveQueue"
              :disabled="loading"
              class="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span
                v-if="loading"
                class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
              ></span>
              {{ loading ? "Saindo..." : "Sair da Fila" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="notification.show"
      class="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg p-4 animate-fade-in"
      :class="{
        'border-l-4 border-green-500': notification.type === 'success',
        'border-l-4 border-red-500': notification.type === 'error',
      }"
    >
      <div class="flex items-center gap-3">
        <svg
          v-if="notification.type === 'success'"
          class="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          v-else
          class="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p>{{ notification.message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  push,
  remove,
  get,
} from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const currentUid = ref(null);
    const queueDetails = ref({
      userCount: 0,
      name: "",
      users: [],
    });
    const userPosition = ref(null);
    const usersAhead = ref(0);
    const isInQueue = ref(false);
    const sortedUsers = ref([]);
    const notification = ref({
      show: false,
      message: "",
      type: "success",
    });

    const showNotification = (message, type = "success") => {
      notification.value = {
        show: true,
        message,
        type,
      };
      setTimeout(() => {
        notification.value.show = false;
      }, 3000);
    };

    const formatDateTime = computed(() => {
      return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date());
    });

    const calculateEstimatedTime = computed(() => {
      // Estimativa básica: 5 minutos por pessoa na frente
      return usersAhead.value * 5;
    });

    const formatTime = (timestamp) => {
      return new Intl.DateTimeFormat("pt-BR", {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(timestamp));
    };

    const updateQueueData = (snapshot) => {
      const users = snapshot.val();
      if (users) {
        const userList = Object.entries(users)
          .map(([key, user]) => ({
            ...user,
            key,
          }))
          .sort((a, b) => a.joinedAt - b.joinedAt);

        sortedUsers.value = userList;
        queueDetails.value.userCount = userList.length;

        const position = userList.findIndex(
          (user) => user.uid === currentUid.value
        );
        if (position !== -1) {
          userPosition.value = position + 1;
          usersAhead.value = position;
          isInQueue.value = true;
        } else {
          userPosition.value = null;
          usersAhead.value = 0;
          isInQueue.value = false;
        }
      } else {
        queueDetails.value.userCount = 0;
        userPosition.value = null;
        usersAhead.value = 0;
        isInQueue.value = false;
        sortedUsers.value = [];
      }
    };

    const initializeFirebase = async () => {
      const db = getDatabase();
      const auth = getAuth();
      const queueId = route.params.id;

      try {
        const userCredential = await signInAnonymously(auth);
        currentUid.value = userCredential.user.uid;
        localStorage.setItem("queueUid", currentUid.value);

        const queueRef = dbRef(db, `queues/${queueId}`);
        onValue(queueRef, (snapshot) => {
          const queueData = snapshot.val();
          if (queueData) {
            queueDetails.value = {
              ...queueDetails.value,
              ...queueData,
            };
            if (queueData.users) {
              updateQueueData({ val: () => queueData.users });
            }
          }
        });
      } catch (error) {
        console.error("Erro ao inicializar:", error);
        showNotification("Erro ao conectar ao servidor", "error");
      }
    };

    const joinQueue = async () => {
      if (loading.value) return;

      loading.value = true;
      try {
        const db = getDatabase();
        const queueId = route.params.id;
        const queueRef = dbRef(db, `queues/${queueId}/users`);

        await push(queueRef, {
          uid: currentUid.value,
          name: "Usuário Anônimo",
          joinedAt: Date.now(),
        });

        showNotification("Você entrou na fila com sucesso!");
      } catch (error) {
        console.error("Erro ao entrar na fila:", error);
        showNotification("Erro ao entrar na fila", "error");
      } finally {
        loading.value = false;
      }
    };

    const leaveQueue = async () => {
      if (loading.value) return;

      loading.value = true;
      try {
        const db = getDatabase();
        const queueId = route.params.id;
        const queueRef = dbRef(db, `queues/${queueId}/users`);

        const snapshot = await get(queueRef);
        const users = snapshot.val();

        if (users) {
          const userKey = Object.entries(users).find(
            ([, user]) => user.uid === currentUid.value
          )?.[0];

          if (userKey) {
            await remove(dbRef(db, `queues/${queueId}/users/${userKey}`));
            showNotification("Você saiu da fila");
          }
        }
      } catch (error) {
        console.error("Erro ao sair da fila:", error);
        showNotification("Erro ao sair da fila", "error");
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      initializeFirebase();
    });

    return {
      loading,
      queueDetails,
      userPosition,
      usersAhead,
      isInQueue,
      notification,
      sortedUsers,
      currentUid,
      formatDateTime,
      calculateEstimatedTime,
      formatTime,
      joinQueue,
      leaveQueue,
    };
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
