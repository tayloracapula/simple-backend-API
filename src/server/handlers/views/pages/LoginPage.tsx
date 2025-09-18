import { Login } from "../components/Login";
import { MainLayout } from "../layout/MainLayout";

export function LoginPage() {
    return (
        <MainLayout 
	    title="Login" 
	    cssFiles={["login"]}
	    showMobileMenu={false}
	>
            <h1>Leave Booking</h1>
            <div>sign in</div>
            <Login />
        </MainLayout>
    )
}
