
let copyText = '';

export function addCopyText(text) {
    copyText = text;
}

export function addCopyEventListener() {
    document.addEventListener('copy', (e) => {
        e.clipboardData.setData('text/plain', copyText)
        e.preventDefault()
    });
}
