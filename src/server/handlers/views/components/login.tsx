
export function Login() {
    return(
	<div class="login-container">
	    <form
		class="login-form"
		hx-post="/api/login"
		hx-target="#login-result"
		hx-swap="innerHTML"
		hx-ext="json-enc"
	    >
		<div class="form-group">
		    <input 
			type="email" 
			id="email"
			name="email" 
			placeholder="Email" 
			required />
		</div>
		<div class="form-group">
		    <input 
			type="password" 
			id="password"
			name="password" 
			placeholder="Password" 
			required />
		</div>
		<button type="submit">Sign In </button>
	    </form>
	    <div id="login-result"></div>
	</div>
    );
}
