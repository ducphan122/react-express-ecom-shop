INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(11, 'Antique compass', 259.00, 'An antique compass in excellent condition', 'Navigation', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617571304/collectibles/jordan-madrid-iDzKdNI7Qgc-unsplash_qksbyn.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(13, 'Nikon FG Camera', 159.00, 'Nikon FG 35 mm film camera in excellent condition.', 'Camera', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617570840/collectibles/mikkel-bech-Rux50ySjahc-unsplash_tzxb1k.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(14, 'Panasonic AM Radio', 99.00, 'AM Radio from National Panasonic in working condition.', 'Audio', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617569598/collectibles/chandan-chaurasia-EyPBS_axPg4-unsplash_pku2p3.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(15, 'Vintage clock in chain', 129.00, 'Nice looking clock that still stays on time.', 'Clocks', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617568586/collectibles/kjartan-einarsson-hxwvWHmCdBM-unsplash_pkt83s.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(
		16,
		'Apple II Computer',
		599.00,
		'Apple II computer in great condition that is in working condition. One of the early revolutionary Apple products.',
		'Computers',
		'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617567494/collectibles/museums-victoria-ZJ5h8KoKnY0-unsplash_cf7vd4.jpg',
		'Active'
	);

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(17, 'Antique binoculars', 299.00, 'These French binoculars come with a case and have great optics.', 'Optics', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617567363/collectibles/shelly-busby-nePt2ZPtPKg-unsplash_t3u3em.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(18, 'Classic telephone', 149.00, 'This telephone is in an amazing condition.', 'Telephones', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617567163/collectibles/pawel-czerwinski--0xCCPIbl3M-unsplash_aqenm9.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(
		19,
		'Original GameBoy',
		99.00,
		'The original version of this portable gaming computer. It still works.',
		'Computers',
		'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617539289/collectibles/hello-i-m-nik-8yLcHIClVto-unsplash_1_js504j.jpg',
		'Active'
	);

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(20, 'Antique compass', 129.00, 'Antique compass with only a few scratches.', 'Navigation', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617538653/collectibles/jen-theodore-tWqyWrqLntU-unsplash_dfqhld.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(21, 'Agfa camera', 169.00, 'Vintage Agfa camera in superb condition.', 'Cameras', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617537840/collectibles/jen-theodore-Z_SItCv9Xko-unsplash_hyymfq.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(22, 'Adler Favorit Typewriter', 229.00, 'Adler Favorite typewriter from the 1930s.', 'Typewriters', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617537660/collectibles/florian-klauer-mk7D-4UCfmg-unsplash_h5fb3e.jpg', 'Active');

INSERT INTO
	products (id, name, price, description, category, image_url, status)
VALUES
	(12, 'Polaris Clock', 99.00, 'Retro clock with an interesting shape', 'Clocks', 'https://res.cloudinary.com/dvdsys6fk/image/upload/v1617571249/collectibles/gabriel-manlake-_edeC1cuFfw-unsplash_hysbim.jpg', 'Active');

-- Prepopulate admin user with hashed password for 'password'
INSERT INTO
	users (email, first_name, last_name, address1, postcode, city, country, pwd_hash, user_role, active)
VALUES
	(
		'admin@mail.com',
		'Admin',
		'User',
		'123 Admin Street',
		'12345',
		'Admin City',
		'Admin Country',
		'$2b$10$8KzaNdKwZ8YLQmHxVNKxDOxPGR7zUy.5r4tOCg2yE7QZfV8.rV1tq', -- This is bcrypt hash for 'password'
		'admin',
		true
	);

-- Create corresponding cart for admin
INSERT INTO
	carts (user_id)
SELECT
	id
FROM
	users
WHERE
	email='admin@mail.com';