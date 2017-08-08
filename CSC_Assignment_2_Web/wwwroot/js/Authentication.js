function checkAccessToken(accessToken, callback) {
    var entityData = {
        "AccessToken": accessToken
    };
    $.ajax({
        url: properties.hostConnectionString + '/Session/AuthenticateJwtToken',
        type: 'POST',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(entityData),
        success: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}

function removeUserInstance(accessToken, callback) {
    $.ajax({
        url: properties.hostConnectionString + '/Session/DeleteByAccessTokenAsync?accessToken=' + accessToken,
        type: 'DELETE',
        crossDomain: true,
        contentType: 'application/json; charset=utf-8',
        headers: {
            'Authorization': 'Bearer '
            + accessToken,
        },
        success: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}

function removeSessionVariables() {
    sessionStorage.clear();
}

function getUserSessionByEmail(email) {
    $.ajax({
        url: properties.hostConnectionString + '/Session/GetUserByEmailAsync',
        type: 'GET',
        crossDomain: true,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer '
            + accessToken,
            'Email': email
        },
        success: function (responseData, textStatus, jqXHR) {
            return responseData;
        },
        error: function (responseData, textStatus, jqXHR) {
            return null;
        }
    });
}

function getUserSessionByAccessToken(accessToken) {
    $.ajax({
        url: properties.hostConnectionString + '/Session/GetUserByAccessTokenAsync',
        type: 'GET',
        crossDomain: true,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer '
            + accessToken,
            'AccessToken': accessToken
        },
        success: function (responseData, textStatus, jqXHR) {
            callback(responseData);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}

function getLogInUserId(email, accessToken, callback) {
    $.ajax({
        url: properties.hostConnectionString + '/Account/GetUserIdByEmailAsync?email=' + email,
        type: 'GET',
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        headers: {
            'Authorization': 'Bearer '
            + accessToken
        },
        success: function (responseData, textStatus, jqXHR) {
            callback(responseData);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}

function getLogInUser(id, accessToken, callback) {
    $.ajax({
        url: properties.hostConnectionString + '/Account/GetUserByIdAsync?id=' + id,
        type: 'GET',
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        headers: {
            'Authorization': 'Bearer '
            + accessToken
        },
        success: function (responseData, textStatus, jqXHR) {
            callback(responseData);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function checkCookie() {
    var talent = getCookie("talent");
    if (talent != null && talent != "") {
        return talent;
    }
    else {
        return null;
        //    setCookie("username", username, 365);
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}