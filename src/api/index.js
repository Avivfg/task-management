import express from "express";
import Joi from "joi";

const app = express();
app.use(express.json());

var nextId = 0;
const tasks = [
  // { id: 1, title: "task1" },
  // { id: 2, title: "task2" },
  // { id: 3, title: "task3" },
];
// export var tasks = [];

const getTask = (req) => tasks.find((c) => c.id === parseInt(req.params.id));
function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().required(), //.min(3)
  });

  return schema.validate(task);
}

// GET
app.get("/api/tasks", (req, res) => {
  res.send(tasks);
});

// POST
app.post("/api/tasks", (req, res) => {
  const { error } = validateTask(req);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  // if (!req.body.title) {
  //   res.status(400).send("title is required");
  //   return;
  // }

  const task = {
    id: nextId + 1,
    title: req.body.title,
  };
  nextId++;
  tasks.push(task);
  res.send(task);
});

// PUT
app.put("/api/tasks/:id", (req, res) => {
  const task = getTask(req);
  if (!task)
    return res.status(404).send("The Task with the given ID was not found");

  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  task.title = req.body.title;
  res.send(task);
});

// DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const task = getTask(req);
  if (!task)
    return res.status(404).send("The Task with the given ID was not found");

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);

  res.send(task);
});

app.get("/api/tasks/:id", (req, res) => {
  const task = getTask(req);
  if (!task)
    return res.status(404).send("The Task with the given ID was not found");
  res.send(task);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

// const apiClient = create({
//   baseURL: `http://10.100.102.14:${port}/api`,
// });
