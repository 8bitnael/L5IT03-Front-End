<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            <b> SQL QUERY: SELECT e.*, d.department_name FROM Employees e INNER JOIN Department d ON e.DepartmentId =
              d.department_id </b>
          </v-card-text>
        </v-card>
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.empId }}</td>
                <td>{{ employee.name }}</td>
                <td>{{ employee.surname }}</td>
                <td>{{ employee.position }}</td>
                <td>{{ employee.department }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-container>
    </v-app>
  </div>
</template>

<script setup>

</script>


<script>
import firebase from "firebase";


export default {
  name: "Dashboard",
  data() {
    return {
      employees: [],
    };
  },
  methods: {
    async deleteEmployee(employeeId) {
      try {
        const db = firebase.firestore();
        await db.collection("employees").doc(employeeId).delete();
        // Aggiorna la lista degli employee dopo l'eliminazione
        this.employees = this.employees.filter((employee) => employee.id !== employeeId);
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
  },
  created() {
    // Chiama la funzione per ottenere gli employee al momento della creazione del componente
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