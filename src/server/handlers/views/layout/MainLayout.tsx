type Props = {
    title: string;
    children: any;
    cssFiles?: string[];
    sidebar?: any;
    showMobileMenu: boolean;
};

export function MainLayout({title,children,cssFiles,sidebar,showMobileMenu=true}: Props) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <script src="/static/js/htmx.min.js" ></script>
		<script src="/static/js/json-enc.js"></script>
		<script defer src="/static/js/alpine.js"></script>
                <link rel="stylesheet" href="/static/css/styles.css" />
		{(cssFiles ?? []).map(cssFile => (
		    <link
			rel="stylesheet"
			href={`/static/css/components/${cssFile}.css`}
			key={cssFile}
		    />
		))}
            </head>
            <body class={title}>
		{showMobileMenu && (
		<button 
		    class="mobile-menu-toggle" 
		    hx-post="/script/toggle-menu" 
		    hx-target="body" 
		    hx-swap="beforeend">
		    ☰
		</button>
		)}
		<div class="layout-container">
		    {sidebar && (
			<aside class="sidebar">
			    {sidebar}
			</aside>
		    )}
		    <main class="main-content">
			{children}
		    </main>
		</div>
		<script src="/static/js/auth-utils.js"></script>
		<script>
		{`
		    function toggleSidebar(){
			document.querySelector('.sidebar').classList.toggle('active')
		    }
		`}
		</script>
            </body>
        </html>
    );
}
