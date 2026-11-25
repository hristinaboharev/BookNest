
function BookCard({title, author,genre, publicationYear,read, coverUrl}) {

    return (
        <article className="book-card">
            {coverUrl && (
                <img
                    src={coverUrl}
                    alt={`Naslovnica knjige ${title}`}
                    className="book-cover"
                />
            )}

            <h3>{title}</h3>
            <p>Author: {author}</p>
            <p>Genre: {genre}</p>
            <p>Published: {publicationYear}</p>

            <span>
                {read ? 'Read' : 'Not read yet'}
            </span>
        </article>

    );
}
export default BookCard;