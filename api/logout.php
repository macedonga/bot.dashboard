<?php
    if(isset($_COOKIE["at"])){
        setcookie("at", time() - 3600);
        Header("Location: https://dash.macedon.ga/");
    } else {
        Header("Location: https://dash.macedon.ga/");
    }
?>