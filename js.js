const basketEl = document.getElementById("basket"); 
const smallBasketEl = document.getElementById("small-basket"); 
const checkoutEl = document.getElementById("checkout"); 
const checkoutInlineEl = document.getElementsByClassName("checkout-inline"); 
const checkoutButtonEl = document.getElementsByClassName("checkout-button"); 
const itemsInBasketEl = document.getElementsByClassName("items-in-basket"); 
const totalSumEl = document.getElementsByClassName("total-sum"); 
const notifyEl = document.getElementById("notify"); 

window.addEventListener("load", showBasket, false);         
window.addEventListener("load", showSmallBasket, false);    
window.addEventListener("load", showCheckout, false);       

function addToBasket(el, id, name, cost, image, notify = false) {
    let numOfItems = 1;
    el.classList.add("clicked");
    let currentBasket = JSON.parse(localStorage.getItem("basket"));

    if (currentBasket == null) { currentBasket = []; }
    for (let i = 0; i < currentBasket.length; i++) {
        if (id == currentBasket[i].artId) {
            numOfItems = currentBasket[i].nums + 1;
            currentBasket.splice(i, 1);
        }
    }

    currentBasket.push({ artId: id, artName: name, artCost: cost, artImage: image, nums: numOfItems });
    let jsonStr = JSON.stringify(currentBasket);
    localStorage.setItem("basket", jsonStr);

     if (notify == true) {
        var timer = null;
        if (document.getElementById("notify")) {
            var notifyText = "<p>Varan <b>" + name + "</b> lagd i varukorgen</p>";
            notifyEl.classList.add("visible");
            notifyEl.innerHTML = notifyText;
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                notifyEl.classList.remove("visible");
            }, 3000);
        }
    }

    showBasket();
    showSmallBasket();
    showCheckout();
}

function showBasket() {
    let basketItems = JSON.parse(localStorage.getItem("basket"));
    if (basketItems == null) { basketItems = []; }
    if (basketItems.length > 0) {
        if (document.getElementsByClassName("checkout-inline")) {
            for (let i = 0; i < checkoutInlineEl.length; i++) {
                checkoutInlineEl[i].style.display = "inline";
            }
        }
    }

    let sum = 0;
    let numOfItems = 0;
    if (basketItems.length > 0) {

        for (let i = 0; i < basketItems.length; i++) {
            let itemCost = parseInt(basketItems[i].artCost);
            if (basketItems[i].nums > 1) {
                let count = parseInt(basketItems[i].nums);
                for (let j = 0; j < count; j++) {
                    sum += itemCost;
                    numOfItems++;
                }
            } else {
                sum += itemCost;
                numOfItems++;
            }
        }
    } else {
        if (document.getElementsByClassName("checkout-button")) {
            for (let i = 0; i < checkoutButtonEl.length; i++) {
                checkoutButtonEl[i].style.display = "none";
            }
        }
    }
    if (document.getElementsByClassName("items-in-basket")) {
        for (let i = 0; i < itemsInBasketEl.length; i++) {
            itemsInBasketEl[i].innerHTML = numOfItems;
        }
    }

    if (document.getElementsByClassName("total-sum")) {
        for (let i = 0; i < totalSumEl.length; i++) {
            totalSumEl[i].innerHTML = sum + ":-";
        }
    }

    if (document.getElementById("basket")) {

        basketEl.innerHTML = "";

        if (basketItems.length > 0) {
            let sum = 0;
            let numOfItems = 0;

            for (let i = 0; i < basketItems.length; i++) {
                let itemCost = parseInt(basketItems[i].artCost);
                if (basketItems[i].nums > 1) {
                    let count = parseInt(basketItems[i].nums);
                    for (let j = 0; j < count; j++) {
                        sum += itemCost;
                        numOfItems++;
                    }
                } else {
                    sum += itemCost;
                    numOfItems++;
                }

                let newItem = document.createElement("li");

                let newItemName = document.createElement("span");
                newItemName.className = "item-text";
                let newItemNameText = document.createTextNode(basketItems[i].artName + ", ");
                newItemName.appendChild(newItemNameText);
                newItem.appendChild(newItemName);

                let newItemCount = document.createElement("span");
                newItemCount.className = "item-count";
                let newItemCountText = document.createTextNode(basketItems[i].nums + " st ");
                newItemCount.appendChild(newItemCountText);
                newItem.appendChild(newItemCount);

                let newItemCost = document.createElement("span");
                newItemCost.className = "item-cost";
                let newItemCostText = document.createTextNode(itemCost + ":-");
                newItemCost.appendChild(newItemCostText);
                newItem.appendChild(newItemCost);

                basketEl.appendChild(newItem);
            }
            let newItem = document.createElement("li");
            newItem.className = "sum";
            let newItemText = document.createTextNode("Summa: " + sum + ":-");
            newItem.appendChild(newItemText);

            basketEl.appendChild(newItem);

            if (document.getElementsByClassName("checkout-button")) {
                for (let i = 0; i < checkoutButtonEl.length; i++) {
                    checkoutButtonEl[i].style.display = "block";
                }
            }
        } else {
            basket.innerHTML = "<li>Varukorgen är tom</li>";

            if (document.getElementsByClassName("checkout-button")) {
                for (let i = 0; i < checkoutButtonEl.length; i++) {
                    checkoutButtonEl[i].style.display = "none";
                }
            }
        }
    }
}

