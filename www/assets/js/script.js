console.log("done !");
let userId = localStorage.getItem("userId");
let cartData = JSON.parse(localStorage.getItem("cart"));
$("#cartPopup").hide();
if (cartData && cartData.length > 0) {
  $("#cartPopup").show();
  $("#cartQty").html(cartData.length);
} else {
  localStorage.setItem("cart", JSON.stringify([]));
}

let apiUrl =
  "http://localhost/INDIAN%20TECH%20SOLUTION%20-%20BACKEND/Dashboard_multiBranch/apis/app/";

let imgUrl =
  "http://localhost/INDIAN%20TECH%20SOLUTION%20-%20BACKEND/Dashboard_multiBranch/admin/";
let categoryId = localStorage.getItem("currentCategoryId");

function handleInputLogin(e) {
  console.log(e.target.value);
  let value = e.target.value;
  if (value.length > 9) {
    $("#btnLogin").html(
      ` <button class="continue_btn activeBtn">
            Continue
        </button>`,
    );
  }
}
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
function handleLogin(e) {
  e.preventDefault();
  let phone = $("#phone").val();
  location.href = "otp.html";
  let otp = generateOTP();
  localStorage.setItem("phone", phone);
  localStorage.setItem("otp", otp);
}

function handleOtpLogin(e) {
  e.preventDefault();
  const otpInputs = document.querySelectorAll(".otp_inputs input");
  let otp = localStorage.getItem("otp");
  let otpUser = "";
  otpInputs.forEach((item) => {
    otpUser = otpUser + item.value;
  });
  if (otp !== otpUser) {
    alert("something wents wrong ! on OTP");
  }
  let phone = localStorage.getItem("phone");

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "handleLoginOtp",
      phone,
    },
    success: function (response) {
      if (response.status == "success") {
        localStorage.setItem("userId", response?.userId);
        location.href = "home.html";
      } else {
        console.log(response.message);
      }
    },
  });
}

function getLoginData() {
  let phone = localStorage.getItem("phone");
  let otp = localStorage.getItem("otp");

  $("#phone").html(phone);
}
function getCategory() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCategory",
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response.data);
        let categories = response.data;
        let categoryHtml = "";

        localStorage.setItem("currentCategoryId", categories[0]?.id);
        getArivalsData();
        getBestSellingCategory();

        categories.forEach((item, index) => {
          categoryHtml += `
            <button 
                class="category_btn  ${index === 0 ? "active" : ""}"
                data-category="${item.name}"
                data-categoryId="${item.id}"
            >
                <div class="category_img">
                    <img src="${imgUrl + item.image_path}" alt="">
                </div>
                <div class="category_name">${item.name}</div>
            </button>
            `;
        });
        $("#category").append(categoryHtml);
        setTimeout(() => {
          moveIndicator($(".category_btn.active"));
        }, 100);
      } else {
        alert(response.message);
        console.log(response.data);
      }
    },
  });
}

function getTopLeftBanner() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getTopLeftBanner",
    },
    success: function (response) {
      if (response.status === "success") {
        let carouselItems = "";

        response.data.forEach((item, index) => {
          carouselItems += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${imgUrl + item.img_path}" class="d-block w-100" alt="Banner">
        </div>
      `;
        });

        const bannerHTML = `
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${carouselItems}
        </div>
      </div>
    `;

        $("#topLeftBanner").html(bannerHTML);
      } else {
        alert(response.message);
      }
    },
  });
}
function getTopRightBanner() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getTopRightBanner",
    },
    success: function (response) {
      if (response.status === "success") {
        let bannerRightHtml = "";

        let bannerData = response.data;
        console.log(bannerData);
        bannerData.map((item) => {
          bannerRightHtml += `<img src="${imgUrl + item.img_path}" />`;
        });

        $("#bannerRight").html(bannerRightHtml);
      } else {
        alert(response.message);
      }
    },
  });
}
function getArivalsData() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getArrivalsData",
      categoryId: categoryId,
    },
    success: function (response) {
      if (response.status == "success") {
        let prdData = response.data;
        let prdHtml = "";
        prdData.map((item, index) => {
          prdHtml += `<div class="new_arrivals_item">
              <img src="${imgUrl + item.image_path}" alt="">
            </div>`;
        });

        $("#newArrival").html(prdHtml);
      }
    },
  });
}
function getBestSellingCategory() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getBestSellingCategory",
      categoryId: categoryId,
    },
    success: function (response) {
      if (response.status == "success") {
        let prdData = response.data;
        console.log(prdData);
        let prdHtml = "";
        prdData.map((item, index) => {
          prdHtml += ` <div class="category_item">
        <div class="category_top">
          <div class="category_top_sub_item">

            ${
              item.image1
                ? `
            <div class="sub_item">
              <img src="${imgUrl + item.image1}" alt="">
            </div>`
                : ` <div class="sub_item">
              <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="">
            </div>`
            }

            ${
              item.image2
                ? `
            <div class="sub_item">
              <img src="${imgUrl + item.image2}" alt="">
            </div>`
                : ` <div class="sub_item">
              <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="">
            </div>`
            }

            ${
              item.image3
                ? `
            <div class="sub_item">
              <img src="${imgUrl + item.image3}" alt="">
            </div>`
                : ` <div class="sub_item">
              <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="">
            </div>`
            }

            ${
              item.image4
                ? `
            <div class="sub_item">
              <img src="${imgUrl + item.image4}" alt="">
            </div>`
                : ` <div class="sub_item">
              <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" alt="">
            </div>`
            }

            <p>+${Math.max(0, item.total_products - 4)} more</p>

          </div>
        </div>

        <div class="category_bottom">
          <p>${item.subcategory_name}</p>
        </div>
      </div>`;
        });
        $("#categoryContainer").html(prdHtml);
      }
    },
  });
}

// function getProduct1(){
// $.ajax({
//    url:apiUrl,
//    method:"POST",
//    dataType:"JSON",
//    data:{
//    type:"getProducts",
//    categoryId
//    },
//    success: function (response) {
//        if(response.status == "success"){
//            console.log(response.data);

//        }else{
//        console.log(response.message);
//        }
//    }
// })
// }

function getSubCategories() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getSubCategories",
      categoryId,
    },
    success: function (response) {
      if (response.status == "success") {
        let subCat2 = response.data.title2;
        let subCat3 = response.data.title3;
        let subCat4 = response.data.title4;

        let subCatHtml2 = "";
        let subCatHtml3 = "";
        let subCatHtml4 = "";

        subCat2.map((item) => {
          subCatHtml2 += ` <div class="cateogy_box">
        <div class="category_img_box_design">
          <img src="${imgUrl + item.image_path}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>`;
        });

        subCat3.map((item) => {
          subCatHtml3 += ` <div class="cateogy_box">
        <div class="category_img_box_design">
          <img src="${imgUrl + item.image_path}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>`;
        });

        subCat4.map((item) => {
          subCatHtml4 += ` <div class="cateogy_box">
        <div class="category_img_box_design">
          <img src="${imgUrl + item.image_path}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>`;
        });

        $("#categoryBox1").html(subCatHtml2);
        $("#categoryBox2").html(subCatHtml3);
        $("#categoryBox3").html(subCatHtml4);
      } else {
        console.log(response.message);
      }
    },
  });
}

const products = {};
const varientAllData = [];
const varientData = {};
function getProducts() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getProducts",
      categoryId,
    },

    success: function (response) {
      if (response.status === "success") {
        $("#productWrap1").html(renderProducts(response.data.title1));

        $("#productWrap2").html(renderProducts(response.data.title2));

        $("#productWrap3").html(renderProducts(response.data.title3));

        $("#productWrap4").html(renderProducts(response.data.title4));
      } else {
        console.log("something went wrong on getProducts");
      }
    },
  });
}
function renderProducts(productList) {
  let html = "";

  productList.forEach((item, index) => {
    products[item.p_id] = item;

    html += `
      <div class="product_design_item_wrap">

        <div class="product_top_wrap">

          <div class="product_img" onclick="location.href='productDetail.html?id=${item.p_id}'">
            <img src="${imgUrl + item.image_path}" alt="">
          </div>

          <div class="like ${
            index == 0 || index == 3 || index == 4 ? "like_active" : ""
          }">
            <i class="ti ti-heart-filled"></i>
          </div>

          ${
            item.isvarient === "false"
              ? `
                <div class="AddWrp" id="AddBtnToggle${item.p_id}">
                  <button onclick="toggleAdd('${item.p_id}','','prd')">
                    Add
                  </button>
                </div>
              `
              : `
                <div
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasVarient"
                  aria-controls="offcanvasVarient"
                  class="cart_tag_Add varient"
                  onclick="getSingleVarientId('${item.p_id}','${item.image_path}','${item.name}')">
                  Add

                  <div class="varient_btn">
                    ${item.varient_count} option
                  </div>

                </div>
              `
          }

        </div>

        <div class="product_txt">

          <h5>${item.name}</h5>

          <div class="rating_wrap">

            <div class="stars">
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
            </div>

            <div class="rate">
              (${item.review_val})
            </div>

          </div>

          <div class="qty_price_sec">

            <h4>${item.quantity}${item.unit}</h4>

            <div class="price_sec">
              <h6>₹${item.selling_price}</h6>
              <del>₹${item.mrp}</del>
            </div>

          </div>

        </div>

      </div>
    `;
  });

  return html;
}
function getSingleVarientId(id, image, name) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getSingleVarientId",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response.data);
        let varientArr = response.data;
        let varientHtml = "";
        varientArr.map((item) => {
          varientData[item.vid] = item;
          varientHtml += ` <div class="varient_data_item">
              <div class="varient_data_img">
                <img src="${imgUrl + image}" alt="" />
              </div>
              <div class="varient_txt">
                <div class="txt_left_varient">
                  <h6>${name}</h6>
                  <div class="price_varient">
                    <p>${item.v_seliing_price}</p>
                    <del>${item.v_mrp}</del>
                  </div>
                </div>
                <b>${item.v_quantity}${item.v_unit}</b>
           
                <div id="AddVarientBtn${item.vid}">
                 <button class="Addbutton"  onclick="toggleAdd('${id}','${item.vid}','varId')">Add to cart</button>
               </div> 
             </div>
            </div>`;
        });
        $("#varientData").html(varientHtml);
      } else {
        console.log(response.message);
      }
    },
  });
}

