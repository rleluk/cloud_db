import React, { useState } from 'react';
import './AddItem.css';

const populateSelect = (data: string[]) => {
    let options = [];
    options.push(
        <option key={Math.random()} value=''>
            None
        </option>
    );
    data.forEach(element => {
        options.push(
            <option key={element + Math.random()} value={element}>
                {element}
            </option>
        )
    });
    return options;
};

export interface ClickConfig {
    game: string;
    genre: string;
    platform: string;
    producer: string;
    resetValues: () => void;
}

interface Props {
    genres: string[];
    platforms: string[];
    producers: string[];
    onClick: (clickConfig: ClickConfig) => void;
}

const AddGame = (props: Props) => {
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
        <div className='AddItem'>
            <form>
                <input 
                    type='text' 
                    value={game}
                    onChange={event => setGame(event.target.value)}
                    required
                />
                <select name='genre' onChange={event => setGenre(event.target.value)} value={genre} required>
                    {populateSelect(props.genres)}
                </select>
                <select name='platform' onChange={event => setPlatform(event.target.value)} value={platform} required>
                    {populateSelect(props.platforms)}
                </select>
                <select name='producer' onChange={event => setProducer(event.target.value)} value={producer} required>
                    {populateSelect(props.producers)}
                </select>
                <button 
                    onClick={event => {
                        if (game && genre && platform && producer) {
                            event.preventDefault();
                            props.onClick({
                                game, genre, platform, producer, resetValues
                            });
                        }
                    }
                }>
                    Wybierz grę
                </button>
            </form>
        </div>
    );
}

export default AddGame;