type Props = {
    title: string;
    children: any;
    cssFiles?: string[];
};

export function MainLayout({title,children,cssFiles}: Props) {
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
                {children}
            </body>
        </html>
    );
}
