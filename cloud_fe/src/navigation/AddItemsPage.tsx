import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import AddItem from '../components/AddItem';
import AddGame, { ClickConfig } from '../components/AddGame';
import { getData, postData } from '../services/fetch';
import './AddItemsPage.css';

interface Props {}

const addProducer = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nowego wydawcę?')) {
        const body = {
            name: value
        }
        postData('/producer', body);
        setValue('');
    }
}

const addGenre = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nowy gatunek?')) {
        const body = {
            name: value
        }
        postData('/genre', body);
        setValue('');
    }
}

const addPlatform = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nową platformę?')) {
        const body = {
            name: value
        }
        postData('/platform', body);
        setValue('');
    }
}

const addGame = (clickConfig: ClickConfig) => {
    if(window.confirm('Na pewno chcesz dodać nową grę?')) {
        const body = {
            name: clickConfig.game,
            genre: clickConfig.genre,
            platform: clickConfig.platform,
            producer: clickConfig.producer,
            productionYear: clickConfig.productionYear
        }
        postData('/game', body);
        clickConfig.resetValues();
    }
}

const AddItemsPage = (props: Props) => {
    const [genres, setGenres] = useState<string[]>();
    const [producers, setProducers] = useState<string[]>();
    const [platforms, setPlatforms] = useState<string[]>();

    useEffect(() => {
        const fetchData = async () => {
            setGenres(await getData('/genre'));
            setProducers(await getData('/producer'));
            setPlatforms(await getData('/platform'));
        }
        fetchData();
    }, []);

    return (
        <div>
            <Menu/>
            <div className='Container'>
                <div className='AddItems'>
                    <AddItem
                        buttonValue='Dodaj gatunek'
                        onClick={addGenre}
                        placeholder={'Nazwa gatunku'}
                    />
                    <AddItem
                        buttonValue='Dodaj wydawcę'
                        onClick={addProducer}
                        placeholder={'Nazwa wydawcy'}
                    />
                    <AddItem
                        buttonValue='Dodaj platformę'
                        onClick={addPlatform}
                        placeholder={'Nazwa platformy'}
                    />
                    <AddGame
                        onClick={addGame}
                        genres={genres}
                        platforms={platforms}
                        producers={producers}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddItemsPage;