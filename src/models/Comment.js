const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors');

const TABLE_NAME = 'comment';
module.exports = {
    readByTodoId: async (todoId) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE todo_id = ?`;
        const values = [todoId];
        return pool.queryParam_Parse(query, values);
    },
    readByIdx: async (commentIdx) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        const values = [commentIdx];
        const result = await pool.queryParam_Parse(query, values);
        return result[0];
    },
    // create: (todoId, content ) => {
    //     const query = `INSERT INTO comment(contents, todo_id) VALUES(?, ?);`
    //     const params = [todoId, content]
    //     return pool.queryParam_Parse(query, params);
    // },
    create: (json) => {
        console.log(model)
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) ` + 
                    'VALUES('+ Object.entries(json).map(it => `'${it[1]}'`).join(',') + ')';
        return pool.queryParam_None(query);
    },
    update: async (commentIdx, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE commentIdx = '${commentIdx}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    delete: async (commentId) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE id = '${commentId}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    }
}