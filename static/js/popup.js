// URLと時間の保存された設定
document.getElementById("txt_url").value = localStorage.getItem("url") || "http://www.procrasist.com/notube";
document.getElementById("txt_time").value = localStorage.getItem("time") || 30;

for( let i = 0; i < 5; ++i )
  document.getElementById("txt_whiteUrl"+(i+1)).value = localStorage.getItem("whiteUrl"+(i+1)) || "";

clearInterval( localStorage.getItem( "iId" ) );

var iId = setInterval( function() {
  // 時刻の取得
  var div = document.getElementById( "textDiv" );
  var now_t = new Date();
  diff_min = now_t.getTime() - localStorage.getItem( "start_time" );
  var remain = localStorage.getItem("time") - diff_min/(1000*60);
  if( remain >= 0 ) {
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
  for( let i = 0; i < 5; ++i )
  {
    var wurl = document.getElementById( "txt_whiteUrl"+(i+1) ).value;
    localStorage.setItem( "whiteUrl"+(i+1), wurl );
  }
}, false );