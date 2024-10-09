from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify

app = Flask(__name__)

# Serve  login page
@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    return render_template('dashboard.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Serve  forgot password page
@app.route('/forgot-password')
def forgot_pass():
    return render_template('forgot_pass.html')

@app.route('/tech-support')
def tech_support():
    return render_template('tech_support.html')

# Serve  employee directory page
@app.route('/employee', methods=['GET'])
def employee():
    return render_template('employee_directory.html')

# Serve static room availability page
@app.route('/room')
def room():
    return render_template('room_avail.html')

# Serve static medical ward page
@app.route('/medical-ward')
def medical_ward():
    return render_template('medical_ward.html')

# Serve static radiology page
@app.route('/radiology')
def radiology():
    return render_template('radiology.html')

# Serve static services management page
@app.route('/services', methods=['GET'])
def services():
    return render_template('services_management.html')

# Serve static hospital patients page
@app.route('/hospital_patients')
def hospital_patients():
    return render_template('hospital_patients.html')

# Serve static hospital invoices page
@app.route('/hospital_invoices', methods=['GET', 'POST'])
def hospital_invoices():
    return render_template('hospital_invoices.html')

@app.route('/success')
def success():
    return "Invoice saved successfully!"  # This remains a static response

# Serve static external customers page
@app.route('/external_customers')
def external_customers():
    return render_template('external_customers.html')

# Serve static external invoices page
@app.route('/external_invoices', methods=['GET', 'POST'])
def external_invoices():
    return render_template('external_invoices.html')

# Serve static patient billing page
@app.route('/patient-billing')
def billing():
    return render_template('patient_billing.html')

# Serve static invoice management page
@app.route('/invoice_management')
def invoice_management():
    return render_template('invoice_management.html')

# Serve static invoice view page
@app.route('/invoice_view')
def invoice_view():
    return render_template('invoice_view.html')

# Serve static submitted invoices page
@app.route('/submitted_invoices')
def submitted_invoices():
    return render_template('submitted_invoices.html')

# Serve static rejected invoices page
@app.route('/rejected_invoices')
def rejected_invoices():
    return render_template('rejected_invoices.html')

# Serve static voided invoices page
@app.route('/voided_invoices')
def voided_invoices():
    return render_template('voided_invoices.html')

# Serve static payment process page
@app.route('/payment-process')
def payment():
    return render_template('payment_process.html')

# Serve static payment record page
@app.route('/payment-record')
def payment_record():
    return render_template('payment_record.html')

# Serve static receivables page
@app.route('/receivables')
def receivables():
    return render_template('outstanding_receivables.html')

# Serve static insurance page
@app.route('/insurance')
def insurance():
    return render_template('insurance.html')

# Serve static insurance view page
@app.route('/insurance_view')
def insurance_view():
    return render_template('insurance_view.html')

# Serve static audit page
@app.route('/audit')
def audit():
    return render_template('audit_trails.html')

# Serve static employee view info page
@app.route('/emp-view')
def emp_view():
    return render_template('employee_view.html')      

# Serve static insurance provider page
@app.route('/insurance-provider')
def insurance_provider():
    return render_template('insurance_provider.html')

# Serve static submitted view page
@app.route('/sub-view')
def sub_view():
    return render_template('submitted_view.html')

# Serve static invoice edit page
@app.route('/invoice_edit')
def invoice_edit():
    return render_template('invoice_edit.html')

# Serve static invoice coverage page
@app.route('/invoice_coverage')
def invoice_coverage():
    return render_template('invoice_coverage.html')

# Serve static invoice reimbursement page
@app.route('/invoice_reimbursement')
def invoice_reimbursement():
    return render_template('invoice_reimbursement.html')

# Serve static employee edit page
@app.route('/emp_edit')
def emp_edit():
    return render_template('employee_edit.html')

@app.route('/logout')
def logout():
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
