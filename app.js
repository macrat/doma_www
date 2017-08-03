const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DATABASE || './db.sqlite';


const app = require('express')();
const server = require('http').Server(app);
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database(DATABASE);


app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.get('/api/temphumid', (req, res) => {
	db.all('SELECT timestamp, temperature AS temp, humidity AS humid FROM temphumid ORDER BY timestamp DESC LIMIT 12', (err, rows) => {
		if (err) throw err;

		res.contentType('application/json');
		res.send(JSON.stringify({
			error: null,
			data: rows
		}));
	});
});


server.listen(PORT, () => console.log(`listening on ${PORT}`));
