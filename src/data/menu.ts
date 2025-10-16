import type { MenuItem } from '../types';

const starters: MenuItem[] = [
  { id: '1', name: 'Murgh Yakhni Shorba', description: 'A delicate chicken broth infused with saffron and whole spices.', price: 12 },
  { id: '2', name: 'Galouti Kebab', description: 'Melt-in-the-mouth minced lamb kebabs, a royal Awadhi specialty.', price: 18 },
  { id: '3', name: 'Dahi Ke Kebab', description: 'Soft, creamy patties of hung curd and spices, pan-fried to golden perfection.', price: 15 },
  { id: '4', name: 'Hara Bhara Kebab', description: 'Spinach and green pea patties with a hint of mint and coriander.', price: 14 },
];

const mains: MenuItem[] = [
  { id: '5', name: 'Nalli Nihari', description: 'Slow-cooked lamb shanks in a rich, aromatic stew, best enjoyed with naan.', price: 28 },
  { id: '6', name: 'Shahi Paneer', description: 'Cottage cheese simmered in a creamy tomato and cashew gravy.', price: 22 },
  { id: '7', name: 'Dum Pukht Biryani', description: 'Fragrant basmati rice and tender meat, slow-cooked in a sealed pot.', price: 26 },
  { id: '8', name: 'Dal Makhani', description: 'Black lentils and kidney beans slow-cooked for 24 hours with butter and cream.', price: 18 },
  { id: '9', name: 'Kofta-e-Nargisi', description: 'A boiled egg encased in spiced minced meat, served in a rich gravy.', price: 25 },
];

const desserts: MenuItem[] = [
  { id: '10', name: 'Shahi Tukda', description: 'Fried bread slices soaked in saffron-infused milk, topped with nuts.', price: 12 },
  { id: '11', name: 'Kesar Phirni', description: 'A creamy ground rice pudding flavored with saffron and cardamom.', price: 10 },
  { id: '12', name: 'Jalebi with Rabri', description: 'Crisp, syrup-soaked spirals served with thickened sweet milk.', price: 11 },
];

export const menu = { starters, mains, desserts };
