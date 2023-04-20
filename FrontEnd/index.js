// création d'une constance pour donner les chemain de l'api
const apiWorks = "http://localhost:5678/api/works";

// récupération des données de l'API en json
async function fetchWorks (){
    const response = await fetch(apiWorks);
    const data = await response.json();
    return data;
}


    // création du boucle for pour incrémenté les article dinamiquement 
fetchWorks().then((data) => {

    // affichage du JSON dans la console 
    console.log(data);


    // récupération de la balise dom
    const sectionGallery = document.querySelector(".gallery");
    
    
    for (let i = 0; i < data.length; i++) {
    
      const article = data[i];

      // balise pour les éléments à créer
      const figure = document.createElement("figure");

      // création des balises
      const img = document.createElement("img");
      img.src = article.imageUrl;

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = article.title;

      // rattachement des balises au parent
      figure.appendChild(img);
      figure.appendChild(figcaption);
      sectionGallery.appendChild(figure);
  }
});


// récupération de l'api dans un const
const apiCat = "http://localhost:5678/api/categories";

// je transforme les données de l'API en JSON
async function fetchCat() {
  const response = await fetch(apiCat);
  const data = await response.json();
  return data;
}

fetchWorks().then((data) => {
  // un petit console.log pour vérifier que j'ai bien le retour de la promesse.
  console.log(data);



  // récupération des boutons, et création d'un filter par boutons.
const btnTous = document.querySelector(".btn-tous");
  btnTous.addEventListener("click", function () {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Effacer le contenu existant de la galerie

  data.forEach(function(item) {
    // Créer des éléments DOM pour chaque élément
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    // Ajouter les éléments DOM à la galerie
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
});

// création de la fonctionnalité pour triér les projet
const btnObjets = document.querySelector(".btn-objets");
  btnObjets.addEventListener("click", function () {
  const btnobjetbtn = data.filter(function (item) {
    return item.category.name === "Objets"; 
  });
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Effacer le contenu existant de la galerie

  btnobjetbtn.forEach(function(item) {
    // Créer des éléments DOM pour chaque élément
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    // Ajouter les éléments DOM à la galerie
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });

  console.log(btnobjetbtn);
});



const btnAppartement = document.querySelector(".btn-appartements");
btnAppartement.addEventListener("click",function () {
  const btnappartementbtn = data.filter(function (item) {
    return item.category.name === "Appartements"; 
  });
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; 

  btnappartementbtn.forEach(function(item) {
   
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
  console.log(btnappartementbtn);
  
});



  const btnHotel = document.querySelector(".btn-hotel");
  btnHotel.addEventListener("click", function () {
    const btnHotelbtn = data.filter(function (item) {
      return item.category.name === "Hotels & restaurants";
    });
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; 
  
    btnHotelbtn.forEach(function(item) {
      
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
  
      img.src = item.imageUrl;
      img.alt = item.title;
      figcaption.textContent = item.title;
  
      
      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
    console.log(btnHotelbtn);

  });

});


// création d'une condition pour se connecter mais également ce déconnecter
const loginContainer = document.getElementById('login-container');

if (localStorage.getItem('token')) {
  // Si le token est présent, afficher un bouton de déconnexion
  const logoutButton = document.createElement('button');
  logoutButton.classList.add('logout-button');
  logoutButton.innerText = 'logout';
  logoutButton.addEventListener('click', () => {
    // Supprimer le token du localStorage et recharger la page
    localStorage.removeItem('token');
    location.reload();
  });
  loginContainer.appendChild(logoutButton);
} else {
  // Sinon, afficher un lien de connexion
  const loginLink = document.createElement('a');
  loginLink.href = 'log.html';
  loginLink.innerText = 'Connexion';
  loginContainer.appendChild(loginLink);
}



// création d'une condition pour voir le bandeau
const token = localStorage.getItem('token');
console.log("token: ", token);
const bandeauSection = document.querySelector('.bandeau');

if (token) {
  bandeauSection.style.display = 'flex';
} else {
  bandeauSection.style.display = 'none';
}
