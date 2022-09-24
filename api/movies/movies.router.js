const {
  addNewMovie,
  selectAllMovies,
  selectMovieByID,
  updateMovie,
  deleteMovie,
} = require("./movies.controller");

const { checkToken } = require("../../auth/token_validation");
const router = require("express").Router();

router.post("/", checkToken, addNewMovie);
router.get("/", checkToken, selectAllMovies);
router.get("/:id", checkToken, selectMovieByID);
router.patch("/", checkToken, updateMovie);
router.delete("/:id", checkToken, deleteMovie);

module.exports = router;
