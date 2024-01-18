<!-- CustomerDetailPage.vue -->
<template>
    <div class="container">
        <div class="button-groups" v-if="isEditMode === false">
            <div class="back-button btn btn-primary" @click.prevent="goBack">
                ← Back
            </div>
            <div
                class="edit-button btn btn-secondary"
                @click.prevent="isEditMode = !isEditMode"
            >
                Edit
            </div>
        </div>
        <div class="button-groups" v-else>
            <div
                class="back-button btn btn-success"
                @click.prevent="updateMember"
            >
                Save
            </div>
            <div class="btn btn-danger" @click.prevent="cancelUpdate">
                Cancel
            </div>
        </div>
        <div class="customer-info">
            <h2>Customer Information</h2>
            <table class="info-table">
                <tbody>
                    <tr>
                        <td><strong>ID</strong></td>
                        <td>{{ customer.pk }}</td>
                    </tr>
                    <tr>
                        <td><strong>Username</strong></td>
                        <td v-if="isEditMode === false">
                            {{ customer.username }}
                        </td>
                        <td v-else>
                            <input type="text" v-model="newUsername" />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Create Time</strong></td>
                        <td>{{ customer.create_time }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="transactions">
            <h2>Transactions</h2>
            <div class="date-filter">
                <label for="startDate">Start Date:</label>
                <input
                    type="date"
                    id="startDate"
                    :min="minDate"
                    :max="maxDate"
                    v-model="startDate"
                    @change="filterTransactions"
                />
                <label for="endDate">End Date:</label>
                <input
                    type="date"
                    id="endDate"
                    :min="minDate"
                    :max="maxDate"
                    v-model="endDate"
                    @change="filterTransactions"
                />
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Borrow Fee</th>
                        <th>Transaction Count</th>
                        <th>Transaction Time</th>
                    </tr>
                </thead>
                <tbody v-if="!isNoTransaction">
                    <tr
                        v-for="transaction in transactions"
                        :key="transaction.pk"
                    >
                        <td>{{ transaction.pk }}</td>
                        <td>{{ displayType(transaction.type) }}</td>
                        <td>{{ transaction.borrow_fee }}</td>
                        <td>{{ transaction.borrow_time }}</td>
                        <td>{{ transaction.create_time }}</td>
                    </tr>
                </tbody>
                <span v-if="isNoTransaction">No data</span>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        transactions: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            customerPk: this.$route.params.id,
            customer: {},
            transactions: [],
            isEditMode: false,
            startDate: "",
            endDate: "",
            newUsername: "",
        };
    },
    computed: {
        maxDate() {
            const today = new Date().toISOString().split("T")[0];
            return today;
        },
        minDate() {
            var minDate = new Date();
            minDate.setDate(minDate.getDate() - 540);
            return minDate.toISOString().split("T")[0];
        },
        isNoTransaction() {
            return (
                this.startDate && this.endDate && this.transactions.length === 0
            );
        },
    },
    methods: {
        async getMember() {
            try {
                const response = await axios.get(
                    `${__API_URL__}/api/member/${this.customerPk}`
                );
                this.customer = response.data;
                this.newUsername = response.data.username;
                console.log(this.customer);
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 404) {
                    alert("Customer not found.");
                    this.$router.push("/");
                }
            }
        },
        async updateMember() {
            const reqData = {
                pk: this.customerPk,
                username: this.newUsername,
            };
            try {
                const response = await axios.put(
                    `${__API_URL__}/api/updateMember`,
                    reqData
                );
                this.customer = response.data;
                this.newUsername = response.data.username;
                console.log(this.customer);
            } catch (error) {
                console.log(error);
                alert("Update failed. Reason: " + error.response.data.message);

                this.newUsername = this.customer.username;
            }
            this.isEditMode = false;
        },
        cancelUpdate() {
            this.isEditMode = false;
            this.newUsername = this.customer.username;
        },
        async getTransactions() {
            if (this.startDate && this.endDate) {
                const start = new Date(this.startDate);
                const end = new Date(this.endDate);
                const reqData = {
                    member_fk: this.customerPk,
                    start_time: this.startDate,
                    end_time: this.endDate,
                };
                try {
                    const response = await axios.post(
                        `${__API_URL__}/api/getMemberPeriodBorrowTotal`,
                        reqData
                    );
                    this.transactions = response.data.borrow_fees;
                    if (this.transactions.length === 0) {
                        alert("No data.");
                    }
                } catch (error) {
                    console.log(error);
                    alert(
                        "Update failed. Reason: " + error.response.data.message
                    );

                    this.transactions = [];
                }
            }
        },
        filterTransactions() {
            if (this.startDate && this.endDate) {
                const start = new Date(this.startDate);
                const end = new Date(this.endDate);
                if (start > end) {
                    alert("Start date must be earlier than end date.");
                    this.startDate = "";
                    this.endDate = "";
                }
                this.getTransactions();
            }
        },
        goBack() {
            this.$router.push("/");
        },
        displayType(type) {
            if (type === 1) {
                return "新簽約";
            } else {
                return "續約";
            }
        },
    },
    mounted() {
        this.getMember();
    },
};
</script>

<style scoped>
.date-filter {
    margin-bottom: 10px;
}

.customer-detail-page {
    display: flex;
    margin-top: 300px;
}

.customer-info {
    float: left;
    width: 50%;
    margin-top: 50px;
    flex: 1;
}

.customer-info h2 {
    color: #333;
}

.info-table {
    width: 60%;
}

.info-table td {
    padding: 8px;
}

.transactions {
    float: left;
    width: 50%;
    margin-top: 50px;
    flex: 1;
    padding: 20px;
}

.transactions h2 {
    color: #333;
}

.date-filter {
    margin-bottom: 10px;
}

.transactions ul {
    list-style: none;
    padding: 0;
}

.transactions li {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.date-filter label {
    margin-right: 10px;
    font-weight: bold;
}

.date-filter input {
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.date-filter button {
    padding: 6px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.date-filter button:hover {
    background-color: #0056b3;
}

.button-groups {
    position: relative;
    top: 30px;
}

.back-button {
    cursor: pointer;
    margin-right: 5px;
}

.back-button:hover {
    text-decoration: underline;
}

.edit-button {
    cursor: pointer;
}

.edit-button:hover {
    text-decoration: underline;
}
</style>
