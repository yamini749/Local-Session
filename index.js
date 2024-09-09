// Array to store user entries, fetching from local storage if available
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

// Function to display entries in the table
const displayEntries = () => {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear existing rows

    userEntries.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-4 py-2 border">${entry.name}</td>
            <td class="px-4 py-2 border">${entry.email}</td>
            <td class="px-4 py-2 border">${entry.password}</td>
            <td class="px-4 py-2 border">${entry.dob}</td>
            <td class="px-4 py-2 border">${entry.acceptedTermsAndConditions ? 'true' : 'false'}</td>
        `;
        tableBody.appendChild(row);
    });
};

const isValidAge = (dob) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age >= 18 && age <= 55;
};

const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const saveUserForm = (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    if (!isValidAge(dob)) {
        alert("Age must be between 18 and 55.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!acceptedTermsAndConditions) {
        alert("You must accept the terms and conditions to proceed.");
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
