let monstersPage = 1;
const MONSTERS_URL = "http://localhost:3000/monsters";

document.addEventListener("DOMContentLoaded", () => {
    fetchMonsterData()
    renderMonsterForm()
    handleClicks()
})

function fetchMonsterData() {
    fetch(`${MONSTERS_URL}/?_limit=50&_page=${monstersPage}`)
        .then(resp => resp.json())
        .then(json => {
            createMonsterCards(json)
        })
}

function renderMonsterForm() {
    const formContainer = document.getElementById("create-monsters-form-container")
    
    formContainer.innerHTML = `
        <h2>Create a new monster!</h2>
        <form id="monster-form">
            <div class="form-group">
                <input type="text" name="name" class="form-control" placeholder="Name">
            </div>
            <div class="form-group">
                <input type="number" name="age" class="form-control" placeholder="Age">
            </div>
            <div class="form-group">
                <textarea name="description" class="form-control" rows="2" placeholder="Description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    `;
}

function createMonsterCards(monsters) {
    const monsterRow = document.getElementById("monsters-row");
    monsterRow.innerHTML = "";

    monsters.forEach(monster => {
        const monsterCard = document.createElement("div");

        monsterCard.className = "monster-card col-lg-12"
        monsterCard.innerHTML = `
            <h4>${monster.name}</h4>
            <p>Age: ${monster.age}</p>
            <p>Bio: ${monster.description}</p>
        `;

        monsterRow.appendChild(monsterCard)
    })
}

function handleClicks() {
    const form = document.getElementById("monster-form")
    const backButton = document.getElementById("back")
    const nextButton = document.getElementById("next")

    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const monster = {
            "name": e.target.name.value,
            "age": e.target.age.value,
            "description": e.target.description.value
        };

        postMonster(monster);
        e.target.reset();
    })

    nextButton.addEventListener("click", () => {
        monstersPage++;
        fetchMonsterData()
    })

    backButton.addEventListener("click", () => {
        if (monstersPage > 1) {
            monstersPage--;
            fetchMonsterData()
        }
    })
}

function postMonster(monster) {
    fetch(MONSTERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    }).then(resp => resp.json()).then(json => console.log(json))
}