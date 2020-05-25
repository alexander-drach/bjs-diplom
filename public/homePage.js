'use strict';

const logoutBtn = new LogoutButton();

logoutBtn.action = function () {
    ApiConnector.logout(
        response => {
            if (response.success) {
                location.reload();
            }
        }
    )
}

ApiConnector.current(
    response => {
        if (response.success) {
            ProfileWidget.showProfile( response.data );
        }
    }
)

const rb = new RatesBoard();

function getListCurrency () {
    ApiConnector.getStocks(
        response => {
            if (response.success) {
                rb.clearTable();
                rb.fillTable(response.data);
            }
        }
    )
}

setInterval(getListCurrency, 60000);

const money = new MoneyManager();

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney (data, 
        response => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                money.setMessage(response.data);
            }else {
                money.setMessage(response.data);
            }
        }
    )
}

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney (data, 
        response => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                money.setMessage(response.data);
            }else {
                money.setMessage(response.data);
            }
        })
}

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data,
        response => {
            if (response.success) {
                ProfileWidget.showProfile(response.data);
                money.setMessage(response.data);
            }else {
                money.setMessage(response.data);
            }
        })
}

const favorite = new FavoritesWidget();

ApiConnector.getFavorites( 
    response => {
        if (response.success) {
            favorite.clearTable(response.data);
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
        }
    }
);

favorite.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data,
        response => {
            if (response.success) {
                favorite.clearTable(response.data);
                favorite.fillTable(response.data);
                favorite.setMessage(response.data);
            }else {
                favorite.setMessage(response.data);
            }
        })
}

favorite.removeUserCallback = function (data) {
    ApiConnector.removeUserFromFavorites(data,
        response => {
            if (response.success) {
                favorite.clearTable(response.data);
                favorite.fillTable(response.data);
                favorite.setMessage(response.data);
            }else {
                favorite.setMessage(response.data);
            }
        })
}
