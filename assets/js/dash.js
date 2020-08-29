function getToken() {
    var dbg = getUrlParameter("dbg");
    if (dbg)
        return localStorage.getItem("token");
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data === "Not logged in")
            location.href = "https://dash.macedon.ga/api/oauth.php";
        else {
            return data;
        }
    });
}

$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data === "Not logged in")
            location.href = "https://dash.macedon.ga/api/oauth.php";

        $.get({
            url: "https://discordapp.com/api/users/@me",
            headers: {
                "Authorization": "Bearer " + data
            }
        }, function(data) {
            $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + data.id + "/1faa3eed98189f795fda0674e9b96c29.png")
            $("#u-n").text("Hello " + data.username + "!");
        });
        $.get({
            url: "https://discordapp.com/api/users/@me/guilds",
            headers: {
                "Authorization": "Bearer " + data
            }
        }, function(data) {
            data.forEach(element => {
                if (element.owner)
                    $('.content').append($("<button></button>").text(element.name).addClass("server"));
            });
        });
    });
});