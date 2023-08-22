const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//Logar no Sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Verifique o usuário ou a senha.");
        return;
    }

    if (account) {
        if (account.senha !== senha) {
            alert("Verifique o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }
});

//Criar Conta
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const senha = document.getElementById("password-create-input").value;

    if (email.length <= 5) {
        alert("Favor digitar um e-mail válido");
        return;
    }

    if (senha.length < 6) {
        alert("A Senha deve ter 6 Dígitos");
        return;
    }

    saveAccount({
        login: email,
        senha: senha,
        transactions: [],
    });

    myModal.hide();

    alert("Conta Criada com Sucesso");
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccount (data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};

function getAccount (key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return "";
};

function saveSession (data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
};
