document.addEventListener("DOMContentLoaded", () => {
  // === Helper Functions ===
  const saveToLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));
  const loadFromLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];

  const loginPage = document.getElementById("login-page");
  const signupPage = document.getElementById("signup-page");
  const feedPage = document.getElementById("main-feed");
  const profileHeader = document.getElementById("profile-header");
  const postList = document.querySelector(".post-list");
  const loginForm = document.querySelector("#login-page form");
  const signupForm = document.querySelector("#signup-page form");
  const postForm = document.querySelector(".post-form");
  const logoutBtn = document.getElementById("nav-logout");
  const bottomNav = document.querySelector(".bottom-nav");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // === Navigation ===
  const links = document.querySelectorAll(".bottom-nav a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const id = link.id?.split("-")[1];
      document.querySelectorAll(".container, .feed-container, .profile-header").forEach(sec => sec.classList.add("hidden"));

      if (id === "home" || id === "create") feedPage.classList.remove("hidden");
      else if (id === "profile") profileHeader.classList.remove("hidden");
      else if (id === "chat") alert("Chat coming soon...");
    });
  });

  // === Auth Form Footer Links ===
  document.querySelector("#login-page .form-footer a").addEventListener("click", () => {
    loginPage.classList.add("hidden");
    signupPage.classList.remove("hidden");
  });

  document.querySelector("#signup-page .form-footer a").addEventListener("click", () => {
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });

  // === Login Form ===
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    const users = loadFromLocal("users");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      loadApp();
    } else {
      alert("Invalid credentials");
    }
  });

  // === Sign-up Form ===
  signupForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = signupForm["signup-username"].value;
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    const confirm = signupForm["signup-confirm"].value;

    if (password !== confirm) return alert("Passwords do not match");

    const users = loadFromLocal("users");
    if (users.some(u => u.email === email)) return alert("Email already in use");

    const newUser = { username, email, password, bio: "Hi! I'm new here.", avatar: "https://randomuser.me/api/portraits/lego/1.jpg" };
    users.push(newUser);
    saveToLocal("users", users);
    alert("Account created. Please log in.");
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });

  // === Logout Button ===
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
  });

  // === Post Creation ===
//   postForm.addEventListener("submit", e => {
//     e.preventDefault();
//     const content = postForm.querySelector("input").value.trim();
//     if (!content) return;

//     const posts = loadFromLocal("posts");
//     posts.unshift({
//       username: currentUser.username, 
    
//       avatar: currentUser.avatar || "https://randomuser.me/api/portraits/lego/2.jpg",
//       content
//     });
//     saveToLocal("posts", posts);
//     postForm.reset();
//     renderPosts();
//   });  
// secen
postForm.addEventListener("submit", e => {
  
  if (e.submitter || e.submitter.tagName !== "BUTTON") {
    e.preventDefault();
    return;
  }

  e.preventDefault();

  const content = postForm.querySelector("input").value.trim();
  if (!content) return;

  const posts = loadFromLocal("posts");
  posts.unshift({
    username: currentUser.username,
    avatar: currentUser.avatar || "https://randomuser.me/api/portraits/lego/2.jpg",
    content
  });
  saveToLocal("posts", posts);
  postForm.reset();
  renderPosts();
});

  function renderPosts() {
    const posts = loadFromLocal("posts");
    postList.innerHTML = "";
    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post-card";
      div.innerHTML = `
        <div class="post-userpic">
          <img src="${post.avatar}" alt="${post.username}" width="44" height="44" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="post-content-wrap">
          <span class="post-username">${post.username}</span>
          <div class="post-content">${post.content}</div>
        </div>
      `;
      postList.appendChild(div);
    });
  }

  // === Edit Profile Bio ===
  const profileUsername = document.querySelector(".profile-username");
  const profileBio = document.querySelector(".profile-bio");

  document.querySelector(".edit-profile-btn").addEventListener("click", () => {
    const newBio = prompt("Update your bio:", currentUser.bio || "");
    if (newBio !== null) {
      currentUser.bio = newBio;
      profileBio.textContent = newBio;
      const users = loadFromLocal("users").map(u => u.email === currentUser.email ? currentUser : u);
      saveToLocal("users", users);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  });

  // === Load App ===
  function loadApp() {
    loginPage.classList.add("hidden");
    signupPage.classList.add("hidden");
    profileHeader.classList.remove("hidden");
    feedPage.classList.remove("hidden");
    bottomNav.classList.remove("hidden");

    profileUsername.textContent = currentUser.username;
    profileBio.textContent = currentUser.bio || "";
    renderPosts();
  }

  // === Initial Load Check ===
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn && currentUser) {
    loadApp();
  } else {
    loginPage.classList.remove("hidden");
    signupPage.classList.add("hidden");
    profileHeader.classList.add("hidden");
    feedPage.classList.add("hidden");
    bottomNav.classList.add("hidden");
  }
});
