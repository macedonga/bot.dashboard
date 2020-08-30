$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/discord.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        const ud = JSON.parse(data);
        $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
        $("#u-n").text("Hello " + ud.username + "!");
        $.get("https://dash.macedon.ga/api/discord.php?end=guilds", function(data) {
            const servers = JSON.parse(data);
            var counter = 0;
            servers.forEach(server => {
                if (server.owner) {
                    $('.content').append($("<button></button>").text(server.name).addClass("server").attr('id', server.id));
                    counter++;
                }
                if (counter === 0)
                    $('.content').append($("<h1></h1>").text("You aren't owner of any server.\nCreate a server and then add the bot.").addClass("animated"));
            });
        });
    });

});