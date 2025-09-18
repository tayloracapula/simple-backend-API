class D {
    constructor(){
	this.p();
	this.a();
    }

    p(){
	window.addEventListener('popstate', (e) =>{
	    const p = window.location.pathname;
	    if (p.startsWith('/dashboard/')) {
		const f = '/fragment'+p;
		htmx.ajax('GET',f,{
		    target: '#dashboard-content',
		    swap: 'innerHTML'
		})
		this.u(p);
	    }
	})
    }

    a(){
	this.u(window.location.pathname);

	document.body.addEventListener('htmx:afterRequest', (e) => {
	    if (e.detail.target?.id === 'dashboard-content'){
		this.u(window.location.pathname);
	    }
	})

	document.body.addEventListener('htmx:pushedIntoHistory', (e) =>{
	    this.u(window.location.pathname);
	})
    }
    u(p) {
	document.querySelectorAll('.nav-link').forEach(l =>{
	    l.classList.remove('active');
	})
	document.querySelectorAll('.nav-link').forEach(l =>{
	    const h =l.getAttribute('href');
	    if(h === p) {
		l.classList.add('active');
	    }
	})
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new D();
})
