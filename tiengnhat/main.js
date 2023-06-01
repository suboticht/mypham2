

function beginQ(id) {
    var length = quiz.JS[id].set.length;
    var rdNumber = Math.floor(Math.random() * length);
    var word = quiz.JS[id].set[rdNumber];
    $(".word-jp").text(word.q);
    $(".word-jp").attr('data-id', word.id);
    $(".word-jp").attr('data-a', word.a);
    $(".next").attr("data-cat", id);
}

function answer() {
    var value1 = $(".word-jp").attr("data-a");
    var value = $(".answer").val();
    var checklogic = value === $(".word-jp").attr("data-a") ? true : false;
    var note = checklogic === true ? "Chính xác" : "Không chính xác";
    var audio = new Audio("./audio/hiragana/"+value1+".mp3");
    audio.play();
    $(".result p").text(note);
    $(".result").css("visibility", "visible");
    if(checklogic) {
        $(".next").css("visibility", "visible");
    } else {
        $(".next").css("visibility", "hidden");
    }
}

function answerByButton(a) {
    var value = a.attr("data-a");
    var checklogic = value === $(".word-jp").attr("data-a") ? true : false;
    var note = checklogic === true ? "Chính xác" : "Không chính xác";
    var audio = new Audio("./audio/hiragana/"+value+".mp3");
    audio.play();
    $(".result p").text(note);
    $(".result").css("visibility", "visible");

    if(checklogic) {
        $(".next").css("visibility", "visible");
    } else {
        $(".next").css("visibility", "hidden");
    }
}

function showButtonA(id) {
    jQuery.each( quiz.JS[id].set, function( index, item ) {
        var span = "<span class='audio-box' data-audio='0' data-a='"+quiz.JS[id].set[index].a+"'>"+quiz.JS[id].set[index].a+"<i class='icn-play'></i></span>";
        $(".button-a p").append(span);
    })
}

$(document).ready(function() {
    $(document).on("click",".button-cat", function() {
        var catID = $(this).attr("data-id");
        beginQ(catID);
        showButtonA(catID);
        $(".content01").css("display", "none");
        $(".content02").fadeIn();
    });
    $(document).on("click",".next", function() {
        beginQ($(".next").attr("data-cat"));
        $(".result").css("visibility", "hidden");
        $(".result p").text("");
        $(".next").css("visibility", "hidden");
        $(".answer").val("");
    });
    $(document).on("click",".submit", function() {
        answer();
    });
    $(document).on("click",".button-a p span", function() {
        answerByButton($(this));
    });
})