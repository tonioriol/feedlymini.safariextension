if(window === window.top) {
	// Setup message event listener
	safari.self.addEventListener('message', messageHandler, false);

	// Message event listener function
	function messageHandler(event) {

		if (event.name == 'getPopoverFeeds') {

			var feeds = getFeedlyFeeds();

			safari.self.tab.dispatchMessage('putPopoverFeeds', feeds);

		} else if (event.name == 'getGlobalFeeds') {

			var feeds = getFeeds();

			safari.self.tab.dispatchMessage('putGlobalFeeds', [event.message, feeds]);
		}
	}

	/**
	* 
	* Scan page and return the feed sources concatenated with feedly url
	*
	*/

	function getFeedlyFeeds () {

		var feeds = getFeeds();

		for (var i in feeds) {
			feeds[i].href = 'http://www.feedly.com/home#subscription/feed/' + feeds[i].href;
		}

		return feeds;
	}

	function getFeeds () {

		var elements = document.getElementsByTagName('link');
		var feeds = [];

		var j = 0;

		for (var i in elements) {
			if (elements[i].type == 'application/rss+xml' || elements[i].type == 'application/atom+xml') {
				var feed = {
					'href' : elements[i].href,
					'title' : elements[i].title == '' ? 'Feed' : elements[i].title,
					'type' : elements[i].type == 'application/rss+xml' ? 'RSS' : 'Atom'
				};
				feeds.push(feed);
			}
		}

		console.log('feeds: ', feeds);

		return feeds;
	}
}