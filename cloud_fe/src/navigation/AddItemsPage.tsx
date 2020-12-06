import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import AddItem from '../components/AddItem';
import AddGame, { ClickConfig } from '../components/AddGame';

interface Props {}

const postData = (uri: string, body: any) => {
    fetch(process.env.REACT_APP_URI + uri, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(res => {
            console.log(res)
            if (res.status !== 201) {
                alert('Wystąpił błąd podczas dodawania producenta.');
            }
        })
        .catch(err => console.log(err));
}

const getData = async (uri) => {
    let res = await fetch(process.env.REACT_APP_URI + uri)
        .catch(err => console.log(err));
    console.log(res)
    if (res && res.status === 200) {
        return res.json();
    } else {
        alert('Wystąpił błąd podczas pobierania danych.');
    }
}

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
            producer: clickConfig.producer
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
            let fetchedGenres = await getData('/genre');
            if (fetchedGenres) setGenres(fetchedGenres);
            let fetchedProducers = await getData('/producer');
            if (fetchedProducers) setProducers(fetchedProducers);
            let fetchedPlatforms = await getData('/platform');
            if (fetchedPlatforms) setPlatforms(fetchedPlatforms);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Menu/>
            <AddItem
                buttonValue='Dodaj gatunek'
                onClick={addGenre}
            />
            <AddItem
                buttonValue='Dodaj wydawcę'
                onClick={addProducer}
            />
            <AddItem
                buttonValue='Dodaj platformę'
                onClick={addPlatform}
            />
            <AddGame
                onClick={addGame}
                genres={genres}
                platforms={platforms}
                producers={producers}
            />
        </div>
    );
}

export default AddItemsPage;