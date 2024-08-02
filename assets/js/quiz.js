const quiz_wrap = document.getElementById("quiz_wrap");
const start = document.getElementById("start_button");
const previous = document.getElementById("previous_button");
const next = document.getElementById("next_button");
const quiz_result = document.getElementById("quiz_result");
let quizes = [];

let quiz_index = 0;
let score = [];

function play_quiz() {

    if (quizes.length === 0) {
        console.error('No question found!');
        return;
    }

    const quiz = quizes[quiz_index];
    const question = document.createElement("p");
    question.innerText = `${quiz_index+1}. ${quiz.question}`;
    const options = document.createElement("div");
    for (const op of quiz.options) {
        const opt = document.createElement("p");
        const inp = document.createElement("input");
        inp.type = "radio";
        inp.name = "selected_option";
        inp.value = op.code;
        inp.checked = restore_progress(op);
        inp.classList.add("me-1");
        inp.id = generateUniqueString(6);

        const opt_label = document.createElement("label");
        opt_label.setAttribute('for', inp.id);
        opt_label.innerText = op.label;

        opt.appendChild(inp);
        opt.appendChild(opt_label);
        options.appendChild(opt);
    }
    quiz_wrap.innerText = "";
    quiz_wrap.appendChild(question);
    quiz_wrap.appendChild(options);

}

function generateUniqueString(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    const timestamp = Date.now().toString(36);
    return result + timestamp;
}


function store_progress() {
    const selected_option = quiz_wrap.querySelector("input:checked") ?? { value: "Don't Know" };
    score[quiz_index] = { answer: selected_option.value };
}

function restore_progress(option) {
    if (!score[quiz_index]) {
        return false;
    }

    else if (score[quiz_index].answer === option.code) {
        return true;
    }
    return false;
}

start.addEventListener("click", async function () {
    quizes = await fetchQuestions();

    play_quiz();
    this.style.display = "none";
    next.classList.remove('d-none');
    previous.classList.remove('d-none');
})

next.addEventListener("click", function () {
    store_progress();
    if (quiz_index !== quizes.length - 1) {
        quiz_index++;
        play_quiz();
    } else {
        alert("Quiz Over");
        show_result();
    }
})

previous.addEventListener("click", function () {
    store_progress();

    if (quiz_index !== 0) {
        quiz_index--;
        play_quiz();

    } else {
        alert("No Previous Quiz");
    }
})

function show_result() {
    quiz_result.innerHTML = "";
    for (const index in score) {
        let i = index;
        const result = score[index];
        const quiz = quizes[index];
        const question_wrap = document.createElement("div");
        const question = document.createElement("h2");
        question.innerText = `${++i}. ${quiz.question}`;
        const answer = document.createElement("p");
        answer.innerHTML = "<strong> correct answer : </strong> " + quiz.answer;
        const selected_answer = document.createElement("p");
        selected_answer.classList.add(quiz.answer == result.answer ? "text-success" : "text-danger");
        selected_answer.innerHTML = "<strong> Your answer : </strong> " + result.answer;
        question_wrap.appendChild(question);
        question_wrap.appendChild(answer);
        question_wrap.appendChild(selected_answer);
        quiz_result.appendChild(question_wrap);
    }
}

// Function to fetch and use the JSON data
async function fetchQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const questions = await response.json();
        console.log(questions);
        return questions;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


