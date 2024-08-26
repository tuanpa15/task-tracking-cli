import { JSONFileSyncPreset } from "lowdb/node";
import dayjs from "dayjs";

const defaultData = { tasks: [] };
const db = await JSONFileSyncPreset("db.json", defaultData);

const TEX_TIME_NOW = dayjs().format("YYYY-MM-DD HH:mm:ss");
const INITIAL_STATUS = "todo";

const addTask = async (task) => {
  await db.update(({ tasks }) => {
    const lastTask = tasks[tasks.length - 1];
    const newTask = {
      id: lastTask ? lastTask.id + 1 : 1,
      description: task.description,
      status: INITIAL_STATUS,
      createdAt: TEX_TIME_NOW,
      updatedAt: null,
    };
    tasks.push(newTask);
  });
};

const updateTask = async (id, task) => {
  await db.update(({ tasks }) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...task,
      updatedAt: TEX_TIME_NOW,
    };
  });
};

const deleteTask = async (id) => {
  await db.update(({ tasks }) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    tasks.splice(taskIndex, 1);
  });
};

const filterTasksByStatus = (status) =>
  db.data.tasks.filter((task) => task.status === status);

await db.write();

export default {
  tasks: db.data.tasks,
  addTask,
  updateTask,
  deleteTask,
  filterTasksByStatus,
};
