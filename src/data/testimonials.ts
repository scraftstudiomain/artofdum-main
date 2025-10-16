export interface Testimonial {
  id: number;
  author: string;
  title: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Aarav Sharma',
    title: 'Food Critic, The Royal Gazette',
    quote: "Art of Dum isn't just a meal; it's a journey into the heart of India's culinary soul. The Dum Pukht Biryani is, without exaggeration, a masterpiece."
  },
  {
    id: 2,
    author: 'Priya Singh',
    title: 'Connoisseur & Patron',
    quote: "From the moment you step in, you are treated like royalty. The Galouti Kebabs melt in your mouth, a testament to the chef's unparalleled skill."
  },
  {
    id: 3,
    author: 'Rohan Mehta',
    title: 'Wedding Client',
    quote: "They catered our wedding, and guests are still talking about the food. The team's professionalism and the exquisite flavors made our special day truly unforgettable."
  }
];
