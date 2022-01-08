import "./scss/main.scss"
import items from "./magic_items.json"

const table = document.getElementById("allItemsTable");
const tblBody = table.getElementsByTagName('tbody')[0];
let tableHeadersText = [];
for (let element of table.getElementsByTagName("th")) {
    tableHeadersText.push(element.innerText);
}

function displayItems(sort, order){
    console.log(sort, order)
    let sortedItems = items.sort((a, b) => {
        if (order === "desc"){
            return a[sort] > b[sort];
        } else {
            return b[sort] > a[sort];
        }
    });
    sortedItems.forEach(item => {
        let newRow = document.createElement("tr");
        tableHeadersText.forEach(property => {
            let cell = document.createElement("td");
            let value = `${item[property]}`;
            value = value.charAt(0).toUpperCase() + value.slice(1);
            if (property === "Rarity"){
                cell.classList.add("rarity");
                cell.classList.add("rarity--" + value.toLowerCase().replace(/\s/g, ''));
            }
            let cellText = document.createTextNode(value);
            cell.appendChild(cellText);
            newRow.appendChild(cell);
        });
        tblBody.appendChild(newRow);
    })
    
}

displayItems("Name", "desc");

const filter = document.getElementById("filter");
filter.addEventListener("change", function(){
    const filterSelected = filter.value;
    let sort = filterSelected.split("-")[0];
    sort = sort.replace(/_/g, ' ');
    const words = sort.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    sort = words.join(" ");
    let order = filterSelected.split("-")[1];
    tblBody.innerHTML = "";
    displayItems(sort, order);
});