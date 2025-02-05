document.addEventListener("DOMContentLoaded", function () {
  let mailbox = document.querySelector(".mailbox");
  let postcardsContainer = document.querySelector(".postcards");
  let postcards = document.querySelectorAll(".postcard");
  let introText = document.querySelector(".intro-text-header");
  let openSound = document.getElementById("openSound");
  let hoverSound = document.getElementById("hoverSound");
  let header = document.querySelector("header");

  // Hiển thị hộp thư sau 1 giây
  setTimeout(() => {
    mailbox.classList.add("visible");
    header.style.background =
      "radial-gradient(circle, rgba(255, 255, 255, 0.6) 30%, rgba(0, 0, 0, 0.7) 90%), url('https://res.cloudinary.com/da9k32mdb/image/upload/v1738749633/media/images/gplrlbgu6hezgaof9vro.webp')";
  }, 1000);

  function openMailbox() {
    openSound.play(); // Phát âm thanh mở hộp thư
    mailbox.classList.add("open");
    introText.classList.add("hidden");

    setTimeout(() => {
      postcardsContainer.style.opacity = "1";
      postcardsContainer.style.transform = "translateY(0)";

      postcards.forEach((card, index) => {
        setTimeout(() => {
          card.style.top = "-50px"; // Bay lên nhẹ
          card.style.opacity = "1";
        }, index * 300);

        setTimeout(() => {
          card.style.top = "0"; // Rơi xuống vị trí cố định
        }, index * 600);
      });
    }, 1000);
  }

  mailbox.addEventListener("click", openMailbox);
});

