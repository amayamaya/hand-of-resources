-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if EXISTS loved_ones;
CREATE TABLE loved_ones (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  origin VARCHAR,
  connection VARCHAR
);
INSERT INTO loved_ones (name, origin, connection)
VALUES 
('Natalie', 'LA', 'Astrology'),
('Mehregan', 'Austin', 'Art'),
('Oriana', 'Portland', 'Lifetimes'),
('Alex', 'Nowhere, TX', 'Same Name'),
('Stephanie', 'Amarillo', 'Feels')
;

DROP table if EXISTS office_plants;
CREATE TABLE office_plants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  origin VARCHAR,
  features VARCHAR
);
INSERT INTO office_plants (name, origin, features)
VALUES 
('Spider Plant', 'Woodstock Hardware', 'Babies on Babies'),
('Baby Rubber Plant', 'OfferUp', 'Cool non-flower'),
('Peace Lily', 'OfferUp', 'Rainforest Vibes'),
('Satin Pothos', 'OfferUp', 'Silver Freckles'),
('Superba', 'Lowes', 'Veining Foliage')
;

DROP table if EXISTS balcony_plants;
CREATE TABLE balcony_plants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  origin VARCHAR,
  features VARCHAR
);
INSERT INTO balcony_plants (name, origin, features)
VALUES 
('Delphiniums', 'Bi-Mart', 'Tall with Blue Blooms'),
('Marigolds', 'Woodstock Hardware', 'Bright Orange Blooms'),
('Hebe', 'Garden Corner', 'Bushy with Purple Blooms'),
('Leopard Lily', 'Victoria', 'Bulby plant with Leopard Spots'),
('Fuchsias', 'Fred Meyer', 'Viny Plants with Vivid Pink, Purple, and White Blooms')
;

DROP table if EXISTS candles;
CREATE TABLE candles (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  scent VARCHAR,
  color VARCHAR
);
INSERT INTO candles (name, scent, color)
VALUES 
('Abuela Rose', 'Rose', 'Pink'),
('Lavender Crisp', 'Lavender', 'Purple'),
('Moon Milk', 'Jasmine and Peach', 'White'),
('Citrus Bliss', 'Bergamot, Lime, and Sweet Orange', 'Red')
;

DROP table if EXISTS web_colors;
CREATE TABLE web_colors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  hex VARCHAR,
  image VARCHAR
);
INSERT INTO web_colors (name, hex, image)
VALUES
('MistyRose', 'FF E4 E1', 'https://cdn.shopify.com/s/files/1/0007/1791/4148/products/97223-635-original_2000x.png?v=1655847855'),
('MediumAquamarine', '66 CD AA','https://stitchpalettes.com/wp-content/uploads/2019/10/SPA0064_square.jpg'),
('SandyBrown', 'F4 A4 60','https://www.color-name.com/cover/sandy-brown.png'),
('RosyBrown', 'BC 8F 8F	','https://media.benjaminmoore.com/WebServices/prod/cdp/392x490/red-paint-003-sweet-rosy-brown-1302-rgb.jpg'),
('PeachPuff', 'FF DA B9	','https://www.colorxs.com/img/color/name/peach-puff.png'),
('DarkKhaki', 'BD B7 6B','https://img.colorxs.com/color-img/dark-khaki/color-dark-khaki-window-on-wall.jpg'),
('PapayaWhip', 'FF EF D5', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2V0Lwyz5bhhxWUgJImbxpaiuSCIo9tQpcVA&usqp=CAU')