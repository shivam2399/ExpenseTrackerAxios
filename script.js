const expense=document.getElementById('expenseamount');
const description=document.getElementById('description');
const category=document.getElementById('category');
const form=document.getElementById('form');
form.addEventListener('submit', storeCrud);
//this will store all data to local storage;

function storeCrud(e){
    e.preventDefault();
let details={
expense:expense.value,
description:description.value,
category:category.value

}
axios.post('https://crudcrud.com/api/21aac1cec1814919925dadcf36557a93/expenses',details).then(res=>{
    showData(res.data);//show data on screen
}).catch(err=>{
    console.log(err);
})
}
function showData(details) //show detail on screen
{
    
    const parentNode=document.getElementById('listdetails') 
    const childHTML=`<li id=${details._id}> ${details.expense} - ${details.description} - ${details.category} 
     <button onclick=deleteDetails('${details._id}')>DELETE</button>
    <button onclick=editDetails('${details._id}','${details.expense}','${details.description}','${details.category}')>EDIT  </button></li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML
    // for clear inputs
    expense.value="";
    description.value="";
}
function deleteDetails(key)
{
    axios.delete(`https://crudcrud.com/api/21aac1cec1814919925dadcf36557a93/expenses/${key}`).then(res=>{
        removeFromScreen(key)
    })
    
    
    
}
function removeFromScreen(id){
const parentNode=document.getElementById('listdetails');
const childNode=document.getElementById(id)
parentNode.removeChild(childNode)
}
function editDetails(key,ex,des,cat)
{
    expense.value=ex;
    description.value=des;
    category.value=cat;
    deleteDetails(key)
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/21aac1cec1814919925dadcf36557a93/expenses').then(res=>{
        for(let i=0;i<res.data.length;i++){
            showData(res.data[i])
        }
    })
})