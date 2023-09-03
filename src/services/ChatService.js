import axios from "axios"

export class ChatService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'localhost:4000';
        }
    }
    crear = (hostId, guestId, name) => {
        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/chat/create', {
                hostId,
                guestId,
                name
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }

    obtenerChatHost = (UUID) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + '/chat/host/'+UUID, {
                headers: { Accept: 'application/json' },
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }

    obtenerChatGuest = (UUID) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + '/chat/guest/'+UUID, {
                headers: { Accept: 'application/json' },
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
}
