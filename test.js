const axios = require("axios");

for (let i = 0; i < 10; i++) {
  axios.get("http://localhost:3000/api/book?number=100").then((resp) => console.log(resp.data));
}
