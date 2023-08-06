import{auth,signInWithEmailAndPassword,getDoc,doc,db} from "./firebaseConfig.js"
window.addEventListener("load",async function(){
    
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
      }else{
          window.location.replace("./customer.html")        
      }
      return
  }else{
    document.querySelector(".main").style.display = "block"

  }

})
const logInBtn = document.getElementById("logIn")
logInBtn.addEventListener("click",async function(){
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let message =  document.querySelector(".loginMessage")
  try{

    if(!email.value || !password.value){
          message.style.top = "10%"
          message.style.backgroundColor = "red"
          message.innerHTML = "Fill all the empty fields"
          setTimeout(() => {
              message.style.top = "-10%"
          }, 2000);
          email.style.border = "2px solid red"
          password.style.border = "2px solid red"
  
        return
    }
    logInBtn.style.pointerEvents = "none"
    logInBtn.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>`
      
  
        const signIn = await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
        
         const user = signIn.user;
         const docRef = doc(db, "users", user.uid);
         const docSnap = await getDoc(docRef);
         if (!docSnap.exists()) {
           alert("No such document!");
            return
         } 
         message.style.top = "10%"
          setTimeout(()=>{
            const userData = docSnap.data()
            if(userData.type == "admin"){
                 window.location.replace("./adminPage/admin.html")
            }else if(userData.type == "Customer" && userData.isActive){
                 window.location.replace("./customer.html")
            }else if(userData.type == "Vendor" && userData.isActive){
                window.location.replace("./vendor.html")
            }else{
               alert("Your Account has been disabled by admin")
               logInBtn.style.pointerEvents = "auto"
               logInBtn.innerHTML = "Signin"
               return
            }
            localStorage.setItem("activeUser",JSON.stringify(signIn))
          },1000)
       
       
       
      
  }catch(e){
    alert(e.message)
    switch (e.message){
     case "Firebase: Error (auth/user-not-found).":
       email.style.border = "2px solid red"
       password.style.border = "2px solid red"
       message.style.top = "10%"
       message.style.backgroundColor = "red"
       message.innerHTML = "User Not found"
       setTimeout(() => {
           message.style.top = "-10%"
       }, 2000);
       logInBtn.style.pointerEvents = "auto"
       logInBtn.innerHTML = "Signin"
       break
     case "Firebase: Error (auth/wrong-password).":
       email.style.border = "2px solid red"
       password.style.border = "2px solid red"
       message.style.top = "10%"
       message.style.backgroundColor = "red"
       message.innerHTML = "Wrong Password"
       setTimeout(() => {
           message.style.top = "-10%"
       }, 2000);
       logInBtn.style.pointerEvents = "auto"
       logInBtn.innerHTML = "Signin"
       break
     case "Firebase: Error (auth/invalid-email).":
       email.style.border = "2px solid red"
       password.style.border = "2px solid red"
       message.style.top = "10%"
       message.style.backgroundColor = "red"
       message.innerHTML = "Invalid Email"
       setTimeout(() => {
           message.style.top = "-10%"
       }, 2000);
       logInBtn.style.pointerEvents = "auto"
       logInBtn.innerHTML = "Signin"
    }
  }
  
})
