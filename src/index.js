import './styles/style.css'
import noPhotoImg from './img/1024px-No_image_available.svg.png'

const main = () => {
    const showCharactersButton = document.querySelector(".show-characters-button");

    const handleShowCharacters = async () => {
        const charactersWrapper = document.querySelector(".characters-wrapper");
        const selectedEpisode = document.querySelector("#episod-selector").value;

        const charactersResponse = await fetchCharacters(selectedEpisode);
        const characters = normalizeCharacters(charactersResponse);
    
        charactersWrapper.innerHTML += formCharactersGrid(characters);
    }

    showCharactersButton.addEventListener("click", handleShowCharacters);
    // nextPageButton.addEventListener("click", handleGoToNextPage);

    const fetchCharacters = async (episode) => {
        const { data: { characters } } = await axios.get(`https://swapi.dev/api/films/${episode}`);
        return await Promise.all(characters.map((character) => axios.get(character)));
    }

    const normalizeCharacters = (charactersResponse) => (
        charactersResponse.map(({data: {name, birth_year, gender}}) => (
            {
                fullName: name,
                dataBirth: birth_year,
                gender: gender,
                photo: noPhotoImg,
            }
        ))
    )
    
    const formCharactersGrid = (characters) => 
        characters.reduce((total, character) => total += formCharacterCard(character), '');
    
    const formCharacterCard = ({photo, fullName, dataBirth, gender}) => (
        `<div class="character-card">
            <div class="base-info">
                <div class="photo-image">
                    <img src=${photo} alt="character's photo">
                 </div>
                 <span class="full-name"><p class="font-langar">Full name: </p> ${fullName}</span>
             </div>
             <span class="addition-info"><p class="font-langar">Date of birth: </p> ${dataBirth}</span>
             <span class="addition-info"><p class="font-langar">Gender: </p> ${gender}</span>
             </div>
         </div>`
    );
};

main();
console.log('webpack')
    

