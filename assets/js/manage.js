var socket = io("https://api.macedon.ga");
var retievedCH = false;

var enlmgtfy = false;
var wbchannel = [];

$(document).ready(function() {
    /*
        $.get("https://dash.macedon.ga/api/discord.php?end=users/@me", function(data) {
            if (data === "Not logged in")
                return location.href = "https://dash.macedon.ga/api/oauth.php";
            const ud = JSON.parse(data);
            $(".u-a").attr('src', "https://cdn.discordapp.com/avatars/" + ud.id + "/" + ud.avatar + ".png")
            $("#u-n").text("Hello " + ud.username + "!");
        });*/
    var serverPost = { sid: getUrlParameter("sid") };

    $.ajax({
        url: "https://api.macedon.ga/mdbu/settings/get",
        type: "POST",
        data: serverPost,
        async: false,
        success: function(response, textStatus, jqXHR) {
            if (response.error)
                if (response.error === "Not configured") {
                    $('#lmgtfy').prop('checked', true);
                } else
                    alert("Unknown error occured");
            else {
                if (response[0].lmgtfy === "true")
                    $('#lmgtfy').prop('checked', true);
                if (response[0].wm) {
                    $('#wg').prop('checked', true);
                    $("#wm-sel").removeClass("hide");
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

    socket.emit('get channels', getUrlParameter("sid"));
    socket.on('return channels', function(ch) {
        if (!retievedCH) {
            Object.keys(ch).forEach(channel => {
                var data = ch[channel];
                var entry = $("<option></option>").text("#" + data.name.toLowerCase()).attr('id', channel);
                $("#wb-c").append(entry);
            });
            retievedCH = true;
        }
    });

});

$("#lmgtfy").change(function() {
    if (this.checked)
        enlmgtfy = true;
    else
        enlmgtfy = false;
});

$("#wg").change(function() {
    if (this.checked)
        $("#wm-sel").removeClass("hide");
    else
        $("#wm-sel").addClass("hide");
});

function SendSettings() {
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        wbchannel = { id: $("#wb-c option:selected").attr('id'), name: $("#wb-c option:selected").text() };

        if ($("#wg").is(':checked'))
            var serverPost = { sid: getUrlParameter("sid").toString(), lmgtfy: enlmgtfy, wm: wbchannel };
        else
            var serverPost = { sid: getUrlParameter("sid").toString(), lmgtfy: enlmgtfy };
        $.ajax({
            url: "https://api.macedon.ga/mdbu/settings/set",
            type: "POST",
            data: serverPost,
            async: false,
            success: function(response, textStatus, jqXHR) {},
            error: function(jqXHR, textStatus, errorThrown) {
                shake();
            }
        });
    });
}

$("#save").on("click", function() { SendSettings() });


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function shake() {
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 820);
}