const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const moderateController = require('./controllers/moderate.controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/moderate', moderateController);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});