let inputCrit = document.getElementById('crit').value;
let arrayCrit = inputCrit.split(' ');
let array = [];

function run() {

    inputCrit = document.getElementById('crit').value;
    arrayCrit = inputCrit.split(' ');
    array = [];
    array.push(arrayCrit);

    document.getElementById('table').innerHTML = '';

    for (let i = 0; i < arrayCrit.length - 1; i++) {

        document.getElementById('table').innerHTML += `${arrayCrit[i]} <input placeholder='Введите значения через пробел' id='${arrayCrit[i]}' type='text'>в сравнении с <p class='cof'>${arrayCrit[i + 1]}<p/><p class='cof'>, ${arrayCrit[i + 2] ? arrayCrit[i + 2] + ' и т.д.' : ''}<p/><br/>`

    }

    document.getElementById('table').innerHTML += `<p class='button' onClick={value()}>Ввод</p>`

}

function value() {

    // Создание матрицы
    for (let i = 0; i < arrayCrit.length - 1; i++) {

        let a = document.getElementById(arrayCrit[i]).value.split(' ');
        a.unshift('1');
        array.push(a);

    }

    // Добавление 1 по диагонали
    array.push(['1']);
    for (let i = 2; i < array.length; i++) {

        for (let k = 1; k < array.length; k++) {

            if (i == k) break;
            array[i].unshift(1 / array[i - 1][i - 1]);

        }

    }

    // Сумма строк матрицы
    let sumArray = [];
    for (let i = 1; i < array.length; i++) {

        sumArray.push(array[i].reduce((a, b) => Number(a) + Number(b), 0));

    }

    // Округление до 2 знаков
    sumArray.push(sumArray.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2));

    // Расчёт a значений
    let aArray = [];
    for (let i = 0; i < sumArray.length - 1; i++) {

        aArray.push((sumArray[i] / Number(sumArray[sumArray.length - 1])).toFixed(2));

    }

    // Добавление погрешности наибольшему коэффициенту а
    let maxaArray = Math.max.apply(null, aArray);
    for (let i = 0; i < aArray.length; i++) {

        if (aArray[i] == maxaArray) aArray[i] = (maxaArray + 0.01)

    }

    // Вывод а значений
    document.getElementById('aTable').innerHTML = '';
    for (let i = 0; i < aArray.length; i++) {

        if (isNaN(aArray[i])) {

            document.getElementById('aTable').innerHTML = `<p class='error'>Введены некорректные значения<p/><p class='button' onClick={run()}>Сброс</p>`;
            break;

        }
        document.getElementById('aTable').innerHTML += `${aArray[i]} <br/>`;

    }

}