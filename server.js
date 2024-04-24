import express from "express";

const app = express();

app.use(express.json());
// app.use(logger);

// app.use(logger);
// app.use(login);
let users = [
  {
    username: "mohamed-msila",
    password: "mohamed2024",
  },
  {
    username: "amina-msila",
    password: "amina2024",
  },
];

let posts = [
  {
    title: "Post 1",
    author: "mohamed-msila",
  },
  {
    title: "Post 2",
    author: "amina-msila",
  },
];

// a middleware is any function that is called and run
// between the time the server gets the request
// and the time the server sends a response to the client

function logger(req, res, next) {
  console.log("Hello1 from console");
  next();
}

app.get("/hello", (req, res) => {
  return res.send("Hello from console");
});

app.get("/hello2", (req, res) => {
  console.log("hello endpoint");
  return res.send("Hello2");
});

// get post of a specific user
// user should authenticate
// then authorization is performed based on username
app.get("/posts", login, async (req, res) => {
  const username = req.body.username;
  res.json(posts.filter((post) => post.author === username));
});

// create a post by a specific user
// user should authenticate
app.post("/posts", async (req, res) => {
  const { title, username } = req.body;
  if (!title) {
    return res.send("Post's title is required");
  }
  const newPost = { title, author: username };
  posts.push(newPost);
  res.status(200).send("Post successfully created");
});

// Also called sign up
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // Check username and password value existence
  if (!username || !password) {
    return res.send("Both username and password are required");
  }
  const newUser = {
    username,
    password,
  };
  users.push(newUser);
  return res.status(200).json("Account successfully created");
});

// Also called sign in
function login(req, res, next) {
  const { username, password } = req.body;
  // Check username and password value existence
  if (!username || !password) {
    return res.send("Both username and password are required");
  }
  // Check user existence
  const exist = users.find((user) => user.username === username);
  if (!exist) {
    return res.send("Invalid username or password");
  }
  // Check password matching
  if (exist.password !== password) {
    return res.send("Invalid username or password");
  }
  next();
}

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
