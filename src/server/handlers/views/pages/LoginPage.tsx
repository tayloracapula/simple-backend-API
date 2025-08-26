import { Login } from "../components/login";
import { MainLayout } from "../layout/MainLayout";

export function LoginPage() {
    return (
        <MainLayout title="Home-Page" cssFiles={["login"]}>
            <h1>Leave Booking</h1>
            <div>sign in</div>
            <Login />
        </MainLayout>
    )
}
