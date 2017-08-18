chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    alert("ダメダヨ");
    chrome.tabs.getAllInWindow(null, function(tabs){
      for (var i = 0; i < tabs.length; i++){
        if (tabs[i].url.match(/www.youtube.com/)){
          chrome.tabs.remove(tabs[i].id)
        }
      }
      window.open('http://blog.hatena.ne.jp/', '_blank');
    }
    );
  }
);
