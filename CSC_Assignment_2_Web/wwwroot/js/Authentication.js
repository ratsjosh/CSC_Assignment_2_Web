function checkAccessToken(accessToken, callback) {
    // TODO: Change to host database
    if (accessToken == null)
        callback('fail');
    else
        callback('success');
    //var entityData = {
    //    "AccessToken": accessToken
    //};
    //$.ajax({
    //    url: properties.hostConnectionString + '/Account/AuthenticateJwtToken',
    //    type: 'POST',
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8",  
    //    data: JSON.stringify(entityData),
    //    success: function (responseData, textStatus, jqXHR) {
    //        callback(textStatus);
    //    },
    //    error: function (responseData, textStatus, jqXHR) {
    //        callback(textStatus);
    //    }
    //});
}

function getLogInUserId(email, accessToken, callback) {
    $.ajax({
        url: properties.localConnectionString + '/Account/GetUserIdByEmailAsync?email=' + email,
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
        url: properties.localConnectionString + '/Account/GetUserByIdAsync?id=' + id,
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