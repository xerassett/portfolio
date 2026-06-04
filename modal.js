document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("myModal");
    const cards = document.querySelectorAll(".project-card");
    const closeBtn = document.querySelector(".close");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const details = card.querySelector("ul").innerHTML;
            
            const template = card.querySelector(".project-description");
            const fullDesc = template ? template.innerHTML : `<p>${card.querySelector("p").innerText}</p>`;
            
            const videoData = card.getAttribute("data-video");
            const imgSrc = card.querySelector("img").src;

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalInfo").innerHTML = `<ul>${details}</ul>`;
            document.getElementById("modalFullDescription").innerHTML = fullDesc;

            const mediaContainer = document.getElementById("modalMedia");
            mediaContainer.innerHTML = "";

            if (videoData) {
                const sources = videoData.split(',').map(src => src.trim());
                sources.forEach(src => {
                    if (src.toLowerCase().endsWith('.gif')) {
                        mediaContainer.innerHTML += `<img src="${src}" alt="Démonstration">`;
                    } else {
                        mediaContainer.innerHTML += `
                            <video controls autoplay muted loop>
                                <source src="${src}" type="video/webm">
                            </video>`;
                    }
                });
            } else {
                mediaContainer.innerHTML = `<img src="${imgSrc}" alt="${title}">`;
            }

            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });
    });

    const closeModal = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    closeBtn.onclick = closeModal;
    window.onclick = (event) => { if (event.target == modal) closeModal(); };
});