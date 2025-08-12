
export function Login() {
    return(
        <>
        <div class="login-box">
            <form action="login">
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email"/>
                <label htmlFor="password">Password: </label>
                <input type="text" id="password" name="password" />
            </form> 
        </div>
        <button>CHANGE !</button>
        <div>Lorum ipsum aaaaaaa</div>
        </>
    )
}