var socket = io();
var username = "";

//-----------------------------------------------------------------------------
// Emit chat message when enter key is pressed.
//-----------------------------------------------------------------------------
$("#chat-input").keydown(function(event) { 
  if (event.keyCode == 13) {
	  event.preventDefault();
	  if ($("#chat-input").val() != "") {
		  socket.emit("chat-message", $("#chat-input").val(), username);
		  $("#chat-input").val("");
		  $("#chat-username").val("");
	  }
  }
});

//-----------------------------------------------------------------------------
// Emit chat message on send button
//-----------------------------------------------------------------------------
$( "#send" ).click(function() {
  if ($("#chat-input").val() != "") {
	  socket.emit("chat-message", $("#chat-input").val(), username);
	  $("#chat-input").val("");
	  $("#chat-username").val("");
  }
});

//-----------------------------------------------------------------------------
// Define Username.
//-----------------------------------------------------------------------------
$("#chat-username").keydown(function(event) {
      if (event.keyCode == 13) {
          event.preventDefault();
          if ($("#chat-username").val() != "") {
			 $('#enter-username').stop().fadeOut(200);
             username = $("#chat-username").val();
             $("#chat-username").val("");
          }
      }
});

//-----------------------------------------------------------------------------
// Receive chat message from server.
//-----------------------------------------------------------------------------
socket.on("chat-message", function(message, username) {
    $("#chat-container").append("<b>" + username + "</b>: " + message + "<br />")
});
