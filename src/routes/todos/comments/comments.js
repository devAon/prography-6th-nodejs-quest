const express = require('express');
const router = express.Router({mergeParams: true});
const { ParameterError } = require('../../../errors');
const Comment = require('../../../models/Comment');
const {util, status, message} = require('../../../modules/utils');



const NAME = '댓글'

//8. 할일의 댓글 목록: `GET /todos/:todoId/comments`  ok
router.get('/', async (req, res) => {
    const { todoId } = req.params;
    if(!todoId) throw new ParameterError();
    Comment.readByTodoId(todoId)
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


//9. 할일의 댓글 읽기: `GET /todos/:todoId/comments/:commentId`  ok
router.get('/:commentId', (req, res) => {
    const { commentId } = req.params;
    if(!commentId) throw new ParameterError();
    Comment.readByIdx(commentId)
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


//7. 할일에 댓글 등록: `POST /todos/:todoId/comments`
router.post('/',  (req, res) => {
    const { todoId } = req.params;
    const { content } = req.body;
    if(!todoId ||  !content) throw new ParameterError();
    Comment.create( todoId, content)
    .then(result => {
        res.status(status.OK)
        .send(util.successTrue(message.X_CREATE_SUCCESS(NAME), result));
    })
    .catch(err => {
        console.log(err);    
        res.status(err.status || 500);
        res.send(util.successFalse(err.message));
    });
});

//10. 할일의 댓글 수정: `PUT /todos/:todoId/comments/:commentId`
router.put('/:commentIdx',  (req, res) => {
    const { commentIdx } = req.params;
    const json = req.body;
    if(!commentIdx || Object.keys(json).length == 0) throw new ParameterError();
    Comment.update(commentIdx, json)
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


//11. 할일의 댓글 삭제: `DELETE /todos/:todoId/comments/:commentId`  ok
router.delete('/:commentId',  (req, res) => {
    const { commentId } = req.params;
    if(!commentId) throw new ParameterError();
    Comment.delete(commentId)
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
