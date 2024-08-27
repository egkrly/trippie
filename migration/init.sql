SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (
  username,
  password,
  email
) VALUES (
  'jocospeed98',
  '$2a$10$hQ0k.X.ruMa2aN4Cod7D.umbmz6ek.j1Xd4/dBXTG72iHaHgXJBWW',
  'jocospeed98@gmail.com'
);

DROP TABLE IF EXISTS user_addresses;
CREATE TABLE user_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_type ENUM('home', 'vacation', 'other') NOT NULL,
  country VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  street VARCHAR(255) NOT NULL,
  house_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO user_addresses (
  user_id,
  place_type,
  country,
  postal_code,
  city,
  street,
  house_number
) VALUES (
  1,
  'home',
  'HU',
  1024,
  'Budapest',
  'Petrezselyem utca',
  '15-19'
);

INSERT INTO user_addresses (
  user_id,
  place_type,
  country,
  postal_code,
  city,
  street,
  house_number
) VALUES (
  1,
  'vacation',
  'IT',
  90133,
  'Palermo',
  'Via Cavour',
  '112'
);