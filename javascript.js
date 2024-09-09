function loadRSS() {
    //Use CORS API website as proxy
    let proxy = "https://cors-anywhere.herokuapp.com/";

    //Declare the URL where we fetch RSS file
    let url = "https://www.nasa.gov/rss/dyn/educationnews.rss";
    // NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
    //CNN RSS: https://edition.cnn.com/services/rss/
    // CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
    //BBC RSS: http://feeds.bbci.co.uk/news/rss.xml
    //Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", proxy + url, true);
    xhttp.send();
    //Process RSS file when it has been loaded successfully
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Load XML file as "XML" format and parse/process it by calling function parseRSS()
            let rss = this.responseText;
            parseRSS(this);
        }
    };
}
function parseRSS(rss) {
    //Load all "items" inside the RSS document, each item is a news
    let items = rss.responseXML.getElementsByTagName("item");
    let rssContent = "";//varible "rssContent" is used to store rss content in HTML format
    //Loop through all items and extract child node content: "title", "link", "description" and "pubdate"
    for (let i = 0; i < items.length; i++) {
        let nodes = items[i].children;
        //Extract "title", "link", "description" and "pubdate" of each "node"
        let title, pubdate, description, link;
        for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].tagName == "title") {
                4
                title = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "link") {
                link = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "description") {
                description = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "pubDate") {
                pubdate = nodes[j].childNodes[0].nodeValue;
            }
        }
        //Format the extracted information above in HTML format and append it to the "rssContent" variable
        //each item (news) is wrapped inside a <div>
        rssContent += 
        `
        <div id="rss-item" style="background-color: #f8f9fa; border: 1px solid #21252e; margin: 16px 8px 0 7.5px; padding:1rem; flex: 0 0 48%; box-sizing: border-box;">
            <div style="text-align:center;"> 
                <p style="font-weight:700; font-size: 1.25rem">${title}</p>
            </div>
            <div>
                <p>${description}</p>
                <p><a href="${link}">Read more</a></p>
                <p style="font-style: italic; color:DodgerBlue;">${pubdate}</p>
            </div>
        </div>
        `;
    }
    
    // After loop, wrap everything in a flex container with two columns.
    // Add images query that responds to a browser smaller than 1400px (suitable for most browsers in full screen).
    // Styling gets complicated, so try again later maybe.
    rssContent = `
    <style>
        @images (max-width: 1400px) {
            #rss-item {
                flex: 0 0 100% !important;
            }
        }
    </style>
    <div style="display: flex; flex-wrap: wrap; justify-content: center;">
        ${rssContent}
    </div>
    `;
    //Display the "rssContent" on the webpage
    document.getElementById("rssFeed").innerHTML = rssContent;
}

loadRSS();

// Declare assets as variables for reuse and readabillity.
let Description1 = "Built for both productivity and entertainment, this HP Laptop PC lets you stay portable with its thin and light design. Enjoy vivid, flicker-free images on a micro-edge display and tackle busy workdays with an Intel® Core Processor and abundant storage."
let Description2 = "Surface Pro, 11th Edition. Exceptional performance, all-day battery life, and new, unique AI experiences help make your device smarter, faster, and more creative."
let Description3 = "Choose the ready-to-go Aspire 3 with an AMD Ryzen 5000 Series Processor made for practical multitasking and productivity. With ease-of-use at its core, this family-friendly laptop is ready when you are."
let Description4 = "The Dell Inspiron 15.6 inch laptop is perfect for everyday use, in a stylish, thoughtful design. Featuring the latest AMD processors, you can finish your to-do list in no time."
let Description5 = "The Lenovo Yoga 7 2-in-1's unibody chassis houses AMD Ryzen 8040 Series processor. Shaped to move with your ideas, it flips into multiple modes so you can tackle work and play from any angle."
let image_url1 = "images/image1.jpg"
let image_url2 = "images/image2.jpg"
let image_url3 = "images/image3.jpg"
let image_url4 = "images/image4.jpg"
let image_url5 = "images/image5.jpg"
let title1 = "HP Notebook"
let title2 = "Microsoft Surface Pro"
let title3 = "Acer Aspire"
let title4 = "Dell Inspiron"
let title5 = "Yoga 7"

