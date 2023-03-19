import readline from 'node:readline'
import axios from './node_modules/axios/index.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function getPokemon(id) {
    try {
        const getted = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const name = getted.data.name
        const weight = getted.data.weight
        const height = getted.data.height
        const type = getted.data.types[0].type.name
        const hp = getted.data.stats[0].base_stat
        const attack = getted.data.stats[1].base_stat
        const defense = getted.data.stats[2].base_stat
        const specialAttack = getted.data.stats[3].base_stat
        const specialDefense = getted.data.stats[4].base_stat
        const speed = getted.data.stats[5].base_stat
        let past_type
        
        if(getted.data.past_types[0] === undefined) {
            past_type = "Dont't have value"  
        } 
        else {
            past_type = getted.data.past_types[0].types[0].type.name
        }
        const data = {
            "name": name,
            "weigth": weight,
            "heigth": height,
            "type": type,
            "pastType": past_type,
            "base_stats": {
                "hp": hp,
                "attack": attack,
                "defense": defense,
                "specialAttack": specialAttack,
                "specialDefense": specialDefense,
                "speed": speed
            },
        }
        return data
    }
    catch(err) {
        console.log("Something happening: ", err)
    }
}

/*
El await es como aplicar el then pero más bonito sintacticamente
const x = await getPokemon(1)
console.log(x)*/



function question() {
    rl.question('Introduce a Pokemon ID? ', async (id) => {
        const name = await getPokemon(id)
        console.log(name)
        rl.close()
    })
}

question()



