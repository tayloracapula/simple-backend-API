interface NavItem  {
    href: string;
    label: string;
    htmxTarget: string;
}

interface SidebarProps {
    userRole: 'user'|'manager'|'admin';
    userName: string;
}

export function Sidebar({userRole,userName}:SidebarProps) {

    const baseNav: NavItem[] = [
	{
	    href: "/dashboard/home",
	    label: "Home",
	    htmxTarget: "dashboard-content"
	},
	{
	    href: "/dashboard/new-booking",
	    label: "New Booking",
	    htmxTarget: "dashboard-content"
	},
	{
	    href: "/dashboard/my-bookings",
	    label: "My Bookings",
	    htmxTarget: "dashboard-content"
	}
    ];

    const managerNav: NavItem[] = [
	{
	    href: "/dashboard/team-bookings",
	    label: "Team Bookings",
	    htmxTarget: "dashboard-content"
	},
	{
	    href: "/dashboard/manage-bookings",
	    label: "Manage Bookings",
	    htmxTarget: "dashboard-content"
	}
    ];

    const adminNav: NavItem[] = [
	{
	    href: "/dashboard/admin",
	    label: "Admin Panel",
	    htmxTarget: "dashboard-content"
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
			    hx-get={item.href}
			    hx-target={item.htmxTarget}
			    hx-swap= "innerHTML"
			>
			    {item.label}
			</a>
		    </li>
		))}
	    </ul>
	    {(userRole == 'manager' || userRole == 'admin') && (
		<ul>
		    {managerNav.map(item => (
			<li key={item.href}>
			    <a
				href={item.href}
				class="nav-link"
				hx-get={item.href}
				hx-target={item.htmxTarget}
				hx-swap= "innerHTML"
			    >
				{item.label}
			    </a>
			</li>
		    ))}
		</ul>
	    )}
	    {userRole == 'admin' && (
		<ul>
		    {adminNav.map(item => (
			<li key={item.href}>
			    <a
				href={item.href}
				class="nav-link"
				hx-get={item.href}
				hx-target={item.htmxTarget}
				hx-swap= "innerHTML"
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
