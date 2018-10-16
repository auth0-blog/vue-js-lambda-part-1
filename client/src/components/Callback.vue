<script>
import auth0Client from '../AuthService'

export default {
  name: 'Callback',
  async created () {
    await auth0Client.handleAuthentication()
    this.$router.push('/')
  }
}
</script>

<template>
  <div>
    <p>Loading your profile...</p>
  </div>
</template>

<style scoped>
div > p {
  margin: 0 auto;
  text-align: center;
  font-size: 22px;
}
</style>
