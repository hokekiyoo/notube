// URLと時間の保存された設定
document.getElementById("txt_url").value = localStorage.getItem("url") || "http://www.procrasist.com/notube";
document.getElementById("txt_time").value = localStorage.getItem("time") || 30;

var youtubeC = localStorage.getItem( "youtube_checked" ), twitterC = localStorage.getItem( "twitter_checked" );

document.getElementById("check_youtube").checked = youtubeC == null ? true : youtubeC === "true";
document.getElementById("check_twitter").checked = twitterC == null ? true : twitterC === "true";

document.getElementById("txt_whiteUrl").value = localStorage.getItem("whiteUrlM") || "";

clearInterval( localStorage.getItem( "iId" ) );

var iId = setInterval( function() {
  // 時刻の取得
  var div = document.getElementById( "textDiv" );
  var now_t = new Date();
  diff_min = now_t.getTime() - localStorage.getItem( "start_time" );
  var remain = localStorage.getItem("time") - diff_min/(1000*60);
  var btnStart = document.getElementById( "btn_start" ),
      btnClear = document.getElementById( "btn_clear" );

  if( remain <= 0 && localStorage.getItem( "timer_on" ) === "true" )
  {
    chrome.runtime.sendMessage({
      type: "close_youtube",
      value: {}
    });
  }

  if( remain >= 0 && localStorage.getItem( "timer_on" ) === "true" ) {
    var minR = Math.floor(remain);
    div.textContent = "Remaining: " + minR + "m " + ("0"+Math.floor((remain-minR)*60)).slice(-2) + "s";
    div.setAttribute("class", "alert alert-danger");
    // document.getElementById("btn_start").disabled = "true";

    btnStart.onclick = null;
    btnStart.setAttribute( "class", "btn btn-default" );
    btnClear.onclick = function() {
      localStorage.setItem( "timer_on", false );
    };
    btnClear.setAttribute( "class", "btn btn-primary" );
  } else {
    div.textContent = "Push Button to Start!";
    div.setAttribute( "class", "alert alert-primary" );
    //document.getElementById("btn_start").disabled = "";
    
    if( localStorage.getItem( "timer_on" ) === "true" || btnStart.getAttribute( "class" ) == "btn btn-default" )
    {
      localStorage.setItem( "timer_on", false );
      
      btnStart.onclick = function() {
        var start_t = new Date();
        localStorage.setItem( "timer_on", true );
        localStorage.setItem( "start_time", start_t.getTime() );
        localStorage.setItem( "youtube_checked", document.getElementById("check_youtube").checked );
        localStorage.setItem( "twitter_checked", document.getElementById("check_twitter").checked );
      };
      btnStart.setAttribute( "class", "btn btn-primary" );
      btnClear.onclick = null;
      btnClear.setAttribute( "class", "btn btn-default" );
    }
  }
}, 1000/60 );

localStorage.setItem( "iId", iId );

// イベントリスナーを table に追加
document.getElementById( "btn_register" ).onclick = function() {
  var url = document.getElementById("txt_url").value;  
  var time = document.getElementById("txt_time").value;
  localStorage.setItem( "url", url );
  localStorage.setItem( "time", time );
};

document.getElementById( "btn_add" ).onclick = function(){
  var wurls = document.getElementById( "txt_whiteUrl" ).value;
  localStorage.setItem( "whiteUrl", wurls );
  localStorage.setItem( "whiteUrlM", wurls );
};

document.getElementById( "txt_whiteUrl" ).oninput = function(){
  localStorage.setItem( "whiteUrlM", document.getElementById( "txt_whiteUrl" ).value );
};