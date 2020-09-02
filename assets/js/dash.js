$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/discord.php?end=users/@me", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        const ud = JSON.parse(data);
        $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
        $("#u-n").text("Hello " + ud.username + "!");
        var counter = 0;
        $.get("https://dash.macedon.ga/api/discord.php?end=users/@me/guilds", function(data) {
            const servers = JSON.parse(data);
            servers.forEach(server => {
                if (server.owner) {
                    var serverBTN = $("<button></button>").text(server.name).addClass("server").attr('id', server.id);
                    serverBTN.on("click", function() {
                        var serverPost = { sid: server.id.toString() };
                        $.ajax({
                            url: "https://api.macedon.ga/mdbu/server/check",
                            type: "POST",
                            data: serverPost,
                            async: false,
                            success: function(response, textStatus, jqXHR) {
                                if (!response.connected)
                                    alert("The bot isn't in the server you selected.\nInvite it first and then you can select this server.")
                                else
                                    $(".content").fadeOut(500, function() {
                                        $(".header").fadeIn(500, function() {
                                            $(".loader").fadeIn(500, function() {
                                                location.href = "https://dash.macedon.ga/dash/manage.html?sid=" + server.id;
                                            });
                                        });
                                    });
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                return location.href = "https://dash.macedon.ga/error.html";
                            }
                        });
                    });
                    $('.content').append(serverBTN);
                    counter = counter + 1;
                }
            });
            $(".loader").fadeOut(500, function() {
                $(".content").fadeIn(500);
                $(".header").fadeIn(500);
            });
        });
    });
});