<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="position" placeholder="Position" />
      <button type="submit">Register</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-if="success" style="color: green;">{{ success }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      position: '',
      error: '',
      success: ''
    };
  },
  methods: {
    async register() {
      this.error = '';
      this.success = '';
      try {
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            position: this.position
          })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Register failed');
        }
        this.success = data.message;
        // Clear form after success
        this.username = '';
        this.email = '';
        this.password = '';
        this.position = '';

        this.$router.push('/login'); // Redirect ke login setelah registrasi berhasil
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
