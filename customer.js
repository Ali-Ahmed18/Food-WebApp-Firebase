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
      if(docSnap.data().type == "Vendor"){
        window.location.replace("./vendor.html")
      }else if(docSnap.data().type == "admin"){
          window.location.replace("./adminPage/admin.html")
      }
  }else{
        window.location.replace("./index.html")
  }

})
