<?php
if(isset($_COOKIE["at"])) {
    $access_token = $_COOKIE["at"];
    if (isset($_GET["end"]))
        $info_request = "https://discordapp.com/api/" . $_GET["end"];
    else
        $info_request = "https://discordapp.com/api/";

    $info = curl_init();
    curl_setopt_array($info, array(
        CURLOPT_URL => $info_request,
        CURLOPT_HTTPHEADER => array(
            "Authorization: Bearer {$access_token}"
        ),
        CURLOPT_RETURNTRANSFER => true
    ));

    $out = curl_exec($info);
    curl_close($info);
    echo $out;
}
else {
    echo "Not logged in";
}