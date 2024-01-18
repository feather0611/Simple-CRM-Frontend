<template>
    <div class="container mt-4">
        <div class="d-flex justify-content-between mb-3">
            <h2>客戶頁面</h2>
            <button @click="showPopover = !showPopover" class="btn btn-success">
                新增客戶
            </button>
            <div v-if="showPopover" class="popover">
                <label for="newCustomerName">username</label>
                <input
                    class="customer-input"
                    type="text"
                    id="newCustomerName"
                    v-model="newUserName"
                />
                <button class="btn btn-success create-btn" @click="addCustomer">
                    建立
                </button>
            </div>
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
            newUserName: "",
            showPopover: false,
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
        togglePopover() {
            this.showPopover = !this.showPopover;
        },
        async addCustomer() {
            if ((this.newUserName === "")) {
                alert("Username cannot be empty");
                return;
            }
            const reqData = {
                "username": this.newUserName,
            };
            console.log(reqData);


            try {
                const response = await axios.post(
                    "http://localhost:7189/api/createMember",
                    reqData
                );
                console.log(response);
                alert(
                    "Created successfully, new username: " +
                        this.newUserName +
                        ", ID: " +
                        response.data.pk
                );
                this.newUserName = "";
                this.showPopover = false;
                this.getMembers();
            } catch (error) {
                console.log(error);
                alert("Create failed, Reason: " + error);
            }
        },
    },
    mounted() {
        this.getMembers();
    },
};
</script>

<style scoped>
.popover {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    top: 15px;
    right: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.customer-input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

.create-btn {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
}
</style>
