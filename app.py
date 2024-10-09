from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
import requests
import os
import mysql.connector as mysql
from dotenv import load_dotenv
from functools import wraps

app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")

# MySQL Database connection (replace with your credentials)
empdb = mysql.connect(
    host = os.getenv("DB_HOST"),
    user = os.getenv("DB_USER"),
    password = os.getenv("DB_PASSWORD"),
    database = os.getenv("DB_NAME")
)

def roles_required(*allowed_roles):
    """Decorator to restrict access to routes based on multiple roles."""
    def wrapper(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Check if the 'role' exists in the session
            if 'role' not in session:
                flash("You must be logged in to access this page.")
                return redirect(url_for('login'))  
            
            # Check if the user's role is in the list of allowed roles
            if session['role'] not in allowed_roles:
                flash("You do not have permission to access this page.")
                return redirect(url_for('dashboard'))  
            
            # If the role matches, execute the original function (access the route)
            return f(*args, **kwargs)
        
        return decorated_function
    return wrapper


@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    username = request.form['username']
    password = request.form['password']

    if 'loginAttempts' not in session:
        session['loginAttempts'] = 0
    
    if session['loginAttempts'] >= 3:
        flash("Your account is now locked, please contact the tech support")
        url = "https://agapay.pythonanywhere.com/account/locked"
        data = {"username": username,}
        headers = {"Content-Type": "application/json",} 
        response = requests.post(url, json=data, headers=headers)
        return redirect(url_for('login'))

    url = "https://agapay.pythonanywhere.com/account/authenticate"
    data = {
        "username": username,
        "password": password,
    }
    headers = {
        "Content-Type": "application/json",
    }
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        session['loginAttempts'] = 0
        token = response.json().get('token')
        
        # Send the token to the microservice for verification
        verify_url = "https://agapay.pythonanywhere.com/verify-token"
        verify_response = requests.post(verify_url, json={'token': token}, headers=headers)
        
        if verify_response.status_code == 200:
            user_data = verify_response.json()
            session['username'] = user_data['username']
            session['role'] = user_data['role']
            return redirect(url_for('dashboard'))
        else:
            flash('Token verification failed.')
            return redirect(url_for('login'))
            
    elif response.status_code == 401:
        session['loginAttempts'] += 1
        flash('Invalid credentials, please try again.')
        return redirect(url_for('login'))
    else:
        flash('Unexpected error occurred. Please try again later or contact our tech support.')
        return redirect(url_for('login'))

@app.route('/dashboard')
@roles_required('Finance Manager', 'Billing Specialist', 'Insurance Claims Officer')
def dashboard():
    # Ensure the user is logged in
    if 'username' not in session or 'role' not in session:
        return redirect(url_for('login'))
    
    # Pass the username and role to the dashboard template
    return render_template('dashboard.html', username=session['username'], role=session['role'])

@app.route('/logout')
@roles_required('Finance Manager', 'Billing Specialist', 'Insurance Claims Officer')
def logout():
    # Clear the session on logout
    session.pop('username', None)
    session.pop('role', None)
    return redirect(url_for('login'))

@app.route('/forgot-password')
def forgot_pass():
    return render_template('forgot_pass.html')

@app.route('/forgot-password/send-email', methods=['POST'])
def forgot_pass_send_email():
    email = request.form['email']
    url = "https://agapay.pythonanywhere.com/email-check"
    data = {"email": email}
    headers = {"Content-Type": "application/json",}
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        #notification micro dito, yun magsesend ng email
        return render_template('forgot_pass.html')
    else:
        #lalagay dapat dito ng audit log para makita anong email nilagay niya
        return render_template('forgot_pass.html')

@app.route('/tech-support/send-email', methods=['POST'])
def tech_support_send_email():
    name = request.form['full_name']
    email = request.form['email_address']
    issue = request.form['issue_description']
    file = request.form['file_upload']

    url = "https://agapay.pythonanywhere.com/email-check"
    data = {"email": email}
    headers = {"Content-Type": "application/json",}
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        #notification micro dito, yun magsesend ng email
        return render_template('tech_support.html')
    else:
        #lalagay dapat dito ng audit log para makita anong email nilagay niya
        return render_template('tech_support.html')

@app.route('/tech-support')
def tech_support():
    return render_template('tech_support.html')

# Fetch employee data and pass it to the frontend
@app.route('/employee', methods=['GET'])
@roles_required('Finance Manager')
def employee():
    if 'username' not in session or 'role' not in session:
        return redirect(url_for('login'))
    
    cursor = empdb.cursor(dictionary=True)
    cursor.execute(
        """SELECT employees.employee_id, employees.first_name, employees.middle_name, employees.last_name, employees.ext_name, employments.position, 
                 departments.dpt_name, employments.employment_status, employments.employment_type 
        FROM employees 
        JOIN employments ON employees.employment_id = employments.employment_id
        JOIN departments ON employments.department_id = departments.department_id 
        WHERE employees.deleted_at IS NULL"""
    )
    employees = cursor.fetchall()

    return render_template('employee_directory.html', employees=employees, username=session['username'], role=session['role'])

def save_employee_to_db(data):
    try:
        cursor = empdb.cursor()

        # Prepare SQL query to INSERT a new employee record into the database.
        query = """
        INSERT INTO employees (
            last_name, first_name, middle_name, ext_name, 
            contact_number, email_address, birthday, sex, nationality, 
            house_no, street, barangay, city, province, 
            position, department, status, employment_type, hired_date, licenses
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        # Extract values from the data dictionary to match the order of the query.
        values = (
            data['lastName'], data['firstName'], data['middleName'], data['extName'],
            data['contactNumber'], data['email'], data['birthday'], data['sex'], data['nationality'],
            data['houseNo'], data['street'], data['barangay'], data['city'], data['province'],
            data['position'], data['department'], data['status'], data['employmentType'], data['hiredDate'], data['licenses']
        )

        # Execute the query with the provided data.
        cursor.execute(query, values)

        # Commit the changes to the database.
        empdb.commit()

        return True  # Indicate success.
    except Exception as e:
        # If there's an error, print it to the console and rollback the transaction.
        print(f"An error occurred: {e}")
        empdb.rollback()
        return False  # Indicate failure.
    
@app.route('/add_employee', methods=['POST'])
def add_employee():
    try:
        # Retrieve form data
        last_name = request.form['lastName']
        first_name = request.form['firstName']
        middle_name = request.form.get('middleName')
        ext_name = request.form.get('extName')
        contact_number = request.form['contactNumber']
        email_address = request.form['emailAddress']
        birthday = request.form['birthday']
        sex = request.form['sex']
        nationality = request.form['nationality']
        house_no = request.form.get('houseNo')
        street = request.form.get('street')
        barangay = request.form.get('barangay')
        city = request.form.get('city')
        province = request.form.get('province')
        position = request.form['position']
        department = request.form['department']
        status = request.form['status']
        employment_type = request.form['employmentType']
        hired_date = request.form['hiredDate']
        licenses = request.form.get('licenses')

        # Insert data into the database
        cursor = empdb.cursor()
        cursor.execute('''
            INSERT INTO employees (last_name, first_name, middle_name, ext_name, contact_number, email_address, birthday, sex, nationality, house_no, street, barangay, city, province, position, department, status, employment_type, hired_date, licenses)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ''', (last_name, first_name, middle_name, ext_name, contact_number, email_address, birthday, sex, nationality, house_no, street, barangay, city, province, position, department, status, employment_type, hired_date, licenses))

        empdb.commit()
        cursor.close()

        return jsonify({'success': True, 'message': 'Employee added successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/employee/info/<int:employee_id>', methods=['GET'])
@roles_required('Finance Manager')
def personal(employee_id):
    cursor = empdb.cursor(dictionary=True)
    cursor.execute(
        """SELECT employees.*, employments.*, schedules.*, departments.dpt_name 
        FROM employees
        JOIN employments ON employees.employment_id = employments.employment_id
        JOIN schedules ON employees.employee_id = schedules.employee_id
        JOIN departments ON employments.department_id = departments.department_id
        WHERE employee_id = %s""", (employee_id)
    )
    employee = cursor.fetchone()
    if employee:
        return jsonify(employee)
    else:
        return jsonify({'error': 'Employee not found'}), 404
    
@app.route('/room')
@roles_required('Finance Manager')
def room():
    cursor = empdb.cursor(dictionary=True)
    cursor.execute(
        """SELECT rooms.*, beds.*, wards.ward_floor_no
           FROM rooms
           JOIN beds ON rooms.room_no = beds.room_no
           JOIN wards ON rooms.ward_id = wards.ward_id
        """
    )
    rooms = cursor.fetchall()
    return render_template('room_avail.html', username=session['username'], role=session['role'], rooms=rooms)  

@app.route('/services/<int:department_id>')
@roles_required('Finance Manager')
def get_services(department_id):
    cursor = empdb.cursor(dictionary=True)
    query = """SELECT services.*, departments.* 
               FROM services 
               JOIN departments ON departments.department_id = services.department_id
               WHERE departments.department_id = %s"""
    cursor.execute(query, (department_id,))
    services = cursor.fetchall()
    cursor.close()
    return jsonify(services)

@app.route('/services', methods=['GET'])
@roles_required('Finance Manager')
def services():
    cursor = empdb.cursor(dictionary=True)
    department_id = request.args.get('department_id')
    
    cursor.execute("SELECT * FROM departments")
    departments = cursor.fetchall()

    # Fetch services filtered by department
    if department_id:
        cursor.execute("SELECT * FROM services WHERE department_id = %s", (department_id,))
    else:
        cursor.execute("SELECT * FROM services")
    
    services = cursor.fetchall()
    cursor.close()
    return render_template('services_management.html', username=session['username'], role=session['role'], departments=departments, services=services)

@app.route('/hospital_patients')
@roles_required('Finance Manager', 'Billing Specialist')
def hospital_patients():
    conn = empdb
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patients") 
    patients_list = cursor.fetchall()
    cursor.close()
    return render_template('hospital_patients.html', username=session['username'], role=session['role'], patients=patients_list)  

@app.route('/hospital_invoices', methods=['GET', 'POST'])
@roles_required('Finance Manager', 'Billing Specialist')
def hospital_invoices():
    if request.method == 'POST':
        # Handle form submission
        patient_id = request.form.get('patient_id')
        patient_name = request.form.get('patient_name')
        contact_details = request.form.get('contact_details')
        billing_address = request.form.get('billing_address')
        insurance_info = request.form.get('insurance_info')
        # You would need to add logic to handle services and logistics details

        # Save the invoice information in the database
        conn = empdb
        cursor = conn.cursor()

        # Example query to insert invoice data (you need to adjust the table and columns)
        cursor.execute("""
            INSERT INTO invoices (patient_id, patient_name, contact_details, billing_address, insurance_info)
            VALUES (%s, %s, %s, %s, %s)
        """, (patient_id, patient_name, contact_details, billing_address, insurance_info))
        
        conn.commit()
        cursor.close()

        return redirect(url_for('success'))

    # Handle GET request (fetch patient data)
    patient_id = request.args.get('patient_id')
    if not patient_id:
        return "Patient ID is required", 400

    conn = empdb
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM patients WHERE patient_id = %s", (patient_id,))
    patient = cursor.fetchone()
    cursor.close()

    if not patient:
        return "Patient not found", 404

    return render_template('hospital_invoices.html', patient=patient, username=session.get('username'), role=session.get('role'))

@app.route('/success')
def success():
    return "Invoice saved successfully!"

@app.route('/external_customers')
@roles_required('Finance Manager', 'Billing Specialist')
def external_customers():
    conn = empdb
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM external_customers")
    external_customers = cursor.fetchall()
    cursor.close()
    return render_template('external_customers.html', external_customers=external_customers, username=session.get('username'), role=session.get('role'))

@app.route('/external_invoices', methods=['GET', 'POST'])
@roles_required('Finance Manager', 'Billing Specialist')
def external_invoices():
    conn = empdb
    cursor = conn.cursor(dictionary=True)
    
    customer_id = request.args.get('customer_id')  # Retrieve customer_id from the query parameters
    
    if request.method == 'POST':
        # Handle form submission for external invoices
        full_name = request.form.get('customer_name')  # Updated to match form input name
        contact_number = request.form.get('contact_details')  # Updated to match form input name
        email = request.form.get('email')  # Add this field to the form if needed
        address = request.form.get('billing_address')  # Updated to match form input name
        medicine_purchased = request.form.get('medicine_purchased')  # This might need to be handled differently
        total_cost = request.form.get('total_cost')
        purchase_date = request.form.get('purchase_date')
        invoice_status = request.form.get('invoice_status', 'Unpaid')
        
        # Insert or update invoice information in the database
        cursor.execute("""
            INSERT INTO external_invoices (customer_id, full_name, contact_number, email, address, medicine_purchased, total_cost, purchase_date, invoice_status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (customer_id, full_name, contact_number, email, address, medicine_purchased, total_cost, purchase_date, invoice_status))
        
        conn.commit()
        cursor.close()
        
        return redirect(url_for('success'))  # Redirect to a success page

    # Handle GET request (fetch customer data)
    cursor.execute("SELECT * FROM external_customers WHERE id = %s", (customer_id,))
    customer = cursor.fetchone()
    
    if not customer:
        cursor.close()
        return "Customer not found", 404
    
    cursor.close()
    
    return render_template('external_invoices.html', customer=customer, username=session.get('username'), role=session.get('role'))

@app.route('/patient-billing')
@roles_required('Finance Manager', 'Billing Specialist')
def billing():
    return render_template('patient_billing.html', username=session['username'], role=session['role'])  

@app.route('/invoice_management')
@roles_required('Finance Manager', 'Billing Specialist')
def invoice_management():
    return render_template('invoice_management.html', username=session['username'], role=session['role'])  

@app.route('/invoice_view')
@roles_required('Finance Manager', 'Billing Specialist')
def invoice_view():
    return render_template('invoice_view.html', username=session['username'], role=session['role'])  

@app.route('/submitted_invoices')
@roles_required('Finance Manager', 'Billing Specialist')
def submitted_invoices():
    return render_template('submitted_invoices.html', username=session['username'], role=session['role'])  

@app.route('/rejected_invoices')
def rejected_invoices():
    return render_template('rejected_invoices.html', username=session['username'], role=session['role'])  

@app.route('/voided_invoices')
def voided_invoices():
    return render_template('voided_invoices.html', username=session['username'], role=session['role'])  

@app.route('/payment-process')
@roles_required('Finance Manager', 'Billing Specialist')
def payment():
    return render_template('payment_process.html', username=session['username'], role=session['role'])       

@app.route('/payment-record')
@roles_required('Finance Manager', 'Billing Specialist')
def payment_record():
    return render_template('payment_record.html', username=session['username'], role=session['role'])    

# @app.route('/payment_record/<int:patient_id>')
# def payment_record(patient_id):
#     # Fetch the payment record for the patient from the database
#     records = Payment.query.filter_by(patient_id=patient_id).all()
#     return render_template('payment_record.html', records=records)

@app.route('/receivables')
@roles_required('Finance Manager', 'Billing Specialist')
def receivables():
    return render_template('outstanding_receivables.html', username=session['username'], role=session['role'])  

@app.route('/insurance')
@roles_required('Finance Manager', 'Insurance Claims Officer')
def insurance():
    return render_template('insurance.html', username=session['username'], role=session['role'])    

@app.route('/insurace_view')
@roles_required('Finance Manager', 'Insurance Claims Officer')
def insurance_view():
    return render_template('insurance_view.html', username=session['username'], role=session['role'])  

@app.route('/audit')
@roles_required('Finance Manager')
def audit():
    return render_template('audit_trails.html', username=session['username'], role=session['role'])    

@app.route('/emp-info')
def emp_info():
    return render_template('employee_info.html', username=session['username'], role=session['role'])  

@app.route('/emp-view/<int:employee_id>')
@roles_required('Finance Manager')
def emp_view(employee_id):
    cursor = empdb.cursor(dictionary=True)
    cursor.execute(
        """SELECT employees.*, employments.*, departments.dpt_name
        FROM employees
        JOIN employments ON employees.employment_id = employments.employment_id
        JOIN departments ON employments.department_id = departments.department_id
        WHERE employees.employee_id = %s""", (employee_id,)
    )
    employee = cursor.fetchone()

    cursor.execute("""SELECT schedules.* FROM schedules WHERE schedules.employee_id = %s """, (employee_id,))
    schedule = cursor.fetchone()
    
    if employee:
        return render_template('employee_view.html', username=session['username'], role=session['role'], employee_id=employee_id, employee=employee, schedule=schedule)
    else:
        return jsonify({'error': 'Employee not found'}), 404
    
@app.route('/insurance-provider')
@roles_required('Finance Manager', 'Insurance Claims Officer')
def insurance_provider():
    return render_template('insurance_provider.html', username=session['username'], role=session['role'])    

        
if __name__ == '__main__':
    app.run(debug=True)
