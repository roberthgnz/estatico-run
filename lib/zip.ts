import JSZip from 'jszip'
import type { MultiPartData } from 'h3'

export const unzip = async (file: MultiPartData) => {
    const zip = new JSZip();

    const arrayBuffer = new Uint8Array(file.data).buffer;

    const { files } = await zip.loadAsync(arrayBuffer)

    return files
}