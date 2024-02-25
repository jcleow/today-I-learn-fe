import React from "react"
import Navbar from "../components/navbar/navbar"
import type { AppProps } from "next/app"
import { Inter } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] })

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navbar />
			<main className={inter.className}>
				<Component {...pageProps} />
			</main>
		</>
	)
}
