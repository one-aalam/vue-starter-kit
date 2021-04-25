<template>
    <AlertList />
  <header></header>
  <router-view></router-view>
  <footer></footer>
</template>

<script lang="ts">
    import { reactive, computed } from "vue";
    import { useHead } from '@vueuse/head'
    import AlertList from '@/lib/alert/AlertList.vue'

    export default {
        components: {
            AlertList
        },
        setup() {
            const siteData = reactive({
                title: `Vue Starter Kit`,
                description: `Vue3 with essential bells and useful whistles`,
            })

            // https://github.com/vueuse/head
            // you can use this to manipulate the document head in any components,
            // they will be rendered correctly in the html results with vite-ssg
            useHead({
                title: computed(() => siteData.title),
                meta: [
                    { name: 'description', content: computed(() => siteData.description) },
                    { property: 'og:title', content: computed(() => siteData.title) },
                    {
                    property: 'og:image',
                    content:
                        'https://repository-images.githubusercontent.com/341177866/d42c1300-7633-11eb-84fd-ec68894d4fc9',
                    },
                ],
            })

        }
    }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
</style>
