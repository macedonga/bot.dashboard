<?php
define('OAUTH2_CLIENT_ID', '747489983601836042');
define('OAUTH2_CLIENT_SECRET', $_ENV["CS"]);

if (isset($_GET["error"])) {
    Header("Location: https://dash.macedon.ga/error.html");
} elseif (isset($_GET["code"])) {
    session_start();
    $redirect_uri = "https://dash.macedon.ga/dash/index.html";
    $token_request = "https://discordapp.com/api/oauth2/token";
    $token = curl_init();
    curl_setopt_array($token, array(
        CURLOPT_URL => $token_request,
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => array(
            "grant_type" => "authorization_code",
            "client_id" => OAUTH2_CLIENT_ID,
            "client_secret" => OAUTH2_CLIENT_SECRET,
            "redirect_uri" => $redirect_uri,
            "code" => $_GET["code"],
        ),
    ));
    curl_setopt($token, CURLOPT_RETURNTRANSFER, true);
    $resp = json_decode(curl_exec($token));
    curl_close($token);
    if (isset($resp->access_token)) {
        $access_token = $resp->access_token;
        $_SESSION['at'] = $access_token;
        Header("Location: https://dash.macedon.ga/dash");
    } else {
        Header("Location: https://dash.macedon.ga/error.html");
    }
} else {
    Header("Location: https://dash.macedon.ga/error.html");
}
