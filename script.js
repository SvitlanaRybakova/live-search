document.querySelector('#elastic').oninput = function () {
    // считываем значение которое пользователь ввел в поле input важно this!!!
    // не обращает внимание на пробелы
    
    let value = this.value.trim();
    let wordsCollection = document.querySelectorAll('.wordsCollection li');
   // если input  не пустой
    if (value != '') {
        // цикл, передаю анонимную функцию как параметр
        wordsCollection.forEach(function (elem) {
            //в каждом элементе из списка wordsCollection ищет похожее значение из input 
            // search функция ищет подстроку в строке и если подстрока есть возвратит ее номер если нет, то возвратит -1
            //elem.innerText.search(value) - в каждом элементе из  wordsCollection массива ищет value(то что ввел пользователь) по сути это и есть позиция
            // т.е.  этом случае, если нет совпадений из инпута со списком скрываем элемет
            if (elem.innerText.search(value) == -1) {
                elem.classList.add('hide');
                elem.innerHTML = elem.innerText//очищаю от тэгов, если они были прописаны ранее
              
            }
            // в др случае усли совпадения есть, на всякий случай удаляем класс hide
            else{
                elem.classList.remove('hide');
                //innerText возвращает только текст, даже если раньше были вставлены тэги, то innerText их сотретт
                let str = elem.innerText;
                elem.innerHTML = insertMark(str, elem.innerText.search(value), value.length);
            }
        });
    }
    // если input пустой
    else{

        wordsCollection.forEach(function (elem) {
            elem.classList.remove('hide');
            elem.innerHTML = elem.innerText//очищаю от тэгов, если они были прописаны ранее

        });
    }
    
}

//подсвечивает совпадения параметры - userInput(строка, которую вводит пользователь от 0(начала до совпадения))
// position часть строки, где нашли совпадения
// len количество символов, которое ввел пользователь
function insertMark(userInput, position, len){
    // hello world
    //hello <mark>wo</mark>rld
    //hello + <mark> + wo + </mark> + rld
    return userInput.slice(0, position) + '<mark>' + userInput.slice(position, position+len) + '</mark>'+ userInput.slice(position+len);
    // userInput.slice(0, position) = hello
    // userInput.slice(position, position+len) = wo
    // userInput.slice( position+len) =  rld ВТОРОГО ПАРАМЕТРА НЕТ, значит что вычитывать буду до конца строки
}
