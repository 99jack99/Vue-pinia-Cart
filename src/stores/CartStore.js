import { defineStore } from "pinia";
import { groupBy, reduce } from "lodash";

import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
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
