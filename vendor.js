import{doc,getDoc,db,ref, uploadBytesResumable, getDownloadURL, addDoc, collection, storage, serverTimestamp,getDocs}from "./firebaseConfig.js"
let activeUser ;


const uploadImg = (ele)=>{
  return new Promise((resolve,reject)=>{
    const file = ele
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        reject(error)
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        });
      }
    );
  })  
}




const card = (title,description,price,productPic)=>{
  
    const parent = document.querySelector(".FoodListParent")
      const cardWraper = `<div class="card" >
      <img src="${productPic}" class="card-img-top">
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-text">${description}</p>
        <h5 class="fw-bold">${parseInt(price)}Rs</h5>
        <a href="#" class="btn btn-primary">Order Now</a>
      </div>
    </div>`
    parent.innerHTML += cardWraper
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
    activeUser = docSnap.data()
    const {fname,lName} = docSnap.data()
    document.title = `WELCOME-${fname.toUpperCase()} ${lName.toUpperCase()}`
      if(docSnap.data().type == "Customer"){
        window.location.replace("./customer.html")
      }else if(docSnap.data().type == "admin"){
          window.location.replace("./adminPage/admin.html")
      }
               const querySnapshot = await getDocs(collection(db, "Foods"));
         querySnapshot.forEach((doc) => {
           if(doc.data().authorId == activeUser.id){
             const {title,description,price,productPic,type} = doc.data()
             card(title,description,price,productPic,type)
           }
         });
         
      document.querySelector(".main").style.display = "block"
  }else{
        window.location.replace("./index.html")
  }

})

const addProduct = async (e)=>{
    e.preventDefault()
  try{
    let title = document.getElementById("title")
    let description = document.getElementById("description")
    let price = document.getElementById("price")
    let foodType = document.getElementById("foodType")
    let productImg = document.getElementById("productImg")
    const file = productImg.files[0]
    
    if(!title.value || !description.value || !price.value || !file || foodType.selectedIndex == 0){
           alert("Fill all the Fields")
             return
    }
      const productPic = await uploadImg(file)
      const docRef = await addDoc(collection(db, "Foods"), {
        title :title.value,
        description:description.value,
        price:price.value,
        productPic,
        authorId: activeUser.id,
        foodType: foodType.value,
        time:serverTimestamp()
      });
      card(title.value,description.value,price.value,productPic)
      title.value = ""
      description.value = ""
      price.value = ""
      foodType.selectedIndex = 0
  }catch(e){
          console.log(e.message);
  }

}
const logInBtn = document.getElementById("logIn")
logInBtn.addEventListener("click",addProduct)




const logOutBtn = document.getElementById("logOut")
logOutBtn.addEventListener("click",()=>{
      localStorage.removeItem("activeUser")
      window.location.replace("./index.html")
})