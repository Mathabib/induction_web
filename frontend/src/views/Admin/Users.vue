<template>
  <div>
    <h1>Admin User Management</h1>
    <!-- form buat tambah user, list user, dll -->
    <form @submit.prevent="createUser">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="position" placeholder="Position" />
      <input v-model="role" placeholder="Role" />
      <button type="submit">Create User</button>
    </form>

    <p v-if="message">{{ message }}</p>
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
      role: '',
      message: '',
    };
  },
  methods: {
    async createUser() {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:3000/admin/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
            position: this.position,
            role: this.role,
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Failed to create user');

        this.message = 'User created successfully!';
        // reset form
        this.username = '';
        this.email = '';
        this.password = '';
        this.position = '';
        this.role = '';
      } catch (err) {
        this.message = err.message;
      }
    }
  }
};
</script>
