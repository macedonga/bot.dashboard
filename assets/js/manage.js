var socket = io("https://api.macedon.ga");
var retievedCH = false;

var configData;
var u;

$(document).ready(function() {
    if (getUrlParameter("sid") === "")
        return location.href = "https://dash.macedon.ga/dash/";
    $.get("https://dash.macedon.ga/api/discord.php?end=users/@me", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";
        u = JSON.parse(data);
    });
    var serverPost = { sid: getUrlParameter("sid") };
    $.ajax({
        url: "https://api.macedon.ga/mdbu/settings/get",
        type: "POST",
        data: serverPost,
        async: false,
        success: function(response, textStatus, jqXHR) {
            if (response.error) {
                if (response.error != "Not configured")
                    return location.href = "https://dash.macedon.ga/error.html";
            } else {
                if (response[0].uid != u.id)
                    return location.href = "https://dash.macedon.ga/";
                if (response[0].lmgtfy === "true")
                    $('#lmgtfy').prop('checked', true);
                configData = response;
                socket.emit('get channels', getUrlParameter("sid"));
                socket.emit('get categories', getUrlParameter("sid"));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            return location.href = "https://dash.macedon.ga/";
        }
    });
    socket.on('return channels', function(ch) {
        if (!retievedCH) {
            retievedCH = true;
            Object.keys(ch).forEach(channel => {
                var data = ch[channel];
                var entry = $("<option></option>").text("#" + data.name.toLowerCase()).attr('id', channel);
                $("#wb-c").append(entry);
            });
            if (configData[0].wm) {
                $('#wg').prop('checked', true);
                $("#wm-sel").removeClass("hide");
                $("#wb-c").val(configData[0].wm.name);
            }
        }
    });
    socket.on('return categories', function(ch) {
        Object.keys(ch).forEach(channel => {
            var data = ch[channel];
            var entry = $("<option></option>").text("#" + data.name.toLowerCase()).attr('id', channel);
            $("#listing-c").append(entry);
        });
        if (configData[0].listing) {
            $('#lis').prop('checked', true);
            $("#listing-sel").removeClass("hide");
            $("#listing-c").val(response[0].listing.id);
        }
    });
    setTimeout(function() {
        $(".loader").fadeOut(500, function() {
            $(".header").fadeIn(500);
            $(".content").fadeIn(500);
        });
    }, 1000)
});

$("#wg").change(function() {
    if (this.checked)
        $("#wm-sel").removeClass("hide");
    else
        $("#wm-sel").addClass("hide");
});

$("#lis").change(function() {
    if (this.checked)
        $("#lis-sel").removeClass("hide");
    else
        $("#lis-sel").addClass("hide");
});

function SendSettings() {
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data === "Not logged in")
            return location.href = "https://dash.macedon.ga/api/oauth.php";


        // Settings generation
        var settings = new Object();
        settings["sid"] = getUrlParameter("sid");
        settings["lmgtfy"] = $("#lmgtfy").is(':checked');
        settings["tk"] = data;
        if ($("#wg").is(':checked'))
            settings["wm"] = { id: $("#wb-c option:selected").attr('id'), name: $("#wb-c option:selected").text() };
        if ($("#lis").is(':checked'))
            settings["listing"] = { id: $("#listing-c option:selected").attr('id'), name: $("#listing-c option:selected").text() };

        $.ajax({
            url: "https://api.macedon.ga/mdbu/settings/set",
            type: "POST",
            data: settings,
            async: false,
            success: function(response, textStatus, jqXHR) {
                if (!response.success)
                    return location.href = "https://dash.macedon.ga/error.html";
                else
                    $(".saveok").fadeIn(500, function() {
                        setTimeout(function() {
                            $(".saveok").fadeOut(500);
                        }, 2500);
                    });
            },
            error: function(jqXHR, textStatus, errorThrown) { return location.href = "https://dash.macedon.ga/error.html"; }
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