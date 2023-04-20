// séllection des élément 
const modal = document.querySelector('#modal');
const modal1 = document.querySelector('.modal1');
const modal2 = document.querySelector(".modal2");
const openModal = document.querySelector('.js-modal');

function showModal () {
  modal.style.display = "flex";
  modal1.style.display = "flex";
  modal2.style.display ='none';
}


openModal.addEventListener('click' , showModal);

function showModal2 () {
  modal1.style.display = "none";
  modal2.style.display ="flex";
}

function showMdal1 () {
  modal1.style.display ="flex";
  modal2.style.display ="none";
}
// fonction pour fermer le modal en totalité
function closeModal () {
  modal.style.display ='none';
  modal1.style.display ='none';
  modal2.style.display ='none';
};

// Sélectionner les éléments nécessaires pour le changement d'aside
const btnAddImg = document.querySelector('.addimg-modal');
const btnReturn = document.querySelector('.js-return');
const btnClose = document.querySelectorAll('.js-close');



// Ajouter un écouteur d'événements sur le bouton "Ajouter une image"
btnAddImg.addEventListener('click', showModal2);

// Ajouter un écouteur d'événements sur le bouton "Retour"
btnReturn.addEventListener('click', showMdal1);

btnClose.forEach(function(close){
  close.addEventListener('click',closeModal);
});









// function pour afficher le contenue de l'api et pouvoir le supprimer et en ajouter
function afficherGalerie() {
  const galleryModal = document.querySelector(".gallery-modal");

  // Utiliser l'API pour récupérer les données
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      // Pour chaque élément de données, créer un élément HTML correspondant
      data.forEach(photo => {
        const figure = document.createElement("figure");
        figure.classList.add('figure-modal');
        const img = document.createElement("img");
        img.classList.add('img-modal');
        

        img.src = photo.imageUrl;
        img.alt = photo.title;
        

        const deleteButton = document.createElement("button");
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = "Supprimer";

        deleteButton.addEventListener("click", () => {
          // Supprimer l'élément de la boîte modale
          figure.remove();
          
          // Envoyer une demande de suppression à l'API
          fetch(`http://localhost:5678/api/works/${photo.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        });

        figure.appendChild(img);
        figure.appendChild(deleteButton);
        galleryModal.appendChild(figure);
      });
    })
    .catch(error => console.error(error));
}

afficherGalerie();


// fonction pour ajouter une image
function addImage(event) {
  event.preventDefault();

  const title = document.getElementById("image-title").value;
  const category = document.getElementById("image-category").value;
  const fileInput = document.getElementById("image-file");
  const file = fileInput.files[0];
  
  if (!title || !category || !file) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

  const token = localStorage.getItem("token");

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Une erreur est survenue.");
  })
  .then(data => {
    console.log("L'image a été ajoutée avec succès : ", data);
    closeModal();
  })
  .catch(error => console.error(error));
}

// fonction pour récupérer les catégories depuis l'API
function getCategories() {
  fetch("http://localhost:5678/api/categories")
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Une erreur est survenue.");
  })
  .then(data => {
    const select = document.getElementById("image-category");
    data.forEach(category => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.error(error));
}

// appel de la fonction pour récupérer les catégories
getCategories();


//test 
function preview() {
  frame.src=URL.createObjectURL(event.target.files[0]);
}
// écouteur d'événement pour soumettre le formulaire
const form = document.getElementById("form-test");
form.addEventListener("submit", addImage);
