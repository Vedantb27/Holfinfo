const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://bopanwarvedant27:xddK5q9NYgXgZ4Ts@cluster0.xsprekn.mongodb.net/hodlinfo', { useNewUrlParser: true, useUnifiedTopology: true });

const tickerSchema = new mongoose.Schema({
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String,
  quote_unit: String,
  low: String,
  high: String,
  type: String,
  open: String,
  at: Number
});

const Ticker = mongoose.model('Ticker', tickerSchema);

app.use(express.json());

app.get('/fetchData', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = Object.values(response.data).slice(0, 10);

    await Ticker.deleteMany({});

    for (const item of data) {
      const {
        name, last, buy, sell, volume, base_unit, quote_unit, low, high, type, open, at
      } = item;
      const ticker = new Ticker({
        name, last, buy, sell, volume, base_unit, quote_unit, low, high, type, open, at
      });
      await ticker.save();
    }

    res.status(200).send('Data fetched and stored successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/getData', async (req, res) => {
  try {
    const tickers = await Ticker.find();
    res.status(200).json(tickers);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
