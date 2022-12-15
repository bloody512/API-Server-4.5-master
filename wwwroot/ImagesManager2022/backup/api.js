

const apiBaseURL = "http://localhost:5000/api/images";

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
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
function GETAccount(data, successCallBack, errorCallBack) {
    $.ajax({
        url: "http://localhost:5000/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: data => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POSTAccount(data) {
    $.ajax({
    url: "http://localhost:5000/accounts/register",
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
    url: "http://localhost:5000/accounts/modify",
    type: 'PUT',
    contentType: 'application/json',
    headers: { "Authorization": "Bearer " + token},
    data: JSON.stringify(data),
    success: (data) => { 
        localStorage.setItem("CurrentUserId", data.Id),
        location.reload();  
    },
    error: function (jqXHR) { error(jqXHR.status) }
});
}
function VERIFYAccount(data) {
    $.ajax({
        url: "http://localhost:5000/accounts/verify?id=" + data.Id + "&code=" + data.Code,
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => {  },
        error: function (jqXHR) { error(jqXHR.status) }
    });
}
function GETAvatar(id, successCallBack, errorCallBack) {
    $.ajax({
        url: "http://localhost:5000/accounts/index/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETLogout( errorCallBack)
{
    $.ajax({
        url: "http://localhost:5000/accounts/logout",
        type: 'GET',
        success: data => { },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETRemove(data, errorCallBack) //marche pas le remove
{
    $.ajax({
        url: "http://localhost:5000/accounts/remove/" + data,
        type: 'GET',
        success: data => { },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GETUser_ID(id, successCallBack, errorCallBack)
{
    $.ajax({
        url: "http://localhost:5000/api/accounts/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

