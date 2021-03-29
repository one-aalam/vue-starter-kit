<template>
  <div>
    <p>index.vue</p>
      <router-link to="/about">
        about
      </router-link>
    <p>
      <router-link to="/profile/1">
        Profile
      </router-link>
    </p>
  </div>
</template>
<route>
{
  meta: {
    layout: "public"
  }
}
</route>
