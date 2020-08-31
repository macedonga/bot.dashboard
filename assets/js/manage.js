var enlmgtfy = false;

$(document).ready(function() {
    /*
        $.get("https://dash.macedon.ga/api/discord.php", function(data) {
            if (data === "Not logged in")
                return location.href = "https://dash.macedon.ga/api/oauth.php";
            const ud = JSON.parse(data);
            $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
            $("#u-n").text("Hello " + ud.username + "!");
        });*/
    var serverPost = { id: getUrlParameter("sid") };

    $.ajax({
        url: "https://api.macedon.ga/mdbu/settings/get",
        type: "POST",
        data: serverPost,
        async: false,
        success: function(response, textStatus, jqXHR) {
            /*if (!response.success)
                if (response.error === "Not configured") {
                    //alert("not configured");
                } else
                //alert("uh oh")
                else
                //alert("configured");*/
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});

$("#lmgtfy").change(function() {
    if (this.checked)
        enlmgtfy = true;
    else
        enlmgtfy = false;
    SendSettings();
});

function SendSettings() {
    var serverPost = GenerateJSON();
    $.ajax({
        url: "https://api.macedon.ga/mdbu/settings/set",
        type: "POST",
        data: serverPost,
        async: false,
        success: function(response, textStatus, jqXHR) {
            console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function GenerateJSON() {
    return { sid: getUrlParameter("sid"), lmgtfy: enlmgtfy };
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};