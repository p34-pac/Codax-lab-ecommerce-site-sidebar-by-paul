let sidebarshown = false;
let products;

// Fetch data from "data.json" using the Fetch API
fetch("data.json")
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    products = data; // Assign the retrieved data to the 'products' variable
  })
  .catch((error) => {
    console.log("Error fetching JSON data:", error); // Log any errors that occur during fetching
  });

/**
 * Appends multiple instances of content to a specified location in the document.
 * @param {string} location - The class name or selector of the target location element.
 * @param {number} amount - The number of times to repeat the content.
 * @param {string} content - The content to be appended.
 */
export function addMultiple(location, amount, content) {
  const located = document.querySelector(`.${location}`);
  located.innerHTML += content.repeat(amount);
}

/**
 * Finds a specific child element within an object based on its node name.
 * @param {Object} toLoop - The object containing child elements to iterate over.
 * @param {string} findFor - The node name to search for.
 * @returns {Element|null} - The first matching child element, or null if not found.
 */
export function childLoopFind(toLoop, findFor) {
  for (const ele of Object.values(toLoop)) {
    if (ele.nodeName === findFor) {
      return ele;
    }
  }
}


/**
 * Indicates whether the dropdown is currently open or closed.
 */
export let dropped = false;

/**
 * Toggles the visibility and styling of a dropdown element based on the provided class name.
 * @param {string} className - The class name of the dropdown element.
 * @param {HTMLElement} element - The element that triggered the dropdown.
 */
export function openDropDown(className, element) {
  const dropdown = document.querySelector(`.${className}Dropped`);
  dropdown.classList.toggle('dropped');

  for (const key in dropdown.attributes) {
    if (Object.hasOwnProperty.call(dropdown.attributes, key)) {
      const attr = dropdown.attributes[key];
      if (attr.nodeName === 'data-none') {
        dropdown.removeAttribute('data-none');
        dropdown.setAttribute('data-grid-2', '');
      } else if (attr.nodeName === 'data-grid-2') {
        dropdown.removeAttribute('data-grid-2');
        dropdown.setAttribute('data-none', '');
      }
    }
  }

  let clearTxt = document.createElement('sup');
  clearTxt.classList = 'muteWHov fz-12-px';
  clearTxt.id = 'clearTxt';
  clearTxt.textContent = 'clear';

  if (dropdown.classList.contains('dropped')) {
    const svg = childLoopFind(element.children, 'svg');
    childLoopFind(svg.children, 'path').remove();
    svg.innerHTML = '<path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />';
    dropped = true;
    element.parentElement.appendChild(clearTxt);
  } else {
    const svg = childLoopFind(element.children, 'svg');
    childLoopFind(svg.children, 'path').remove();
    svg.innerHTML = '<path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />';
    dropped = false;
    childLoopFind(element.parentElement.children, 'SUP').remove();
  }
}

/**
 * Finds the specified attribute within the attribute list of an element.
 * @param {string} attrName - The name of the attribute to search for.
 * @param {NamedNodeMap} attrList - The attribute list of the element.
 * @returns {Object|string|null} - An object containing the found attribute and its value, or a string indicating the attribute was not found, or null if an error occurred.
 */
export function findAttribute(attrName, attrList) {
  for (const attr in attrList) {
    if (Object.hasOwnProperty.call(attrList, attr)) {
      const attribute = attrList[attr];
      try {
        if (attribute.name === attrName) {
          return {
            attribute,
            attrValue: attribute.value
          };
        }
      } catch (error) {
        return `---]**${attrName}**[--- attribute not found`;
      }
    }
  }
}


/**
 * Generates the HTML markup for displaying a product card based on the provided product data.
 * @param {Object} products - The product data.
 */
export function showProduct(products) {
  const { price, productImage, productName } = products.productInfo;
  const card = `
    <div class="productCard">
      <div class="productImg">
        <img src='${productImage}'/>
      </div>
      <div class="productText">
        <div class="productName">
          <b>${productName}</b>
        </div>
        <div class="productPrice">
          <b class="mute">${price}.00$</b>
        </div>
      </div>
    </div>
  `;
  addMultiple('prod-c', 1, card);
}

/**
 * Handles the event when the sidebar is opened.
 * @param {Event} e - The event object.
 */
