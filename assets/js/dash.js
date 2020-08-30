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
    $.get("https://dash.macedon.ga/api/discord.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + data.id + "/1faa3eed98189f795fda0674e9b96c29.png")
        $("#u-n").text("Hello " + data.username + "!");
    });
    $.get("https://dash.macedon.ga/api/discord.php?end=guilds", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        const servers = JSON.parse(data);
        servers.forEach(server => {
            if (server.owner)
                $('.content').append($("<button></button>").text(server.name).addClass("server"));
        });
    });
});