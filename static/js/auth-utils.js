class A {
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
	    	this.y('Login successful')
		setTimeout(() =>{
		    window.location.href = '/dashboard';
		}, 100)
	    }else {
		this.n('Login failed');	
	    }
	} catch (error) {
	}
    }
    
    y(message) {
	document.getElementById('login-result').innerHTML = `<div class="success-message">${message}</div>`;
    }

    n(message) {
	document.getElementById('login-result').innerHTML = `<div class="error-message">${message}</div>`;
    }
}

new A();
