function checkAccessToken(callback) {
    var accessToken = sessionStorage.getItem('accessToken');
    if (accessToken == null)
        return false;
    var entityData = {
        "AccessToken": accessToken
    };
    $.ajax({
        url: properties.hostConnectionString + '/Account/AuthenticateJwtToken',
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

function getLogInUser(email, callback) {
    $.ajax({
        url: properties.hostLocalString + '/Account/GetUserByEmailAsync?email=' + email,
        type: 'GET',
        crossDomain: true,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        headers: {
            'Authorization': 'Bearer '
            + sessionStorage.getItem("accessToken")
        },
        success: function (responseData, textStatus, jqXHR) {
            callback(responseData);
        },
        error: function (responseData, textStatus, jqXHR) {
            callback(textStatus);
        }
    });
}