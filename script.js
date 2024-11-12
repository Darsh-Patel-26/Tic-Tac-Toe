const slots = document.querySelectorAll('.slot');
let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var player = 1; // Player 1 is 'X' and Player 2 is 'O'

// Modal elements
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const restartButton = document.getElementById('restartButton');

function logMove(num) {
    // If the slot is empty, proceed with the move
    if (slots[num].textContent === '') {
        slots[num].textContent = player === 1 ? 'X' : 'O'; // Set 'X' for player 1, 'O' for player 2
        board[Math.floor(num / 3)][num % 3] = player; // Update board with current player
        
        setTimeout(() => {
            if (hasWon()) {
                modalMessage.textContent = "Player " + (player === 1 ? 'X' : 'O') + " Won!!";
                modal.style.display = "block"; // Show modal
                return;
            } else if (draw()) {
                modalMessage.textContent = "Draw!!";
                modal.style.display = "block"; // Show modal
            }
            player = player === 1 ? 2 : 1; // Switch player
        }, 10);
    }
}

function hasWon() {
    let hFlag = false,
        vFlag = false,
        dFlag = false;
    
    // Check horizontal wins
    for (let i = 0; i < 3; i++) {
        hFlag = (board[i][0] != null) && (board[i][0] === board[i][1] && board[i][0] === board[i][2]);
        if (hFlag) return true;
    }

    // Check vertical wins
    for (let i = 0; i < 3; i++) {
        vFlag = (board[0][i] != null) && (board[0][i] === board[1][i] && board[0][i] === board[2][i]);
        if (vFlag) return true;
    }

    // Check diagonal wins
    dFlag = (board[0][0] != null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            (board[0][2] != null && board[0][2] === board[1][1] && board[1][1] === board[2][0]);
    
    return dFlag;
}

function draw() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === null)
                return false;
        }
    }
    return true;
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = function() {
    modal.style.display = "none";
};

// Close the modal when the user clicks on the restart button
restartButton.onclick = function() {
    // location.reload();
    modal.style.display = "none";
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    slots.forEach(slot => {
        slot.textContent = '';
    });
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};