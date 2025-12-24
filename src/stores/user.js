import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userList = reactive([]);
  const total = ref(0);
  const loading = ref(false);
  const error = ref('');

  function setUserList(users) {
    userList.splice(0, userList.length, ...users);
  }

  function setTotal(count) {
    total.value = count;
  }

  function setLoading(isLoading) {
    loading.value = isLoading;
  }

  function setError(errMsg) {
    error.value = errMsg;
  }

  return {
    userList,
    total,
    loading,
    error,
    setUserList,
    setTotal,
    setLoading,
    setError,
  };

});
