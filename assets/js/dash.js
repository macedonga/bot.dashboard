$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/discord.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        const ud = JSON.parse(data);
        $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
        $("#u-n").text("Hello " + ud.username + "!");
        var counter = 0;
        $.get("https://dash.macedon.ga/api/discord.php?end=guilds", function(data) {
            const servers = JSON.parse(data);
            servers.forEach(server => {
                if (server.owner) {
                    var serverBTN = $("<button></button>").text(server.name).addClass("server").attr('id', server.id);
                    serverBTN.on("click", function() {
                        var serverPost = { id: server.id };
                        $.ajax({
                            url: "https://api.macedon.ga/mdbu/server/check",
                            type: "POST",
                            data: serverPost,
                            async: false,
                            success: function(response, textStatus, jqXHR) {
                                if (!response.connected)
                                    alert("The bot isn't in the server you selected.\nInvite it first and then you can select this server.")
                                else
                                    location.href = "https://dash.macedon.ga/dash/manage.html?sid=" + server.id;
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            }
                        });
                    });
                    $('.content').append(serverBTN);
                    counter = counter + 1;
                }
            });
        });
        if (counter === 0)
            $('.content').append($("<h1></h1>").text("You aren't owner of any server.\nCreate a server and then add the bot.").addClass("animated"));
    });

});