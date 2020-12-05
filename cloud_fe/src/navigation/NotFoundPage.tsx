import React from 'react';

interface Props {}

const NotFoundPage = (props: Props) => {
    return (
        <div style={{fontWeight: 'bold', textAlign: 'center'}}>
            <div style={{fontSize: 60, margin: 100}}>
                404
            </div>
            <div style={{fontSize: 35, padding: 50}}>
                Nie znaleziono strony!
            </div>
        </div>
    );
}

export default NotFoundPage;