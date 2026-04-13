<template>
    <div class="contact-form">
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" v-model="form.message" required></textarea>          
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
    name: '',
    email: '',
    message: ''
});

const submitForm = () => {
    console.log('Form submitted:', form.value);
};
</script>