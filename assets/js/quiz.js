$(document).ready(function(){
const quiz_wrap = $("#quiz_wrap");
const start = document.getElementById("start_button");
const previous = document.getElementById("previous_button");
const next = document.getElementById("next_button");
const quiz_result = document.getElementById("quiz_result");
const quizes = [
    {
        question: "What does HTML stands for?",
        answer: "C",
        options: [
            {
                code: "A",
                label: " Home Tool Markup Language",
            },{
                code: "B",
                label: " Hyperlinks and Text Markup Language",
            },{
                code: "C",
                label: " Hyper Text Markup Language",
            },{
                code: "D",
                label: "Hyper Text Msg Language",
            }
        ]

    },{
        question: "Who is making the Web standards?",
        answer: "A",
        options: [
            {
                code: "A",
                label: "The World Wide Web Consortium",
            },{
                code: "B",
                label: " Microsoft",
            },{
                code: "C",
                label: " Google",
            },{
                code: "D",
                label: "Mozilla",
            }

        ] 
    }

]

let quiz_index = 0;
let score = [];

function play_quiz() {
    const quiz = quizes[quiz_index];
    const question = document.createElement("p");
    question.innerText = quiz.question;
    const options = document.createElement("div");
    for (const op of quiz.options) {
        const opt = document.createElement("p");
        const inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "selected_option";
        inp.value = op.code;
        inp.checked = restore_progress(op);
        inp.classList.add("me-1");
        const opt_label = document.createTextNode(op.label);
        opt.appendChild(inp);
        opt.appendChild(opt_label);
        options.appendChild(opt);
    }
    quiz_wrap.innerText = "";
    quiz_wrap.appendChild(question);
    quiz_wrap.appendChild(options);
        
    }

    function store_progress() {
        const selected_option = quiz_wrap.querySelector("input:checked") ?? {value:"Don't Know"};
        score[quiz_index] = {answer:selected_option.value};
    }

    function restore_progress(option){
        if(!score[quiz_index]){
            return false;
        }

        else if(score[quiz_index].answer === option.code){
            return true;
        }
        return false;
    }

    start.addEventListener("click", function(){
        play_quiz();
        this.style.display = "none";
    })

    next.addEventListener ("click", function(){
        store_progress();
        if(quiz_index !== quizes.length-1) {
            quiz_index++;
            play_quiz();
        }
        else {
            alert("Quiz Over");
            show_result();
        }
    })

    previous.addEventListener("click", function(){
        store_progress();
        if (quiz_index == quizes.length - 1) {
        quiz_index--;
        play_quiz();
    }

    else if(quiz_index == 0) {
        alert("No Previous Quiz");
    }
})

function show_result(){
    quiz_result.innerHTML = "";
    for(const index in score) {
        const result = score[index];
        const quiz = quizes[index];
        const question_wrap = document.createElement("div");
        const question  = document.createElement("h2");
        question.innerText = quiz.question;
        const answer = document.createElement("p");
        answer.innerHTML = "<strong> correct answer : </strong> " + quiz.answer;
        const selected_answer = document.createElement("p");
        selected_answer.classList.add (quiz.answer == result.answer ?"text-success":"text-danger");
        selected_answer.innerHTML =  "<strong> Your answer : </strong> " + result.answer;
        question_wrap.appendChild(question);
        question_wrap.appendChild(answer);
        question_wrap.appendChild(selected_answer);
        quiz_result.appendChild(question_wrap);
    }
}

})