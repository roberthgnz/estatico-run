<template>
    <div>
        <header class="container mx-auto p-4">
            <nav class="flex justify-between items-center">
                <h1>
                    <NuxtLink to="/" class="text-primary font-semibold">estatico.run</NuxtLink>
                </h1>
                <ul class="flex items-center gap-4">
                    <li>
                        <FeatureRequestsMenu />
                    </li>
                    <li>
                        <NuxtLink to="https://github.com/roberthgnz/estatico-run" target="_blank"
                            class="inline-flex items-center gap-2">
                            <svg aria-label="github" height="19" viewBox="0 0 14 14" width="19">
                                <path
                                    d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                                    fill="currentColor" fill-rule="nonzero"></path>
                            </svg>
                            Source
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>
        <slot />
        <footer class="container mx-auto p-4">
            <p class="text-center">Built with <NuxtLink to="https://v3.nuxtjs.org/" target="_blank"
                    class="text-primary font-semibold">Nuxt</NuxtLink> on <NuxtLink to="https://vercel.com/" target="_blank"
                    class="text-primary font-semibold">Vercel</NuxtLink>
            </p>
        </footer>
    </div>
</template>
