export const galleryItems = [
  { category: 'manicures', title: 'Classic French Manicure',    image: '/images/1.jpg' },
  { category: 'nail-art',  title: 'Floral Nail Art Design',     image: '/images/2.jpg' },
  { category: 'acrylic',   title: 'Long Acrylic Extensions',    image: '/images/3.jpg' },
  { category: 'pedicures', title: 'Luxury Pedicure Treatment',  image: '/images/4.jpg' },
  { category: 'gel',       title: 'Gel Polish Manicure',        image: '/images/5.jpg' },
  { category: 'nail-art',  title: 'Geometric Patterns',         image: '/images/6.jpg' },
  { category: 'manicures', title: 'Nude Elegance',              image: '/images/7.jpg' },
  { category: 'acrylic',   title: 'Stiletto Acrylics',          image: '/images/8.jpg' },
  { category: 'lashes',    title: 'Volume Lash Extensions',     image: '/images/9.jpg' },
  { category: 'pedicures', title: 'Summer Toe Art',             image: '/images/10.jpg' },
  { category: 'brows',     title: 'Perfect Brow Shape',         image: '/images/11.jpg' },
  { category: 'nail-art',  title: 'Abstract Art Design',        image: '/images/12.jpg' },
  { category: 'gel',       title: 'Ombre Gel Nails',            image: '/images/13.jpg' },
  { category: 'manicures', title: 'Minimalist Chic',            image: '/images/14.jpg' },
  { category: 'acrylic',   title: 'Coffin Shape Acrylics',      image: '/images/15.jpg' },
  { category: 'lashes',    title: 'Natural Lash Look',          image: '/images/16.jpg' },
]

export const galleryFilters = [
  { key: 'all',       label: 'All Work' },
  { key: 'manicures', label: 'Manicures' },
  { key: 'pedicures', label: 'Pedicures' },
  { key: 'acrylic',   label: 'Acrylic Nails' },
  { key: 'nail-art',  label: 'Nail Art' },
  { key: 'gel',       label: 'Gel Nails' },
  { key: 'lashes',    label: 'Lashes' },
  { key: 'brows',     label: 'Eyebrows' },
]

export const instagramGrid = Array.from({ length: 18 }, (_, i) => `/images/${i + 20}.jpg`)
