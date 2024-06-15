<template>
    <div>
        <h1>This is the home page.</h1>
        <h3 v-if="message">{{ message }}</h3>
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
        const url = `${process.env.VUE_APP_BACKEND_URL}/home`;
        axios.get(url)
            .then(response => {
                if (response.data && response.data.message) {
                    this.message = response.data.message;
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }
}
</script>

<style scoped>

</style>
