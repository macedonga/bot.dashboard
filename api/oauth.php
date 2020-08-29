<?php
    if (isset($_GET["error"])) {
      Header("Location: https://dash.macedon.ga/error.html");
    } elseif (isset($_GET["code"])) {
        Header("Location: login.php?code={$_GET["code"]}");
    } else {
      Header("Location: https://discord.com/api/oauth2/authorize?client_id=747489983601836042&redirect_uri=https%3A%2F%2Fdash.macedon.ga%2Fapi%2Flogin.php&response_type=code&scope=guilds%20identify");
    }
?>