var MINLEVEL = 1, MAXLEVEL = 3;
P = 'perimeter';
A = 'area';
var quiz;
jQuery(document).ready(function ($) {
    var level = 1,
        $levelinput = $("input#level"),
        $aF = $("form#answerform");
    $answer = $("input#answer");
    $qA = $("span#question-" + A),
        $qP = $("span#question-" + P),
        $tQ = $("table#question-grid");
    $statC = $("span#correct-answers");
    $statI = $("span#incorrect-answers");

    $('.collapsible').collapsible();

    quiz = {
        level: 1,
        question: 0,
        answer: 0,
        fields: {},

        levelChange: function () {
            quiz.level = parseInt($levelinput.val());
            quiz.level = quiz.level < MINLEVEL ? MINLEVEL : quiz.level > MAXLEVEL ? MAXLEVEL : quiz.level;
            $levelinput.val(quiz.level);
            quiz.loadLevelFields();

            $tQ.removeClass("level1 level2 level3");
            $tQ.addClass("level" + quiz.level);

            quiz.generateQuestion();
            console.log("LEVEL: " + quiz.level);
        },

        generateQuestion: function () {
            var type = Math.round(Math.random() * 2 + 1) == 1 ? P : A;
            var b = 100;
            $answer.val("").focus();
            $tQ.fadeTo('fast', 0.1);
            $tQ.removeClass("q-" + P + "q-" + A);
            $tQ.addClass("q-" + type);
            $qA.hide();
            $qP.hide();
            type == P ? $qP.show() : $qA.show();

            switch (quiz.level) {
                case 1:
                    do {
                        var W = Math.round(Math.random() * b);
                        var H = Math.round(Math.random() * b);
                    } while (W <= 0 || H <= 0);

                    quiz.answer = type == P ? (W + H) * 2 : W * H;
                    quiz.fields.height.text(H);
                    quiz.fields.width.text(W);
                    break;
                case 2:
                    var W = Math.round(Math.random() * (7 * b / 10)) + (3 * b / 10);
                    var H = Math.round(Math.random() * (7 * b / 10)) + (3 * b / 10);
                    var C1W = Math.round(Math.random() * (3 * b / 10)) + 1;
                    var C1H = Math.round(Math.random() * (3 * b / 10)) + 1;

                    while (C1W >= W) {
                        W += Math.round(Math.random() * (b / 10))
                    }
                    while (C1H >= H) {
                        H += Math.round(Math.random() * (b / 10))
                    }
                    quiz.answer = type == P ? ((W + H) * 2) - ((C1W + C1H) * 2) : ((W * H) - (C1W * C1H));
                    quiz.fields.height.text(H);
                    quiz.fields.width.text(W);
                    quiz.fields.co1.height.text(C1H);
                    quiz.fields.co1.width.text(C1W);
                    break;
                case 3:
                    var W = Math.round(Math.random() * (7 * b / 10)) + (3 * b / 10);
                    var H = Math.round(Math.random() * (7 * b / 10)) + (3 * b / 10);
                    var C1W = Math.round(Math.random() * (3 * b / 10)) + 1;
                    var C1H = Math.round(Math.random() * (3 * b / 10)) + 1;
                    var C2W = Math.round(Math.random() * (3 * b / 10)) + 1;
                    var C2H = Math.round(Math.random() * (3 * b / 10)) + 1;

                    while (C1W + C2W >= W) {
                        W += Math.round(Math.random() * (b / 10))
                    }
                    while (C1H + C2H >= H) {
                        H += Math.round(Math.random() * (b / 10))
                    }
                    quiz.answer = type == P ? ((W + H) * 2) - ((C1W + C1H) * 2) - ((C2W + C2H) * 2) : ((W * H) - (C1W * C1H) - (C2W * C2H));
                    quiz.fields.height.text(H);
                    quiz.fields.width.text(W);
                    quiz.fields.co1.height.text(C1H);
                    quiz.fields.co1.width.text(C1W);
                    quiz.fields.co2.height.text(C2H);
                    quiz.fields.co2.width.text(C2W);
            }
            window.setTimeout(function () {
                $tQ.fadeTo('fast', 1);
            }, 100);

        },

        loadLevelFields: function () {
            $tQ.find("td").text("");
            quiz.fields = {};
            switch (quiz.level) {
                case 1:
                    quiz.fields.height = $tQ.find("tr:nth-child(5) td:nth-child(1)");
                    quiz.fields.width = $tQ.find("tr:nth-child(10) td:nth-child(5)");
                    break;
                case 2:
                    quiz.fields.height = $tQ.find("tr:nth-child(7) td:nth-child(1)");
                    quiz.fields.width = $tQ.find("tr:nth-child(10) td:nth-child(5)");
                    quiz.fields.co1 = {};
                    quiz.fields.co1.width = $tQ.find("tr:nth-child(4) td:nth-child(3)");
                    quiz.fields.co1.height = $tQ.find("tr:nth-child(3) td:nth-child(4)");
                    break;
                case 3:
                    quiz.fields.height = $tQ.find("tr:nth-child(7) td:nth-child(1)");
                    quiz.fields.width = $tQ.find("tr:nth-child(10) td:nth-child(5)");
                    quiz.fields.co1 = {};
                    quiz.fields.co1.width = $tQ.find("tr:nth-child(3) td:nth-child(2)");
                    quiz.fields.co1.height = $tQ.find("tr:nth-child(2) td:nth-child(3)");
                    quiz.fields.co2 = {};
                    quiz.fields.co2.width = $tQ.find("tr:nth-child(8) td:nth-child(9)");
                    quiz.fields.co2.height = $tQ.find("tr:nth-child(9) td:nth-child(8)");
                    break;
            }
        },

        checkAnswer: function (e) {
            e.preventDefault();
            var answer = parseInt($answer.val());
            if (answer != quiz.answer) {
                console.log(answer);
                if (answer + "" == "NaN") {
                    Materialize.toast("You need to answer!", 3000, "orange darken-2");
                    return;
                }
                Materialize.toast("Hmm, " + answer + " is not quite right, try again", 3000, "red");
                $statI.text(parseInt($statI.text()) + 1);
                return;
            }
            $statC.text(parseInt($statC.text()) + 1);
            Materialize.toast("Correct!", 3000, "green white-text");
            quiz.generateQuestion();
        }
    }

    $aF.bind("submit", quiz.checkAnswer);
    $levelinput.bind("change", quiz.levelChange).trigger("change");
});