const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO movies(name, rating, genre, release_date) VALUES (?,?,?,?)`,
      [data.name, data.rating, data.genre, data.release_date],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        var insertedId = results["insertId"];
        for (each_cast in data.cast) {
          pool.query(
            "INSERT INTO movie_cast(mov_id, name) VALUES (?,?)",
            [insertedId, data.cast[each_cast]],
            (castError, castResults, castFields) => {
              if (castError) {
                return callBack(castError);
              }
            }
          );
        }
        return callBack(null, results);
      }
    );
  },
  getAllMovies: (callback) => {
    pool.query(
      `select m.id, m.name, m.rating, m.genre, m.release_date, IFNULL(CONCAT(GROUP_CONCAT(c.name)),'') as cast from movies m left join movie_cast c on m.id=c.mov_id group by m.id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        for (res in results) {
          results[res]["cast"] = results[res]["cast"].split(",");
        }
        return callback(null, results);
      }
    );
  },
  getMoviesByID: (id, callback) => {
    pool.query(
      `select m.id, m.name, m.rating, m.genre, m.release_date, IFNULL(CONCAT(GROUP_CONCAT(c.name)),'') as cast from movies m left join movie_cast c on m.id=c.mov_id where m.id=? group by m.id`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.length == 0) callback(null, null);
        results[0]["cast"] = results[0]["cast"].split(",");
        return callback(null, results[0]);
      }
    );
  },
  deleteMovieWithID: (id, callBack2) => {
    pool.query(
      `delete from movies where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack2(error);
        }
        var affectedRows = results["affectedRows"];
        if (affectedRows == 0) {
          return callBack2(null, null);
        }
        return callBack2(null, "Deleted Sucessfully.");
      }
    );
  },
  updateMovieWithID: (data, callBack1) => {
    pool.query(
      `delete from movies where id=?`,
      [data.id],
      (delerror, delresults, fields) => {
        if (delerror) {
          return callBack1(error);
        }
        var affectedRows = delresults["affectedRows"];
        if (affectedRows == 0) {
          return callBack1(null, null);
        }
        pool.query(
          `INSERT INTO movies(id, name, rating, genre, release_date) VALUES (?,?,?,?,?)`,
          [data.id, data.name, data.rating, data.genre, data.release_date],
          (error, results, fields) => {
            if (error) {
              return callBack1(error);
            }
            var insertedId = results["insertId"];
            for (each_cast in data.cast) {
              pool.query(
                "INSERT INTO movie_cast(mov_id, name) VALUES (?,?)",
                [insertedId, data.cast[each_cast]],
                (castError, castResults, castFields) => {
                  if (castError) {
                    return callBack1(castError);
                  }
                }
              );
            }
            return callBack1(null, results);
          }
        );
      }
    );
  },
};
