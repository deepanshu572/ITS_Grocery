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
    img: "../assets/img/icon/Grocery.png",
    name: "Grocery"
  },
  {
    img: "../assets/img/icon/beauty.png",
    name: "Beauty"
  },
  {
    img: "../assets/img/icon/fashion.png",
    name: "Fashion"
  },
  {
     img: "../assets/img/icon/electricity.png",
    name: "Electricity"
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


function getbanner() {
  const bannerData = [
    "../assets/img/bg/homeBanner1.svg",
    "../assets/img/bg/homeBanner1.svg",
    "../assets/img/bg/homeBanner1.svg",
    "../assets/img/bg/homeBanner1.svg"
  ]
  let crouselHtml ='';
  bannerData.map((item)=>{
    crouselHtml+=`<div class="banner_left item">
              <img src="${item}" alt="" />
            </div>`;
  })

  $("#crouselBanner").html(crouselHtml);
  let data =  $("#crouselBanner");
  console.log(data)
  
}
function initGrocery() {
  getProductDesign1();
  getCategories();
  getCategories2();
  getArivalsData();
  getProductDesign2();
  handleCrousel();
  getStoresDesignPrd();
  getProductDesignWrap1();
  getcategoryDesign();
}
function initBeauty() {
  getCategoryStore();
  getArrowCategory();
  getCategories2();
  handleCrousel();
  getProductDesign2();
}
function initFashion() {
  handleCrouselFashion();
  getFashionPrd();
  getBrandsProduct();
  getlastFashion();
 
}
function initElectric() {
getProductElectric();
getCategoryElectric();
 
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

  $("#categoryBeauty1").html(html);
  $("#categoryBeauty2").html(html);



}


function getArivalsData (){
  const prdData = [
    "../assets/img/bg/newArrival1.svg",
    "../assets/img/bg/newArrival2.svg",
    "../assets/img/bg/newArrival1.svg",
    "../assets/img/bg/newArrival2.svg"
  ];
  let prdHtml='';
  prdData.map((item)=>{
    prdHtml+=`<div class="new_arrivals_item">
              <img src="${item}" alt="">
            </div>`;
  });

  $("#newArrival").html(prdHtml);
}



function getProductDesign2() {

  let productHtml = '';
  [0,1,2,3,4,5].map((item)=>{
     productHtml+=`  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
            <button>Add</button>
            </div>
            <div class="product_txt">
              <h5>Tata salt vacum evaporated iodised edible common salt </h5>
              <div class="rating_wrap">
                <div class="stars"><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i></div>
                <div class="rate">(303003)</div>
              </div>
              <div class="qty_price_sec">
                <h4>1kg</h5>
                <div class="price_sec">
                <h6>₹29</h6>
                <del>₹30</del>
                </div>
                </div>
            </div>
          </div>`;
  })

  $("#productWrap1").html(productHtml)
  $("#productWrap2").html(productHtml)
  $("#productWrap3").html(productHtml)
  $("#productWrap4").html(productHtml);


  //beauty page id
  $("#productBeauty1").html(productHtml);
  $("#productBeauty2").html(productHtml);
  $("#productBeauty3").html(productHtml);
  $("#productBeauty4").html(productHtml);


  //beauty page id
  $("#productElectric1").html(productHtml);



  
}



function handleCrousel() {
  const bannerData = [
  {
    id: 1,
    bannerImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    title: "Fresh Vegetables",
  },
  {
    id: 2,
    bannerImg: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    title: "Daily Grocery Deals",
  },
  {
    id: 3,
    bannerImg: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",
    title: "Organic Fruits",
  },
  {
    id: 4,
    bannerImg: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&q=80",
    title: "Healthy Essentials",
  },
  {
    id: 5,
    bannerImg: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80",
    title: "Weekend Offers",
  }
];
let crouseHtml='';

bannerData.map((item)=>{
  crouseHtml+=` <div class="banner_slide item">
    <img src="${item.bannerImg}" alt="${item.title}">
  </div>`

});
$("#carousel1").html(crouseHtml);
$("#carousel2").html(crouseHtml);
$("#carousel3").html(crouseHtml);
  
}
function handleCrouselFashion() {
  const bannerData = [
  {
    id: 1,
    bannerImg: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    title: "Fresh Vegetables",
  },
  {
    id: 2,
    bannerImg: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    title: "Daily Grocery Deals",
  },
  {
    id: 3,
    bannerImg: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",
    title: "Organic Fruits",
  },
  {
    id: 4,
    bannerImg: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&q=80",
    title: "Healthy Essentials",
  },
  {
    id: 5,
    bannerImg: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80",
    title: "Weekend Offers",
  }
];
let crouseFashionHtml1='';
let crouseFashionHtml2='';

bannerData.map((item)=>{
  crouseFashionHtml1+=` <div class="fashion_banner">
    <img src="../assets/img/fashionbanner1.png" alt="${item.title}">
  </div>`
  crouseFashionHtml2+=` <div class="green_banner_img">
              <img src="../assets/img/green_banner.svg" alt="" />
            </div>`
});

$("#carousel4").html(crouseFashionHtml1);
$("#carousel5").html(crouseFashionHtml2);
  
}




function getStoresDesignPrd(){
   const productData = [
  {
    id: 1,
    image: "../assets/img/prd/Frame 9.svg",
    name: "Fresh Vegetables",
  },
  {
    id: 2,
    image: "../assets/img/prd/Frame 10.svg",
    name: "Daily Grocery Deals",
  },
  {
    id: 3,
    image: "../assets/img/prd/Frame 11.svg",
    name: "Organic Fruits",
  },
  {
    id: 4,
    image: "../assets/img/prd/Frame 12.svg",
    name: "Healthy Essentials",
  },
  {
    id: 5,
    image: "../assets/img/prd/Frame 13.svg",
    name: "Weekend Offers",
  },
  {
    id: 5,
    image: "../assets/img/prd/Frame 14.svg",
    name: "Weekend Offers",
  },
  {
    id: 5,
    image: "../assets/img/prd/Frame 15.svg",
    name: "Weekend Offers",
  },
  {
    id: 5,
    image: "../assets/img/prd/Frame 17.svg",
    name: "Weekend Offers",
  },
  {
    id: 5,
    image: "../assets/img/prd/Frame 16.svg",
    name: "Weekend Offers",
  },
];
  let categoryPrdHtml='';
  productData.map((item)=>{
    categoryPrdHtml+=` <div class="category_store_item">
            <div class="category_store_image">
              <img src="${item.image}" alt="">
            </div>
            <p>${item.name}</p>
          </div>`;
  })

  $("#categoryPrd").html(categoryPrdHtml)
}



function getProductDesignWrap1() {

  let productHtml = '';
  [0,1,2,3,4,5].map((item)=>{
     productHtml+=`  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
            <button>Add</button>
            </div>
            <div class="product_txt">
              <h5>Tata salt vacum evaporated iodised edible common salt </h5>
              <div class="rating_wrap">
                <div class="stars"><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i></div>
                <div class="rate">(303003)</div>
              </div>
              <div class="qty_price_sec">
                <h4>1kg</h5>
                <div class="price_sec">
                <h6>₹29</h6>
                <del>₹30</del>
                </div>
                </div>
            </div>
          </div>`;
  })

  $("#productWrapsec1").html(productHtml)
  $("#productWrapsec2").html(productHtml)
  $("#productWrapsec3").html(productHtml)
  
}



function getcategoryDesign() {
   const categories = [
  {
    name: "Dairy, Bread & Eggs",
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff",

    ],
   
  },
  {
    name: "Fruits & Vegetables",
    images: [
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",

    ],
   
  },
  {
    name: "Snacks & Beverages",
    images: [
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13",
    ],
   
  },
  {
    name: "Atta, Rice & Dal",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c",
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4",
    ],
    more: 150
  },
  {
    name: "Personal Care",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    ],
   
  },
  {
    name: "Cleaning Essentials",
    images: [
      "https://images.unsplash.com/photo-1583947582886-f40ec95dd752",
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1",

    ],
 
  }
];

  let categoryHtml='';
  categories.map((item)=>{
    categoryHtml+=`    <div class="data_design_sec_item">
              <h5>${item.name}</h5>
              <div class="data_design_img_wrap">
               ${item?.images.map(img => `
              <div class="design_img">
                  <img src="${img}" alt="">
                </div>
            `).join("")}
                
                
              </div>
            </div>`;
  })

  $("#categoryDesign").html(categoryHtml);
  
}



