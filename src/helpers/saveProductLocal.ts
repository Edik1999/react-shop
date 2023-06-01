export function saveProductLocal(id: number) {
    const saved = localStorage.getItem('cart');
    const defaultValue = {id: id, count: 1}
    const initial = !saved || saved === 'undefined' ? null : JSON.parse(saved);
    const storageValue = initial || defaultValue

    saved
        ? localStorage.setItem('cart', JSON.stringify([...storageValue, defaultValue]))
        : localStorage.setItem('cart', JSON.stringify([defaultValue]));
}
