import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Todo listo')
})

app.listen(8000, () => console.log('El servidor está funcionando'))
