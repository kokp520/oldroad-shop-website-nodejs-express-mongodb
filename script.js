// singleproduct.html改變主商品
var mainimg = document.getElementById("main-img");
var smallimg = document.getElementsByClassName("small-img");

smallimg[0].onmousemove = function() {
    mainimg.src = smallimg[0].src;
}
smallimg[1].onmousemove = function() {
    mainimg.src = smallimg[1].src;
}
smallimg[2].onmousemove = function() {
    mainimg.src = smallimg[2].src;
}
smallimg[3].onmousemove = function() {
    mainimg.src = smallimg[3].src;
}


function GoRegister() {
    var loginform = document.querySelector(".login-form");
    loginform.style.display = "none";
    var registerform = document.querySelector(".register-form");
    registerform.style.display = "block";
}

function OpenOrdersContent(index){
    var icon = document.querySelectorAll(`#OrdersIcon`)
    var content = document.querySelectorAll(`#OrdersContent`)
     icon[index].style.display = 'none';
     content[index].style.display = 'block'; 
}


function BackOrdersIcon(index){
    var icon = document.querySelectorAll(`#OrdersIcon`)
    var content = document.querySelectorAll(`#OrdersContent`)
     icon[index].style.display = '';
     content[index].style.display = 'none'; 
}


function OpenPSContent(index){
    var icon = document.querySelectorAll(`.PSicon`)
    var content = document.querySelectorAll(`.PScontent`)
     icon[index].style.display = 'none';
     content[index].style.display = ''; 
}

function BackPSIcon(index){
    var icon = document.querySelectorAll(`.PSicon`)
    var content = document.querySelectorAll(`.PScontent`)
     icon[index].style.display = '';
     content[index].style.display = 'none'; 
}

function AddColor(){
    var newcolor1 = document.querySelector(`#newcolor1`)
    newcolor1.innerHTML = `<div class="addbox"> <label for="div">color 2:</label><input type="text" name="color" placeholder="請輸入顏色" required></div>`
    var button1 = document.querySelector(`.addcolor1`)
    button1.style.display = 'none'
    var button2 = document.querySelector(`.addcolor2`)
    button2.style.display = ''
}

function AddColor2(){
    var newcolor2 = document.querySelector(`#newcolor2`)
    newcolor2.innerHTML = `<div class="addbox"> <label for="div">color 3:</label><input type="text" name="color" placeholder="請輸入顏色" required></div>`
    var button2 = document.querySelector(`.addcolor2`)
    button2.style.display = 'none'
}

function AddSize(){
    var size = document.querySelector(`#newsize1`)
    size.innerHTML = ` <div class="addbox"><label for="">size:</label><select name="size" id="size">
    <option>size</option>   
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
</select></div>`
    var button1 = document.querySelector(`.addsize1`)
    button1.style.display = 'none'
    var button2 = document.querySelector(`.addsize2`)
    button2.style.display = ''
}

function AddSize2(){
    var size2 = document.querySelector(`#newsize2`)
    size2.innerHTML = ` <div class="addbox"><label for="">size:</label><select name="size" id="size">
    <option>size</option>   
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
</select></div>`
    var button2 = document.querySelector(`.addsize2`)
    button2.style.display = 'none'
}

function quantityChange(){
    var price =  document.querySelectorAll(`[name="thisprice"]`)
    var quantity = document.querySelectorAll(`[name="thisquantity"]`)
    var subtotal = document.querySelectorAll(`[name="subtotal"]`)

    for(i=0;i<quantity.length;i++){
        subtotal[i].innerHTML =  price[i].textContent*quantity[i].value
    }
}

function AllTotal(){
    var alltotal = document.querySelector(`[name="alltotal"]`)
    var span = document.querySelector(`[name="alltotalspan"]`)
    var total = document.querySelector(`[name="total"]`)
    var subtotal = document.querySelectorAll(`[name="subtotal"]`)
    var result = 0;
    for(i=0; i <subtotal.length;i++){
        result += Number(subtotal[i].textContent)
    }
    total.innerHTML = result;
    span.innerHTML = Number(total.textContent)+60
    alltotal.value = span.textContent
}

function GoRecipient(){
    var recipient = document.querySelector(`#recipient`)
    var orders =document.querySelector(`#AllOrders`)
    var checkout = document.querySelector(`#checkout1`)
    var next = document.querySelector(`#NEXT`)

    orders.style.display = 'none';
    recipient.style.display = '';
    next.style.display = 'none';
    checkout.style.display = '';
}

function CartQuantity(){
    var id = document.querySelector(`[name="id"]`)
    var span =  document.querySelector(`[name="CartQuantity"]`)
    var count = 0;
    var xhr = new XMLHttpRequest;
    xhr.open('GET','http://localhost:5000/getorders',true)
    xhr.send()
    xhr.onload = function(){
        var data =  JSON.parse(this.response)
        for(i=0;i<data.length;i++){
            if(data[i].user === id.value ){
                count++;
            }
        }
        span.textContent = count
    }
}

function SameAccount(){
    var userID = document.querySelector(`[name="userID"]`)
    var name = document.querySelector(`[name="RecipientName"]`)
    var phone = document.querySelector(`[name="RecipientPhone"]`)
    var address = document.querySelector(`[name="RecipientAddress"]`)
    var checkboxes = document.querySelector('input[type=checkbox]:checked')
    var xhr = new XMLHttpRequest;
    xhr.open('GET','http://localhost:5000/getmods',true)
    xhr.send()
    xhr.onload = function(){
        if(checkboxes){
            var data =  JSON.parse(this.response)
        for(i=0;i<data.length;i++){
            if(data[i]._id === userID.value ){

                name.value = data[i].name
                phone.value = data[i].phone
                address.value = data[i].address
                break
            }
        }} else{
            name.value = ''
            phone.value = ''
            address.value = ''
        }
        
    }
}

