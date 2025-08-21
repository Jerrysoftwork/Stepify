const form = document.getElementById("multiStepForm");
const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const summary = document.getElementById("summary");

let currentStep = 0;

function showStep(step) {
  steps.forEach((s, i) => {
    s.classList.toggle("active", i === step);
  });
  prevBtn.style.display = step === 0 ? "none" : "inline-block";
  nextBtn.textContent = step === steps.length - 1 ? "Confirm" : "Next";
}

function validateStep(step) {
  const inputs = steps[step].querySelectorAll("input[required]");
  let valid = true;

  inputs.forEach(input => {
    const errorMsg = input.nextElementSibling;
    if (!input.checkValidity()) {
      errorMsg.textContent = "This field is required";
      valid = false;
    } else {
      errorMsg.textContent = "";
    }

    // Extra email validation
    if (input.type === "email" && input.value !== "") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(input.value)) {
        errorMsg.textContent = "Enter a valid email";
        valid = false;
      }
    }
  });

  return valid;
}

nextBtn.addEventListener("click", () => {
  if (!validateStep(currentStep)) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    if (currentStep === steps.length - 1) {
      buildSummary();
    }
    showStep(currentStep);
  } else {
    alert("🎉 Form Submitted Successfully!");
    form.reset();
    currentStep = 0;
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

function buildSummary() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const plan = form.querySelector("input[name='plan']:checked")?.value || "None";
  const addons = [...form.querySelectorAll("input[name='addon']:checked")].map(a => a.value);

  summary.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Plan:</strong> ${plan}</p>
    <p><strong>Add-ons:</strong> ${addons.join(", ") || "None"}</p>
  `;
}

// Init
showStep(currentStep);
