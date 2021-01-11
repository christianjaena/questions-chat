const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000
const questions = require('./questions')
const fs = require('fs')
const path = require('path')
const { reduce } = require('./questions')

app.use(express.static('./'))
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

function getQuestion() {
	let randomNum = Math.floor(Math.random() * questions.length)
	let pick = questions[randomNum]
	questions.splice(randomNum, 1)
	return pick
}

io.on('connection', socket => {
	socket.on('emote', emote => {
		io.emit('img', emote)
	})

	socket.on('chat message', msg => {
		io.emit('chat message', msg)
	})

	socket.on('user', userName => {
		io.emit('user', userName)
		socket.on('disconnect', () => {
			socket.broadcast.emit('disconnection', userName)
		})
	})

	socket.on('question', () => {
		if (questions.length > 0) {
			io.emit('question', getQuestion())
		} else {
			io.emit('question', 'No questions left')
		}
	})
})

http.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
})
