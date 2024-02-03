<template>
  <div class="dashboard">
    <table>
      <thead>
        <tr>
          <th>Employee Id</th>
          <th>Name</th>
          <th>Department</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
         
      </tbody>
    </table>

    
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Dashboard",
  data() {
    return {
      employees: [],
    };
  },
  methods: {},
  created() {
  
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
tr:hover {
  background-color: lightgrey;
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