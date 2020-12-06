import React, { useEffect, useState } from 'react';
import './AddItem.css';

const populateSelect = (data: any) => {
    let options = [];
    options.push(
        <option key={Math.random()} value=''>
            None
        </option>
    );
    data.forEach(record => {
        options.push(
            <option key={record.name + Math.random()} value={record.name}>
                {record.name}
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
    const [genres, setGenres] = useState<any>();
    const [producers, setProducers] = useState<any>();
    const [platforms, setPlatforms] = useState<any>();

    useEffect(() => {
        setGenres(props.genres);
    }, [props.genres]);

    useEffect(() => {
        setPlatforms(props.platforms);
    }, [props.platforms]);

    useEffect(() => {
        setProducers(props.producers);
    }, [props.producers]);

    const resetValues = () => {
        setGame('');
        setGenre('');
        setPlatform('');
        setProducer('');
    };

    return (
        <>
        {
            (genres && producers && platforms) ? (
                <div className='AddItem'>
                    <form>
                        <input 
                            type='text' 
                            value={game}
                            onChange={event => setGame(event.target.value)}
                            required
                        />
                        <select name='genre' onChange={event => setGenre(event.target.value)} value={genre} required>
                            {populateSelect(genres)}
                        </select>
                        <select name='platform' onChange={event => setPlatform(event.target.value)} value={platform} required>
                            {populateSelect(platforms)}
                        </select>
                        <select name='producer' onChange={event => setProducer(event.target.value)} value={producer} required>
                            {populateSelect(producers)}
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
            ) : (
                undefined
            )
        }
        </>
    );
}

export default AddGame;