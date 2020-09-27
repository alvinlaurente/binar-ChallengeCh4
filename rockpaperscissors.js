// Menangkap pilihan dari komputer
function getCompChoice() {
	const comp = Math.random();
	if (comp < (1 / 3)) return 'rock';
	if (comp >= (1 / 3) && comp < (2 / 3)) return 'paper';
	return 'scissor';
}

// Rules permainan
function getResult(comp, player) {
	if (player == comp) return 'DRAW';
	if (player == 'rock') return (comp == 'scissor') ? 'PLAYER WIN' : 'COM WIN';
	if (player == 'paper') return (comp == 'rock') ? 'PLAYER WIN' : 'COM WIN';
	if (player == 'scissor') return (comp == 'paper') ? 'PLAYER WIN' : 'COM WIN';
}

/* Menangkap pilihan pemain */
const player = document.querySelectorAll('.contentImage .player');
player.forEach(function (choice) {
	choice.addEventListener('click', function () {
		/* Tangkap pilihan komputer */
		const compChoice = getCompChoice();

		/* Tangkap pilihan pemain */
		const p1Choice = choice.className.substr(7, 7);

		/* Jalankan Rules permainan untuk mendapatkan hasil */
		const result = getResult(compChoice, p1Choice);

		/* Tampilkan class result */
		const resultClass = document.querySelector('.versus div div');
		resultClass.classList.add('result');

		/* Tampilkan hasil dalam class result (kotak hijau) */
		const textResult = document.querySelector('.result h5');
		textResult.innerHTML = result;

		/* Berikan greyBox pada player choice */
		const playerBox = document.querySelectorAll('.greyBox.playerImage');
		playerBox.forEach(function (p1Choice) {
			p1Choice.addEventListener('click', function () {
				p1Choice.style.backgroundColor = '#c4c4c4';
			});
		});

		/* Berikan greyBox pada comp choice */
		const compBox = document.querySelectorAll('.greyBox.compImage');
		if (compChoice == 'rock') {
			compBox[0].style.backgroundColor = '#c4c4c4';
		}
		else if (compChoice == 'paper') {
			compBox[1].style.backgroundColor = '#c4c4c4';
		}
		else {
			compBox[2].style.backgroundColor = '#c4c4c4';
		}

		/* Samarkan tulisan VS dengan background saat hasil ditampilkan */
		const versus = document.querySelector('.versus h1');
		versus.style.color = 'rgb(156, 131, 95)';

		/* Mereset game dengan tombol refresh */
		const reset = document.querySelector('.refresh');
		reset.addEventListener('click', function () {
			/* Hapus tulisan hasil dalam result */
			textResult.innerHTML = '';

			/* Hilangkan kembali class result */
			resultClass.classList.remove('result');

			/* Hilangkan kembali greyBox */
			for (let i = 0; i < compBox.length; i++) {
				playerBox[i].style.backgroundColor = 'rgb(156, 131, 95)';
				compBox[i].style.backgroundColor = 'rgb(156, 131, 95)';
			}

			/* Tampilkan kembali tulisan VS */
			versus.style.color = 'rgb(189,48,46)';
		});
	});
});