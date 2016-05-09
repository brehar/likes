'use strict';

var app = angular.module('likesApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('post', {
        url: '/post',
        templateUrl: '/html/post.html',
        controller: 'postCtrl',
        resolve: {
            message: function(Auth, $q, $state) {
                return Auth.getProfile().catch(() => {
                    $state.go('home');
                    return $q.reject();
                });
            }
        }
    }).state('login', {
        url: '/login',
        templateUrl: '/html/login.html',
        controller: 'loginCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: '/html/register.html',
        controller: 'registerCtrl'
    }).state('logout', {
        url: '/logout',
        templateUrl: '/html/logout.html',
        controller: 'logoutCtrl'
    });

    $urlRouterProvider.otherwise('/');
});