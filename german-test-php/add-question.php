<?php
    function replace_separator_characters($str) {
        return str_replace(array("\t", "\n"), array(" "), $str);
    }

    if (!isset($_POST["sentense"]) ||
        !isset($_POST["missing-word"])) {
        http_response_code(400);
    }
    $sentense = trim(replace_separator_characters($_POST["sentense"]));
    $word = trim(replace_separator_characters($_POST["missing-word"]));

    $file = fopen("questions.txt", "a");
    $new_question_id = uniqid();
    //$new_question = $new_question_id."\t".$sentense."\t".$word."\r\n";
    //fwrite($file, $new_question);
    $question_arr = array (
        "id" => $new_question_id,
        "text" => $sentense,
        "answer" => $word
    );
    fwrite($file, json_encode($question_arr)."\r\n");
    fclose($file);
    
    header("Location: /task.html");
?>