const db = require("../config/firebase");

const createQueue = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "O campo 'name' é obrigatório." });
    }

    const queuesRef = db.ref("queues");
    const newQueueRef = queuesRef.push();
    const queueData = {
      name,
      createdAt: Date.now(),
      users: {},
    };

    await newQueueRef.set(queueData);

    res.status(201).send({
      message: "Fila criada com sucesso!",
      queueId: newQueueRef.key,
    });
  } catch (error) {
    console.error("Erro ao criar a fila:", error);
    res.status(500).send({ error: "Erro ao criar a fila." });
  }
};

const listQueues = async (req, res) => {
  try {
    const queueRef = db.ref("queues");
    queueRef.once("value", (snapshot) => {
      const queues = snapshot.val();

      if (!queues) {
        return res.status(200).send([]);
      }

      const queueList = Object.entries(queues).map(([key, queue]) => ({
        id: key,
        ...queue,
      }));

      res.status(200).send(queueList);
    });
  } catch (error) {
    console.error("Erro ao listar as filas:", error);
    res.status(500).send({ error: "Erro ao listar as filas." });
  }
};

const deleteQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    if (!queueId) {
      return res.status(400).send({ error: "O ID da fila é obrigatório." });
    }

    const queueRef = db.ref(`queues/${queueId}`);
    const snapshot = await queueRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).send({ error: "Fila não encontrada." });
    }

    await queueRef.remove();
    res.status(200).send({ message: "Fila deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar a fila:", error);
    res.status(500).send({ error: "Erro ao deletar a fila." });
  }
};

const getQueueDetails = async (req, res) => {
  try {
    const { queueId } = req.params;

    if (!queueId) {
      return res.status(400).send({ error: "O ID da fila é obrigatório." });
    }

    const queueRef = db.ref(`queues/${queueId}`);
    const snapshot = await queueRef.once("value");
    const queueData = snapshot.val();

    if (!queueData) {
      return res.status(404).send({ error: "Fila não encontrada." });
    }

    const users = queueData.users || {};
    const usersList = Object.entries(users)
      .map(([key, user]) => ({ ...user, key }))
      .sort((a, b) => a.joinedAt - b.joinedAt);

    res.status(200).send({
      queueId,
      userCount: usersList.length,
      users: usersList,
    });
  } catch (error) {
    console.error("Erro ao obter detalhes da fila:", error);
    res.status(500).send({ error: "Erro ao obter detalhes da fila." });
  }
};

const advanceQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    if (!queueId) {
      return res.status(400).send({ error: "O ID da fila é obrigatório." });
    }

    const queueRef = db.ref(`queues/${queueId}/users`);

    const snapshot = await queueRef.once("value");
    const users = snapshot.val();

    if (!users || Object.keys(users).length === 0) {
      return res.status(404).send({ error: "A fila está vazia." });
    }

    const usersArray = Object.entries(users)
      .map(([key, user]) => ({ key, ...user }))
      .sort((a, b) => a.joinedAt - b.joinedAt);

    const firstUser = usersArray.shift();

    await queueRef.set(
      usersArray.reduce((acc, user) => {
        acc[user.key] = {
          uid: user.uid,
          name: user.name,
          joinedAt: user.joinedAt,
        };
        return acc;
      }, {})
    );

    res.status(200).send({
      message: "Usuário removido da fila.",
      removedUser: { uid: firstUser.uid, name: firstUser.name },
      remainingUsers: usersArray.length,
    });
  } catch (error) {
    console.error("Erro ao avançar na fila:", error);
    res.status(500).send({ error: "Erro ao avançar na fila." });
  }
};

module.exports = { createQueue, listQueues, deleteQueue, getQueueDetails, advanceQueue };
