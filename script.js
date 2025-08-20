let currentStep = 0; 
showStep(currentStep);

function showStep(n) {
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".step");

  // Hide all steps
  steps.forEach(step => step.classList.remove("active"));
  indicators.forEach(ind => ind.classList.remove("active"));

  // Show current step
  steps[n].classList.add("active");
  indicators[n].classList.add("active");

  // Hide prev button on first step
  document.getElementById("prevBtn").style.display = (n === 0) ? "none" : "inline-block";

  // Change next button text to "Submit" on last step
  if (n === steps.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
}

function nextPrev(n) {
  const steps = document.querySelectorAll(".form-step");

  // If on last step and user clicks submit
  if (currentStep === steps.length - 1 && n === 1) {
    document.querySelector("form").submit();
    return;
  }

  // Hide current step
  steps[currentStep].classList.remove("active");

  // Change step
  currentStep += n;

  // Show new step
  showStep(currentStep);
}
