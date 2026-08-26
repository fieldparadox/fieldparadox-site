(function () {
  "use strict";

  var overlay = document.getElementById("modal-overlay");
  var modalBody = document.getElementById("modal-body");
  var closeBtn = document.getElementById("modal-close");
  var lastFocused = null;

  function openModal(sourceId) {
    var source = document.getElementById(sourceId);
    if (!source) return;

    var heading = source.getAttribute("data-heading") || "";
    modalBody.innerHTML = "<h2>" + heading + "</h2>" + source.innerHTML;

    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    overlay.hidden = true;
    modalBody.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  document.querySelectorAll(".note").forEach(function (note) {
    note.addEventListener("click", function () {
      openModal(note.getAttribute("data-target"));
    });
  });

  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  var form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = document.getElementById("field-name").value.trim();
      var email = document.getElementById("field-email").value.trim();
      var help = document.getElementById("field-help").value.trim();

      var subject = "Taking part — " + name;
      var bodyLines = [
        "Name: " + name,
        "Email: " + email,
        "",
        "What I can help with:",
        help || "(not specified)"
      ];

      var mailto =
        "mailto:fieldparadox@icloud.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }
})();
