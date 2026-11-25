
const coverCache = new Map();

export async function getBookCover(title, author) {
    const cacheKey = `${title}-${author}`;

    // Proveravamo da li smo vec pronasli naslovnicu
    if (coverCache.has(cacheKey)) {
        return coverCache.get(cacheKey);
    }

    try {
        const query = encodeURIComponent(`${title} ${author}`);

        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`
        );

        // Proveravamo da li je zahtev uspesan
        if (!response.ok) {
            console.warn('Google Books API error:', response.status);
            return null;
        }

        const data = await response.json();

        // Preuzimamo URL naslovnice
        const imageUrl =
            data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
                ?.replace('http://', 'https://') || null;

        // Cuvamo rezultat da ne saljemo ponovo isti zahtev
        coverCache.set(cacheKey, imageUrl);

        return imageUrl;

    } catch (error) {
        console.error('Error fetching book cover:', error);
        return null;
    }
}
