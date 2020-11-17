/********** DOM Elements **********/ 
const toggleSwitch = document.querySelector("#toggle-dark-mode")
const animalForm = document.querySelector("#animal-form")

/********** Event Listeners **********/
toggleSwitch.addEventListener("click", handleToggleDarkMode)
animalForm.addEventListener("submit", handleAnimalFormSubmit)

const animalList = document.querySelector("#animal-list")
animalList.addEventListener("click", function(event){
  if (event.target.matches(".delete-button"))
  {
    event.target.closest(".card").remove()
  } else if (event.target.matches(".donate-button")){
    const card = event.target.closest(".card")
    const donationCountSpan = card.querySelector(".donation-count")
    const newCount = parseInt(donationCountSpan.textContent) + 10
    donationCountSpan.textContent = newCount
  }
})

/********** Event Handlers **********/ 
function handleToggleDarkMode() {
  document.body.classList.toggle("dark-mode")
}

function handleAnimalFormSubmit(event) {
  // Step 0: always prevent default for form submit events
  event.preventDefault()

  // Step 1: get user input from the form input fields
  const name = event.target.name.value
  const imageUrl = event.target.image_url.value
  const description = event.target.description.value

  const animalObj = {
    name: name,
    imageUrl: imageUrl,
    description: description,
    donations: 0
  }

  // Step 2: slap it on the DOM
  renderOneAnimal(animalObj)

  // (optional) Step 3: clear the input fields
  event.target.reset()
}

/********** Render Functions **********/ 
function renderOneAnimal(animalObj) {
  // step 1. create the outer element using createElement (& assign necessary attributes)
  const card = document.createElement("li")
  card.className = "card"

  // step 2. use innerHTML to create all of its children
  card.innerHTML = `
  <div class="image">
    <img src="${animalObj.imageUrl}" alt="${animalObj.name}">
    <button class="button delete-button" data-action="delete">X</button>
  </div>
  <div class="content">
    <h4>${animalObj.name}</h4>
    <div class="donations">
      $<span class="donation-count">${animalObj.donations}</span> Donated
    </div>
    <p class="description">${animalObj.description}</p>
  </div>
  <button class="button donate-button" data-action="donate">
    Donate $10
  </button>
  `

  // step 3. slap it on the DOM!
  document.querySelector("#animal-list").append(card)

  const deleteBtn = card.querySelector(".delete-button")

  deleteBtn.addEventListener("click",function(){
    card.remove()
  })

  const donateBtn = card.querySelector(".donate-button")
  // donateBtn.addEventListener("click",function(){
  //   const donationCountSpan = card.querySelector(".donation-count")
  //   animalObj.donations += 10
  //   donationCountSpan.textContent = animalObj.donations


  // })
}

function renderAllAnimals(animalData) {
  animalData.forEach(renderOneAnimal)
}

/********** Initial Render **********/
function initialize() {
  renderAllAnimals(animalData)
}

initialize()

