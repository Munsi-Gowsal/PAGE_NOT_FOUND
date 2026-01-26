document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const popup = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeBtn");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("fullName").value;
      const venueSelect = document.getElementById("restaurant");
      const venueName = venueSelect.options[venueSelect.selectedIndex].text;

      document.getElementById("displayUserName").innerText = name;

      const venueDisplay = document.getElementById("displayVenueName");
      if (venueDisplay) venueDisplay.innerText = ⁠ at ${venueName} ⁠;

      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Checking Availability...";
      submitBtn.disabled = true;

      setTimeout(() => {
        popup.style.display = "flex";

        form.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
});
