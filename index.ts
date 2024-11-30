import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { favoritesRouter } from "./src/routes/FavoriteMoviesRoutes";
import { usersRouter } from "./src/routes/UsersRoutes";
import { moviesRouter } from "./src/routes/MoviesRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api", favoritesRouter, usersRouter, moviesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Schools Database API");
});

app.listen(PORT, () => console.log("🚀 favorite-movies-api started @:", PORT));