const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

const questions = [
	'What are you doing?',
	'What is your name?',
	'Where do you live?',
	'Who is your celebrity crush?',
	"What's your biggest turn-off?",
	'What was your first impression of me?',
	'Do you like huge parties or would you rather spend time in a small group/alone?',
	"What's something weird that you find attractive?",
	"What's the best gift you've ever received and who was it from?",
	"What's one rule to live by?",
	"What's your biggest fear?",
	'Who are you closest to in your family?',
	"What's your love language?",
	'What do you do to relax?',
	"What's a typical Saturday look like for you?",
	'When it comes to priorities like work, life, family, and friends, how does each rank compared to the others?',
	'Are you a dog or cat person?',
	"What is one thing you wish you never did?",
	"Would you rather be incredibly intelligent or incredibly happy?",
	"What’s something you believe that most people don’t?",
	"If you could have one superpower for a day, what would it be?",
	"When in life have you been most nervous?",
	"What celebrity do you have the biggest crush on?",
	"What city has been the best city you’ve ever lived in or travelled to?",
	"What are you doing when you’re at your happiest?",
	"What’s something about your past that most people don’t know about?",
	"Where is the one place in the world that you want to travel to and why?",
	"What is your most bizarre habit?",
	"What was your favourite movie ever?",
	"What was the last book you read?",
	"What’s the best piece of advice that you received from your parents?",
	"What TV show could you just binge watch all day?",
	"What age has been your best so far?",
]

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
