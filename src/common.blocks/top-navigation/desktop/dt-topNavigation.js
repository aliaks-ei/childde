const signInLink = document.getElementById('signInLink');

function animateSignInLink(el, dashoffset) {
	dashoffset -= 2;

	if (dashoffset < 0) {
		dashoffset = 0;
	}

    el.style.strokeDashoffset = dashoffset + 'px';

	if (dashoffset > 0) {
    	setTimeout(() => animateSignInLink(el, dashoffset), Math.abs(dashoffset) * 2);
  	}
}

signInLink && signInLink.addEventListener('mouseenter', () => {
    for (let line of signInLink.querySelectorAll('.sign-in-line')) {
        setTimeout(animateSignInLink(line, 22), 10);
    }
});
