<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>


<template>
    <h1>Profile {{props.id}}</h1>
</template>
<route>
{
  meta: {
    layout: "private"
  }
}
</route>