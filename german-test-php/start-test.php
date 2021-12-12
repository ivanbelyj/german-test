<?php
    function get_random_questions($n) {
        $questions = file("questions.txt"); // Массив строк
        shuffle($questions); // Перемешанный массив строк

        if ($n > count($questions)) {
            $n = count($questions);
        }
        $res;
        for ($i = 0; $i < $n; $i++) {
            $res[$i] = json_decode($questions[$i]);
            ($res[$i])->number = $i + 1;
        }
        return $res;
    }
    $logfile = fopen("logfile.txt", "w");

    if (!isset($_POST["questions-count"])) {
        http_response_code(400);
    }
    $questions_count = $_POST["questions-count"];
    $rand_questions = get_random_questions($questions_count);
    setcookie("questions", json_encode($rand_questions), 0, "/");

    //setcookie("questions", "[{\"id\":\"123\",\"text\":\"___ ist Berlin?\",\"number\":1}]", 0, "/");
    fwrite($logfile, "questions-count: ".$_POST["questions-count"]);
    fwrite($logfile, $_COOKIE["questions"]."\r\n");
    fclose($logfile);

    header("Location: /test.html");
?>