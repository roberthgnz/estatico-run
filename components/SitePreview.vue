<script setup lang="ts">
import confetti from 'canvas-confetti'

defineProps<{
    siteUrl: string
}>()

onMounted(() => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            y: 0.6,
        },
    })
})
</script>

<template>
    <div class="w-96 mx-auto text-center flex flex-col items-center justify-center gap-4 !mt-8">
        <h3 class="text-4xl font-bold">Your site is live!</h3>
        <p class="text-xl font-bold">
            👇 Check it out! 👇
        </p>
        <p>
            <NuxtLink :to="siteUrl" class="text-pretty underline" target="_blank">
                {{ siteUrl }}
            </NuxtLink>
        </p>
        <p class="text-sm text-slate-400 text-center">
            Your site will be live for 1 day.
        </p>
    </div>
</template>
