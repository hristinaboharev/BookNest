
import { useState, useEffect } from 'react';
import { getBookCover } from './bookService.js';

function AddBookForm({ onBookAdded, onClose }) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [read, setRead] = useState(false);

    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Ucitavamo zanrove iz baze podataka
    useEffect(() => {
        fetch('http://localhost:8080/api/genres')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch genres');
                }

                return response.json();
            })
            .then(data => setGenres(data))
            .catch(error => console.error('Error loading genres:', error));
    }, []);

    // Funkcija za dodavanje knjige
    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            // Ako korisnik nije uneo URL, automatski trazimo naslovnicu
            let finalCoverUrl = coverUrl.trim();

            if (!finalCoverUrl) {
                finalCoverUrl = await getBookCover(title, author) || '';
            }

            // Pripremamo podatke o novoj knjizi
            const newBook = {
                title,
                author: {
                    name: author
                },
                genre: {
                    name: genre
                },
                publicationYear: publicationYear
                    ? Number(publicationYear)
                    : null,
                coverUrl: finalCoverUrl,
                read
            };

            // Saljemo knjigu backend-u
            const response = await fetch('http://localhost:8080/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook)
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            // Preuzimamo sacuvanu knjigu
            const savedBook = await response.json();

            // Dodajemo novu knjigu na stranicu
            onBookAdded(savedBook);

            // Zatvaramo formu
            onClose();

        } catch (error) {
            console.error('Error adding book:', error);
            alert(error.message);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="add-book-form" onSubmit={handleSubmit}>

            <label>Book title</label>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter book title"
                required
            />

            <label>Author</label>
            <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Enter author name"
                required
            />

            <label>Genre</label>
            <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                required
            >
                <option value="">Choose a genre</option>

                {genres.map((item) => (
                    <option key={item.id} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>

            <label>Publication year</label>
            <input
                type="number"
                value={publicationYear}
                onChange={(event) => setPublicationYear(event.target.value)}
                placeholder="e.g. 2020"
            />

            <label>Cover URL (optional)</label>
            <input
                type="url"
                value={coverUrl}
                onChange={(event) => setCoverUrl(event.target.value)}
                placeholder="Paste cover image URL or leave empty"
            />

            <label className="read-checkbox">
                <input
                    type="checkbox"
                    checked={read}
                    onChange={(event) => setRead(event.target.checked)}
                />
                I have read this book
            </label>

            <button
                type="submit"
                className="add-book-submit"
                disabled={isLoading}
            >
                {isLoading ? 'Adding book...' : 'Add Book'}
            </button>

            <button
                type="button"
                onClick={onClose}
                className="cancel-button"
                disabled={isLoading}
            >
                Cancel
            </button>

        </form>
    );
}

export default AddBookForm;