function GoDescriptionContent(index){
    var icon = document.querySelectorAll(`.DescriptionIcon`)
    var desc = document.querySelectorAll(`.DescriptionContent`)
    icon[index].style.display = 'none';
    desc[index].style.display = 'block'
}

function GoDescriptionIcon(index){
    var icon = document.querySelectorAll(`.DescriptionIcon`)
    var desc = document.querySelectorAll(`.DescriptionContent`)
    icon[index].style.display = '';
    desc[index].style.display = 'none'
}

function OpenPSContent(index){
    var icon = document.querySelectorAll(`.PSicon`)
    var desc = document.querySelectorAll(`.PScontent`)
    icon[index].style.display = 'none';
    desc[index].style.display = 'block'
}

function BackPSIcon(index){
    var icon = document.querySelectorAll(`.PSicon`)
    var desc = document.querySelectorAll(`.PScontent`)
    icon[index].style.display = 'block';
    desc[index].style.display = 'none'
}

function checkname(){
    var check = false
    var name = document.querySelector(`[name="name"]`).value
    var span = document.querySelector(`#checkname`)
    if(name.length>=3 && name.length<10){
        span.innerHTML=''
     check = true
    } else if(name.length<3){
         span.innerHTML = '名字至少三個字'
        check = false;
    } else {
        span.innerHTML = '名字不可超過10個字'
    }
    return check
}

function checkphone(){
    var check = false;
    var phone = document.querySelector(`[name="phone"]`).value
    var span = document.querySelector(`#checkphone`)

    if(phone.length === 10 && phone.slice(0,2) === '09'){
        span.innerHTML = ''
        check = true
    } else {
        span.innerHTML = '手機格式輸入錯誤'
        check = false
    }
    return check
}

function checkemail(){
    var check = false;
    var email = document.querySelector(`[name="email"]`).value
    var span = document.querySelector(`#CheckEmailText`)
    var xhr = new XMLHttpRequest;
    xhr.open('GET','http://localhost:5000/getmods',true)
    xhr.send()
    xhr.onload = function(){
        var data = JSON.parse(this.response)
        for(i=0; i<data.length; i++){
            if(data[i].email === email){
                span.innerHTML = '此信箱已註冊'
                check = false;
                break
            } else {
                check = true
                span.innerHTML =''
            }
        }
    return check
    }

}

function firstcheckpassword(){
    var check = false;
    var password = document.querySelector(`[name="password"]`).value
    var span = document.querySelector(`#firstcheckpassword`)

    if(password.length>=6){
        span.innerHTML = ''
        check = true
    } else {
        span.innerHTML = '密碼至少6位數'
        check = false
    }
    return check
}


function checkpassword(){
    var check = false;
    var password = document.querySelector(`[name="password"]`).value
    var span = document.querySelector(`#checkpasswordtext`)
    var second = document.querySelector(`[name="confirmpassword"]`).value 

    if(password === second){
        span.innerHTML = ''
        check = true
    } else {
        span.innerHTML = '兩次密碼輸入不相同請再試一次'
        check = false
    }
    return check
}

function check(){
    var check = false;
    check = checkname()&& checkphone()&&checkemail()&&firstcheckpassword()&&checkpassword()
    if(check === false){
        if(checkname()===false){
            alert('姓名格式錯誤，請再試一次，謝謝！')
        } else if ( checkphone() === false){
            alert('手機格式錯誤，請再試一次，謝謝！')
        }else if ( checkemail() === false){
            alert('您的信箱有問題喔，請再試一次，謝謝！')
        }else if ( firstcheckpassword() === false){
            alert('密碼格式錯誤，請再試一次，謝謝！')
        }else if ( checkpassword() === false){
            alert('密碼兩次不相同，請再試一次，謝謝！')
        }
    } else{
         return check
    }
   return check
}

function CheckCode(){
    var check = false
    var code = document.querySelector(`[name="InputCheckCode"]`).value
    var span = document.querySelector(`#AfterCheckCode`)
    if(code.length === 6){
        span.innerHTML = '';
        check = true;
    } else{
        span.innerHTML = 'code必須為6位整數'
        check = false;
    }
    return check
}

function AccountEditcheck(){
    var check = false;
    check = checkname()&& checkphone()&&firstcheckpassword()&&checkpassword()
    if(check === false){
        if(checkname()===false){
            alert('姓名格式錯誤，請再試一次，謝謝！')
        } else if ( checkphone() === false){
            alert('手機格式錯誤，請再試一次，謝謝！')
        }else if ( firstcheckpassword() === false){
            alert('密碼格式錯誤，請再試一次，謝謝！')
        }else if ( checkpassword() === false){
            alert('密碼兩次不相同，請再試一次，謝謝！')
        }
    }
   return check
}

function loadfile(event){

    var output =  document.querySelectorAll(`#output`)

    for(i=0;i<event.target.files.length;i++){
        output[i].src =  URL.createObjectURL(event.target.files[i]);
        output[i].onload = function() {
        URL.revokeObjectURL(output[i].src) // free memory
      }
    }
   
}