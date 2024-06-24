const app = require("./app");
const { db } = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3004;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});


