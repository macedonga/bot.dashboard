$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data != "Not logged in") {
            $("#login").text("Go to the dashboard");
            $("#login").on("click", function() {
                $("#buttons").fadeOut(500, function() {
                    $(".loader").fadeIn(500);
                });
                setTimeout(function() {
                    location.href = "https://dash.macedon.ga/dash/";
                }, 500);
            });
        } else {
            $("#login").text("Login");
            $("#login").on("click", function() {
                $("#buttons").fadeOut(500, function() {
                    $(".loader").fadeIn(500);
                });
                setTimeout(function() {
                    location.href = "https://dash.macedon.ga/api/oauth.php";
                }, 500);
            });
        }
        $(".loader").fadeOut(500, function() {
            $("#buttons").fadeIn(500);
        });
        $("#invite").on("click", function() {
            $("#buttons").fadeOut(500, function() {
                $(".loader").fadeIn(500);
            });
            setTimeout(function() {
                location.href = "https://discord.com/oauth2/authorize?client_id=747489983601836042&permissions=8&scope=bot";
            }, 500);
        });
    });
});