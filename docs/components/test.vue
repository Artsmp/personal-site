<template>
  <h1>Hello World</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const counter = ref(0);

// #region increment
const increment = () => {
  counter.value++;
};
// #endregion increment
</script>
