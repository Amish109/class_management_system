const postgre_sql_connector=async()=>{

    const pg = require('pg');
    const { Client } = pg;
     
    const client = new Client({
      user: 'user_amish',
      password: 'user_amish',
      host: 'localhost',
      port: 5432,
      database: 'cms_class_management_system',
    })

    await client.connect();
    return client
}

module.exports ={
    postgre_sql_connector
}

// await client.query('SELECT NOW()')
// const result = await client.query('SELECT $1::text as name', ['brianc'])