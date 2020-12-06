import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { getData } from '../services/fetch';
import './ViewItemsPage.css';

const deleteRecord = async (name: string, setItems, uri: string) => {
    if (window.confirm('Na pewno chcesz usunąć rekord oraz wszystkie gry z nim powiązane?')) {
        await fetch(process.env.REACT_APP_URI + `${uri}/${name}`, {method: 'DELETE'})
            .catch(err => console.log(err));
        setItems(await getData(uri));
    }
}

const createTable = (records: any, setItems: Function, header: string, uri) => {
    if (!records || records.length === 0) {
        return (
            <div className="NoDataAlert">
                Brak danych do wyświetlenia.
            </div>
        );
    }

    let items = [];
    records.forEach(record => {
        items.push(
            <tr key={record.name + Math.random()}>
                <td>{record.name}</td>
                <td>
                    <button onClick={async () => await deleteRecord(record.name, setItems, uri)}>
                        Usuń rekord
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <table key={Math.random()}>
            <thead>
                <tr>
                    <th>{header}</th>
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

const ViewItemsPage = (props: Props) => {
    const [genres, setGenres] = useState<any>();
    const [producers, setProducers] = useState<any>();
    const [platforms, setPlatforms] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            setGenres(await getData('/genre'));
            setProducers(await getData('/producer'));
            setPlatforms(await getData('/platform'));
        }
        fetchData();
    }, []);
    
    let genresTable = createTable(genres, setGenres, 'Gatunek', '/genre');
    let producersTable = createTable(producers, setProducers, 'Wydawca', '/producer');
    let platformsTable = createTable(platforms, setPlatforms, 'Platforma', '/platform');

    return (
        <div>
            <Menu/>
            {genresTable}
            {producersTable}
            {platformsTable}
        </div>
    );
}

export default ViewItemsPage;