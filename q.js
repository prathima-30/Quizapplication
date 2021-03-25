var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;

var total_seconds = 80 * 1;
var c_minutes = parseInt(total_seconds / 60);
var c_seconds = parseInt(total_seconds % 60);
var timer;

var questions
const request = new XMLHttpRequest();
 request.open("get","questions.json")         
 request.onload = () =>{
     try{
     questions=JSON.parse(request.responseText)
     console.log(questions)
     renderQuestion(0,questions);
     }
     catch(e){
         console.warn("could not load json");
     }
 };
 request.send();

function CheckTime() {
  document.getElementById("quiz-time-left").innerHTML = "<h3> Time Left:  "+ c_minutes +" minutes "+ c_seconds +"  seconds</h3>";

  if (total_seconds > 0) {
    total_seconds = total_seconds - 1;
    c_minutes = parseInt(total_seconds / 60);
    c_seconds = parseInt(total_seconds % 60);
    timer = setTimeout(CheckTime, 1000);
  }

  if(total_seconds===0) {
    test.innerHTML = "<h2>You are out of time, You got "+correct+" of "+questions.length+" questions correct</h2>";
  }
}
timer = setTimeout(CheckTime, 1000);
  
   
function get(x){
  return document.getElementById(x);
}

function renderQuestion(){ 
  test = get("test");
  if(pos >= questions.length){

    test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
    get("test_status").innerHTML = "Test completed";

    if(get("test_status").innerHTML = "Test completed"){
      clearInterval(timer);
    }

    pos = 0;
    correct = 0;
    
    return false;
  }

  get("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  
  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;

  test.innerHTML = "<h3>"+question+"</h3>";
  
  test.innerHTML += "<label> <input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  test.innerHTML += "<label> <input type='radio' name='choices' value='D'> "+chD+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

function checkAnswer(){
  choices = document.getElementsByName("choices");

  for(var i=0; i<choices.length; i++){

    if(choices[i].checked){
      choice = choices[i].value;
    }
  }
  
  if(choice == questions[pos].answer){
    correct++;
  }
  
  pos++;

  renderQuestion();
  
}

window.addEventListener("load", renderQuestion);