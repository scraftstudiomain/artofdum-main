import type { MenuItem, MenuCategory } from '../types';

const startersNonVeg: MenuItem[] = [
  { id: '1', name: 'Lahori Boti (Mutton)', description: 'Melt-in-mouth morsel of mutton chunks, slow-cooked in homemade spices & desi ghee, served on a bed of flaky paratha', price: 63, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '2', name: 'Mutton Seekh Kebab', description: 'Minced mutton delicately flavoured with spices & herbs', price: 63, allergens: 'Contains: Milk' },
  { id: '3', name: 'Lucknowi Tundey Ke Kebab (Mutton)', description: 'Traditional galouti kebab flavoured with saffron, screw pine water & served on bed of ulta tawa paratha', price: 58, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '4', name: 'Dum Pukht Kakori (Mutton)', description: 'A delicate kebab of finely minced mutton, flavored with cloves & cinnamon, wrapped around a skewer & char-grilled', price: 58, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '5', name: 'Tandoori Chicken', description: 'Classical tandoori chicken marinated in tandoori masala with yoghurt, served bone–in', price: 48, priceDisplay: 'Half:48 | Full:68', allergens: 'Contains: Milk & Mustard' },
  { id: '6', name: 'Peshawari Chicken Tikka', description: 'Boneless chunks of chicken marinated with fenugreek-flavored yoghurt & yellow chili powder', price: 55, allergens: 'Contains: Milk, Nuts & Mustard' },
  { id: '7', name: 'Lehsooni Jhinga Kalimirch', description: 'Medium sized prawns marinated with peppercorns & garlic infused yoghurt, then char-grilled', price: 62, allergens: 'Contains: Mustard, Crustacean, Milk & Nuts' },
  { id: '8', name: 'Chandi Malai Chicken Tikka', description: 'Chicken marinated in an aromatic mixture of yogurt, cream & cheese, then char-grilled', price: 55, allergens: 'Contains: Milk & Nuts' },
  { id: '9', name: 'Firangi Chicken Tikka', description: 'Succulent boneless chicken, infused with a mix of Indian & peri-peri spices, chargrilled', price: 55, allergens: 'Contains: Milk, Nuts & Mustard' },
];

const startersVeg: MenuItem[] = [
  { id: '10', name: 'Punjabi Paneer Tikka', description: 'Char-grilled cottage cheese marinated with tandoori masala, yogurt & bell peppers', price: 48, allergens: 'Contains: Milk, Nuts & Mustard' },
  { id: '11', name: 'Tandoori Malai Broccoli', description: 'Florets of broccoli marinated in cream, cheese infused with cardamom & white peppercorns', price: 45, allergens: 'Contains: Milk & Nuts' },
  { id: '12', name: 'Afghani Malai Chaap', description: 'Soya chaaps marinated with cream, cheese & Afghani spices, then char-grilled', price: 48, allergens: 'Contains: Soya, Milk, Nuts & Gluten' },
  { id: '13', name: 'Bharwan Tandoori Khumb', description: 'Fresh button mushrooms stuffed with cheese, jalapenos & American corn, marinated in yoghurt & house spices', price: 44, allergens: 'Contains: Milk, Nuts, Mustard & Mushroom' },
  { id: '14', name: 'Subz Seekh Kebab', description: 'Seasonal minced vegetables flavored with fresh herbs, dried mango & royal cumin', price: 44, allergens: 'Contains: Milk, Gluten & Nuts' },
];

