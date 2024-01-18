//helpers.js
import { TOKEN_NAME } from "@/lib/constants.js"
import { getTokenCookie } from "../pages/api/access"
export async function extractToken() {
	const res = await getTokenCookie()
	const resBody = await res.json()
	return resBody?.[TOKEN_NAME]
}
