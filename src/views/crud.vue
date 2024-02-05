<template>
    <div id="app">
        <v-app>
            <v-container>
                <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                    D.Update and save employee information
                    E.Mobile friendly (2.1)
                </v-card-text>
                </v-card>
                <!-- Pulsante per aprire il modulo di aggiunta di un employee -->
                <v-btn @click="showAddEmployeeForm" color="success"><v-icon>mdi-account-plus</v-icon>Add Employee</v-btn>
              
                <!-- Modulo per l'aggiunta di un nuovo employee -->
                <v-dialog v-model="addEmployeeDialog" max-width="500px">
                    <v-card>
                        <v-card-title>Add Employee</v-card-title>
                        <v-card-text>
                            <!-- Il tuo form per aggiungere un nuovo employee -->
                            <v-form ref="addEmployeeForm" @submit.prevent="addEmployee">
                                <v-text-field v-model="newEmployee.empId" label="Employee ID" readonly></v-text-field>
                                <v-text-field v-model="newEmployee.name" label="Name"></v-text-field>
                                <v-text-field v-model="newEmployee.surname" label="Surname"></v-text-field>
                                <v-text-field v-model="newEmployee.department" label="Department"></v-text-field>
                                <!-- Pulsante di submit -->
                                <v-btn type="submit" color="success">Add</v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <!-- Tabella degli employees -->
                <div class="dashboard">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Department</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employees" :key="employee.id">
                                <td>{{ employee.empId }}</td>
                                <td>{{ employee.name }}</td>
                                <td>{{ employee.surname }}</td>
                                <td>{{ employee.department }}</td>
                                <td>
                                    <!-- Pulsanti per aggiornare e eliminare un employee -->
                                    <v-btn @click="updateEmployeeDialog(employee)" color="primary" icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>

                                </td>
                                <td>
                                    <v-btn @click="deleteEmployee(employee.id)" color="error" icon>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </v-container>
        </v-app>
    </div>
</template>
  
<script>
import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';

export default {
    name: "Dashboard",
    data() {
        return {
            employees: [],
            addEmployeeDialog: false,
            updateEmployeeDialog: false,
            newEmployee: {
                empId: '',
                name: "",
                surname: "",
                department: "",
            },
            selectedEmployee: null,
        };
    },
    methods: {
        async addEmployee() {
            try {
                  // Genera un nuovo UUID per l'employee
             
                const db = firebase.firestore();
                const employeesCollection = await db.collection('employees').get();
                // Imposta l'ID del nuovo employee come size + 1
                // this.newEmployee.empId = uuidv4();
                this.newEmployee.empId = employeesCollection.size + 1;
 

                await db.collection("employees").add(this.newEmployee);
                this.addEmployeeDialog = false;
                this.getAllEmployees();
            } catch (error) {
                console.error('Errore durante l\'aggiunta dell\'employee:', error);
            }
        },
        async updateEmployee() {
            try {
                const db = firebase.firestore();
                await db.collection("employees").doc(this.selectedEmployee.id).update(this.selectedEmployee);
                this.updateEmployeeDialog = false;
                this.getAllEmployees();
            } catch (error) {
                console.error('Errore durante l\'aggiornamento dell\'employee:', error);
            }
        },
        async deleteEmployee(employeeId) {
            try {
                const db = firebase.firestore();
                await db.collection("employees").doc(employeeId).delete();
                this.getAllEmployees();
            } catch (error) {
                console.error('Errore durante l\'eliminazione dell\'employee:', error);
            }
        },
        async getAllEmployees() {
            try {
                const db = firebase.firestore();
                const employeesCollection = await db.collection('employees').get();
                this.employees = employeesCollection.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Errore durante il recupero degli employee:', error);
            }
        },
        showAddEmployeeForm() {
            this.addEmployeeDialog = true;
            this.newEmployee = {
                name: "",
                surname: "",
                department: "",
            };
        },
        updateEmployeeDialog(employee) {
            this.selectedEmployee = { ...employee };
            this.updateEmployeeDialog = true;
        },
    },
    created() {
        this.getAllEmployees();
    },
};
</script>
  
<style scoped>
table {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid teal;
    border-radius: 3px;
    background-color: #fff;
    width: 50%;
}

th {
    background-color: #555555;
    color: white;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
}

tr {
  background-color: rgb(135, 134, 134);
}

tr:hover {
  background-color: rgb(81, 81, 81);
}

td {
    text-align: center;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

router-link {
    background-color: lightslategray;
}

.view {
    padding: 10px 24px;
    cursor: pointer;
    text-align: center;
    background-color: #008CBA;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
}


</style>