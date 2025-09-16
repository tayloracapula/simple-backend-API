import {MainLayout} from "../layout/MainLayout"
import {Sidebar} from "../components/Sidebar"

type DashboardProps = {
    userRole: 'user'|'manager'|'admin';
    userName: string;
};

export function Dashboard({userRole,userName}:DashboardProps) {
    const sidebar = <Sidebar userRole={userRole} userName={userName}/>

    return(
	<MainLayout 
	    title = "Dashboard"
	    cssFiles={["dashboard"]}
	    sidebar={sidebar}
	>
	    <div class="dashboard-container">
		<div id="dashboard-content" class="dashboard-main">
		</div>
	    </div>
	</MainLayout>
    )
}
