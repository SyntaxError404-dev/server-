const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

app.get('/generate', async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios({
      method: 'get',
      url: `https://ashbina.onrender.com/gen2?prompt=${encodeURIComponent(prompt)}`,
      responseType: 'arraybuffer'
    });

    res.set('Content-Type', 'image/jpeg');
    res.send(Buffer.from(response.data, 'binary'));

  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).json({ error: 'Error fetching data from the API' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
