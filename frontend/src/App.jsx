
import { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import BookCard from './BookCard.jsx';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Učitavanje knjiga iz backend-a
  useEffect(() => {
    fetch('http://localhost:8080/api/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Uzimanje svih različitih žanrova
  const genres = ['All', ...new Set(books.map(book => book.genre))];

  // Pretraga i filtriranje knjiga
  const filteredBooks = books.filter(book => {
    const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
        selectedGenre === 'All' || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
      <div>
        <Navbar />
        <Hero />

        <section className="books-section">
          <h2>My books</h2>

          {/* Polje za pretragu */}
          <input
              type="text"
              className="search-input"
              placeholder="Search by title, author or genre..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
          />

          {/* Filter po žanru */}
          <select
              className="genre-filter"
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
          >
            {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'All' ? 'All genres' : genre}
                </option>
            ))}
          </select>

          {/* Prikaz knjiga */}
          <div className="books-list">
            {filteredBooks.map((book) => (
                <BookCard
                    key={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    publicationYear={book.publicationYear}
                    read={book.read}
                    coverUrl={book.coverUrl}
                />
            ))}
          </div>

          {/* Poruka ako nema rezultata */}
          {filteredBooks.length === 0 && (
              <p className="no-results">
                No books found. Try another search.
              </p>
          )}
        </section>
      </div>
  );
}

export default App;
