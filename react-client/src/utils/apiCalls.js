

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


export async function getUserInfo(callback){
    let response = await callApi('/api/userInfo');
    if(response.status === 200){
        callback(response.data);
    }else{
        callback(undefined);
    }
}

export async function getNowPlaying() {
    let response = await callApi('/api/nowPlaying');
    if (response?.status === 200) {
        return response.data;
    } else {
        return undefined;
    }
}

const validActions = [
    'repeat_track',
    'repeat_off',
    'repeat_context',
    'shuffle_on',
    'shuffle_off',
    'play',
    'pause',
    'skip',
    'previous'
]
export async function doPlayStateAction(action) {
    action = action.toLowerCase();
    if(!validActions.includes(action)){
        console.log('You are calling setPlaystate incorrectly');
        return undefined;
    }
    let response = await callApi('/api/playState/' + action, {}, 'PUT');
    if (response?.status === 200) {
        return response.data;
    } else {
        return undefined;
    }
}

export async function getAllMyPlaylists(){
    let response = await callApi('/api/myPlaylists');
    if (response?.status === 200) {
        return response.data;
    } else {
        return undefined;
    }
}