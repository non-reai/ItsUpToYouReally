var http = new XMLHttpRequest

http.open("GET","https://getpantry.cloud/apiv1/pantry/259da317-fbba-4b87-afda-68171f60a086/basket/json")

var currentRoomId = 0

http.onload = function() {
  let result = JSON.parse(this.responseText)
  getPosts(0,result)
  for (let i = 0; i < result["Rooms"].length; i++) {
    let b = document.createElement("button")
    b.innerText = result["Rooms"][i]["RoomName"]
    document.getElementById("rooms").appendChild(b)
    b.onclick = function () {
      getPosts(result["Rooms"][i]["RoomId"],result)
    }
  }
}

http.send()

function getPosts(roomId,result) {
  currentRoomId = roomId
  while (document.getElementById("chat").firstChild) {
    document.getElementById("chat").firstChild.remove()
  }
  let roomIdPosts = []
  for (let i = 0; i < result["Posts"].length; i++) {
    if (result["Posts"][i]["PostRoomId"] == roomId) {
      roomIdPosts.push(result["Posts"][i])
    }
  }
  for (let i = 0; i < roomIdPosts.length; i++) {
    let div = document.createElement("div")
    document.getElementById("chat").appendChild(div)
    let text = document.createElement("p")
    text.innerText = roomIdPosts[roomIdPosts.length-i-1]["PostContent"]
    div.classList.add("post")
    div.appendChild(text)
  }
}
document.getElementById("postMessage").onclick = function () {
  post()
}
function post() {
  http.open("GET","https://getpantry.cloud/apiv1/pantry/259da317-fbba-4b87-afda-68171f60a086/basket/json")
  http.onload = function() {
    result = JSON.parse(this.responseText)
    result["Posts"].push(
      {
        "PostRoomId": currentRoomId,
        "PostContent": document.getElementById("textMessage").value
      },
    )
    console.log(JSON.stringify(result))
    http.open("POST","https://getpantry.cloud/apiv1/pantry/259da317-fbba-4b87-afda-68171f60a086/basket/json")
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify(result))
  }
  http.send()


}