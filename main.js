// Массив шифровальных символов
const CodeCoof = ['A', 'D', 'F', 'G', 'X', 'M'];
// Массив алфавита
let Alphabet = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к',
        'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц',
        'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я', '.', ',', ' '
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
    document.querySelector('#Encrypt_Text').value = '';
    document.querySelector('#Decrypt_Text').value = '';
    CreateEncryptionTable();
}

function CreateEncryptionTable() {
    const size = CodeCoof.length;
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

    console.log('Key   ' + Key);
    console.log('InitiallyEncryptText   ' + InitiallyEncryptText);

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

        console.log('ArrayEncryptText');
        console.log(ArrayEncryptText);
        
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

        console.log('SortKey   ' + SortKey);
        console.log('SortArrayEncryptText');
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

    console.log('Key   ' + Key);
    console.log('InitiallyDecryptText   ' + InitiallyDecryptText);

    if(Key && InitiallyDecryptText) {
        const SortKey = Key.split('').sort();
        let RowQuantity = InitiallyDecryptText.length / Key.length - (InitiallyDecryptText.length / Key.length) % 1;
        RowQuantity += ((InitiallyDecryptText.length / Key.length) % 1 == 0) ? 0 : 1;
        let ZeroQuantity = Key.length - InitiallyDecryptText.length % Key.length;
        ZeroQuantity = (ZeroQuantity == Key.length) ? 0 : ZeroQuantity;
        const LettersWithUnfinishedColumns = Key.split('').slice(Key.length - ZeroQuantity, Key.length);

        console.log('SortKey   ' + SortKey);
        console.log('LettersWithUnfinishedColumns   ' + LettersWithUnfinishedColumns);

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

        console.log('IndexesOfIncompleteColumns   ' + IndexesOfIncompleteColumns);

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

        console.log('SortDecryptText');
        console.log(SortDecryptText);

        const DecryptText = [];
        CopySortKey = SortKey.slice(0, SortKey.length);
        for(let i = 0; i < Key.length; i++) {
            for(let j = 0; j < CopySortKey.length; j++) {
                if(Key[i] == CopySortKey[j]) {
                    DecryptText.push(SortDecryptText[j]);
                    CopySortKey[j] = null;
                    break;
                }
            }
        }

        console.log('DecryptText');
        console.log(DecryptText);

        let InvertedDecryptText = [];
        for(let j = 0; j < DecryptText[0].length; j++) {
            const Arr = [];
            for(let i = 0; i < DecryptText.length; i++) {
                Arr.push(DecryptText[i][j]);
            }
            InvertedDecryptText.push(Arr.join(''));
        }
        InvertedDecryptText = InvertedDecryptText.join('');

        console.log('InvertedDecryptText');
        console.log(InvertedDecryptText);

        let AnswerText = '';
        for(let k = 0; k < InvertedDecryptText.length; k = k + 2) {
            let X = CodeCoof.indexOf(InvertedDecryptText[k]);
            let Y = CodeCoof.indexOf(InvertedDecryptText[k + 1]);
            if(X != -1 && Y != -1) {
                AnswerText += Alphabet[X * CodeCoof.length + Y];
            }
        }
        const AnswerArea = document.querySelector('#Encrypt_Text');
        AnswerArea.value = AnswerText.toUpperCase();
    } else {
        alert('Некорректные данные, проверьте наличие ключа или сверютесь с разрешёнными символами шифровальной таблцы');
    }
}

function RandomSortArray(arr) {
    const AnswerArray = arr.slice(0, arr.length);
    for(let i = AnswerArray.length - 1; i >= 0; i--) {
        const Index = Math.floor(Math.random() * i);
        let ElementToBeReplaced = AnswerArray[i];
        AnswerArray[i] = AnswerArray[Index];
        AnswerArray[Index] = ElementToBeReplaced;
    }
    return AnswerArray;
}

/* function AddEventsToTableCellsTable() {
    const cells = querySelectorAll('colums');
    for(let i = 0; i < cells.length; i++) {
        console.log(cells[i].innerHTML);
    }
} */