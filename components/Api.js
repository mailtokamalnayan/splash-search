const apiSearch = 'https://api.unsplash.com/search/photos'
const api = 'https://api.unsplash.com/photos/'
const apiKey =  '2d792caacf4646d2e8573df7c49ec3af78e1726c403726eb1fd1671d75b3cad4'


export default {
    async fetchSearchResults(searchTerm, page) {
        try {
            const response = await fetch(apiSearch + '?page=' + page + '&client_id=' + apiKey + "&query=" + searchTerm);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },
    async fetchPhotoDetail(photoId) {
        try {
            const response = await fetch(api + photoId + '?&client_id=' + apiKey);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log(error);
        }
    },
}