import inquirer from "inquirer";
import db from "./db.js";
import log from "./log.js";
import chalk from "chalk";
import { program } from "commander";

program.version("1.0.0").description("A simple Task Tracker CLI");

program
  .command("add")
  .description("Add a new task")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "description",
          message: "Enter your task:",
        },
      ])
      .then((task) => {
        db.addTask(task);
        console.log(chalk.green("Task added!"));
        log.showTasks(db.tasks);
      });
  });

program
  .command("update <id>")
  .description("Update a task's description or status")
  .action((id) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "field",
          message: "What would you like to update?",
          choices: ["Description", "Status"],
        },
      ])
      .then((answer) => {
        if (answer.field === "Description") {
          inquirer
            .prompt([
              {
                type: "input",
                name: "description",
                message: "Enter the new description:",
              },
            ])
            .then((task) => {
              db.updateTask(parseInt(id), { description: task.description });
              console.log(chalk.green("Task description updated!"));
              log.showTasks(db.tasks);
            });
        } else if (answer.field === "Status") {
          inquirer
            .prompt([
              {
                type: "list",
                name: "status",
                message: "Choose the new status:",
                choices: ["todo", "in-progress", "done"],
              },
            ])
            .then((task) => {
              db.updateTask(parseInt(id), { status: task.status });
              console.log(chalk.green("Task status updated!"));
              log.showTasks(db.tasks);
            });
        }
      });
  });

program
  .command("delete <id>")
  .description("Delete a task")
  .action((id) => {
    db.deleteTask(parseInt(id));
    console.log(chalk.green("Task deleted!"));
    log.showTasks(db.tasks);
  });

program
  .command("filter <status>")
  .description("Filter tasks by status")
  .action((status) => {
    log.showTasks(db.filterTasksByStatus(status));
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
    log.showTasks(db.tasks);
  });

program.parse(process.argv);
