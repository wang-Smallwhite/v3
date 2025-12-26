import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// setup store
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0);
//   const doubleCount = computed(() => count.value * 2);

//   function increment() {
//     count.value++;
//   }
//   function decrement() {
//     count.value--;
//   }
//   // setup 需要自己手写重置方法
//   function reset() {
//     count.value = 0;
//   }
//   return {
//     count,
//     doubleCount,
//     increment,
//     decrement,
//     reset,
//   };

// })

// option store
export const useCounterStore = defineStore('counter', {
  // state
  state: () => ({
    count: 0,
    age: 18,
  }),
  // getters
  getters: {
    doubleCount: (state) => state.count * 2,
    getAge: (state) => state.age,
    // 向 getter传参
    getAgePlus(state) {
      return (num) => state.age + num;
    }
  },
  // actions
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