function toggleAdd(id, varId, type) {
  if (type == "prd") {
    let data = $(`#AddBtnToggle${id}`).html();
    console.log(data);
    $(`#AddBtnToggle${id}`).html(`<div class="add_varient_data">
      <button
        id="minus${id}"
        onclick="handleDecrement('${id}')">
        -
      </button>

      <input
        type="number"
        id="quantity${id}"
        value="0"
        readonly
      />

      <button
        id="plus${id}"
        onclick="handleIncrement('${id}')">
        +
      </button>

     </div>
  `);
    handleIncrement(id, varId);
  } else if (type == "varId") {
    let data = $(`#AddVarientBtn${varId}`).html();
    console.log(data);
    $(`#AddVarientBtn${varId}`).html(`<div class="add_varient_btn">
                  <button  id="minusVar${varId}"
        onclick="handleDecrement('${id}','${varId}')">-</button>
                  <input type="number"  id="quantityVar${varId}"
        value="0"
        readonly />
                  <button  id="plusVar${varId}"
        onclick="handleIncrement('${id}','${varId}')">+</button>
                </div>
  `);
    handleIncrement(id, varId);
  }
}
function getAllVarient() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getAllVarient",
    },
    success: function (response) {
      if (response.status == "success") {
        varientAllData.push(response.data);
      } else {
        console.log(response.message);
      }
    },
  });
}

function handleIncrement(id, varId, type) {
  const prdData = products[id];
  let varData;
  if (type == "cart") {
    varData = varientAllData.filter((item) => item.vid == varId);
  } else {
    varData = varientData[varId];
  }

  let qty;
  if (!varId) {
    qty = parseInt($(`#quantity${id}`).val()) || 0;

    if (qty >= prdData.stock) {
      alert("out of stock");

      $(`#quantity${id}`).val(prdData.stock);
      $(`#plus${id}`).addClass("disabled");
      return false;
    }
    qty++;
    updateCartLocal(prdData, "", qty);

    $(`#quantity${id}`).val(qty);
  } else {
    qty = parseInt($(`#quantityVar${varId}`).val()) || 0;

    if (qty >= varData.v_stock) {
      alert("out of stock");

      $(`#quantityVar${varId}`).val(varData.stock);
      $(`#plusVar${varId}`).addClass("disabled");
      return false;
    }
    qty++;
    updateCartLocal(prdData, varId, qty);

    $(`#quantityVar${varId}`).val(qty);
  }

  const formData = {
    type: "handleIncrement",
    user_id: userId,
    idfr: "",
    p_id: prdData.p_id,
    vid: varId || "",
    name: prdData.name,
    image_path: prdData.image_path,
    quantity: prdData.quantity,
    unit: prdData.unit,
    nop: qty,
    purchase_price: prdData.purchase_price,
    selling_price: prdData.selling_price,
    mrp: prdData.mrp,
    isvarient: prdData.isvarient,
    product_type: "product",
    status: "true",
  };
  // let price = Number(prdData.selling_price * qty);
  // console.log(price, prdData.selling_price, qty);
  // calculationFnc(price);
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: formData,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
        if (type == "cart") {
          calculationFnc();
        }
      } else {
        console.log(response.message);
      }
    },
  });
}

function handleDecrement(id, varId, type) {
  console.log(id, varId);
  const prdData = products[id];
  let qty;
  if (!varId) {
    qty = parseInt($(`#quantity${id}`).val()) || 1;

    qty--;

    if (qty <= 0) {
      removeCartLocal(id, varId);
    } else {
      updateCartLocal(prdData, varId, qty);
    }
    $(`#plus${id}`).removeClass("disabled");

    if (qty <= 0) {
      $(`#AddBtnToggle${id}`).html(`
      <button onclick="toggleAdd('${id}')">
        Add
      </button>
    `);
    } else {
      $(`#quantity${id}`).val(qty);
    }
  } else {
    qty = parseInt($(`#quantityVar${varId}`).val());

    qty--;

    if (qty <= 0) {
      removeCartLocal(id, varId);
    } else {
      updateCartLocal(prdData, varId, qty);
    }
    $(`#plusVar${varId}`).removeClass("disabled");

    if (qty <= 0) {
      $(`#AddVarientBtn${varId}`).html(`
      <button class="Addbutton"  onclick="toggleAdd('${id}','${varId}','varId')">Add to cart</button>
    `);
    } else {
      $(`#quantityVar${varId}`).val(qty);
    }
  }

  // price = Number(prdData.selling_price * qty);
  // console.log(price, prdData.selling_price, qty);
  // calculationFnc(price);

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "handleDecrement",
      user_id: userId,
      p_id: prdData.p_id,
      varId,
      nop: qty,
    },
    success: function (res) {
      console.log(res);
      console.log(qty);
      if (qty == 0) {
        getCart();
      }
      if (type == "cart") {
        calculationFnc();
      }
    },
  });
}

function getAllHeading() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getAllHeading",
      categoryId,
    },
    success: function (response) {
      if (response.status == "success") {
        // console.log(response.data);
        let categoryHead = response.data.categoryHeading[0];
        let productHead = response.data.productHeading[0];

        $("#categoryhead1").html(categoryHead.title1);
        $("#categoryhead2").html(categoryHead.title3);
        $("#categoryhead3").html(categoryHead.title2);

        $("#producthead1").html(productHead.title1);
        $("#producthead2").html(productHead.title2);
        $("#producthead3").html(productHead.title3);
        $("#producthead4").html(productHead.title4);
      } else {
        console.log("something wents wrong on getAllHeading ");
      }
    },
  });
}
getAllHeading();

function moveIndicator(btn) {
  const indicator = $(".category_indicator");
  const container = $(".category_icons");

  indicator.css({
    width: btn.outerWidth() * 0.7,
    left:
      btn.position().left + container.scrollLeft() + btn.outerWidth() * 0.15,
  });
}

