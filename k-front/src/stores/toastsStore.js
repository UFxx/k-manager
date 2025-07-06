import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastsStore = defineStore('toast', () =>
{
	const toasts = ref([]);

	const useToast = (message, type, id = Date.now()) =>
	{
		toasts.value.push({ id: id, message: message, type })

		setTimeout(() => deleteToast(id), 4000)
	};

	const deleteToast = (id) => toasts.value = toasts.value.filter(toast => toast.id !== id);

	return { toasts, useToast, deleteToast };
})