const signatureMainCourseNonVeg: MenuItem[] = [
  { id: '15', name: 'Dum Handi Ka Gosht (Mutton Curry)', description: 'Mutton curry flavored with fried onions, house spices & tomatoes cooked in dum clay pot', price: 68, allergens: 'Contains: Mustard, Milk & Gluten' },
  { id: '16', name: 'Rogan Gosht Lucknowi (Mutton)', description: 'A slow-cooked Awadhi mutton delicacy in a rich yogurt gravy infused with aromatic spices & saffron', price: 66, allergens: 'Contains: Mustard, Milk & Nuts' },
  { id: '17', name: 'Butter Chicken', description: 'Grilled chicken cooked in a cashew nut-based tomato gravy infused with cream & butter', price: 58, allergens: 'Contains: Milk & Nuts' },
  { id: '18', name: 'Chicken Tikka Masala', description: 'Boneless chicken cooked in a rich onion-tomato gravy, elegantly finished with cheese, inspired by North Frontier cuisine', price: 58, allergens: 'Contains: Milk & Nuts' },
  { id: '19', name: 'Chulhey Ka Dum Murgh (Chicken Curry)', description: 'Punjabi style chicken curry cooked in a dum with house spices & tomatoes', price: 58, allergens: 'Contains: Mustard, Milk & Gluten' },
  { id: '20', name: 'Dum Handi Jhinga', description: 'Mildly spiced prawn curry from Western India, cooked in coconut milk', price: 62, allergens: 'Contains: Nuts, Crustacean, Gluten & Milk' },
];

const signatureMainCourseVeg: MenuItem[] = [
  { id: '21', name: 'Kofta Dilkhush', description: 'Homemade cottage cheese dumplings cooked in rich cream & cashewnut based tomato gravy', price: 48, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '22', name: 'Paneer Makhani', description: 'Cottage cheese in a creamy tomato and cashew gravy', price: 52, allergens: 'Contains: Milk & Nuts' },
  { id: '23', name: 'Paneer Tikka Masala', description: 'Char-grilled cottage cheese in a rich onion-tomato gravy', price: 52, allergens: 'Contains: Milk & Nuts' },
  { id: '24', name: 'Palak Paneer', description: 'Cottage cheese in a creamy spinach gravy', price: 52, allergens: 'Contains: Milk & Nuts' },
  { id: '25', name: 'Kadai Vegetables', description: 'Bell peppers, French beans, baby corn, green peas, carrots & mushrooms cooked in an onion based gravy', price: 46, allergens: 'Contains: Milk, Nuts & Mushroom' },
  { id: '26', name: 'Mirch Masala Soya Chaap', description: 'Fried soya chaap tossed with fresh jalapeno chili & a thick onion-tomato masala', price: 50, allergens: 'Contains: Soya, Gluten, Milk & Nuts' },
  { id: '27', name: 'Amritsar De Chole Kulche', description: 'Chickpeas cooked with ginger, chilli & Amritsari chole masala served with stuffed kulcha & chutney', price: 52, allergens: 'Contains: Gluten, Milk & Mustard' },
  { id: '28', name: 'Dal Makhani', description: 'Whole black lentils cooked overnight in butter & cream', price: 54, allergens: 'Contains: Milk & Gluten' },
  { id: '29', name: 'Double Dal Tadka', description: 'Split yellow lentils tempered with cumin, garlic & red chili', price: 35, allergens: 'Contains: Milk' },
];

const biryanisPulaosNonVeg: MenuItem[] = [
  { id: '30', name: 'Yakhni Dum Gosht Biryani (Mutton)', description: 'Basmati rice simmered with mace, rose & kewra flavoured lamb finished in a sealed handi', price: 76, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '31', name: 'Awadhi Chicken Biryani', description: 'A classic delicacy of the Mughal Nizam, aromatic rice layered with chicken, saffron & spices', price: 70, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '32', name: 'Chicken Tikka Biryani', description: 'Char-grilled chicken tikka layered with aromatic basmati rice & cooked in a dum sealed pot', price: 70, allergens: 'Contains: Milk, Nuts & Gluten' },
];

const biryanisPulaosVeg: MenuItem[] = [
  { id: '33', name: 'Soya Chaap Biryani', description: 'Soya chaap cubes layered with aromatic basmati rice & cooked in dum sealed pot', price: 60, allergens: 'Contains: Soya, Milk, Nuts & Gluten' },
  { id: '34', name: 'Nizami Dum Subz Biryani (Vegetable)', description: 'Seasoned vegetables & basmati rice mélange, dum cooked with a subtly flavored vegetable extract', price: 60, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '35', name: 'Paneer Tikka Biryani', description: 'Char-grilled cottage cheese cubes layered with aromatic basmati rice & cooked in dum sealed pot', price: 64, allergens: 'Contains: Mustard, Milk, Nuts & Gluten' },
];

