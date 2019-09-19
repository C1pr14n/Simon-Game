var buttonColors = ["red", "blue", "green", "yellow"];//Array initial ce contine culorile butoanelor | Trebuie neaparat sa stea la inceput ca sa poata fi citit primul
var userClickedPattern = [];//Array gol ce se umple cu var userChosenColor
var gamePattern = [];//Array gol ce se umple cu var randomChosenColor

var started = false;
var level = 0;
//____________Game Started______________________________________________________
$("body").on("click", function(event){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//______________Check what User pressed against the Pattern_____________________
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){//check if the most recent user answer is the same as the game pattern.
    console.log("Success!");
    //If the user got the most recent answer right in previous "if", then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);   // apelam nextSequence() dupa 1000 milisecunde intarziere.

    }
  } else {
    //Sunet pt wrong Answer
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    //Flash pt wrong Answer
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over! Press Any Key to Restart.");
    startOver();
  }
}
//Resetez nivelul, variabila care determina daca a fost atinsa o tasta sau nu(var pt inceperea jocului) cat si array-ul pt pattern-ul jocului
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
//___________Cand e apasat vreun buton__________________________________________
$(".btn").click(function(){ //pt toate clasele .btn, aplicam urmatoarea fct anonima at cand sunt apasate
  var userChosenColor = $(this).attr("id");// $(this) reprezinta butonul care a fost apasat si cu .attr("id") primim id-ul de la respectivul buton
  userClickedPattern.push(userChosenColor);//expresia trb scrisa inauntrul functiei anonime altfel userChosenColor apare ca nedefinit in consola
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);//apelez functia dupa ce user a apasat si si-a ales culoarea, trecand ca si input index-ul ultimului raspuns din secventa user-ului.
});
//_______Functia de creare a unui nou Pattern___________________________________
function nextSequence(){
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //nr random intre 0-3;
  var randomChosenColor = buttonColors[randomNumber]; //var primeste o pozitie random din array-ul buttonColors
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);//functioneaza atunci cand aplicatia da o culoare pt array-ul gamePattern pe care utilizatorul sa o retina
  playSound(randomChosenColor);
}
//______________Add Sounds To Button Click______________________________________
function playSound(name){
  var audioGood = new Audio("sounds/" + name + ".mp3");
  audioGood.play();
}
//______________Add Animations To Button Click__________________________________
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");//nu e nevoie de "." la clasa pressed
setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//...
