<template>
    <div class="alert-list absolute w-screen top-6 flex flex-col place-items-center justify-center z-10" role="status" aria-live="polite">
        <div v-for="alert in alerts" class="shadow-md rounded px-3 py-2 text-shadow transition-all mt-2 {{alert.type === 'error' ? 'bg-red-500 text-white' : alert.type === 'success' ? 'bg-green-300 text-gray-800' : 'bg-gray-100 text-gray-800'}}"
            ><p> lorem ipsum
                    <CheckCircleIcon v-if="alert.type === 'success'" class="w-6 inline-block"/>
                    <AlertCircleIcon v-else class="w-6 inline-block"/>
                &nbsp; {{alert?.text}}
            </p>
        </div>
    </div>
</template>
<script lang="ts">
    import { alerts } from './alert.store'
    export default {
        setup() {
            return { alerts }
        }
    }
</script>
