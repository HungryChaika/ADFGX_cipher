const CodeCoof = ['A', 'D', 'F', 'G', 'X', 'M'];
let Alphabet = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
        'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
        'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я',
        '.', ',', ' '
    ];

window.onload = () => {
    //Alphabet = RandomSortArray(Alphabet);
    CreateEncryptionTable();
    document.querySelector('#Encrypt_Button').addEventListener('click', () => {

        const InitiallyEncryptText = EncryptEvent();
        const Key = (document.querySelector('#Code_Key').value).toUpperCase();
        if(Key && InitiallyEncryptText) {
            const ArrayEncryptText = [];
            const Limitation = (InitiallyEncryptText.length % Key.length == 0) ?
                InitiallyEncryptText.length :
                InitiallyEncryptText.length - InitiallyEncryptText.length % Key.length + Key.length;
            let Arr = [];
            for(let i = 0; i < Limitation; i++) {
                if(i < InitiallyEncryptText.length) {
                    Arr.push(InitiallyEncryptText[i]);
                } else {
                    Arr.push(0);
                }
                if((i + 1) % Key.length == 0) {
                    ArrayEncryptText.push(Arr);
                    Arr = [];
                }
            }
            console.log(Key);
            console.log(ArrayEncryptText);
            const CopySortKey = Key.split('').sort();
            console.log(CopySortKey);
            const SortArrayEncryptText = [];
            for(let i = 0; i < CopySortKey.length; i++) {
                if(i > 0 && CopySortKey[i - 1] == CopySortKey[i]) {
                    continue;
                }
                for(let j = 0; j < Key.length; j++) {
                    if(CopySortKey[i] == Key[j]) {
                        const Arr = [];
                        for(let k = 0; k < ArrayEncryptText.length; k++) {
                            Arr.push(ArrayEncryptText[k][j]);
                        }
                        SortArrayEncryptText.push(Arr);
                    }
                }
            }
            console.log(SortArrayEncryptText);
            const AnswerArea = document.querySelector('#Decrypt_Text');
            AnswerArea.value = '';
            SortArrayEncryptText.forEach((elemArr) => {
                elemArr.forEach((item) => {
                    if(item != 0) {
                        AnswerArea.value += item;
                    }
                });
            });
        } else {
            alert('Некорректные данные, проверьте наличие ключа или сверютесь с разрешёнными символами шифровальной таблцы');
        }
        
    });
    document.querySelector('#Decrypt_Button').addEventListener('click', () => {

        const InitiallyDecryptText = DecryptEvent();
        const Key = document.querySelector('#Code_Key').value.toUpperCase();
        console.log('InitiallyDecryptText   ' + InitiallyDecryptText);
        console.log('Key   ' + Key);
        if(Key && InitiallyDecryptText) {

            const CopySortKey = Key.split('').sort();
            console.log('CopySortKey   ' + CopySortKey);
            let RowQuantity = InitiallyDecryptText.length / Key.length - (InitiallyDecryptText.length / Key.length) % 1;
            RowQuantity += ((InitiallyDecryptText.length / Key.length) % 1 == 0) ? 0 : 1;
            let ZeroQuantity = Key.length - InitiallyDecryptText.length % Key.length;
            ZeroQuantity = (ZeroQuantity == Key.length) ? 0 : ZeroQuantity;
            console.log('RowQuantity   ' + RowQuantity);
            console.log('ZeroQuantity   ' + ZeroQuantity);



            //ВОЗМОЖНО СТОИТ РАЗДЕЛИТЬ LettersWithUnfinishedColumns НА КОНКРЕТНУЮ СТРОКУ ИЗ КЛЮЧА И КОЛИЧЕСТВО БУКВ ИЗ
            //LettersWithUnfinishedColumns В КЛЮЧЕ!!!!!!!!!!!!!!!!!!!!!



            let LettersWithUnfinishedColumns = Key.split('').slice(Key.length - ZeroQuantity, Key.length);
            for(let k = LettersWithUnfinishedColumns.length - 1; k >= 0; k--) {
                for(let t = k - 1; t >= 0; t--) {
                    if(t >= 0 && LettersWithUnfinishedColumns[k] == LettersWithUnfinishedColumns[t]) {
                        LettersWithUnfinishedColumns.splice(t, 1);
                    }
                }
            }
            console.log('LettersWithUnfinishedColumns   ' + LettersWithUnfinishedColumns);
            const QuantityLettersWithUnfinishedColumns = [];
            let ElemIndex = 0;
            for(let i = 0; i < LettersWithUnfinishedColumns.length; i++) {
                let counter = 0;
                for(let j = 0; j < Key.length; j++) {
                    if(LettersWithUnfinishedColumns[i] == Key[j]) {
                        counter++;
                    }
                }
                QuantityLettersWithUnfinishedColumns[ElemIndex] = [LettersWithUnfinishedColumns[i], counter];
                ElemIndex++;
            }
            QuantityLettersWithUnfinishedColumns.forEach(elem => {
                console.log(elem[0] + ' : ' + elem[1]);
            });
            console.log('LettersWithUnfinishedColumns.length   ' + LettersWithUnfinishedColumns.length);
            console.log('QuantityLettersWithUnfinishedColumns.length   ' + QuantityLettersWithUnfinishedColumns.length);

            // ДАЛЕЕ НУЖНО РАЗДЕЛИТЬ InitiallyDecryptText НА МАССИВ СО СТРОКАМИ УЧИТЫВАЯ ПОЗИЦИИ НУЛЕЙ.
            // МОЖНО ДАЖЕ УБРАТЬ ОЧИСТКУ ПОВТОРЯЮЩИХСЯ БУКВ В LettersWithUnfinishedColumns И 
            // ТАКИМ ОБРАЗОМ ЕЩЁ И ПОСЛЕДНИЙ ЦИКЛ, А В ПОСЛЕДУЮЩИХ ЦИКЛАХ ДЕЛАТЬ ОБХОД С КОНЦА
            // ПРОБЛЕМА МОЖЕТ БЫТЬ ТОЛЬКО С ЗАПОЛНЕНИЕМ МАССИВА МАССИВОВ ИЗ InitiallyDecryptText
            
            const ArrDecryptText = [];
            const Arr = [];
            /* for(let i = 0; i < InitiallyDecryptText.length; i++) {
                let Counter = 0;
                for(let j = 0; j < CopySortKey.length; j++) {

                    if(Counter < LettersWithUnfinishedColumns.length) {
                        if(InitiallyDecryptText[i] == LettersWithUnfinishedColumns[Counter]) {
                            if(QuantityLettersWithUnfinishedColumns[Counter][1] > 0) {
                                QuantityLettersWithUnfinishedColumns[Counter][1]--;
                                continue;
                            } else {
                                Arr.push(0);
                            }
                        } else {

                        }
                    }
                }

            } */

        } else {
            alert('Некорректные данные, проверьте наличие ключа или сверютесь с разрешёнными символами шифровальной таблцы');
        }

    });

}