// Khi nhấp vào bưu thiếp đầu tiên, bay lên rồi cuộn đến câu chuyện
function goToStory(storyId) {
  let postcard = document.getElementById("card" + storyId);
  let sectionToScroll;

  // Vérifie quelle carte a été cliquée et choisit la section correspondante
  if (storyId === 1) {
    sectionToScroll = document.getElementById("guerre-section");
  } else if (storyId === 2) {
    sectionToScroll = document.getElementById("coloniale-section");
  } else if (storyId === 3) {
    sectionToScroll = document.getElementById("toguo-section");
  } else {
    console.error("Erreur : Section non définie pour la carte postale " + storyId);
    return;
  }

  if (!postcard || !sectionToScroll) {
    console.error("Erreur : Élément introuvable !");
    return;
  }

  // Ajouter l'effet de vol à la carte postale cliquée
  postcard.classList.add("fly-away");

  // Attendre l'animation puis faire défiler vers la section
  setTimeout(() => {
    sectionToScroll.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1500);
}
document.addEventListener("DOMContentLoaded", function () {
  let storySection = document.getElementById("story1");
  let letterContainer = document.querySelector(".letter-container");
  let letterText = document.getElementById("letter-text");
  let viewOriginalBtn = document.getElementById("view-original-btn");
  let originalLetter = document.getElementById("original-letter");

  let writingSound = document.getElementById("writingSound"); // Sélectionner l'audio
  let isTyping = false; // Vérifier si le texte est en train d'être tapé

  let fullText = `Dimanche 1e novembre 1914 ,\n\n
    Petite femme chérie,\n
    C’est par une belle journée que je viens te dire pauvre Lilie un petit bonjour. Comment te portes-tu ainsi que tout nos pauvres parents. J’espère que la canonnade ne doit plus trop vous troubler quoique tout ces boches soit bien méchants. Les coups que vous pouvez recevoir maintenant sont des coups de fourberie car ils sont trop loin de notre pauvre ville pour l’atteindre véritablement. Je t’embrasse bien fort ainsi que toute la famille.
    Ecris plus souvent...`;

  function typeWriterEffect(textElement, text, speed) {
    let index = 0;
    textElement.innerHTML = ""; // Effacer le texte existant
    isTyping = true; // Indiquer que le texte est en train d'être tapé

    // Vérifier que le son est chargé avant de le jouer
    if (writingSound) {
      writingSound.currentTime = 0; // Repart du début
      writingSound.play().catch(error => console.error("Erreur de lecture audio:", error));
    }

    function type() {
      if (index < text.length) {
        if (text[index] === "\n") {
          textElement.innerHTML += "<br>"; // Gérer les sauts de ligne
        } else {
          textElement.innerHTML += text[index];
        }
        index++;
        setTimeout(type, speed);
      } else {
        textElement.style.borderRight = "none"; // Retirer le curseur après l'écriture
        viewOriginalBtn.style.display = "block"; // Afficher le bouton "Source"
        if (writingSound) {
          writingSound.pause(); // Arrêter le son
          writingSound.currentTime = 0; // Réinitialiser
        }
        isTyping = false; // Fin de l'animation
      }
    }
    type();
  }

  function checkSectionVisibility() {
    let rect = storySection.getBoundingClientRect();
    let isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;

    if (isVisible) {
      // Si la section est visible et que l'animation ne s'est pas encore déclenchée
      if (!storySection.classList.contains("visible")) {
        storySection.classList.add("visible");
        letterContainer.classList.add("visible");

        setTimeout(() => {
          typeWriterEffect(letterText, fullText, 50);
        }, 1000);
      }
    } else {
      // Arrêter le son si l'utilisateur quitte la section
      if (isTyping && writingSound) {
        writingSound.pause();
        writingSound.currentTime = 0;
        isTyping = false;
      }
    }
  }

  window.addEventListener("scroll", checkSectionVisibility);

  // Fonction pour afficher la lettre originale
  window.showOriginalLetter = function () {
    originalLetter.style.display = "block";
  };

  // Fonction pour cacher la lettre originale
  window.hideOriginalLetter = function () {
    originalLetter.style.display = "none";
  };
});
//coloniale
document.addEventListener("DOMContentLoaded", function () {
  const hiddenElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 } // Active l'animation quand 30% de l'élément est visible
  );

  hiddenElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll(".third-text");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.3 } // Active l'animation quand 30% du texte est visible
  );

  textElements.forEach((el) => observer.observe(el));
});
function scrollPage(direction) {
  const scrollAmount = window.innerHeight / 1.5; // Définit la quantité de scroll (ajustable)
  window.scrollBy({
    top: direction * scrollAmount,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".enveloppe-container");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");

  // Liste des images de cartes postales
  const postcards = [
    "./images/toguo1.png",
    "./images/toguo2.png",
    "./images/toguo3.png",
    "./images/toguo4.png",
    "./images/toguo5.png",
    "./images/toguo6.jpeg",
    "./images/toguo7.jpeg",
    "./images/toguo8.jpeg",
    "./images/toguo9.jpeg",
    "./images/toguo10.jpeg",
    "./images/toguo11.jpeg",
    "./images/toguo12.jpeg",
    "./images/toguo13.jpeg",
    "./images/toguo14.jpeg",

  ];

  // Nombre d'enveloppes à afficher
  const numberOfEnvelopes = 14;

  for (let i = 0; i < numberOfEnvelopes; i++) {
    let enveloppe = document.createElement("img");
    enveloppe.src = "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749669/media/images/cscengtn5zrqn72pfwbl.png"; // Image de l'enveloppe
    enveloppe.classList.add("enveloppe");

    // Position aléatoire des enveloppes
    let posX = Math.random() * (window.innerWidth - 100);
    let posY = Math.random() * (window.innerHeight - 180);

    enveloppe.style.left = `${posX}px`;
    enveloppe.style.top = `${posY}px`;

    // Ajouter un événement de clic pour ouvrir une carte aléatoire
    enveloppe.addEventListener("click", function () {
      let randomImage = postcards[Math.floor(Math.random() * postcards.length)];
      modalImage.src = randomImage;
      modal.style.display = "flex";
    });

    container.appendChild(enveloppe);
  }
});

