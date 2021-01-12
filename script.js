var userName = ''
do {
	userName = prompt('enter username: ')
} while (!userName)

var socket = io()
socket.emit('user', userName)

var form = document.getElementById('form')
var input = document.getElementById('input')
var ask = document.getElementById('ask')
var emote = document.getElementById('emote')
var emotes = document.getElementById('emotes')
var emoticons = document.querySelectorAll('.emoticon')

emoticons.forEach((emoticon, idx) => {
	emoticon.addEventListener('click', () => {
		socket.emit('emote', { userName, index: idx + 1 })
		window.scrollTo(0, document.body.scrollHeight)
		emotes.style.display = 'none'
	})
})

form.addEventListener('submit', e => {
	e.preventDefault()
	if (input.value) {
		socket.emit('chat message', { userName, message: input.value })
		input.value = ''
	}
})

ask.addEventListener('click', e => {
	e.preventDefault()
	socket.emit('question')
})

emote.addEventListener('click', e => {
	if (emotes.style.display === 'block') {
		emotes.style.display = 'none'
	} else {
		emotes.style.display = 'block'
	}
})

socket.on('chat message', msg => {
	var item = document.createElement('li')
	item.innerHTML += `<strong>${msg.userName}</strong>:  ${msg.message}`
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})

socket.on('user', userName => {
	var item = document.createElement('li')
	item.innerHTML += `<strong>${userName}</strong> has entered the chat.`
	item.setAttribute('class', 'user')
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})

socket.on('question', question => {
	var item = document.createElement('li')
	item.innerHTML += `<strong>${question}</strong>`
	item.setAttribute('class', 'question')
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})

socket.on('disconnection', userName => {
	var item = document.createElement('li')
	item.innerHTML += `<strong>${userName}</strong> has left the chat.`
	item.setAttribute('class', 'user')
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})

socket.on('img', emote => {
	var item = document.createElement('li')
	item.innerHTML += `<strong>${emote.userName}</strong>: <img src="${emote.index}.png" />`
	messages.appendChild(item)
	window.scrollTo(0, document.body.scrollHeight)
})
