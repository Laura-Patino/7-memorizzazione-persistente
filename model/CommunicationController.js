export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425";
    static sid = "swkshfAwvNV69NoFXIZxVGMtazzuOo0FJxIMvvFjvJguvhoGWwMOo5dmV3zUqfOw";
    //static uid = 36318;

    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
        console.log("(1)genericRequest called");
        const queryParamsFormatted = new URLSearchParams(queryParams).toString();
        const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
        console.log("sending " + verb + " request to: " + endpoint + "?" + queryParamsFormatted);

        let fetchData = {
            method: verb,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        if (verb != 'GET') {
            fetchData.body = JSON.stringify(bodyParams);
        }
        let httpResponse;
        try {
            httpResponse = await fetch(url, fetchData);
        } catch (error) {
            console.log("(1)Error during fetch request:", error);
            throw error;
        }

        const status = httpResponse.status;
        console.log("Status:", status);
        if (status === 204) {
            console.log("(0) OK. No content to return");
            return;
        } else if (status >= 200 && status < 300) {
            let deserializedObject = await httpResponse.json();;
            return deserializedObject; //return una Promise
        } else {
            //const message = await httpResponse.text();
            const errorObject = await httpResponse.json();
            console.log("(0) Errore dal server:", errorObject);
            //throw new Error("Error message from the server. HTTP status: " + status + ". Message: " + message);
            throw errorObject;
        }
    }

    static async getRequest(endpoint, queryParams) {
        console.log("(2)GetRequest called. Endpoint:", endpoint, "- queryParams:", queryParams);
        return await this.genericRequest(endpoint, "GET", queryParams, {});
    }

    static async getUserInformation(uid) {
        console.log("(3)getUserInformation called GET");
        let endpoint = "/user/" + uid;
        let queryParams = { sid: this.sid };
        return await this.getRequest(endpoint, queryParams);
    }

    static async setUserInformation(newDataUser) {
        console.log("(2)setUserInformation called PUT");
        let endpoint = "/user/" + newDataUser.uid;
        let queryParams = {};
        newDataUser.sid = this.sid;
        let bodyParams = newDataUser;
        /**richiesta PUT restituisce status 204, non restituisce alcun contenuto nel corpo della risposta 
         * ->  quindi chiamare httpResponse.json() solleva un errore */
        return await this.genericRequest(endpoint, "PUT", queryParams, bodyParams);
    }

    static async getImage() {
        console.log("(2)getImage called");
        let endpoint = "/image";
        let queryParams = { };
        return await this.getRequest(endpoint, queryParams);
    }

}