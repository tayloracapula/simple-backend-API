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
	    <div class="dashboard-container" x-data="dashboardState()">

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
	    <script src="/static/js/components/dashboard-state.js"></script>
	</MainLayout>
    )
}
