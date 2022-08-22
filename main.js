//all answer options - все варианты ответа
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');


//  all our options - все наши варианты
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');// сам вопрос

const numberOfQuestoins = document.getElementById('number-of-question'),//номер вопроса
    numberOfAllQuestions = document.getElementById('number-of-all-questions');//количество всех вопросов

let indexOfQuestion,//индекс текущего вопроса
    indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker');//обертка для трекера(3 кругляшки)
const btnNext = document.getElementById('btn-next');//кнопка "далее"

let score = 0;// итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'),//количество апрвильных ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),//количество всех вопросов в модальном окне
    btnTryAgain = document.getElementById('btn-try-again');// кнопка "начать викторину заново"

const questions = [
    {
        question: 'Что было вчера и будет завтра??',
        options: [
            'Сегодня',
            'Завтра',
            'Позавчера',
            'Послезавтра',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой металл является самым тугоплавким',
        options: [
            'Ниобий',
            'Вольфрам',
            'Молибден',
            'Тантал',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сколько спутников у марса?',
        options: [
            '4',
            '12',
            '2',
            '0',
        ],
        rightAnswer: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length;
//innerHtml позволяет выводить во внутрь элемента какие-то значения, lenght-длинна массива
//выводим количество вопросов


const load  =  () => {
    question.innerHTML = questions[indexOfQuestion].question;// сам вопрос
    
    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestoins.innerHTML = indexOfPage + 1;// установка номера текущей страницы
    indexOfPage++;// учеличение индекса страницы
};

let completedAnswers = [];// массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor( Math.random() * questions.length);// Math.floor - округдение числа до целого, Math.random - рандомное число
    let hitDuplicate = false; // якорь для проверки однаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();    
    } else{
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate == true) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);// puch- помогает заполнить массив снаружи
};

const chekAnser = el =>{
    if(el.target. dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => chekAnser(e));
}


 const disabledOptions = () => {
     optionElements.forEach(item => {
         item.classList.add('disabled');
         if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
             item.classList.add('correct');
            }
     })
 }


 // удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item =>{
        item.classList.remove('disabled','correct','wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);    
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}
const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () =>{
    validate();    
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});//функция запуститься только тогда, когда произойдет полная загрузка страницы