function getSingleProduct() {
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getSingleProduct",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response.images);
        let product = response.product;
        let variants = response.variants;
        let images = response.images;

        $("#prdTxt").html(product.name);
        $("#prdQty").html(product.quantity + product.unit);
        $("#prdMrp").html("₹" + product.mrp);
        $("#prdSelling").html("₹" + product.selling_price);

        const mrp = Number(product.mrp);
        const sellingPrice = Number(product.selling_price);

        const discount = Math.round(((mrp - sellingPrice) / mrp) * 100);
        $("#prdDisc").html(discount + "% OFF");

        $("#footerPrice").html("₹" + sellingPrice);
        $("#footerQty").html(product.quantity + product.unit);
        $("#footerMrp").html("₹" + mrp);
        let varientHtml = "";
        variants.map((item, index) => {
          varientHtml += `<div class="select_varient_box ${index == 0 && "active_varient"}">
              <div class="top_select">5% OFF</div>
              <div class="bottom_select">
                <h4>${item.v_quantity + item.v_unit}</h4>
                <div class="bottom_tab">
                  <h5 id="varientSelling">₹${item.v_seliing_price}</h5>
                  <p>MRP <del>₹${item.v_mrp}</del></p>
                </div>
              </div>
            </div>`;
        });
        $("#varientData").html(varientHtml);

        let imageHtml = "";
        images.map((item) => {
          imageHtml += `
            <div class="item">
                <img src="${imgUrl + item?.image_path}" alt="">
            </div>`;
        });

        $("#productDetailCrousel").html(imageHtml);

        $(document).ready(function () {
          $(".owl-carousel4").owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            dots: true,
            autoplay: true,

            responsive: {
              0: {
                items: 1, // mobile (0px se start)
              },
              480: {
                items: 2, // small phones
              },
              768: {
                items: 3, // tablets
              },
              1024: {
                items: 4, // desktop
              },
            },
          });
        });
      } else {
        console.log(response.message);
      }
    },
  });
}
function updateCartLocal(product, varientId, qty) {
  console.log(product);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  console.log(cart);
  const existingIndex = varientId
    ? cart.findIndex(
        (item) => item.p_id == product.p_id && item.varientId == varientId,
      )
    : cart.findIndex((item) => item.p_id == product.p_id);
  if (existingIndex > -1) {
    cart[existingIndex].nop = qty;
  } else {
    console.log(product);
    cart.push({
      ...product,
      nop: qty,
      varientId,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  $("#cartPopup").show();
  $("#cartQty").html(cart.length);
}
function removeCartLocal(productId, varId) {
  console.log(productId, varId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!varId) {
    cart = cart.filter((item) => item.p_id != productId);
  } else {
    cart = cart.filter(
      (item) => !(item.p_id == productId && item.varientId == varId),
    );
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (cart.length <= 0) {
    $("#cartPopup").hide();
  }

  $("#cartQty").html(cart.length);
}
$(document).on("click", ".select_varient_box", function () {
  $(".select_varient_box").removeClass("active_varient");
  $(this).addClass("active_varient");

  const variantId = $(this).data("id");

  console.log("Selected Variant:", variantId);
});

$(document).on("click", ".category_btn", function () {
  $(".category_btn").removeClass("active");
  $(this).addClass("active");

  moveIndicator($(this));
  const category = $(this).data("category");

  const categoryId = $(this).data("categoryId");

  localStorage.setItem("currentCategoryId", categoryId);
  console.log(category);

  renderCategory(category);
});

function getCart() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCart",
      userId,
    },
    success: function (response) {
      if (response.status == "success") {
        // console.log(response.data);

        let cartData = response.data;
        calculationFnc();

        let cartDataHtml = "";
        cartData.map((item) => {
          cartDataHtml += `<div class="cart_data_items">
              <div class="cart_data_item_left">
                <div class="cart_item_img">
                  <img src="${imgUrl + item.image_path}" alt="" />
                </div>
                <div class="cart_item_txt">
                  <h4>
                    ${item.name}
                  </h4>
                  <small>${item.quantity}${item.unit}</small>
                  <span>
                    <p>₹${item.selling_price}</p>
                    <del>₹${item.mrp}</del>
                  </span>
                </div>
              </div>
              ${
                !item.vid
                  ? `<div class="cart_data_item_btn">
                    <button
                      id="minus${item.p_id}"
                      onclick="handleDecrement('${item.p_id}','','cart')">
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity${item.p_id}"
                      value="${item.nop}"
                      readonly
                    />

                    <button
                      id="plus${item.p_id}"
                      onclick="handleIncrement('${item.p_id}','','cart')">
                      +
                    </button>

                  </div>`
                  : ` <div class="cart_data_item_btn">
                  <button  id="minusVar${item.vid}"
                  onclick="handleDecrement('${item.p_id}','${item.vid}','cart')">-</button>
                  <input type="number"  id="quantityVar${item.vid}"
                  value="${item.nop}"
                  readonly />
                  <button  id="plusVar${item.vid}"
                  onclick="handleIncrement('${item.p_id}','${item.vid}','cart')">+</button>
                </div> `
              }</div>
             `;
        });

        $("#cartData").html(cartDataHtml);
      } else {
        console.log(response.message);
        $("#cartData").html("");
        $("#cartWrap").html("no data found !");
      }
    },
  });
}

let couponsData = [];

// ======================
// GET COUPONS
// ======================
function getCoupons() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCoupons",
    },
    success: function (response) {
      if (response.status !== "success") return;

      couponsData = response.data;
      renderCoupons(couponsData);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

function expiredCoupon() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "usedCoupons",
    },
    success: function (response) {
      if (response.status !== "success") return;

      let coupons = response.data;
      let html = "";
      coupons.forEach((coupon) => {
        html += `
        <div class="coupon-card">
            <img src="../assets/img/icon/couponsBox.svg" alt="coupon bg" class="coupon-bg">

            <div class="coupon-header">
                <h3>${coupon.code}</h3>
                <div>Valid Until ${coupon.end_date.split(" ")[0]}</div>
            </div>

            <div class="coupon-body">
                <div class="coupon-info">
                    <div class="coupon-title">
                        <i class="bi bi-gift-fill"></i>
                        <h4>₹${coupon.amount} OFF</h4>
                    </div>
                    <p>Min Order ₹${coupon.minimum_purchase}</p>
                </div>

                <button
                    class="coupon_btn apply-btn disabled"
                    id="${coupon.code}"
                    onclick="applyCoupon('${coupon.code}')"
                >
                    Expired
                </button>
            </div>
        </div>
        `;
      });
      $("#couponsData2").html(html);
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

// ======================
// RENDER COUPONS
// ======================
function renderCoupons(coupons) {
  let html = "";

  coupons.forEach((coupon) => {
    html += `
<div class="coupon-card">
    <img src="../assets/img/icon/couponsBox.svg" alt="coupon bg" class="coupon-bg">

    <div class="coupon-header">
        <h3>${coupon.code}</h3>
        <div>Valid Until ${coupon.end_date.split(" ")[0]}</div>
    </div>

    <div class="coupon-body">
        <div class="coupon-info">
            <div class="coupon-title">
                <i class="bi bi-gift-fill"></i>
                <h4>₹${coupon.amount} OFF</h4>
            </div>
            <p>Min Order ₹${coupon.minimum_purchase}</p>
        </div>

        <button
            class="coupon_btn apply-btn "
            id="${coupon.code}"
            onclick="applyCoupon('${coupon.code}')"
        >
            Apply
        </button>
    </div>
</div>
`;
  });
  $("#couponsData1").html(html);
}

// ======================
// APPLY COUPON
// ======================
function applyCoupon(code) {
  const coupon = couponsData.find((item) => item.code === code);
  $("#couponId").val(coupon.id);
  let limit = Number(coupon.limit);
  limit--;
  $("#couponDiscount").html(`-₹${coupon.amount}`);
  calculationFnc();

  // console.log(coupon.amount)

  if (!coupon) {
    alert("Coupon not found");
    return;
  }

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "updateCoupon",
      id: coupon.id,
      limit,
    },
    success: function (response) {
      if (response.status == "success") {
      } else {
        console.log(response.message);
      }
    },
  });

  $(`#${code}`).text("Applied");
  $(`#${code}`).addClass("disabled");
  event.target.classList.add("active");
  bootstrap.Offcanvas.getOrCreateInstance(
    $("#offcanvasBottomCoupons")[0],
  ).hide();
}

function calculationFnc() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let other = JSON.parse(localStorage.getItem("other"));
  let totalMrp = 0;
  let totalSellingPrice = 0;
  let totalItems = 0;
  let handlingCharge = 0;
  let couponDisc =
    parseFloat(
      $("#couponDiscount")
        .text()
        .replace(/[^\d.]/g, ""),
    ) || 0;
  let deliveryCharge = 0;

  cart.map((item) => {
    const qty = Number(item.nop);
    const mrp = Number(item.mrp);
    const sellingPrice = Number(item.selling_price);

    totalMrp += mrp * qty;
    totalSellingPrice += sellingPrice * qty;
    totalItems += qty;
  });
  other.map((item) => {
    if (item.type == "handling_charge") {
      handlingCharge = Number(item.min_amount);
    }
  });
  let totalDiscount = totalMrp - totalSellingPrice;
  let totalAmt =
    totalSellingPrice + handlingCharge + deliveryCharge - couponDisc;
  console.log("couponDisc");
  console.log(couponDisc);

  $("#totalAmount").text(`₹${totalAmt}`);
  $("#grandTotal").text(`₹${totalAmt}`);
  $("#handlingCharge").text(`₹${handlingCharge}`);
  $("#totalMrp").text(`₹${totalMrp}`);
  $("#productDiscount").text(`-₹${totalDiscount}`);
  $("#savedAmt").text(`-₹${totalDiscount}`);
  $("#subTotal").text(`₹${totalSellingPrice}`);
}
function getAllOtherDetail() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getAllOtherDetail",
    },
    success: function (response) {
      if (response.status == "success") {
        // console.log(response.data);
        localStorage.setItem("other", JSON.stringify(response.data));
      } else {
        console.log(response.message);
      }
    },
  });
}

$(".form_icon").on("click", function () {
  $(".form_icon").removeClass("role_active");

  $(this).addClass("role_active");

  let role = $(this).find("p").text();
  $("#selectedRole").val(role);
});

function toggleAddressBtn() {
  $("#btnToggleAddress").html(`
    <button type="button" onclick="handleAddress(event)">
      Add Address
    </button>
  `);

  // Clear Form
  $("#addressId").val("");
  $("#houseNo").val("");
  $("#floor").val("");
  $("#area").val("");
  $("#city").val("");
  $("#state").val("");
  $("#pincode").val("");
  $("#name").val("");
  $("#number").val("");
  $("#selectedRole").val("");

  $("#offcanvasBottomAddressLabel").text("Add Address");
}

