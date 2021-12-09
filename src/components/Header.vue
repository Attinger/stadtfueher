<template>
  <div class="d-flex align-center">
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['pageTitle'],
}
</script>
