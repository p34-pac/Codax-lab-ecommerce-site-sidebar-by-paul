import { products } from "./dummyData.js";
let bdych = document.body.children;

// import { products } from "./dummyData.js";
let sidebarshown = false;

export function addMultiple(location, amount, content){
    let located = document.querySelector(`.${location}`);

    while(amount > 0){
        located.innerHTML += `${content}`;

        amount--
    }
}
export function childLoopFind(toLoop, findFor){
    for (const cho in toLoop) {
        if (Object.hasOwnProperty.call(toLoop, cho)) {
            const ele = toLoop[cho];
            if(ele.nodeName == `${findFor}`){
                return ele;
            }
        }
    }
  }
export var dropped = false;
export function openDropDown(className, element){
    document.querySelector(`.${className}Dropped`).classList.toggle(`dropped`);
  // if(document.querySelector(`.${className}Dropped`).attributes){

  // }
  for (const key in document.querySelector(`.${className}Dropped`).attributes) {
    if (Object.hasOwnProperty.call(document.querySelector(`.${className}Dropped`).attributes, key)) {
      const element = document.querySelector(`.${className}Dropped`).attributes[key];
      if(element.nodeName == 'data-none'){
        document.querySelector(`.${className}Dropped`).removeAttribute('data-none')
        document.querySelector(`.${className}Dropped`).setAttribute('data-grid-2', '')
      }else if(element.nodeName == 'data-grid-2'){
        document.querySelector(`.${className}Dropped`).removeAttribute('data-grid-2')
        document.querySelector(`.${className}Dropped`).setAttribute('data-none', '')
      }
    }
  }
  

    let clearTxt = document.createElement('sup');
        clearTxt.classList = 'muteWHov fz-12-px';
        clearTxt.id = 'clearTxt';
        clearTxt.textContent = 'clear'

    if(document.querySelector(`.${className}Dropped`).classList.contains('dropped')){
        let svg = childLoopFind(element.children, 'svg')
        childLoopFind(svg.children, 'path').remove()
        svg.innerHTML = `
          <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/>
        `;
        dropped = true
        
        element.parentElement.appendChild(clearTxt);


    }else{

        let svg = childLoopFind(element.children, 'svg')
                childLoopFind(svg.children, 'path').remove()
                svg.innerHTML = `
                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                `;
        dropped = false
        childLoopFind(element.parentElement.children, 'SUP').remove()

    }
  }

