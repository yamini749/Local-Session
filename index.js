// Array to store user entries
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Function to display entries in the table
const displayEntries = () => {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the existing table entries

    userEntries.forEach((entry) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTermsAndConditions ? 'Yes' : 'No'}</td>
        `;

        tableBody.appendChild(row);
    });
};

// Function to validate age
const isValidAge = (dob) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age >= 18 && age <= 55;
};

// Function to validate email
const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

// Function to handle form submission
const saveUserForm = (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    // Validate age and email
    if (!isValidAge(dob)) {
        alert("Age must be between 18 and 55.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions,
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    displayEntries();

    document.getElementById("user-form").reset();
};

document.getElementById("user-form").addEventListener("submit", saveUserForm);

displayEntries();
