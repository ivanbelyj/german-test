<?php
    //Из формы передаются пары id: answer
    //Всё, что нужно знать для определения
    //правильности ответов пользователя.
    $id_answer_pairs = $_POST;

    //Берём из файла информацию о всех вопросах
    $correct = get_correctnesses();
    /*foreach ($correct as $item) {
        echo json_encode($item)."<br />";
    }*/

    //Проверяем правильность ответов пользователя
    //на основе информации из файла
    $user_answers = get_answers_by_id_answer_pairs($id_answer_pairs, $correct);

    /*foreach ($user_answers as $item) {
        echo json_encode($item)."<br />";
    }*/
    setcookie("results", json_encode($user_answers), 0, "/");
    header("Location: /results.html");

    //На основе объектов $correct определяет правильность
    //пар id:answer $answers и возвращает полноценные
    //объекты ответов вместе (а не только пары id:answer)
    function get_answers_by_id_answer_pairs($pairs, $correct) {
        $answers = array();
        foreach ($pairs as $id => $answer_str) {
            $question = get_correctness_by_id($correct, $id);
            $answer = new stdClass();
            $answer->question = new stdClass();
            $answer->question->id = $id;
            $answer->question->text = $question->text;
            $answer->answer = $answer_str;
            //Будет получено в коде js, поэтому название
            //в camelCase
            $answer->correctAnswer = $question->answer;
            
            array_push($answers, $answer);
        }
        return $answers;
    }

    //Ищет объект correctness в массиве с определённым id
    function get_correctness_by_id($correctnesses, $id) {
        foreach ($correctnesses as $item) {
            if ($item->id === $id) {
                return $item;
            }
        }
        return NULL;
    }

    //Возвращает объекты вопросов с ответами, полученные на основе
    //данных из файла
    function get_correctnesses() {
        $questions_str = file("questions.txt");
        $res;
        for ($i = 0; $i < count($questions_str); $i++) {
            $res[$i] = json_decode($questions_str[$i]);
        }
        return $res;
    }
?>