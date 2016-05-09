'use strict';

var app = angular.module('likesApp');

app.controller('mainCtrl', function($scope, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
});

app.controller('loginCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    $scope.loginUser = function() {
        Auth.login($scope.user).then(res => {
            $state.go('home');
        });
    };
});

app.controller('registerCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    $scope.registerUser = function() {
        Auth.registerUser($scope.newUser).then(res => {
            return Auth.login($scope.newUser);
        }).then(res => {
            $state.go('home');
        });
    };
});

app.controller('logoutCtrl', function($state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    Auth.logout().then(res => {
        $state.go('home');
    });
});

app.controller('homeCtrl', function($scope, Auth, Messages) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    Messages.getMessages().then(res => {
        $scope.messages = res.data;
    });
    
    $scope.likePost = function(message) {
        Messages.addLike(message._id).then(res => {
            message.likes++;
        });
    };
});

app.controller('postCtrl', function($scope, $state, Auth, Messages) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    $scope.postMessage = function() {
        $scope.newMessage.createdBy = $scope.currentUser.username;

        Messages.saveMessage($scope.newMessage).then(res => {
            $state.go('home');
        });
    };
});