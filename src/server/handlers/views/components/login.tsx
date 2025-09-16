
export function Login() {
    return(
	<div class="login-container">
	    <h1>Leave Booking</h1>
	    <form
		class="login-form"
	    >
		<input type="email" name="email" placeholder="Email" required />
		<input type="password" name="password" placeholder="Password" required />
	    </form>
	</div>
    )
}
