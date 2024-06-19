<!-- src/components/Layout.vue -->
<template>
    <div>
      <Navbar />
      <router-view />
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  
  export default {
    components: {
      Navbar
    }
  }
  </script>