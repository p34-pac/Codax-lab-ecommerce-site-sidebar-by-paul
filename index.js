import {clicked, filterForChairColor, filterForChairDesign, filterForChairMaterial, findAttribute, openDropDown, openSideBar, removeSideBar, showProduct} from "./module1.js";
import  { fontSize, marginBottom, marginLeft, marginRight, marginTop, space } from "./styling.module.js";
let bdych = document.body.children;
let products;
// Fetches data from the "data.json" file
await fetch("data.json")
  .then((response) => response.json())  // Converts the response to JSON format
  .then((data) => {
    products = data;  // Assigns the retrieved data to the "products" variable
  })
  .catch((error) => {
    console.log("Error fetching JSON data:", error);  // Logs an error message if fetching data fails
});

products.forEach(product => {
  showProduct(product);  // Calls the "showProduct" function for each product in the "products" array
});

for (const ch in bdych) {
  if (Object.hasOwnProperty.call(bdych, ch)) {
    const wholeItemsInBody = bdych[ch];
    fontSize(wholeItemsInBody);  // Applies font size styling to all item in the specified elements
    marginBottom(wholeItemsInBody);  // Applies margin-bottom styling to all item in the specified elements
    marginLeft(wholeItemsInBody);  // Applies margin-left styling to all item in the specified elements
    marginRight(wholeItemsInBody);  // Applies margin-right styling to all item in the specified elements
    marginTop(wholeItemsInBody);  // Applies margin-top styling to all item in the specified elements
    space(document.querySelector('.sideBar'), 'muteWHov');  // Applies space styling to all item in the specified element with class 'sideBar'
  }
}

const rangeInput = document.querySelectorAll(".range-input input");  // Selects all input elements with class "range-input"
const priceInput = document.querySelectorAll(".price-input input");  // Selects all input elements with class "price-input"
const range = document.querySelector(".slider .progress");  // Selects the element with class "slider" and descendant with class "progress"
let priceGap = 1;  // Initializes the variable "priceGap" with a value of 1
const min = document.getElementById('min');  // Selects the element with id "min"
const max = document.getElementById('max');  // Selects the element with id "max"
const rangeMin = document.getElementById('range-min');  // Selects the element with id "range-min"
const rangeMax = document.getElementById('range-max');  // Selects the element with id "range-max"

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);  // Parses the value of the first range input element as an integer
    let maxVal = parseInt(rangeInput[1].value);  // Parses the value of the second range input element as an integer
    min.textContent = minVal;  // Updates the text content of the element with id "min" with the minimum value
    max.textContent = maxVal;  // Updates the text content of the element with id "max" with the maximum value
    rangeMin.max = maxVal - 100;  // Sets the maximum value of the element with id "range-min" as the difference between maxVal and 100

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;  // Updates the value of the first range input element with the adjusted maximum value
      } else {
        rangeInput[1].value = minVal + priceGap;  // Updates the value of the second range input element with the adjusted minimum value
      }
    } else {
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";  // Adjusts the left position of the range element based on the minimum value
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";  // Adjusts the right position of the range element based on the maximum value
    }
  });
});

// Add click event listener to the document body to listen for the dropdown menu clicked
document.body.addEventListener('click', ({ target }) => {
  const { classList } = target;  // Extracts the classList property from the target element
  const { parentElement } = target;  // Extracts the parentElement property from the target element
  const { parentElement: parentParentElement } = parentElement;  // Extracts the parentElement property from the parentElement
  let eClass = '';

  switch (true) {
    case classList.contains('toggleDropDown'):
      eClass = classList[1];  // Sets eClass to the second class name in the classList array of the target element
      openDropDown(eClass, target);  // Calls the openDropDown function with eClass and the target element as arguments
      break;
    case parentElement.classList.contains('toggleDropDown'):
      eClass = parentElement.classList[2];  // Sets eClass to the third class name in the classList array of the parentElement
      openDropDown(eClass, parentElement);  // Calls the openDropDown function with eClass and the parentElement as arguments
      break;
    case parentParentElement.classList.contains('toggleDropDown'):
      eClass = parentParentElement.classList[2];  // Sets eClass to the third class name in the classList array of the parentParentElement
      openDropDown(eClass, parentParentElement);  // Calls the openDropDown function with eClass and the parentParentElement as arguments
      break;
  }
});

// Add event listener to the element with class 'remove-sidebar-menu'
document.querySelector('.remove-sidebar-menu').addEventListener('click', (e) => {
  removeSideBar(e); // Call the 'removeSideBar' function when the element is clicked
});

// Add event listener to the element with class 'openSideBar'
document.querySelector('.openSideBar').addEventListener('click', (e) => {
  openSideBar(e); // Call the 'openSideBar' function when the element is clicked
});

// Check if the device is iPhone
if (navigator.platform.includes('iPhone')) {
  // Set the text content of the element with class 'platform' to the platform value
  document.querySelector('.platform').textContent = navigator.platform;
  // Set the margin of the elements with class 'product-card' to '5px'
  document.querySelector('.product-card').style.margin = '5px';
}

// Add click event listener to the document body
document.body.addEventListener("click", (e) => {
  // Find attribute with name 'data-filter' in the target element's attributes
  let findForFilter = findAttribute('data-filter', e.target.attributes);
  // If 'data-filter' attribute is found
  if (findForFilter) {
    clicked(e.target); // Call the 'clicked' function with the target element
    filterForChairDesign(findForFilter.attrValue); // Call the 'filterForChairDesign' function with the attribute value
    filterForChairColor(findForFilter.attrValue); // Call the 'filterForChairColor' function with the attribute value
    filterForChairMaterial(findForFilter.attrValue); // Call the 'filterForChairMaterial' function with the attribute value
  }
});


// Add click event listener to the element with id 'filterPrice' to listen for changed price and to filter product
document.getElementById('filterPrice').addEventListener('click', () => {
  // Get the values of min and max from the range inputs
  let min = document.getElementById('range-min').value;
  let max = document.getElementById('range-max').value;
  // Clear the innerHTML of the element with class 'prod-c'
  document.querySelector('.prod-c').innerHTML = '';

  // Filter the products array based on the price range
  products.filter(product => product.productInfo.price >= min && product.productInfo.price <= max)
    .forEach(product => {
      showProduct(product); // Call the 'showProduct' function with each filtered product
    });
});
