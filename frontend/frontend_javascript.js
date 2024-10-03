document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById("button");
    const viewButton = document.getElementById("viewButton");
    const usersBox = document.getElementById("usersBox");
    const nameTag = document.getElementById("name");
    const emailTag = document.getElementById("email");
    const ageTag = document.getElementById("age");

    const register = async () => {
        try {
            const response = await fetch("http://localhost:7000/add_user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: nameTag.value,
                    email: emailTag.value,
                    age: ageTag.value,
                })
            })
            
            if (response.status !== 201)
                throw new Error();

            const res = await response.json();
            nameTag.value = "";
            ageTag.value= "";
            emailTag.value = "";
        }
        catch (error) {
            alert("Some Error Popped out oopss....");
        }
    }

    const getUsers = async () => {
        try {
            const response = await fetch("http://localhost:7000/get_users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (response.status !== 200)
                throw new Error();

            const res = await response.json();
            users = res.users;
            usersBox.innerHTML = "";
            if (users.length === 0){
                const h1tag = document.createElement("h1");
                h1tag.style.textAlign = "center";
                h1tag.innerText = "No Users";
                usersBox.appendChild(h1tag);
            }
            else{
                users.map((item) => {
                    const parentdiv = document.createElement("div");
                    parentdiv.style.display = "flex";
                    parentdiv.style.alignItems = "center";
                    parentdiv.style.justifyContent = "space-evenly";
                    parentdiv.style.margin = '30px 0px';

                    const namep = document.createElement("p");
                    namep.innerText = item.name;

                    const emailp = document.createElement("p");
                    emailp.innerText = item.email;

                    const agep = document.createElement("p");
                    agep.innerText = item.age;

                    parentdiv.appendChild(namep);
                    parentdiv.appendChild(emailp);
                    parentdiv.appendChild(agep);

                    usersBox.appendChild(parentdiv);
                })
            }
            
        }
        catch (error) {
            alert("Some Error Popped out oopss....");
        }
    }

    button.addEventListener("click", () => {
        if (!Boolean(nameTag.value) || !Boolean(emailTag.value) || !Boolean(ageTag.value)){
            alert("please enter values");
            return;
        }
        register();
    })

    viewButton.addEventListener("click", () => {
        getUsers();
    })

})