import { useEffect, useState } from 'react';
import './AddItem.css';

const populateSelect = (data: any) => {
    let options = [];
    options.push(
        <option key={Math.random()} value=''>
            Wybierz
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
    productionYear: string;
    resetValues: () => void;
}

interface Props {
    genres: any[];
    platforms: any[];
    producers: any[];
    onClick: (clickConfig: ClickConfig) => void;
}

const AddGame = (props: Props) => {
    const [game, setGame] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [producer, setProducer] = useState('');
    const [productionYear, setProductionYear] = useState('');
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
        setProductionYear('');
    };

    return (
        <div className='AddItem'>
            <form>
                <input 

                    type='text' 
                    value={game}
                    onChange={event => setGame(event.target.value)}
                    required
                    placeholder={'Tytuł gry'}
                />
                <input 
                    type='text' 
                    value={productionYear}
                    onChange={event => setProductionYear(event.target.value)}
                    required
                    placeholder='Rok produkcji'
                    pattern='\d+'
                    style={{marginTop: 10}}
                />
                <select name='genre' onChange={event => setGenre(event.target.value)} value={genre} required>
                    { genres ? populateSelect(genres) : undefined }
                </select>
                <select name='platform' onChange={event => setPlatform(event.target.value)} value={platform} required>
                    { platforms ? populateSelect(platforms) : undefined }
                </select>
                <select name='producer' onChange={event => setProducer(event.target.value)} value={producer} required>
                    { producers ? populateSelect(producers) : undefined }
                </select>
                <button 
                    onClick={event => {
                        if (game && genre && platform && producer && productionYear && !isNaN(parseInt(productionYear))) {
                            event.preventDefault();
                            props.onClick({
                                game, genre, platform, producer, resetValues, productionYear
                            });
                        }
                    }
                }>
                    Dodaj grę
                </button>
            </form>
        </div>
    );
}

export default AddGame;