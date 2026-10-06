/**
 * PRESENCIA Y COBERTURA DIGITAL - SCRIPT INTERACTIVO
 * Funcionalidades:
 * - Menú hamburguesa responsive y navegación móvil
 * - Header sticky inteligente y botón volver arriba
 * - Resaltado de enlaces según la sección activa (ScrollSpy)
 * - Selección interactiva de planes y servicios hacia el formulario
 * - Generador y envío de solicitud directa a WhatsApp
 * - Validación en tiempo real del formulario y modal de confirmación
 * - Acordeón interactivo de Preguntas Frecuentes (FAQ)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración de contacto
  const NUMERO_WHATSAPP = '525512345678'; // Reemplazar con el número oficial de la agencia

  // Elementos DOM
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const btnEnviarWhatsApp = document.getElementById('btnEnviarWhatsApp');
  const servicioSelect = document.getElementById('servicioSelect');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalMessage = document.getElementById('modalMessage');
  const faqItems = document.querySelectorAll('.faq-item');

  /* ==========================================================================
     1. MENÚ RESPONSIVE MÓVIL
     ========================================================================== */
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Cerrar menú al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     2. HEADER SCROLL & BOTÓN VOLVER ARRIBA
     ========================================================================== */
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header fondo sólido al scroll
    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Botón volver arriba
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3. SCROLLSPY (ENLACE ACTIVO SEGÚN SECCIÓN VISIBLE)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(currentSection => {
      const sectionHeight = currentSection.offsetHeight;
      const sectionTop = currentSection.offsetTop;
      const sectionId = currentSection.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink, { passive: true });

  /* ==========================================================================
     4. PRE-SELECCIÓN DE PLANES Y SERVICIOS
     ========================================================================== */
  window.seleccionarPlan = (nombrePlan) => {
    if (servicioSelect) {
      // Buscar si el valor coincide directamente o añadirlo
      let optionFound = false;
      for (let i = 0; i < servicioSelect.options.length; i++) {
        if (servicioSelect.options[i].text.includes(nombrePlan) || servicioSelect.options[i].value.includes(nombrePlan)) {
          servicioSelect.selectedIndex = i;
          optionFound = true;
          break;
        }
      }

      if (!optionFound) {
        const newOption = new Option(nombrePlan, nombrePlan, true, true);
        servicioSelect.add(newOption);
      }

      limpiarError(servicioSelect);
    }

    // Scroll suave hacia el formulario y enfocar campo de nombre
    const solicitarSection = document.getElementById('solicitar');
    if (solicitarSection) {
      solicitarSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const inputNombre = document.getElementById('nombre');
        if (inputNombre) inputNombre.focus();
      }, 600);
    }
  };

  window.seleccionarServicio = (nombreServicio) => {
    if (servicioSelect) {
      let optionFound = false;
      for (let i = 0; i < servicioSelect.options.length; i++) {
        if (servicioSelect.options[i].text.includes(nombreServicio) || servicioSelect.options[i].value.includes(nombreServicio)) {
          servicioSelect.selectedIndex = i;
          optionFound = true;
          break;
        }
      }

      if (!optionFound) {
        const newOption = new Option(nombreServicio, nombreServicio, true, true);
        servicioSelect.add(newOption);
      }

      limpiarError(servicioSelect);
    }

    const solicitarSection = document.getElementById('solicitar');
    if (solicitarSection) {
      solicitarSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const inputNombre = document.getElementById('nombre');
        if (inputNombre) inputNombre.focus();
      }, 600);
    }
  };

  /* ==========================================================================
     5. VALIDACIÓN DEL FORMULARIO Y HELPERS
     ========================================================================== */
  const mostrarError = (input, mensaje) => {
    input.classList.add('is-invalid');
    const errorSmall = document.getElementById(`${input.id}Error`);
    if (errorSmall) {
      errorSmall.textContent = mensaje;
    }
  };

  const limpiarError = (input) => {
    input.classList.remove('is-invalid');
    const errorSmall = document.getElementById(`${input.id}Error`);
    if (errorSmall) {
      errorSmall.textContent = '';
    }
  };

  // Validación de email estándar
  const esEmailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validar campos en vivo cuando el usuario escribe
  const camposObligatorios = ['nombre', 'telefono', 'correo', 'servicioSelect'];
  camposObligatorios.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => limpiarError(el));
      el.addEventListener('change', () => limpiarError(el));
    }
  });

  const validarFormulario = () => {
    let esValido = true;

    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const correo = document.getElementById('correo');
    const servicio = document.getElementById('servicioSelect');

    if (!nombre.value.trim()) {
      mostrarError(nombre, 'Por favor, ingresa tu nombre completo.');
      esValido = false;
    } else {
      limpiarError(nombre);
    }

    if (!telefono.value.trim() || telefono.value.trim().length < 8) {
      mostrarError(telefono, 'Ingresa un número telefónico o WhatsApp válido.');
      esValido = false;
    } else {
      limpiarError(telefono);
    }

    if (!correo.value.trim() || !esEmailValido(correo.value.trim())) {
      mostrarError(correo, 'Ingresa un correo electrónico válido.');
      esValido = false;
    } else {
      limpiarError(correo);
    }

    if (!servicio.value) {
      mostrarError(servicio, 'Selecciona el servicio o plan que te interesa.');
      esValido = false;
    } else {
      limpiarError(servicio);
    }

    return esValido;
  };

  /* ==========================================================================
     6. ENVÍO A WHATSAPP
     ========================================================================== */
  if (btnEnviarWhatsApp) {
    btnEnviarWhatsApp.addEventListener('click', () => {
      if (!validarFormulario()) {
        return;
      }

      const nombre = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const empresa = document.getElementById('empresa').value.trim() || 'No especificada';
      const correo = document.getElementById('correo').value.trim();
      const servicio = document.getElementById('servicioSelect').value;
      const mensaje = document.getElementById('mensaje').value.trim() || 'Deseo recibir una cotización detallada.';

      // Estructura del mensaje de WhatsApp con formato profesional
      const textoWhatsApp = 
`🚀 *NUEVA SOLICITUD DE COTIZACIÓN*
*Presencia y Cobertura Digital*

👤 *Cliente:* ${nombre}
🏢 *Negocio/Marca:* ${empresa}
📱 *Teléfono:* ${telefono}
✉️ *Correo:* ${correo}
🎯 *Servicio/Plan de Interés:* ${servicio}

📝 *Detalles del Proyecto:*
${mensaje}

_Enviado desde el sitio web oficial._`;

      const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoWhatsApp)}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(urlWhatsApp, '_blank');

      // Mostrar confirmación
      if (modalMessage) {
        modalMessage.innerHTML = `¡Perfecto, <strong>${nombre}</strong>! Tu solicitud se ha transferido a WhatsApp. Uno de nuestros asesores te responderá enseguida.`;
      }
      abrirModal();
      contactForm.reset();
    });
  }

  /* ==========================================================================
     7. ENVÍO POR FORMULARIO WEB
     ========================================================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validarFormulario()) {
        return;
      }

      const nombre = document.getElementById('nombre').value.trim();
      const servicio = document.getElementById('servicioSelect').value;

      // Simulación de envío exitoso
      if (modalMessage) {
        modalMessage.innerHTML = `¡Gracias, <strong>${nombre}</strong>! Hemos recibido tu solicitud para <strong>${servicio}</strong>. Te enviaremos la cotización detallada a tu correo y te contactaremos por WhatsApp.`;
      }
      abrirModal();
      contactForm.reset();
    });
  }

  /* ==========================================================================
     8. CONTROL DEL MODAL
     ========================================================================== */
  const abrirModal = () => {
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const cerrarModal = () => {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', cerrarModal);
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        cerrarModal();
      }
    });
  }

  /* ==========================================================================
     9. PREGUNTAS FRECUENTES (FAQ ACORDEÓN)
     ========================================================================== */
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Cerrar los demás acordeones para mejor experiencia
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Alternar el actual
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // Log inicial en consola para confirmación de carga
  console.log('✅ Sitio web de Presencia y Cobertura Digital cargado correctamente.');
});
