import * as readline from "readline";
import Table from "cli-table3";
class Task {
  "title": string;
  "description": string;
  "dueDate": Date;
  "isCompleted": boolean;

  constructor(title: string, desc: string, date: Date) {
    this.title = title;
    this.description = desc;
    this.dueDate = date;
    this.isCompleted = false;
  }
  taskCompleted() {
    this.isCompleted = true;
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }
  updateDesc(newDesc: string) {
    this.description = newDesc;
  }
  updateDate(newDate: Date) {
    this.dueDate = newDate;
  }
}

class TaskManager {
  "tasks": Task[];
  constructor(taskArr: Task[]) {
    this.tasks = taskArr;
  }
  addTask(newTaskObject: Task) {
    this.tasks.push(newTaskObject);
  }

  deleteTask(index:number) {
    let tasksAfterDeletion = this.tasks.filter((ele,ind) => {
      if (ind === index) {
        return false;
      } else {
        return true;
      }
    });
    this.tasks = tasksAfterDeletion;
  }

  updateTaskTitle(index: number, newValue: string) {
    this.tasks.forEach((ele, ind) => {
      if (ind === index) {
        ele.updateTitle(newValue);
      }
    });
  }

  updateTaskDesc(index: number, newValue: string) {
    this.tasks.forEach((ele, ind) => {
      if (ind === index) {
        ele.updateDesc(newValue);
      }
    });
  }
  updateTaskDate(index: number, newValue: Date) {
    this.tasks.forEach((ele, ind) => {
      if (index === ind) {
        ele.updateDate(newValue);
      }
    });
  }
  markCompleted(index: number) {
    this.tasks.forEach((ele, ind) => {
      if (ind === index) {
        ele.taskCompleted();
      }
    });
  }

  filterTasksByCompletionStatus(completed: boolean): Task[] {
    return this.tasks.filter((task) => task.isCompleted === completed);
  }
//   generateReport() {
//     let completed = 0;
//     let pending = 0;
//     let tasksDueToday: Task[] = [];
//     let overdueTasks: Task[] = [];

//     this.tasks.forEach((ele) => {
//       if (ele.isCompleted) {
//         completed++;
//       } else {
//         pending++;
//       }
//       let dueDateWithoutTime = new Date(ele.dueDate.toDateString());
//       let today = new Date();
//       let todayWithoutTime = new Date(today.toDateString());

//       if (dueDateWithoutTime == todayWithoutTime) {
//         tasksDueToday.push(ele);
//       }
//       if (dueDateWithoutTime < todayWithoutTime) {
//         overdueTasks.push(ele);
//       }
//     });
//     return {
//       completed,
//       pending,
//       tasksDueToday,
//       overdueTasks,
//     };
//   }
generateReport() {
    let completed = 0;
    let pending = 0;
    const today = new Date();
    const tasksDueToday: Task[] = [];
    const overdueTasks: Task[] = [];
  
    this.tasks.forEach((ele) => {
      if (ele.isCompleted) {
        completed++;
      } else {
        pending++;
      }
      
      const dueDate = ele.dueDate;
      if (
        dueDate.getFullYear() === today.getFullYear() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getDate() === today.getDate()
      ) {
        tasksDueToday.push(ele);
      } else if (dueDate < today) {
        overdueTasks.push(ele);
      }
    });
  
    return {
      completed,
      pending,
      tasksDueToday,
      overdueTasks,
    };
  }
}

// const task1 = new Task(
//   "Task One",
//   "Complete the report",
//   new Date("2023-10-30")
// );
// const task2 = new Task(
//   "Task Two",
//   "Prepare for the meeting",
//   new Date("2023-11-15")
// );
// const task3 = new Task("Task Three", "Buy groceries", new Date("2023-11-20"));
// const task4 = new Task("Task Four", "Go to the gym", new Date("2023-11-10"));
// const task5 = new Task("Task Five", "Read a book", new Date("2023-11-05"));

// const taskManagementInterface = new TaskManager([task1, task2, task3, task4]);

// taskManagementInterface.addTask(task1);
// console.log(taskManagementInterface.tasks);

// taskManagementInterface.deleteTask("Task Five");
// console.log(taskManagementInterface.tasks);

