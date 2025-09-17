import {MainLayout} from "../layout/MainLayout"
import {Sidebar} from "../components/Sidebar"

type DashboardProps = {
    userRole: 'user'|'manager'|'admin';
    userFirstname: string;
    userLastname: string;
    userId: number;
};

export function Dashboard({userRole,userFirstname,userLastname,userId}:DashboardProps) {
    const sidebar = <Sidebar userRole={userRole} userName={`${userFirstname} ${userLastname}`}/>

    return(
	<MainLayout 
	    title = "Dashboard"
	    cssFiles={["dashboard"]}
	    sidebar={sidebar}
	    showMobileMenu={true}
	>
	    <div class="dashboard-container">
		<div id="dashboard-content" class="dashboard-main">
		</div>
	    </div>
	</MainLayout>
    )
}
