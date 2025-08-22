// Show form section when clicking button
function goToForm() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("gallery").classList.add("hidden");
  document.getElementById("faqs").classList.add("hidden");
  document.getElementById("contact").classList.add("hidden");
  document.getElementById("form-section").classList.remove("hidden");
}

// Multi-step form logic
const form = document.getElementById("multiStepForm");
const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");

let currentStep = 0;

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep++;
    steps[currentStep].classList.add("active");
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    steps[currentStep].classList.remove("active");
    currentStep--;
    steps[currentStep].classList.add("active");
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  alert("Form submitted successfully!");
  window.location.href = "thankyou.html"; // Redirect after submit
});
