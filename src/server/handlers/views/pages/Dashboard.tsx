import {MainLayout} from "../layout/MainLayout"
import {Sidebar} from "../components/Sidebar"

type DashboardProps = {
    userRole: 'User'|'Manager'|'Admin';
    userFirstname: string;
    userLastname: string;
    userId: number;
    currentPath: string;
};

export function Dashboard({userRole,userFirstname,userLastname,userId,currentPath}:DashboardProps) {
    const sidebar = <Sidebar userRole={userRole} userName={`${userFirstname} ${userLastname}`}/>

    const getFragmentPath = (path:string) =>{
	if (path == '/dashboard') {
	    return "fragment/dashboard/home"
	};
	if (path.startsWith("/dashboard")) {
	    return `/fragment${path}`
	};
	return "/fragment/dashboard/home"
    }

    const fragmentPath = getFragmentPath(currentPath || '/dashboard/home');

    return(
	<MainLayout 
	    title = "Dashboard"
	    cssFiles={["home","dashboard","calendar","team-booking","booking","admin"]}
	    sidebar={sidebar}
	    showMobileMenu={true}
	>

	<script src="/static/js/components/dashboard-state.js"></script>
	<script src="/static/js/page-utils.js"></script>
	<script src="/static/js/components/booking-form.js"></script>
	<script src="/static/js/components/calendar-state.js"></script>
	<script src="/static/js/components/team-view.js"></script>
	<script src="/static/js/components/admin-portal.js"></script>
	<script src="/static/js/components/home.js"></script>
	    <div class="dashboard-container" x-data="dashboardState()" >

		<div x-show="notifications.length > 0" class="notifications">
		    <template x-for="notification in notifications" x-key="notification.id">
			<div class="notification"
			    x-class="notification.type"
			    x-show="notification.visible"
			    x-transition>
			</div>
			<span x-text="notification.message"></span>
			<button x-on:click="dismissNotification(notification.id)">x</button>
		    </template>
		</div>

		<div id="dashboard-content" 
		    class="dashboard-main"
		    hx-get={fragmentPath}
		    hx-trigger="load"
		    hx-swap="innerHTML"
		    hx-push-url={currentPath || "/dashboard/home"}
		>
		    <div class="loading-display">
			<p>Loading ...</p>
		    </div>
		</div>
	    </div>
	</MainLayout>
    )
}
