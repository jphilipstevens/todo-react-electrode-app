export default (response) => response.ok ? response.json() : Promise.reject();
