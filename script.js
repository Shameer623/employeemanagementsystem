const API_BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

// Employee Functions
async function fetchEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);
    const employees = await response.json();
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';
    employees.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = `ID: ${emp.employeeID}, Name: ${emp.firstName} ${emp.lastName}, Department ID: ${emp.department.department_ID}`;
        li.onclick = () => editEmployee(emp);
        employeeList.appendChild(li);
    });
}

async function addOrUpdateEmployee(event) {
    event.preventDefault();
    const employeeId = document.getElementById('employee-id').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const departmentId = document.getElementById('department-id').value;

    const employee = {
        employeeID: employeeId ? parseInt(employeeId) : 0,
        firstName,
        lastName,
        department: { department_ID: parseInt(departmentId) }
    };

    const url = employeeId ? `${API_BASE_URL}/employees/${employeeId}` : `${API_BASE_URL}/employees`;
    const method = employeeId ? 'PUT' : 'POST';

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    });

    fetchEmployees();
    document.getElementById('employee-form').reset();
    document.getElementById('employee-id').value = '';
}

function editEmployee(employee) {
    document.getElementById('employee-id').value = employee.employeeID;
    document.getElementById('first-name').value = employee.firstName;
    document.getElementById('last-name').value = employee.lastName;
    document.getElementById('department-id').value = employee.department.department_ID;
}

// Department Functions
async function fetchDepartments() {
    const response = await fetch(`${API_BASE_URL}/departments`);
    const departments = await response.json();
    const departmentList = document.getElementById('department-list');
    departmentList.innerHTML = '';
    departments.forEach(dept => {
        const li = document.createElement('li');
        li.textContent = `ID: ${dept.department_ID}, Short Name: ${dept.short_Name}, Name: ${dept.department_Name}`;
        li.onclick = () => editDepartment(dept);
        departmentList.appendChild(li);
    });
}

async function addOrUpdateDepartment(event) {
    event.preventDefault();
    const departmentId = document.getElementById('department-id').value;
    const shortName = document.getElementById('short-name').value;
    const departmentName = document.getElementById('department-name').value;

    const department = {
        department_ID: departmentId ? parseInt(departmentId) : 0,
        short_Name: shortName,
        department_Name: departmentName
    };

    const url = departmentId ? `${API_BASE_URL}/departments/${departmentId}` : `${API_BASE_URL}/departments`;
    const method = departmentId ? 'PUT' : 'POST';

    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department)
    });

    fetchDepartments();
    document.getElementById('department-form').reset();
    document.getElementById('department-id').value = '';
}

function editDepartment(department) {
    document.getElementById('department-id').value = department.department_ID;
    document.getElementById('short-name').value = department.short_Name;
    document.getElementById('department-name').value = department.department_Name;
}

// Event Listeners
document.getElementById('employee-form').addEventListener('submit', addOrUpdateEmployee);
document.getElementById('department-form').addEventListener('submit', addOrUpdateDepartment);

// Initial Fetch
fetchEmployees();
fetchDepartments();