let page = 1

document.addEventListener('DOMContentLoaded', () => {

    function getMonsters() {
        document.getElementById('monster-container').innerHTML = ""
       fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then( res => res.json())
        .then( data => {
            monsters = []
            data.forEach( monster => {
                monsters.push(monster)
                
                const monsterDiv = document.getElementById('monster-container')
                const monsterName = document.createElement('p')
                monsterName.innerHTML = `<b>${monster.name}</b>`
                const monsterAge = document.createElement('p')
                monsterAge.innerHTML = `<b>Age:</b> ${monster.age} `
                const monsterText = document.createElement('p')
                monsterText.innerHTML = `<b>Bio:</b> ${monster.description}`
                monsterDiv.appendChild(monsterName)
                monsterDiv.appendChild(monsterAge)
                monsterDiv.appendChild(monsterText)
            })
        })
    }

    function monsterMaker() {
        const makeMonster = document.getElementById('create-monster')
        console.log(makeMonster)
        const monsterForm = document.createElement('form')
        monsterForm.innerHTML = `<p><input type="text" name="name" value="" placeholder="Enter Monster Name"/>
        <input type="text" name="age" value="" placeholder="Enter Monster Age"/>
        <input type="text" name="description" value="" placeholder="Enter Monster Bio"/>
        <input type="submit" name="submit" value="Create New Monster"/></p>`
        makeMonster.appendChild(monsterForm)
        makeMonster.addEventListener('submit', event => {
            event.preventDefault()
            const newMonster = {
                name: event.target.name.value,
                age: event.target.age.value,
                description: event.target.description.value,
            }
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(newMonster)
            })
            .then(res => res.json())
            .then(() => getMonsters() )
        })
    }

    const forward = document.getElementById('forward')
    const backward = document.getElementById('back')
    forward.addEventListener('click', forward => {
        forward.preventDefault()
        page++
        getMonsters()
    })    
    backward.addEventListener('click', backward => {
        backward.preventDefault()
            if (page === 1) {
            }
            else {
                page--
            }
        getMonsters()
    })


    monsterMaker()
    getMonsters()
   

       
})