function getCategoryStore() {
  const categoryData = [
    {
      name:"facewash",
      img:"../assets/img/category1.svg"
    },
    {
      name:"handwash",
      img:"../assets/img/category2.svg"
    },
    {
      name:"Shampoo",
      img:"../assets/img/category3.svg"
    },
    {
      name:"Bodywash",
      img:"../assets/img/category4.svg"
    },
    {
      name:"Perfume",
      img:"../assets/img/category1.svg"
    },
    {
      name:"Hair oil",
      img:"../assets/img/category3.svg"
    },
    {
      name:"handwash",
      img:"../assets/img/category2.svg"
    },
    {
      name:"Shampoo",
      img:"../assets/img/category4.svg"
    }
  ]
  let categoryHtml = '';
  categoryData.map((item)=>{
    categoryHtml+=`<div class="category_store_item">
                <h4>${item.name}</h4>
                <img src="${item.img}" alt="">
              </div>`;
  })
   
  $("#categoryStore").html(categoryHtml);
}



function getArrowCategory(){

  let categoryArrowHtml = '';
  const arrowDesign = [
    "../assets/img/arrow_design1.svg",
    "../assets/img/arrow_design2.svg",
    "../assets/img/arrow_design3.svg",
    "../assets/img/arrow_design4.svg",
    "../assets/img/arrow_design5.svg",
    "../assets/img/arrow_design6.svg",
    "../assets/img/arrow_design7.svg",
    "../assets/img/arrow_design8.svg",
    "../assets/img/arrow_design9.svg",
  ];

  arrowDesign.map((img)=>{
    categoryArrowHtml+=`   <div class="category_beauty_arrow_item">
                <img src="${img}" alt="">
              </div>`;
  })
  
  $("#categoryArrowDesign").html(categoryArrowHtml);
}



