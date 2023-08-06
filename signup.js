import{auth,createUserWithEmailAndPassword,db,doc,setDoc,getDoc} from "./firebaseConfig.js"

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
      this.document.querySelector(".main").style.display = "block"
  }
})

const signUpBtn = document.getElementById("signUp")
signUpBtn.addEventListener("click",function(){
  signUpBtn.style.pointerEvents = "none"
  signUpBtn.innerHTML =`<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>`
    let fname = document.getElementById("fName").value
    let lName = document.getElementById("lName").value
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    let selectBox = document.getElementById("selectBox")

    if(!fname || !lName || !email.value || !password.value){
            alert("Fill all the Required Fields")
            signUpBtn.style.pointerEvents = "auto"
          signUpBtn.innerHTML = "Signup"

            return
    }
    if(selectBox.selectedIndex === 0){
        alert("Please Select User Type")
        signUpBtn.style.pointerEvents = "auto"
        signUpBtn.innerHTML = "Signup"
        return
    }


    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userCredential) => {
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
       fname,
       lName,
       email,
       password,
       id : user.uid,
       type:selectBox.value,
       isActive : true
      });
      alert("user Successfully Signup!")
    })
    .catch((e) => {
      alert(e.message)
      switch (e.message){
        case "Firebase: Error (auth/email-already-in-use).":
          email.style.border = "2px solid red"
          alert("email-already-in-use")
          signUpBtn.innerHTML = "Signup"
          signUpBtn.style.pointerEvents = "auto"
          break

        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          password.style.border = "2px solid red"
          alert("Password should be at least 6 characters")
          signUpBtn.innerHTML = "Signup"
          signUpBtn.style.pointerEvents = "auto"
          break
        case "Firebase: Error (auth/invalid-email).":
          email.style.border = "2px solid red"
          alert("invalid-email")
          signUpBtn.innerHTML = "Signup"
          signUpBtn.style.pointerEvents = "auto"
          break
       }
    });
  

})