CREATE DATABASE company_resources

-- FOR THE SERVICES MODULE
CREATE TABLE departments (
	 department_id             INTEGER AUTO_INCREMENT PRIMARY KEY
     ,dpt_name                 VARCHAR(255) NOT NULL UNIQUE
     ,dpt_description          VARCHAR(500) NOT NULL
     ,dpt_head                 VARCHAR(255) NOT NULL
     ,dpt_location             VARCHAR(255) NOT NULL
     ,dpt_email                VARCHAR(255) NOT NULL
     ,dpt_contact_no           VARCHAR(255) NOT NULL
);

CREATE TABLE services (
	 service_id                INTEGER AUTO_INCREMENT PRIMARY KEY
     ,srv_name                 VARCHAR(255) NOT NULL UNIQUE
     ,srv_description          VARCHAR(500) NOT NULL
     ,srv_cost                 DECIMAL(15, 2) NOT NULL
     ,department_id            INTEGER
     , FOREIGN KEY (department_id) REFERENCES departments (department_id)
);


-- FOR THE EMPLOYEES INFO MODULE
CREATE TABLE employments (
     employment_id             INTEGER AUTO_INCREMENT PRIMARY KEY
     ,employment_type          ENUM('Full-time','Part-time') NOT NULL
     ,employment_status        ENUM('Active', 'Resigned') NOT NULL
     ,position                 VARCHAR(255) NOT NULL
     ,hired_date               DATE NOT NULL
     ,termination_date         DATE NOT NULL
     ,rate_per_hour            DECIMAL(15, 2) NOT NULL
     ,deleted_at               DATETIME NULL
     ,department_id            INTEGER
     ,FOREIGN KEY (department_id) REFERENCES departments (department_id)
);

CREATE TABLE employees (
    employee_id                INT AUTO_INCREMENT PRIMARY KEY
    ,first_name                VARCHAR(255) NOT NULL
    ,middle_name               VARCHAR(255) NULL
    ,last_name                 VARCHAR(255) NOT NULL
    ,ext_name                  VARCHAR(10) NULL
    ,birthdate                 DATE NOT NULL
    ,sex                       ENUM('Male', 'Female')
    ,house_no                  VARCHAR(255) NOT NULL
    ,street                    VARCHAR(255) NOT NULL
    ,barangay                  VARCHAR(255) NOT NULL
    ,city                      VARCHAR(255) NOT NULL
    ,province                  VARCHAR(255) NOT NULL
    ,email_address             VARCHAR(255) NOT NULL UNIQUE
    ,gen_phone_no              VARCHAR(20) NOT NULL UNIQUE
    ,home_no                   VARCHAR(20) UNIQUE
    ,phone_no                  VARCHAR(20) UNIQUE
    ,deleted_at                DATETIME NULL
    ,employment_id             INTEGER
    ,FOREIGN KEY (employment_id) REFERENCES employments (employment_id)
);

CREATE TABLE schedules (
     schedule_id               INTEGER AUTO_INCREMENT PRIMARY KEY
     ,month_name               VARCHAR(20)
     ,week_date                DATE 
     ,monday_shift             TIME
     ,tuesday_shift            TIME
     ,wednesday_shift          TIME
     ,thursday_shift           TIME
     ,friday_shift             TIME
     ,saturday_shift           TIME
     ,sunday_shift             TIME
     ,employee_id              INTEGER NOT NULL
     ,FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
);


-- FOR THE ROOM AVAILABILITY MODULE
CREATE TABLE wards (
      ward_id                  INTEGER AUTO_INCREMENT PRIMARY KEY
      ,ward_name               VARCHAR(255) NOT NULL UNIQUE
      ,ward_description        VARCHAR(500) NOT NULL
      ,ward_floor_no           VARCHAR(10) NOT NULL
      ,no_of_rooms             VARCHAR(10) NOT NULL
);

CREATE TABLE rooms (
	  room_no                 INTEGER AUTO_INCREMENT PRIMARY KEY
	  ,room_floor_no          VARCHAR(10) NULL
      ,no_of_beds             VARCHAR(10) NOT NULL
      ,room_type              ENUM('General', 'Standard', 'Semi-Private', 'Private', 'VIP') NOT NULL
      ,occupancy_status       ENUM('Occupied', 'Vacant', 'Housekeeping') NOT NULL
      ,rate_per_day           DECIMAL(15, 2) NOT NULL
      ,ward_id                INTEGER NULL
      ,FOREIGN KEY (ward_id) REFERENCES wards (ward_id)
);

CREATE TABLE beds (
      bed_no                  INTEGER AUTO_INCREMENT PRIMARY KEY
      ,occupancy_status       ENUM('Occupied', 'Vacant', 'Housekeeping') NOT NULL
      ,bed_type               VARCHAR(255) NOT NULL
      ,rate_per_day           DECIMAL(15, 2) NULL
      ,room_no                INTEGER NOT NULL
      ,FOREIGN KEY (room_no) REFERENCES rooms (room_no)
);


CREATE TABLE invoices (
    invoice_id VARCHAR(10) PRIMARY KEY,     -- Unique invoice identifier (e.g., INV12345)
    customer_name VARCHAR(255),             -- Customer name associated with the invoice
    invoice_date DATE,                      -- Date of invoice creation
    payment_status VARCHAR(50),             -- Payment status (e.g., 'Open', 'Fully Paid', 'Voided')
    approval_status VARCHAR(50),            -- Approval status (e.g., 'Pending Approval', 'Approved', 'Rejected')
    amount DECIMAL(10, 2),                  -- Amount of the invoice (e.g., ₱11,500.00)
    insurance_applied BOOLEAN DEFAULT FALSE -- Flag for whether insurance is applied
);

INSERT INTO invoices (invoice_id, customer_name, invoice_date, payment_status, approval_status, amount, insurance_applied)
VALUES 
('INV12345', 'Renz Paul Fababeir', '2024-09-01', 'Open', 'Pending Approval', 11500.00, FALSE),
('INV12346', 'Shane Steven Servas', '2024-09-01', 'Fully Paid', 'Approved', 11500.00, FALSE),
('INV12347', 'Kyle Mendoza', '2024-09-01', 'Voided', 'Rejected', 11500.00, FALSE);