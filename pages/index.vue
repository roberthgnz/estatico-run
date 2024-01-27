<script setup lang="ts">
useHead({
  title: 'estatico.run',
  meta: [
    { name: 'description', content: 'Upload your website files—HTML, CSS, and JS—via drag and drop.' }
  ]
})

const siteUrl = ref<string>('')

const onSuccessUpload = (site: string) => {
  siteUrl.value = site
}
</script>

<template>
  <div
    class="antialiased bg-background text-foreground min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base">
    <div class="flex-1 flex flex-col gap-y-16 py-14">
      <div class="container mx-auto px-4 sm:px-0 flex flex-col gap-y-4 items-center justify-center">
        <div class="space-y-4">
          <h2 class="text-4xl font-bold text-center">estatico.run</h2>
          <p class="text-center text-pretty">
            Upload your website files—HTML, CSS, and JS—via drag and drop. <br /> Receive a shareable link instantly for
            hassle-free sharing.
          </p>
          <DragDrop @success="onSuccessUpload" />
          <Transition name="bounce">
            <SitePreview v-if="siteUrl" :site-url="siteUrl" />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}</style>