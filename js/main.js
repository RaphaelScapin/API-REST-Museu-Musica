const TOUR_EMBED_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".site-navbar");
  const yearSlots = document.querySelectorAll("[data-current-year]");

  yearSlots.forEach((slot) => {
    slot.textContent = String(new Date().getFullYear());
  });

  if (navbar) {
    const updateNavbar = () => navbar.classList.toggle("is-scrolled", window.scrollY > 12);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
  }

  const navigationMenu = document.getElementById("menuPrincipal");
  const navigationToggle = document.querySelector(".navbar-toggler");
  if (navigationMenu && navigationToggle) {
    navigationMenu.addEventListener("shown.bs.collapse", () => {
      navigationToggle.setAttribute("aria-label", "Fechar menu");
    });
    navigationMenu.addEventListener("hidden.bs.collapse", () => {
      navigationToggle.setAttribute("aria-label", "Abrir menu");
    });
  }

  const stage = document.getElementById("tourStage");
  if (!stage) return;

  const options = Array.from(document.querySelectorAll(".room-option"));
  const preview = document.getElementById("tourPlaceholder");
  const embedContainer = document.getElementById("tourEmbed");
  const loadingIndicator = document.getElementById("embedLoading");
  const image = document.getElementById("ambienteImagem");
  const stageRoomName = document.getElementById("stageRoomName");
  const descriptionTitle = document.getElementById("descricaoTitulo");
  const descriptionText = document.getElementById("descricaoTexto");
  const startButton = document.getElementById("iniciarTour");
  const stageMessage = document.getElementById("stageMessage");
  const fullscreenButton = document.getElementById("telaCheia");
  const resetButton = document.getElementById("reiniciarTour");
  const openInNewTab = document.getElementById("abrirNovaAba");
  let iframe;
  let loadingTimeout;

  const validEmbedUrl = () => {
    if (!TOUR_EMBED_URL) return false;
    try {
      const parsedUrl = new URL(TOUR_EMBED_URL);
      return parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:";
    } catch (error) {
      console.error("A URL configurada para o tour virtual é inválida.", error);
      stageMessage.textContent = "Não foi possível carregar o endereço configurado para o tour.";
      return false;
    }
  };

  const loadEmbed = () => {
    if (iframe || !validEmbedUrl()) return;
    iframe = document.createElement("iframe");
    iframe.title = "Tour virtual do Museu da Música – Itu";
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    iframe.allow = "fullscreen; gyroscope; accelerometer; autoplay; clipboard-write; encrypted-media";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.src = TOUR_EMBED_URL;
    iframe.addEventListener("load", () => {
      window.clearTimeout(loadingTimeout);
      loadingIndicator.hidden = true;
      preview.hidden = true;
    }, { once: true });
    iframe.addEventListener("error", () => {
      window.clearTimeout(loadingTimeout);
      loadingIndicator.hidden = true;
      iframe = undefined;
      stageMessage.textContent = "Não foi possível carregar o tour. Verifique sua conexão ou abra o endereço em uma nova aba.";
      preview.hidden = false;
      embedContainer.hidden = true;
    });
    embedContainer.replaceChildren(iframe);
    embedContainer.hidden = false;
    preview.hidden = false;
    loadingIndicator.hidden = false;
    loadingTimeout = window.setTimeout(() => {
      if (!loadingIndicator.hidden) {
        loadingIndicator.hidden = true;
        embedContainer.hidden = true;
        iframe.remove();
        iframe = undefined;
        stageMessage.textContent = "O visualizador demorou para responder. Tente novamente ou abra o endereço em uma nova aba.";
      }
    }, 15000);
    openInNewTab.href = TOUR_EMBED_URL;
    openInNewTab.textContent = "↗ Abrir tour em nova aba";
    openInNewTab.setAttribute("aria-label", "Abrir o tour virtual em uma nova aba");
  };

  const selectRoom = (option, announce = true) => {
    options.forEach((room) => {
      const selected = room === option;
      room.classList.toggle("active", selected);
      room.setAttribute("aria-pressed", String(selected));
    });

    image.src = option.dataset.image;
    image.alt = option.dataset.alt;
    stageRoomName.textContent = option.dataset.title;
    descriptionTitle.textContent = option.dataset.title;
    descriptionText.textContent = option.dataset.description;

    if (announce && stageMessage) {
      stageMessage.textContent = `${option.dataset.title}: prévia ilustrativa selecionada.`;
    }
  };

  options.forEach((option) => {
    option.addEventListener("click", () => selectRoom(option));
  });

  if (startButton) {
    startButton.addEventListener("click", () => {
      if (TOUR_EMBED_URL) {
        if (validEmbedUrl()) loadEmbed();
        return;
      }
      const currentRoom = options.find((option) => option.classList.contains("active"));
      stageMessage.textContent = `Prévia iniciada em ${currentRoom.dataset.title}. Selecione outro ambiente para continuar explorando.`;
    });
  }

  if (fullscreenButton) {
    fullscreenButton.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          fullscreenButton.innerHTML = '<span aria-hidden="true">⛶</span> Tela cheia';
          fullscreenButton.setAttribute("aria-label", "Abrir visualizador em tela cheia");
        } else {
          await stage.requestFullscreen();
          fullscreenButton.innerHTML = '<span aria-hidden="true">⛶</span> Sair da tela cheia';
          fullscreenButton.setAttribute("aria-label", "Sair da tela cheia");
        }
      } catch (error) {
        console.error("Não foi possível alterar o modo de tela cheia.", error);
      }
    });
  }

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = document.fullscreenElement === stage;
    if (fullscreenButton) {
      fullscreenButton.innerHTML = isFullscreen
        ? '<span aria-hidden="true">⛶</span> Sair da tela cheia'
        : '<span aria-hidden="true">⛶</span> Tela cheia';
      fullscreenButton.setAttribute("aria-label", isFullscreen ? "Sair da tela cheia" : "Abrir visualizador em tela cheia");
    }
  });

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      if (iframe) {
        window.clearTimeout(loadingTimeout);
        iframe.remove();
        iframe = undefined;
      }
      embedContainer.hidden = true;
      loadingIndicator.hidden = true;
      preview.hidden = false;
      openInNewTab.href = "tour-virtual.html#experiencia";
      openInNewTab.innerHTML = '<span aria-hidden="true">↗</span> Abrir em nova aba';
      openInNewTab.setAttribute("aria-label", "Abrir esta experiência em uma nova aba");
      selectRoom(options[0], false);
      stageMessage.textContent = "Prévia reiniciada. Escolha um ambiente para continuar explorando.";
      stage.focus();
    });
  }
});
