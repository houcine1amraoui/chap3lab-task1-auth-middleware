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

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    username,
    password,
  };
  users.push(newUser);
  console.log(users);
  return res.json(newUser);
});

// get post of a specific user
// user should authenticate
// then authorization is performed based on username
app.get("/posts", auth, async (req, res) => {
  const username = req.body.username;
  res.json(posts.filter((post) => post.author === username));
});

// create a post by a specific user
// user should authenticate
app.post("/posts", auth, async (req, res) => {
  const { title, username } = req.body;
  const newPost = { title, author: username };
  posts.push(newPost);
  res.json(newPost);
});

// also called sigin
function auth(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    const result = users.filter((user) => {
      return user.username === username;
    });
    if (result.length > 0) {
      if (result[0].password === password) {
        next();
      } else {
        return res.send("Invalid username or password");
      }
    }
  } else {
    return res.send("Both username and password are required");
  }
}

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
