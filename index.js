const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

/*
    - Query params => meusite.com/users?name=diego&age=32 // FILTROS
    - Route params => /users/s      // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    - Request body => { "name": "Diego", "age": }

    - GET          => Buscar informação no back-end
    - POST         => Criar informação no back-end
    - PUT / PATCH  => Alterar/Atualizar informação no back-end
    - DELETE       => Deletar informação no back-end

    - Middleware   => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/

// Query params
/* app.get('/users', (request, response) => {
    const { name, age } = request.query

    return response.json({name, age})
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
}) */


// Route params
/* app.get('/users/:id', (request, response) => {
    const { id } = request.params

    console.log(id)

    return response.json({id})
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
}) */

// Request body
/* app.get('/users', (request, response) => {
    
    const { name, age } = request.body

    return response.json({name, age})
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
}) */

// Middleware
const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex( user => user.id === id)

    if(index < 0) {
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
        return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    
    const user = { id: uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})