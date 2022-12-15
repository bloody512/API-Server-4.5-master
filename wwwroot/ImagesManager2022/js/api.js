const baseUrl = "http://localhost:5000";
const apiBaseURL = baseUrl + "/api/images";
const apiUserURL = baseUrl +  "/accounts/index/id";
function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID_USER(successCallBack, errorCallBack, queryString = null) {
    let url = apiUserURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL_IMAGES(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POST(data, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PUT(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
//Yan
function DELETE_ALL(id, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => {  },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETAccount(data, successCallBack, errorCallBack) {
    $.ajax({
        url: baseUrl + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: data => { successCallBack(data)},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POSTAccount(data) {
    $.ajax({
        url: baseUrl + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => {
            localStorage.setItem("CurrentUserId", data.Id),
            localStorage.setItem("CurrentUserVCode", data.VerifyCode)
        },
        error: function (jqXHR) { error(jqXHR.status) }
    });
}
function PUTAccount(data, token) {
    $.ajax({
        url: baseUrl + "/accounts/modify",
        type: 'PUT',
        contentType: 'application/json',
        headers: { "Authorization": "Bearer " + token},
        data: JSON.stringify(data),
        success: (data) => {
            localStorage.setItem("CurrentUserId", data.Id)
                // location.reload();
        },
        error: function (jqXHR) { error(jqXHR.status) }
    });
}
function VERIFYAccount(data) {
    $.ajax({
        url: baseUrl + "/accounts/verify?id=" + data.Id + "&code=" + data.Code,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { },
        error: function (jqXHR) { error(jqXHR.status) }
    });
}
function GETAvatar(id, successCallBack, errorCallBack) {
    $.ajax({
        url: baseUrl + "/accounts/index/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETLogout(errorCallBack) {
    $.ajax({
        url: baseUrl + "/accounts/logout",
        type: 'GET',
        success: data => { },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETRemove(data, token, errorCallBack) //marche pas le remove
{
    $.ajax({
        url: baseUrl + "/accounts/remove/" + data,
        type: 'GET',
        headers: { "Authorization": "Bearer " + token},
        success: data => { },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETUser_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: baseUrl + "/api/accounts/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}