safari.application.addEventListener('beforeNavigate', beforeNavigateHandler, true);
safari.application.addEventListener('message', messageHandler, false);

function beforeNavigateHandler () {

	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('getGlobalFeeds', false);
}

function messageHandler(event) {

	if (event.name == 'putGlobalFeeds') {
		
		checkUrl(event.data);
	}
}

function checkUrl (feeds) {

	var url = safari.application.activeBrowserWindow.activeTab.url;

	for (var i in feeds) {
		if (feeds[i].href == url) {
			console.log('yes!!!');
			safari.application.activeBrowserWindow.activeTab.url = 'http://www.feedly.com/home#subscription/feed/' + feeds[i].href;
		}
	}
}