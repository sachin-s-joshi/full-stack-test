const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    var xchangeAPI = 'https://api.coinstats.app/public/v1/markets?coinId='+req.query.coin
    var data = await (await axios.get(xchangeAPI)).data
    var arr = Object.values(data) //convert objects into array
    var filteredPair = `${req.query.symbol}/${req.query.currency}`
    // console.log(filteredPair)
    arr = arr.filter((item) => { return item.pair == filteredPair});
    
    if(arr && arr.length!=0) res.status(200).send(findOptimalPrice(arr));
    else res.status(200).send('No data for: ' + filteredPair)

})

function findOptimalPrice(arr) {
    if (arr.length == 1) return arr[0].exchange;
    var reduced = arr.reduce((a, b) => { return a.price < b.price ? a : b })
    return reduced.exchange;
}

module.exports = router;


