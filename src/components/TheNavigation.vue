<script lang="ts" setup></script>

<template lang="pug">
nav( id="main-nav" class="flex flex-column px-2 py-4 bg-gray-300 shadow-2 z-1" )
  ul( class="list-none p-0" )
    li
      RouterLink( to="/" )
        ElButton( plain text ) Home
    li
      RouterLink( :to="{name:'calendar'}" )
        ElButton( plain text ) Calendar
</template>

<style lang="scss">
#main-nav {
  height: 100vh;
  width: 7rem;
  a {
    text-decoration: none;
    display: inline-block;
    width: 100%;
    button {
      @apply text-white;
    }
    &.router-link-exact-active {
      button {
        @apply text-blue-500;
      }
    }
  }
}
</style>