function handleAddress(e) {
  e.preventDefault();
  console.log($("#selectedRole").val());

  let latitude;
  let longitude;
  let formData = new FormData();

  formData.append("type", "handleAddress");
  formData.append("userId", userId);

  // Address Details
  formData.append("houseNo", $("#houseNo").val().trim());
  formData.append("floor", $("#floor").val().trim());
  formData.append("area", $("#area").val().trim());
  formData.append("city", $("#city").val().trim());
  formData.append("state", $("#state").val().trim());
  formData.append("pincode", $("#pincode").val().trim());

  // Receiver Details
  formData.append("name", $("#name").val().trim());
  formData.append("number", $("#number").val().trim());

  // Home / Work / Other
  formData.append("addressType", $("#selectedRole").val());

  // Location
  formData.append("latitude", latitude || "");
  formData.append("longitude", longitude || "");

  $.ajax({
    url: apiUrl,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "JSON",

    success: function (response) {
      if (response.status === "success") {
        alert(response.message);

        // Reset Form
        $("#addressId").val("");
        $("#houseNo").val("");
        $("#floor").val("");
        $("#area").val("");
        $("#city").val("");
        $("#state").val("");
        $("#pincode").val("");
        $("#name").val("");
        $("#number").val("");
        $("#selectedRole").val("");

        $("#offcanvasBottomAddressLabel").text("Add Address");

        getAddress();
      } else {
        alert(response.message);
      }
    },

    error: function (xhr, status, err) {
      console.log(xhr.responseText);
      alert("AJAX Error: " + err);
    },
  });
}
function getAddress() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getAddress",
      userId,
    },
    success: function (response) {
      if (response.status == "success") {
        // console.log(response);

        let addressHtml = "";

        getExistingData(response.data);
        let addressId = localStorage.getItem("addressId");
        $("#addressId").val(addressId);
        response.data.forEach((item, index) => {
          addressHtml += `
<div class="saved_address_data">

    <div class="selected_box">Selected</div>

    <div class="saved_address_item">

        <div
            class="saved_address_left"
            onclick="selectAddress(
                this,
                '${item.id}',
                '${item.o_username}',
                '${item.o_mobile}',
                '${item.street}',
                '${item.area}',
                '${item.pin_code}',
                '${item.type}',
                '${item.o_floor}'
            )"
        >

            <div class="saved_icon">
                <i class="ti ti-home"></i>
            </div>

            <div class="saved_txt">

                <h5>${item.o_username}</h5>

                <p>
                    ${item.street}
                    ${item.o_floor ? `, Floor: ${item.o_floor}` : ""},
                    ${item.area},
                    ${item.city},
                    ${item.state} - ${item.pin_code}
                </p>

                <div class="phone">
                    <i class="ti ti-phone-call"></i>
                    <p>+91-<b>${item.o_mobile}</b></p>
                </div>

            </div>

        </div>

        <div class="saved_address_right">

            <button
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottomAddAddress"
                aria-controls="offcanvasBottomAddAddress"
                class="address_action edit_btn"
                onclick='editAddress(${JSON.stringify(item)})'
            >
                <i class="ti ti-edit"></i>
            </button>

            <button
                class="address_action delete_btn"
                onclick="deleteAddress('${item.id}')"
            >
                <i class="ti ti-trash-filled"></i>
            </button>

        </div>

    </div>

</div>
`;
        });

        $("#savedAddress").html(addressHtml);
      } else {
        $("#savedAddress").html(`
                    <div class="not_found">
                        No saved address found
                    </div>
                `);
      }
    },
  });
}
function selectAddress(
  element,
  id,
  name,
  phone,
  street,
  area,
  pin_code,
  address_type,
  city,
  state,
  floor,
) {
  
  $("#addressId").val(id);
  localStorage.setItem("addressId", id);
  $("#selectedRole").val(address_type);
  $(".saved_address_data").removeClass("selected_address");
  $(element).closest(".saved_address_data").addClass("selected_address");

  $("#selectedAddress").html(`
      <h4>
        Delivering to
        <b>${address_type || "Home"}</b>
      </h4>

      <p>
        ${name},
        ${street}
        ${floor ? `, Floor: ${floor}` : ""},
        ${area},
        ${city},
        (${pin_code})
        Ph: ${phone}
      </p>
  `);
}

function getExistingData(data) {
  let AddressId = localStorage.getItem("addressId");
  let addressHolder = data.filter((item) => item.id === AddressId);
  let address = addressHolder[0];

  $("#selectedAddress").html(`
  <h4>
    Delivering to
    <b>${address.type || "Home"}</b>
  </h4>

  <p>
    ${address.o_username},
    ${address.street}
    ${address.o_floor ? `, Floor: ${address.o_floor}` : ""},
    ${address.area},
    ${address.city},
    (${address.pin_code})
    Ph: ${address.o_mobile}
  </p>
`);
}

function editAddress(data) {
  $("#addressId").val(data.id);

  $("#houseNo").val(data.street);
  $("#floor").val(data.o_floor);
  $("#area").val(data.area);

  $("#city").val(data.city);
  $("#state").val(data.state);
  $("#pincode").val(data.pin_code);

  $("#name").val(data.o_username);
  $("#number").val(data.o_mobile);

  // Hidden input
  $("#selectedRole").val(data.type);

  // Toggle Active Role
  $(".form_icon").removeClass("role_active");

  $(`.form_icon[data-role="${data.type}"]`).addClass("role_active");

  $("#btnToggleAddress").html(`
    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottomAddress" aria-controls="offcanvasBottomAddress" onclick="updateAddress(event)">
      Update Address
    </button>
  `);

  $("#offcanvasBottomAddressLabel").text("Update Address");
}

function updateAddress(e) {
  e.preventDefault();
  let latitude;
  let longitude;

  let formData = new FormData();

  formData.append("type", "updateAddress");
  formData.append("addressId", $("#addressId").val());
  formData.append("userId", userId);

  // Address
  formData.append("houseNo", $("#houseNo").val().trim());
  formData.append("floor", $("#floor").val().trim());
  formData.append("area", $("#area").val().trim());
  formData.append("city", $("#city").val().trim());
  formData.append("state", $("#state").val().trim());
  formData.append("pincode", $("#pincode").val().trim());

  // Receiver
  formData.append("name", $("#name").val().trim());
  formData.append("number", $("#number").val().trim());

  // Address Type
  formData.append("addressType", $("#selectedRole").val());

  // Location
  formData.append("latitude", latitude || "");
  formData.append("longitude", longitude || "");

  $.ajax({
    url: apiUrl,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "JSON",

    success: function (response) {
      if (response.status === "success") {
        // alert(response.message);

        getAddress();

        // Reset Form
        $("#addressId").val("");
        $("#houseNo").val("");
        $("#floor").val("");
        $("#area").val("");
        $("#city").val("");
        $("#state").val("");
        $("#pincode").val("");
        $("#name").val("");
        $("#number").val("");
        $("#selectedRole").val("");

        $("#btnToggleAddress").html(`
          <button type="button" onclick="handleAddress(event)">
            Add Address
          </button>
        `);

        $("#offcanvasBottomAddressLabel").text("Add Address");
      } else {
        alert(response.message);
      }
    },

    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    },
  });
}

function deleteAddress(id) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteAddress",
      addressId: id,
      userId: userId,
    },

    success: function (response) {
      if (response.status === "success") {
        alert(response.message);
        getAddress();
      } else {
        alert(response.message);
      }
    },

    error: function (xhr) {
      console.log(xhr.responseText);
    },
  });
}

$(".slot_option").on("click", function () {
  $(".slot_option").removeClass("selected_option");

  $(this).addClass("selected_option");

  let slotData = $(this).find(".left_slot_box h5").text();
  $("#slotTime").html(slotData);
  $("#slot").val(slotData);
});

$(".payment_option").on("click", function () {
  $(".payment_option").removeClass("selected_option");

  $(this).addClass("selected_option");

  let payMethod = $(this).find(".left_pay_box h5").text();
  $("#payMethod1").val(payMethod);
  $("#payMethod2").html(payMethod);
});

function openOffcanvas(id) {
  const offcanvas = new bootstrap.Offcanvas(document.getElementById(id));
  offcanvas.show();
}

function handleOrder() {
  //userId
  let selectedPayment = $("#payMethod1").val();
  let selectedSlot = $("#slot").val();
  let selectedAddress = $("#addressId").val();
  let couponId = $("#couponId").val();
  let addressType = $("#selectedRole").val();
  alert(addressType)
  let totalAmount =  parseFloat(
      $("#totalAmount")    
        .text()
        .replace(/[^\d.]/g, ""),
    );

  if (!selectedAddress) {
    openOffcanvas("offcanvasBottomAddress");
  } else if (!selectedSlot) {
    openOffcanvas("offcanvasBottomDeliverySlot");
  } else if (!selectedPayment) {
    openOffcanvas("offcanvasBottomPay");
  }

  let couponDisc =
    parseFloat(
      $("#couponDiscount")
        .text()
        .replace(/[^\d.]/g, ""),
    ) || 0;
  let handlingCharge =
    parseFloat(
      $("#handlingCharge")    
        .text()
        .replace(/[^\d.]/g, ""),
    ) || 0;
  let deliveryCharge = 0;
  let formData = new FormData();

  formData.append("type", "handleOrder");
  formData.append("user_id", userId);
  formData.append("payMethod", selectedPayment);
  formData.append("selectAddress", selectedAddress);
  formData.append("orderType", addressType);
  formData.append("selectedSlot", selectedSlot);
  formData.append("couponId", couponId);
  formData.append("totalAmount", totalAmount);
  formData.append("couponAmt", couponDisc);
  formData.append("handlingCharge", handlingCharge);

  

  $.ajax({
    url: apiUrl,
    method: "POST",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "json",
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
localStorage.setItem('cart', JSON.stringify([]));
        location.href="orders.html";
      } else {
        console.log(response.message);
      }
    },
  });
}

















