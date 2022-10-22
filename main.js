const CodeCoof = ['A', 'D', 'F', 'G', 'X', 'M'];
let Alphabet = [
        'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
        'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
        'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ы', 'э', 'ю', 'я',
        '.', ',', ' '
    ];
let test = ['а', 'б', 'в', 'г', 'д'];

window.onload = () => {
    Alphabet = RandomSortArray(Alphabet);
    CreateEncryptionTable("Шифровальная таблица");

}

function CreateEncryptionTable(name = "", size = 6 /* standard = true */) {
    const table_head = document.createElement('p');
    table_head.innerHTML = name;
    table_head.setAttribute('id', 'table_head');

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
                table_data.setAttribute('class', 'table_colums');
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
                table_data.setAttribute('class', 'table_colums');
                table_data.style.width = `${90 / (size + 1)}%`;
                table_row.appendChild(table_data);
            }
        }
        table_body.appendChild(table_row);
    }
    document.querySelector('#Div_Encryption_Decryption_Table').appendChild(table_head);
    document.querySelector('#Div_Encryption_Decryption_Table').appendChild(table_body);
}

function AddEventsToTableCellsTable() {
    const cells = querySelectorAll('colums');
    for(let i = 0; i < cells.length; i++) {
        console.log(cells[i].innerHTML);
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