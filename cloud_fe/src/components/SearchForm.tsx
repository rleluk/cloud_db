import './SearchForm.css'
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
        <form className='SearchForm'>
            <div>
                <input placeholder='Tytuł gry' type='text' value={game} onChange={event => setGame(event.target.value)}/>
                <input placeholder='Rodzaj' type='text' value={genre} onChange={event => setGenre(event.target.value)}/>
                <input placeholder='Wydawca' type='text' value={producer} onChange={event => setProducer(event.target.value)}/>
                <input placeholder='Platforma' type='text' value={platform} onChange={event => setPlatform(event.target.value)}/>
            </div>
            <div>
                <button 
                    onClick={event => {
                        event.preventDefault();
                        props.onSearch(game, genre, platform, producer);
                    }
                }> 
                    Wyszukaj 
                </button>
                <button 
                    onClick={event => {
                        event.preventDefault();
                        resetValues();
                        props.onSearch('', '', '', '');
                    }
                }>
                    Wyczyść
                </button>
            </div>
        </form>
    );
}

export default SearchForm;