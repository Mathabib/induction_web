<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
methods: {
  async login() {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Simpan token di localStorage
      localStorage.setItem('token', data.token);

      // Ambil role dari token
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const role = payload.role;

      // Redirect berdasarkan role
      if (role === 'admin') {
        this.$router.push('/admin/users');
      } else {
        this.$router.push('/staff'); // masih dummy
      }
    } catch (error) {
      this.error = error.message;
    }
  }
}

};
</script>
