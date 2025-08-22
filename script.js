// =====================
// Multi-step Form Logic
// =====================
const form = document.getElementById("multiStepForm");
const formSteps = document.querySelectorAll(".form-step");
const prevBtns = document.querySelectorAll(".prev-btn");
const nextBtns = document.querySelectorAll(".next-btn");
let currentStep = 0;

function showStep(step) {
  formSteps.forEach((fs, index) => {
    fs.classList.remove("active");
    if (index === step) fs.classList.add("active");
  });
}

function validateStep(step) {
  const inputs = formSteps[step].querySelectorAll("input[required]");
  let valid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.border = "1px solid red";
      valid = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });
  return valid;
}

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      currentStep++;
      if (currentStep >= formSteps.length) {
        form.submit();
      } else {
        showStep(currentStep);
      }
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});

// Initialize first step
showStep(currentStep);

// =====================
// Navbar Toggle (Mobile)
// =====================
const navbar = document.querySelector(".nav-links");
const burger = document.createElement("div");
burger.classList.add("burger");
burger.innerHTML = "&#9776;";
document.querySelector(".navbar").appendChild(burger);

burger.style.cursor = "pointer";
burger.style.fontSize = "1.5rem";

burger.addEventListener("click", () => {
  navbar.style.display = navbar.style.display === "flex" ? "none" : "flex";
});
