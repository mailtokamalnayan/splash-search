const apiHost = `https://api.unsplash.com/search/photos?page=1&client_id=2d792caacf4646d2e8573df7c49ec3af78e1726c403726eb1fd1671d75b3cad4`

export default {
    async fetchSearchResults(searchTerm) {
        try {
            const response = await fetch(apiHost + '&query=' + searchTerm);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    }
}