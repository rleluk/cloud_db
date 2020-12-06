export const getData = async (uri) => {
    let res = await fetch(process.env.REACT_APP_URI + uri)
        .catch(err => console.log(err));
    if (res && res.status === 200) {
        return res.json();
    } else {
        alert('Wystąpił błąd podczas pobierania danych.');
    }
}

export const postData = async (uri: string, body: any) => {
    await fetch(process.env.REACT_APP_URI + uri, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res.status !== 201) {
                alert('Wystąpił błąd podczas dodawania danych.');
            }
        })
        .catch(err => console.log(err));
}

