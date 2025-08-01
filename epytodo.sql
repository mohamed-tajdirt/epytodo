CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    due_time DATETIME NOT NULL,
    status ENUM("not started", "todo", "in progress", "done") DEFAULT "not started",
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);