type Props = {
    title: string;
    children: any;
    cssFiles?: string[];
    sidebar?: any;
};

export function MainLayout({title,children,cssFiles,sidebar}: Props) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <script src="/static/js/htmx.min.js" ></script>
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
                <button 
		    class="mobile-menu-toggle" 
		    hx-post="/script/toggle-menu" 
		    hx-target="body" 
		    hx-swap="beforeend">
		    ☰
		</button>
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
            </body>
        </html>
    );
}
