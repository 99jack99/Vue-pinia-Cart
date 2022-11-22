<script setup>
// imports
import CartWidget from "./CartWidget.vue";

import { useAuthUserStore } from "@/stores/AuthUserStore";
const AuthUserStore = useAuthUserStore();
</script>

<template>
  <header
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>

    <div>
      <span class="mr-5">{{ AuthUserStore.username }}</span>
      <CartWidget class="inline-block" />
    </div>
  </header>
</template>
