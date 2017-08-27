// URLと時間の保存された設定
document.getElementById("txt_url").value = localStorage.getItem("url") || "http://www.procrasist.com/notube";
document.getElementById("txt_time").value = localStorage.getItem("time") || 30;

document.getElementById("txt_whiteUrl").value = localStorage.getItem("whiteUrlM") || "";

clearInterval( localStorage.getItem( "iId" ) );

var iId = setInterval( function() {
  // 時刻の取得
  var div = document.getElementById( "textDiv" );
  var now_t = new Date();
  diff_min = now_t.getTime() - localStorage.getItem( "start_time" );
  var remain = localStorage.getItem("time") - diff_min/(1000*60);
  if( remain >= 0 && localStorage.getItem( "timer_on" ) === "true" ) {
    var minR = Math.floor(remain);
    div.textContent = "Remaining: " + minR + "m " + ("0"+Math.floor((remain-minR)*60)).slice(-2) + "s";
    div.setAttribute("class", "alert alert-danger");
    // document.getElementById("btn_start").disabled = "true";
  } else {
    div.textContent = "Push Button to Start!";
    div.setAttribute("class", "alert alert-primary");
    document.getElementById("btn_start").disabled = "";
  }
}, 1000/60 );

localStorage.setItem( "iId", iId );

// イベントリスナーを table に追加
document.getElementById( "btn_register" ).addEventListener( "click", function() {
  var url = document.getElementById("txt_url").value;  
  var time = document.getElementById("txt_time").value;
  localStorage.setItem( "url", url );
  localStorage.setItem( "time", time );
}, false );

// スタート
document.getElementById( "btn_start" ).addEventListener( "click", function(){
  var start_t = new Date();
  localStorage.setItem("timer_on", true);
  localStorage.setItem("start_time", start_t.getTime());

  chrome.runtime.sendMessage({
    type: "close_youtube",
    value: {
      "youtube_checked" : document.getElementById("check_youtube").checked,
      "twitter_checked" : document.getElementById("check_twitter").checked
    }
  });
}, false );

document.getElementById( "btn_add" ).addEventListener( "click", function(){
  var wurls = document.getElementById( "txt_whiteUrl" ).value;
  localStorage.setItem( "whiteUrl", wurls );
  localStorage.setItem( "whiteUrlM", wurls );
}, false );

document.getElementById( "txt_whiteUrl" ).addEventListener( "input", function(){
  localStorage.setItem( "whiteUrlM", document.getElementById( "txt_whiteUrl" ).value );
}, false );