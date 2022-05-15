<script lang="ts">
  import { API_URL } from '@teilen/data-access'
  export let message: string

  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      message = data.message
    })
    .catch(console.error)
</script>

<main>
  <h1>{message}</h1>
</main>
