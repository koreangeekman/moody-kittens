let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let thisKitten = {
    id: generateId(),
    name: form.name.value,
    mood: "undetermined",
    affection: 0
  }

  kitty = kittens.find(kitten => kitten.name == thisKitten.name)

  if (!kitty) {
    console.log("Kitten not found, adding kitten")
    kittens.push(thisKitten)
    saveKittens()
  } else {
    console.log("Kitten already exists")
  }
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
*/
function loadKittens() {
  let kittensDATA = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensDATA) {
    kittens = kittensDATA
  }
  drawKittens()
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let drawMe = ""
  kittens.forEach(kitten => {
    drawMe += `
    <div class="kitten card m-1 text-center ${kitten.mood}">
      <img src="moody-logo.png" height="250" alt="Moody Kittens">
      <div class="card label">
        <p><b>${kitten.name}</b></p>
        <br>
        <small>Affection level: ${kitten.affection} = Mood: ${kitten.mood}</small>
        <br>
        <button class="m-1" onclick="pet('${kitten.id}')">PET</button>
        <i class="action fa fa-trash text-danger m-2" onclick="removeKitten('${kitten.id}')"></i>
        <button class="m-1" onclick="catnip('${kitten.id}')">CATNIP</button>
      </div>
    </div>
    `
  })
  document.getElementById("kittens").innerHTML = drawMe
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid Kitten ID")
  }
  return kittens[index]
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  let chance = Math.random()
  if (chance > .5) {
    if (kitten.affection < 5) {
      kitten.affection++
    }
  } else {
    if (kitten.affection > -2) {
      kitten.affection--
    }
  }
  setKittenMood(kitten)
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
*/
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  setKittenMood(kitten)
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {

  if (kitten.affection <= -2) {
    kitten.mood = "gone"
  } else if (kitten.affection == -1) {
    kitten.mood = "angry"
  } else if (kitten.affection == 0) {
    kitten.mood = "undetermined"
  } else if (1 <= kitten.affection && kitten.affection <= 4) {
    kitten.mood = "tolerant"
  } else if (kitten.affection >= 5) {
    kitten.mood = "happy"
  } else {
    console.log("wet cat crazy")
  }
  saveKittens()
}

/**
 * Removes a specific kitten from the array
 */
function removeKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid Kitten ID")
  }
  kittens.splice(index, 1)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 * mood types: happy, tolerant, angry, gone
 * affection range: (-2) : 5
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
