console.log("done !");
let apiUrl = "api_url"

function handleInput(e) {
    console.log(e.target.value);
    let value = e.target.value;
    if(value.length>9){
        $("#btnLogin").html(
            ` <button class="continue_btn activeBtn">
            Continue
        </button>`
        )
    }
}
function handleLogin(e) {
    e.preventDefault();
    let phone = $("#phone").val();
    alert(phone);
    location.href='otp.html';
    let otp = 505990
    localStorage.setItem("phone",phone);
    localStorage.setItem("otp",otp);
    // $.ajax({
    //    url:apiUrl,
    //    method:"POST",
    //    dataType:"json",
    //    success : function (response) {
    //        if(response.status == "success"){
    //         alert(response.message);
    //        }else{
    //         alert(response.message);
    //        }
    //    },
    //    error : function (xhr,status,error) {
    //     alert("AJAX Error : "+error);
    //    }
    // })
}
function getLoginData() {
    let phone = localStorage.getItem("phone");
    let otp = localStorage.getItem("otp");

    $("#phone").html(phone);

    
    
}
