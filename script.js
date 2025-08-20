document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('multiStepForm');
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const indicators = Array.from(document.querySelectorAll('.step'));

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentStep = 0;

  function showStep(n) {
    // clamp to bounds
    currentStep = Math.max(0, Math.min(n, steps.length - 1));

    // toggle step visibility
    steps.forEach((el, i) => el.classList.toggle('active', i === currentStep));
    // toggle indicator active state
    indicators.forEach((el, i) => el.classList.toggle('active', i === currentStep));

    // prev visibility
    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-block';
    // next text
    nextBtn.textContent = currentStep === steps.length - 1 ? 'Submit' : 'Next';
  }

  function go(delta) {
    const target = currentStep + delta;

    // if we're on the last step and user clicks "Submit"
    if (currentStep === steps.length - 1 && delta > 0) {
      // trigger normal form submit (so HTML5 validation can run if you add it)
      form.requestSubmit();
      return;
    }

    showStep(target);
  }

  // Wire up buttons
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault(); // keep SPA behavior
    go(1);
  });

  // Example submit handler (replace with your logic)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✅ Submitted! (Hook this to your real submit logic)');
  });

  // initial render
  showStep(0);
});
