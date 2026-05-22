/* ============================================================
   ALIMENTA SESI — Lógicas globais
   ============================================================ */

(function () {
  "use strict";

  /* ---------- MENU HAMBÚRGUER ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    // Fecha o menu ao clicar em um link (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- TOGGLE SENHA (Login) ---------- */
  const togglePass = document.getElementById("togglePass");
  const senhaInput = document.getElementById("senha");
  if (togglePass && senhaInput) {
    togglePass.addEventListener("click", () => {
      const isPwd = senhaInput.type === "password";
      senhaInput.type = isPwd ? "text" : "password";
      togglePass.innerHTML = isPwd
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  /* ---------- TOGGLE SENHA (Cadastro) ---------- */
  const togglePassCadastro = document.getElementById("togglePassCadastro");
  const senhaCadastro = document.getElementById("senhaCadastro");
  if (togglePassCadastro && senhaCadastro) {
    togglePassCadastro.addEventListener("click", () => {
      const isPwd = senhaCadastro.type === "password";
      senhaCadastro.type = isPwd ? "text" : "password";
      togglePassCadastro.innerHTML = isPwd
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  const togglePassConfirmar = document.getElementById("togglePassConfirmar");
  const confirmarSenha = document.getElementById("confirmarSenha");
  if (togglePassConfirmar && confirmarSenha) {
    togglePassConfirmar.addEventListener("click", () => {
      const isPwd = confirmarSenha.type === "password";
      confirmarSenha.type = isPwd ? "text" : "password";
      togglePassConfirmar.innerHTML = isPwd
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  /* ---------- LOGIN FORM ---------- */
  const loginForm = document.getElementById("loginForm");
  const submitBtn = document.getElementById("submitBtn");

  if (loginForm && submitBtn) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const remember = document.getElementById("remember").checked;

      if (!usuario || !senha) {
        submitBtn.classList.add("shake");
        setTimeout(() => submitBtn.classList.remove("shake"), 500);
        return;
      }

      // Estado de carregamento
      submitBtn.disabled = true;
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<span class="btn-label"><span class="spinner"></span> Autenticando...</span>';

      // Simulação — substitua pela chamada do seu backend
      setTimeout(() => {
        console.log("🔐 [Alimenta SESI] Dados de login enviados:", {
          usuario,
          senha,
          remember,
          timestamp: new Date().toISOString(),
        });

        // TODO: integrar com backend real:
        // fetch("/api/login", { method:"POST", body: JSON.stringify({ usuario, senha }) })

        submitBtn.innerHTML =
          '<span class="btn-label"><i class="fa-solid fa-check"></i> Sucesso!</span>';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }, 1400);
      }, 1500);
    });
  }

  /* ---------- CADASTRO FORM ---------- */
  const registerForm = document.getElementById("registerForm");
  const submitRegisterBtn = document.getElementById("submitRegisterBtn");

  if (registerForm && submitRegisterBtn) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const rm = document.getElementById("rm").value.trim();
      const tipo = document.getElementById("tipo").value;
      const turma = document.getElementById("turma").value.trim();
      const senhaVal = senhaCadastro ? senhaCadastro.value : "";
      const confirmar = confirmarSenha ? confirmarSenha.value : "";
      const termos = document.getElementById("termos").checked;

      // Validações básicas
      if (!nome || !email || !rm || !tipo || !senhaVal || !confirmar || !termos) {
        submitRegisterBtn.classList.add("shake");
        setTimeout(() => submitRegisterBtn.classList.remove("shake"), 500);
        return;
      }

      if (senhaVal !== confirmar) {
        submitRegisterBtn.classList.add("shake");
        setTimeout(() => submitRegisterBtn.classList.remove("shake"), 500);
        console.warn("⚠️ [Alimenta SESI] As senhas não coincidem.");
        return;
      }

      if (senhaVal.length < 8) {
        submitRegisterBtn.classList.add("shake");
        setTimeout(() => submitRegisterBtn.classList.remove("shake"), 500);
        console.warn("⚠️ [Alimenta SESI] A senha deve ter pelo menos 8 caracteres.");
        return;
      }

      // Estado de carregamento
      submitRegisterBtn.disabled = true;
      const original = submitRegisterBtn.innerHTML;
      submitRegisterBtn.innerHTML =
        '<span class="btn-label"><span class="spinner"></span> Criando conta...</span>';

      // Simulação — substitua pela chamada do seu backend
      setTimeout(() => {
        console.log("📝 [Alimenta SESI] Dados de cadastro enviados:", {
          nome,
          email,
          rm,
          tipo,
          turma,
          senha: senhaVal,
          termos,
          timestamp: new Date().toISOString(),
        });

        // TODO: integrar com backend real:
        // fetch("/api/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ nome, email, rm, tipo, turma, senha: senhaVal })
        // })

        submitRegisterBtn.innerHTML =
          '<span class="btn-label"><i class="fa-solid fa-check"></i> Conta criada!</span>';

        setTimeout(() => {
          submitRegisterBtn.disabled = false;
          submitRegisterBtn.innerHTML = original;
          // Opcional: redirecionar após sucesso
          // window.location.href = "login.html";
        }, 1400);
      }, 1800);
    });
  }
})();