// function getbanner() {
//   const bannerData = [
//     "../assets/img/bg/homeBanner1.svg",
//     "../assets/img/bg/homeBanner1.svg",
//     "../assets/img/bg/homeBanner1.svg",
//     "../assets/img/bg/homeBanner1.svg",
//   ];
//   let crouselHtml = "";
//   bannerData.map((item) => {
//     crouselHtml += `<div class="banner_left item">
//               <img src="${item}" alt="" />
//             </div>`;
//   });

//   $("#crouselBanner").html(crouselHtml);
//   let data = $("#crouselBanner");
//   console.log(data);
// }
getProducts();
function initGrocery() {
  getCategory();
  getTopLeftBanner();
  getTopRightBanner();
  getSubCategories();

  // getProductDesign1();
  // getCategories();
  // getCategories2();

  // getProductDesign2();
  // handleCrousel();
  // getStoresDesignPrd();
  // getProductDesignWrap1();
  // getcategoryDesign();
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
  getBannerElectric();
}
function initPharmacy() {
  getBannerPharmacy();
  getProductPharmacy();
  getbrandPharmacy();
  getCategoryPharmacy();
}
function init99Store() {
  getCategory99store1();
  getCategory99Store2();
  getBanner99Store();
  getProduct99store();
}
function initKids() {
  getProductKids();
  getBannerKids();
  getCategoryKids();
  getcategoryDesignKids();
}

