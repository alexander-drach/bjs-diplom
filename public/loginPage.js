'use strict';

const uf = new UserForm();

uf.loginFormCallback = function (data) {
    ApiConnector.login(data, response => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.data);
        }
    });
}

uf.registerFormCallback  = function (data) {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.data);
        }
    });
}