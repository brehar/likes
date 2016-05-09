'use strict';

var app = angular.module('likesApp');

app.service('Auth', function($http) {
    this.getProfile = () => {
        return $http.get('/api/users/profile');
    };

    this.registerUser = newUser => {
        return $http.post('/api/users/register', newUser);
    };

    this.login = user => {
        return $http.post('/api/users/authenticate', user);
    };

    this.logout = () => {
        return $http.delete('/api/users/logout');
    };
});

app.service('Messages', function($http) {
    this.saveMessage = newMessage => {
        return $http.post('/api/messages', newMessage);
    };

    this.getMessages = () => {
        return $http.get('/api/messages');
    };

    this.addLike = id => {
        return $http.put(`/api/messages/${id}`);
    };
});