const express = require('express')
const app = express.Router()
const https = require('https')


const getStateDataHttps = () => {
    return new Promise((resolve, reject) => {
        https.get('https://api.covid19india.org/data.json', (res) => {
            let datastring = "";
            res.on('data', (d) => {
                datastring += d;
            });
            res.on('end', () => {

                return resolve(datastring);
            })
        }).on('error', (e) => {
            console.error(e);
            return reject(e);
        });
    })

}
const main2 = async() => {
    const data = await getStateDataHttps();
    const parse = JSON.parse(data);
    return parse.statewise;
}


app.get('/CovidDataTracker', async(req, response) => {
    const data = await main2();
    let modifiedData = [];
    data.forEach(element => {
        modifiedData.push({
            "active": element.active,
            "deaths": element.deaths,
            "stateName": element.state,
            "confirmed": element.confirmed,
            "recovered": element.recovered,
        })
    });
    response.render('CovidData',
        { 
         active_cases: modifiedData[0].active,
         confirmed: modifiedData[0].confirmed ,
         deaths: modifiedData[0].deaths,
         recovered: modifiedData[0].recovered,
          totalData: modifiedData
        });
});


module.exports = app;