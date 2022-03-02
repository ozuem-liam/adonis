/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors/not-found',
    '500..599': 'erros/server-error',
  }

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(422).send('Not Found')
    }
    return super.handle(error, ctx)
  }
}
