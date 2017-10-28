const uri = "https://griffis.edumedia.ca/mad9014/lotto/nums.php";
//digits
//max


let getNumbers = () => {
    let h = new Headers();
    let digits = document.getElementById('digits').value;
    let max = document.getElementById('max').value;
    if (!digits || !max) {
        alert('You should fill Number of Digits and Range fields!');
        return false;
    }
    parameters = '?digits=' + digits + '&max=' + max;
    let req = new Request(uri + parameters, {
        method: 'POST',
        headers: h,
        mode: 'cors'
    });
    fetch(req)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else throw new Error('BAD');
        })
        .then((jsonData) => {
            console.log(jsonData);
            let isDuplicated = checkDuplicatedNumbers(jsonData);
            if (isDuplicated) {
                jsonData = null;
                getNumbers();
            }
            showTheResults(jsonData.numbers);
        })
        .catch((err) => {
            console.log('error:', err.message);
        })
}
let goBack = () => {
    document.querySelector('#list').classList.remove('active');
     let numList = document.querySelector('.num_list');
    
    numList.textContent="";
    document.querySelector('#home').classList.add('active');
   

}
document.getElementById('btnSend').addEventListener('click', getNumbers);
document.getElementById('btnBack').addEventListener('click', goBack);
//getNumbers();

let checkDuplicatedNumbers = (jsonData) => {
    let numbers = jsonData.numbers;
    let addedNumbers = [];
    let isDuplicated = false;
    numbers.forEach(function (num) {
        if (addedNumbers.length > 0 && addedNumbers.indexOf(num) >= 0) {
            console.log(num, 'is duplicated');
            isDuplicated = true;
        }
        addedNumbers.push(num);
    });
    return isDuplicated;
}
let showTheResults = (fData) => {
    document.querySelector('#home').classList.remove('active');
    document.querySelector('#list').classList.add('active');
    let numList = document.querySelector('.num_list');
    fData.forEach(function (num) {
        let li = document.createElement('li');
        li.textContent = num;
        numList.appendChild(li);
    });
}
