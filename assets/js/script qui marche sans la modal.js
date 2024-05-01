let player1Score = 0;
let player2Score = 0;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-game-btn").addEventListener("click", startGame);
    document.querySelectorAll("#choices button").forEach(button => {
        button.addEventListener("click", function() {
            makeChoice(button.dataset.choice);
        });
    });
});

function startGame() {
    const playerName = document.getElementById("name-input").value;
    if (!playerName) {
        alert("Veuillez entrer votre nom.");
        return;
    }
    document.getElementById("player1-name").innerText = playerName + " (0)";
    document.getElementById("player2-name").innerText = "Ordinateur (0)";
    document.getElementById("start-game").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function makeChoice(choice) {
    const choices = ['pierre', 'papier', 'ciseaux'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const player1Choice = choice;
    const player2Choice = choices[randomIndex];
  
    document.getElementById('player1-choice').innerText = player1Choice;
    document.getElementById('player2-choice').innerText = player2Choice;
  
    document.getElementById('player1-choice-img').src = `./assets/image/${player1Choice}.png`;
    document.getElementById('player2-choice-img').src = `./assets/image/${player2Choice}.png`;
  
    if (
        (player1Choice === "pierre" && player2Choice === "ciseaux") ||
        (player1Choice === "papier" && player2Choice === "pierre") ||
        (player1Choice === "ciseaux" && player2Choice === "papier")
    ) {
        player1Score++;
    } else if (player1Choice !== player2Choice) {
        player2Score++;
    }

    document.getElementById("player1-name").innerText = document.getElementById("name-input").value + " (" + player1Score + ")";
    document.getElementById("player2-name").innerText = "Ordinateur" + " (" + player2Score + ")";

    if (player1Score === 3 || player2Score === 3) {
        const winner = player1Score === 3 ? "Joueur 1" : "Joueur 2";
        const modalBody = document.getElementById("victoryBody");
        modalBody.innerHTML = `
          <center><p>${winner} a remporté la victoire !</p>
            <img src="./assets/image/utilisateur.png" alt="Avatar" class="choice-img">
       </center> `;
        $("#victoryModal").modal("show");
        player1Score = 0;
        player2Score = 0;
    }
}

function reloadPage() {
    location.reload();
}

$(document).ready(function() {
    $('#victoryModal').on('hidden.bs.modal', function () {
        reloadPage();
    });
});
