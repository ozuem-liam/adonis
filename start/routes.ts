/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    Route.get('/category', 'CategoriesController.index')
    Route.post('/category', 'CategoriesController.store')
    Route.get('/category/:id', 'CategoriesController.getOne')
    Route.patch('/category/:id', 'CategoriesController.update')
    Route.delete('/category/:id', 'CategoriesController.destroy')

    Route.get('/subcategory/all/:id', 'SubCategoriesController.index')
    Route.post('/subcategory/:id', 'SubCategoriesController.store')
    Route.get('/subcategory/:id', 'SubCategoriesController.getOne')
    Route.patch('/subcategory/:id', 'SubCategoriesController.update')
    Route.delete('/subcategory/:id', 'SubCategoriesController.destroy')

    Route.get('/product/all/:id', 'ProductsController.index')
    Route.post('/product/:id', 'ProductsController.store')
    Route.get('/product/:id', 'ProductsController.getOne')
    Route.patch('/product/:id', 'ProductsController.update')
    Route.delete('/product/:id', 'ProductsController.destroy')
  }).middleware('auth')

  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
}).prefix('api')
