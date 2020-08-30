<?php
if(isset($_COOKIE["at"])) {
    $access_token = $_COOKIE["at"];
    if (isset($_GET["end"]))
        $info_request = "https://discordapp.com/api/users/@me/" . $_GET["end"];
    else
        $info_request = "https://discordapp.com/api/users/@me/";
    echo $access_token . " " . $info_request;

    $info = curl_init();
    curl_setopt_array($info, array(
        CURLOPT_URL => $info_request,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer {$access_token}"
        ),
        CURLOPT_RETURNTRANSFER => true
    ));

    curl_close($info);
    echo curl_exec($info);
}
echo "Not logged in";