async function register() {
  const email = document.getElementById("signup-email").value.toLowerCase();
  const password = document.getElementById("signup-password").value;

  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
  if (res.ok) showPage('login');
}

async function login() {
  const email = document.getElementById("login-email").value.toLowerCase();
  const password = document.getElementById("login-password").value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
  if (res.ok) {
    localStorage.setItem("loggedInUser", email);
    showPage("home");
  }
}
