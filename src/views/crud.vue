<template>
    <div id="app">
      <v-app>
        <v-container>
          <v-card class="mb-12" color="surface-variant" variant="tonal">
            <v-card-text class="text-medium-emphasis text-caption">
              <b>  D.Update and save employee information (insert )
              E.Mobile friendly (2.1)<br>
              <br>
           
              INSERT: INSERT INTO Employees (Name, Surname, Position, DepartmentId) VALUES (@Name, @Surname, @Position, @DepartmentId)<br>
              UPDATE: UPDATE Employees SET Name = @Name, Position = @Position WHERE Id = @Id<br>
              DELETE: DELETE FROM Employees WHERE Id = @Id<br>
            </b>
            </v-card-text>
          </v-card>
  
          <!-- Pulsante per aprire il modulo di aggiunta di un employee -->
          <v-btn @click="showAddEmployeeForm" color="success">
            <v-icon>mdi-account-plus</v-icon>Add Employee
          </v-btn>
  
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
                  <v-text-field v-model="newEmployee.position" label="Position"></v-text-field>
                  <v-text-field v-model="newEmployee.department" label="Department"></v-text-field>
                  <!-- Pulsante di submit -->
                  <v-btn type="submit" color="success">Add</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>

          <!-- Modulo per l'aggiornamento di un employee -->
        <v-dialog v-model="isUpdateDialogVisible" max-width="500px">
          <v-card>
            <v-card-title>Update Employee</v-card-title>
            <v-card-text>
              <!-- Il tuo form per aggiornare un employee -->
              <v-form ref="updateEmployeeForm" @submit.prevent="updateEmployee">
                <v-text-field v-model="selectedEmployee.name" label="Name"></v-text-field>
                <v-text-field v-model="selectedEmployee.surname" label="Surname"></v-text-field>
                <v-text-field v-model="selectedEmployee.position" label="Position"></v-text-field>
                <v-text-field v-model="selectedEmployee.department" label="Department"></v-text-field>
                <!-- Pulsante di submit -->
                <v-btn type="submit" color="primary">Update</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
  
          <!-- Tabella degli employees -->
          <div class="dashboard">
            <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  Employee_Id
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Surname
                </th>
                <th class="text-left">
                  Position
                </th>
                <th class="text-left">
                  Department
                </th>
                <th class="text-left">
                  Update
                </th>
                <th class="text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.empId }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.surname }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.department }}</td>
                <td>
                    <!-- Pulsanti per aggiornare e eliminare un employee -->
                    <v-btn @click="updateDialog(employee)" color="primary" icon>
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
          </v-table>
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
        isUpdateDialogVisible: false, 
        newEmployee: {
          empId: '',
          name: "",
          surname: "",
          position: "",
          department: "",
        },
        selectedEmployee: null,
      };
    },
    methods: {
      async addEmployee() {
        try {
          const db = firebase.firestore();
          this.newEmployee.empId = uuidv4().split('-')[0];
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
          this.isUpdateDialogVisible = false;
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
          position: "",
          department: "",
        };
      },
      updateDialog(employee) {
        this.isUpdateDialogVisible = true;
        this.selectedEmployee = { ...employee };
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
  