function CreateEncryptionTable(size = 6 /* standard = true */) {
    const table_head = document.createElement('text');
    table_head.innerHTML = "Шифровальная таблица";
    table_head.setAttribute('id', 'table_head');
    const Button_Sort_Table = document.createElement("button");
    Button_Sort_Table.innerHTML = "sort";
    Button_Sort_Table.setAttribute('id', 'Sort_Table');
    Button_Sort_Table.addEventListener('click', () => {
        Alphabet = RandomSortArray(Alphabet);
    })

    /* const Button_More_Table_Size = document.createElement("button");
    Button_More_Table_Size.innerHTML = "+";
    Button_More_Table_Size.id = 'More_Table_Size';
    const Button_Less_Table_Size = document.createElement("button");
    Button_Less_Table_Size.innerHTML = "-";
    Button_Less_Table_Size.id = 'Less_Table_Size';
    table_head.appendChild(Button_More_Table_Size);
    table_head.appendChild(Button_Less_Table_Size); */

    const table_body = document.createElement('div');
    table_body.setAttribute('id', 'table_body');
    let Counter = 0;
    for(let i = 0; i < size + 1; i++) {
        const table_row = document.createElement('div');
        table_row.setAttribute('id', `row_${i}`);
        table_row.setAttribute('class', `table_rows`);
        table_row.style.height = `${100 / (size + 1)}%`;
        if(i == 0) {
            for(let j = 0; j < size + 1; j++) {
                const table_data = document.createElement('div');
                if(j == 0) {
                    table_data.style.background = "black";
                } else {
                    table_data.innerHTML = (CodeCoof[j - 1]).toUpperCase();
                } 
                table_data.setAttribute('id', `elem_${i}_${j}`);
                table_data.setAttribute('class', 'table_columns');
                table_data.style.width = `${90 / (size + 1)}%`;
                table_row.appendChild(table_data);
            }
        } else {
            for(let j = 0; j < size + 1; j++) {
                const table_data = document.createElement('div');
                if(j == 0) {
                    table_data.innerHTML = (CodeCoof[i - 1]).toUpperCase();
                } else {
                    table_data.innerHTML = (Alphabet[Counter]).toUpperCase();
                    Counter++;
                }
                table_data.setAttribute('id', `elem_${i}_${j}`);
                table_data.setAttribute('class', 'table_columns');
                table_data.style.width = `${90 / (size + 1)}%`;
                table_row.appendChild(table_data);
            }
        }
        table_body.appendChild(table_row);
    }
    document.querySelector('#Div_Encryption_Decryption_Table').appendChild(table_head);
    document.querySelector('#Div_Encryption_Decryption_Table').appendChild(Button_Sort_Table);
    document.querySelector('#Div_Encryption_Decryption_Table').appendChild(table_body);
}

