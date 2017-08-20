// イベントリスナーを table に追加
var el = document.getElementById("btn_register");
el.addEventListener("click", regist, false);
//　登録
function regist() {
  var url = info.url.value;  
  var time = info.time.value;
  localStorage.setItem("url", url);
  localStorage.setItem("time", time);
}
// スタート
var start = document.getElementById('btn_start');
// start.addEventListener("click", setTimeout(send, localStorage.getItem("time"), false);
start.addEventListener("click", function(){
  var min = parseFloat(localStorage.getItem("time"))*1000*60;
  setTimeout(send,min);
  }, false);
function send(){
  
  chrome.runtime.sendMessage({
      type: "close_youtube",
      value: {"youtube_checked":kill.youtube.checked,
              "twitter_checked":kill.twitter.checked}
  });
}