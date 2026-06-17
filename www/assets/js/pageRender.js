function renderCategory(name) {
    let loadedPages = {
    Grocery: false,
    Beauty: false,
    Fashion: false
};
     $("#groceryPage, #beautyPage, #fashionPage").hide();
    
    if(name == "Grocery"){
       $("#groceryPage").show();
        $(".header_nav").css("background", "url('../assets/img/bg/bg1.svg')");
        $("#banners").html(`   <div class="hero_sec_img">
            <img src="../assets/img/bg/heroBanner1.svg" alt="" />
          </div>
          <div class="home_banner optional">
         <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../assets/img/bg/homeBanner1.png" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="../assets/img/bg/homeBanner1.png" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="../assets/img/bg/homeBanner1.png" class="d-block w-100" alt="...">
              </div>
            </div>
  
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
          $("#groceryPage").html(`<div class="wrap_prd1">
          <div class="product_sec_design1">
            <h4>ORDER AGAIN</h4>
            <div class="product_data" id="productDesign1"></div>
          </div>
        </div>
        <div class="wrap_category1">
          <div class="category_wrap reuse_wrap_head">
            <h4>Bestselling</h4>
            <div class="category_item_wrap" id="categoryContainer"></div>
          </div>
        </div>
        <div class="reuse_category new_arivals">
          <div class="category_wrap_new_arrival">
            <h4>New Arrivals</h4>
            <div class="new_arivals_design" id="newArrival"></div>
          </div>
        </div>
        <div class="reuse_category wrap_category2">
          <div class="category_wrap reuse_wrap_head">
            <h4>Grocery & Kitchen</h4>
            <div class="category_box_design" id="categoryBox1">
              <div class="cateogy_box">
                <div class="category_img_box_design">
                  <img src="../assets/img/bg/prd1.svg" alt="" />
                </div>
                <h6>Grocery</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="reuse_category wrap_category3">
          <div class="category_wrap reuse_wrap_head">
            <h4>Snacks & Drinks</h4>
            <div class="category_box_design" id="categoryBox2"></div>
          </div>
        </div>
        <div class="reuse_category wrap_category4">
          <div class="category_wrap reuse_wrap_head">
            <h4>Beauty & Personal Care</h4>
            <div class="category_box_design" id="categoryBox3"></div>
          </div>
        </div>
        <div class="reuse_product product_design_sec_wrap">
          <h4>Everyday Essentials</h4>
          <div class="product_wrapper" id="productWrap1"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="carousel_wrap">
          <h4>Brand On You</h4>
          <div
            class="owl-carousel owl-carousel1 banner_crousel"
            id="carousel1"
          ></div>
        </div>
        <div class="category_store_design reuse_wrap_head">
          <h4>Shop by Stores</h4>
          <div class="category_store_wrap" id="categoryPrd"></div>
        </div>
        <div class="category_Mart_design">
          <div class="header_wrap_mart">
            <h3>ITS Mart Exclusive</h3>
            <p>Exclusive deals, Exclusive quality</p>
          </div>
          <div class="cart_mart_design_wrap">
            <div class="cart_mart_item">
              <img src="../assets/img/categorySec1.svg" alt="" />
            </div>
            <div class="cart_mart_item">
              <img src="../assets/img/categorySec2.svg" alt="" />
            </div>
            <div class="cart_mart_item">
              <img src="../assets/img/categorySec1.svg" alt="" />
            </div>
            <div class="cart_mart_item">
              <img src="../assets/img/categorySec2.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="spotlight">
          <div class="header_spotlight">
            <img src="../assets/img/icon/shade2.png" />
            <h4>Br<i class="ti ti-heart-filled"></i>nd Spotlight</h4>
            <img src="../assets/img/icon/shade1.png" />
          </div>
          <div class="spotlight_images" id="brandspot">
            <div class="spot_img">
              <img src="../assets/img/brands/br1.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br2.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br3.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br4.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br5.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br6.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br7.png" alt="" />
            </div>
            <div class="spot_img">
              <img src="../assets/img/brands/br8.png" alt="" />
            </div>
          </div>
        </div>
        <div class="reuse_product bg bg1 product_design_sec_wrap">
          <div class="prd_img">
            <img src="../assets/img/bg/brandLogo1.svg" alt="" />
          </div>
          <div class="product_wrapper" id="productWrapsec1"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="reuse_product bg bg2 product_design_sec_wrap">
          <div class="prd_img">
            <img src="../assets/img/bg/brandLogo2.svg" alt="" />
          </div>
          <div class="product_wrapper" id="productWrapsec2"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="reuse_product bg bg1 product_design_sec_wrap">
          <div class="prd_img">
            <img src="../assets/img/bg/brandLogo3.svg" alt="" />
          </div>
          <div class="product_wrapper" id="productWrapsec3"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="carousel_wrap crousel2">
          <!-- <h4>Brand On You</h4> -->
          <div
            class="owl-carousel owl-carousel2 banner_crousel"
            id="carousel2"
          ></div>
        </div>
        <div class="reuse_wrap_head">
          <h4>Shop by Stores</h4>
          <div class="data_design_sec" id="categoryDesign"></div>
        </div>
        <div class="reuse_product product_design_sec_wrap">
          <h4>Everyday Essentials</h4>
          <div class="product_wrapper" id="productWrap2"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="carousel_wrap crousel3">
          <!-- <h4>Brand On You</h4> -->
          <div
            class="owl-carousel owl-carousel3 banner_crousel"
            id="carousel3"
          ></div>
        </div>

        <div class="reuse_product product_design_sec_wrap">
          <h4>Everyday Essentials</h4>
          <div class="product_wrapper" id="productWrap3"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="reuse_product product_design_sec_wrap">
          <h4>Everyday Essentials</h4>
          <div class="product_wrapper" id="productWrap4"></div>
          <div class="seeAllProduct">
            <div class="left_see_prd">
              <img
                src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                alt=""
              />
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                alt=""
              />
            </div>
            <div class="right_see_prd">
              <p>see all products</p>
              <i class="ti ti-player-play-filled"></i>
            </div>
          </div>
        </div>
        <div class="footer_grocery">
         <img src='../assets/img/bg/footer_bg.svg' alt=""/>
        </div>`);
         if (!loadedPages.Grocery) {
            loadedPages.Grocery = true;

            // Sirf pehli baar chalega
            initGrocery();
        }
              $(document).ready(function () {
        $(".owl-carousel1").owlCarousel({
          loop: true,
          margin: -50,
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
      $(document).ready(function () {
        $(".owl-carousel2").owlCarousel({
          loop: true,
          margin: -50,
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
      $(document).ready(function () {
        $(".owl-carousel3").owlCarousel({
          loop: true,
          margin: -50,
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

        
        

    }
    else if(name == "Beauty"){
          $("#beautyPage").show();
        $(".header_nav").css("background", " #D6C8BA");
        //  $("#contentToggle").html("Beauty ! ");
          $("#banners").html(` <div class="hero_sec_img">
            <img src="../assets/img/bg/heroBanner2.svg" alt="" />
          </div>`);
          $("#beautyPage").html(` <div class="main_category_beauty_wrap">
          <div class="main_category_item">
            <div class="category_img">
              <img src="../assets/img/cat1.svg" alt="" />
            </div>
            <div class="category_img">
              <img src="../assets/img/cat2.svg" alt="" />
            </div>
            <div class="category_img">
              <img src="../assets/img/cat3.svg" alt="" />
            </div>
            <div class="category_img">
              <img src="../assets/img/cat1.svg" alt="" />
            </div>
            <div class="category_img">
              <img src="../assets/img/cat2.svg" alt="" />
            </div>
          </div>
          <div class="category_store_beauty">
            <div class="category_store_head">
              <h4>Only At Itscart</h4>
              <p>Beauty you wont find anywhere else</p>
            </div>
            <div class="category_store_wrap_beauty" id="categoryStore"></div>
          </div>

          <div class="category_banner_data carousel_wrap">
            <div class="category_banner_img">
              <img src="../assets/img/banner1.svg" alt="" />
            </div>
            <div class="category_banner_img">
              <img src="../assets/img/banner1.svg" alt="" />
            </div>
            <div class="category_banner_img">
              <img src="../assets/img/banner1.svg" alt="" />
            </div>
          </div>
          <div class="reuse_product product_design_sec_wrap">
            <h4>Everyday Essentials</h4>
            <div class="product_wrapper" id="productBeauty1"></div>
            <div class="seeAllProduct">
              <div class="left_see_prd">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                  alt=""
                />
              </div>
              <div class="right_see_prd">
                <p>see all products</p>
                <i class="ti ti-player-play-filled"></i>
              </div>
            </div>
          </div>
          <div class="category_beauty_arrow_design_Sec reuse_wrap_head">
            <h4>Your Beauty Must- Have Await</h4>
            <div class="category_beauty_arrow_wrap" id="categoryArrowDesign">
           
            </div>
          </div>
             <div class="reuse_category wrap_category2">
          <div class="category_wrap reuse_wrap_head">
            <h4>Grocery & Kitchen</h4>
            <div class="category_box_design" id="categoryBeauty1">
              <div class="cateogy_box">
                <div class="category_img_box_design">
                  <img src="../assets/img/bg/prd1.svg" alt="" />
                </div>
                <h6>Grocery</h6>
              </div>
            </div>
          </div>
          </div>
          <div class="reuse_category wrap_category3">
            <div class="category_wrap reuse_wrap_head">
              <h4>Snacks & Drinks</h4>
              <div class="category_box_design" id="categoryBeauty2"></div>
            </div>
          </div>
          <div class="category_big_bottom_design_banner">
            <div class="category_banner_wrap">
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            </div>
          </div>
           <div class="reuse_product product_design_sec_wrap">
            <h4>Everyday Essentials</h4>
            <div class="product_wrapper" id="productBeauty2"></div>
            <div class="seeAllProduct">
              <div class="left_see_prd">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                  alt=""
                />
              </div>
              <div class="right_see_prd">
                <p>see all products</p>
                <i class="ti ti-player-play-filled"></i>
              </div>
            </div>
          </div>
           <div class="reuse_product product_design_sec_wrap">
            <h4>Everyday Essentials</h4>
            <div class="product_wrapper" id="productBeauty3"></div>
            <div class="seeAllProduct">
              <div class="left_see_prd">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                  alt=""
                />
              </div>
              <div class="right_see_prd">
                <p>see all products</p>
                <i class="ti ti-player-play-filled"></i>
              </div>
            </div>
          </div>
           <div class="category_big_bottom_design_banner">
            <div class="category_banner_wrap">
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            <div class="big_banner_carosel">
              <img src="../assets/img/big_banner_new_design.svg" alt="">
            </div>
            </div>
          </div>
               <div class="reuse_product product_design_sec_wrap">
            <h4>Everyday Essentials</h4>
            <div class="product_wrapper" id="productBeauty4"></div>
            <div class="seeAllProduct">
              <div class="left_see_prd">
                <img
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
                  alt=""
                />
              </div>
              <div class="right_see_prd">
                <p>see all products</p>
                <i class="ti ti-player-play-filled"></i>
              </div>
            </div>
          </div>
        
        </div>`);
         if (!loadedPages.Beauty) {
            loadedPages.Beauty = true;

            initBeauty();
        }
         

    }
    else if(name == "Fashion"){
       $(".header_nav").css("background", "linear-gradient(180deg, #DAF0FE 85.62%, #FFFFFF 100%)");
         $("#contentToggle").html("Fashion ! ");
          $("#fashionPage").show();
         $("#banners").html(` <div class="heros_boxes_category">
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory1.svg" alt="" />
              </div>
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory2.svg" alt="" />
              </div>
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory3.svg" alt="" />
              </div>
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory1.svg" alt="" />
              </div>
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory2.svg" alt="" />
              </div>
              <div class="hero_cat_box">
                   <div class="img_cover"></div>
                   <img src="../assets/img/fashionCategory3.svg" alt="" />
                  
              </div>
          </div>`);
          $("#fashionPage").html(`   <div class="fashion_category_wrap">
          <div class="fashion_header">
            <h4>Categories</h4>
            <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
          </div>
          <div class="fashion_category_sec">
            <div class="fashion_category_box">
              <div class="fashion_img_wrap_box">
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox1.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox2.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox3.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox4.png" alt="" />
                </div>
              </div>
              <div class="txt_fashion_box">
                <h4>Clothes</h4>
                <div>
                  <p>6</p>
                </div>
              </div>
            </div>
            <div class="fashion_category_box">
              <div class="fashion_img_wrap_box">
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox5.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox6.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox7.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox8.png" alt="" />
                </div>
              </div>
              <div class="txt_fashion_box">
                <h4>Shoes</h4>
                <div>
                  <p>10</p>
                </div>
              </div>
            </div>
            <div class="fashion_category_box">
              <div class="fashion_img_wrap_box">
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox9.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox10.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox11.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox12.png" alt="" />
                </div>
              </div>
              <div class="txt_fashion_box">
                <h4>Bags</h4>
                <div>
                  <p>12</p>
                </div>
              </div>
            </div>
            <div class="fashion_category_box">
              <div class="fashion_img_wrap_box">
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox13.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox14.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox15.png" alt="" />
                </div>
                <div class="fashion_box">
                  <img src="../assets/img/fashionbox16.png" alt="" />
                </div>
              </div>
              <div class="txt_fashion_box">
                <h4>Watch</h4>
                <div>
                  <p>16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fashion_banner_Sec">
          <div
            class="owl-carousel owl-carousel4 banner_crousel"
            id="carousel4"
          ></div>
        </div>
        <div class="reuse_product">
          <div class="fashion_header">
            <h4>New Item</h4>
            <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
          </div>
          <div class="fashion_product" id="productFashion1"></div>
        </div>
        <div class="fashion_flash">
          <div class="fashion_header">
            <h4>Flash Sale</h4>
          </div>
          <div class="fashion_sale_wrap">
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale1.png" alt="" />
            </div>
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale2.png" alt="" />
            </div>
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale3.png" alt="" />
            </div>
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale4.png" alt="" />
            </div>
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale5.png" alt="" />
            </div>
            <div class="fashion_sale_box">
              <img src="../assets/img/fashionSale6.png" alt="" />
            </div>
          </div>
        </div>
        <div class="fashion_brands">
          <div class="fashion_brand_head fashion_header">
            <h4>Hype-Worthly Brands</h4>
          </div>
          <div class="fashion_brand_content" id="brandsProduct"></div>
        </div>
        <div class="fashion_big_banner">
          <div class="fashion_big_img">
            <img src="../assets/img/big_banner.svg" alt="" />
          </div>
          <!-- <div class="bg_banner">
            <img src="../assets/img/bg/bgFashionprd.png" alt="">
          </div> -->
          <div class="fashion_small_banner_prd">
            <div class="fashion_small_item">
              <img src="../assets/img/fashionSale1.png" alt="" />
              <h5>Shoes & gloves</h5>
            </div>
            <div class="fashion_small_item">
              <img src="../assets/img/fashionSale2.png" alt="" />
              <h5>watches & gloves</h5>
            </div>
            <div class="fashion_small_item">
              <img src="../assets/img/fashionSale3.png" alt="" />
              <h5>bags & gloves</h5>
            </div>
            <div class="fashion_small_item">
              <img src="../assets/img/fashionSale4.png" alt="" />
              <h5>Shoes & gloves</h5>
            </div>
          </div>
        </div>
        <div class="wrapper_div_relative">
          <div class="reuse_product">
            <div class="fashion_header">
              <h4>Most Popular</h4>
              <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
            </div>
            <div
              class="product_wrapper fashion_product"
              id="productFashion2"
            ></div>
          </div>
          <div class="reuse_product">
            <div class="fashion_header">
              <h4>Discover</h4>
              <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
            </div>
            <div
              class="product_wrapper fashion_product"
              id="productFashion3"
            ></div>
          </div>
          <div class="green_banner">
             <div
            class="owl-carousel owl-carousel5 banner_crousel "
            id="carousel5"
          ></div>
            <!-- <div class="green_banner_img">
              <img src="../assets/img/green_banner.svg" alt="" />
            </div> -->
          </div>
          <div class="reuse_product">
            <div class="fashion_header">
              <h4>Most Popular</h4>
              <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
            </div>
            <div
              class="product_wrapper fashion_product"
              id="productFashion4"
            ></div>
          </div>
          <div class="reuse_product">
            <div class="fashion_header">
              <h4>Discover</h4>
              <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
            </div>
            <div
              class="product_wrapper fashion_product"
              id="productFashion5"
            ></div>
          </div>
          <div class="last_sec_fashion">
            <div class="fashion_header">
              <h4>What’s Trending Near By</h4>
              <a href="#"> <i class="ti ti-arrow-narrow-right-dashed"></i></a>
            </div>
            <div class="last_fashion_data">
              <div class="last_fashion_wrap" id="lastFashionsec"></div>
            </div>
          </div>
          
        </div>
         <div class="live_it_footer">
          <h2>
            Live <br />
            it up!
          </h2>
          <p>
            crafted with <i class="ti ti-heart-filled"></i> in jhankhand, india
          </p>
        </div>`)

              if (!loadedPages.Fashion) {
            loadedPages.Fashion = true;

            initFashion();
        }
         $(document).ready(function () {
        $(".owl-carousel5").owlCarousel({
          loop: true,
          margin: 5,
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
         $(document).ready(function () {
        $(".owl-carousel4").owlCarousel({
          loop: true,
          margin: 5,
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


          

    }
    
}