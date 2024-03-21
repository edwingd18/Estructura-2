const express = require('express');
const env = require('dotenv');

const app = express();

const port = env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})