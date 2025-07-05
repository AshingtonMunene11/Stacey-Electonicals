fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(data => {
    const track = document.querySelector(".carousel-track");

    data.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "carousel-card";
      if (index === 1) card.classList.add("active");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      `;

      track.appendChild(card);
    });

    // Auto-rotate cards
    let currentIndex = 1;
    setInterval(() => {
      const cards = document.querySelectorAll(".carousel-card");
      cards.forEach(c => c.classList.remove("active"));

      currentIndex = (currentIndex + 1) % cards.length;
      cards[currentIndex].classList.add("active");

      const offset = -cards[0].offsetWidth * (currentIndex - 1);
      document.querySelector(".carousel-track").style.transform = `translateX(${offset}px)`;
    }, 4000);
  })
  .catch(error => console.error("Failed to fetch products:", error));
