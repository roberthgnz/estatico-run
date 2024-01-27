import { getTenant } from "~/lib/tenancy";
import { download, objectOutputToResponse } from "~/lib/s3";

export default eventHandler(async (event) => {
    const subdomain = getTenant(event)
    if(!subdomain) return

    const path = event.path === '/' ? '/index.html' : event.path
    const key = `${subdomain}${path}`

    try {
        const file = await download(key) as any

        return objectOutputToResponse(file)
    } catch (_) {
        throw createError({
            statusCode: 404,
            message: 'Not Found'
        })
    }
})