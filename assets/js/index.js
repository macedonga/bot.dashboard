$(document).ready(function() {
    $.get("https://dash.macedon.ga/api/get_token.php", function(data) {
        if (data != "Not logged in") {
            $("#login").val("Go to the dashboard");
            $("#login").on("click", function() {
                $("#buttons").fadeOut(500, function() {
                    $(".loader").fadeIn(500);
                });
                setTimeout(function() {
                    location.href = "https://dash.macedon.ga/dash/";
                }, 500);
            });
        } else {
            $("#login").on("click", function() {
                $("#buttons").fadeOut(500, function() {
                    $(".loader").fadeIn(500);
                });
                setTimeout(function() {
                    location.href = "https://dash.macedon.ga/api/oauth.php";
                }, 500);
            });
        }
    });
});