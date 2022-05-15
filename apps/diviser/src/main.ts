import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    message: 'diviser',
  },
})

export default app
