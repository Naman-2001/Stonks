const express = require("express");
const CryptoNewsAPI = require("crypto-news-api").default;
const axios = require("axios").default;

const router = express.Router();
const api = new CryptoNewsAPI(process.env.CRYPTO_NEWS_API_KEY);

//Get latest crypto news
router.get("/latestNews", async (req, res) => {
  api
    .getLatestNews()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

//Get top crypto news
router.get("/topNews", async (req, res) => {
  api
    .getTopNews()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

//Get top news by coin
router.get("/getTopNewsByCoin", async (req, res) => {
  const { coin } = req.query;
  api
    .getTopNewsByCoin(coin)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

//Get latest news by coin
router.get("/getLatestNewsByCoin", async (req, res) => {
  const { coin } = req.query;
  api
    .getLatestNewsByCoin(coin)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

//Get coin details
router.get("/getCoinDetails", async (req, res) => {
  const { coin } = req.query;
  api
    .getCoinDetails(coin)
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
      });
    });
});

//Get all coins
router.get("/allCoins", async (req, res) => {
  axios
    .get(
      "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=20&sortBy=market_cap&sortType=desc&convert=USD&cryptoType=all&tagType=all"
    )
    .then((response) => {
      let coins = response.data.data.cryptoCurrencyList;
      res.status(200).json({
        coins,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.toString(),
        err,
      });
    });
});

module.exports = router;
