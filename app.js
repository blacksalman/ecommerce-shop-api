const express = require('express')
const app = express();

app.use(express.json())

const userData = [{
    useId: 1,
    id: 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    useId: 2,
    id: 2,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    useId: 3,
    id: 3,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }];


app.get('/home', (req, res) => {
    res.send(userData)
})


app.get('/home/:id',(req, res) => {
    const id = req.params.id;
    const getDataUpadate = userData.filter(data => data.id == id);
    res.send(getDataUpadate)
})


app.patch('/uphome/:id', (req, res) => {
    const updateTitle = req.body.updateTitle;
    
    const updated = userData.map(data => {
        data.id == id ? data.title = updateTitle : data;
        return data
    })
    res.send(updated)
})


app.post('/createHome', (req, res) => {
    const newUser = req.body.newUser;
    userData.push(newUser);
    res.send(userData)
})

app.delete('/delhome/:id', (req, res)=> {
    const userDeleted = userData.filter(user => user.id != id);
    res.json(userDeleted)
})

app.listen(3030, ()=> console.log("server is running"));