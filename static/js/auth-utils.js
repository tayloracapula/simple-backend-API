class AuthManager {
    constructor(){
	this.setupEventListeners();
    }

    setupEventListeners(){
	document.body.addEventListener('htmx:afterRequest', (evt) =>{
	    if (evt.detail.target.id === 'login-result') {
		this.handleLoginResponse(evt);
	    }
	})
    }

    handleLoginResponse(evt) {
	try {	
	    const response = JSON.parse(evt.detail.xhr.responseText);

	    if (response.success) {
	    	this.showSuccess('Login successful')
		setTimeout(() =>{
		    window.location.href = '/dashboard';
		}, 100)
	    }else {
		this.showError('Login failed');	
	    }
	} catch (error) {
	}
    }
    
    showSuccess(message) {
	document.getElementById('login-result').innerHTML = `<div class="success-message">${message}</div>`;
    }

    showError(message) {
	document.getElementById('login-result').innerHTML = `<div class="error-message">${message}</div>`;
    }
}

new AuthManager();
