// ===== HELPER FUNCTIONS =====
function showError(element, message) {
    element.textContent = message;
}

function clearError(element) {
    element.textContent = "";
}

// ===== 1. SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== 2. BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 3. LIGHTBOX (Image popup) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");


function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-img, .card img").forEach(function (img) {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
        openLightbox(img);
    });
});

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close with Escape key (accessibility)
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById("contactForm");

if (form) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const idInput = document.getElementById("id");
    const nextOfKinInput = document.getElementById("nextOfKin");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const idError = document.getElementById("idError");
    const nextOfKinError = document.getElementById("nextOfKinError");
    const formSuccess = document.getElementById("formSuccess");

    function showError(element, message) {
        element.textContent = message;
    }

    function clearError(element) {
        element.textContent = "";
    }

    // Function to make a field red
    function makeRed(input) {
        input.classList.remove("success-input");
        input.classList.add("error-input");
    }

    // Function to make a field normal / green
    function makeNormal(input) {
        input.classList.remove("error-input");
        input.classList.add("success-input");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Clear previous messages and styles
        clearError(nameError);
        clearError(emailError);
        clearError(idError);
        clearError(nextOfKinError);
        clearError(messageError);
        formSuccess.hidden = true;

        nameInput.classList.remove("error-input", "success-input");
        emailInput.classList.remove("error-input", "success-input");
        idInput.classList.remove("error-input", "success-input");
        nextOfKinInput.classList.remove("error-input", "success-input");
        messageInput.classList.remove("error-input", "success-input");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const id = idInput.value.trim();
        const nextOfKin = nextOfKinInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        // ===== NAME =====
        if (name === "") {
            showError(nameError, "Please enter your full name");
            makeRed(nameInput);
            isValid = false;
        } else if (name.length < 3) {
            showError(nameError, "Name must have at least 3 characters");
            makeRed(nameInput);
            isValid = false;
        } else {
            makeNormal(nameInput);
        }


        // ===== EMAIL =====
        if (email === "") {
            showError(emailError, "Please enter your email address");
            makeRed(emailInput);
            isValid = false;
        } else if (!emailInput.checkValidity()) {
            showError(emailError, "Enter a valid email address");
            makeRed(emailInput);
            isValid = false;
        } else {
            idInput.classList.remove("error-input", "success-input");
            makeNormal(emailInput);
        }

        // ===== ID =====
        if (id === "") {
            showError(idError, "Please enter your ID number");
            makeRed(idInput);
            isValid = false;
        } else {
            makeNormal(idInput);
        }

        // ===== NEXT OF KIN =====
        if (nextOfKin === "") {
            showError(nextOfKinError, "Please enter your next of kin");
            makeRed(nextOfKinInput);
            isValid = false;
        } else {
            makeNormal(nextOfKinInput);
        }   

        // ===== MESSAGE =====
        if (message === "") {
            showError(messageError, "Please write a message");
            makeRed(messageInput);
            isValid = false;
        } else if (message.length < 10) {
            showError(messageError, "Message must be at least 10 characters");
            makeRed(messageInput);
            isValid = false;
        } else {
            makeNormal(messageInput);
        }

        // ===== FINAL RESULT =====
        if (isValid === false) {
            formSuccess.hidden = false;
            formSuccess.style.color = "#e53e3e";
            formSuccess.textContent = "You entered wrong details. Please try again.";
        } else {
            formSuccess.hidden = false;
            formSuccess.style.color = "#38a169";
            formSuccess.textContent = "Thank you! Your message has been sent successfully.";
            form.reset();

            // Remove green borders after successful submit
            nameInput.classList.remove("success-input");
            emailInput.classList.remove("success-input");
            idInput.classList.remove("success-input");
            nextOfKinInput.classList.remove("success-input");
            messageInput.classList.remove("success-input");

        }
    });
}