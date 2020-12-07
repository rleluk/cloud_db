import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import SearchForm from '../components/SearchForm';
import './SearchPage.css';

interface Game {
    game: {
        id: string;
        name: string;
    }
    genre: {
        name: string;
    }
    platform: {
        name: string;
    }
    producer: {
        name: string;
    }
}

const deleteGame = async (id: string, fetchGames) => {
    if (window.confirm('Na pewno chcesz usunąć grę z katalogu?')) {
        await fetch(process.env.REACT_APP_URI + `/game/${id}`, {method: 'DELETE'})
            .catch(err => console.log(err));
        fetchGames();
    }
}

const createTable = (games: Game[], fetchGames) => {
    if (!games || games.length === 0) {
        return (
            <table key={Math.random()} className="SearchTable">
                <thead>
                    <tr>
                        <th>Tytuł gry</th>
                        <th>Gatunek</th>
                        <th>Wydawca</th>
                        <th>Platforma</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4} style={{textAlign: 'center'}} className='NoDataAlert'>
                            Brak danych do wyświetlenia.
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    let items = [];
    games.forEach(record => {
        items.push(
            <tr key={record.game.name + Math.random()}>
                <td>{record.game.name}</td>
                <td>{record.genre.name}</td>
                <td>{record.producer.name}</td>
                <td>{record.platform.name}</td>
                <td>
                    <button className='DeleteButton' onClick={async () => await deleteGame(record.game.id, fetchGames)}>
                        Usuń rekord
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <table key={Math.random()} className="SearchTable">
            <thead>
                <tr>
                    <th>Tytuł gry</th>
                    <th>Gatunek</th>
                    <th>Wydawca</th>
                    <th>Platforma</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    );
};

interface Props {}

const SearchPage = (props: Props) => {
    const [games, setGames] = useState<Game[]>();

    const fetchGames = (game = '', genre = '', platform = '', producer = '') => {
        const query = `/game/?name=${game}&genre=${genre}&producer=${producer}&platform=${platform}`
        fetch(process.env.REACT_APP_URI + query)
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div>
            <Menu/>
            <div className='Container'>
                <SearchForm onSearch={fetchGames}/>
                {createTable(games, fetchGames)}
            </div>
        </div>
    );
}

export default SearchPage;