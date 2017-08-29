// popupのボタンによって。
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var min = parseFloat(localStorage.getItem("time"))*1000*60;
    
    (function () {
      var wurls = localStorage.getItem( "whiteUrl" ).split('\n');
      var fl = false;

      chrome.windows.getAll( null, function(windows){
        for (var i=0; i<windows.length; i++) {
          var winId = windows[i].id;
          chrome.tabs.getAllInWindow(winId, function(tabs){
            for (var i = 0; i < tabs.length; i++){
              if (tabs[i].url.match(/www.youtube.com/)){
                if( localStorage.getItem( "youtube_checked" ) === "true" && wurls.indexOf(tabs[i].url) == -1){
                  chrome.tabs.remove(tabs[i].id);
                  fl = true;
                }
              }
              if (tabs[i].url.match(/twitter.com/)){
                if( localStorage.getItem( "twitter_checked" ) === "true" && wurls.indexOf(tabs[i].url) == -1){
                  chrome.tabs.remove(tabs[i].id);
                  fl = true;
                }        
              }
            }

            if( fl )
            {
              if( localStorage.getItem("url") == null || localStorage.getItem("url") == "" )
                window.open( "http://www.procrasist.com", '_blank' );
              else
                window.open( localStorage.getItem("url"), '_blank' );

              alert("ダメダヨ");
            }
          });
        }
      });
    })();
  });