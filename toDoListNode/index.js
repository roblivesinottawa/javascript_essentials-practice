const { response } = require('express')
const express = require('express')
const fs = require('fs')
const { stringify } = require('querystring')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))

app.get('/', (req, res) => {
    return res.send('hello world')
})

app.get('/todos', (req, res) => {
    // filter to dos by complete and incomplete
    const showPending = req.query.showpending



    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if(err) {
            return res.status(500).send('something went wrong')
        }
        const todos = JSON.parse(data)

        if (showPending !== "1") {
            return res.json({todos: todos })
        } else {
            return res.json({todos: todos.filter(t => { return t.complete === false }) })
        }


        
    })
})

app.put('/todos/:id/complete', (req, res) => {
    const id = req.params.id

    // function to find to do by id
    const findToDoById = (todos, id) => {
        for (let i = 0; i < todos.length; i++){
            if (todos[i].id === parseInt(id)){
                return i
            }
        }
        return -1
    }

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('something went wrong')
        }
  
    let todos = JSON.parse(data)
    const todoIndex = findToDoById(todos, id)
    
    if (todoIndex === -1){
        return response.status(404).send('sorry not found')
    }
    todos[todoIndex].complete = true

    fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
        return res.json({ 'status': 'ok' })
    })
})
})

// allowing the user to add todos

app.post('/todo', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send('missing name')
    }

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('something went wrong')
        }
        const todos = JSON.parse(data)
        const maxId = Math.max.apply(Math, todos.map(t => { return t.id }))

        todos.push({
            id: maxId + 1,
            complete: false,
            name: req.body.name
        })
        fs.writeFile('./store/todos.json', JSON.stringify(todos), () => {
            return res.json({'status': 'ok'})
        })
        
    })
})


app.listen(port, () => console.log(`application running on port ${port}`))