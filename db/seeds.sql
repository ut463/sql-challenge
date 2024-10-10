INSERT INTO departments (department_name)
VALUES
('Marketing'),
('Research and Development'),
('Recruiting'),
('Sales'),
('IT'),
('Human Resources'),
('CEO');

INSERT INTO roles (title, salary, department_id)
VALUES
('Head of HR', 90000.00, 6),
('Recruiter', 40000.00, 3),
('Sales Representative', 50000.00, 4),
('Engineer', 100000.00, 5),
('Technician', 125000.00, 2),
('Head of Marketing', 75000.00, 1),
('C Suite', 250000.00, 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Jeremy', 'golf', 1),
('Shaketa', 'goodbye', 3),
('Phillip', 'mac', 2),
('Eman', 'late', 4),
('Matt', 'Lego', 5),
('Zeke', 'daggers', 6),
('Caleb', 'teach', 7);