import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import SearchForm from '../components/SearchForm';
import './SearchPage.css';

interface Game {
    title: string;
    genre: string;
    platform: string;
    producer: string;
}

const createTable = (games: Game[]) => {
    if (!games || games.length === 0) {
        return (
            <div className="NoDataAlert">
                Brak danych do wyświetlenia.
            </div>
        );
    }

    let items = [];
    games.forEach(record => {
        items.push(
            <tr key={record.title + Math.random()}>
                <td>{record.title}</td>
                <td>{record.genre}</td>
                <td>{record.producer}</td>
                <td>{record.platform}</td>
            </tr>
        );
    });

    return (
        <table key={Math.random()}>
            <tr>
                <th>Tytuł gry</th>
                <th>Gatunek</th>
                <th>Wydawca</th>
                <th>Platforma</th>
            </tr>
            {items}
        </table>
    );
};

interface Props {}

const SearchPage = (props: Props) => {
    // const [games, setGames] = useState<Game[]>();

    // useEffect(() => {

    // });

    const onSearch = (game: string, genre: string, platform: string, producer:string) => {
        console.log(game);
        console.log(genre);
        console.log(platform);
        console.log(producer);
    }

    return (
        <div>
            <Menu/>
            <SearchForm onSearch={onSearch}/>
            {createTable([{title: 'Timon i Pumba', genre: 'Przygoda!', producer: 'Konrad&Malski spółka z o.o.', platform: 'Windows 11.5'}])}
        </div>
    );
}

export default SearchPage;