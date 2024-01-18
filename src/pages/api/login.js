import cookie from "cookie"

// https://plainenglish.io/blog/next-js-secure-authentication-using-http-only-cookie-graphql-or-rest
export default async (req, res) => {
	const { accessToken } = req.body

	//TODO: include expires in from server side
	const cookieObj = {
		accessToken,
	}
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("token", JSON.stringify(cookieObj), {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
		})
	)
	res.status(200).json({ success: true })
}

export const setTokenCookie = async (accessToken) => {
	return await fetch("/api/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ accessToken }),
	})
}
