function validatePostRequest(req, res, next) {
  if (req.method === "POST") {
    if (req.body.title === undefined) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    if (req.body.title === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }
  }
  next();
}
function validatePutRequest(req, res, next) {
  if (req.method === "PUT") {
    if (req.body.status === undefined) {
      return res.status(400).json({
        message: "status is required",
      });
    }
    if (req.body.status === "") {
      return res.status(400).json({
        message: "status cannot be empty",
      });
    }
  }
  next();
}

module.exports = {
  validatePostRequest,
  validatePutRequest,
};
