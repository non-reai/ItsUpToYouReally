var http = new XMLHttpRequest

http.open("GET","https://getpantry.cloud/apiv1/pantry/259da317-fbba-4b87-afda-68171f60a086/basket/json")

http.onload = function() {
  let result = JSON.parse(this.responseText)
  for (let i = 0; i < result["Rooms"].length; i++) {
    let b = document.createElement("button")
    b.innerText = result["Rooms"][i]["RoomName"]
    document.getElementById("rooms").appendChild(b)
    b.onclick = function () {
      getPosts(result["Posts"][i]["PostRoomId"],result)
    }
  }
}

http.send();

function getPosts(roomId,result) {
  while (document.getElementById("chat").firstChild) {
    document.getElementById("chat").firstChild.remove()
  }
  let roomIdPosts = []
  for (let i = 0; i < result["Posts"].length; i++) {
    if (result["Posts"][i]["PostRoomId"] == roomId) {
      roomIdPosts.push(result["Posts"][i])
    }
  }
  console.log(roomIdPosts)
  for (let i = 0; i < roomIdPosts.length; i++) {
    let text = document.createElement("p")
    text.innerText = roomIdPosts[roomIdPosts.length-i-1]["PostContent"]
    text.classList.add("post")
    document.getElementById("chat").appendChild(text)
  }
}