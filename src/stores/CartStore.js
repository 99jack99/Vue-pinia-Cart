import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy, reduce } from "lodash";

import { useLocalStorage } from "@vueuse/core";

import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      /* Usamos useLocalStorage de VueUse para guardar lo que teniamos en el carrito, y guardarlo en nuestro localstorage 
      Cuando se refresque matendra los item */

      items: useLocalStorage("CartStore:items", []),
    };
  },

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,

    /*     crearemos un getter para agrupar por articulo, y lo agruparemos con una funcion de lodash (groupby)  */
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);

      /* luego guardaremos este, en un variable llamada sorted, la cual ordenara por keys.
      Meteremos cada calor de sorted, en inOrder y lo devolveremos. */

      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]));
      return inOrder;
    },

    groupCount: (state) => (name) => state.grouped[name].length,

    /* total price of cart */
    total: (state) => state.items.reduce((a, b) => a + b.price, 0),
  },

  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
      );
    },

    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },

    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});

/* HOT MODULE REPLACEMENT (HMR) para modo development, y asi no tener que recargar la pagina constantemente.
No es necesario */

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
