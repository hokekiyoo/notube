// URLと時間の保存された設定
document.getElementById("txt_url").value = localStorage.getItem("url") || "http://www.procrasist.com/notube";
document.getElementById("txt_time").value = localStorage.getItem("time") || 30;

// 時刻の取得
var div = document.getElementById("textDiv");
var now_t = new Date();
diff_min = now_t.getTime() - localStorage.getItem("start_time");
var remain = parseInt(localStorage.getItem("time") - diff_min/(1000*60));
if(remain>=0){
  div.textContent = "Remaining : "+  remain+ " min, ";
  // document.getElementById("btn_start").disabled = "true";
}else{
  div.textContent = "Push Button to Start!";
  document.getElementById("btn_start").disabled = "";
}
var text = div.textContent; 

// イベントリスナーを table に追加
var el = document.getElementById("btn_register");
el.addEventListener("click", regist, false);
//　登録
function regist() {
  var url = document.getElementById("txt_url").value;  
  var time = document.getElementById("txt_time").value;
  localStorage.setItem("url", url);
  localStorage.setItem("time", time);
  // var message = "Register Completed\n"+
  //               "URL: "+document.getElementById("txt_url").value+"\n"+
  //               "TIMER: "+document.getElementById("txt_time").value;
  // alert(message);  
}
// スタート
var start = document.getElementById('btn_start');
start.addEventListener("click", function(){
  var start_t = new Date();
  localStorage.setItem("timer_on", true);
  localStorage.setItem("start_time", start_t.getTime());
  send();
}, false);

function send(){  
  chrome.runtime.sendMessage({
      type: "close_youtube",
      value: {"youtube_checked":document.getElementById("check_youtube").checked,
              "twitter_checked":document.getElementById("check_twitter").checked}
    });
}