<template>
    <div class="w-full h-auto flex justify-center content-center" v-show="loading">
        <div class="flex h-16 w-16 justify-center content-center mt-12">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-16 w-16 bg-purple-200 animate-bounce"></span>
        </div>
    </div>
</template>