// Fonction pour fermer la modale
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".toguo-container");

  // Liste des images avec leurs positions fixes
  const toguoImages = [
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749669/media/images/mamxkckaitedgkplidtw.svg",
      left: "70%",
      top: "5%",
      rotate: "0deg",
      size: "500px",
    }, // Top Right
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749645/media/images/slyus59g0oyiuax3on4f.svg",
      left: "5%",
      top: "60%",
      rotate: "0deg",
      size: "500px",
    }, // Bottom Left
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749650/media/images/nlo7ajcqntw8xx91lsh1.png",
      left: "30%",
      top: "30%",
      rotate: "30deg",
      size: "400px",
    }, // Top Left (-30°)
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749646/media/images/vdheh3wflvz7hoy59gtn.png",
      left: "10%",
      top: "15%",
      rotate: "60deg",
      size: "400px",
    }, // Mid Left (-30°)
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749654/media/images/wffumjyia17bve8lhwbv.png",
      left: "50%",
      top: "50%",
      rotate: "-10deg",
      size: "400px",
    }, // Mid Right (30°)
    {
      src: "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749658/media/images/yooyxf6wiba954ajx8kl.png",
      left: "70%",
      top: "65%",
      rotate: "10deg",
      size: "400px",
    }, // Bottom Right (30°)
  ];

  // Vider le conteneur avant d'ajouter les nouvelles images
  container.innerHTML = "";

  toguoImages.forEach((image) => {
    let img = document.createElement("img");
    img.src = image.src;
    img.classList.add("toguo-image");

    // Appliquer les positions et rotations prédéfinies
    img.style.position = "absolute";
    img.style.left = image.left;
    img.style.top = image.top;
    img.style.transform = `rotate(${image.rotate})`;
    img.style.width = image.size; // Définit la taille personnalisée
    img.style.height = "auto"; // Garde le ratio original

    container.appendChild(img);
  });
});

//gate
let audio = document.getElementById('backgroundAudio');
        
        window.addEventListener('scroll', function () {
            let section = document.getElementById('gateSection');
            let sectionTop = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight / 1.5 && sectionTop > -windowHeight / 2) {
                let scrollPosition = window.scrollY;
                let openAmount = Math.min((windowHeight - sectionTop) / 5, 100);
                document.querySelector('.gate.left').style.transform = `rotateY(-${openAmount}deg)`;
                document.querySelector('.gate.right').style.transform = `rotateY(${openAmount}deg)`;
                
                let sign = document.getElementById('sign');
                sign.style.opacity = Math.min((openAmount - 50) / 50, 1);
                
                if (audio.paused) {
                    audio.play();
                }
            } else {
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        });

        document.getElementById('postcard').addEventListener('mouseenter', function() {
          this.classList.add('flipped');
          setTimeout(() => {
              document.querySelector('.postcard-message').style.opacity = '1';
          }, 1000);
      });
//map
const regions = document.querySelectorAll('.map-region');
const tooltip = document.getElementById('tooltip');
const detailsSection = document.getElementById('detailsSection');
const detailsTitle = document.getElementById('detailsTitle');
const detailsText = document.getElementById('detailsText');

const regionData = {
    "indochina": {title: "Indochine - Un coin d'Asie", text: "Découvrez la richesse culturelle de l'Indochine avec son architecture unique et son art traditionnel."},
    "west-africa": {title: "Afrique de l'Ouest - Carrefour culturel", text: "Profitez de la musique, des danses et de la diversité des civilisations ouest-africaines."},
    "north-africa": {title: "Afrique du Nord - Porte du désert du Sahara", text: "Un monde de souks animés, d'architecture ancienne et de culture riche."},
    "madagascar": {title: "Madagascar - L'île mystérieuse", text: "Une île fascinante avec une faune et une flore uniques et des paysages à couper le souffle."},
    "caribbean": {title: "Caraïbes - Terre de mer et de commerce", text: "Des plages sublimes, de la musique reggae et une histoire de commerce maritime ancienne."}
};

regions.forEach(region => {
    region.addEventListener('mouseenter', (event) => {
        tooltip.innerText = regionData[event.target.id].title;
        tooltip.style.display = 'block';
        tooltip.style.top = event.clientY + 'px';
        tooltip.style.left = event.clientX + 'px';
    });
    
    region.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
    
    region.addEventListener('click', (event) => {
        detailsTitle.innerText = regionData[event.target.id].title;
        detailsText.innerText = regionData[event.target.id].text;
        detailsSection.style.display = 'block';
    });
});
//idochine
        const sections = document.querySelectorAll('.section');

        regions.forEach(region => {
            region.addEventListener('click', function() {
                sections.forEach(section => section.style.display = 'none');
                document.getElementById(`section-${region.id}`).style.display = 'block';
                window.scrollTo({ top: document.getElementById(`section-${region.id}`).offsetTop, behavior: 'smooth' });
            });
        });