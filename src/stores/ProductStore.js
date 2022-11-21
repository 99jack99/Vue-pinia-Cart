/* importamos para crear nuestro store
 */

import { defineStore } from "pinia";

/* defineStore para definir nuestra store en conccreto, y la exportamos como una varible
toma 2 argumentos:
 1- un nombre de referencia 
 y 
 2- nuestras opciones (state, actions y getters) 
 */
export const useProductStore = defineStore("ProductStore", {
  /* state 

  La parte principal, aqui definimos nuestro datos.
  Inicialmente seria vacio debido aq estos datos vendrian de nuestra API.
  En nuestro caso nosotros lo tenemos en un json. 
  */
  state: () => {
    return {
      products: [],
    };
  },

  /* actions */

  /* ESTOS MUTAN NUESTRO STATE, 

 */

  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
    },
  },
  /* getters */
});
