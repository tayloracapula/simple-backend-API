import { Login } from "../components/login";
import { MainLayout } from "../layout/MainLayout";

export function HomePage() {
    return (
        <MainLayout title="Home-Page">
            <h1>Wilkommen, Bitte geben Sie Ihre Daten ein</h1>
            <div>Gimme them deets</div>
            <Login />
        </MainLayout>
    )
}