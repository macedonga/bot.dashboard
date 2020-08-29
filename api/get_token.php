<?php
    if(isset($_COOKIE["at"])){
        echo $_COOKIE["at"];
    } else {
        echo "Not logged in";
    }
?>