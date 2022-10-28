const CodeCoof = ['A', 'D', 'F', 'G', 'X', 'M'];
let Alphabet = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
        'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
        'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я',
        '.', ',', ' '
    ];

window.onload = () => {
    CreateEncryptionTable();
    document.querySelector('#Encrypt_Button').addEventListener('click', () => {
        EncryptEvent();
    });
    document.querySelector('#Decrypt_Button').addEventListener('click', () => {
        DecryptEvent();
    });
}

function Render() {
    document.querySelector('#Div_Encryption_Decryption_Table').innerHTML = '';
    document.querySelector('#Encrypt_Text').innerHTML = '';
    document.querySelector('#Decrypt_Text').innerHTML = '';
    CreateEncryptionTable();
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
        Render();
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
    let LetterIndex;
    let InitiallyEncryptText = "";
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
            InitiallyEncryptText += document.querySelector(`#elem_${row}_${0}`).innerHTML.toUpperCase();
            InitiallyEncryptText += document.querySelector(`#elem_${0}_${column}`).innerHTML.toUpperCase();
        } else {
            InitiallyEncryptText = null;
            break;
        };
    }
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
        
        const SortKey = Key.split('').sort();
        const SortArrayEncryptText = [];
        for(let i = 0; i < SortKey.length; i++) {
            if(i > 0 && SortKey[i - 1] == SortKey[i]) {
                continue;
            }
            for(let j = 0; j < Key.length; j++) {
                if(SortKey[i] == Key[j]) {
                    const Arr = [];
                    for(let k = 0; k < ArrayEncryptText.length; k++) {
                        Arr.push(ArrayEncryptText[k][j]);
                    }
                    SortArrayEncryptText.push(Arr);
                }
            }
        }

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
}

function DecryptEvent() {
    let InitiallyDecryptText = document.querySelector('#Decrypt_Text').value.toUpperCase();
    for(let i = 0; i < InitiallyDecryptText.length; i++) {
        let flag = true;
        for(let j = 0; j < CodeCoof.length; j++) {
            if(InitiallyDecryptText[i] == CodeCoof[j]) {
                flag = false;
                break;
            }
        }
        if(flag) {
            InitiallyDecryptText = null;
        }
    }

    const Key = document.querySelector('#Code_Key').value.toUpperCase();
    if(Key && InitiallyDecryptText) {

        const SortKey = Key.split('').sort();
        let RowQuantity = InitiallyDecryptText.length / Key.length - (InitiallyDecryptText.length / Key.length) % 1;
        RowQuantity += ((InitiallyDecryptText.length / Key.length) % 1 == 0) ? 0 : 1;
        let ZeroQuantity = Key.length - InitiallyDecryptText.length % Key.length;
        ZeroQuantity = (ZeroQuantity == Key.length) ? 0 : ZeroQuantity;
        let LettersWithUnfinishedColumns = Key.split('').slice(Key.length - ZeroQuantity, Key.length);
        const QuantityLettersWithUnfinishedColumns = [];
        for(let i = 0; i < LettersWithUnfinishedColumns.length; i++) {
            let counter = 0;
            let ElemRepeatFlag = true;
            for(let k = 0; k < QuantityLettersWithUnfinishedColumns.length; k++) {
                if(LettersWithUnfinishedColumns[i] == QuantityLettersWithUnfinishedColumns[k][0]) {
                    ElemRepeatFlag = false;
                    break;
                }
            }
            if(ElemRepeatFlag) {
                for(let j = 0; j < Key.length; j++) {
                    if(LettersWithUnfinishedColumns[i] == Key[j]) {
                        counter++;
                    }
                }
                QuantityLettersWithUnfinishedColumns.push([LettersWithUnfinishedColumns[i], counter]);
            }
        }

        const IndexesOfIncompleteColumns = [];
        let CopySortKey = SortKey.slice(0, SortKey.length);
        for(let i = LettersWithUnfinishedColumns.length - 1; i >= 0; i--) {
            for(let j = CopySortKey.length - 1; j >= 0; j--) {
                if(LettersWithUnfinishedColumns[i] == CopySortKey[j]) {
                    CopySortKey[j] = null;
                    IndexesOfIncompleteColumns.push(j);
                    break;
                }
            }
        }

        let SelectedColumn = 0;
        let SelectedRow = 0;
        const SortDecryptText = [];
        let Arr = [];
        let FlagLastColumnIsIncomplete = (IndexesOfIncompleteColumns.indexOf(Key.length - 1) == -1) ? false : true;
        for(let i = 0; i < InitiallyDecryptText.length; i++) {
            if(SelectedRow == RowQuantity - 1) {
                for(let k = 0; k < IndexesOfIncompleteColumns.length; k++) {
                    if(SelectedColumn == IndexesOfIncompleteColumns[k]) {
                        i--;
                        Arr.push(0);
                        break;
                    }
                }
                if(Arr.indexOf(0) == -1) {
                    Arr.push(InitiallyDecryptText[i]);
                }
                SelectedRow = 0;
                SelectedColumn++;
                SortDecryptText.push(Arr);
                Arr = [];
            } else {
                Arr.push(InitiallyDecryptText[i]);
                if(FlagLastColumnIsIncomplete && i == InitiallyDecryptText.length - 1) {
                    FlagLastColumnIsIncomplete = false;
                    i--;
                    SelectedRow++;
                } else {
                    SelectedRow++;
                }
            }
        }

        let OriginalDecryptText = [];
        for(let k = 0; k < RowQuantity; k++) {
            const Arr = [];
            for(let i = 0; i < Key.length; i++) {
                if(i > 0 && Key[i - 1] == SortKey[i]) {
                    continue;
                }
                for(let j = 0; j < SortKey.length; j++) {
                    if(Key[i] == SortKey[j]) {
                        Arr.push(SortDecryptText[j][k]);
                    }
                }
            }
            OriginalDecryptText.push(Arr.join(''));
        }
        OriginalDecryptText = OriginalDecryptText.join('');

        let AnswerText = '';
        for(let k = 0; k < OriginalDecryptText.length; k = k + 2) {
            let X = CodeCoof.indexOf(OriginalDecryptText[k]) + 1;
            let Y = CodeCoof.indexOf(OriginalDecryptText[k + 1]) + 1;
            if(X != -1 && Y != -1) {
                AnswerText += document.querySelector(`#elem_${X}_${Y}`).innerHTML;
            }
        }
        const AnswerArea = document.querySelector('#Encrypt_Text');
        AnswerArea.value = AnswerText;
    } else {
        alert('Некорректные данные, проверьте наличие ключа или сверютесь с разрешёнными символами шифровальной таблцы');
    }
}

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

/* function AddEventsToTableCellsTable() {
    const cells = querySelectorAll('colums');
    for(let i = 0; i < cells.length; i++) {
        console.log(cells[i].innerHTML);
    }
} */