function getBrandsProduct() {
  let brandPrdHtml='';
  const brandData = [
  {
    id: 1,
    name: "Clothes",
    img: "../assets/img/fashionbox1.png"
  },
  {
    id: 2,
    name: "Shoes",
    img: "../assets/img/fashionbox2.png"
  },
  {
    id: 3,
    name: "Watches",
    img: "../assets/img/fashionbox3.png"
  },
  {
    id: 4,
    name: "Bags",
    img: "../assets/img/fashionbox4.png"
  },
  {
    id: 5,
    name: "Jewellery",
    img: "../assets/img/fashionbox5.png"
  },
  {
    id: 6,
    name: "Sunglasses",
    img: "../assets/img/fashionbox6.png"
  },
  {
    id: 7,
    name: "Perfumes",
    img: "../assets/img/fashionbox7.png"
  },
  {
    id: 8,
    name: "Ethnic Wear",
    img: "../assets/img/fashionbox8.png"
  },
  {
    id: 9,
    name: "T-Shirts",
    img: "../assets/img/fashionbox9.png"
  },
  {
    id: 10,
    name: "Jeans",
    img: "../assets/img/fashionbox10.png"
  },
  {
    id: 11,
    name: "Jackets",
    img: "../assets/img/fashionbox11.png"
  },
  {
    id: 12,
    name: "Sportswear",
    img: "../assets/img/fashionbox12.png"
  },
  {
    id: 13,
    name: "Formal Wear",
    img: "../assets/img/fashionbox13.png"
  },
  {
    id: 14,
    name: "Kids Fashion",
    img: "../assets/img/fashionbox14.png"
  },
  {
    id: 15,
    name: "Accessories",
    img: "../assets/img/fashionbox15.png"
  },
  {
    id: 16,
    name: "Footwear",
    img: "../assets/img/fashionbox16.png"
  }
];

  brandData.map((item)=>{
    brandPrdHtml+=` <div class="fashion_brand_img">
                <img src="${item.img}" alt="">
              <h4>${item.name}</h4> 
            </div>`;
  });
  $("#brandsProduct").html(brandPrdHtml);
  
}


