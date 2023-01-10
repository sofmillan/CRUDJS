import { products } from "../data/data.js";

let selectedrow = null;
const tbody = document.getElementById("table-body");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let amount = document.querySelector("#amount");
let category = document.querySelector("#category");
const form = document.querySelector("#formulario");
let targetName = "";

const listar = (lista, contenedor) => {
  contenedor.innerHTML = "";
  lista.forEach((product) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.amount}</td>
        <td>${product.category}</td>
        <td><button class="delete" name="${product.name}">Eliminar</button>
            <button class="edit" name="${product.name}">Editar</button></td>
        `;
    contenedor.appendChild(row);
    selectedrow = null;
    
  });
};
listar(products, tbody);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { target } = event;
 
  const valuesForm = Object.values(form);
  
    if (selectedrow == null) {
     // console.log(valuesForm);
      const newProduct = {};
  
      valuesForm.forEach((valueInput) => {
        if (valueInput.id) {
          newProduct[valueInput.id] = valueInput.value;
       //   console.log(valueInput);
        }
      });
      products.push(newProduct);
   
      valuesForm.forEach((input) => {
        if (input.id) {
          input.value = "";
        }
      });
      console.log(products)
      listar(products, tbody);
    } else {
     
      products.forEach((p)=>{
          if(targetName==p.name){
              p.name=name.value;
              p.price=price.value;
              p.amount=amount.value;
              p.category=category.value;
          }
      })
      // selectedrow.children[0].textContent = name.value;
  
      name.value="";
      price.value="";
      category.value="";
      amount.value="";
      
      listar(products, tbody);
  console.log(products)
  }
});

document.addEventListener("click", (event) => {
  const { target } = event;

  if (target.classList.contains("delete")) {
    const confirmDelete = confirm(`¿Está seguro de eliminar ${target.name}?`);
    if (confirmDelete) {
      const productName = target.name;
      const positionProduct = products.findIndex(
        (product) => product.name === productName
      );
      products.splice(positionProduct, 1);
      console.log(products)

      listar(products, tbody);
    }
  }

  if (target.classList.contains("edit")) {
    selectedrow = target.parentElement.parentElement;
    document.querySelector("#name").value = selectedrow.children[0].textContent;
    document.querySelector("#price").value =
      selectedrow.children[1].textContent;
    document.querySelector("#amount").value =
      selectedrow.children[2].textContent;
    document.querySelector("#category").value =
      selectedrow.children[3].textContent;
   // console.log(target);
    targetName = target.name;
  //  console.log(guard);

  }
});
