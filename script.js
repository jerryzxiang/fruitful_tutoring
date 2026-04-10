const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    return section ? { link, section } : null;
  })
  .filter(Boolean);

const revealElements = document.querySelectorAll(".reveal");
const form = document.querySelector("[data-demo-form]");
const status = document.querySelector("[data-form-status]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const current = sections.find((item) => item.section === entry.target);
        if (!current || !entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => link.classList.remove("is-active"));
        current.link.classList.add("is-active");
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach(({ section }) => navObserver.observe(section));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (form && status) {
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  const resetValidity = (field) => {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => resetValidity(field));
    field.addEventListener("change", () => resetValidity(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    status.textContent = "";
    status.classList.remove("is-error", "is-success");

    const invalidFields = fields.filter((field) => !field.checkValidity());

    invalidFields.forEach((field) => {
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
    });

    if (invalidFields.length > 0) {
      status.textContent = "Please complete the required fields before sending the demo inquiry.";
      status.classList.add("is-error");
      invalidFields[0].focus();
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("parentName");

    status.textContent = `Thanks${name ? `, ${name}` : ""}. This demo inquiry is ready for a future email connection.`;
    status.classList.add("is-success");

    form.reset();
  });
}
