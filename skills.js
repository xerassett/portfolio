window.addEventListener('load', () => {    
    const skillsSection = document.querySelector('.skills');
    const quadrants = {
        topLeft: document.querySelector('.top-left'),
        topRight: document.querySelector('.top-right'),
        bottomLeft: document.querySelector('.bottom-left'),
        bottomRight: document.querySelector('.bottom-right')
    };
    
    if (!skillsSection) {
        return;
    }
    
    let lastScrollY = window.scrollY;
    
    function updateSkillsVisibility() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY !== lastScrollY) {
            lastScrollY = currentScrollY;
        }
        
        const skillsRect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = skillsSection.offsetHeight;
        
        const scrolledInSection = Math.max(0, -skillsRect.top);
        
        // Pourcentage de scroll (0 à 100)
        const maxScroll = sectionHeight - windowHeight;
        let scrollPercent = 0;
        
        if (scrolledInSection > 0 && maxScroll > 0) {
            scrollPercent = (scrolledInSection / maxScroll) * 100;
            scrollPercent = Math.max(0, Math.min(100, scrollPercent));
        }
        
        if (scrollPercent > 0) {
            console.log('Scroll %:', scrollPercent.toFixed(1));
        }
        
        // Mise à jour d'affichage 
        updateQuadrant(quadrants.topLeft, scrollPercent, 0, 25);
        updateQuadrant(quadrants.topRight, scrollPercent, 25, 50);
        updateQuadrant(quadrants.bottomLeft, scrollPercent, 50, 75);
        updateQuadrant(quadrants.bottomRight, scrollPercent, 75, 100);
        
        requestAnimationFrame(updateSkillsVisibility);
    }
    
    function updateQuadrant(element, scrollPercent, startPercent, endPercent) {
        if (!element) return;
        
        if (scrollPercent < startPercent) {
            // Pas encore visible
            element.style.opacity = '0';
            element.style.transform = 'scale(0.9)';
        } else if (scrollPercent >= startPercent && scrollPercent < endPercent) {
            // En cours de visibilité
            const progress = (scrollPercent - startPercent) / (endPercent - startPercent);
            const opacity = Math.min(progress * 1.5, 1);
            const scale = 0.9 + (progress * 0.1);
            
            element.style.opacity = opacity.toString();
            element.style.transform = `scale(${scale})`;
        } else {
            // Complètement visible
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(updateSkillsVisibility);
});

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease-out";
    projectObserver.observe(card);
});