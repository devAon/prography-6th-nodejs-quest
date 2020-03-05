const express = require('express');
const router = express.Router({mergeParams: true});
const { ParameterError, NotMatchedError } = require('../../errors');
const Todo = require('../../models/Todo');
const { util, status, message } = require('../../modules/utils');


const NAME = '할일'


//2. 할일 목록: `GET /todos`  ok
router.get('/', async (req, res) => {
    Todo.readAll()
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    })
});

//3. 할일 읽기: `GET /todos/:todoId`  ok
router.get('/:todoId', (req, res) => {
    const { todoId } = req.params;
    if(!todoId) throw new ParameterError();
    Todo.readByIdx(todoId)
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_READ_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});


//1. 할일 등록: `POST /todos`  
router.post('/', (req, res) => {
    const { title, description } = req.body;

    if(!title || !description) throw new ParameterError();
    Todo.create({title, description})
    .then(result => {
        const insertId = result.insertId;
        res.status(status.OK)
        .send(util.successTrue(message.X_CREATE_SUCCESS(NAME), insertId));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});




//4. 할일 수정: `PUT /todos/:todoId`
router.put('/:todoId', (req, res) => {
    const { todoId } = req.params;
    const json = req.body;
    if(!todoId || Object.keys(json).length == 0) throw new ParameterError();
    Todo.update(todoId, json)
    .then(result => {
        const affectedRows = result.affectedRows;
        if(affectedRows == 0) throw new NotMatchedError();
        res.status(status.OK)
        .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME)));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});


//5. 할일 완료: `PUT /todos/:todoId/complete`
router.put('/:todoId/complete', (req, res) => {
    const { todoId } = req.params;

    if(!todoId) throw new ParameterError();
    Todo.complete(todoId)
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_UPDATE_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});



//6. 할일 삭제: `DELETE /todos/:todoId`  ok
router.delete('/:todoId', (req, res) => {
    const { todoId } = req.params;
    if(!todoId) throw new ParameterError();
    Todo.delete(todoId)
    .then(result => {
        const affectedRows = result.affectedRows;
        if(affectedRows == 0) throw new NotMatchedError();
        res.status(status.OK)
        .send(util.successTrue(message.X_DELETE_SUCCESS(NAME)));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

module.exports = router;
