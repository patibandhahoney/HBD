import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { soundEngine } from '../utils/audioEngine';
import { fireSunflowerConfetti, fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';
import '../styles/library.css';

// Rich Curated Library of Fictional & Non-Fictional Treasures
const BOOKS_CATALOG = [
  // --- FICTION ---
  {
    id: 'f1',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    year: '1943',
    category: 'fiction',
    genre: 'Classic / Philosophy',
    rating: 5,
    badge: 'Timeless Gem 👑',
    coverColor: 'linear-gradient(135deg, #2b3a67, #496a81)',
    accentColor: '#ffd166',
    emblem: '👑',
    sunflowerMood: 'dreamy',
    quote: '“It is only with the heart that one can see rightly; what is essential is invisible to the eye.”',
    synopsis: 'A poetic and enchanting tale of a young prince who journeys through the universe, learning profound truths about love, friendship, and seeing life with wonder rather than cold logic.',
    dedication: 'Dedicated to Smita, whose heart and kindness illuminate everyone around her. Never lose that child-like wonder and warm spirit!',
    excerpt: '“All grown-ups were once children... but only few of them remember it.” He laughed his clear, silvery laughter, like a thousand golden bells ringing across a field of sunflowers.'
  },
  {
    id: 'f2',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    year: '2020',
    category: 'fiction',
    genre: 'Magical Realism / Comfort',
    rating: 5,
    badge: 'Life Affirming ✨',
    coverColor: 'linear-gradient(135deg, #1b263b, #0d1b2a)',
    accentColor: '#00b4d8',
    emblem: '🕰️',
    sunflowerMood: 'dreamy',
    quote: '“Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.”',
    synopsis: 'Nora Seed finds herself in a magical library where every book on the infinite shelves allows her to experience what her life would be like if she had made different choices.',
    dedication: 'For Smita: A reminder that your unique path in this life is beautiful just as it is, and every tomorrow holds boundless magic for you.',
    excerpt: '“Never underestimate the big importance of small things... You don’t have to understand life. You just have to live it.”'
  },
  {
    id: 'f3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: '1813',
    category: 'fiction',
    genre: 'Classic Romance / Wit',
    rating: 5,
    badge: 'Masterpiece 🎀',
    coverColor: 'linear-gradient(135deg, #5e503f, #a9927d)',
    accentColor: '#f3c68f',
    emblem: '💌',
    sunflowerMood: 'romantic',
    quote: '“I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!”',
    synopsis: 'The spirited and sharp-witted Elizabeth Bennet clashes with the reserved and proud Mr. Darcy in a masterclass of romance, humor, and timeless human nature.',
    dedication: 'Because Smita has that exact same lively wit, sparkling charm, and unapologetic self-worth as Elizabeth Bennet!',
    excerpt: '“There is a stubbornness about me that never can bear to be frightened at the will of others. My courage always rises with every attempt to intimidate me.”'
  },
  {
    id: 'f4',
    title: 'Before the Coffee Gets Cold',
    author: 'Toshikazu Kawaguchi',
    year: '2015',
    category: 'fiction',
    genre: 'Cozy Fantasy / Heartwarming',
    rating: 5,
    badge: 'Cozy Nook ☕',
    coverColor: 'linear-gradient(135deg, #7f5539, #9c6644)',
    accentColor: '#ddb892',
    emblem: '☕',
    sunflowerMood: 'cozy',
    quote: '“Water flows from higher places to lower places. That is the nature of water. Gravity also pulls all things downward. But human hearts have the power to lift one another up.”',
    synopsis: 'In a cozy Tokyo café tucked in an alley, a customer can sit in a specific seat and travel back in time—but only for as long as their coffee remains warm.',
    dedication: 'For our endless coffee dates, 2 AM confessions, and moments where time seems to happily stand still when we talk.',
    excerpt: 'The bell chimed softly as the front door swung open. A gentle aroma of freshly ground beans filled the air, mingled with the peaceful scent of rain outside.'
  },
  {
    id: 'f5',
    title: 'Harry Potter and the Sorcerer’s Stone',
    author: 'J.K. Rowling',
    year: '1997',
    category: 'fiction',
    genre: 'Fantasy / Adventure',
    rating: 5,
    badge: 'Pure Nostalgia ⚡',
    coverColor: 'linear-gradient(135deg, #780000, #c1121f)',
    accentColor: '#ffd166',
    emblem: '⚡',
    sunflowerMood: 'adventurous',
    quote: '“It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.”',
    synopsis: 'A young boy discovers on his eleventh birthday that he is a wizard, leading him to Hogwarts School of Witchcraft and Wizardry, where loyalty and friendship triumph over darkness.',
    dedication: 'Happy Birthday to our favorite wizard! You bring true magic into every room you step into.',
    excerpt: '“Ah, music,” he said, wiping his eyes. “A magic beyond all we do here!” The great hall flickered with floating candles and celebratory cheer.'
  },
  {
    id: 'f6',
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    year: '2011',
    category: 'fiction',
    genre: 'Magical Romance / Aesthetics',
    rating: 5,
    badge: 'Aesthetic Dream 🎪',
    coverColor: 'linear-gradient(135deg, #212529, #343a40)',
    accentColor: '#f8f9fa',
    emblem: '🎪',
    sunflowerMood: 'dreamy',
    quote: '“You may tell a tale that takes up residence in someone’s soul, becomes their blood and purpose. That tale will move them and guide them.”',
    synopsis: 'A whimsical circus appears without warning, open only from dusk till dawn, full of striped black-and-white tents that house impossible wonders and a fierce magical duel of love.',
    dedication: 'For Smita’s supreme love of gorgeous aesthetics, sweet scents, and enchanting nights out with best friends.',
    excerpt: 'The circus arrives without announcement. It is simply there, when yesterday it was not. Inside, smells of caramel, popcorn, and toasted vanilla drift through the starlit tents.'
  },
  {
    id: 'f7',
    title: 'Anne of Green Gables',
    author: 'L.M. Montgomery',
    year: '1908',
    category: 'fiction',
    genre: 'Heartwarming Classic / Joy',
    rating: 5,
    badge: 'Pure Sunshine 🌻',
    coverColor: 'linear-gradient(135deg, #386641, #6a994e)',
    accentColor: '#f2e8cf',
    emblem: '👒',
    sunflowerMood: 'romantic',
    quote: '“Dear old world, you are very lovely, and I am glad to be alive in you... Isn’t it nice to think that tomorrow is a new day with no mistakes in it yet?”',
    synopsis: 'The imaginative, talkative, and spirited Anne Shirley arrives on Prince Edward Island and forever transforms the lives of everyone she meets through sheer love and optimism.',
    dedication: 'No book reminds us of Smita more than Anne of Green Gables—bright, wonderfully expressive, deeply loving, and full of sunshine!',
    excerpt: '“I don’t know what lies around the bend, but I’m going to believe that the best does.” Anne looked out at the rolling hills kissed by golden sunbeams.'
  },
  {
    id: 'f8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    year: '1988',
    category: 'fiction',
    genre: 'Fable / Adventure',
    rating: 5,
    badge: 'Soul Journey 🌟',
    coverColor: 'linear-gradient(135deg, #bc6c25, #dda15e)',
    accentColor: '#fefae0',
    emblem: '🧭',
    sunflowerMood: 'adventurous',
    quote: '“And, when you want something, all the universe conspires in helping you to achieve it.”',
    synopsis: 'The inspiring journey of Santiago, an Andalusian shepherd boy who dreams of discovering a worldly treasure and learns to listen to the whispers of his heart.',
    dedication: 'May all your grandest dreams and wishes come true this year, Smita! The entire universe is cheering for you!',
    excerpt: '“Tell your heart that the fear of suffering is worse than the suffering itself. And that no heart has ever suffered when it goes in search of its dreams.”'
  },

  // --- NON-FICTION ---
  {
    id: 'nf1',
    title: 'Atomic Habits',
    author: 'James Clear',
    year: '2018',
    category: 'non-fiction',
    genre: 'Self-Growth & Mastery',
    rating: 5,
    badge: 'Life Changing ⚡',
    coverColor: 'linear-gradient(135deg, #1d3557, #457b9d)',
    accentColor: '#a8dadc',
    emblem: '🎯',
    sunflowerMood: 'inspired',
    quote: '“You do not rise to the level of your goals. You fall to the level of your systems. Small habits make a colossal difference.”',
    synopsis: 'A groundbreaking, practical guide on how tiny 1% daily improvements compound over time into massive personal transformations and lifelong success.',
    dedication: 'Because Smita is always striving, growing, and becoming an even more extraordinary version of herself every single day.',
    excerpt: '“Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity.”'
  },
  {
    id: 'nf2',
    title: 'Braiding Sweetgrass',
    author: 'Robin Wall Kimmerer',
    year: '2013',
    category: 'non-fiction',
    genre: 'Nature & Indigenous Wisdom',
    rating: 5,
    badge: 'Healing & Soul 🌿',
    coverColor: 'linear-gradient(135deg, #2d6a4f, #40916c)',
    accentColor: '#b7e4c7',
    emblem: '🌿',
    sunflowerMood: 'peaceful',
    quote: '“In some Native languages the term for plants translates to ‘those who take care of us.’ The earth asks of us only that we return the gift with gratitude and care.”',
    synopsis: 'An indigenous botanist shows how other living beings offer us gifts and lessons, weaving together traditional indigenous knowledge and scientific inquiry into a tapestry of ecological wonder.',
    dedication: 'Like the sunflowers that turn to face the light, this book is a gentle reminder of the peace, beauty, and healing found in simple natural joys.',
    excerpt: '“Even a wounded world is feeding us. Even a wounded world holds us, giving us moments of wonder and beauty. Gratitude is our first step in healing.”'
  },
  {
    id: 'nf3',
    title: 'Becoming',
    author: 'Michelle Obama',
    year: '2018',
    category: 'non-fiction',
    genre: 'Inspiring Memoir & Grace',
    rating: 5,
    badge: 'Empowering 👑',
    coverColor: 'linear-gradient(135deg, #5a189a, #7b2cbf)',
    accentColor: '#e0aaff',
    emblem: '🌸',
    sunflowerMood: 'inspired',
    quote: '“For me, becoming isn’t about arriving somewhere or achieving a certain aim. It’s forward motion, a means of evolving, a way to reach continuously toward a better self.”',
    synopsis: 'An intimate, powerful, and inspiring memoir by the former First Lady of the United States, chronicling the experiences that shaped her voice and purpose.',
    dedication: 'To Smita, a young woman with unstoppable grace, dignity, intelligence, and unmatched queen energy!',
    excerpt: '“There’s power in allowing yourself to be known and heard, in owning your unique story, in using your authentic voice. And there’s grace in being willing to know and hear others.”'
  },
  {
    id: 'nf4',
    title: 'The Boy, the Mole, the Fox and the Horse',
    author: 'Charlie Mackesy',
    year: '2019',
    category: 'non-fiction',
    genre: 'Illustrated Wisdom & Comfort',
    rating: 5,
    badge: 'Warm Hug 🧸',
    coverColor: 'linear-gradient(135deg, #3d348b, #7678ed)',
    accentColor: '#f7b801',
    emblem: '🧸',
    sunflowerMood: 'cozy',
    quote: '“‘What do you want to be when you grow up?’ asked the mole. ‘Kind,’ said the boy.”',
    synopsis: 'A tender, beautifully illustrated exploration of four unlikely companions who share timeless life lessons about vulnerability, courage, friendship, and self-compassion.',
    dedication: 'This whole book reads like a warm hug from a best friend—just like the comfort and safety you bring into my life every day.',
    excerpt: '“‘What is the bravest thing you have ever said?’ asked the boy. ‘Help,’ said the horse. ‘Asking for help isn’t giving up. It’s refusing to give up.’”'
  },
  {
    id: 'nf5',
    title: 'Big Magic: Creative Living Beyond Fear',
    author: 'Elizabeth Gilbert',
    year: '2015',
    category: 'non-fiction',
    genre: 'Creativity & Soul',
    rating: 5,
    badge: 'Spark of Joy ✨',
    coverColor: 'linear-gradient(135deg, #d90429, #ef233c)',
    accentColor: '#ffb3c6',
    emblem: '🎨',
    sunflowerMood: 'inspired',
    quote: '“The universe buries strange jewels deep within us all, and then stands back to see if we can find them.”',
    synopsis: 'A vibrant and joyful manifesto on how to embrace curiosity, release unnecessary fear, and live a life driven more by wonder than anxiety.',
    dedication: 'Smita has such an artistic, expressive, and radiant soul. May this year ignite all your creative dreams!',
    excerpt: '“Do whatever brings you to life, then. Follow your own fascinations, obsessions, and compulsions. Trust them. Create whatever causes a revolution in your heart.”'
  },
  {
    id: 'nf6',
    title: 'Ikigai: The Japanese Secret to Long & Happy Life',
    author: 'Héctor García & Francesc Miralles',
    year: '2016',
    category: 'non-fiction',
    genre: 'Mindfulness & Happiness',
    rating: 5,
    badge: 'Sweet Harmony 🌸',
    coverColor: 'linear-gradient(135deg, #14213d, #000000)',
    accentColor: '#fca311',
    emblem: '🍵',
    sunflowerMood: 'peaceful',
    quote: '“There is a passion inside you, a unique talent that gives meaning to your days and drives you to share the best of yourself with the world.”',
    synopsis: 'Discovers the centuries-old Japanese art of finding your "reason for being", combining what you love, what you are good at, and what brings peace to the soul.',
    dedication: 'Wishing you a lifetime of health, peaceful mornings, delicious food, deep friendships, and joyful purpose!',
    excerpt: '“Only staying active will make you want to live a hundred years. Essentials for happiness in this life are something to do, something to love, and something to hope for.”'
  },
  {
    id: 'nf7',
    title: 'Quiet: The Power of Introverts',
    author: 'Susan Cain',
    year: '2012',
    category: 'non-fiction',
    genre: 'Psychology & Inner Strength',
    rating: 5,
    badge: 'Profound Read 💡',
    coverColor: 'linear-gradient(135deg, #003049, #669bbc)',
    accentColor: '#fdf0d5',
    emblem: '📖',
    sunflowerMood: 'peaceful',
    quote: '“There’s zero correlation between being the best talker and having the best ideas. Solitude matters, and for some people, it’s the air that they breathe.”',
    synopsis: 'An eye-opening exploration of how introverts, deep thinkers, and quiet observers possess profound creative and empathetic strengths often overlooked in a noisy world.',
    dedication: 'For those moments of quiet serenity, cozy reading in bed with a warm blanket, and observing the world with a gentle, wise gaze.',
    excerpt: '“The secret to life is to put yourself in the right lighting. For some, it’s a Broadway spotlight; for others, a sunlit desk surrounded by blooming flowers.”'
  },
  {
    id: 'nf8',
    title: 'Educated',
    author: 'Tara Westover',
    year: '2018',
    category: 'non-fiction',
    genre: 'Memoir & Resilience',
    rating: 5,
    badge: 'Inspiring Grit ⛰️',
    coverColor: 'linear-gradient(135deg, #4a4e69, #22223b)',
    accentColor: '#c9ada7',
    emblem: '⛰️',
    sunflowerMood: 'inspired',
    quote: '“You can love someone and still choose to say goodbye to them. You can miss a person every day, and still be glad that they are no longer in your life.”',
    synopsis: 'An unforgettable memoir about an isolated young girl who first steps into a classroom at age seventeen, forging her own identity and earning a doctorate through sheer will.',
    dedication: 'Celebrating your resilience, your independent spirit, and your fearless ability to write your own magnificent destiny.',
    excerpt: '“My life was narrated for me by others. Their voices were forceful, emphatic, absolute. It had never occurred to me that my voice might be as strong as theirs.”'
  }
];

// Default Pre-seeded Sunflower Garden Wishes
const INITIAL_SUNFLOWER_WISHES = [
  {
    id: 1,
    author: 'Honey ♡',
    text: 'May your smile shine brighter than a million sunflowers every day! Happy Birthday bestie! 🌻✨',
    sunflower: '🌻'
  },
  {
    id: 2,
    author: 'Your Soul Sister 👭',
    text: 'Here is a sunflower for all our endless coffee dates, 2 AM gossip sessions, and unforgettable memories! ☕💛',
    sunflower: '🌻'
  },
  {
    id: 3,
    author: 'The Reading Squad 📚',
    text: 'Keep turning the pages of your life story! May every new chapter be filled with magic and love. 📖🌸',
    sunflower: '🌻'
  },
  {
    id: 4,
    author: 'The Universe ☀️',
    text: '“Keep your face always toward the sunshine, and shadows will fall behind you.” — Walt Whitman 💛',
    sunflower: '🌻'
  }
];

// Bookmark Color Themes
const BOOKMARK_THEMES = [
  { id: 'gold', name: 'Golden Bloom', bg: 'linear-gradient(135deg, #ffb703, #fb8500)', border: '#ffe680', text: '#fff' },
  { id: 'sunset', name: 'Sunset Terracotta', bg: 'linear-gradient(135deg, #e76f51, #f4a261)', border: '#fceade', text: '#fff' },
  { id: 'sage', name: 'Forest Meadow', bg: 'linear-gradient(135deg, #2a9d8f, #264653)', border: '#b7e4c7', text: '#fff' },
  { id: 'lavender', name: 'Starlit Velvet', bg: 'linear-gradient(135deg, #7b2cbf, #3c096c)', border: '#e0aaff', text: '#fff' },
  { id: 'parchment', name: 'Antique Parchment', bg: 'linear-gradient(135deg, #8b5e3c, #6f4518)', border: '#fed9b7', text: '#fff' }
];

// Cover Gradient Presets for Adding & Editing Books
const COVER_PRESETS = [
  { label: 'Sunflower Gold', color: 'linear-gradient(135deg, #bc6c25, #dda15e)', emblem: '🌻' },
  { label: 'Deep Amber', color: 'linear-gradient(135deg, #ffb703, #fb8500)', emblem: '✨' },
  { label: 'Midnight Library', color: 'linear-gradient(135deg, #1b263b, #0d1b2a)', emblem: '🕰️' },
  { label: 'Classic Crimson', color: 'linear-gradient(135deg, #780000, #c1121f)', emblem: '⚡' },
  { label: 'Meadow Emerald', color: 'linear-gradient(135deg, #2d6a4f, #40916c)', emblem: '🌿' },
  { label: 'Warm Latte', color: 'linear-gradient(135deg, #7f5539, #9c6644)', emblem: '☕' },
  { label: 'Royal Orchid', color: 'linear-gradient(135deg, #5a189a, #7b2cbf)', emblem: '👑' },
  { label: 'Parchment Wit', color: 'linear-gradient(135deg, #5e503f, #a9927d)', emblem: '💌' },
];

export default function LibraryPage() {
  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'fiction', 'non-fiction', 'birthday-pick', 'saved'
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editable Books state (persists in localStorage so users can edit or add books)
  const [booksList, setBooksList] = useState(() => {
    try {
      const saved = localStorage.getItem('smita_library_books');
      return saved ? JSON.parse(saved) : BOOKS_CATALOG;
    } catch {
      return BOOKS_CATALOG;
    }
  });

  // State for Add Your Own Book Modal
  const DEFAULT_NEW_BOOK = {
    title: '',
    author: '',
    category: 'fiction',
    genre: '',
    quote: '',
    dedication: '',
    coverColor: COVER_PRESETS[0].color,
    emblem: '🌻'
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBookForm, setNewBookForm] = useState(DEFAULT_NEW_BOOK);

  // Bookmarks state (saved to localStorage)
  const [savedBookIds, setSavedBookIds] = useState(() => {
    try {
      const saved = localStorage.getItem('Smita_library_bookmarks');
      return saved ? JSON.parse(saved) : ['f1', 'f4', 'nf1', 'nf4'];
    } catch {
      return ['f1', 'f4', 'nf1', 'nf4'];
    }
  });

  // Selected Book for 2-page Reader Modal
  const [selectedBook, setSelectedBook] = useState(null);

  // Sunflower Wishes Garden state
  const [gardenSunflowers, setGardenSunflowers] = useState(() => {
    try {
      const saved = localStorage.getItem('Smita_sunflower_wishes');
      return saved ? JSON.parse(saved) : INITIAL_SUNFLOWER_WISHES;
    } catch {
      return INITIAL_SUNFLOWER_WISHES;
    }
  });

  // Wish Modal (viewing a planted sunflower wish)
  const [activeWish, setActiveWish] = useState(null);

  // New Sunflower Form inputs
  const [newAuthor, setNewAuthor] = useState('');
  const [newWishText, setNewWishText] = useState('');

  // Sunflower Mood Oracle state
  const [selectedMood, setSelectedMood] = useState(null);
  const [oracleBook, setOracleBook] = useState(null);

  // Bookmark Customizer state
  const [bmTheme, setBmTheme] = useState(BOOKMARK_THEMES[0]);
  const [bmQuote, setBmQuote] = useState('“Keep your face to the sun and you will never see the shadows.”');
  const [bmRecipient, setBmRecipient] = useState('Smita’s Reading Haven ♡');
  const [copiedLink, setCopiedLink] = useState(false);

  // Falling Petals Ambient Toggle
  const [petalsActive, setPetalsActive] = useState(true);

  // Save books to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smita_library_books', JSON.stringify(booksList));
    } catch { }
  }, [booksList]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('Smita_library_bookmarks', JSON.stringify(savedBookIds));
    } catch { }
  }, [savedBookIds]);

  // Save garden wishes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('Smita_sunflower_wishes', JSON.stringify(gardenSunflowers));
    } catch { }
  }, [gardenSunflowers]);

  // Initial celebration on landing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fireSunflowerConfetti();
  }, []);

  // Filter books based on search, category, and genre
  const filteredBooks = useMemo(() => {
    return booksList.filter(book => {
      // Category Filter
      if (activeCategory === 'fiction' && book.category !== 'fiction') return false;
      if (activeCategory === 'non-fiction' && book.category !== 'non-fiction') return false;
      if (activeCategory === 'saved' && !savedBookIds.includes(book.id)) return false;
      if (activeCategory === 'birthday-pick' && !['f1', 'f4', 'f7', 'nf3', 'nf4'].includes(book.id)) return false;

      // Genre Filter
      if (selectedGenre !== 'all' && !book.genre.toLowerCase().includes(selectedGenre.toLowerCase())) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (book.title || '').toLowerCase().includes(q);
        const inAuthor = (book.author || '').toLowerCase().includes(q);
        const inGenre = (book.genre || '').toLowerCase().includes(q);
        const inQuote = (book.quote || '').toLowerCase().includes(q);
        const inDedication = (book.dedication || '').toLowerCase().includes(q);
        return inTitle || inAuthor || inGenre || inQuote || inDedication;
      }
      return true;
    });
  }, [booksList, activeCategory, selectedGenre, searchQuery, savedBookIds]);

  // Toggle bookmark
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    soundEngine.playSparkleSound();
    setSavedBookIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter(x => x !== id);
      } else {
        fireSunflowerConfetti(0.8, 0.4);
        return [...prev, id];
      }
    });
  };

  // Open Book Modal
  const handleOpenBook = (book) => {
    soundEngine.playSparkleSound();
    setSelectedBook(book);
  };

  // Open Add New Book Modal
  const handleOpenAddBook = () => {
    soundEngine.playSparkleSound();
    setNewBookForm(DEFAULT_NEW_BOOK);
    setIsAddModalOpen(true);
  };

  // Save New Book submitted by user
  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    if (!newBookForm.title.trim() || !newBookForm.author.trim()) return;

    soundEngine.playSparkleSound();
    fireSunflowerConfetti(0.5, 0.5);

    const bookToAdd = {
      id: 'custom_' + Date.now(),
      title: newBookForm.title.trim(),
      author: newBookForm.author.trim(),
      year: new Date().getFullYear().toString(),
      category: newBookForm.category,
      genre: newBookForm.genre.trim() || (newBookForm.category === 'fiction' ? 'Fiction' : 'Non-Fiction'),
      rating: 5,
      badge: 'Added by Smita 💖',
      coverColor: newBookForm.coverColor,
      accentColor: '#ffd166',
      emblem: newBookForm.emblem || '🌻',
      sunflowerMood: 'dreamy',
      quote: newBookForm.quote.trim() || '“A wonderful book to cherish forever.”',
      synopsis: `Added with love by Smita to her personal library collection.`,
      dedication: newBookForm.dedication.trim() || 'One of Smita’s personal favorite reads! 🌸',
      excerpt: newBookForm.quote.trim() || '“Between pages of a book is a lovely place to be.”',
      isCustom: true
    };

    setBooksList(prev => [bookToAdd, ...prev]);
    setIsAddModalOpen(false);
    setNewBookForm(DEFAULT_NEW_BOOK);
  };

  // Delete a custom book
  const handleDeleteCustomBook = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Remove this book from your library?')) {
      soundEngine.playSparkleSound();
      setBooksList(prev => prev.filter(b => b.id !== id));
      if (selectedBook && selectedBook.id === id) setSelectedBook(null);
    }
  };

  // Reset to original 16 books
  const handleResetDefaultBooks = () => {
    if (window.confirm('Reset all books back to the original 16 curated treasures?')) {
      soundEngine.playSparkleSound();
      fireSunflowerConfetti();
      setBooksList(BOOKS_CATALOG);
      try {
        localStorage.removeItem('smita_library_books');
      } catch { }
    }
  };


  // Plant a new sunflower
  const handlePlantSunflower = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newWishText.trim()) return;

    soundEngine.playHornSound();
    fireSunflowerConfetti(0.5, 0.7);

    const newSunflower = {
      id: Date.now(),
      author: newAuthor.trim(),
      text: newWishText.trim(),
      sunflower: '🌻'
    };

    setGardenSunflowers(prev => [...prev, newSunflower]);
    setNewAuthor('');
    setNewWishText('');
  };

  // Handle Mood Oracle selection
  const handleMoodSelect = (mood) => {
    soundEngine.playSparkleSound();
    setSelectedMood(mood);
    fireSunflowerConfetti(0.5, 0.4);

    const matches = booksList.filter(b => b.sunflowerMood === mood);
    const chosen = matches[Math.floor(Math.random() * matches.length)] || booksList[0];
    setOracleBook(chosen);
  };


  // Copy bookmark note
  const handleCopyBookmark = () => {
    soundEngine.playSparkleSound();
    fireHeartConfetti();
    const textToCopy = `🌻 ${bmRecipient}\n${bmQuote}\n— Picked with love on Smita's Birthday! ✨`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="library-root">
      {/* Falling Golden Sunflower Petals */}
      {petalsActive && (
        <div className="sunflower-petals-layer" aria-hidden="true">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="falling-petal"
              style={{
                left: `${(i * 6.25 + (i % 3) * 2)}%`,
                animationDuration: `${7 + (i % 5) * 2.2}s`,
                animationDelay: `${(i * 0.45)}s`,
                width: `${14 + (i % 4) * 4}px`,
                height: `${22 + (i % 4) * 6}px`
              }}
            />
          ))}
        </div>
      )}

      {/* Top Navbar */}
      <header className="library-topbar">
        <div className="topbar-content">
          <Link to="/" className="topbar-brand" title="Return to Birthday Celebration">
            <span className="brand-sunflower-icon">🌻</span>
            <div className="brand-text">
              <h1>Smita’s Sunflower Haven</h1>
              <span>The Cozy Birthday Library</span>
            </div>
          </Link>

          <div className="topbar-actions">
            <button
              className="topbar-btn"
              onClick={() => {
                soundEngine.playSparkleSound();
                fireSunflowerConfetti();
              }}
              title="Blast Golden Sunflowers!"
            >
              <span>🌻</span> Shower Petals
            </button>

            <button
              className="topbar-btn"
              onClick={() => {
                soundEngine.playSparkleSound();
                soundEngine.startTrack(1); // Lofi cozy chords
              }}
              title="Play Cozy Background Melody"
            >
              <span>🎵</span> Cozy Tunes
            </button>

            <button
              className={`topbar-btn ${petalsActive ? 'primary' : ''}`}
              onClick={() => setPetalsActive(!petalsActive)}
              title="Toggle Petals Falling"
            >
              {petalsActive ? '🌼 Petals On' : '🌼 Petals Off'}
            </button>

            <Link to="/" className="topbar-btn primary">
              ← Return Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero / Garden Sanctuary Section */}
      <section className="library-hero">
        <div className="hero-wreath-decor">
          <div className="wreath-line"></div>
          <div className="hero-sunflower-crown">
            <span className="sunflower-spin">🌻</span>
            <span>✨</span>
            <span className="sunflower-spin">🌻</span>
          </div>
          <div className="wreath-line"></div>
        </div>
        <h2>
          Welcome to <span className="highlight-name">Smita’s Library</span> 🌻
        </h2>

        <p className="hero-quote">
          “Keep your face always toward the sunshine, and shadows will fall behind you.”
          <br />
          <span style={{ fontSize: '18px', opacity: 0.85 }}>— Handpicked literary worlds & timeless wisdom for your birthday —</span>
        </p>

        {/* Stats Shelf */}
        <div className="hero-stats-shelf">
          <div className="shelf-stat-badge">
            <span className="stat-icon">📚</span>
            <div className="stat-info">
              <div className="stat-num">{booksList.length} Books in Collection</div>
              <div className="stat-label">Fiction & Non-Fiction</div>
            </div>
          </div>

          <div className="shelf-stat-badge">
            <span className="stat-icon">🌻</span>
            <div className="stat-info">
              <div className="stat-num">{gardenSunflowers.length} Blooming Sunflowers</div>
              <div className="stat-label">Planted with Bestie Love</div>
            </div>
          </div>

          <div className="shelf-stat-badge">
            <span className="stat-icon">🔖</span>
            <div className="stat-info">
              <div className="stat-num">{savedBookIds.length} Saved in List</div>
              <div className="stat-label">My Birthday Reading List</div>
            </div>
          </div>

          <div className="shelf-stat-badge">
            <span className="stat-icon">💖</span>
            <div className="stat-info">
              <div className="stat-num">100% Cozy Vibes</div>
              <div className="stat-label">Warm, Sweet & Precious</div>
            </div>
          </div>
        </div>

        {/* Quick Jump Bar */}
        <div className="feature-jump-bar">
          <a href="#bookshelf" className="feature-jump-pill">
            <span>📚</span> Browse All Books
          </a>
          <a href="#sunflower-oracle" className="feature-jump-pill">
            <span>🔮</span> Sunflower Mood Oracle
          </a>
          <a href="#sunflower-garden" className="feature-jump-pill">
            <span>🌱</span> Wish Garden ({gardenSunflowers.length})
          </a>
          <a href="#bookmark-maker" className="feature-jump-pill">
            <span>🔖</span> Custom Bookmark
          </a>
        </div>
      </section>

      {/* =========================================
          SUNFLOWER MOOD ORACLE SECTION
          ========================================= */}
      <section id="sunflower-oracle" className="sunflower-oracle-section">
        <div className="oracle-card">
          <span className="oracle-badge">✨ Sunflower Mood Oracle</span>
          <h3>What should Smita read next? 🌻</h3>
          <p className="oracle-desc">
            Tap how you're feeling on your birthday, and let the golden sunflowers whisper the perfect book recommendation!
          </p>

          <div className="mood-buttons-grid">
            <button
              className={`mood-btn ${selectedMood === 'dreamy' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('dreamy')}
            >
              <span>🌸</span> Dreamy & Whimsical
            </button>
            <button
              className={`mood-btn ${selectedMood === 'cozy' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('cozy')}
            >
              <span>☕</span> Cozy Coffee & Rain
            </button>
            <button
              className={`mood-btn ${selectedMood === 'adventurous' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('adventurous')}
            >
              <span>🚀</span> Bold Adventure & Wonder
            </button>
            <button
              className={`mood-btn ${selectedMood === 'romantic' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('romantic')}
            >
              <span>💖</span> Soft & Heartwarming
            </button>
            <button
              className={`mood-btn ${selectedMood === 'peaceful' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('peaceful')}
            >
              <span>🌿</span> Peaceful & Grounded
            </button>
            <button
              className={`mood-btn ${selectedMood === 'inspired' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('inspired')}
            >
              <span>🎯</span> High Ambition & Spark
            </button>
          </div>

          {oracleBook && (
            <div className="oracle-result-box">
              <div className="result-sunflower-header">
                <span>🌻 The Sunflowers Have Chosen For You:</span>
              </div>
              <div className="oracle-book-card">
                <div className="oracle-book-spine" style={{ background: oracleBook.coverColor }}>
                  <span>{oracleBook.emblem}</span>
                  <strong>{oracleBook.title}</strong>
                </div>
                <div className="oracle-book-details">
                  <h4>{oracleBook.title}</h4>
                  <p className="oracle-book-author">by {oracleBook.author} • {oracleBook.genre}</p>
                  <p className="oracle-book-blurb">{oracleBook.quote}</p>
                  <div className="oracle-action-row">
                    <button className="read-peek-btn" onClick={() => handleOpenBook(oracleBook)}>
                      📖 Read Sneak Peek & Dedication
                    </button>
                    <button
                      className="modal-action-btn"
                      onClick={(e) => toggleBookmark(oracleBook.id, e)}
                    >
                      {savedBookIds.includes(oracleBook.id) ? '🔖 Saved in Wishlist' : '🔖 Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          SEARCH & FILTER PANEL
          ========================================= */}
      <section id="bookshelf" className="library-filter-panel">
        <div className="filter-glass-card">
          <div className="filter-top-row">
            {/* Search Input */}
            <div className="search-input-wrap">
              <span className="search-icon-decor">🔍</span>
              <input
                type="text"
                placeholder="Search by book title, author, genre, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="library-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="category-tabs-row">
              <button
                className={`cat-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('all'); soundEngine.playSparkleSound(); }}
              >
                <span>🌻 All Books</span>
                <span className="cat-tab-count">{booksList.length}</span>
              </button>

              <button
                className={`cat-tab-btn ${activeCategory === 'fiction' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('fiction'); soundEngine.playSparkleSound(); }}
              >
                <span>🧚 Fictional Worlds</span>
                <span className="cat-tab-count">
                  {booksList.filter(b => b.category === 'fiction').length}
                </span>
              </button>

              <button
                className={`cat-tab-btn ${activeCategory === 'non-fiction' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('non-fiction'); soundEngine.playSparkleSound(); }}
              >
                <span>🌿 Non-Fictional Wisdom</span>
                <span className="cat-tab-count">
                  {booksList.filter(b => b.category === 'non-fiction').length}
                </span>
              </button>

              <button
                className={`cat-tab-btn ${activeCategory === 'birthday-pick' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('birthday-pick'); soundEngine.playSparkleSound(); }}
              >
                <span>⭐ Bestie’s Picks</span>
              </button>

              <button
                className={`cat-tab-btn ${activeCategory === 'saved' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('saved'); soundEngine.playSparkleSound(); }}
              >
                <span>🔖 My Saved List</span>
                <span className="cat-tab-count">{savedBookIds.length}</span>
              </button>

              <button
                className="cat-tab-btn add-book-pill"
                onClick={handleOpenAddBook}
                title="Add a custom book to the library"
              >
                <span>➕ Add Book</span>
              </button>

              <button
                className="cat-tab-btn reset-books-pill"
                onClick={handleResetDefaultBooks}
                title="Reset to default 16 books"
              >
                <span>🔄 Reset</span>
              </button>
            </div>
          </div>

          {/* Genre Chips */}
          <div className="genre-chips-scroll">
            {['all', 'Classic', 'Fantasy', 'Philosophy', 'Cozy', 'Memoir', 'Self-Growth', 'Nature'].map((g) => (
              <button
                key={g}
                className={`genre-chip ${selectedGenre === g ? 'active' : ''}`}
                onClick={() => setSelectedGenre(g)}
              >
                {g === 'all' ? '🌟 All Genres' : g}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          THE BOOKSHELF GRID
          ========================================= */}
      <section className="library-bookshelf-section">
        {/* Prominent Add Your Book Banner */}
        <div className="add-book-banner-card">
          <div className="banner-left">
            <span className="banner-icon">📖</span>
            <div>
              <h4>Add Your Favorite Book to the Library!</h4>
            </div>
          </div>
          <button className="add-my-book-btn" onClick={handleOpenAddBook}>
            <span>➕</span> Add a Book to Library
          </button>
        </div>

        <div className="shelf-header-row">
          <h3 className="shelf-title">
            <span>🌻</span>
            {activeCategory === 'fiction' && 'Fictional Adventures & Magical Tales'}
            {activeCategory === 'non-fiction' && 'Non-Fictional Wisdom & Heartfelt Memoirs'}
            {activeCategory === 'birthday-pick' && 'Smita’s Curated Birthday Picks'}
            {activeCategory === 'saved' && 'Your Bookmarked Birthday Reading List'}
            {activeCategory === 'all' && 'The Full Golden Library Collection'}
          </h3>
          <span className="shelf-counter">
            Showing {filteredBooks.length} of {booksList.length} books
          </span>
        </div>

        <div className="books-grid">
          {filteredBooks.map((book) => {
            const isSaved = savedBookIds.includes(book.id);
            return (
              <div key={book.id} className="book-card">
                {/* Visual Cover Top */}
                <div className="book-cover-stage" style={{ background: book.coverColor }}>
                  <div className="book-spine-effect"></div>
                  {isSaved && <div className="book-bookmark-ribbon" title="Bookmarked in your reading list"></div>}

                  <div className="book-top-badges">
                    <span className="category-badge-chip">
                      {book.category === 'fiction' ? '🧚 Fiction' : '🌿 Non-Fiction'}
                    </span>
                    {book.isCustom && (
                      <span className="category-badge-chip" style={{ background: '#fef08a', color: '#854d0e', fontWeight: 800 }}>
                        ✨ Smita’s Pick
                      </span>
                    )}
                    <button
                      className={`bookmark-toggle-btn ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => toggleBookmark(book.id, e)}
                      title={isSaved ? 'Remove from reading list' : 'Bookmark this book'}
                    >
                      {isSaved ? '★' : '☆'}
                    </button>
                  </div>

                  <div className="book-cover-center">
                    <span className="book-sunflower-emblem">{book.emblem}</span>
                    <h4 className="book-cover-title">{book.title}</h4>
                    <p className="book-cover-author">{book.author}</p>
                  </div>

                  <span className="book-genre-pill">{book.genre}</span>
                </div>

                {/* Content Details Bottom */}
                <div className="book-card-info">
                  <p className="book-quote-preview">{book.quote}</p>

                  <div className="book-dedication-note">
                    <strong>💌 For Smita:</strong> {book.dedication}
                  </div>

                  <div className="book-card-actions">
                    <button className="read-peek-btn" onClick={() => handleOpenBook(book)}>
                      📖 Read Sneak Peek
                    </button>
                    {book.isCustom && (
                      <button
                        className="delete-custom-book-btn"
                        onClick={(e) => handleDeleteCustomBook(book.id, e)}
                        title="Remove custom book from library"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}


          {filteredBooks.length === 0 && (
            <div className="empty-bookshelf">
              <div className="empty-icon">🌻</div>
              <h3>No books match your search!</h3>
              <p>Try searching for another title, author, or reset your filters.</p>
              <button
                className="topbar-btn primary"
                style={{ marginTop: '16px' }}
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); setSelectedGenre('all'); }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          INTERACTIVE SUNFLOWER WISH GARDEN
          ========================================= */}
      <section id="sunflower-garden" className="sunflower-garden-section">
        <div className="garden-wrapper-card">
          <div className="garden-header">
            <span className="garden-badge">🌱 The Enchanted Sunflower Patch</span>
            <h3>Smita’s Sunflower Wish Garden 🌻</h3>
            <p>
              Every sunflower below was planted with love, holding a warm birthday wish, heartfelt quote, or sweet memory! Click on any sunflower to read its secret message.
            </p>
          </div>

          {/* Soil Bed with Interactive Sunflowers */}
          <div className="garden-bed">
            <div className="garden-soil-grass">
              <span>🌿</span><span>🌱</span><span>🌿</span><span>🌱</span><span>🌿</span><span>🌱</span>
            </div>

            {gardenSunflowers.map((item, idx) => (
              <div
                key={item.id}
                className="planted-sunflower-item"
                onClick={() => {
                  soundEngine.playSparkleSound();
                  fireSunflowerConfetti(0.5, 0.6);
                  setActiveWish(item);
                }}
                title={`Click to read wish from ${item.author}`}
              >
                <div
                  className="sunflower-flower-head"
                  style={{ animationDelay: `${(idx * 0.3)}s` }}
                >
                  🌻
                </div>
                <div className="sunflower-stem">
                  <div className="sunflower-stem-leaf"></div>
                  <div className="sunflower-stem-leaf right"></div>
                </div>
                <div className="sunflower-planter-tag">
                  {item.author}
                </div>
              </div>
            ))}
          </div>

          {/* Plant Your Own Sunflower Form */}
          <div className="plant-sunflower-card">
            <form onSubmit={handlePlantSunflower} className="plant-form-grid">
              <input
                type="text"
                placeholder="Your Name (e.g. Honey / Bestie)"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="plant-input"
                required
              />
              <input
                type="text"
                placeholder="Write a sweet birthday wish or favorite book quote for Smita..."
                value={newWishText}
                onChange={(e) => setNewWishText(e.target.value)}
                className="plant-input"
                required
              />
              <button type="submit" className="plant-btn">
                🌻 Plant a Sunflower
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================
          CUSTOM SUNFLOWER BOOKMARK CREATOR
          ========================================= */}
      <section id="bookmark-maker" className="sunflower-bookmark-section">
        <div className="bookmark-tool-card">
          <div className="tool-header">
            <span className="tool-badge">🔖 Keepsake Generator</span>
            <h3>Smita’s Sunflower Bookmark Creator 🌻</h3>
          </div>

          <div className="bookmark-creator-layout">
            {/* Controls */}
            <div className="bookmark-controls">
              <div className="control-group">
                <label>1. Pick Bookmark Palette:</label>
                <div className="color-palette-picker">
                  {BOOKMARK_THEMES.map(theme => (
                    <button
                      key={theme.id}
                      className={`color-dot-btn ${bmTheme.id === theme.id ? 'active' : ''}`}
                      style={{ background: theme.bg }}
                      onClick={() => { setBmTheme(theme); soundEngine.playSparkleSound(); }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>

              <div className="control-group">
                <label>2. Bookmark Title / Owner:</label>
                <input
                  type="text"
                  value={bmRecipient}
                  onChange={(e) => setBmRecipient(e.target.value)}
                  className="plant-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div className="control-group">
                <label>3. Select an Inspiring Quote:</label>
                <div className="quote-select-pills">
                  {[
                    '“Keep your face to the sun and you will never see the shadows.”',
                    '“It is only with the heart that one can see rightly.”',
                    '“Between pages of a book is a lovely place to be.”',
                    '“Tomorrow is a new day with no mistakes in it yet.”'
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      className={`quote-pill-btn ${bmQuote === q ? 'active' : ''}`}
                      onClick={() => { setBmQuote(q); soundEngine.playSparkleSound(); }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <button className="plant-btn" onClick={handleCopyBookmark}>
                {copiedLink ? '✓ Copied Bookmark Wish!' : '📋 Copy Bookmark Inscription'}
              </button>
            </div>

            {/* Live Bookmark Physical Mockup */}
            <div className="bookmark-preview-stage">
              <div
                className="physical-bookmark"
                style={{ background: bmTheme.bg, borderColor: bmTheme.border }}
              >
                {/* Hanging Tassel */}
                <div className="bookmark-hanging-tassel">
                  <div className="tassel-eyelet"></div>
                  <div className="tassel-ribbon"></div>
                  <div className="tassel-flower">🌻</div>
                </div>

                <div className="bm-header-flower">🌻</div>

                <div className="bm-recipient-title">
                  {bmRecipient}
                </div>

                <div className="bm-quote-body">
                  {bmQuote}
                </div>

                <div className="bm-footer-seal">
                  Smita’s Birthday 2026 • Best Friends Forever ♡
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          TWO-PAGE OPEN BOOK READER MODAL
          ========================================= */}
      {selectedBook && (
        <div className="book-modal-backdrop" onClick={() => setSelectedBook(null)}>
          <div className="open-book-spread" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-icon-btn"
              onClick={() => setSelectedBook(null)}
              title="Close Book"
            >
              ✕
            </button>

            {/* Left Page */}
            <div className="book-page-left">
              <span className="page-category-tag">
                {selectedBook.category === 'fiction' ? '🧚 Fictional Story' : '🌿 Non-Fictional Work'} • {selectedBook.year}
              </span>
              <h2>{selectedBook.title}</h2>
              <p className="modal-author">by {selectedBook.author}</p>

              <div className="modal-cover-badge" style={{ background: selectedBook.coverColor }}>
                <span>{selectedBook.emblem}</span>
                <strong>{selectedBook.genre}</strong>
              </div>

              <div className="modal-quote-block">
                {selectedBook.quote}
              </div>
            </div>

            {/* Right Page */}
            <div className="book-page-right">
              <div>
                <h4 className="page-section-heading">
                  <span>📖</span> Synopsis
                </h4>
                <p className="modal-synopsis-text">{selectedBook.synopsis}</p>

                <div className="modal-dedication-box">
                  <h5>💌 Why Smita Will Love This:</h5>
                  <p>{selectedBook.dedication}</p>
                </div>

                <h4 className="page-section-heading">
                  <span>✨</span> A Glimpse Inside Chapter 1:
                </h4>
                <div className="modal-excerpt-box">
                  {selectedBook.excerpt}
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  className="modal-action-btn primary"
                  onClick={() => {
                    soundEngine.playSparkleSound();
                    fireSunflowerConfetti(0.5, 0.5);
                  }}
                >
                  🌻 Shower Sunflowers!
                </button>

                <button
                  className="modal-action-btn"
                  onClick={(e) => toggleBookmark(selectedBook.id, e)}
                >
                  {savedBookIds.includes(selectedBook.id) ? '★ Bookmarked in List' : '☆ Add to My List'}
                </button>

                {selectedBook.isCustom && (
                  <button
                    className="modal-action-btn"
                    style={{ color: '#dc2626', borderColor: '#fca5a5' }}
                    onClick={(e) => {
                      handleDeleteCustomBook(selectedBook.id, e);
                    }}
                    title="Remove custom book from library"
                  >
                    🗑️ Remove Book
                  </button>
                )}

                <button
                  className="modal-action-btn"
                  onClick={() => setSelectedBook(null)}
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          SUNFLOWER WISH POPUP MODAL
          ========================================= */}
      {activeWish && (
        <div className="wish-popup-overlay" onClick={() => setActiveWish(null)}>
          <div className="wish-popup-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-icon-btn"
              onClick={() => setActiveWish(null)}
            >
              ✕
            </button>
            <span className="wish-sunflower-icon">🌻</span>
            <h4>Planted with Love</h4>
            <span className="wish-author-badge">from {activeWish.author}</span>
            <p className="wish-quote-text">
              “{activeWish.text}”
            </p>
            <button
              className="plant-btn"
              onClick={() => {
                soundEngine.playSparkleSound();
                fireSunflowerConfetti(0.5, 0.5);
                setActiveWish(null);
              }}
            >
              💛 Send Love Back!
            </button>
          </div>
        </div>
      )}

      {/* =========================================
          ADD BOOK MODAL (Smita can add her own books)
          ========================================= */}
      {isAddModalOpen && (
        <div className="book-editor-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="book-editor-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-icon-btn"
              onClick={() => setIsAddModalOpen(false)}
              title="Close"
            >
              ✕
            </button>

            <div className="editor-header">
              <span className="editor-badge">✨ Add Your Own Book</span>
              <h3>Add a Book to Smita’s Library 🌻</h3>
              <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                Add any of your favorite fictional stories or inspiring non-fictional books to the golden collection!
              </p>
            </div>

            <form onSubmit={handleAddBookSubmit} className="editor-form">
              <div className="editor-field-row">
                <div className="editor-field">
                  <label>Book Title *</label>
                  <input
                    type="text"
                    value={newBookForm.title}
                    onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
                    className="editor-input"
                    placeholder="e.g. Harry Potter / Atomic Habits"
                    required
                  />
                </div>

                <div className="editor-field">
                  <label>Author *</label>
                  <input
                    type="text"
                    value={newBookForm.author}
                    onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
                    className="editor-input"
                    placeholder="e.g. J.K. Rowling / James Clear"
                    required
                  />
                </div>
              </div>

              <div className="editor-field-row">
                <div className="editor-field">
                  <label>Category</label>
                  <select
                    value={newBookForm.category}
                    onChange={(e) => setNewBookForm({ ...newBookForm, category: e.target.value })}
                    className="editor-select"
                  >
                    <option value="fiction">🧚 Fictional Story</option>
                    <option value="non-fiction">🌿 Non-Fictional Wisdom</option>
                  </select>
                </div>

                <div className="editor-field">
                  <label>Genre / Vibe</label>
                  <input
                    type="text"
                    value={newBookForm.genre}
                    onChange={(e) => setNewBookForm({ ...newBookForm, genre: e.target.value })}
                    className="editor-input"
                    placeholder="e.g. Fantasy / Self-Growth / Cozy / Romance"
                  />
                </div>
              </div>

              <div className="editor-field">
                <label>Favorite Quote / Inspiring Line</label>
                <textarea
                  value={newBookForm.quote}
                  onChange={(e) => setNewBookForm({ ...newBookForm, quote: e.target.value })}
                  className="editor-textarea"
                  placeholder="e.g. “Happiness can be found even in the darkest of times, if one only remembers to turn on the light.”"
                />
              </div>

              <div className="editor-field">
                <label>Special Birthday Note / Dedication for Smita</label>
                <textarea
                  value={newBookForm.dedication}
                  onChange={(e) => setNewBookForm({ ...newBookForm, dedication: e.target.value })}
                  className="editor-textarea"
                  placeholder="e.g. One of Smita’s absolute favorite treasures that brings pure joy and inspiration!"
                />
              </div>

              <div className="editor-field">
                <label>Choose Cover Color Theme:</label>
                <div className="editor-cover-presets">
                  {COVER_PRESETS.map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className={`preset-chip-btn ${newBookForm.coverColor === preset.color ? 'active' : ''}`}
                      style={{ background: preset.color }}
                      onClick={() => setNewBookForm({ ...newBookForm, coverColor: preset.color, emblem: preset.emblem })}
                      title={preset.label}
                    />
                  ))}
                </div>
              </div>

              <div className="editor-action-footer">
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="modal-action-btn"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="editor-save-btn">
                    ➕ Add Book to Library
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

