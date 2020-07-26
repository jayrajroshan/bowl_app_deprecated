const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path')
const converter = require('json-2-csv')
const fs = require('fs')

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'pgbowl',
    host: '180.151.15.18',
    database: 'bowling',
    password: 'pgsql@321#',
    port: 5432,
})
// client.connect()
//const db = require('./queries')












app.set('view engine', 'ejs');
//app.use(express.static('./public'));
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})





// pool.query(
//     'SELECT * FROM sensordata11 ORDER BY serial_no DESC LIMIT 50',
//     (error, results) => {
//         if (error) {
//             throw error
//         }
//         var temp = results.rows;

//         for (var i in temp) x.push((temp[i].imu1_roll) - (temp[0].imu1_roll))
//         console.log(x[1])

//         pool.query(
//             'SELECT * FROM sensordata31 ORDER BY serial_no DESC LIMIT 50',
//             (error, results) => {
//                 if (error) {
//                     throw error
//                 }

//                 var temp = results.rows;
//                 for (var i in temp) y.push((temp[i].imu3_roll) - (temp[0].imu3_roll))
//                 console.log(y[1])

//                 diff = y.map(function (num, idx) {
//                     return num - x[idx];
//                 });
//                 console.log(diff)

//                 const sum = diff.reduce((a, b) => a + b, 0);
//                 const avg = (sum / diff.length) || 0;

//                 console.log(`The sum is: ${sum}. The average is: ${avg}.`);
//             })

//     })





const gets3 = (request, response) => {
    pool.query(
        'SELECT * FROM sensordata31 ORDER BY serial_no DESC LIMIT 50',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

            var res3 = results.rows

            var z = []

            for (var i in res3) z.push((res3[i].imu3_pitch) - (res3[0].imu3_pitch))
            console.log(z)
        },

    )
}



app.get('/s3', gets3)

app.get('/home', (req, res) =>
    res.render('speedo'),
)

var sensorQuery1 = null;
var sensorQuery2 = null;
var sensorQuery3 = null;

pool.query('SELECT * FROM sensordata11 ORDER BY serial_no DESC LIMIT 10', (err, res1) => {
    if (err) throw err
    sensorQuery1 = res1;

    pool.query('SELECT * FROM sensordata21 ORDER BY serial_no DESC LIMIT 10', (err, res2) => {
        if (err) throw err
        sensorQuery2 = res2;

        pool.query('SELECT * FROM sensordata31 ORDER BY serial_no DESC LIMIT 10', (err, res3) => {
            if (err) throw err
            sensorQuery3 = res3;
            myFun();


        });


    });


});

var x = [];
var y = [];
var pitch3 = [];
var pitch1 = [];
var diff = [];
var avg1 = null;
var avg2 = null;
var avg3 = null;

function myFun() {
    sensor1 = sensorQuery1.rows;
    for (var i in sensor1) x.push((sensor1[i].imu1_roll) - (sensor1[0].imu1_roll))
    for (var i in sensor1) pitch1.push((sensor1[i].imu1_pitch) - (sensor1[0].imu1_pitch))

    sensor3 = sensorQuery3.rows;
    for (var i in sensor3) y.push((sensor3[i].imu3_roll) - (sensor3[0].imu3_roll))
    for (var i in sensor3) pitch3.push((sensor3[i].imu3_pitch) - (sensor3[0].imu3_pitch))

    diff = y.map(function (num, idx) {
        return num - x[idx];
    });

    pitchChange = pitch3.map(function (num, idx) {
        return num - pitch1[idx];
    });
    const sum1 = diff.reduce((a, b) => a + b, 0);
    avg1 = (sum1 / diff.length) || 0;

    const sum2 = pitch3.reduce((a, b) => a + b, 0);
    avg2 = (sum2 / pitch3.length) || 0;

    const sum3 = pitchChange.reduce((a, b) => a + b, 0);
    avg3 = (sum3 / pitchChange.length) || 0;

}

app.post('/home', function (req, res) {
    myFun()
    console.log(avg1)
    console.log(avg2)
    console.log(avg3)

    var data = JSON.stringify({ "first": avg1, "second": avg2, "third": avg3 });
    res.send(data);

})

