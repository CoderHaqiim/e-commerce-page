const navmenu = document.querySelector("#navmenu")
const menubar = document.querySelector("#menubar")
const closeBtn = document.querySelector("#close")
const scrollBtn = document.querySelectorAll(".scroll")
const next = document.querySelector("#next")
const next2 = document.querySelector("#next2")
const previous = document.querySelector("#prev")
const previous2 = document.querySelector("#prev2")
const cart = document.querySelector("#cart")
const slides = document.querySelector("#slides")
const cartbasket = document.querySelector("#cartbasket")
const plus = document.querySelector("#plus")
const minus = document.querySelector("#minus")
const itemCount = document.querySelector("#itemcount")
const counter = document.querySelector("#counter")
const addToCartBtn = document.querySelector("#addtocart")
const calc = document.querySelector("#calc")
const amount = document.querySelector("#amount")
const transactionCalc = document.querySelector("#item_proceed")
const myItem = document.querySelector("#myitem")
const checkout = document.querySelector("#checkout")
const emptyText = document.querySelector("#emptytext")
const removeBtn = document.querySelector("#removeitem")
const list = document.querySelector("#list")
const navbarLogo = document.querySelector("#navbar_logo")
const profile = document.querySelector("#profile")
const thumbs =document.querySelectorAll(".thumb")
const thumbs2 = document.querySelectorAll(".thumb2")
const closeShadeBtn = document.querySelector("#closeshade")
const shade = document.querySelector("#shade")
const slides2 = document.querySelector("#slides2")
const navlist = document.querySelectorAll(".navlist")
let showMenu = false
let cartIsOpen = false
let cartItems = 0
let currentScroll = 0
let slideTo = 0
let scrollAmount = 0

function screenWidth(){
    let widthRange = 0 
    innerWidth >= 1400? widthRange = 1 : (()=>{
        innerWidth >= 1200? widthRange = 2 : (()=>{
            innerWidth >= 700 && (()=>{
                widthRange = 3
            })()
        })()
    })()

    return widthRange
}

function setScrollAmount(){
        switch(screenWidth()){
            case 1:(()=>{
                scrollAmount = 550
            })();break;
            case 2: (()=>{
                scrollAmount = 300
            })();break;
            case 3: (()=>{
                scrollAmount = 250
            })();break;
        }
}

const setVisibility = (element,visibility) => {
    element.style.display = `${visibility}`
    //element is the html element i.e e.target
    //visibility should be a string argument
} 

const handleClick= (element,eventFunction) =>{
    element.addEventListener('click',eventFunction)
    //element is the html element i.e e.target
    //event is the event being listened to e.g "click". it has to be a string argument
    //eventFunction is a callback. it contains the side effects when event is triggered
}

function openNavMenu(){
    handleClick(navmenu,()=>{
        !showMenu && (()=>{
            setVisibility(menubar,'block')
            showMenu = true
        })()
    })
}

function closeNavMenu(){
    handleClick(closeBtn,()=>{
         showMenu && (()=>{
            setVisibility(menubar,'none')
            showMenu = false
        })()
    })
}
function nextImage(){
    handleClick(next,()=>{
        innerWidth >= 500? slides.scrollBy({top:0,left:450,behavior:'smooth'}) : (()=>{
            innerWidth >= 450? slides.scrollBy({top:0,left:400,behavior:'smooth'}) :(()=>{
                slides.scrollBy({top:0,left:innerWidth,behavior:'smooth'})
            })()
        })()
    })
    handleClick(next2,()=>{
        slides2.scrollBy({top:0,left:scrollAmount,behavior:'smooth'})
        currentScroll < 3 && currentScroll ++
        thumbs2.forEach(item =>{
            item.classList.contains('activethumb') && item.classList.remove('activethumb')
            thumbs2[currentScroll].classList.add("activethumb")
        })
    })
}
function previousImage(){
    handleClick(previous,()=>{
        innerWidth >= 500? slides.scrollBy({top:0,left:-450,behavior:'smooth'}) : (()=>{
            innerWidth >= 450? slides.scrollBy({top:0,left:-400,behavior:'smooth'}) :(()=>{
                slides.scrollBy({top:0,left:-innerWidth,behavior:'smooth'})
            })()
        })()
    })
    handleClick(previous2,()=>{
        slides2.scrollBy({top:0,left:-scrollAmount,behavior:'smooth'})
        currentScroll !== 0 && currentScroll--
        thumbs2.forEach(item =>{
            item.classList.contains('activethumb') && item.classList.remove('activethumb')
            thumbs2[currentScroll].classList.add("activethumb")
        })
    })
}
function setTotal(){
    let amountText = amount.innerText
    amountText = parseInt(amountText.slice(1))
    let total = (amountText * cartItems).toFixed(2)
    amountText = amountText.toFixed(2)
    showCalc(amountText,total)
}
function showCalc(amountText,total){
    calc.innerHTML =`$${amountText} x ${cartItems} <strong> &nbsp; $${total}</strong>`
}
function show_hideCart (){
    handleClick(cart,()=>{
        loadCart()
        !cartIsOpen? (()=>{
            setVisibility(cartbasket,"block")
            cartIsOpen = true
        })(): (()=>{
            setVisibility(cartbasket,"none")
            cartIsOpen = false
        })()
    })
}
function addItem(){
    handleClick(plus,()=>{
        cartItems ++
        itemCount.innerText =`${cartItems}`
    })
}
function subtractItem (){
    handleClick(minus,()=>{
        cartItems > 0 && cartItems --
        itemCount.innerText =`${cartItems}`
    })
}
function addToCart(){
    handleClick(addToCartBtn,()=>{
        cartItems !== 0 && (()=>{
            setTotal()
            setVisibility(counter,"flex")
        })()
        counter.innerText = cartItems
    })
}