export function openSideBar(e) {
  const element = e.target;
  const parent = e.target.parentElement;
  const parentParent = e.target.parentElement.parentElement;
  switch (true) {
    case element.classList.contains('openSideBar'):
    case parent.classList.contains('openSideBar'):
    case parentParent.classList.contains('openSideBar'):
      document.querySelector('.sideBar').style.animationName = 'show';
      sidebarshown = true;
      break;
  }
}

/**
 * Handles the event when the sidebar is removed.
 * @param {Event} e - The event object.
 */
export function removeSideBar(e) {
  const element = e.target;
  const parent = e.target.parentElement;
  const parentParent = e.target.parentElement.parentElement;
  switch (true) {
    case element.classList.contains('remove-sidebar-menu'):
    case parent.classList.contains('remove-sidebar-menu'):
    case parentParent.classList.contains('remove-sidebar-menu'):
      document.querySelector('.sideBar').style.animationName = 'remove';
      sidebarshown = false;
      break;
  }
}

/**
 * Changes the specified attribute of all menu filter items to the new value.
 * @param {Object} element - The element containing the menu filter items.
 * @param {string} changeFrom - The attribute to be changed from.
 * @param {string} changeTo - The attribute to be changed to.
 */
function changeAttributeAll(element, changeFrom, changeTo) {
  for (const ch in element) {
    if (Object.hasOwnProperty.call(element, ch)) {
      const item = element[ch];
      for (const c in item.children) {
        if (Object.hasOwnProperty.call(item.children, c)) {
          const it = item.children[c];
          if (it.classList.contains('menuFilterItem')) {
            it.removeAttribute(changeFrom);
            it.setAttribute(changeTo, '');
          }
        }
      }
    }
  }
}


/**
 * Recursively loops through the children of an element and returns the children array.
 * @param {HTMLElement} elem - The element to loop through.
 * @returns {Array} - The array of children elements.
 */
function loopThroughBody(elem) {
  for (const key in elem) {
    if (Object.hasOwnProperty.call(elem, key)) {
      const element = elem[key];
      loopThroughBody(element.children);
      return element.children;
    }
  }
}

/**
 * Handles the click event on a target element.
 * Updates the data-selected and data-not-selected attributes of menu filter items.
 * @param {HTMLElement} eTarget - The target element that was clicked.
 */
export function clicked(eTarget) {
  for (const c in loopThroughBody(document.querySelector('.content-body').children)) {
    if (Object.hasOwnProperty.call(loopThroughBody(document.querySelector('.content-body').children), c)) {
      const it = loopThroughBody(document.querySelector('.content-body').children)[c];
      for (const cho in it.children) {
        if (Object.hasOwnProperty.call(it.children, cho)) {
          const ito = it.children[cho];
          if (ito.classList.contains('collection-menu')) {
            for (const chi in ito.children) {
              if (Object.hasOwnProperty.call(ito.children, chi)) {
                const item = ito.children[chi];
                if (item.classList.contains('menuFilterItem')) {
                  item.removeAttribute('data-selected');
                  item.setAttribute('data-not-selected', '');
                }
              }
            }
          }
        }
      }
    }
  }

  eTarget.removeAttribute('data-not-selected');
  eTarget.setAttribute('data-selected', '');
}


/**
 * Executes when the DOM content has been loaded.
 * Sets initial values and handles the display of the sidebar based on the window size.
 */
document.addEventListener('DOMContentLoaded', () => {
  const min = document.getElementById('range-min').value;
  const max = document.getElementById('range-max').value;
  const minVal = document.getElementById('min');
  const maxVal = document.getElementById('max');

  minVal.textContent = min;
  maxVal.textContent = max;

  if (window.innerWidth > 800) {
    document.querySelector('.sideBar').style.display = 'block';
    document.querySelector('.openSideBar').style.display = 'none';
  } else {
    document.querySelector('.openSideBar').style.display = 'block';
    document.querySelector('.sideBar').style.animationName = sidebarshown ? 'show' : 'remove';
  }
});

/**
 * Executes when the window is resized.
 * Handles the display of the sidebar based on the window size.
 */
window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    document.querySelector('.sideBar').style.display = 'block';
    document.querySelector('.openSideBar').style.display = 'none';
  } else {
    document.querySelector('.openSideBar').style.display = 'block';
    if (sidebarshown) {
      document.querySelector('.sideBar').style.animationName = 'show';
    } else {
      document.querySelector('.sideBar').style.animationName = 'remove';
    }
  }
});


