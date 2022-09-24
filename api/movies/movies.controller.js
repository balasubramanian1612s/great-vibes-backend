const {
  create,
  getAllMovies,
  getMoviesByID,
  updateMovieWithID,
  deleteMovieWithID,
} = require("./movies.service");

module.exports = {
  addNewMovie: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error adding movie to database!",
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  selectAllMovies: (req, res) => {
    getAllMovies((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error getting movie from database!",
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  selectMovieByID: (req, res) => {
    const id = req.params.id;
    getMoviesByID(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error getting movie from database!",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found!",
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  updateMovie: (req, res) => {
    const body = req.body;
    updateMovieWithID(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error updating movie!",
        });
      }
      if (!results) {
        return res.status(500).json({
          success: 0,
          message: "Error updating movie!",
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  deleteMovie: (req, res) => {
    const id = req.params.id;
    deleteMovieWithID(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Error deleting movie!",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found!",
        });
      }
      res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
