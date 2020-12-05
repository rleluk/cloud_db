import { useState } from 'react';

interface Props {
    onSearch: (game: string, genre: string, platform: string, producer:string) => void;
}

const SearchForm = (props: Props) => {
    const [game, setGame] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [producer, setProducer] = useState('');

    const resetValues = () => {
        setGame('');
        setGenre('');
        setPlatform('');
        setProducer('');
    };

    return (
        <form className="SearchForm">
            <input type='text' value={game} onChange={event => setGame(event.target.value)}/>
            <input type='text' value={genre} onChange={event => setGenre(event.target.value)}/>
            <input type='text' value={platform} onChange={event => setPlatform(event.target.value)}/>
            <input type='text' value={producer} onChange={event => setProducer(event.target.value)}/>
            <button 
                onClick={event => {
                    if(game && genre && platform && producer) {
                        event.preventDefault();
                        props.onSearch(game, genre, platform, producer);
                    }
                }
            }> 
                Wyszukaj 
            </button>
            <button 
                onClick={event => {
                    event.preventDefault();
                    resetValues();
                }
            }>
                Wyczyść
            </button>
        </form>
    );
}

export default SearchForm;