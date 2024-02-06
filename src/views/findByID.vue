<template>
  <v-container>
    <v-card class="mb-12" color="surface-variant" variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        <b> C.Enter employee ID and view employee information within the same page (2.2,2.3)<br>
          <br>
        SQL QUERY: SELECT e.*, d.department_name FROM Employees e INNER JOIN Department d ON e.DepartmentId = d.department_id WHERE e.Id = @Id</b>
        
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12">
        <v-text-field v-model="employeeIdToFind" label="Employee ID"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn @click="findEmployeeById" color="primary">Find Employee by ID</v-btn>
      </v-col>
    </v-row>

    <!-- Visualizzazione dei dati dell'employee trovato -->
    <v-row v-if="foundEmployee">
      <v-col cols="12">
        <h2>Employee Found</h2>
        <p>Employee ID: {{ foundEmployee.empId }}</p>
        <p>Name: {{ foundEmployee.name }}</p>
        <p>Surname: {{ foundEmployee.surname }}</p>
        <p>Position: {{ foundEmployee.position }}</p>
        <p>Department: {{ foundEmployee.department }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      employeeIdToFind: "",
      foundEmployee: null,
    };
  },
  methods: {
    // ... il resto dei tuoi metodi ...
    async findEmployeeById() {
      try {
        const db = firebase.firestore();
        const querySnapshot = await db.collection("employees")
          .where("empId", "==", this.employeeIdToFind)
          .get();

        if (querySnapshot.docs.length > 0) {
          // Trovato un employee con l'empId specificato
          const foundEmployeeData = querySnapshot.docs[0].data();
          this.foundEmployee = {
            id: querySnapshot.docs[0].id,
            ...foundEmployeeData,
          };
        } else {
          // Nessun employee trovato con l'empId specificato
          this.foundEmployee = null;
        }
      } catch (error) {
        console.error('Errore durante la ricerca dell\'employee:', error);
      }
    },
  },
  // ... il resto del tuo script ...
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