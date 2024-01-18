import cookie from "cookie"
import { TOKEN_NAME } from "../../lib/constants"
// import jwt_decode from "jwt-decode"

export default async (req, res) => {
	const cookies = cookie.parse(req.headers?.cookie ?? "")
	const appCookie = cookies?.[TOKEN_NAME] ?? ""
	const parsedCookies = appCookie ? JSON.parse(appCookie) : {}
	const accessToken = parsedCookies?.accessToken ?? null
	if (!accessToken) {
		res.status(200).json({ success: true, token: null })
	}
	res.status(200).json({ success: true, token: accessToken })
}

//https://stackoverflow.com/a/76311855/14564427
export const getTokenCookie = () => {
	return fetch("http://localhost:5555/api/access", {
		method: "get",
	})
}
