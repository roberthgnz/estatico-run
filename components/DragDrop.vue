<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Progress } from '@/components/ui/progress'

const { toast } = useToast()

const validTypes = [
    'application/vnd.rar',
    'application/zip',
    'application/x-7z-compressed',
    'application/x-zip-compressed',
    'multipart/x-zip',
    'application/x-rar-compressed',
    'application/octet-stream',
    'application/x-compressed',
    'application/x-rar',
    'application/x-tar',
]

const emit = defineEmits<{
    (event: 'success', site: string): void
}>()

const dropZoneRef = ref<HTMLDivElement>()

const { files, open, reset, onChange } = useFileDialog({
    accept: validTypes.join(','),
})

const isValidFile = (file: File) => {
    return validTypes.includes(file.type)
}

const progress = ref<number>(0)

const uploadFile = async (file: File) => {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.append('file', file)

        const xhr = new XMLHttpRequest()
        xhr.open('post', '/api/upload', true)

        xhr.upload.onprogress = function (ev) {
            progress.value = (ev.loaded / ev.total) * 100
        }

        xhr.onload = function () {
            if (this.status === 200) {
                const response = JSON.parse(this.response)
                resolve(response)
            } else {
                reject({ error: { message: 'Something went wrong' } })
            }
        }

        xhr.send(form)
    })
}

const onFileUserUpload = async (files: File[] | FileList | null) => {
    if (!files?.length) return

    const file = files[0]

    if (!isValidFile(file)) {
        reset()
        return toast({
            title: 'Invalid file type',
            description: 'Please upload a valid file type',
            variant: 'destructive',
        })
    }

    const { data, error } = await uploadFile(file)

    reset()

    if (error) return toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
    })

    progress.value = 0

    emit('success', data!.site)
}

onChange((files) => onFileUserUpload(files))

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop: onFileUserUpload,
    dataTypes: validTypes
})
</script>

<template>
    <div class="w-96 h-44 mx-auto">
        <div ref="dropZoneRef"
            class="w-full h-full border border-dashed rounded-md flex flex-col items-center justify-center p-4 text-sm transition-all"
            :class="{ 'border-primary': isOverDropZone }">
            <template v-if="!isOverDropZone">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-12 mb-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <circle cx="10" cy="20" r="2" />
                    <path d="M10 7V6" />
                    <path d="M10 12v-1" />
                    <path d="M10 18v-2" />
                </svg>
                <span>Drag and drop your site compressed file here</span>
                <span>or</span>
                <span class="text-primary font-semibold cursor-pointer" @click="() => open()">browse to upload.</span>
            </template>
            <template v-else>
                <span class="text-primary font-semibold text-4xl">Drop your file here</span>
            </template>
        </div>
    </div>
    <Progress v-if="progress" :model-value="progress" class="w-96 mx-auto" />
    <p class="text-sm text-slate-400 text-center">
        Accepted file types: <span class="font-semibold">.zip, .rar, .7z</span>
    </p>
    <Toaster />
</template>