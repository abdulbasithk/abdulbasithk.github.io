window.addEventListener("keypress", press)
function press(event) {
    let x = event.which||event.keyCode;
    if(x==49){
        document.getElementById('display').value += '1'
    }else if(x==50){
        document.getElementById('display').value += '2'
    }else if(x==51){
        document.getElementById('display').value += '3'
    }else if(x==52){
        document.getElementById('display').value += '4'
    }else if(x==53){
        document.getElementById('display').value += '5'
    }else if(x==54){
        document.getElementById('display').value += '6'
    }else if(x==55){
        document.getElementById('display').value += '7'
    }else if(x==56){
        document.getElementById('display').value += '8'
    }else if(x==57){
        document.getElementById('display').value += '9'
    }else if(x==48){
        document.getElementById('display').value += '0'
    }else if(x==42){
        document.getElementById('display').value += '*'
    }else if(x==43){
        document.getElementById('display').value += '+'
    }else if(x==46){
        document.getElementById('display').value += '.'
    }else if(x==45){
        document.getElementById('display').value += '-'
    }else if(x==47){
        document.getElementById('display').value += '/'
    }else if(x==61 || x==13){
        calculate()
    }else if(x==32){
        document.getElementById('display').value = backSpace(document.getElementById('display').value)
    }else if(x==192){
        clearDisplay;
    }
}
function clearDisplay() {
    document.getElementById('display').value = ''
}
function backSpace(str) {
    let res = ''
    for(let i=0; i<str.length-1; i++){
        
            res += str[i]
    }
    if(res==undefined){
        res = '0'
    }
    return res
}
function cleaner(arr, x) {
    let res = []
    for (let i = 0; i< arr.length; i++) {
        if(arr[i]=== x){
            continue
        }else{
            res.push(arr[i])
        }
    }return res
}
var index = 0
function calculate() {
    var inputHistory = ''
    var resHistory = ''
    let input = document.getElementById('display').value
    // let input = '√0.03'
    let res = []
    let str = ''
    let operator = ['+', '-', '/', '*', "²", "√", "∛"]
    for(let i=0; i<input.length; i++){
        if(input[i]!=="+" && input[i]!=="*" && input[i]!=="-" && input[i]!=="/" && input[i]!=="²" && input[i]!=="√" && input[i]!=="∛"){
            str+=input[i]
        }else{
            res.push(str)
            str = ''
            str += input[i]
            res.push(str)
            str = ''
        }
    }res.push(str)
    
    let result = cleaner(res, '')
    for(let i=0; i<result.length; i++){
        if(result[i]==='²'){
            result[i-1] = Math.pow(result[i-1], 2) 
        }else if(result[i]=== '√'){
            result[i+1] = Math.sqrt(result[i+1])
        }else if(result[i] === '∛'){
            result[i+1] = Math.cbrt(result[i+1])
        }
    }
    result = cleaner(result,'²')
    for(let i=0; i<result.length; i++){
        if(i>0){
            if(result[i]==='√' || result[i]==='∛')
            for(let j=0; j<operator.length; j++){
                if(result[i-1] == operator[j]){
                    continue;
                }else{
                    result[i] = '*'
                }
            }
        }
    }
    result = cleaner(result,'∛')
    result = cleaner(result,'√')
    result = result.join('')
    result = eval(result)
    document.getElementById('display').value = result
    // document.getElementById('history').innerHTML += input
    inputHistory = input
    resHistory = result
    let newDiv = document.createElement(`div-${index}`)
    newDiv.innerHTML = `${input} =`
    document.getElementById('history').appendChild(newDiv)
    index++
    let resDiv = document.createElement(`div-${index}`)
    resDiv.innerHTML = `(${result})`
    document.getElementById('history').appendChild(resDiv)
    index++
}

function clearHistory(){
    document.getElementById('history').innerHTML = ''
}