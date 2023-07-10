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

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', () => {
  return 'running';
});
Route.resource('users', 'UsersController').apiOnly();
Route.resource('userProfiles', 'UserProfilesController').apiOnly();
Route.resource('posts', 'PostsController').apiOnly();
Route.resource('reactions', 'ReactionsController').apiOnly();
Route.resource('comments', 'CommentsController').apiOnly();

// Route.post('login', async ({ auth, request, response }) => {
//   const email = request.input('email');
//   const password = request.input('password');
//   console.log('from login');
//   try {
//      return await auth.use('web').attempt(email, password);

//     response.redirect('/');
//   } catch (error) {
//     console.log(error);
//     return response.badRequest('Invalid credentials');
//   }
// });

Route.post('login', 'LoginController.loggedUser');

// Route.post('login', async ({ auth, request }) => {
//   const email = request.input('email');
//   const password = request.input('password');

//   await auth.use('web').attempt(email, password);
// });

// Route.get('/', async () => {
//   return { hello: 'world' }
// })
