<template>
  <div id="app">
    <v-app>
      <v-container>
        <v-card class="mb-12" color="surface-variant" variant="tonal">
          <v-card-text class="text-medium-emphasis text-caption">
            Design web applications using ASP.NET and ADO.NET2.1:
            You are required to develop a web based solution for your organization to manage employee information. Using
            ASP.NET and ADO.NET develop the following functionalities.<br>
            B.Assuming logins are already stored in the database, a login page for admins to login in each department
            (2.3)<br>
            C.Enter employee ID and view employee information within the same page (2.2,2.3)<br>
            D.Update and save employee informatione.Mobile friendly (2.1)
          </v-card-text>
        </v-card>
        <v-card  color="#B7C1B3" variant="tonal" class="text-center">
        <form @submit.prevent="login">
          <h2>Department Login  (2.3)</h2>
          <div class="form-floating">
            <input type="email" class="form-control" id="username" placeholder="Username/Email" required
              v-model="email" />
            <label for="floatingInput">Username</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password"
              required />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </v-card>

      </v-container>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      text: `Assuming logins are already stored in the database, a login page for admins to login in each department (2.3)`,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          //alert('Successfully logged in');
          const user = userCredential.user;
          const uuid = user.uid; // Questo è l'ID univoco dell'utente
          console.log(uuid);
          // Salva l'UUID nel localStorage
          localStorage.setItem("username", this.email);
          this.$router.push("/customize");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
