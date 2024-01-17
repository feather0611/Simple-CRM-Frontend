<!-- CustomerRow.vue -->
<template>
    <tr>
        <th scope="row">{{ customer.pk }}</th>
        <td>{{ customer.username }}</td>
        <td>{{ customer.totalBorrowFeeLastYear }}</td>
        <td>{{ customer.create_time }}</td>
        <td>
            <button @click="viewCustomer(customer.pk)" class="btn btn-success">
                View
            </button>
            <button @click="editCustomer(customer.pk)" class="btn btn-primary">
                Edit
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        customer: {
            type: Object,
            required: true,
        }
    },
    methods: {
        viewCustomer(customerId) {
            // 導航至客戶頁面，你可以使用Vue Router
            // this.$router.push(`/customer/${customerId}`);
            console.log(customerId);
        },
        editCustomer(customerId) {
            // 導航至編輯客戶頁面，你可以使用Vue Router
            // this.$router.push(`/edit-customer/${customerId}`);
            console.log(customerId);
        },
    },
};
</script>

<style scoped>
.btn {
    margin-right: 5px;
}
</style>
