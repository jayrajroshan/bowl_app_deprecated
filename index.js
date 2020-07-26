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


const gets1 = (request, response) => {
    pool.query(
        'SELECT * FROM sensordata1 ORDER BY serial_no ASC',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

            var res = results.rows

            for (var i in res) y.push((res[i].imu1_pitch) - (res[0].imu1_pitch))
            console.log(y)

            // var res1 = results.rows
            // converter.json2csv(res1, (err, csv) => {
            //     if (err) {
            //         throw err
            //     }

            //     // print CSV string
            //     fs.writeFileSync('sensor1.csv', csv)
            // })
        },
    )
}

const gets2 = (request, response) => {
    pool.query(
        'SELECT * FROM sensordata2 ORDER BY serial_no ASC',
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)

            var res2 = results.rows
            //console.log(res2[0])
            // var x = []

            for (var i in res2) x.push((res2[i].imu2_pitch) - (res2[0].imu2_pitch))
            //console.log(x)


            // converter.json2csv(res2, (err, csv) => {
            //     if (err) {
            //         throw err
            //     }

            //     // print CSV string
            //     fs.writeFileSync('sensor2.csv', csv)
            //})
        },
    )
    return x;
}

const gets3 = (request, response) => {
    pool.query(
        'SELECT * FROM sensordata3 ORDER BY serial_no ASC',
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

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'SELECT * FROM sensordata1 WHERE serial_no = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        },
    )
}

//app.get('/s1', gets1)
app.get('/s1', function (req, res) {
    gets1
});
app.get('/s2', gets2)
app.get('/s3', gets3)
app.get('/users/:id', getUserById)

app.get('/home', (req, res) =>
    res.render('speedo'),
)



var sum = 0;
for (var i = 0; i < x.length; i++) {
    sum += x[i]; //don't forget to add the base
}

var avg = sum / x.length;
console.log('Average:' + avg)

app.post('/home', function (req, res) {
    res.send(JSON.stringify({ first: 165, second: 7, third: 11 }),);
})

