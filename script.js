

// localstrageでグローバルな時間管理可能⇛挙動が不明
// popupもオシャレにする
// ボタンでリロード出来るようにする
// URLとホワイトリスト設定できるようにする
// chrome.tabsを使ってyoutubeタブを全削除　OK
// イベントハンドラでDOMをアレする　http://qiita.com/liubin/items/81d6f5b4c574e93e9e40

var send = function(){
  localStorage.removeItem("init");
  chrome.runtime.sendMessage(
    {
      type: "close_youtube",
    },
    function (response) {
      if (response) {
          alert(response);
      }
    }
  );
}

alert(localStorage.getItem("init"));
if(localStorage.getItem("init")==null){
  localStorage.setItem("init", 1);
  setTimeout(send,5000);
}

