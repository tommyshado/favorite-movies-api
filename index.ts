import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { favoritesRouter } from "./src/routes/FavoriteMoviesRoutes";
import { usersRouter } from "./src/routes/UsersRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Favorite Movies API");
});

app.use("/api", favoritesRouter, usersRouter);

app.listen(PORT, () => console.log("🚀 favorite-movies-api started @:", PORT));