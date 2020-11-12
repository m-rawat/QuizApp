const start_btn=document.querySelector(".start_btn button");
const info_box=document.querySelector(".info_box");
const exit_btn=document.querySelector(".quit");
const continue_btn=document.querySelector(".restart");
const quiz_box=document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
const next_btn=document.querySelector(".next_btn");
const time_count=document.querySelector(".timer .time_sec");
const time_off=document.querySelector(".timer .time_text");
// const time_line=document.querySelector(".time_line");
const result_box=document.querySelector(".result_box");
const quit_quiz=document.getElementById("quit_quiz");

quit_quiz.addEventListener("click",function(){
    window.location.reload();
})

start_btn.onclick=()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    // startTimerLine(0);
}

let que_count=0;
let que_numb=1;
let counter;
let timeValue=15;
// let widthValue=0;
let userScore=0;



//if next button clicked
next_btn.onclick=()=>{
    if(que_count < questions.length-1){
        if(que_count==questions.length-2){
            next_btn.innerHTML=`Submit`;
        }
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        // clearInterval(counterLine);
        // startTimer(widthValue);
        next_btn.style.display="none";
        time_off.innerHTML=`Time Left`;
    }
    
    else{
        clearInterval(counter);
        showResult();
    }
}

//getting questions and options from array from question.js
function showQuestions(index){
    const que_text=document.querySelector(".que_text");
    let que_tag=`<span>${questions[index].numb}.${questions[index].question}</span>`;
    let option_tag='<div class="option">' + questions[index].options[0]+'<span></span></div>'
                    +'<div class="option">' + questions[index].options[1]+'<span></span></div>'
                    +'<div class="option">' + questions[index].options[2]+'<span></span></div>'
                    +'<div class="option">' + questions[index].options[3]+'<span></span></div>'
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for (let i = 0; i <option.length; i++) {
         option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon=`<div class="icon tick"><i class="fa fa-check"></i></div>`;
let crossIcon=`<div class="icon cross"><i class="fa fa-times"></i></div>`;

function optionSelected(answer){
    clearInterval(counter);
    // clearInterval(counterLine);
    let user_ans=answer.textContent;
    let correct_ans=questions[que_count].answer;
    let allOptions=option_list.children.length;
    if(user_ans==correct_ans){
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend",tickIcon); //Advance property
        userScore++;
        console.log(userScore);
    }else{
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon); //Advance property

        //if answer is wrong then automatic select correcr answer
        for (let i = 0; i <allOptions; i++) {
            if(option_list.children[i].textContent==correct_ans){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon); //Advance property
            }
        }
    }
    //once user selected a option disabled all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText=document.querySelector(".score_text");
    if(userScore>3){
        let scoreTag=`<span>and congrats!💪, You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
        scoreText.innerHTML=scoreTag;
    }
    else if(userScore>1){
        let scoreTag=`<span>and nice!😍, You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
        scoreText.innerHTML=scoreTag;
    }
    else{
        let scoreTag=`<span>and sorry!😔, You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
        scoreText.innerHTML=scoreTag;
    }
}

function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        time_count.textContent=time;
        time--;
        if(time<9){
            let addZero=time_count.textContent;
            time_count.textContent="0"+addZero;
        }
        if(time<0){
            clearInterval(counter);
            time_count.textContent="00";
            time_off.innerHTML=`Time Off`;

            let correct_ans=questions[que_count].answer;
            let allOptions=option_list.children.length;
            for (let i = 0; i <allOptions; i++) {
                if(option_list.children[i].textContent==correct_ans){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon); //Advance property
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display="block";
        }
    }
}

// function startTimerLine(time){
//     counterLine=setInterval(timer,29);
//     function timer(){
//         time+=1;
//         time_line.style.width=time+"px";
//         if(time>549){
//             clearInterval(counterLine);
//         }
//     }
// }



function queCounter(index){
    const bootom_ques_counter=document.querySelector(".total_que");
    let totalQuesCountTag=`<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
    bootom_ques_counter.innerHTML=totalQuesCountTag;
}