// export function filterProduct() {
//   // Function implementation
// }

export function filterForChairDesign(switchfrom) {
  switch (switchfrom.toLowerCase()) {
    case 'all chairs':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        showProduct(product);
      });
      break;
    case 'dining chairs':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (
          product.productFeautures.type.toLowerCase() === 'chair' &&
          product.productFeautures.typeDesign.toLowerCase() === 'dining'
        ) {
          showProduct(product);
        }
      });
      break;

    case 'lounge chairs':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (
          product.productFeautures.type.toLowerCase() === 'chair' &&
          product.productFeautures.typeDesign.toLowerCase() === 'lounge'
        ) {
          showProduct(product);
        }
      });
      break;

    case 'stools and bar stools':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.type.toLowerCase() === 'stool') {
          if (
            product.productFeautures.typeDesign.toLowerCase() === 'bar' ||
            product.productFeautures.typeDesign.toLowerCase() === 'stool'
          ) {
            showProduct(product);
          }
        }
      });
      break;

    case 'ottomants and foodstools':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.type.toLowerCase() === 'stool') {
          if (
            product.productFeautures.typeDesign.toLowerCase() === 'ottomants' ||
            product.productFeautures.typeDesign.toLowerCase() === 'food'
          ) {
            showProduct(product);
          }
        }
      });
      break;

    case 'benches':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (
          product.productFeautures.type.toLowerCase() === 'bench' &&
          product.productFeautures.typeDesign.toLowerCase() === 'bench'
        ) {
          showProduct(product);
        }
      });
      break;

    case 'office chairs':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (
          product.productFeautures.type.toLowerCase() === 'chair' &&
          product.productFeautures.typeDesign.toLowerCase() === 'office'
        ) {
          showProduct(product);
        }
      });
      break;

    // case 'dining chairs':
    //   console.log('dining chairs');
    //   break;
  }
}
export function filterForChairColor(switchfrom) {
  switch (switchfrom.toLowerCase()) {
    case 'brown':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'brown') {
          showProduct(product);
        }
      });
      break;

    case 'red':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'red') {
          showProduct(product);
        }
      });
      break;

    case 'beige':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'beige') {
          showProduct(product);
        }
      });
      break;

    case 'blue':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'blue') {
          showProduct(product);
        }
      });
      break;

    case 'black':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'black') {
          showProduct(product);
        }
      });
      break;

    case 'yellow':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'yellow') {
          showProduct(product);
        }
      });
      break;

    case 'white':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'white') {
          showProduct(product);
        }
      });
      break;

    case 'orange':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'orange') {
          showProduct(product);
        }
      });
      break;

    case 'grey':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'grey') {
          showProduct(product);
        }
      });
      break;

    case 'green':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'green') {
          showProduct(product);
        }
      });
      break;

    case 'pink':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'pink') {
          showProduct(product);
        }
      });
      break;

    case 'purple':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.typeColor.toLowerCase() === 'purple') {
          showProduct(product);
        }
      });
      break;
  }
}
export function filterForChairMaterial(switchfrom) {
  switch (switchfrom.toLowerCase()) {
    case 'ash':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'ash') {
          showProduct(product);
        }
      });
      break;

    case 'beech':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'beech') {
          showProduct(product);
        }
      });
      break;

    case 'maple':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'maple') {
          showProduct(product);
        }
      });
      break;

    case 'oak':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'oak') {
          showProduct(product);
        }
      });
      break;

    case 'pine':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'pine') {
          showProduct(product);
        }
      });
      break;

    case 'walnut':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'walnut') {
          showProduct(product);
        }
      });
      break;

    case 'metal':
      document.querySelector('.prod-c').innerHTML = '';
      products.forEach((product) => {
        if (product.productFeautures.material.toLowerCase() === 'metal') {
          showProduct(product);
        }
      });
      break;
  }
}
export function filterPrice(minPrice, maxPrice) {
  document.querySelector('.prod-c').innerHTML = '';
  products.forEach((product) => {
    const productPrice = product.productFeautures.price;
    if (productPrice >= minPrice && productPrice <= maxPrice) {
      showProduct(product);
    }
  });
}