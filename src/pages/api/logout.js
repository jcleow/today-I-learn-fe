import { TOKEN_NAME } from "@/lib/constants.js"

//https://stackoverflow.com/a/67569504/14564427
// Setting the cookie to be max-age = 0 will expire the cookie immediately
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
export default async (_, res) => {
	res.setHeader("Set-Cookie", `${TOKEN_NAME}=deleted; Max-Age=0; path=/`)
	res.status(200).json({ success: true })
}

export const clearTokenCookie = async () => {
	return await fetch("/api/logout", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
	})
}
