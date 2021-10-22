import Head from "next/head";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>3Commas Bot CRUD App</title>
			</Head>
			{children}
		</main>
	);
}