const sides: MenuItem[] = [
  { id: '36', name: 'Pulao Rice', description: 'Cumin / Biryani', price: 28, allergens: 'Contains: Milk' },
  { id: '37', name: 'Raita', description: 'Boondi / Burhani / Cucumber', price: 19, allergens: 'Contains: Milk & Gluten' },
];

const indianBreads: MenuItem[] = [
  { id: '38', name: 'Tandoori Roti', description: 'Whole wheat bread baked in a tandoor', price: 9, allergens: 'Contains: Milk & Gluten' },
  { id: '39', name: 'Pyaaz Mirch Ki Roti', description: 'Whole wheat bread topped with onions & chilies', price: 10, allergens: 'Contains: Milk & Gluten' },
  { id: '40', name: 'Roomali Roti', description: 'Handkerchief thin bread made with a combination of wheat flour & refined flour', price: 9, allergens: 'Contains: Milk & Gluten' },
  { id: '41', name: 'Laccha Paratha', description: 'Plain / Mint / Ajwain / Red Chilli Flakes - Layered whole wheat flatbreads', price: 10, allergens: 'Contains: Milk & Gluten' },
  { id: '42', name: 'Naan', description: 'Plain / Garlic / Butter / Chilli Garlic', price: 10, allergens: 'Contains: Gluten, Sesame & Milk' },
  { id: '43', name: 'Stuffed Bread (Kulcha)', description: 'Paneer / Potato', price: 14, allergens: 'Contains: Milk & Gluten' },
];

const rollsNonVeg: MenuItem[] = [
  { id: '44', name: 'Kerala Fried Chicken Roll', description: 'Kerala fried chicken, lettuce, white onion & pickled vegetables', price: 34, allergens: 'Contains: Egg, Milk, Nuts, Mustard & Gluten' },
  { id: '45', name: 'Chicken Tikka Roll', description: 'Chicken tikka, lettuce, white onion & pickled vegetables', price: 34, allergens: 'Contains: Milk, Nuts, Gluten & Mustard' },
  { id: '46', name: 'Mutton Seekh Kebab Roll', description: 'Mutton seekh kebab, lettuce, white onion & pickled vegetables', price: 35, allergens: 'Contains: Milk & Gluten' },
];

const rollsVeg: MenuItem[] = [
  { id: '47', name: 'Paneer Tikka Roll', description: 'Cottage cheese, lettuce, white onion & pickled vegetables', price: 33, allergens: 'Contains: Milk, Nuts, Gluten & Mustard' },
  { id: '48', name: 'Aloo Tikki Roll', description: 'Aloo tikki, lettuce, white onion and pickled vegetables', price: 30, allergens: 'Contains: Milk & Nuts' },
  { id: '49', name: 'Malai Soya Chaap Roll', description: 'Creamy soya chunks, lettuce, white onion & pickled vegetables', price: 33, allergens: 'Contains: Soya, Milk, Nuts & Gluten' },
  { id: '50', name: 'Roll Options', description: 'Choice of Bread: Laccha / Roomali / Spinach / Beetroot | Choice of Any 2 Sauces: Mandarine / Honey Mustard / Peri Peri / BBQ Saunth / Coriander Salsa / Garlic Mayo', price: 0 },
];

const chaat: MenuItem[] = [
  { id: '51', name: 'Palak Patta Chaat', description: 'Traditional Indian snack of crispy spinach topped with sweet yoghurt, mint & tamarind chutney', price: 28, allergens: 'Contains: Milk & Nuts' },
  { id: '52', name: 'Vegetable Samosa', description: 'Savoury pastry stuffed with potato & green peas hash fried to crispy texture', price: 28, allergens: 'Contains: Milk, Gluten & Nuts' },
  { id: '53', name: 'Dahi Bhalla', description: 'Soft & fluffy lentil dumpling dunked in yoghurt & topped with mint & tamarind chutney', price: 28, allergens: 'Contains: Milk & Nuts' },
  { id: '54', name: 'Samosa Chaat', description: 'Crispy fried samosa topped with sweet yoghurt, tamarind & mint chutney - A true delhi delicacy', price: 28, allergens: 'Contains: Milk, Nuts & Gluten' },
  { id: '55', name: 'Pani Puri', description: 'Semolina & wheat flour hollow sphere with potato or Ragada stuffing with tamarind & mint water', price: 38, allergens: 'Contains: Gluten' },
];

