import chalk from "chalk";
import table from "cli-table3";

const displayTable = new table({
  head: ["ID", "Description", "Status", "Created At", "Updated At"],
  colWidths: [6, 50, 20, 30, 30],
  style: { head: ["cyan"] },
});

const showTasks = (tasks) => {
  tasks.forEach((task) => {
    displayTable.push([
      task.id,
      task.description,
      task.status === "done"
        ? chalk.green(task.status)
        : chalk.red(task.status),
      task.createdAt,
      task.updatedAt || "",
    ]);
  });
  console.log(displayTable.toString());
};

export default { showTasks };
