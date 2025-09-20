class Auth {
    constructor(){
	this.s();
    }

    s(){
	document.body.addEventListener('htmx:afterRequest', (evt) =>{
	    if (evt.detail.target.id === 'login-result') {
		this.h(evt);
	    }
	})
    }

    h(evt) {
	try {	
	    const response = JSON.parse(evt.detail.xhr.responseText);

	    if (response.success) {
	    	this.success('Login successful')
		setTimeout(() =>{
		    window.location.href = '/dashboard';
		}, 100)
	    }else {
		this.error('Login failed');	
	    }
	} catch (error) {
	}
    }
    
    success(message) {
	document.getElementById('login-result').innerHTML = `<div class="success-message">${message}</div>`;
    }

    error(message) {
	document.getElementById('login-result').innerHTML = `<div class="error-message">${message}</div>`;
    }
}

new Auth();
