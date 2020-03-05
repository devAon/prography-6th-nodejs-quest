const pool = require('../modules/db/pool');
const { NotMatchedError } = require('../errors');

const TABLE_NAME = 'todo';
module.exports = {
    readAll: () => {
        const query = `SELECT * FROM ${TABLE_NAME}`;
        return pool.queryParam_Parse(query);
    },
    readByIdx: async (id) => {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        const values = [id];
        const result = await pool.queryParam_Parse(query, values);
        return result[0];
    },
    create: (json) => {
        const query = `INSERT ${TABLE_NAME}(${Object.keys(json).join(', ')}) ` +
        'VALUES(' + Object.entries(json).map(it => `'${it[1]}'`) +')';
        return pool.queryParam_None(query);
    },
    update: async (todoId, json) => {
        const query = `UPDATE ${TABLE_NAME}`
            + ' SET ' + Object.entries(json).map(it => `${it[0]} = '${it[1]}'`).join(', ')
            + ` WHERE id = '${todoId}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    complete: async (todoId) => {
        const query = `UPDATE ${TABLE_NAME} SET iscompleted=1 `
            + ` WHERE id = '${todoId}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    },
    delete: async (todoId) => {
        const query = `DELETE FROM ${TABLE_NAME} WHERE id = '${todoId}'`;
        const result = await pool.queryParam_None(query);
        if(result.affectedRows == 0) throw new NotMatchedError();
        return result;
    }
}