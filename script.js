const correctAnswers = {
    question1: "Ответ 1", // Правильный ответ для вопроса 1
    question2: "Ответ 3", // Правильный ответ для вопроса 2
    question3: "Ответ 2", // Правильный ответ для вопроса 3
    question4: "Ответ 1", // Правильный ответ для вопроса 4 (все вышеперечисленное)
    question5: "Ответ 2", // Правильный ответ для вопроса 5
    question6: "Ответ 1", // Правильный ответ для вопроса 6
    question7: "Ответ 2", // Правильный ответ для вопроса 7
    question8: "Ответ 2", // Правильный ответ для вопроса 8
    question9: "Ответ 3", // Правильный ответ для вопроса 9
    question10: "Ответ 3", // Правильный ответ для вопроса 10
    question11: "Ответ 1", // Правильный ответ для вопроса 11
    question12: "Ответ 1", // Правильный ответ для вопроса 12
    question13: "Ответ 2", // Правильный ответ для вопроса 13
    question14: "Ответ 1", // Правильный ответ для вопроса 14
    question15: "Ответ 1", // Правильный ответ для вопроса 15
    question16: "Ответ 3", // Правильный ответ для вопроса 16
    question17: "Ответ 3", // Правильный ответ для вопроса 17
    question18: "Ответ 4", // Правильный ответ для вопроса 18 (все вышеперечисленное)
    question19: "Ответ 2", // Правильный ответ для вопроса 19
    question20: "Ответ 2"  // Правильный ответ для вопроса 20
};

// Функция для отображения результатов
function displayResults(score, userName) {
    const totalQuestions = Object.keys(correctAnswers).length; // Динамически получаем количество вопросов
    const resultMessage = `Ваш результат: ${score} из ${totalQuestions} правильных ответов, ${userName}.`;
    document.getElementById('result').innerHTML = resultMessage;
}

// Функция для сохранения результатов
function saveResults(score, answers, fullName) {
    const results = JSON.parse(localStorage.getItem('testResults')) || [];
    results.push({ score, answers, fullName }); // Сохраняем объект с результатами и ответами
    localStorage.setItem('testResults', JSON.stringify(results));
}

// Функция для отображения сохраненных результатов
function showSavedResults() {
    const results = JSON.parse(localStorage.getItem('testResults')) || [];
    const savedResultsDiv = document.getElementById('savedResults');
    savedResultsDiv.innerHTML = ''; // Очищаем предыдущие результаты

    if (results.length > 0) {
        results.forEach((result, index) => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'resultDiv'; // Добавляем класс для отступов
            const totalQuestions = Object.keys(correctAnswers).length; // Динамически получаем количество вопросов
            resultDiv.innerHTML = `Результат тестирования ${index + 1}`;
            
            // Создаем кнопку для Показать результат тестирования с уникальным ID
            const highlightButton = document.createElement('button');
            highlightButton.textContent = 'Показать результат тестирования ';
            highlightButton.id = `highlightButton${index + 1}`; // Уникальный ID для кнопки
            highlightButton.classList.add('highlight-button'); // Добавляем класс с отступом
            highlightButton.onclick = function() {
                highlightAnswers(result.answers, result.fullName); // Передаем ФИО для подсветки
            };

            resultDiv.appendChild(highlightButton);
            savedResultsDiv.appendChild(resultDiv);
        });
    } else {
        savedResultsDiv.innerHTML = 'Нет сохраненных результатов. Пожалуйста, проведите тест.';
    }
}

// Функция для отображения уведомления с использованием HTML
function showNotification(htmlContent) {
    // Проверяем, существует ли уже уведомление
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove(); // Удаляем старое уведомление
    }

    const notification = document.createElement('div');
    notification.className = ' notification';
    notification.innerHTML = htmlContent; // Используем innerHTML для поддержки HTML

    // Добавляем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.marginTop = '10px'; // Отступ сверху для кнопки
    closeButton.onclick = function() {
        notification.remove(); // Удаляем уведомление при нажатии
    };

    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    notification.appendChild(closeButton); // Добавляем кнопку закрытия в уведомление

    // Обработка события закрытия уведомления
    closeButton.onclick = function() {
        notification.remove();
    };
}

