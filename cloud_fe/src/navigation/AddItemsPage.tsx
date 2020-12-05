import React, { useEffect } from 'react';
import Menu from '../components/Menu';
import AddItem from '../components/AddItem';
import AddGame, { ClickConfig } from '../components/AddGame';

interface Props {}

const addProducer = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nowego wydawcę?')) {
        console.log(value);
        // TODO: send data to db
        setValue('');
    }
}

const addGenre = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nowy gatunek?')) {
        console.log(value);
        // TODO: send data to db
        setValue('');
    }
}

const addPlatform = (value: string, setValue: (value: string) => void) => {
    if(window.confirm('Na pewno chcesz dodać nową platformę?')) {
        console.log(value);
        // TODO: send data to db
        setValue('');
    }
}

const addGame = (clickConfig: ClickConfig) => {
    if(window.confirm('Na pewno chcesz dodać nową grę?')) {
        console.log(clickConfig.game);
        console.log(clickConfig.genre);
        console.log(clickConfig.platform);
        console.log(clickConfig.producer);
        // TODO: send data to db
        clickConfig.resetValues();
    }
}

const AddItemsPage = (props: Props) => {
    useEffect(() => {
        //fetch data from db
    });

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
                genres={['genre1', 'genre2']}
                platforms={['platform1', 'platform2']}
                producers={['producer1', 'producer2', 'producer3']}
            />
        </div>
    );
}

export default AddItemsPage;