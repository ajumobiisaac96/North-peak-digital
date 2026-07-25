(function () {
  "use strict";

  // ---- Footer year ----
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      mobileNav.hidden = isOpen;
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        mobileNav.hidden = true;
      });
    });
  }

  // ---- Contact form validation ----
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(field, message) {
    var errorEl = document.getElementById(field.name + "-error") ||
      document.getElementById(field.getAttribute("id") + "-error");
    var wrapper = field.closest(".form-field") || field.closest("fieldset");
    if (wrapper) wrapper.classList.toggle("invalid", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function validateForm() {
    var valid = true;

    var firstName = form.querySelector("#firstName");
    var lastName = form.querySelector("#lastName");
    var email = form.querySelector("#email");
    var message = form.querySelector("#message");
    var projectType = form.querySelector('input[name="projectType"]:checked');

    if (!firstName.value.trim()) {
      setError(firstName, "First name is required.");
      valid = false;
    } else {
      setError(firstName, "");
    }

    if (!lastName.value.trim()) {
      setError(lastName, "Last name is required.");
      valid = false;
    } else {
      setError(lastName, "");
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      setError(email, "Email address is required.");
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      setError(email, "Enter a valid email address.");
      valid = false;
    } else {
      setError(email, "");
    }

    var typeError = document.getElementById("projectType-error");
    var typeWrapper = form.querySelector('input[name="projectType"]').closest("fieldset");
    if (!projectType) {
      if (typeError) typeError.textContent = "Pick what you're interested in.";
      if (typeWrapper) typeWrapper.classList.add("invalid");
      valid = false;
    } else {
      if (typeError) typeError.textContent = "";
      if (typeWrapper) typeWrapper.classList.remove("invalid");
    }

    if (!message.value.trim()) {
      setError(message, "Tell us a little about the project.");
      valid = false;
    } else if (message.value.trim().length < 10) {
      setError(message, "A few more details would help (10+ characters).");
      valid = false;
    } else {
      setError(message, "");
    }

    return valid;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status error";
        var firstInvalid = form.querySelector(".invalid input, .invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = "Thanks — we've got it. We'll reply within one business day.";
      status.className = "form-status success";
      form.reset();
    });

    // Clear individual field errors as the user fixes them
    form.querySelectorAll("input, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        var wrapper = field.closest(".form-field") || field.closest("fieldset");
        if (wrapper && wrapper.classList.contains("invalid")) {
          validateForm();
        }
      });
    });
  }
})();
