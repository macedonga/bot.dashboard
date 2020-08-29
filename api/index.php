<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    if (isset($_GET["error"])) {
        echo json_encode(array("message" => "Authorization Error"));
    } elseif (isset($_GET["code"])) {
        Header("Location: login.php?code={$_GET["code"]}");
    } else {
        echo json_encode(array("message" => "No Code Provided"));
    }

?>