// recupération du dom.
const loginForm = document.querySelector("form");
// récupération de l'évenement envoye.
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  
  if (data.token) {
    // Stocker le token dans le localStorage
    localStorage.setItem("token", data.token); 
    window.location.href = "index.html";
  } else {
    // Le token n'a pas été récupéré, afficher un message d'erreur
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Impossible de se connecter. Veuillez vérifier vos identifiants.";
    loginForm.appendChild(errorMessage);
  }
  
});
