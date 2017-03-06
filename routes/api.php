<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// AuthService
Route::resource('login', 'LoginController', ['only' => 'store']);
Route::resource('register', 'RegisterController', ['only' => 'store']);

// General Services
Route::resource('posts', 'PostController', ['only' => ['index', 'show']]);
Route::resource('posts.comments', 'CommentController', ['only' => ['index']]);
Route::resource('tags', 'TagController', ['only' => ['show', 'index']]);
Route::resource('announces', 'AnnounceController', ['only' => ['index']]);
Route::resource('tools', 'ToolController', ['only' => ['index']]);
Route::resource('contact', 'ContactController', ['only' => ['store']]);
Route::resource('solutions', 'SolutionController', ['only' => ['index', 'show']]);
Route::resource('solutions.testimonials', 'TestimonialController', ['only' => ['index', 'show']]);
Route::resource('categories', 'CategoryController', ['only' => ['index', 'show']]);
Route::resource('projects', 'ProjectController', ['only' => ['index', 'show']]);

// Client && Admin Services
Route::group(['middleware' => 'client.only'], function() {
  Route::get('client-status-service', 'UserStatusController@restart');
  Route::resource('posts.comments', 'CommentController', ['only' => ['store']]);
  Route::resource('solutions.testimonials', 'TestimonialController', ['only' => ['store']]);
  Route::get('profile', 'ProfileController@show');
  Route::post('profile', 'ProfileController@update'); // NG-UPLOAD-FILE-SERVICE
  Route::resource('Testimonials', 'TestimonialController', ['only' => ['store']]);
  Route::resource('chat', 'ChatController', ['only' => ['index', 'store']]);
  Route::resource('chat-requests', 'ChatRequestController', ['only' => ['store']]);
  Route::get('chat/status', 'ChatController@checkStatus');
});

// Admin Services
Route::group(['middleware' => 'admin.only'], function() {
  Route::get('admin-status-service', 'UserStatusController@restartAll');
  Route::resource('posts.comments', 'CommentController', ['only' => ['destroy']]);
  Route::resource('solutions.testimonials', 'TestimonialController', ['only' => ['destroy']]);
  Route::resource('posts', 'PostController', ['except' => ['index', 'show']]);
  Route::resource('tags', 'TagController', ['except' => ['show', 'index']]);
  Route::get('tags-names', 'TagController@IndexNames');
  Route::resource('announces', 'AnnounceController', ['except' => ['index', 'show', 'update']]);
  Route::post('announces/{name}', 'AnnounceController@update'); // NG-UPLOAD-FILE-SERVICE
  Route::resource('tools', 'ToolController', ['except' => ['index', 'show', 'update']]);
  Route::post('tools/{slug}', 'ToolController@update'); // NG-UPLOAD-FILE-SERVICE
  Route::resource('solutions', 'SolutionController', ['except' => ['index', 'show', 'update']]);
  Route::post('solutions/{name}', 'SolutionController@update'); // NG-UPLOAD-FILE-SERVICE
  Route::get('solutions-names', 'SolutionController@IndexNames');
  Route::resource('categories', 'CategoryController', ['except' => ['index', 'show']]);
  Route::get('categories-names', 'CategoryController@IndexNames');
  Route::resource('projects', 'ProjectController', ['except' => ['index', 'show', 'update']]);
  Route::post('projects/{name}', 'ProjectController@update'); // NG-UPLOAD-FILE-SERVICE
  Route::resource('Testimonials', 'TestimonialController', ['except' => ['store']]);
  Route::resource('testimonials-requests', 'TestimonialRequestController', ['only' => ['index', 'store', 'destroy']]);
  Route::get('chat/close', 'ChatController@closeRoom');
  Route::resource('chat-requests', 'ChatRequestController', ['only' => ['index', 'destroy']]);
  Route::put('chat-requests/{id}/accept', 'ChatRequestController@acceptRequest');
});

