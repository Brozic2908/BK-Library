-- Database: bk_library
CREATE DATABASE IF NOT EXISTS `library_db` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;
USE `library_db`;

CREATE TABLE `User` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    acc_status ENUM('active', 'banned') NOT NULL DEFAULT 'active',
    role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
    gender ENUM('male', 'female', 'other') NOT NULL DEFAULT 'male',
    address VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `Book` (
  `book_id`          INT           NOT NULL AUTO_INCREMENT,
  `title`            VARCHAR(255)  NOT NULL,
  `author`           VARCHAR(255)  DEFAULT NULL,
  `genre`            VARCHAR(100)  DEFAULT NULL,
  `publish_year`     INT           DEFAULT NULL,
  `stock`            INT           NOT NULL DEFAULT 0,
  `available_number` INT           NOT NULL DEFAULT 0,
  `borrowed_number`  INT           NOT NULL DEFAULT 0,
  `image_url`        VARCHAR(500)  DEFAULT NULL,
  `description`      TEXT          DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Transaction` (
  `tx_id`             INT        NOT NULL AUTO_INCREMENT,
  `member_id`         INT        NOT NULL,
  `book_id`           INT        NOT NULL,
  `schedule_date`     DATE       DEFAULT NULL,
  `borrow_date`       DATE       DEFAULT NULL,
  `due_date`          DATE       DEFAULT NULL,
  `return_date`       DATE       DEFAULT NULL,
  `status`            ENUM('Pending','Borrowing','Returned','Cancel') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`tx_id`),
  KEY `idx_tx_member` (`member_id`),
  KEY `idx_tx_book`   (`book_id`),
  CONSTRAINT `fk_tx_member`
    FOREIGN KEY (`member_id`) REFERENCES `User`(`user_id`)
      ON DELETE RESTRICT,
  CONSTRAINT `fk_tx_book`
    FOREIGN KEY (`book_id`) REFERENCES `Book`(`book_id`)
      ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Report` (
  `report_id`   INT        NOT NULL AUTO_INCREMENT,
  `admin_id`    INT        NOT NULL,
  `type`        ENUM('Damage','Lost','Late Return','Other') NOT NULL DEFAULT 'Other',
  `content`     TEXT       NOT NULL,
  `created_at`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `idx_rp_admin` (`admin_id`),
  CONSTRAINT `fk_rp_admin`
    FOREIGN KEY (`admin_id`) REFERENCES `User`(`user_id`)
      ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
