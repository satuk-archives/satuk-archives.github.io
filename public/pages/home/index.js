import styles from './style.module.css';
import {useState} from 'preact/hooks';

class Post {
    text;
    date;
    photoFbId;
    photoDescription;
    sharedFrom;
    sharedText;
    ocr;
    reactionsCount;
    reaction1;
    reaction2;
    reaction3;
}


export default function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [images, setImages] = useState(new Set());
    const [sort, setSort] = useState("date");

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/satuk.json');
            const json = await response.json();
            setItems(json);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const selectSort = (event) => {
        setSort(event.target.value);
    }

    // sort the items depending on what was selected
    const itemsList = items.sort((a, b) => {
        switch (sort) {
            case "date":
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "reactions":
                return b.reactionsCount - a.reactionsCount;
            case "sharedFrom":
                return b.sharedFrom - a.sharedFrom;
            case "textLength":
                return b.text.length - a.text.length;
            default:
                return b.date - a.date;
        }
    })
        .map(item => (
        <li>
            <h5>{new Date(item.date).toLocaleString()}</h5>
            <p>{item.text}</p>
            {item.photoFbId && <button onClick={() => {
                if (images.has(item.photoFbId)) {
                    images.delete(item.photoFbId);
                } else {
                    images.add(item.photoFbId);
                }
                setImages(new Set(images));
            }}>Pokaż/Zamknij zdjęcie</button>}
            {images.has(item.photoFbId) && <img src={`/images/${item.photoFbId}.jpg`} />}
            {item.photoDescription && <p>Opis wygenerowany prez FB: {item.photoDescription}</p>}
            {item.ocr && <p>OCR: {item.ocr}</p>}
            {item.sharedFrom && <p>Udostępniono od: {item.sharedFrom}</p>}
            {item.sharedText && <p>Tekst oryginalnego posta: {item.sharedText}</p>}
            <p>{item.reactionsCount} {[item.reaction1, item.reaction2, item.reaction3].filter(v => v).join(", ")}</p>
        </li>
    ));

    return (
        <div class={styles.home}>
            <button onClick={fetchItems}>Pokaż</button>
            <label htmlFor="sort">Sortuj według:</label>

            <select name="sort" id="sort" onChange={selectSort} value={sort}>
                <option value="date">Daty</option>
                <option value="reactions">Reakcji</option>
                <option value="sharedFrom">Udostępniono od</option>
                <option value="textLength">Długości tekstu</option>
            </select>
            {error && <p>{error.message}</p>}
            {loading && <p>Loading...</p>}
            {itemsList}
        </div>
    );
}
