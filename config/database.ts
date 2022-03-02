import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const URL = require('url-parse')
const PROD_MYSQL_DB = new URL(Env.get('CLEARDB_DATABASE_URL'))

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | SQLite
    |--------------------------------------------------------------------------
    |
    | Configuration for the SQLite database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i sqlite3
    |
    */
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },

    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST', PROD_MYSQL_DB.host),
        port: Env.get('DB_PORT', ''),
        user: Env.get('DB_USER', PROD_MYSQL_DB.username),
        password: Env.get('DB_PASSWORD', PROD_MYSQL_DB.password),
        database: Env.get('DB_DATABASE', PROD_MYSQL_DB.pathname.substr(1)),
      },
      debug: Env.get('DB_DEBUG', false),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | ORM Configuration
  |--------------------------------------------------------------------------
  |
  | Following are some of the configuration options to tweak the conventional
  | settings of the ORM. For example:
  |
  | - Define a custom function to compute the default table name for a given model.
  | - Or define a custom function to compute the primary key for a given model.
  |
  */
  orm: {},
}

export default databaseConfig
