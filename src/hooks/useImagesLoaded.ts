export function imagesLoaded(parentNode: HTMLElement) {
    const imgElements = [...parentNode.querySelectorAll("img")];
    for (let i = 0; i < imgElements.length; i += 1) {
        const img = imgElements[i];
        if (!img.complete) {
            return false;
        }
    }
    return true;
}