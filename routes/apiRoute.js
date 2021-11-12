const express = require('express');
const route = express.Router();

const TodoModel = require('../models/todoModel');

// read
route.get('/todos', (req, res) => {
    // res.send("The todos are on the way to do")
    TodoModel.find((err, todos) => {
        if (err) {
            console.log(err);
            res.json({ msg: 'Failed to load your Todos', err });
        } else {
            res.json(todos);
        }
    });
});

// add
route.post('/todo', (req, res) => {
    // res.send("New Todo is added")
    console.log(req.body);
    const { title, task, completed = false, theme = '#ffffff', deleted = false, pinned = false } = req.body;

    const newTodo = new TodoModel({
        title, task, completed, theme, deleted, pinned
    })

    newTodo.save((err) => {
        if (err) {
            console.log("error");
            res.json({ msg: 'Failed to create your Todo', err });
        } else {
            res.json({ msg: 'Todo is created successfully' });
        }
    });

});

// delete by Id
route.delete('/todo/:id', (req, res) => {
    // res.send("Todo is deleted")
    TodoModel.deleteOne({ _id: req.params.id }, (err, todo) => {
        if (err) {
            res.json({ msg: 'Failed to delete your Todo', err });
        } else {
            res.json({ msg: 'Todo is deleted successfully' });
        }
    });
});

module.exports = route;



/*
* SAMPLE DATA :
 ? To add
    {
        "title": "First Todo",
        "task" : "Got to go where it is destined",
        "completed": true
    }

 ? To delete
    ids : [
        618d9188b75f59d6aee8c968,
        618d9191b75f59d6aee8c96a,
        618d9196b75f59d6aee8c96c,
        618d919bb75f59d6aee8c96e,
        618d91a1b75f59d6aee8c970,
    ]

 */