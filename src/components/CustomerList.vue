<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Total Borrow Fee Last Year</th>
                    <th scope="col">create_time</th>
                    <th scope="col">Operation</th>
                </tr>
            </thead>
            <tbody>
                <customer-row
                    v-for="customer in showCustomers"
                    :key="customer.pk"
                    :customer="customer"
                />
            </tbody>
        </table>
        <nav>
            <ul class="pagination justify-content-center my-5">
                <li class="page-item">
                    <a class="page-link" :class="{'disabled': currentPage == 1}" href="#" @click.prevent="prevPage"
                        ><span>&laquo;</span> Previous</a
                    >
                </li>
                <li class="page-item" v-for="page in displayPages" :key="page">
                    <a
                        class="page-link"
                        :class="{ active: page == currentPage }"
                        href="#"
                        @click.prevent="changePage(page)"
                        >{{ page }}</a
                    >
                </li>
                <li class="page-item" v-if="totalPages - currentMinPage > pageRange">
                    <a class="page-link">...</a>
                </li>
                <li class="page-item" v-if="currentPage < totalPages-2 && currentPage != totalPages">
                    <a class="page-link" :class="{ active: totalPages == currentPage }" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" :class="{'disabled': currentPage == totalPages}" href="#" @click.prevent="nextPage"
                        >Next <span>&raquo;</span></a
                    >
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import CustomerRow from "./CustomerRow.vue";

export default {
    components: { CustomerRow },
    props: {
        customers: {
            type: Array,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        pageRange: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            currentMinPage: 1,
            currentPage: 1,
            currentMaxPage: this.pageRange,
        };
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
            if (page > this.currentMaxPage / 2 + 1 && page <= this.totalPages - 2) {
                this.currentMinPage = page - 2;
                this.currentMaxPage = this.currentMinPage + this.pageRange - 1;
            }
            if (page < this.currentMinPage + 2 && page >= 3) {
                this.currentMaxPage = page + 2;
                this.currentMinPage = this.currentMaxPage - this.pageRange + 1;
            }
            if (page >= this.totalPages - 2) {
                this.currentMaxPage = this.totalPages;
                this.currentMinPage = this.totalPages - this.pageRange + 1;
            }
            if (page <= 3) {
                this.currentMinPage = 1;
                this.currentMaxPage = this.pageRange;
            }
        },
        nextPage() {
            this.changePage(this.currentPage + 1);
        },
        prevPage() {
            this.changePage(this.currentPage - 1);
        },
    },
    computed: {
        showCustomers() {
            return this.customers.slice(
                (this.currentPage - 1) * this.itemsPerPage,
                this.currentPage * this.itemsPerPage
            );
        },
        totalPages() {
            return Math.ceil(this.customers.length / this.itemsPerPage);
        },
        displayPages() {
            const pages = [];
            for (let i = this.currentMinPage; i <= this.currentMaxPage; i++) {
                pages.push(i);
            }
            return pages;
        },
    },
};
</script>

<style scoped>
/* 這裡可以添加組件特定的樣式 */
</style>
