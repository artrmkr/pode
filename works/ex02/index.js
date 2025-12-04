let currentIndex = 0;
const menuitems = document.querySelectorAll(".menu-item");
const max_itemIndex = menuitems.length;
console.log(`max menu index : ${max_itemIndex}`);

console.log(menuitems);

menuitems[currentIndex].classList.add("select");

window.addEventListener("keydown", (e) => {

    
    if(e.key == "ArrowUp") {
        menuitems[currentIndex].classList.remove('select'); 
        console.log('up');
        currentIndex--;
        if(currentIndex < 0) {
            currentIndex = max_itemIndex - 1; 
        }
    }

    
    else if(e.key == "ArrowDown") {
        menuitems[currentIndex].classList.remove('select'); 
        console.log('down');
        currentIndex++;
        currentIndex %= max_itemIndex; 
    }

});