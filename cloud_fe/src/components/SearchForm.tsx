import './SearchForm.css'
import { useState } from 'react';

interface Props {
    onSearch: (game: string, genre: string, platform: string, producer:string, fromProdYear: string, toProdYear: string) => void;
}

const SearchForm = (props: Props) => {
    const [game, setGame] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [producer, setProducer] = useState('');
    const [fromProdYear, setFromProdYear] = useState('');
    const [toProdYear, setToProdYear] = useState('');

    const resetValues = () => {
        setGame('');
        setGenre('');
        setPlatform('');
        setProducer('');
        setFromProdYear('');
        setToProdYear('');
    };

    return (
        <form className='SearchForm'>
            <div>
                <input placeholder='Tytuł gry' type='text' value={game} onChange={event => setGame(event.target.value)}/>
                <input placeholder='Rodzaj' type='text' value={genre} onChange={event => setGenre(event.target.value)}/>
                <input placeholder='Wydawca' type='text' value={producer} onChange={event => setProducer(event.target.value)}/>
                <input placeholder='Platforma' type='text' value={platform} onChange={event => setPlatform(event.target.value)}/>
                <input placeholder='Rok wydania (od)' pattern='\d+' value={fromProdYear} onChange={event => setFromProdYear(event.target.value)}/>
                <input placeholder='Rok wydania (do)' pattern='\d+' value={toProdYear} onChange={event => setToProdYear(event.target.value)}/>
            </div>
            <div>
                <button 
                    onClick={event => {
                        if ((!isNaN(parseInt(toProdYear)) || toProdYear === '') && (!isNaN(parseInt(fromProdYear)) || fromProdYear === '')) {
                            event.preventDefault();
                            props.onSearch(game, genre, platform, producer, fromProdYear, toProdYear);
                        }
                    }
                }> 
                    Wyszukaj 
                </button>
                <button 
                    onClick={event => {
                        event.preventDefault();
                        resetValues();
                        props.onSearch('', '', '', '', undefined, undefined);
                    }
                }>
                    Wyczyść
                </button>
            </div>
        </form>
    );
}

export default SearchForm;