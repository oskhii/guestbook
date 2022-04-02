//Loads the json file data as a table on the /guestbook page
if (window.location.pathname == "/guestbook") {
    fetch("messages.json")
    .then (response => response.json())
    .then(data => {
        var out = "<tbody>";
        for (var i = 0; i < data.length; i++) {
            out += '<tr>';
            out += '<td class="info">' + data[i].Date + '</td>';
            out += '<td class="info">' + data[i].Name + '</td>';
            out += '<td class="info">' + data[i].Country + '</td>';
            out += '<td class="message">' + data[i].Message + '</td>';
            out += '</tr>';
        }
        out += "</tbody>";
        document.getElementById("messageData").innerHTML = out;  
    });
};
//Sends a notification to the user when the form on /newmessage is successfully submitted
function notification() {
    alert("The message has been submitted");
}