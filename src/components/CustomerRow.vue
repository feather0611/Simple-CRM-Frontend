<template>
    <tr>
        <th scope="row">{{ customer.pk }}</th>
        <td>{{ customer.username }}</td>
        <td>{{ customer.totalBorrowFeeLastYear }}</td>
        <td>{{ customer.create_time }}</td>
        <td>
            <button @click="viewCustomer(customer.pk)" class="btn btn-primary">
                View & Edit
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
            this.$router.push(`/customer/${customerId}`);
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
