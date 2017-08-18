console.log("I am popup.js");

document.getElementById("btn").onclick = function(e){
  hello();
}

function hello() {
  alert("hello");
  chrome.runtime.sendMessage({
      greeting: "hello"
    },
    function(response) {
      document.getElementById("div").textContent = response.msg;
    });
}