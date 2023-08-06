import{collection, getDocs,db,updateDoc,doc,getDoc} from "../firebaseConfig.js"

const tableBody = document.getElementById("tableBody")

window.addEventListener("load",async()=>{


      const user = JSON.parse(localStorage.getItem("activeUser"))
      if(user){
        const docRef = doc(db, "users", user.user.uid);
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
            this.alert("No Such Document!")
            return
        }
          if(docSnap.data().type == "Customer"){
            window.location.replace("../customer.html")
          }else if(docSnap.data().type == "Vendor"){
              window.location.replace("../vendor.html")
          }
      }else{
            window.location.replace("../index.html")
      }


     const querySnapshot = await getDocs(collection(db, "users"));
     let index = 0
     querySnapshot.forEach((doc) => {
            const userData = doc.data()
            if(userData.type !== "admin"){
                tableBody.innerHTML+= `
                <tr>
                    <th scope="row">${++index}</th>
                    <td>${userData.fname}</td>
                    <td>${userData.lName}</td>
                    <td>${userData.email}</td>
                    <td>${userData.type}</td>
                    <td><div class="form-check form-switch">
                        <input class="form-check-input" id=${userData.id} type="checkbox" role="switch" onclick ="activity(this)"${userData.isActive ? "checked" : ""} >
                      </div></td>
                  </tr>`
            }
            
     });
})
async function activity(ele){
    const washingtonRef = doc(db, "users", ele.id);
    await updateDoc(washingtonRef, {
      isActive: ele.checked
    });
}
window.activity = activity