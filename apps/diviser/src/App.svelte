<script lang="ts">
  export let message: string

  fetch('./api')
    .then((res) => res.json())
    .then((data) => {
      message = data.message
    })
    .catch(console.error)
</script>

<main>
  <h1>{message}</h1>
</main>
