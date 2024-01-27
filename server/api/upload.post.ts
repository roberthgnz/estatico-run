import { nanoid } from 'nanoid'
import mime from 'mime-types'

import { upload } from "~/lib/s3";
import { unzip } from "~/lib/zip";

/**
 * Remove root folder from file name if exists
 */
const getSecureName = (name: string) => {
    const parts = name.split('/')

    return parts[parts.length - 1]
}

export default defineEventHandler(async (event) => {
    try {
        const data = await readMultipartFormData(event)

        const file = data?.find((item) => item.name === 'file')

        if (!file) {
            return { data: null, error: 'File not found' }
        }

        const files = await unzip(file)

        const _uuid = nanoid(8).toLowerCase()

        await Promise.all(Object.keys(files).map(async (name) => {
            const zipObject = files[name]

            const blob = await zipObject.async('blob')
            const arrayBuffer = await blob.arrayBuffer();

            const sName = getSecureName(zipObject.name)
            const key = `${_uuid}/${sName}`

            const _file = {
                data: Buffer.from(arrayBuffer),
                type: mime.lookup(sName) || 'application/octet-stream',
                name: sName,
                filename: sName
            }

            return upload(key, _file)
        }))

        const host = getRequestHost(event)
        const protocol = getRequestProtocol(event)

        return {
            data: {
                site: `${protocol}://${_uuid}.${host}`,
                expires: new Date(Date.now() + 86400 * 1000).toISOString()
            },
            error: null
        }
    } catch (error: any) {
        return { data: null, error: error.message }
    }
})