let Assets = [
    { id: 0, title: title1, Description: Description1, image_url: image_url1, price: "375" }, 
    { id: 1, title: title2, Description: Description2, image_url: image_url2, price: "750.00"  },
    { id: 2, title: title3, Description: Description3, image_url: image_url3, price: "1,200"  },
    { id: 3, title: title4, Description: Description4, image_url: image_url4, price: "499.00"  },
    { id: 4, title: title5, Description: Description5, image_url: image_url5, price: "1,000"  }
];

let users = [
    {id: 0, username: "daniel@eit.ac.nz", password: "daniel1234"},
    {id: 1, username: "john@eit.ac.nz", password: "john1234"},
    {id: 2, username: "ian@eit.ac.nz", password: "ian1234"},
    {id: 3, username: "ish@eit.ac.nz", password: "ish1234"},
    {id: 4, username: "noor@eit.ac.nz", password: "noor1234"},
   ];  


// #1 Slideshow demo
//-----------------------------
let currentManualSlide = 0;

function showManualSlide(index) {
    const Objects = Assets[index];
    document.getElementById('manualTitle').innerText = Objects.title;
    document.getElementById('manualImage').src = Objects.image_url;
    document.getElementById('manualDescription').innerText = Objects.Description;
}

function nextSlide() {
    currentManualSlide = (currentManualSlide + 1) % Assets.length;
    showManualSlide(currentManualSlide);
}

function previousSlide() {
    currentManualSlide = (currentManualSlide - 1 + Assets.length) % Assets.length;
    showManualSlide(currentManualSlide);
}

showManualSlide(currentManualSlide);

let currentAutoSlide = 0;

function showAutoSlide(index) {
    const Objects = Assets[index];
    document.getElementById('autoTitle').innerText = Objects.title;
    document.getElementById('autoImage').src = Objects.image_url;
    document.getElementById('autoDescription').innerText = Objects.Description;
}

function autoSlideShow() {
    showAutoSlide(currentAutoSlide);
    currentAutoSlide = (currentAutoSlide + 1) % Assets.length;
    setTimeout(autoSlideShow, 3000);
}

autoSlideShow();


// #2 Webpage customization demo
//-----------------------------

function changeBgColor() {
    const color = document.getElementById('bgColorSelect').value;
    document.body.style.backgroundColor = color;
}

function changeTextSize() {
    const size = document.getElementById('textSizeSelect').value;
    document.body.style.fontSize = size;
}

function changeImage(index) {
    const Objects = Assets[index]; 
    document.getElementById('backgroundImage').src = Objects.image_url;
    document.getElementById('CustomTitle').innerText = Objects.title;
    document.getElementById('CustomDescription').innerText = Objects.Description;
}

// #3 Authentication feature demo
//-----------------------------

class User {
    constructor(username, password) {
          this.username = username;       //"this" = this object property
          this.password = password; //"this" = this object property
    }
   
    //Methods:
    signUp(userList) {
        //Check if the username exists
        let foundObject = null;
        for (let i=0; i < userList.length; i++) {
            if (this.username == userList[i].username) {
                foundObject = userList[i];//Return the matching user                
            } 
        }
        //
        if (foundObject != null) {
            alert("SORRY! THIS USERNAME ALREADY EXISTS!");   
        } else {
            alert("CONGRATS! YOUR ACCOUNT IS CREATED");             
            userList.push(this);
        }
    }
    
    
    signIn(userList) {
        //Check if the user exists
        let foundUser = null;
        for (let i=0; i < userList.length; i++) {
            if (this.username == userList[i].username && this.password == userList[i].password) {
                foundUser = userList[i];//Return the matching user  
                alert("HELLO " + foundUser.username + " CONGRATS! YOU ARE LOGGED IN!"); 
                return foundUser; 
            } 
        }
   
        alert("SORRY! WRONG ACCOUNT");  
        return null;
    }
   }
   
   //Authentication
    function createUser() {
        //Get entered data
        let enteredusername = document.getElementById("signup_username").value;
        let enteredPass = document.getElementById("signup_password").value;
        
        //Create a new user
        let enteredUser = new User(enteredusername, enteredPass);
        //Call to execute the signUp() method
        enteredUser.signUp(users);
   }
   
    function checkUser() {
        //Get entered data
        let enteredusername = document.getElementById("login_username").value;
        let enteredPass = document.getElementById("login_password").value;
        
        //Create a new user
        let enteredUser = new User(enteredusername, enteredPass);
        //Call to execute the signIn() method
        enteredUser.signIn(users);
   }



//#4 Shopping Cart demo
//-----------------------------
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";

    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  