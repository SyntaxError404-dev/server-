const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

const defaultRatio = '4:14';
app.get('/prompt', async (req, res) => {
  try {
    const t = req.query.t;
    const ratio = req.query.ratio || defaultRatio;

    const response = await axios.get(`https://sandipbaruwal.onrender.com/fluxdev?prompt=${encodeURIComponent(t)}&ratio=${encodeURIComponent(ratio)}`);
    
    console.log('API Response:', response.data); 

    if (response.data && response.data.result) {
      res.json({ imageUrl: response.data.result });
    } else {
      res.status(404).json({ error: 'Image not found in the response' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
