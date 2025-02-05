document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".circle");
  const title = document.querySelector(".title");
  const description = document.querySelector(".description");
  const historicImages = document.querySelectorAll(".historic-image");
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section, .header-container"); 

  const content = {
    "1870-1891": {
      title: "Première<br />carte postale officielle",
      description:
        "La première carte postale est imaginée en 1870 par Léon Besnardeau (1829-1914)<br />libraire-papetier à Sillé le Guillaume. Il invente cette carte pour faciliter la correspondance <br />des 60.000 soldats Bretons du camp militaire de Conlie, tout proche. Puis une deuxième <br />carte plus universelle est éditée, pour les armées de terre et de mer.",
      images: [
        // "./images/C1.1.WEBP",
        // "./images/C1.3.jpg",
        // "./images/C1.WEBP",
        "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749641/media/images/gdxlxdnjzjj65o9bbuaa.webp",
      ],
    },
    "1891-1900": {
      title: "Les Precuseurs",
      description:
        "En 1899 apparaissent les premières cartes témoignages des grands évènements <br /> de l'époque (Affaire Dreyfus, Procès Hugo...) . Photographiques et/ou illustrées. <br /> Un an plus tard, L'Exposition Universelle de Paris viendra confirmer ce nouveau genre.",
      images: [
        // "./images/C2.3.WEBP",
        // "./images/C2.1.WEBP",
        // "./images/C2.2.WEBP",
        "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749749/media/images/s61ahxw0bvmmasywhsmo.webp",
      ],
    },
    "1911-1930": {
      title: "L'age d'or",
      description: "La carte comporte une place importante pour l'écriture. L'image n'a pas de bords bien définis.<br /> On la qualifie souvent de carte 'nuage'. Le document est de bonne qualité photographique; <br /> le procédé de fabrication a pour nom 'phototypie'.",
      images: [
        // "./images/C3.WEBP",
        "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749650/media/images/d7cnp4rlyzdt2vh9wywb.jpg",
        // "./images/C3.2.WEBP",
        // "./images/C3.4.WEBP",
      ],
    },
    "1918-1975": {
      title: "La Carte Postale <br/> Semi-Moderne",
      description: "Alors que les éditeurs ont produit 800 Millions (!!!) de CPA pour la seule année 1914, la CPA <br /> entre après guerre en désaffection. Les moyens de communication (Automobile, train, téléphone...),<br /> la photographie amateur sont en plein essor et le mode de vie a évolué. La CPA est devenue un objet<br /> de collection.",
      images: [
        // "./images/C4.5.WEBP",
        // "./images/C4.3.WEBP",
        "https://res.cloudinary.com/da9k32mdb/image/upload/v1738749635/media/images/vz1slplcyexdnwsn0xxu.webp",
        // "./images/C4.2.WEBP",
      ],
    },
  };
  // Crée un observateur pour chaque section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Identifier la section visible
            const sectionClass = entry.target.classList;
  
            // Modifier la classe de la navbar en fonction de la section visible
            if (sectionClass.contains("header-container")) {
              navbar.className = "navbar bg-light"; // Transparent
            } else if (sectionClass.contains("intro-section")) {
              navbar.className = "navbar bg-dark"; // Couleur sombre
            } else if (sectionClass.contains("second-section")) {
              navbar.className = "navbar bg-dark"; // Couleur sombre
            } else if (sectionClass.contains("third-section")) {
              navbar.className = "navbar bg-dark"; // Couleur sombre
            } else if (sectionClass.contains("poilus-gallerie")) {
              navbar.className = "navbar bg-dark"; // Couleur sombre
            }
          }
        });
      },
      { threshold: 0.3 }
    );
  
    // Appliquer l'observateur à toutes les sections et au header-container
    sections.forEach((section) => observer.observe(section));
  

  circles.forEach((circle) => {
    circle.addEventListener("click", function () {
      const year = this.getAttribute("data-year");
      title.innerHTML = content[year].title;
      description.innerHTML = content[year].description;
      historicImages.forEach((img, index) => {
        img.src = content[year].images[index];
      });

      circles.forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Déclencher un clic sur le premier cercle pour afficher le contenu par défaut
  circles[0].click();
});

document.addEventListener("DOMContentLoaded", function () {
  const svgMap = document.querySelector(".svg-map");

  svgMap.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "path") {
      // Supprime les points existants
      const existingDots = document.querySelectorAll(".dot");
      existingDots.forEach((dot) => dot.remove());

      // Crée un nouveau point
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      const rect = svgMap.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", 5);
      dot.setAttribute("class", "dot");

      // Ajoute le point au SVG
      svgMap.appendChild(dot);
    }
  });
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const message = document.getElementById("message").value.trim();

  if (message.length === 0) {
    alert("Veuillez écrire un message avant de soumettre.");
    return;
  }

  document.getElementById("postcardForm").classList.add("hidden");
  document.getElementById("submittedMessage").classList.remove("hidden");
});

document.getElementById("postcardForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value.trim();
  if (!message) {
    alert("Veuillez écrire un message avant de soumettre !");
    return;
  }

  alert("Votre carte postale a été envoyée avec succès !");
});

function scrollToParticiper() {
  const participerSection = document.getElementById("participer");
  participerSection.scrollIntoView({ behavior: "smooth" });
}