let fact = document.querySelector('#fact');
let factText = document.querySelector('#fact');

let numberInput = document.querySelector('#numberInput');

// <방법1> Ajax
// numberInput.addEventListener('input', getFactAjax);
// function getFactAjax(){
//     let number = numberInput.value;

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://numbersapi.com/'+number);

//     xhr.onload = function(){
//         if(this.status == 200 && number!=''){ // status200: everything is good
//             //console.log(this.responseText);
//             fact.style.display = 'block';
//             factText.innerText = this.responseText;
//         }
//     }
//     xhr.send();
// }

// <방법2> fetch
numberInput.addEventListener('input', getFactFetch);

function getFactFetch(){
    let number = numberInput.value;

    fetch('http://numbersapi.com/'+number)
        .then(response => response.text())
        .then(data => {
            //console.log(data);
            if(number !=''){
                fact.style.display = 'block';
                factText.innerText = data;
            }
        })
        .catch(err => console.log(err))


}



