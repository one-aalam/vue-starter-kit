<template>
  <div class="observer" ref="el"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  emits: ['intersect'],
  setup(_, { emit }) {
      const observer = ref<IntersectionObserver>()
      const el = ref<Element>()

      onMounted(() => {
        observer.value = new IntersectionObserver(([entry]) => {
            if (entry && entry.isIntersecting) {
                emit("intersect");
            }
        });
        // @ts-ignore
        observer.value.observe(el.value)
      })

      onUnmounted(() => {
          observer.value?.disconnect()
      })
    return {
        el
    }
    
  }
})
</script>