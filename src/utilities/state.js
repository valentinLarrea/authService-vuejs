import { ref } from "vue";

export function setState() {
    const loading = ref(false);

    const setError = (msg) => {
        loading.value = false;
        return msg;
    }

    const setSuccess = (msg) => {
        loading.value = false;
        return msg;
    }

    return {
        setError,
        setSuccess
    };
}