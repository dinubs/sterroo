window.onload = function() {
	var aTags = document.querySelectorAll('a');
	var i = 0, l = aTags.length;

	for (i = 0; i < l; i++) {
		if (aTags[i].href === window.location.href) {
			aTags[i].classList.add('active');
		}
	}
}