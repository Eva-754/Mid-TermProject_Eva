// getting all the elements from the HTML file and naming inventory, image hover, and currentScene
const p1 = document.getElementById("paragraph1");
const p2 = document.getElementById("paragraph2");
const p3 = document.getElementById("paragraph3");


const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");

const image = document.getElementById("image");
const image2 = document.getElementById("image2");

const hover = document.getElementById("hover");

const secret_code = document.getElementById("secret_code");
const try_code = document.getElementById("try_code");
const submit = document.getElementById("submit");

const inventoryList = document.getElementById("inventoryList");

let inventory = [];
let showhover = false;
let hasKey = false;

//image hovering 
image.addEventListener("mouseover", (event) => {

    if (showhover) {
        hover.style.display = "block";
        hover.style.left = event.pageX + "px";
        hover.style.top = event.pageY + "px";
    }
});

// hide tooltip when leaving
image.addEventListener("mouseout", () => {
    hover.style.display = "none";
});

//FUNCTION #1
function showScene(text1, text2, text3, imageName, imageName2, btn1Text, btn2Text){
    try {
        // Update story text
        p1.textContent = text1;
        p2.textContent = text2;
        p3.textContent = text3;

        // Update image
        image.src = "images/" + imageName;
        if(imageName2){
            image2.src = "images/" + imageName2;
            image2.style.display = "inline";
        } else {
            image2.style.display = "none";
        }

        // Update button text
        option1.textContent = btn1Text;
        option2.textContent = btn2Text;
        } catch(err) {
            alert("An unexpected error occured, please refresh to try again")
        }
        
}

//FUNCTION #2
function changeImage(file){
    image.src = "images/" + file;
}

//FUNCTION #3
function addToInventory(item){
    //checking if item is already in inventory
    if(inventory.includes(item)){
        return;
    }

    inventory.push(item);

    const li = document.createElement("li");
    li.textContent = item;
    inventoryList.appendChild(li);
}

// check code
// FUNCTION #4
function checkCode(){
    try {
        //using regex to check code is only numbers
        if (!/^\d+$/.test(try_code.value)) {
            throw new Error("Enter only numbers!");
        }
        if(try_code.value === "9999"){
        alert("Correct!");
        hasKey = true;
        addToInventory("Key");
        secret_code.style.display = "none";
        showScene("You finally did it!", "You find a pot of gold!", "GREAT WORK!!", "scene14.webp", null, null, null);
    } else {
        alert("Wrong code!");
        showScene("You could not unlock the door.", "The floor starts to become hollow, a whirlpool starts to emerge", "You have failed to escape", "scene 13.jpg", null, null, null);
    }
    } catch(err) {
        alert(err.message)
    }
    
}

//FUNCTION #5
// reviewing inventory
function reviewInventory(){
    for(let i = 0; i < inventory.length; i++){
        console.log(inventory[i]);
    }
}

// STARTING OPTIONS
//// ENTER WAREHOUSE ///////////
option1.addEventListener("click", () => {
    showhover = false;
    showScene("You see some crates and a long hallway", 
            "Do you chose to go through the long hallway", 
            "Or fiddle around and find something useful in the crates?", 
            "scene 4.jpg", "scene 5.jpg", "Crates", "Hallway");

/////////////////////// INSIDE CRATES OPTIONS ///////////////////////

    // INSIDE CRATES
    if (option1.addEventListener("click", () => {
        showhover = false;
        showScene("You open the crates to see nothing much in most of them", 
            "Though when you start to lose hope", 
            "You find a box with a map with what looks the map of the warehouse", 
            "scene 7.jpg", null, "Take Map", "Ignore Map");
    

        // INSIDE CRATES -> IGNORE MAP
        showhover = false;
        if (option2.addEventListener("click", () => {
            showScene("You walk down the hallway", "You look in the distance and find a lock",
                "Do you chose to find the key or pick the lock?", "scene 5.jpg", "scene 7.jpg",
                "Pick the lock", "Find key");
        }));

        // INSIDE CRATES -> TAKE MAP
        if (option1.addEventListener("click", () => {
            showhover = false;
            addToInventory("Map");
            showScene("You take the map and follow its routes", 
                "You look to find something unusual and strange",
                "You see a secret passage with an unusual light. Do you go in, or run back to the hallway?", "scene 9.jpg", null,
                "Go Inside", "Return to Hallway");

            // INSIDE CRATES -> TAKE MAP -> GO INSIDE
            if (option1.addEventListener("click", () => {
                showhover = false;
                showScene("You have entered a TRAP ROOM!", "Carefully choose one option,", "Your life depends on it!", "scene 12.avif",
                     null, "Random Option 1", "Random Option 2");

                if (option1.addEventListener("click", () => {
                    showhover = false;
                    showScene("You fall into a trap and die", "You chose the incorrect option", "Too bad!", "scene 13.jpg", null, null, null);
                }));

                if (option2.addEventListener("click", () => {
                    showhover = false;
                    showScene("You SURVIVED", "You chose the correct option.", "You stumble across a pot of gold, and its all yours!", "scene14.webp", null, null, null);
                }));
            }));
        }));   
    }));
        
/////////////////////// INSIDE CRATES OPTIONS ENDS ///////////////////////

    //INSIDE HALLWAY
    if (option2.addEventListener("click", () => {
        showhover = false;
        showScene("You walk down the hallway", "You look in the distance and find a lock",
            "Do you chose to find the key or pick the lock?", "scene 5.jpg", "scene 7.jpg",
            "Pick the lock", "Find key");

        // INSIDE HALLWAY -> FIND KEY
        if (option2.addEventListener("click", () => {
            showhover = false;
            showScene("You search the key in areas where it could be hidden", "You find a small and mysterious drawer",
                "You are unable to find the key and grow frustrated, you are trapped", "scene 8.jpg", null, null, null);
        }));

        // INSIDE HALLWAY -> PICK LOCK
        if (option1.addEventListener("click", () => {
            showhover = true;
            showScene("You approach the locked door.","It looks tricky. Maybe you can guess the code.",
            "Do you wish to use your brain, or give in?", "combo.jpg", null, "Try Code", "Give Up"); 

            if (option1.addEventListener("click", () => {
                showhover = false;
                showScene("You approach the locked door.", "It looks complicated. You need a 4-digit code.",
                "Can you figure it out in time to escape? Perhaps, you have seen the code before...", "combo.jpg", null, "", ""
         );

            secret_code.style.display = "block";
            submit.addEventListener("click", checkCode);

            }));
        }));      
    }));
});
/////////////////////// INSIDE HALLWAY OPTIONS END ///////////////////////


//// LEAVE WAREHOUSE OPTION /////////// 
option2.addEventListener("click", () => {
    showhover = false;
    showScene("You leave the warehouse", "You have unfortuantely missed the golden oppurtunity",
        "Good luck getting home safe and sound!! *evil laugh* 😈", "scene 3 _ending1.jpg", null, null, null);

});
//// LEAVE WAREHOUSE OPTION ENDS /////////// 


/////// KEYDOWN EVENT LISTENER /////////
document.addEventListener("keydown", (event) => {
    if(event.key === " " && hover){  // spacebar event 
        hover.style.display = "block";
        alert("There is something unusual here... perhaps a closer look will help.");
    }
});
/////// KEYDOWN EVENT LISTENER ENDS /////////
