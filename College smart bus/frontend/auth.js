// =====================================================
// ROUTEX ADMIN AUTHENTICATION
// =====================================================

const ADMIN_EMAIL = "n0w5h1n";
const ADMIN_PASSWORD = "now1230";


// =====================================================
// ADMIN LOGIN
// =====================================================

function loginUser(email, password) {

    email = email.trim().toLowerCase();

    if (
        email === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
    ) {

        // Save admin login
        localStorage.setItem("routexRole", "admin");

        // Open admin dashboard
        window.location.href = "admin.html";

        return true;
    }

    return false;
}


// =====================================================
// PROTECT ADMIN PAGE
// =====================================================

function requireRole(role) {

    const currentRole =
        localStorage.getItem("routexRole");

    if (currentRole !== role) {

        window.location.href = "admin-login.html";

    }
}


// =====================================================
// ADMIN LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem("routexRole");

    window.location.href = "index.html";

}