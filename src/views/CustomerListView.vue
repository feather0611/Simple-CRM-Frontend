<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between mb-3">
            <h2>客戶頁面</h2>
            <button @click="addCustomer" class="btn btn-success">
                新增客戶
            </button>
        </div>
        <customer-list :customers="customers" />
    </div>
</template>

<script>
import axios from "axios";
import CustomerList from "../components/CustomerList.vue";

export default {
    components: { CustomerList },
    data() {
        return {
            customers: [],
            page: 1,
        };
    },
    methods: {
        async getMembers() {
            try {
                const response = await axios.get(
                    "http://localhost:7189/api/members"
                );
                this.customers = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        addCustomer() {
            // 導航至新增客戶頁面
            this.$router.push("/add-customer");
        },
    },
    mounted() {
        this.getMembers();
    },
};
</script>

<style>
/* 這裡可以加入自定義樣式 */
</style>