function loadCart(){
    !cartItems ? (()=>{
        setVisibility(checkout,'none')
        setVisibility(myItem,'none')
        setVisibility(emptyText,'flex')
    })(): (()=>{
        setVisibility(checkout,'block')
        setVisibility(myItem,'flex')
        setVisibility(emptyText,'none')
    })()
}
function removeFromCart(){
    handleClick(removeBtn,()=>{
        cartItems = 0
        itemCount.innerText = cartItems
        setVisibility(counter,"none")
        loadCart()

    })
}
thumbs.forEach(thumb=>{
    handleClick(thumb,(e)=>{
        thumbs.forEach(item =>{
            item.classList.contains('activethumb') && item.classList.remove('activethumb')
        })
        setVisibility(shade,'flex')
        thumb.classList.add("activethumb")
            thumbs2.forEach(item =>{
                item.classList.contains('activethumb') && item.classList.remove('activethumb')
            })
        switch(e.target.id){
            case 'thumb1': (()=>{
                slideTo = 0
                calcScroll()
                currentScroll = 0
            })();break;
            case 'thumb2': (()=>{
                slideTo = 1
                calcScroll()
                currentScroll = 1
            })();break;
            case 'thumb3': (()=>{
                slideTo = 2
                calcScroll()
                currentScroll = 2
            })();break;
            case 'thumb4': (()=>{
                slideTo = 3
                calcScroll()
                currentScroll = 3
            })();break;
            default: console.log("hello, there's no default here. Ha! Ha!")
        }
    })
})

function calcScroll(){
    thumbs2[slideTo].classList.add("activethumb")
    if(currentScroll === 0){
        slides2.scrollBy({top:0,left:scrollAmount * slideTo,behavior:'smooth'})
    }
    else if(currentScroll > slideTo){
        let difference = currentScroll - slideTo
        slides2.scrollBy({top:0,left:-1*(scrollAmount * difference),behavior:'smooth'})
    }
    else{
        let difference = slideTo - currentScroll
        slides2.scrollBy({top:0,left:scrollAmount * difference, behavior:'smooth'})
    }
}

profile.onclick = () => profile.style.border = `solid 2px var(--primary1)`;
profile.onmouseout = () => profile.style.border = 'none'


//Just some responsiveness code
function addList(){
    innerWidth > 699 ? (()=>{
        navbarLogo.appendChild(list)
    })():(()=>{
        menubar.appendChild(list)
    })()
}
function closeShade(){
    handleClick(closeShadeBtn,() =>{
        slides2.scrollBy({top:0,left:-1650,behavior:'smooth'})
        setVisibility(shade,'none')
    })
}

function selectNavLi(){
    navlist.forEach(list =>{
        handleClick(list,(e)=>{
            navlist.forEach(list=>{
                list.classList.contains("activelist") && list.classList.remove('activelist')
            })
            list.classList.add('activelist')
        })
    })
}

onload = () =>{
    addList()
    setScrollAmount()
}
onresize = () =>{
    addList()
    setScrollAmount()
}
onreload = () =>{
    addList()
    setScrollAmount()
}


openNavMenu()
closeNavMenu()
nextImage()
previousImage()
show_hideCart()
addItem()
subtractItem()
addToCart()
loadCart()
removeFromCart()
closeShade()
selectNavLi()