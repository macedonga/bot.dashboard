<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if (isset($_GET["error"])) {
        echo json_encode(array("message" => "Authorization Error"));
    } elseif (isset($_GET["code"])) {
        Header("Location: login.php?code={$_GET["code"]}");
    } else {
      Header("Location: https://discordapp.com/oauth2/authorize?client_id=747489983601836042&response_type=code&scope=identify");
    }

?>