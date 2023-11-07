export function downloadFile(data: BlobPart, name: string) {
    const blob = new Blob([data]);

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = name;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}