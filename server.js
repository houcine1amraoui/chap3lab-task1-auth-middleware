import express from "express";

const app = express();
app.use(express.json());

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

// get post of a specific user
// user should authenticate
// then authorization is performed based on username
app.get("/posts", passwordAuth, async (req, res) => {
  const username = req.body.username;
  res.json(posts.filter((post) => post.author === username));
});

// create a post by a specific user
// user should authenticate
app.post("/posts", passwordAuth, async (req, res) => {
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
function passwordAuth(req, res, next) {
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
