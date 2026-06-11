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
function getCategory() {
    const categories = [
  {
    img: "../assets/img/icon/furniture.png",
    name: "Grocery"
  },
  {
    img: "../assets/img/icon/beauty.png",
    name: "Beauty"
  },
  {
    img: "../assets/img/icon/gift.png",
    name: "Gift"
  },
  {
    img: "../assets/img/icon/home.png",
    name: "Decor"
  },
  {
    img: "../assets/img/icon/kids.png",
    name: "Kids"
  },
  {
    img: "../assets/img/icon/personal.png",
    name: "Personal"
  },
 
];


let categoryHtml = "";

categories.forEach((item,index)=>{
    categoryHtml += `
<button 
    class="category_btn ${index === 0 ? "active" : ""}"
    data-category="${item.name}"
>
    <div class="category_img">
        <img src="${item.img}" alt="">
    </div>
    <div class="category_name">${item.name}</div>
</button>
`;
});

$("#category").html(categoryHtml);

setTimeout(()=>{
    moveIndicator($(".category_btn.active"));
},100);


}
getCategory();

function moveIndicator(btn){

    const indicator = $(".category_indicator");

    indicator.css({
        width: btn.outerWidth() * 0.7,
        left: btn.position().left + (btn.outerWidth() * 0.15)
    });
}

$(document).on("click",".category_btn",function(){

    $(".category_btn").removeClass("active");
    $(this).addClass("active");

    moveIndicator($(this));
   const category = $(this).data("category");

    console.log(category);

   
   renderCategory(category);
    
});
function renderCategory(name) {
    
    if(name == "Grocery"){
        $(".header_nav").css("background-image", "url('../assets/img/bg/bg1.svg')");
        $("#banners").html(` <div class="hero_sec_img">
            <img src="../assets/img/bg/heroBanner1.svg" alt="" />
          </div>
          <div class="home_banner optional">
            <div class="banner_left">
              <img src="../assets/img/bg/homeBanner1.svg" alt="" />
            </div>
            <div class="banner_right">
              <div class="banner_top">
                <img src="../assets/img/bg/homeBanner2.svg" alt="" />
                <img src="../assets/img/bg/homeBanner3.svg" alt="" />
              </div>
              <div class="banner_bottom">
                <img src="../assets/img/bg/homeBanner4.svg" alt="" />
                <img src="../assets/img/bg/homeBanner5.svg" alt="" />
              </div>
            </div>
          </div>`);
        // $("#contentToggle").html("GROCERY ! ");
        

    }else if(name == "Beauty"){
          $(".header_nav").css("background-image", "url('../assets/img/bg/bg2.svg')");
        //  $("#contentToggle").html("Beauty ! ");
          $("#banners").html(` <div class="hero_sec_img">
            <img src="../assets/img/bg/heroBanner2.svg" alt="" />
          </div>`);
         

    }else if(name == "Gift"){
         $("#contentToggle").html("Gift ! ");

    }
    
}

function getProductDesign1() {
    let productDesign1Html='';
    [0,1,2,3,4,5,6].map((item)=>{
        productDesign1Html+=` <div class="product_data_item">
                <div class="product_data_img">
                  <div class="disc">5% Off</div>
                  <img src="../assets/img/bg/prd1.svg" alt="">
                </div>
                <div class="product_text">
                <h5>Tata Salt (Vacuum Evaporated Iodised)</h5>
                <div class="qty_price_sec">
                <h4>1kg</h5>
                <div class="price_sec">
                <h6>₹29</h6>
                <del>₹30</del>
                </div>
                </div>
                <button class="green_btn">Add</button>
                </div>
              </div>`;
    })

    $("#productDesign1").html(productDesign1Html)
    
}

function getCategories() {
 const categories = [
  {
    name: "Dairy, Bread & Eggs",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f"
    ],
    more: 240
  },
  {
    name: "Fruits & Vegetables",
    images: [
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e",
      "https://images.unsplash.com/photo-1574226516831-e1dff420e37f"
    ],
    more: 320
  },
  {
    name: "Snacks & Beverages",
    images: [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e",
      "https://images.unsplash.com/photo-1551024709-8f23befc6cf7"
    ],
    more: 180
  },
  {
    name: "Atta, Rice & Dal",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4",
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7"
    ],
    more: 150
  },
  {
    name: "Personal Care",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273"
    ],
    more: 110
  },
  {
    name: "Cleaning Essentials",
    images: [
      "https://images.unsplash.com/photo-1583947582886-f40ec95dd752",
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1",
      "https://images.unsplash.com/photo-1610552050890-fe99536c2614",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1"
    ],
    more: 95
  }
];

  let html = "";

  categories.forEach(category => {

    html += `
      <div class="category_item">

        <div class="category_top">
          <div class="category_top_sub_item">

            ${category.images.map(img => `
              <div class="sub_item">
                <img src="${img}" alt="">
              </div>
            `).join("")}

            <p>+${category.more} more</p>

          </div>
        </div>

        <div class="category_bottom">
          <p>${category.name}</p>
        </div>

      </div>
    `;

  });

  $("#categoryContainer").html(html);

}
function getCategories2(){
const groceryCategories = [
  {
    name: "Fruits",
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
  },
  {
    name: "Vegetables",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
  },
  {
    name: "Dairy",
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
  },
  {
    name: "Bakery",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"
  },
  {
    name: "Beverages",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300"
  },
  {
    name: "Snacks",
    img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300"
  },
  {
    name: "Rice & Dal",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300"
  },
  {
    name: "Personal Care",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300"
  }
];
// function renderGroceryCategories() {

  let html = "";

  groceryCategories.forEach(item => {

    html += `
      <div class="cateogy_box">
        <div class="category_img_box_design">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>
    `;

  });

  $("#categoryBox1").html(html);
  $("#categoryBox2").html(html);
  $("#categoryBox3").html(html);

// }
}
getCategories2();


