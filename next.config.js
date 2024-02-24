/** @type {import('next').NextConfig} */
const config = {
	// can be removed in next14
	// https://github.com/vercel/next.js/discussions/58636
	experimental: {
		serverActions: true,
	},
}

module.exports = config
