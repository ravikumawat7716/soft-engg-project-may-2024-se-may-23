<template>
    <div>
        <h1>This is the home page.</h1>
        <h3 v-if="message">{{ message }}</h3>
        <h3 v-else>No message available</h3>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "HomePage",
    data() {
        return {
            message: ''
        };
    },
    mounted() {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log(backendUrl)
        const url = `${backendUrl}/home`;

        console.log('Backend URL:', backendUrl);
        console.log('Full URL:', url);

        axios.get(url)
            .then(response => {
                console.log('Response data:', response.data);
                if (response.data && response.data.message) {
                    this.message = response.data.message;
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                this.message = 'An error occurred while fetching the data.';
            });
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
