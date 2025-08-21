document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const stepIndicators = document.querySelectorAll(".step");

  let currentStep = 0;

  function updateStep(direction) {
    steps[currentStep].classList.remove("active");
    stepIndicators[currentStep].classList.remove("active");

    currentStep += direction;

    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;

    steps[currentStep].classList.add("active");
    stepIndicators[currentStep].classList.add("active");
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => updateStep(1));
  });

  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => updateStep(-1));
  });

  // Submit handler
  const form = document.getElementById("multi-step-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("🎉 Form submitted successfully!");
  });
});
