// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
import firebase from 'firebase/app';
import "firebase/firestore";

const app = createApp(App)

registerPlugins(app)

var firebaseConfig = {
    apiKey: 'AIzaSyAi4YcFW2QhoqgEE9Ir9dz7NU8RBZH7NuI',
    authDomain: 'l5it08.firebaseapp.com',
    projectId: 'l5it08',
    storageBucket: 'l5it08.appspot.com',
    messagingSenderId: '88432534502',
    appId: '1:88432534502:web:55badf6d598ac731afec27',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
 
app.mount('#app')
