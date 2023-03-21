export function saveProductLocal(id: string) {
    if (localStorage.getItem('cart')){
        let localStorageCart = JSON.parse(localStorage.getItem('cart') || "");
        let newLocalStorageCart = [...localStorageCart, {id: id, count: 1}];
        localStorage.setItem('cart', JSON.stringify(newLocalStorageCart));
    }else{
        let cart = [{id: id, count: 1}]
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}