function getlastFashion() {
    let lastPrdHtml='';
  const lastData = [
  {
    id: 1,
    name: "Clothes",
    img: "../assets/img/fashionbox1.png"
  },
  {
    id: 2,
    name: "Shoes",
    img: "../assets/img/fashionbox2.png"
  },
  {
    id: 3,
    name: "Watches",
    img: "../assets/img/fashionbox3.png"
  },
  {
    id: 4,
    name: "Bags",
    img: "../assets/img/fashionbox4.png"
  },
  {
    id: 5,
    name: "Jewellery",
    img: "../assets/img/fashionbox5.png"
  },
  {
    id: 6,
    name: "Sunglasses",
    img: "../assets/img/fashionbox6.png"
  },
  {
    id: 7,
    name: "Perfumes",
    img: "../assets/img/fashionbox7.png"
  },
  {
    id: 8,
    name: "Ethnic Wear",
    img: "../assets/img/fashionbox8.png"
  },
  {
    id: 9,
    name: "T-Shirts",
    img: "../assets/img/fashionbox9.png"
  },
  {
    id: 10,
    name: "Jeans",
    img: "../assets/img/fashionbox10.png"
  },
  {
    id: 11,
    name: "Jackets",
    img: "../assets/img/fashionbox11.png"
  },
  {
    id: 12,
    name: "Sportswear",
    img: "../assets/img/fashionbox12.png"
  },
  {
    id: 13,
    name: "Formal Wear",
    img: "../assets/img/fashionbox13.png"
  },
  {
    id: 14,
    name: "Kids Fashion",
    img: "../assets/img/fashionbox14.png"
  },
  {
    id: 15,
    name: "Accessories",
    img: "../assets/img/fashionbox15.png"
  },
  {
    id: 16,
    name: "Footwear",
    img: "../assets/img/fashionbox16.png"
  }
];
let i =0;
 lastData.map((item)=>{
  i++;
    lastPrdHtml+=`   <div class="last_fashion_item">
                  <h5>${i}</h5>
                  <div class="last_fashion_img">
                            <div class='discount' > <p>min  70% <br/> Off</p> <img src='../assets/img/icon/discount.svg' /> </div>

                    <img src="${item.img}" alt="">
                    <h5>${item.name}</h5>
                  </div>
                </div>`;
  });
  $("#lastFashionsec").html(lastPrdHtml);
  
}

function getFashionPrd() {

  let productHtml='';
  [1,2,3,4,5,6].map((item)=>{
    productHtml+=`    <div class="product_fashion_schema">
          <div class="product_top">
          
            <div class="product_img_fashion">
             
              <img src="../assets/img/fashionbox${item}.png" alt="">
            </div><button>Add</button>
          </div>
          <div class="product_txt_fashion">
            <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, iusto!</h5>
            <div class="price_fashion">
              <h6>₹1499</h6>
              <del>₹7804</del>
            </div>
          </div>
        </div>`;
  });


    //Fashion page id
  $("#productFashion1").html(productHtml);
  $("#productFashion2").html(productHtml);
  $("#productFashion3").html(productHtml);
  $("#productFashion4").html(productHtml);
  $("#productFashion5").html(productHtml);
  
}



