import {MainLayout} from "../layout/MainLayout"
import {Sidebar} from "../components/Sidebar"

type DashboardProps = {
    userRole: 'User'|'Manager'|'Admin';
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
		<div id="dashboard-content" 
		    class="dashboard-main"
		    hx-get="/fragment/dashboard/home"
		    hx-trigger="load"
		    hx-swap="innerHTML"
		    hx-push-url="/dashboard/home"
		>
		    <div class="loading-display">
			<p>Loading ...</p>
		    </div>
		</div>
	    </div>
	    <script src="/static/js/page-utils.js"></script>
	</MainLayout>
    )
}
