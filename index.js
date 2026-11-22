import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
const program = new Command();
const filePath = "./courses.json";
program
  .name("Courses Manager")
  .description("CLI to make courses")
  .version("1.0.0");
program
  .command("add")
  .alias("a")
  .description("add a new course")
  .action(function () {
    inquirer
      .prompt([
        {
          type: "input",
          message: "what is the title of course ",
          name: "title",
          validate: function (value) {
            if (value.trim() === "") {
              return "course title cannot be empty";
            }
            return true;
          },
        },

        {
          type: "number",
          message: "what is the price of course ",
          name: "price",
          validate: function (value) {
            if (value === undefined || value === null || value < 0) {
              return "course price must be zero or a positive number";
            }
            return true;
          },
        },
      ])
      .then(function (answers) {
        if (fs.existsSync(filePath)) {
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.log(err);
              process.exit();
            } else {
              fs.writeFileSync(
                filePath,
                JSON.stringify([
                  ...JSON.parse(data),
                  { id: JSON.parse(data).length + 1, ...answers },
                ]),
                "utf-8",
              );
            }
          });
        } else {
          fs.writeFileSync(
            filePath,
            JSON.stringify([{ id: 1, ...answers }]),
            "utf-8",
          );
        }
      });
  });
program
  .command("list")
  .alias("ls")
  .description("list of  courses")
  .action(function () {
    if (!fs.existsSync(filePath)) {
      console.log("No courses yet !");
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log(err);
          process.exit();
        } else {
          console.table(JSON.parse(data));
        }
      });
    }
  });
program
  .command("single")
  .alias("s")
  .description("get single course by id")
  .action(function () {
    inquirer
      .prompt([
        {
          type: "number",
          message: "what is the id of course ",
          name: "id",
          validate: function (value) {
            if (!Number.isInteger(value) || value <= 0) {
              return "course id must be a positive integer";
            }
            return true;
          },
        },
      ])
      .then((answer) => {
        if (!fs.existsSync(filePath)) {
          console.log("No course Found !");
        } else {
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            data = JSON.parse(data);
            const findCourse = data.find((course) => +course.id === +answer.id);
            if (!findCourse) {
              console.log("No course Found !");
              return;
            }
            console.log(findCourse);
          });
        }
      });
  });
program
  .command("update")
  .alias("u")
  .description("update course by id")
  .action(function () {
    inquirer
      .prompt([
        {
          type: "number",
          message: "what is the id of course ",
          name: "id",
          validate: function (value) {
            if (!Number.isInteger(value) || value <= 0) {
              return "course id must be a positive integer";
            }
            return true;
          },
        },
      ])
      .then((answer) => {
        if (!fs.existsSync(filePath)) {
          console.log("No courses yet !");
        } else {
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            data = JSON.parse(data);
            const findCourse = data.find((course) => +course.id === +answer.id);
            if (!findCourse) {
              console.log("No course Found !");
              return;
            }
            inquirer
              .prompt([
                {
                  type: "input",
                  message: "what is the new title of course ",
                  name: "title",
                  default: findCourse.title,
                  validate: function (value) {
                    if (value.trim() === "") {
                      return "course title cannot be empty";
                    }
                    return true;
                  },
                },
                {
                  type: "number",
                  message: "what is the new price of course ",
                  name: "price",
                  default: findCourse.price,
                  validate: function (value) {
                    if (value === undefined || value === null || value < 0) {
                      return "course price must be zero or a positive number";
                    }
                    return true;
                  },
                },
              ])
              .then((updatedAnswer) => {
                findCourse.title = updatedAnswer.title;
                findCourse.price = updatedAnswer.price;
                fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
                console.log("course updated sucessfully");
              });
          });
        }
      });
  });
program
  .command("remove")
  .alias("rm")
  .description("remove course by id")
  .action(function () {
    inquirer
      .prompt([
        {
          type: "number",
          message: "what is the id of course ",
          name: "id",
          validate: function (value) {
            if (!Number.isInteger(value) || value <= 0) {
              return "course id must be a positive integer";
            }
            return true;
          },
        },
      ])
      .then((answer) => {
        if (!fs.existsSync(filePath)) {
          console.log("No courses yet !");
        } else {
          fs.readFile(filePath, (err, data) => {
            if (err) {
              console.log(err);
              process.exit();
            }
            data = JSON.parse(data);
            const findCourse = data.find((course) => +course.id === +answer.id);
            if (!findCourse) {
              console.log("No course Found !");
              return;
            }
            data = data.filter((course) => course.id !== answer.id);
            if (data.length === 0) {
              fs.unlinkSync(filePath);
              return;
            }
            fs.writeFileSync(filePath, JSON.stringify(data));
            console.log("course dateled sucessfully");
          });
        }
      });
  });
program.parse(process.argv);