function getProductElectric() {

  const electronicProducts = [
  {
    id: 1,
    name: "boAt Nirvana Crystal",
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
    rating: 5,
    reviews: 20896,
    discount: "77% OFF",
    price: 2499,
    mrp: 10999,
    
  },
  {
    id: 2,
    name: "Noise Air Buds Pro",
    img: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500",
    rating: 4.5,
    reviews: 15420,
    discount: "68% OFF",
    price: 1899,
    mrp: 5999,
    
  },
  {
    id: 3,
    name: "JBL Wireless Headphones",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.8,
    reviews: 12560,
    discount: "55% OFF",
    price: 3499,
    mrp: 7999,
    
  },
  {
    id: 4,
    name: "Sony Bluetooth Speaker",
    img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
    rating: 4.7,
    reviews: 8945,
    discount: "42% OFF",
    price: 4599,
    mrp: 7999,
    
  },
  {
    id: 5,
    name: "Fire-Boltt Smart Watch",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    rating: 4.4,
    reviews: 32540,
    discount: "72% OFF",
    price: 1999,
    mrp: 6999,
    
  },
  {
    id: 6,
    name: "Mi Power Bank 20000mAh",
    img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    rating: 4.6,
    reviews: 18200,
    discount: "38% OFF",
    price: 1499,
    mrp: 2499,
    
  }
];
    let productDesign1Html='';
    electronicProducts.map((item)=>{
        productDesign1Html+=` <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img">
              <img src="${item.img}" alt="">
            </div>
            <button>Add</button>
            </div>
            <div class="product_txt">
              <h5>${item.name} </h5>
              <div class="rating_wrap">
                <div class="stars"><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i></div>
                <div class="rate">(303003)</div>
              </div>
              <div class="qty_price_sec">
                <h4>1kg</h4>
                <div class="price_sec">
                <h6>₹29</h6>
                <del>₹30</del>
                </div>
                </div>
            </div>
          </div>`;
    })

    $("#productElectric1").html(productDesign1Html)
    
}

function getCategoryElectric(){
 const electronicProducts = [
  {
    id: 1,
    name: "boAt Nirvana Crystal",
    img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
    rating: 5,
    reviews: 20896,
    discount: "77% OFF",
    price: 2499,
    mrp: 10999,
    
  },
  {
    id: 2,
    name: "Noise Air Buds Pro",
    img: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500",
    rating: 4.5,
    reviews: 15420,
    discount: "68% OFF",
    price: 1899,
    mrp: 5999,
    
  },
  {
    id: 3,
    name: "JBL Wireless Headphones",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.8,
    reviews: 12560,
    discount: "55% OFF",
    price: 3499,
    mrp: 7999,
    
  },
  {
    id: 4,
    name: "Sony Bluetooth Speaker",
    img: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
    rating: 4.7,
    reviews: 8945,
    discount: "42% OFF",
    price: 4599,
    mrp: 7999,
    
  },
  {
    id: 5,
    name: "Fire-Boltt Smart Watch",
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
    rating: 4.4,
    reviews: 32540,
    discount: "72% OFF",
    price: 1999,
    mrp: 6999,
    
  },
  {
    id: 6,
    name: "Mi Power Bank 20000mAh",
    img: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    rating: 4.6,
    reviews: 18200,
    discount: "38% OFF",
    price: 1499,
    mrp: 2499,
    
  },
    {
    id: 7,
    name: "Noise Air Buds Pro",
    img: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500",
    rating: 4.5,
    reviews: 15420,
    discount: "68% OFF",
    price: 1899,
    mrp: 5999,
    
  },
  {
    id: 8,
    name: "JBL Wireless Headphones",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.8,
    reviews: 12560,
    discount: "55% OFF",
    price: 3499,
    mrp: 7999,
    
  },
];

  let html = "";

  electronicProducts.forEach(item => {

    html += `
      <div class="cateogy_box">
        <div class="category_img_box_design">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>
    `;

  });

  $("#categoryElectric1").html(html);

}


