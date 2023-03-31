const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./models/User");
const Address = require("./models/Address");
const Products = require("./models/Products");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/users/create", (req, res) => {
  res.render("createuser");
});

app.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  await User.create({
    name,
    email,
    phone,
  });

  res.redirect("/users");
});
app.get("/users", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("users.handlebars", { users: users });
});

app.get("/users/details/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });

  res.render("user.handlebars", { user });
});

app.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });

  res.redirect("/users");
});

app.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ includes: Address, where: { id: id } });
    res.render("useredit.handlebars", { user: user.get({ plain: true }) });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.render("home");
});
conn
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log(`App listening on port 4000!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