function EncryptEvent() {
    const Text = document.querySelector(`#Encrypt_Text`).value;
    //const Key = document.querySelector('#Code_Key').value;
    let LetterIndex;
    let AnswerText = "";
    for(let i = 0; i < Text.length; i++) {
        LetterIndex = Alphabet.findIndex((value) => {
            if(Text[i].toUpperCase() == value.toUpperCase()) {
                return true;
            }
            return false;
        });
        if(LetterIndex > -1) {
            let row = (LetterIndex + 1) / CodeCoof.length;
            if(row % 1 != 0) {
                row = row - row % 1 + 1;
            }
            let column = LetterIndex + 1 - CodeCoof.length * (row - 1);
            AnswerText += document.querySelector(`#elem_${row}_${0}`).innerHTML.toUpperCase();
            AnswerText += document.querySelector(`#elem_${0}_${column}`).innerHTML.toUpperCase();
        } else {
            return null;
        };
    }
    return AnswerText;
}

function DecryptEvent() {
    const text = document.querySelector('#Decrypt_Text').value.toUpperCase();
    for(let i = 0; i < text.length; i++) {
        let flag = true;
        for(let j = 0; j < CodeCoof.length; j++) {
            if(text[i] == CodeCoof[j]) {
                flag = false;
                break;
            }
        }
        if(flag) {
            return null;
        }
    }
    return text;
}

/* function AddEventsToTableCellsTable() {
    const cells = querySelectorAll('colums');
    for(let i = 0; i < cells.length; i++) {
        console.log(cells[i].innerHTML);
    }
} */

function RandomSortArray(arr) {
    const Answer = new Array(arr.length);
    Answer.fill(0);
    for(let i = 0; i < arr.length; i++) {
        while(true) {
            const Num = Math.floor(Math.random() * (arr.length - 0 + 1)) + 0;
            if(Answer[Num] == 0) {
                Answer[Num] = arr[i];
                break;
            }
        }
    }
    return Answer.slice(0, Answer.length);
}

function CheckArr(arr) {
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}