/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "Earth is protected from ultra violet radioation by?",
      o: ["Ozone", "Oxygen", "Helium", "Carbon Dioxide"],
      a: 0,
    },
    {
      q: "Solid Carbon Dioxide is known as",
      o: ["Garbage", "Polymer Isotope", "Dry Ice", "Synthetic Isotope"],
      a: 2,
    },
    {
      q: "VAT was first introduced in which country?",
      o: ["India", "France", "USA", "Australia"],
      a: 1,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    let maxScore = quizArray.length;
    const quizForm = document.quizForm;

    quizForm.window.addEventListener("submit", cycleQuiz);

    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (quizItem.a == i) {
          //change background color of li element here
          quizWrap.style.backgroundColor = "#fff";
        }

        // if (radioElement.checked) {
        // calculate the score as the total of the number of correct answers

        function cycleQuiz(e) {
          if (e.type == "submit") {
            e.preventDefault();
            let options = quizForm.o;
            let answerIndex = quizArray[i].a;
            getScore(options, answerIndex);
            i++;
            printScore();
          }
          //===
          // Adding the Question
          if (i < maxScore) {
            // quizForm.querySelector("h2").textContent = quizArray[i].q;
            // Add Options to the Question.
            var options = quizForm.option;
            {
              let index = 0;
              options.forEach(function (val) {
                val.value = allQues[i].c[index];
                val.nextElementSibling.textContent = quizArray[i].c[index];
                index++;
              });
            }
          } else {
            quizForm.style.display = "none";
            printScore();
          }
          //===
          quizForm.addEventListener("submit", submitForm);
          //
        }
      }
    });
  };
  // call the displayQuiz function
  displayQuiz();
});

// Get Score
function getScore(options, answerIndex) {
  var markedAnswer = Array.prototype.filter.call(options, function (val) {
    return val.checked;
  });
  var markedAnswerValue = markedAnswer[0].value.toString();
  if (quizArray[i].o[answerIndex] == markedAnswerValue) {
    score++;
  }
}
// Print Score
function printScore() {
  document.querySelector("score").textContent = `Your Score is`;
  var scoreElement = document.createElement("h3");
  scoreElement.setAttribute("class", "score");
  scoreElement.textContent = score + "/" + allQues.length;
  document.querySelector(".container").appendChild(scoreElement);
}

//Sets the time and reload if time lapse

let sec = 10;
let time = setInterval(myTimer, 1000);

function myTimer() {
  document.getElementById("time").innerHTML = sec + "sec left";
  sec--;
  if (sec == -1) {
    clearInterval(time);
    alert("Sorry the time run out!! :(");
    window.location.reload();
    clearTimeout(time);
    //window.location.href=window.location.href.reload();
  }
}
