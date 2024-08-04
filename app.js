
const btn = document.querySelector('.input > button');
const input_field = document.querySelector('.input > input');
let array = []

btn.addEventListener('click',function(){
    if(input_field.value.trim() === ""){
        alert('Error! Empty Selection.')
        return
    }
    array.push(input_field.value)
    input_field.value = ""
    List()
    saveData()
})

function List(){
    let clutter = ""
    array.forEach((item, index) => {
        clutter += `<div class="msg"><div class="left"><div class="check-icon" data-index=${index} ><i class="ri-checkbox-blank-circle-line"></i></div><div class="msg-text">${item}</div></div><div class="cross-icon" data-index="${index}"><i class="ri-close-circle-fill"></i></div></div>`
    })
    document.querySelector('.list').innerHTML = clutter;
    document.querySelectorAll('.check-icon').forEach(icon => {
        icon.addEventListener('click',function(){
            let index = this.dataset.index;
            let msgTxts = document.querySelectorAll('.msg-text');
            let msgTxt = msgTxts[index];
            let iconElement = this.querySelector('i');
            if (iconElement.classList.contains('ri-checkbox-blank-circle-line')) {
                iconElement.classList.remove('ri-checkbox-blank-circle-line');
                iconElement.classList.add('ri-checkbox-circle-fill');
                msgTxt.style.textDecoration = 'line-through';
            } else if (iconElement.classList.contains('ri-checkbox-circle-fill')) {
                iconElement.classList.remove('ri-checkbox-circle-fill');
                iconElement.classList.add('ri-checkbox-blank-circle-line');
                msgTxt.style.textDecoration = 'none';
            }
            saveData()
        })
    })
    document.querySelectorAll('.cross-icon').forEach(item => {
        item.addEventListener('click',function(){
            let index = this.dataset.index;
            msg = document.querySelector('.msg')[index]
            array.splice(index,1)
            List()
            saveData()
        })
    })
}

function saveData(){
    localStorage.setItem("data",JSON.stringify(array))
}

function loadData(){
    const data = localStorage.getItem('data')
    if(data){
        array = JSON.parse(data)
        List()
    }
}

loadData()