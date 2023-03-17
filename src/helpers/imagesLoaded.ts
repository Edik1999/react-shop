export function imagesLoaded(parentNode: HTMLElement | HTMLDivElement | HTMLUListElement) {
    const imgElements: HTMLImageElement[] = [...parentNode.querySelectorAll("img")];
    for (let i = 0; i < imgElements.length; i += 1) {
        const img: HTMLImageElement = imgElements[i];
        if (!img.complete) {
            return false;
        }
    }
    return true;
}