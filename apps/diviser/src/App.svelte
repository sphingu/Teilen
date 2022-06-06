<script lang="ts">
  export let message: string

  fetch('./api')
    .then((res) => res.json())
    .then((data) => {
      message = JSON.stringify(data)
    })
    .catch(console.error)
</script>

<main>
  <h1>{message}</h1>
  <a href="/api/auth/google">Sign in to Google</a>
</main>
