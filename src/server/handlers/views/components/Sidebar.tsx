interface NavItem  {
    href: string;
    hxGet: string;
    label: string;
}

interface SidebarProps {
    userRole: 'User'|'Manager'|'Admin';
    userName: string;
}

export function Sidebar({userRole,userName}:SidebarProps) {

    const baseNav: NavItem[] = [
	{
	    href: "/dashboard/home",
	    hxGet:"/fragment/dashboard/home",
	    label: "Home",
	},
	{
	    href: "/dashboard/new-booking",
	    hxGet:"/fragment/dashboard/new-booking",
	    label: "New Booking",
	},
	{
	    href: "/dashboard/my-bookings",
	    hxGet: "/fragment/dashboard/my-bookings",
	    label: "My Bookings",
	}
    ];

    const managerNav: NavItem[] = [
	{
	    href: "/dashboard/team-bookings",
	    hxGet: "/fragment/dashboard/team-bookings",
	    label: "Team Bookings",
	},
	{
	    href: "/dashboard/manage-bookings",
	    hxGet: "/fragment/dashboard/manage-bookings",
	    label: "Manage Bookings",
	}
    ];

    const adminNav: NavItem[] = [
	{
	    href: "/dashboard/admin",
	    hxGet: "/fragment/dashboard/admin",
	    label: "Admin Portal",
	}
    ]

    return (
	<nav class="sidebar-nav">
	    {userName &&(
		<div class="user-info">
		    <h3>Hello {userName}</h3>
		</div>
	    )}
	    <ul class="nav-section">
		{baseNav.map(item => (
		    <li key={item.href}>
			<a
			    href={item.href}
			    class="nav-link"
			    hx-get={item.hxGet}
			    hx-target="#dashboard-content"
			    hx-swap= "innerHTML"
			    hx-push-url={item.href}
			>
			    {item.label}
			</a>
		    </li>
		))}
	    </ul>
	    {(userRole == 'Manager' || userRole == 'Admin') && (
		<ul class="nav-section">
		    {managerNav.map(item => (
			<li key={item.href}>
			    <a
				href={item.href}
				class="nav-link"
				hx-get={item.hxGet}
				hx-target="#dashboard-content"
				hx-swap= "innerHTML"
				hx-push-url={item.href}
			    >
				{item.label}
			    </a>
			</li>
		    ))}
		</ul>
	    )}
	    {userRole == 'Admin' && (
		<ul class="nav-section">
		    {adminNav.map(item => (
			<li key={item.href}>
			    <a
				href={item.href}
				class="nav-link"
				hx-get={item.hxGet}
				hx-target="#dashboard-content"
				hx-swap= "innerHTML"
				hx-push-url={item.href}
			    >
				{item.label}
			    </a>
			</li>
		    ))}
		</ul>
	    )}
	</nav>
    )
}
