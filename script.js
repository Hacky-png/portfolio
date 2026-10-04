/* =========================================================
   Adarsh — Portfolio interactions
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Mobile navigation ---------- */

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  const navLinks = Array.from(
    document.querySelectorAll(".nav-link")
  );


  function closeMenu() {

    navMenu.classList.remove("open");

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navToggle.innerHTML =
      '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }


  navToggle.addEventListener("click", function () {

    const isOpen =
      navMenu.classList.toggle("open");

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.innerHTML = isOpen

      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'

      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  });


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* ---------- Smooth scrolling ---------- */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {

      anchor.addEventListener(
        "click",
        function (event) {

          const href =
            anchor.getAttribute("href");

          if (!href || href === "#") {
            return;
          }

          const target =
            document.querySelector(href);

          if (!target) {
            return;
          }

          event.preventDefault();

          const top =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            80;

          window.scrollTo({
            top: top,
            behavior: "smooth"
          });

        }
      );

    });


  /* ---------- Navbar shadow + back to top ---------- */

  const navbar =
    document.getElementById("navbar");

  const toTop =
    document.getElementById("toTop");

  const sections =
    Array.from(
      document.querySelectorAll(
        "main section[id]"
      )
    );


  function onScroll() {

    const y =
      window.pageYOffset;


    /* Navbar */

    navbar.classList.toggle(
      "scrolled",
      y > 10
    );


    /* Back to top */

    toTop.classList.toggle(
      "show",
      y > 400
    );


    /* Active navigation */

    let currentId =
      sections.length
        ? sections[0].id
        : "";


    sections.forEach(
      function (section) {

        if (
          y >=
          section.offsetTop - 120
        ) {

          currentId =
            section.id;

        }

      }
    );


    navLinks.forEach(
      function (link) {

        link.classList.toggle(
          "active",
          link.getAttribute("href") ===
            "#" + currentId
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );


  onScroll();


  /* ---------- Back to top ---------- */

  toTop.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* ---------- Scroll reveal animations ---------- */

  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }

      );


    revealItems.forEach(
      function (item) {

        observer.observe(item);

      }
    );

  } else {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "visible"
        );

      }
    );

  }


  /* ---------- Contact form validation ---------- */

  const form =
    document.getElementById(
      "contactForm"
    );

  const status =
    document.getElementById(
      "formStatus"
    );


  function setError(
    input,
    errorEl,
    message
  ) {

    errorEl.textContent =
      message;

    input.classList.toggle(
      "invalid",
      Boolean(message)
    );

    return !message;

  }


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      status.textContent = "";


      const name =
        document.getElementById(
          "name"
        );

      const email =
        document.getElementById(
          "email"
        );

      const message =
        document.getElementById(
          "message"
        );


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


      const nameOk =
        setError(
          name,
          document.getElementById(
            "nameError"
          ),
          name.value.trim().length < 2
            ? "Please enter your name."
            : ""
        );


      const emailOk =
        setError(
          email,
          document.getElementById(
            "emailError"
          ),
          emailPattern.test(
            email.value.trim()
          )
            ? ""
            : "Please enter a valid email address."
        );


      const messageOk =
        setError(
          message,
          document.getElementById(
            "messageError"
          ),
          message.value.trim().length < 10
            ? "Message should be at least 10 characters."
            : ""
        );


      if (
        nameOk &&
        emailOk &&
        messageOk
      ) {

        /*
          Add your WhatsApp number here.

          Example:

          const whatsappNumber =
            "919876543210";

        */

        const whatsappNumber =
          "";


        if (whatsappNumber) {

          const whatsappMessage =
            `Name: ${name.value.trim()}
Email: ${email.value.trim()}
Message: ${message.value.trim()}`;


          const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`;


          window.location.href =
            whatsappUrl;

        } else {

          status.textContent =
            "Message validated successfully. Add your WhatsApp number in index.js to enable WhatsApp submission.";

        }

      } else {

        status.textContent =
          "Please fix the highlighted fields.";

      }

    }
  );


  /* ---------- Dynamic footer year ---------- */

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      String(
        new Date().getFullYear()
      );

  }

});