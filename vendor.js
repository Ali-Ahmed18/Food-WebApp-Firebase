import{doc,getDoc,db}from "./firebaseConfig.js"
window.addEventListener("load",async ()=>{
    const user = JSON.parse(localStorage.getItem("activeUser"))
  if(user){
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()){
        this.alert("No Such Document!")
        return
    }

    const {fname,lName} = docSnap.data()
    document.title = `WELCOME-${fname.toUpperCase()} ${lName.toUpperCase()}`
      if(docSnap.data().type == "Customer"){
        window.location.replace("./customer.html")
      }else if(docSnap.data().type == "admin"){
          window.location.replace("./adminPage/admin.html")
      }
  }else{
        window.location.replace("./index.html")
  }

})

function addProduct(){
 const title = document.getElementById("title")
 const description = document.getElementById("description")
 const price = document.getElementById("price")
 const productImg = document.getElementById("productImg")
}