export function findAttribute(attrName, attrList){
    for (const attr in attrList) {
        if (Object.hasOwnProperty.call(attrList, attr)) {
            const attribute = attrList[attr];
            try {
                if(attribute.name == attrName){
                    return{
                        attribute,
                        attrValue: attribute.value
                    }
                    
                }
            } catch (error) {
                return(`---]**${attrName}**[--- attribute not found`)
            }
        }
    }
    
  }

  export function showProduct(products){
        let {price, productImage, productName} = products.productInfo
        let card = `
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
    
    addMultiple('prod-c', 1, card)
  }

  export function openSideBar(e){
    let element = e.target;
    let parent = e.target.parentElement;
    let parentParent = e.target.parentElement.parentElement;
    switch(true){
      case element.classList.contains('openSideBar'):
        document.querySelector(`.sideBar`).style.animationName = 'show'
        sidebarshown = true
        break;
      case parent.classList.contains('openSideBar'):
        document.querySelector(`.sideBar`).style.animationName = 'show'
        sidebarshown = true
        break;
      case parentParent.classList.contains('openSideBar'):
        document.querySelector(`.sideBar`).style.animationName = 'show'
        sidebarshown = true
        break;
    }
  }

export function removeSideBar(e){
    let element = e.target;
  let parent = e.target.parentElement;
  let parentParent = e.target.parentElement.parentElement;
  switch(true){
    case element.classList.contains('remove-sidebar-menu'):
      document.querySelector(`.sideBar`).style.animationName = 'remove'
      sidebarshown = false
      break;
    case parent.classList.contains('remove-sidebar-menu'):
      document.querySelector(`.sideBar`).style.animationName = 'remove'
      sidebarshown = false
      break;
    case parentParent.classList.contains('remove-sidebar-menu'):
      document.querySelector(`.sideBar`).style.animationName = 'remove'
      sidebarshown = false
      break;
  }
}
function changeAttributeAll(element, changeFrom, changeTO){
  
  for (const ch in element) {
    if (Object.hasOwnProperty.call(element, ch)) {
        const item = element[ch];
        for (const c in item.children) {
          if (Object.hasOwnProperty.call(item.children, c)) {
              const it = item.children[c];

              if(it.classList.contains('menuFilterItem')){
                it.removeAttribute(`${changeFrom}`)
                it.setAttribute(changeTO, '')
                // changeAttributeAll(item.children)
              }
          }
      }
      
        
    }
}
}

function loopTruBody(elem){
  for (const key in elem) {
    if (Object.hasOwnProperty.call(elem, key)) {
      const element = elem[key];
      loopTruBody(element.children)
      return element.children
    }
  }
}
// muteWHov menuFilterItem
export function clicked(eTarget){
      for (const c in loopTruBody(document.querySelector('.content-body').children)) {
          if (Object.hasOwnProperty.call(loopTruBody(document.querySelector('.content-body').children), c)) {
              const it = loopTruBody(document.querySelector('.content-body').children)[c];
                // console.log(it)
                

                for (const cho in it.children) {
                  if (Object.hasOwnProperty.call(it.children, cho)) {
                      const ito = it.children[cho];
                        
                        if(ito.classList.contains('collection-menu')){

                          for (const chi in ito.children) {
                            if (Object.hasOwnProperty.call(ito.children, chi)) {
                                const item = ito.children[chi];                                  
                                if(item.classList.contains('menuFilterItem')){
                                  item.removeAttribute('data-selected')
                                  item.setAttribute('data-not-selected', '')
                                
                                }
                            }
                        }
                        }
                  }
              }
          }
      }

      eTarget.removeAttribute('data-not-selected')
      eTarget.setAttribute('data-selected', '')



}
document.addEventListener('DOMContentLoaded', ()=>{
  let min = document.getElementById('range-min').value,
  max = document.getElementById('range-max').value,
  minVal = document.getElementById('min'),
  maxVal = document.getElementById('max');

  minVal.textContent = min;
  maxVal.textContent = max;


    if(window.innerWidth> 800){
      document.querySelector(`.sideBar`).style.display = 'block';
      document.querySelector(`.openSideBar`).style.display = 'none';
  
    }else{
      document.querySelector(`.openSideBar`).style.display = 'block';
      if(sidebarshown){
        document.querySelector(`.sideBar`).style.animationName = 'show'
      }else{
        document.querySelector(`.sideBar`).style.animationName = 'remove'
      }
    }

  })

window.addEventListener('resize', ()=>{
    if(window.innerWidth> 800){
      document.querySelector(`.sideBar`).style.display = 'block';
      document.querySelector(`.openSideBar`).style.display = 'none';
  
    }else{
      document.querySelector(`.openSideBar`).style.display = 'block';
      if(sidebarshown){
        document.querySelector(`.sideBar`).style.animationName = 'show'
      }else{
        document.querySelector(`.sideBar`).style.animationName = 'remove'
      }
    }
  });

//   export function filterProduct(){

//   }

// export 

export function filterForChairDesign(switchfrom){
    switch(switchfrom.toLowerCase()){
      case 'all chairs':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
                showProduct(product)
          })
          break;
        case 'dining chairs':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'chair' && product.productFeautures.typeDesign.toLowerCase() == 'dining'){
                showProduct(product)
                
            }
          })
          break;
  
        case 'lounge chairs':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'chair' && product.productFeautures.typeDesign.toLowerCase() == 'lounge'){
                showProduct(product)
                
            }
          })
          break;
      
        case 'stools and bar stools':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'stool' ){
              if(product.productFeautures.typeDesign.toLowerCase() == 'bar'){
                showProduct(product)
                
              }else if(product.productFeautures.typeDesign.toLowerCase() == 'stool'){
                showProduct(product)
                
              }
            }
          })
          break;
          
        case 'ottomants and foodstools':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'stool' ){
              if(product.productFeautures.typeDesign.toLowerCase() == 'ottomants'){
                showProduct(product)
                
              }else if(product.productFeautures.typeDesign.toLowerCase() == 'food'){
                showProduct(product)
                
              }
            }
          })
          break;
  
        case 'benches':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'bench' && product.productFeautures.typeDesign.toLowerCase() == 'bench'){
                showProduct(product)
                
            }
          })
          break;
  
        case 'office chairs':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if(product.productFeautures.type.toLowerCase() == 'chair' && product.productFeautures.typeDesign.toLowerCase() == 'office'){
                showProduct(product)
                
            }
          })
          break;
  
        case 'dining chairs':
          // console.log('dining chairs');
          break;
      }
}
export function filterForChairColor(switchfrom){
    
    switch(switchfrom.toLowerCase()){
        case 'brown':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if( product.productFeautures.typeColor.toLowerCase() == 'brown'){
                showProduct(product)
                
            }
          })
          break;
  
        case 'red':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'red'){
                    showProduct(product)
                    
                }
            })
          break;
      
        case 'beige':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'beige'){
                    showProduct(product)
                    
                }
            })
          break;
          
        case 'blue':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'blue'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'black':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'black'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'yellow':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'yellow'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'white':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'white'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'orange':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'orange'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'grey':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'grey'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'green':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'green'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'pink':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'pink'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'purple':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.typeColor.toLowerCase() == 'purple'){
                    showProduct(product)
                }
            })
          break;

      }
}
export function filterForChairMaterial(switchfrom){
    
    switch(switchfrom.toLowerCase()){
        case 'ash':
          document.querySelector('.prod-c').innerHTML = ''
          products.forEach(product => {
            if( product.productFeautures.material.toLowerCase() == 'ash'){
                showProduct(product)
                
            }
          })
          break;
  
        case 'beech':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'beech'){
                    showProduct(product)
                    
                }
            })
          break;
      
        case 'maple':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'maple'){
                    showProduct(product)
                    
                }
            })
          break;
          
        case 'oak':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'oak'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'pine':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'pine'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'walnut':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'walnut'){
                    showProduct(product)
                    
                }
            })
          break;
        case 'metal':
            document.querySelector('.prod-c').innerHTML = ''
            products.forEach(product => {
                if( product.productFeautures.material.toLowerCase() == 'metal'){
                    showProduct(product)
                    
                }
            })
          break;
      }
}
export function filterPrice(){

}