// Функция для вывода итога по тесту
function highlightAnswers(answers, fullName) {
    let resultMessage = `<div class="flex-container">`;

    // Колонка для ФИО
    resultMessage += `<div class="flex-column name-column">`; // Изменяем класс
    resultMessage += `<strong>ФИО:</strong><br>${fullName.replace(/ /g, '<br>')}<br>`;
    resultMessage += `</div>`; // Закрываем колонку для ФИО

    // Первая колонка для первых 10 вопросов
    resultMessage += `<div class="flex-column">`; 
    let correctCount = 0;
    for (let i = 1; i <= 10; i++) {
        const userAnswer = answers[`question${i}`];
        const correctAnswer = correctAnswers[`question${i}`];

        resultMessage += `<div class="question-item">`;
        resultMessage += `<strong>Вопрос ${i}</strong>:<br>`;
        resultMessage += `${userAnswer !== undefined ? userAnswer : 'нет ответа'} - <br>`;
        if (userAnswer === correctAnswer) {
            resultMessage += `<span class="correct">Правильный</span>`;
            correctCount++;
        } else {
            resultMessage += `<span class="incorrect">Неправильный</span>`;
        }
        resultMessage += `</div>`;
    }
    resultMessage += `</div>`; // Закрываем первую колонку

    // Вторая колонка для вопросов 11 до 20
    resultMessage += `<div class="flex-column">`; 
    const totalQuestions = Object.keys(correctAnswers).length; 
    for (let i = 11; i <= totalQuestions; i++) { 
        const userAnswer = answers[`question${i}`];
        const correctAnswer = correctAnswers[`question${i}`];

        resultMessage += `<div class="question-item">`;
        resultMessage += `<strong>Вопрос ${i}</strong>:<br>`;
        resultMessage += `${userAnswer !== undefined ? userAnswer : 'нет ответа'} - <br>`;
        if (userAnswer === correctAnswer) {
            resultMessage += `<span class="correct">Правильный</span>`;
            correctCount++;
        } else {
            resultMessage += `<span class="incorrect">Неправильный</span>`;
        }
        resultMessage += `</div>`;
    }
    resultMessage += `</div>`; // Закрываем вторую колонку

    resultMessage += `</div>`; // Закрываем контейнер для колонок

    resultMessage += `<strong>Правильных ответов:</strong> ${correctCount} из ${totalQuestions}<br>`;

    // Добавляем сообщение о результате теста
    if (correctCount < 18) {
        resultMessage += `<span class="incorrect">Тест не сдан</span>`;
    } else {
        resultMessage += `<span class="correct">Тест сдан</span>`;
    }

    showNotification(resultMessage);
}

// Функция для очистки результатов
function clearResults() {
    localStorage.removeItem('testResults'); // Удаляем сохраненные результаты
    showSavedResults(); // Обновляем отображение результатов
}

// Функция для очистки выделений
function clearSelections() {
    const allOptions = document.querySelectorAll('input[type="radio"]');
    allOptions.forEach(option => {
        const li = option.parentElement;
        li.classList.remove('correct', 'incorrect', 'selected'); // Удаляем классы выделения
    });
}

// Обновляем функции, чтобы они учитывали новые вопросы
document.getElementById('quizForm').onsubmit = function(event) {
    event.preventDefault(); // предотвращаем отправку формы
    clearSelections()
    let score = 0; // счетчик правильных ответов
    const answers = {}; // объект для сохранения ответов

    // Получаем ФИО
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const middleName = document.getElementById('middleName').value;
    const fullName = `${lastName} ${firstName} ${middleName}`; // Формируем полное ФИО

    for (let i = 1; i <= Object.keys(correctAnswers).length; i++) {
        const answer = document.querySelector(`input[name="question${i}"]:checked`);
        const options = document.querySelectorAll(`input[name="question${i}"]`);
        if (answer) {
            const selectedValue = answer.value;
            answers[`question${i}`] = selectedValue; // сохраняем выбранный ответ

            // Подсвечиваем правильный и неправильный варианты
            options.forEach(option => {
                const li = option.parentElement;
                // Подсвечиваем правильный ответ только если выбранный ответ правильный
                if (selectedValue === correctAnswers[`question${i}`]) {
                    if (option.value === correctAnswers[`question${i}`]) {
                        li.classList.add('correct'); // правильный ответ
                    }
                } else {
                    // Если выбранный ответ неправильный, подсвечиваем только его
                    if (option === answer) {
                        li.classList.add('incorrect'); // выбранный неправильный ответ
                        li.classList.add('selected'); // помечаем выбранный вариант
                    }
                }
            });

            if (selectedValue === correctAnswers[`question${i}`]) {
                score++; // увеличиваем счетчик за правильный ответ
            }
        }
    }

    // Выводим результаты
    displayResults(score, fullName);
    saveResults(score, answers, fullName); // сохраняем результаты и ответы
    showSavedResults(); // отображаем сохраненные результаты сразу после отправки
};

document.getElementById('showResults').onclick = function() {
    showSavedResults(); // отображаем сохраненные результаты при нажатии на кнопку
};

document.getElementById('clearResults').onclick = function() {
    clearResults(); // очищаем результаты при нажатии на кнопку
};