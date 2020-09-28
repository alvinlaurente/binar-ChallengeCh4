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

/* Jalankan game */

/* Beri delay untuk membuat komputer seolah berpikir dahulu */
function wait() {
	const compBox = document.querySelectorAll('.greyBox.compImage');
	const start = new Date().getTime();
	let i = 0;

	setInterval(function () {
		/* Jalankan fungsi dalam waktu 1s */
		if (new Date().getTime() - start >= 1000) {
			clearInterval;
			return;
		}

		/* Komputer seolah-olah berpikir dengan bantuan greyBox */
		compBox[i++].style.backgroundColor = '#c4c4c4';
		if (i == compBox.length) i = 0;

		/* Hapus tulisan hasil dalam result saat wait() */
		const textResult = document.querySelector('.result h5');
		textResult.innerHTML = '';

		/* Hilangkan kembali class result saat wait () */
		const resultClass = document.querySelector('.versus div div');
		resultClass.classList.remove('result');

		/* Tampilkan kembali tulisan VS saat wait () */
		const versus = document.querySelector('.versus h1');
		versus.style.color = 'rgb(189,48,46)';

	}, 100);

	setTimeout(function () {
		setInterval(function () {
			if (new Date().getTime() - start >= 1200) {
				clearInterval;
				return;
			}

			/* Handling agar Menyamarkan greyBox dengan bgColor supaya tidak semuanya memiliki greyBox berwarna abu */
			compBox[i++].style.backgroundColor = '#9c835f';
			if (i == compBox.length) i = 0;
		}, 100);
	}, 100);
}

/* Menangkap pilihan pemain */
const player = document.querySelectorAll('.contentImage .player');
player.forEach(function (choice) {
	choice.addEventListener('click', function () {
		/* Samarkan greyBox pada sisi player saat game dijalankan */
		const playerBox = document.querySelectorAll('.greyBox.playerImage');
		for (let i = 0; i < playerBox.length; i++) {
			playerBox[i].style.backgroundColor = '#9c835f';
		}

		/* Tangkap pilihan komputer */
		const compChoice = getCompChoice();

		/* Tangkap pilihan pemain */
		const p1Choice = choice.className.substr(7, 7);

		/* Jalankan Rules permainan untuk mendapatkan hasil */
		const result = getResult(compChoice, p1Choice);

		/* Berikan greyBox pada pilihan pemain */
		playerBox.forEach(function (p1Choice) {
			p1Choice.addEventListener('click', function () {
				p1Choice.style.backgroundColor = '#c4c4c4';
			});
		});

		/* Jalankan fungsi wait agar komputer terlihat berpikir dahulu */
		wait();

		/* Jalankan seluruh perintah dibawah setelah fungsi wait selesai dijalankan */
		setTimeout(function () {
			/* Samarkan tulisan VS dengan background saat hasil ditampilkan */
			const versus = document.querySelector('.versus h1');
			versus.style.color = '#9c835f';

			/* Tampilkan class result */
			const resultClass = document.querySelector('.versus div div');
			resultClass.classList.add('result');

			/* Tampilkan hasil dalam class result (kotak hijau) */
			const textResult = document.querySelector('.result h5');
			textResult.innerHTML = result;
			if (result == "DRAW") {
				textResult.style.backgroundColor = '#225c0e';
			}
			else {
				textResult.style.backgroundColor = '#4c9654';
			}

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

			/* Reset tampilan game dengan tombol refresh */
			const reset = document.querySelector('.refresh');
			reset.addEventListener('click', function () {
				/* Hapus tulisan hasil dalam result */
				textResult.innerHTML = '';

				/* Hilangkan kembali class result */
				resultClass.classList.remove('result');

				/* Hilangkan kembali seluruh greyBox */
				for (let i = 0; i < compBox.length; i++) {
					playerBox[i].style.backgroundColor = '#9c835f';
					compBox[i].style.backgroundColor = '#9c835f';
				}

				/* Tampilkan kembali tulisan VS */
				versus.style.color = 'rgb(189,48,46)';
			});
		}, 1200);
	});
});