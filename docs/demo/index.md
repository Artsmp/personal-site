---
title: 小 demo
lang: zh-CN
editLink: true
---

<script setup>
import AnimationInput from '../components/AnimationInput.vue'
</script>

# 这是一些练习小 demo

:tada: :100:

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: details
This is a details block.
:::

::: raw
Wraps in a <div class="vp-raw"/>
:::

```js{1,4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

<<< @/components/test.vue{5}

<<< @/components/test.vue#increment{1 js}

<!--@include: ./test-include.md-->

<AnimationInput />
