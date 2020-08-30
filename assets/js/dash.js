$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/discord.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        const ud = JSON.parse(data);
        $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
        $("#u-n").text("Hello " + ud.username + "!");
        $.get("https://dash.macedon.ga/api/discord.php?end=guilds", function(data) {
            const servers = JSON.parse(data);
            servers.forEach(server => {
                if (server.owner)
                    $('.content').append($("<button></button>").text(server.name).addClass("server"));
            });
            showGUI();
        });
    });

});

function showGUI() {
    $(".loader").fadeIn(500, function() {
        $(".loader").fadeOut(500, function() {
            setTimeout(500, function() {
                $(".content").css("display", "block");
                $(".header").css("display", "block");
            });
        });
    });
}