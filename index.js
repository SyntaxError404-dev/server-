const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

app.get('/ques', async (req, res) => {
  try {
    const t = req.query.t;
    const ratio = req.query.ratio || '1:1'; // Default to '1:1' if no ratio is provided

    const response = await axios.get(`https://sandipbaruwal.onrender.com/fluxdev?prompt=${t}&ratio=${ratio}`);

    res.json(response.data.answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
