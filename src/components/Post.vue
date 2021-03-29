<template>
    <h2 @click="onPostSelected(post)" :class="{ 'selected': selected }">{{ post?.title }} </h2>
    <p>{{ post?.desc }} </p>
  <button @click="likes++">{{ likes }}</button>
</template>

<script lang="ts">

import { ref, defineComponent, toRefs, PropType } from 'vue'
import { Post } from '@/types'

export default defineComponent({
  name: 'Post',
  props: {
    post: {
        type: Object as PropType<Post>,
        required: true,
        default: () => ({
            title: 'Arrow Function Expression'
        }),
    },
  },
  setup: (props, { emit }) => {
    const { post } = toRefs(props)
    const selected = ref(false)

    const toggleSelection = () => selected.value = !selected.value 
    const onPostSelected = (post: Post) => emit('selectPost', post)
    //const providedVotes = this.votes || 0;
    const votes = ref(post.value.likes || 0)
    return { votes, selected, toggleSelection, onPostSelected }
  }
})
</script>

<style scoped>
a {
  color: #42b983;
}
.selected {
    background-color: yellow;
}
</style>