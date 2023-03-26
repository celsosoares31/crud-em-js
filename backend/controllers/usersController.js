const axios = require("axios");

const getAllUsers = async (req, res) => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");

  res.send(data);
};

module.exports = {
  getAllUsers,
};