// taskManagementInterface.markCompleted("Task O");
const taskManagementInterface = new TaskManager([]);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {


  console.log("Task Management CLI");
  console.log("1. Add Task");
  console.log("2. List Tasks");
  console.log("3. Update Task");
  console.log("4. Delete Task");
  console.log("5. Filter Tasks");
  console.log("6. Generate Report");
  console.log("7. Exit");

  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        console.log("Please Enter Task title, description and due date");
        rl.question("Title: ", (title) => {
            if(title==="7"){
                displayMenu()
            }else{
          rl.question("Description: ", (description) => {
            if(description === "7"){
                displayMenu()
            }else{
            rl.question("Due Date (YYYY-MM-DD): ", (dueDate) => {
                if(dueDate==="7"){
                    displayMenu()
                }else{
              const newTask = new Task(title, description, new Date(dueDate));
              taskManagementInterface.addTask(newTask);
              console.log("Task added successfully!");
              displayMenu();
            }
            });
        }
          });
        }
        });
        break;
      case "2":
        const table = new Table({
          head: ["Title", "Description", "Due Date", "Completed"],
        });
        taskManagementInterface.tasks.forEach((task) => {
          table.push([
            task.title,
            task.description,
            task.dueDate.toDateString(),
            task.isCompleted ? "Yes" : "No",
          ]);
        });
        console.log(table.toString());
        displayMenu();
        break;

      case "3":
        displayUpdateTaskMenu(taskManagementInterface)
        break;
      case "4":
       deleteTask(taskManagementInterface)
        // Implement code to delete a task
        break;
      case "5":
        // Implement code to filter tasks
        filterTasksMenu(taskManagementInterface)
        break;
    case "6":
        //gen report 
        const report = taskManagementInterface.generateReport()
          const dueTodayTable = new Table({
            head: ["Title", "Description", "Due Date", "Completed"],
          });
          report.tasksDueToday.forEach((task) => {
            dueTodayTable.push([
              task.title,
              task.description,
              task.dueDate.toDateString(),
              task.isCompleted ? "Yes" : "No",
            ]);
          });
        const overDueTable =  new Table({
            head: ["Title", "Description", "Due Date", "Completed"],
          });
        report.overdueTasks.forEach((task) => {
            overDueTable.push([
              task.title,
              task.description,
              task.dueDate.toDateString(),
              task.isCompleted ? "Yes" : "No",
            ]);
          });
          console.log("Completed Tasks:" , report.completed)
          console.log("Pending Tasks:" , report.pending)
          console.log("Overdue tasks:")
          console.log(overDueTable.toString())
          console.log("Tasks Due Today:")
          console.log(dueTodayTable.toString())
          displayMenu();
          break;
      case "7":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        displayMenu();
    }
  });
}
function filterTasksMenu(taskManagementInterface:TaskManager){
    console.log("Filter Tasks");
    console.log("1. Show Completed Tasks");
    console.log("2. Show Pending Tasks");
    console.log("3. Back to Main Menu");

    rl.question("Enter your choice",(choice)=>{
        switch(choice){
            case "1":
                const completedTasks = taskManagementInterface.filterTasksByCompletionStatus(true)
                const table = new Table({
                    head: ["Title", "Description", "Due Date", "Completed"],
                  });
                  completedTasks.forEach((task) => {
                    table.push([
                      task.title,
                      task.description,
                      task.dueDate.toDateString(),
                      task.isCompleted ? "Yes" : "No",
                    ]);
                  });
                  console.log(table.toString());
                  filterTasksMenu(taskManagementInterface)
                  break;
                case "2":
                const pendingTasks = taskManagementInterface.filterTasksByCompletionStatus(false)
                const table2 = new Table({
                    head: ["Title", "Description", "Due Date", "Completed"],
                  });
                  pendingTasks.forEach((task) => {
                    table2.push([
                      task.title,
                      task.description,
                      task.dueDate.toDateString(),
                      task.isCompleted ? "Yes" : "No",
                    ]);
                  });
                  console.log(table2.toString());
                  filterTasksMenu(taskManagementInterface)
                  break;
                case "3":
                    displayMenu()
                    break;
                case "4":
                console.log("Invalid choice. Please try again.");
            filterTasksMenu(taskManagementInterface);
        }
    })
}
function deleteTask(taskManagementInterface:TaskManager){
    console.log("Select a task to delete:");
    console.log("Type back to go back to Main Menu");
    taskManagementInterface.tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title}`);
    });
    rl.question("Enter your choice",(choice)=>{
      const taskIndex = parseInt(choice) - 1;
      if(taskIndex>=0 && taskIndex <taskManagementInterface.tasks.length){
        taskManagementInterface.deleteTask(taskIndex)
        console.log("Task Deleted!")
       deleteTask(taskManagementInterface)
      }else if(choice === "back"){
        displayMenu()
      }else{
        console.log("Invalid choice. Please try again.");
        deleteTask(taskManagementInterface);
      }
    })
}
function displayUpdateTaskMenu(taskManagementInterface: TaskManager) {
  // Implement code to update a task
  console.log("Update Task");
  console.log("1. Update Title");
  console.log("2. Update Description");
  console.log("3. Update Due Date");
  console.log("4. Mark as Completed");
  console.log("Type back to go back to Main Menu");

  console.log("Select a task to update:");
  taskManagementInterface.tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.title}`);
  });

  rl.question("Enter your choice", (choice) => {
    const taskIndex = parseInt(choice) - 1;
    if (taskIndex >= 0 && taskIndex < taskManagementInterface.tasks.length) {
      rl.question("Choose what to update", (updateChoice) => {
        switch (updateChoice) {
          case "1":
            rl.question("Enter new title", (newTitle) => {
              taskManagementInterface.updateTaskTitle(taskIndex, newTitle);
              console.log("Task title updated successfully!");
              displayUpdateTaskMenu(taskManagementInterface);
            });

            break;
          case "2":
            rl.question("Enter new description", (desc) => {
              taskManagementInterface.updateTaskDesc(taskIndex, desc);
              console.log("Task description updated successfully!");
              displayUpdateTaskMenu(taskManagementInterface);
            });
            break;
          case "3":
            rl.question(
              "Enter the new due date (YYYY-MM-DD): ",
              (newDueDate) => {
                taskManagementInterface.updateTaskDate(
                  taskIndex,
                  new Date(newDueDate)
                );
                console.log("Task due date updated successfully!");
                displayUpdateTaskMenu(taskManagementInterface);
              }
            );
            break;
          case "4":
            taskManagementInterface.markCompleted(taskIndex);
            console.log("Task marked as completed successfully!");
            displayUpdateTaskMenu(taskManagementInterface);
            break;
          default:
            console.log("Invalid choice. Please try again.");
            displayUpdateTaskMenu(taskManagementInterface);
        }
      });
    } else if (choice === "back") {
      displayMenu();
    } else {
      console.log("Invalid task choice. Please try again.");
      displayUpdateTaskMenu(taskManagementInterface);
    }
  });
}
function start() {
    console.log("Welcome to your Task Management System CLI :)");
    displayMenu(); // Start with the main menu
}
if(require.main === module){
    start()
}




module.exports={Task,TaskManager}