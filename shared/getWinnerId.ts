export function getWinnerId(id: { url: string }): number {
    const result: string = Object.values(id)[0];
    let winsCarId: string = '';
    if (result === '') {
        console.log('The winner is not defined');
    } else {
        winsCarId = id.url.split('=')[1].split('&')[0];
        return +winsCarId;
    }
    return +winsCarId;
}
