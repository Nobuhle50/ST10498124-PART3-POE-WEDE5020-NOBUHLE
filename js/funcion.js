// ===== ONCLICK: Smooth scroll to section =====
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// ===== ONCLICK: Play / Pause video =====
function toggleVideo() {
    const video = document.getElementById("heroVideo");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// ===== ACCORDION (Interactive Element) =====
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
    btn.classList.toggle("active");
}
// Close other open items
    allContents.forEach(function (item) {
        if (item !== content) {
            item.style.maxHeight = null;
            item.previousElementSibling.classList.remove("active");
        }
    });

    // Toggle current item
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        button.classList.remove("active");
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        button.classList.add("active");
    }

    window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// ===== SEARCH FUNCTION =====
function searchContent() {
    const input = document.getElementById("searchInput");
    if (!input) return;   // safety check

    const filter = input.value.toLowerCase().trim();

    // Search in these elements (you can add more)
    const items = document.querySelectorAll(".event-card, .card, .sponsor-card, section p, section li, h2, h3");

    let found = false;

    items.forEach(function (item) {
        const text = item.textContent.toLowerCase();

        if (filter === "" || text.includes(filter)) {
            item.style.display = "";          // show
            if (filter !== "" && text.includes(filter)) {
                found = true;
            }
        } else {
            item.style.display = "none";      // hide
        }
    });

    // Optional: show a message when nothing is found
    let noResults = document.getElementById("noResults");
    if (!noResults) {
        noResults = document.createElement("p");
        noResults.id = "noResults";
        noResults.style.color = "#e53e3e";
        noResults.style.marginTop = "1rem";
        noResults.textContent = "No results found. Please try another word.";
        document.querySelector("main")?.appendChild(noResults) || document.body.appendChild(noResults);
    }

    if (filter !== "" && found === false) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

function showDateTime() {
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const formatted = now.toLocaleString('en-ZA', options);
    
    document.getElementById('dateTime').innerHTML = 
        "📅 " + formatted;
}