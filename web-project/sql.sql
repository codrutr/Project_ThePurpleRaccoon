CREATE TABLE Student (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    isTeamLead BOOLEAN,
    projectId INT,
    FOREIGN KEY (projectId) REFERENCES Project(id)
);

CREATE TABLE Project (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Deliverable (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    link VARCHAR(255),
    projectId INT,
    studentId INT,
    FOREIGN KEY (projectId) REFERENCES Project(id),
    FOREIGN KEY (studentId) REFERENCES Student(id)
);

CREATE TABLE Jury (
    id INT PRIMARY KEY,
    grade DECIMAL(4, 2),
    projectId INT,
    studentId INT,
    FOREIGN KEY (projectId) REFERENCES Project(id),
    FOREIGN KEY (studentId) REFERENCES Student(id)
);

CREATE TABLE Professor (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);