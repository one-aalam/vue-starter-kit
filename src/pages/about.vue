<script lang="ts">
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  export default defineComponent({
    setup() {
      const { t } = useI18n({ useScope: 'global' })

      return { t }
    },
  })
</script>

<template>
  <h1>About</h1>
  <p>{{ t('about.desc') }}</p>
</template>
<route>
{
  meta: {
    layout: "default"
  }
}
</route>
