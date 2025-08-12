type Props = {
    title: string;
    children: any;
};

export function MainLayout({title,children}: Props) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{title}</title>
                <script src="/static/js/htmx.min.js" ></script>
                <link rel="stylesheet" href="/static/css/styles.css" />
            </head>
            <body class={title}>
                {children}
            </body>
        </html>
    );
}