function getProductDesign1() {
  let productDesign1Html = "";
  [0, 1, 2, 3, 4, 5, 6].map((item) => {
    productDesign1Html += ` <div class="product_data_item">
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
  });

  $("#productDesign1").html(productDesign1Html);
}

function getCategories() {
  const categories = [
    {
      name: "Dairy, Bread & Eggs",
      images: [
        "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        "https://images.unsplash.com/photo-1563636619-e9143da7973b",
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f",
      ],
      more: 240,
    },
    {
      name: "Fruits & Vegetables",
      images: [
        "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
        "https://images.unsplash.com/photo-1519996529931-28324d5a630e",
        "https://images.unsplash.com/photo-1574226516831-e1dff420e37f",
      ],
      more: 320,
    },
    {
      name: "Snacks & Beverages",
      images: [
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13",
        "https://images.unsplash.com/photo-1544145945-f90425340c7e",
        "https://images.unsplash.com/photo-1551024709-8f23befc6cf7",
      ],
      more: 180,
    },
    {
      name: "Atta, Rice & Dal",
      images: [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1515543904379-3d757afe72e4",
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26",
        "https://images.unsplash.com/photo-1615485500704-8e990f9900f7",
      ],
      more: 150,
    },
    {
      name: "Personal Care",
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
      ],
      more: 110,
    },
    {
      name: "Cleaning Essentials",
      images: [
        "https://images.unsplash.com/photo-1583947582886-f40ec95dd752",
        "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1",
        "https://images.unsplash.com/photo-1610552050890-fe99536c2614",
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
      ],
      more: 95,
    },
  ];

  let html = "";

  categories.forEach((category) => {
    html += `
      <div class="category_item">

        <div class="category_top">
          <div class="category_top_sub_item">

            ${category.images
              .map(
                (img) => `
              <div class="sub_item">
                <img src="${img}" alt="">
              </div>
            `,
              )
              .join("")}

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
function getCategories2() {
  const groceryCategories = [
    {
      name: "Fruits",
      img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300",
    },
    {
      name: "Vegetables",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
    },
    {
      name: "Dairy",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300",
    },
    {
      name: "Bakery",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
    },
    {
      name: "Beverages",
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300",
    },
    {
      name: "Snacks",
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300",
    },
    {
      name: "Rice & Dal",
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    },
    {
      name: "Personal Care",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
    },
  ];

  let html = "";

  groceryCategories.forEach((item) => {
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

function getProductDesign2() {
  let productHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    productHtml += `  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
             <div class="like ${item == 0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
                ${item == 2 || item == 4 || item == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
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
  });

  $("#productWrap1").html(productHtml);
  $("#productWrap2").html(productHtml);
  $("#productWrap3").html(productHtml);
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
      bannerImg:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      title: "Fresh Vegetables",
    },
    {
      id: 2,
      bannerImg:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
      title: "Daily Grocery Deals",
    },
    {
      id: 3,
      bannerImg:
        "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",
      title: "Organic Fruits",
    },
    {
      id: 4,
      bannerImg:
        "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&q=80",
      title: "Healthy Essentials",
    },
    {
      id: 5,
      bannerImg:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80",
      title: "Weekend Offers",
    },
  ];
  let crouseHtml = "";

  bannerData.map((item) => {
    crouseHtml += ` <div class="banner_slide item">
    <img src="${item.bannerImg}" alt="${item.title}">
  </div>`;
  });
  $("#carousel1").html(crouseHtml);
  $("#carousel2").html(crouseHtml);
  $("#carousel3").html(crouseHtml);
}
function handleCrouselFashion() {
  const bannerData = [
    {
      id: 1,
      bannerImg:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
      title: "Fresh Vegetables",
    },
    {
      id: 2,
      bannerImg:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
      title: "Daily Grocery Deals",
    },
    {
      id: 3,
      bannerImg:
        "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",
      title: "Organic Fruits",
    },
    {
      id: 4,
      bannerImg:
        "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&q=80",
      title: "Healthy Essentials",
    },
    {
      id: 5,
      bannerImg:
        "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=1200&q=80",
      title: "Weekend Offers",
    },
  ];
  let crouseFashionHtml1 = "";
  let crouseFashionHtml2 = "";

  bannerData.map((item) => {
    crouseFashionHtml1 += ` <div class="fashion_banner">
    <img src="../assets/img/fashionbanner1.png" alt="${item.title}">
  </div>`;
    crouseFashionHtml2 += ` <div class="green_banner_img">
              <img src="../assets/img/green_banner.svg" alt="" />
            </div>`;
  });

  $("#carousel4").html(crouseFashionHtml1);
  $("#carousel5").html(crouseFashionHtml2);
}

function getStoresDesignPrd() {
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
  let categoryPrdHtml = "";
  productData.map((item) => {
    categoryPrdHtml += ` <div class="category_store_item" onclick="location.href='category.html'">
            <div class="category_store_image">
              <img src="${item.image}" alt="">
            </div>
            <p>${item.name}</p>
          </div>`;
  });

  $("#categoryPrd").html(categoryPrdHtml);
}

function getProductDesignWrap1() {
  let productHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    productHtml += `  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
  <div class="like ${item == 0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item == 2 || item == 4 || item == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
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
  });

  $("#productWrapsec1").html(productHtml);
  $("#productWrapsec2").html(productHtml);
  $("#productWrapsec3").html(productHtml);
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
      more: 150,
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
    },
  ];

  let categoryHtml = "";
  categories.map((item) => {
    categoryHtml += `    <div class="data_design_sec_item">
              <h5>${item.name}</h5>
              <div class="data_design_img_wrap">
               ${item?.images
                 .map(
                   (img) => `
              <div class="design_img">
                  <img src="${img}" alt="">
                </div>
            `,
                 )
                 .join("")}
                
                
              </div>
            </div>`;
  });

  $("#categoryDesign").html(categoryHtml);
}

function getCategoryStore() {
  const categoryData = [
    {
      name: "facewash",
      img: "../assets/img/category1.svg",
    },
    {
      name: "handwash",
      img: "../assets/img/category2.svg",
    },
    {
      name: "Shampoo",
      img: "../assets/img/category3.svg",
    },
    {
      name: "Bodywash",
      img: "../assets/img/category4.svg",
    },
    {
      name: "Perfume",
      img: "../assets/img/category1.svg",
    },
    {
      name: "Hair oil",
      img: "../assets/img/category3.svg",
    },
    {
      name: "handwash",
      img: "../assets/img/category2.svg",
    },
    {
      name: "Shampoo",
      img: "../assets/img/category4.svg",
    },
  ];
  let categoryHtml = "";
  categoryData.map((item) => {
    categoryHtml += `<div class="category_store_item" onclick="location.href='category.html'">
                <h4>${item.name}</h4>
                <img src="${item.img}" alt="">
              </div>`;
  });

  $("#categoryStore").html(categoryHtml);
}

function getArrowCategory() {
  let categoryArrowHtml = "";
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

  arrowDesign.map((img) => {
    categoryArrowHtml += `   <div class="category_beauty_arrow_item">
                <img src="${img}" alt="">
              </div>`;
  });

  $("#categoryArrowDesign").html(categoryArrowHtml);
}

function getBrandsProduct() {
  let brandPrdHtml = "";
  const brandData = [
    {
      id: 1,
      name: "Clothes",
      img: "../assets/img/fashionbox1.png",
    },
    {
      id: 2,
      name: "Shoes",
      img: "../assets/img/fashionbox2.png",
    },
    {
      id: 3,
      name: "Watches",
      img: "../assets/img/fashionbox3.png",
    },
    {
      id: 4,
      name: "Bags",
      img: "../assets/img/fashionbox4.png",
    },
    {
      id: 5,
      name: "Jewellery",
      img: "../assets/img/fashionbox5.png",
    },
    {
      id: 6,
      name: "Sunglasses",
      img: "../assets/img/fashionbox6.png",
    },
    {
      id: 7,
      name: "Perfumes",
      img: "../assets/img/fashionbox7.png",
    },
    {
      id: 8,
      name: "Ethnic Wear",
      img: "../assets/img/fashionbox8.png",
    },
    {
      id: 9,
      name: "T-Shirts",
      img: "../assets/img/fashionbox9.png",
    },
    {
      id: 10,
      name: "Jeans",
      img: "../assets/img/fashionbox10.png",
    },
    {
      id: 11,
      name: "Jackets",
      img: "../assets/img/fashionbox11.png",
    },
    {
      id: 12,
      name: "Sportswear",
      img: "../assets/img/fashionbox12.png",
    },
    {
      id: 13,
      name: "Formal Wear",
      img: "../assets/img/fashionbox13.png",
    },
    {
      id: 14,
      name: "Kids Fashion",
      img: "../assets/img/fashionbox14.png",
    },
    {
      id: 15,
      name: "Accessories",
      img: "../assets/img/fashionbox15.png",
    },
    {
      id: 16,
      name: "Footwear",
      img: "../assets/img/fashionbox16.png",
    },
  ];

  brandData.map((item) => {
    brandPrdHtml += ` <div class="fashion_brand_img">
                <img src="${item.img}" alt="">
              <h4>${item.name}</h4> 
            </div>`;
  });
  $("#brandsProduct").html(brandPrdHtml);
}

function getlastFashion() {
  let lastPrdHtml = "";
  const lastData = [
    {
      id: 1,
      name: "Clothes",
      img: "../assets/img/fashionbox1.png",
    },
    {
      id: 2,
      name: "Shoes",
      img: "../assets/img/fashionbox2.png",
    },
    {
      id: 3,
      name: "Watches",
      img: "../assets/img/fashionbox3.png",
    },
    {
      id: 4,
      name: "Bags",
      img: "../assets/img/fashionbox4.png",
    },
    {
      id: 5,
      name: "Jewellery",
      img: "../assets/img/fashionbox5.png",
    },
    {
      id: 6,
      name: "Sunglasses",
      img: "../assets/img/fashionbox6.png",
    },
    {
      id: 7,
      name: "Perfumes",
      img: "../assets/img/fashionbox7.png",
    },
    {
      id: 8,
      name: "Ethnic Wear",
      img: "../assets/img/fashionbox8.png",
    },
    {
      id: 9,
      name: "T-Shirts",
      img: "../assets/img/fashionbox9.png",
    },
    {
      id: 10,
      name: "Jeans",
      img: "../assets/img/fashionbox10.png",
    },
    {
      id: 11,
      name: "Jackets",
      img: "../assets/img/fashionbox11.png",
    },
    {
      id: 12,
      name: "Sportswear",
      img: "../assets/img/fashionbox12.png",
    },
    {
      id: 13,
      name: "Formal Wear",
      img: "../assets/img/fashionbox13.png",
    },
    {
      id: 14,
      name: "Kids Fashion",
      img: "../assets/img/fashionbox14.png",
    },
    {
      id: 15,
      name: "Accessories",
      img: "../assets/img/fashionbox15.png",
    },
    {
      id: 16,
      name: "Footwear",
      img: "../assets/img/fashionbox16.png",
    },
  ];
  let i = 0;
  lastData.map((item) => {
    i++;
    lastPrdHtml += `   <div class="last_fashion_item">
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
  let productHtml = "";
  [1, 2, 3, 4, 5, 6].map((item) => {
    productHtml += `    <div class="product_fashion_schema" >
          <div class="product_top">
          
            <div class="product_img_fashion" onclick='location.href='productDetail.html'">
             
              <img src="../assets/img/fashionbox${item}.png" alt="">
            </div>
            <button  data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" >Add</button>
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
    },
  ];
  let productDesign1Html = "";
  electronicProducts.map((item) => {
    productDesign1Html += ` <div class="product_design_item_wrap" >
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="${item.img}" alt="">
            </div>
  <div class="like ${item.id == 0 || item.id == 3 || item.id == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item.id == 2 || item.id == 4 || item.id == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
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
  });

  $("#productElectric1").html(productDesign1Html);
  $("#productElectric2").html(productDesign1Html);
  $("#productElectric3").html(productDesign1Html);
  $("#productElectric4").html(productDesign1Html);
  $("#productElectric5").html(productDesign1Html);
}

function getCategoryElectric() {
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

  electronicProducts.forEach((item) => {
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
  $("#categoryElectric2").html(html);
}

function getBannerElectric() {
  let bannerHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    bannerHtml += `<div class=" item">
    <img src="../assets/img/electricBanner1.png" alt="">
  </div>`;
  });

  $("#carousel6").html(bannerHtml);
  $("#carousel7").html(bannerHtml);
}

function getBannerPharmacy() {
  let bannerHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    bannerHtml += `<div class="pharmacy_crausel_img">
            <img src="../assets/img/pharmacy_middle_banner.svg" alt="">
          </div>`;
  });

  $("#carousel8").html(bannerHtml);
  $("#carousel9").html(bannerHtml);
  $("#carousel10").html(bannerHtml);
}

function getProductPharmacy() {
  const pharmacyProducts = [
    {
      id: 1,
      discount: "13% Off",
      name: "Crocin Pain Relief Tablet",
      qty: "15 Tablets",
      price: 78.3,
      oldPrice: 90,
      img: "https://images.apollo247.in/pub/media/catalog/product/c/r/cro0008.jpg",
    },
    {
      id: 2,
      discount: "10% Off",
      name: "Dolo 650 Tablet",
      qty: "15 Tablets",
      price: 32.4,
      oldPrice: 36,
      img: "https://images.apollo247.in/pub/media/catalog/product/d/o/dol0001.jpg",
    },
    {
      id: 3,
      discount: "15% Off",
      name: "Benadryl Cough Syrup",
      qty: "100 ml",
      price: 115,
      oldPrice: 135,
      img: "https://images.apollo247.in/pub/media/catalog/product/b/e/ben0001.jpg",
    },
    {
      id: 4,
      discount: "12% Off",
      name: "Volini Pain Relief Spray",
      qty: "100 gm",
      price: 210,
      oldPrice: 240,
      img: "https://images.apollo247.in/pub/media/catalog/product/v/o/vol0002.jpg",
    },
    {
      id: 5,
      discount: "8% Off",
      name: "Dettol Antiseptic Liquid",
      qty: "250 ml",
      price: 118,
      oldPrice: 128,
      img: "https://images.apollo247.in/pub/media/catalog/product/d/e/det0010.jpg",
    },
    {
      id: 6,
      discount: "18% Off",
      name: "Stayfree Secure XL",
      qty: "18 Units",
      price: 145,
      oldPrice: 177,
      img: "https://images.apollo247.in/pub/media/catalog/product/s/t/sta0024.jpg",
    },
    {
      id: 7,
      discount: "20% Off",
      name: "Digene Antacid Tablets",
      qty: "15 Tablets",
      price: 28,
      oldPrice: 35,
      img: "https://images.apollo247.in/pub/media/catalog/product/d/i/dig0003.jpg",
    },
    {
      id: 8,
      discount: "14% Off",
      name: "Vicks VapoRub",
      qty: "50 ml",
      price: 155,
      oldPrice: 180,
      img: "https://images.apollo247.in/pub/media/catalog/product/v/i/vic0005.jpg",
    },
    {
      id: 9,
      discount: "11% Off",
      name: "ORS Electrolyte Powder",
      qty: "21 gm",
      price: 22,
      oldPrice: 25,
      img: "https://images.apollo247.in/pub/media/catalog/product/o/r/ors0001.jpg",
    },
  ];
  let productDesign1Html = "";
  pharmacyProducts.map((item) => {
    productDesign1Html += ` <div class="pharmacy_product_item">
      <div class="pharmacy_product_img">
        <img src="${item.img}" alt="${item.name}">
        <div class="disc_pharmacy">${item.discount}</div>
  <div class="like ${item.id == 0 || item.id == 3 || item.id == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item.id == 2 || item.id == 4 || item.id == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
                 </div>

      <div class="pharmacy_product_bottom">
        <h6>${item.name}</h6>
        <p>${item.quantity}</p>

        <div class="price_pharmacy">
          <h6>₹${item.price}</h6>
          <del>₹${item.oldPrice}</del>
        </div>
      </div>
    </div>`;
  });

  $("#pharmacyProduct1").html(productDesign1Html);
  $("#pharmacyProduct2").html(productDesign1Html);
  $("#pharmacyProduct3").html(productDesign1Html);
  $("#pharmacyProduct4").html(productDesign1Html);
  $("#pharmacyProduct5").html(productDesign1Html);
  $("#pharmacyProduct6").html(productDesign1Html);
}

function getbrandPharmacy() {
  let brandsHtml = "";
  [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
    brandsHtml += `  <div class="brand_pharmacy">
              <img src="../assets/img/brands/pbr${item}.png" alt="">
            </div>`;
  });
  $("#brandsPharmacy").html(brandsHtml);
}
function getCategoryPharmacy() {
  let categoryHtml = "";
  [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
    categoryHtml += ` <div class="cateogy_box pharmacy_category_box">
                <div class="category_img_box_design">
                  <img src="../assets/img/bg/prd1.svg" alt="" />
                </div>
                <h6>Grocery</h6>
              </div>`;
  });

  $("#catgoryPharmacy1").html(categoryHtml);
}

function getCategory99store1() {
  let storeHtml = "";

  const storeData = [
    "../assets/img/99category1.png",
    "../assets/img/99category2.png",
    "../assets/img/99category3.png",
    "../assets/img/99category4.png",
    "../assets/img/99category2.png",
    "../assets/img/99category3.png",
    "../assets/img/99category4.png",
    "../assets/img/99category1.png",
  ];

  storeData.map((item) => {
    storeHtml += `<div class="store99_category_box">
              <img src="${item}" alt="">
            </div>`;
  });
  $("#storeCategory99").html(storeHtml);
}

function getCategory99Store2() {
  let categoryHtml = "";
  [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
    categoryHtml += ` <div class="cateogy_box">
                <div class="category_img_box_design">
                  <img src="../assets/img/bg/prd1.svg" alt="" />
                </div>
                <h6>Grocery</h6>
              </div>`;
  });

  $("#catgory99Store1").html(categoryHtml);
}

function getBanner99Store() {
  let bannerHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    bannerHtml += `<div class="store99_crausel_img">
            <img src="../assets/img/banner99store1.png" alt="">
          </div>`;
  });

  $("#carousel11").html(bannerHtml);
  $("#carousel12").html(bannerHtml);
}

function getProduct99store() {
  const store99Data = [
    {
      id: 1,
      name: "Wall Mounted Toothbrush Holder",
      img: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.5,
      reviews: 20896,
    },
    {
      id: 2,
      name: "Hanging Wardrobe Organizer",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.4,
      reviews: 20896,
    },
    {
      id: 3,
      name: "Wall Socket Mobile Holder",
      img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.3,
      reviews: 20896,
    },
    {
      id: 4,
      name: "Window Glass Cleaning Wiper",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.5,
      reviews: 20896,
    },
    {
      id: 5,
      name: "Kitchen Mug Hanging Rack",
      img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.6,
      reviews: 20896,
    },
    {
      id: 6,
      name: "Portable Lunch Storage Bag",
      img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.4,
      reviews: 20896,
    },
    {
      id: 7,
      name: "Mini Storage Basket",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.2,
      reviews: 20896,
    },
    {
      id: 8,
      name: "Foldable Laundry Basket",
      img: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.5,
      reviews: 20896,
    },
    {
      id: 9,
      name: "Silicone Kitchen Funnel",
      img: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.4,
      reviews: 20896,
    },
    {
      id: 10,
      name: "Multipurpose Storage Box",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.6,
      reviews: 20896,
    },
    {
      id: 11,
      name: "Cable Management Clips",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.3,
      reviews: 20896,
    },
    {
      id: 12,
      name: "Travel Cosmetic Pouch",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
      price: 99,
      oldPrice: 199,
      discount: "50% OFF",
      rating: 4.5,
      reviews: 20896,
    },
  ];
  let productHtml = "";
  store99Data.map((item) => {
    productHtml += `  <div class="product_design_item_wrap store99prd_design" onclick="location.href='productDetail.html'">
        
        <div class="product_top_wrap">
          <div class="product_img" onclick="location.href='productDetail.html'">
            <img src="${item.img}" alt="${item.name}">
          </div>
  <div class="like ${item.id == 0 || item.id == 3 || item.id == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item.id == 2 || item.id == 4 || item.id == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
                   </div>

        <div class="product_txt">
          <h5>${item.name}</h5>

          <div class="rating_wrap">
            <div class="stars">
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
            </div>
            <div class="rate">(${item.reviews})</div>
          </div>

          <div class="qty_price_sec">
            <h4>1 Pc</h4>

            <div class="price_sec">
              <h6>₹${item.price}</h6>
              <del>₹${item.oldPrice}</del>
            </div>
          </div>

         

        </div>
      </div>`;
  });
  $("#product99store1").html(productHtml);
  $("#product99store2").html(productHtml);
  $("#product99store3").html(productHtml);
  $("#product99store4").html(productHtml);
  $("#product99store5").html(productHtml);
}

function getProductKids() {
  const kidsProducts = [
    {
      id: 1,
      name: "Kids Building Blocks Set",
      img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
      price: 299,
      oldPrice: 499,
      discount: "40% OFF",
      rating: 4.6,
      reviews: 12543,
    },
    {
      id: 2,
      name: "Remote Control Racing Car",
      img: "https://images.unsplash.com/photo-1517672651691-24622a91b550?w=400",
      price: 599,
      oldPrice: 899,
      discount: "33% OFF",
      rating: 4.4,
      reviews: 9876,
    },

    {
      id: 4,
      name: "Kids Drawing & Coloring Kit",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      price: 199,
      oldPrice: 349,
      discount: "43% OFF",
      rating: 4.5,
      reviews: 7621,
    },
    {
      id: 5,
      name: "Educational Puzzle Board",
      img: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400",
      price: 179,
      oldPrice: 299,
      discount: "40% OFF",
      rating: 4.7,
      reviews: 8921,
    },
    {
      id: 6,
      name: "Baby Musical Toy Piano",
      img: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=400",
      price: 449,
      oldPrice: 699,
      discount: "36% OFF",
      rating: 4.3,
      reviews: 5412,
    },
    {
      id: 7,
      name: "Kids School Backpack",
      img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400",
      price: 399,
      oldPrice: 599,
      discount: "33% OFF",
      rating: 4.6,
      reviews: 11234,
    },
  ];
  let productHtml = "";
  kidsProducts.map((item) => {
    productHtml += `  <div class="product_design_item_wrap kidsprd_design" onclick="location.href='productDetail.html'">
        
        <div class="product_top_wrap">
          <div class="product_img" onclick="location.href='productDetail.html'">
            <img src="${item.img}" alt="${item.name}">
          </div>
  <div class="like ${item.id == 0 || item.id == 3 || item.id == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item.id == 2 || item.id == 4 || item.id == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
                   </div>

        <div class="product_txt">
          <h5>${item.name}</h5>

          <div class="rating_wrap">
            <div class="stars">
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
              <i class="ti ti-star-filled"></i>
            </div>
            <div class="rate">(${item.reviews})</div>
          </div>

          <div class="qty_price_sec">
            <h4>1 Pc</h4>

            <div class="price_sec">
              <h6>₹${item.price}</h6>
              <del>₹${item.oldPrice}</del>
            </div>
          </div>

         

        </div>
      </div>`;
  });
  $("#productkids1").html(productHtml);
  $("#productkids2").html(productHtml);
  $("#productkids3").html(productHtml);
  $("#productkids4").html(productHtml);
  $("#productkids5").html(productHtml);
  $("#productkids6").html(productHtml);
}

function getBannerKids() {
  let bannerHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    bannerHtml += `<div class="kids_crausel_img">
            <img src="../assets/img/kidsBanner1.png" alt="">
          </div>`;
  });

  $("#carousel13").html(bannerHtml);
  $("#carousel14").html(bannerHtml);
  $("#carousel15").html(bannerHtml);
}

function getCategoryKids() {
  let categoryHtml = "";
  [1, 2, 3, 4].map((item) => {
    categoryHtml += ` <div class="cateogy_box pharmacy_category_box">
                <div class="category_img_box_design">
                  <img src="../assets/img/bg/prd1.svg" alt="" />
                </div>
                <h6>Grocery</h6>
              </div>`;
  });

  $("#catgoryKids1").html(categoryHtml);
  $("#catgoryKids2").html(categoryHtml);
  $("#catgoryKids3").html(categoryHtml);
  $("#catgoryKids4").html(categoryHtml);
}

function getcategoryDesignKids() {
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
      more: 150,
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
    },
  ];

  let categoryHtml = "";
  categories.map((item) => {
    categoryHtml += `    <div class="data_design_sec_item kids_color">
              <h5>${item.name}</h5>
              <div class="data_design_img_wrap">
               ${item?.images
                 .map(
                   (img) => `
              <div class="design_img">
                  <img src="${img}" alt="">
                </div>
            `,
                 )
                 .join("")}
                
                
              </div>
            </div>`;
  });

  $("#categoryDesignKids").html(categoryHtml);
}

function toggleSystem() {
  if ($("#descToggle").css("opacity") == 0) {
    // alert();
    $("#descToggle").css("opacity", 1);
    $("#descToggle").css("height", "100%");
  } else {
    $("#descToggle").css("opacity", 0);
    $("#descToggle").css("height", "0");
  }
}

function relatedProductData() {
  let productHtml = "";
  [0, 1, 2, 3, 4, 5].map((item) => {
    productHtml += `  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
  <div class="like ${item == 0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item == 2 || item == 4 || item == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
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
  });

  $("#productRelatedData").html(productHtml);
}

relatedProductData();

function getCouponsData() {
  let couponsHtml = "";
  [0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
    couponsHtml += `   <div class="coupon-card">
            <img
              src="../assets/img/icon/couponsBox.svg"
              alt="coupon bg"
              class="coupon-bg"
            />

            <div class="coupon-header">
              <h3>DAC2</h3>
              <div>Valid Until 2026-06-28</div>
            </div>

            <div class="coupon-body">
              <div class="coupon-info">
                <div class="coupon-title">
                  <i class="ti ti-gift-filled"></i>
                  <h4>40.00% OFF</h4>
                </div>
                <p>Min Order ₹800.00</p>
              </div>

              <button
                class="coupon_btn apply-btn active"
                id="DAC2"
              
              >
                Applied
              </button>
            </div>
          </div>`;
  });
  $("#couponsData").html(couponsHtml);
}
// getCouponsData();

function getSubCategory() {
  let productHtml = "";
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    productHtml += `  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
            <div class="like ${item == 0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item == 2 || item == 4 || item == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
           
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
  });

  $("#subCategoryData").html(productHtml);
}
getSubCategory();

// function getSearchPrd() {
//      let productHtml = "";
// [0, 1, 2, 3, 4, 5,6,7,8,9,10].map((item) => {
//   productHtml += `  <div class="product_design_item_wrap">
//           <div class="product_top_wrap">
//           <div class="product_img" onclick="location.href='productDetail.html'">
//             <img src="../assets/img/bg/prd1.svg" alt="">
//           </div>
//           <div class="like ${item ==0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
//           ${item ==2 || item == 4 || item == 3 ? ` <button>Add</button>`: `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}

//           </div>
//           <div class="product_txt">
//             <h5>Tata salt vacum evaporated iodised edible common salt </h5>
//             <div class="rating_wrap">
//               <div class="stars"><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i><i class="ti ti-star-filled"></i></div>
//               <div class="rate">(303003)</div>
//             </div>
//             <div class="qty_price_sec">
//               <h4>1kg</h5>
//               <div class="price_sec">
//               <h6>₹29</h6>
//               <del>₹30</del>
//               </div>
//               </div>
//           </div>
//         </div>`;
// });

//   $("#searchData").html(productHtml);
// }

async function handleInput(e) {
  const value = e.target.value;

  let data = await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  let AllData = data?.filter((item) => {
    return item?.title.includes(value);
  });
  let searchHtml = "";
  let notFoundHtml = "";
  console.log(AllData);

  if (AllData.length > 0) {
    AllData?.forEach((item) => {
      searchHtml += ` <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
            <div class="like ${item.id == 0 || item.id == 3 || item.id == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item.id == 2 || item.id == 4 || item.id == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
           
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
          </div>
      `;
    });
  } else {
    notFoundHtml += `<div class="not_found"><img src="../assets/img/icon/notFound.gif" alt=""/>No Result Found !</div>`;
    searchHtml += ``;
  }
  $("#notFound").html(notFoundHtml);
  $("#searchData").html(searchHtml);
}

function getWishlist() {
  let wishlistHtml = "";

  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
    wishlistHtml += `  <div class="product_design_item_wrap">
            <div class="product_top_wrap">
            <div class="product_img" onclick="location.href='productDetail.html'">
              <img src="../assets/img/bg/prd1.svg" alt="">
            </div>
            <div class="like ${item == 0 || item == 3 || item == 4 ? "like_active" : ""}"><i class="ti ti-heart-filled"></i></div>
            ${item == 2 || item == 4 || item == 3 ? ` <button>Add</button>` : `<div type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasVarient" aria-controls="offcanvasVarient" class="cart_tag_Add varient">Add <div class="varient_btn">2 option</div></div>`}
           
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
  });

  $("#wishlistData").html(wishlistHtml);
}

