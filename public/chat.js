var socket = io.connect('http://localhost:4000');

//Query DOM

var message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	feedback = document.getElementById('feedback');
	output = document.getElementById('output');

console.log(handle.placeholder);

btn.addEventListener('click',function(){
	if(message.value !== "" && handle.placeholder !== 'Username'){
		socket.emit('chat', {
			message: message.value,
			handle: handle.placeholder
		});
		message.value = "";
	}
});

message.addEventListener('keypress',function(){
	socket.emit('typing', handle.placeholder);
});

socket.on('chat', function(data){
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data.handle + 'is typing a message...</em></p>';
});