const desserts: MenuItem[] = [
  { id: '56', name: 'Gulab Jamun', description: 'Deep fried milk dumplings dipped in sugar syrup & garnished with nuts', price: 25, allergens: 'Contains: Gluten, Nuts & Milk' },
  { id: '57', name: 'Kesar Da Phirni', description: 'Rice pudding flavored with saffron, cardamom, garnished with almonds & pistachios', price: 25, allergens: 'Contains: Milk & Nuts' },
];

const lassi: MenuItem[] = [
  { id: '58', name: 'Mango Ginger Lassi', description: 'Mango Puree, Yoghurt, Ginger', price: 19, allergens: 'Contains: Dairy. May contain: Wheat, nuts, peanuts, mustard, celery, gluten, sesame, shellfish, soya, sulphite, fish & molluscs' },
  { id: '59', name: 'Saffron Pistachio Lassi', description: 'Saffron, Pistachio, Yoghurt', price: 19, allergens: 'Contains: Dairy, Nuts' },
  { id: '60', name: 'Sweet Lassi', description: 'Yoghurt', price: 16, allergens: 'Contains: Dairy' },
  { id: '61', name: 'Salted Lassi', description: 'Yoghurt', price: 16, allergens: 'Contains: Dairy' },
  { id: '62', name: 'Salt & Mint Lassi', description: 'Mint & Yoghurt', price: 16, allergens: 'Contains: Dairy' },
];

const beverages: MenuItem[] = [
  { id: '63', name: 'Lemon with Mint', description: 'Mint & fresh lemon juice', price: 15 },
  { id: '64', name: 'Water (500 ML | 1500 ML)', description: 'Still water', price: 4 },
  { id: '65', name: 'Aerated Drinks', description: 'Pepsi / Diet Pepsi / Mirinda / 7Up / Mountain Dew', price: 7 },
  { id: '66', name: 'Sparkling Water (330 ML)', description: 'Carbonated water', price: 12 },
];

export const menu: MenuCategory[] = [
  { id: 'starters-non-veg', name: 'STARTERS (Non Veg.)', items: startersNonVeg },
  { id: 'starters-veg', name: 'STARTERS (Veg.)', items: startersVeg },
  { id: 'signature-main-course-non-veg', name: 'SIGNATURE MAIN COURSE (Non Veg.)', items: signatureMainCourseNonVeg },
  { id: 'signature-main-course-veg', name: 'SIGNATURE MAIN COURSE (Veg.)', items: signatureMainCourseVeg },
  { id: 'biryanis-pulaos-non-veg', name: 'SIGNATURE BIRYANIS & PULAOS (Non Veg.)', items: biryanisPulaosNonVeg },
  { id: 'biryanis-pulaos-veg', name: 'SIGNATURE BIRYANIS & PULAOS (Veg.)', items: biryanisPulaosVeg },
  { id: 'sides', name: 'SIDES', items: sides },
  { id: 'indian-breads', name: 'INDIAN BREADS', items: indianBreads },
  { id: 'rolls-non-veg', name: 'ROLLS (Non Veg.)', items: rollsNonVeg },
  { id: 'rolls-veg', name: 'ROLLS (Veg.)', items: rollsVeg },
  { id: 'chaat', name: 'CHAAT', items: chaat },
  { id: 'desserts', name: 'DESSERTS', items: desserts },
  { id: 'lassi', name: 'LASSI', items: lassi },
  { id: 'beverages', name: 'BEVERAGES', items: beverages },
];

export const menuCategories = menu;
