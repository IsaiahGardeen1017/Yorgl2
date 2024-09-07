

/**
 * @returns Obj with 2 fields: status (integer) and response (object if success or string with error message)
 * 
 * @param {string} uri Ex: '/api/nowPlaying
 * @param {*} params, object with key value pairs
 */
async function callApi(uri, params, method) {
    let auth_token = sessionStorage.getItem('auth-token');

    const urlQs = '';

    const headers = {
        authorization: auth_token
    }
    const response = await fetch(uri + urlQs, {
        method: method ? method : 'GET',
        headers: headers
    });

    if (response.status !== 200) {
        //Error
        return {
            status: response.status,
            response: response.body
        }
    }
    const data = await response.json();
    return {
        status: 200,
        data: data
    };
}




export async function getNowPlaying() {
    let response = await callApi('/api/nowPlaying');
    if (response?.status === 200) {
        return response.data;
    } else {
        return undefined;
    }
}

export async function setPlaystate() {
    let response = await callApi('/api/playState');
    if (response?.status === 200) {
        return response.data;
    } else {
        return undefined;
    }
}