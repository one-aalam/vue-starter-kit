<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  }
})
</script>


<template>
    <h1>Profile {{id}}</h1>
</template>
<route>
{
  meta: {
    layout: "private"
  }
}
</route>