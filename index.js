const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000;
const questions = require('./questions')

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

function getQuestion() {
	let randomNum = Math.floor(Math.random() * questions.length)
	console.log(randomNum)
	let pick = questions[randomNum]
	console.log(pick)
	questions.splice(randomNum, 1)
	console.log(questions)
	return pick
}

io.on('connection', socket => {
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('chat message', msg => {
		io.emit('chat message', msg)
	})

	socket.on('user', userName => {
		io.emit('user', userName)
	})

	socket.on('question', () => {
		if (questions.length > 0) {
			io.emit('question', getQuestion())
		} else {
			io.emit('question', "No questions left")
		}
	})
})

http.listen(PORT, () => {
		console.log(`listening on port ${PORT}`)
})
