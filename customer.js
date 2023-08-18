import{doc,getDoc,db,getDocs,collection}from "./firebaseConfig.js"
const arr = []
const FoodListParent = document.querySelector(".FoodListParent")



const card = (title,description,price,productPic)=>{
    return`<div class="card" >
    <img src="${productPic}" class="card-img-top">
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-text">${description}</p>
      <h5 class="fw-bold">${parseInt(price)}Rs</h5>
      <a href="#" class="btn btn-primary">Order Now</a>
    </div>
  </div>`
  
}



window.addEventListener("load",async ()=>{
    const user = JSON.parse(localStorage.getItem("activeUser"))
    
  if(user){
 
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()){
        this.alert("No Such Document!")
        return
    }
      if(docSnap.data().type == "Vendor"){
        window.location.replace("./vendor.html")
      }else if(docSnap.data().type == "admin"){
          window.location.replace("./adminPage/admin.html")
      }
    
      const querySnapshot = await getDocs(collection(db, "Foods"));
      querySnapshot.forEach((doc) => {
              arr.push(doc.data())
         });
         const fooddata =  arr.map((ele)=>{
          const {title,description,price,productPic,type,authorId} = ele
          return card(title,description,price,productPic,type,authorId)
         }).join("")
        FoodListParent.innerHTML = fooddata
         document.querySelector(".main").style.display = "block"
  }else{
        window.location.replace("./index.html")
  }

})

let btns = document.querySelectorAll(".customLink")
btns.forEach((ele)=>{
  ele.addEventListener("click",buttonHandler)  

})

function buttonHandler(e){
  btns.forEach((btn)=>{
       btn.classList.remove("active")
  })
  e.target.classList.add("active")
    const element = e.target.innerHTML
      if(element == "ALL"){
       const foodData = arr.map((ele)=>{
          const {title,price,description,productPic} = ele
          return card(title,description,price,productPic)
        }).join("")
        FoodListParent.innerHTML = foodData
      }else{
        const filterData = arr.filter(ele=> ele.foodType == element).map((ele)=>{
                const {title,price,description,productPic} = ele
                return card(title,description,price,productPic)
        }).join("")
        filterData ? FoodListParent.innerHTML = filterData : FoodListParent.innerHTML = `<h1 class="text-white">No ${element}</h1>`
        
      }
     
}


const logOutBtn = document.getElementById("logOut")
logOutBtn.addEventListener("click",()=>{
      localStorage.removeItem("activeUser")
      window.location.replace("./index.html")
})