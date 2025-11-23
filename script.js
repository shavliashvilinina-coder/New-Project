  const loginModal = document.getElementById("loginModal");
  const registerModal = document.getElementById("registerModal");
  document.getElementById("openLogin").onclick = () => loginModal.style.display = "flex";
  document.getElementById("openRegister").onclick = () => registerModal.style.display = "flex";

  document.getElementById("closeLogin").onclick = () => loginModal.style.display = "none";
  document.getElementById("closeRegister").onclick = () => registerModal.style.display = "none";

  window.onclick = (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === registerModal) registerModal.style.display = "none";
  };

  // Simple localStorage auth (for demo only)
  function registerUser() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;

    if (!name || !email || !pass) { alert("გთხოვთ შეავსოთ ყველა ველი."); return; }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) { alert('ამ ელ.ფოსტით მომხმარებელი უკვე არსებობს.'); return; }

    users.push({ name, email, pass });
    localStorage.setItem('users', JSON.stringify(users));
    alert('რეგისტრაცია წარმატებულია!');
    registerModal.style.display = 'none';
  }

  function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.pass === pass);
    if (found) {
      localStorage.setItem('currentUser', JSON.stringify(found));
      alert('შესვლა წარმატებულია!');
      loginModal.style.display = 'none';
      showUser(found);
    } else {
      alert('ელ.ფოსტა ან პაროლი არასწორია.');
    }
  }

  function showUser(user) {
    const nav = document.querySelector('.nav');
    nav.innerHTML = `
      <a href="#about">ჩვენ შესახებ</a>
      <a href="#catalog">კატალოგი</a>
      <a href="#contact">კონტაქტი</a>
      <span class="user-greet">${user.name}</span>
      <a id="logout" class="nav-link">გასვლა</a>
    `;
    document.getElementById('logout').onclick = () => { localStorage.removeItem('currentUser'); location.reload(); };
  }

  // On load, check user
  window.addEventListener('DOMContentLoaded', () => {
    const current = JSON.parse(localStorage.getItem('currentUser'));
    if (current) showUser(current);
  });
  </script>