getWishlist();

function getAllCategories() {
  const groceryCategories = [
    {
      name: "Fruits",
      img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300",
    },
    {
      name: "Vegetables",
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
    },
    {
      name: "Dairy",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300",
    },
    {
      name: "Bakery",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300",
    },
    {
      name: "Beverages",
      img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300",
    },
    {
      name: "Snacks",
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300",
    },
    {
      name: "Rice & Dal",
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300",
    },
    {
      name: "Personal Care",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
    },
  ];

  let html = "";

  groceryCategories.forEach((item) => {
    html += `
      <div class="cateogy_box" onclick="location.href='subCategory.html'">
        <div class="category_img_box_design">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <h6>${item.name}</h6>
      </div>
    `;
  });

  $("#category1").html(html);
  $("#category2").html(html);
  $("#category3").html(html);
  $("#category4").html(html);
  $("#category5").html(html);
  $("#category6").html(html);
}

getAllCategories();

function getOrderData() {
  const orderData = [
    {
      id: 1,
      name: "Men's Casual T-Shirt",
      img: "../assets/img/fashionbox1.png",
      status: "Placed",
      date: "26/12/2025",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      img: "../assets/img/fashionbox2.png",
      status: "Shipped",
      date: "25/12/2025",
    },
    {
      id: 3,
      name: "Sports Running Shoes",
      img: "../assets/img/fashionbox3.png",
      status: "Delivered",
      date: "24/12/2025",
    },
    {
      id: 4,
      name: "Cotton Hoodie",
      img: "../assets/img/fashionbox4.png",
      status: "Placed",
      date: "23/12/2025",
    },
    {
      id: 5,
      name: "Leather Wallet",
      img: "../assets/img/fashionbox5.png",
      status: "Cancelled",
      date: "22/12/2025",
    },
    {
      id: 6,
      name: "Formal Shirt",
      img: "../assets/img/fashionbox6.png",
      status: "Delivered",
      date: "21/12/2025",
    },
    {
      id: 7,
      name: "Women's Handbag",
      img: "../assets/img/fashionbox7.png",
      status: "Shipped",
      date: "20/12/2025",
    },
    {
      id: 8,
      name: "Round Neck Sweater",
      img: "../assets/img/fashionbox8.png",
      status: "Placed",
      date: "19/12/2025",
    },
    {
      id: 9,
      name: "Classic Sunglasses",
      img: "../assets/img/fashionbox9.png",
      status: "Delivered",
      date: "18/12/2025",
    },
    {
      id: 10,
      name: "Denim Jacket",
      img: "../assets/img/fashionbox10.png",
      status: "Returned",
      date: "17/12/2025",
    },
    {
      id: 11,
      name: "Printed Kurti",
      img: "../assets/img/fashionbox11.png",
      status: "Delivered",
      date: "16/12/2025",
    },
    {
      id: 12,
      name: "Casual Sneakers",
      img: "../assets/img/fashionbox12.png",
      status: "Shipped",
      date: "15/12/2025",
    },
    {
      id: 13,
      name: "Track Pants",
      img: "../assets/img/fashionbox13.png",
      status: "Placed",
      date: "14/12/2025",
    },
    {
      id: 14,
      name: "Women's Top",
      img: "../assets/img/fashionbox14.png",
      status: "Delivered",
      date: "13/12/2025",
    },
    {
      id: 15,
      name: "Winter Jacket",
      img: "../assets/img/fashionbox15.png",
      status: "Shipped",
      date: "12/12/2025",
    },
    {
      id: 16,
      name: "Leather Belt",
      img: "../assets/img/fashionbox16.png",
      status: "Placed",
      date: "11/12/2025",
    },
  ];
  let orderHtml = "";
  orderData.map((item) => {
    orderHtml += ` <div class="order_data" onclick="location.href='orderDetail.html?id=${item.id}'">
        <div class="order_left">
          <div class="order_left_img">
            <img src="${item.img}" alt="${item.name}">
          </div>
          <div class="order_middle_txt">
            <h5>${item.name}</h5>
            <p><b>${item.status}</b></p>
            <p>Placed on : <b>${item.date}</b></p>
          </div>
        </div>
        <div class="order_right">
          <i class="ti ti-chevron-right"></i>
        </div>
      </div>`;
  });

  $("#orderData").html(orderHtml);
}
getOrderData();
