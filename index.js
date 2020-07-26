const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const path = require('path')
const converter = require('json-2-csv')
const fs = require('fs')

const { Pool, Client } = require('pg')

const client = new Client({
    user: 'pgbowl',
    host: '180.151.15.18',
    database: 'bowling',
    password: 'pgsql@321#',
    port: 5432,
})
client.connect()
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


var x = [];
var y = [];
var diff = [];


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
    client.query(
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


            // converter.json2csv(res3, (err, csv) => {
            //     if (err) {
            //         throw err
            //     }

            //     // print CSV string
            //     fs.writeFileSync('sensor3.csv', csv)
            // })
        },

    )
}



app.get('/s3', gets3)

app.get('/home', (req, res) =>
    res.render('speedo'),
)


app.post('/home', function (req, res) {
    var avg;
    var Query = client.query(
        'SELECT * FROM sensordata11 ORDER BY serial_no DESC LIMIT 50',
        (error, results) => {
            if (error) {
                throw error
            }
            var temp = results.rows;

            for (var i in temp) x.push((temp[i].imu1_roll) - (temp[0].imu1_roll))
            console.log(x[1])
            var scopedBody = null;

            var Query1 = client.query(
                'SELECT * FROM sensordata31 ORDER BY serial_no DESC LIMIT 50',
                (error, results) => {
                    if (error) {
                        throw error
                    }

                    var temp = results.rows;
                    for (var i in temp) y.push((temp[i].imu3_roll) - (temp[0].imu3_roll))
                    console.log(y[1])

                    diff = y.map(function (num, idx) {
                        return num - x[idx];
                    });
                    console.log(diff)

                    const sum = diff.reduce((a, b) => a + b, 0);
                    avg = (sum / diff.length) || 0;

                    console.log(`The sum is: ${sum}. The average is: ${avg}.`);
                    scopedBody = avg;

                })

        })

    console.log(Query)
    res.send(JSON.stringify({ first: -3, second: 11, third: 5 }));

})

// let temp;
// async function Query() {
//     client
//         .query('SELECT * FROM sensordata11 ORDER BY serial_no DESC LIMIT 50')
//         .then(res => {
//             temp = res.rows;
//             console.log(temp[0])
//         })
//         .catch(e => console.error(e.stack))
// }

// Query().then(() => {
//     console.log(temp);
// })

function Query() {
    client.query('SELECT * FROM sensordata11 ORDER BY serial_no DESC LIMIT 50')
}

var temp = Query()
console.log(temp)