function showSmallBasket() {
    if (document.getElementById("small-basket")) {
        var basketItems = JSON.parse(localStorage.getItem("basket"));

        if (basketItems == null) { basketItems = []; }

        if (basketItems.length > 0) {
            let sum = 0;
            let numOfItems = 0;

            for (let i = 0; i < basketItems.length; i++) {
                let itemCost = parseInt(basketItems[i].artCost);

                if (basketItems[i].nums > 1) {
                    let count = parseInt(basketItems[i].nums);
                    for (let j = 0; j < count; j++) {
                        sum += itemCost;
                        numOfItems++;
                    }
                } else {
                    sum += itemCost;
                    numOfItems++;
                }
            }
            smallBasketEl.innerHTML = numOfItems + "st, " + sum + ":-";

            if (document.getElementsByClassName("items-in-basket")) {
                for (let i = 0; i < itemsInBasketEl.length; i++) {
                    itemsInBasketEl[i].innerHTML = numOfItems;
                }
            }
        } else {
            smallBasketEl.innerHTML = "";
        }
    }
}

function showCheckout() {
    if (document.getElementById("checkout")) {
        let basketItems = JSON.parse(localStorage.getItem("basket"));
        if (basketItems == null) { basketItems = []; }

        checkoutEl.innerHTML = "";

        if (basketItems.length > 0) {
            let sum = 0;

            for (let i = 0; i < basketItems.length; i++) {
                let itemCost = parseInt(basketItems[i].artCost);
                let itemSumCost = 0;

                if (basketItems[i].nums > 1) {
                    let count = parseInt(basketItems[i].nums);
                    for (let j = 0; j < count; j++) {
                        sum += itemCost;
                        itemSumCost += itemCost;
                    }
                } else {
                    sum += itemCost;
                    itemSumCost = itemCost;
                }

                var artId = basketItems[i].artId;
                var artName = basketItems[i].artName;
                var numItems = basketItems[i].nums;
                var artImage = basketItems[i].artImage;

                checkoutEl.innerHTML += "<tr>" +
                    "<td><img src='" + artImage + "' alt='Produktbild för " + artName + "' />" +
                    "<td>" + artName + "</td>" +
                    "<td>" + numItems + " st.</td>" +
                    "<td>" + itemSumCost + ":-</td>" +
                    "</tr>";
            }

            checkoutEl.innerHTML += "<tr>" +
                "<td colspan='5' class='checkout-sum'>Summa: " + sum + ":-</td>";

        } else {
            checkoutEl.innerHTML = "<tr><td colspan='5'>Varukorgen är tom</td></tr>";
        }
    }
}

function checkoutBasket() {
    let basketItems = JSON.parse(localStorage.getItem("basket"));
    if (basketItems != null) {
        let itemCount = 0;
        let totalSum = 0;

        for (let i = 0; i < basketItems.length; i++) {
            let count = parseInt(basketItems[i].nums);
            for (let j = 0; j < count; j++) {
                totalSum += parseInt(basketItems[i].artCost);
                itemCount++;
            }
        }

        if (itemCount == 1) {
            alert("Din order är mottagen! En vara - totalsumma: " + totalSum + ":-");
        } else {
            alert("Din order är mottagen! " + itemCount + " stycken varor - totalsumma: " + totalSum + ":-");
        }

        emptyBasket(false);

    } else {
        alert("Inga varor i din varukorg!");
    }
}

function emptyBasket(conf = true) {
    if (conf == true) {
        if (confirm("Är du säker att du vill radera alla varor?")) {
            localStorage.removeItem("basket");
            showBasket();
            showSmallBasket();
            showCheckout();
        } else {
            return;
        }
    } else {
        localStorage.removeItem("basket");
        showBasket();
        showSmallBasket();
        showCheckout();
    }
}