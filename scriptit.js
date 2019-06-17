"use strict"
var obj = new Vue({
	el: "#obj",
	data: {
		itemName: '',
		items: [],
		errors: [],
	},
	
	mounted() {
		if (localStorage.getItem('items')) {
			try {
				this.items = JSON.parse(localStorage.getItem('items'));
				// haetaan paikallisesta muistista tavarat
			} catch(e) {
				localStorage.removeItem('items');
				// jos jokin meni pieleen tavaraa haettaessa
			}
		}
	},
	
	methods: {
		removeItem(index) {
			this.items.splice(index, 1); // poistetaan valittu
			this.saveItems(); // päivitetään lista myös selaimen muistiin
		},
		checkInput: function (word) {
			this.errors = [];
			var maxWordLength = 20;
			if (this.validInput(word)) {
				this.errors.push("Sallitut merkit ovat luvut, kirjaimet, pisteet ja pilkut.");
				console.log("Virheellinen syöttö");
			}
			if (word.length > maxWordLength) {
				this.errors.push("Syötä merkkijono joka on enintään " + maxWordLength + " merkkiä.");
				// jos sana oli pitempi kuin sallittu raja
			}
			if (this.errors.length === 0) {
				return true;
				// jos virheitä ei löytynyt
			}
			return false; // jos virheitä löytyi
		},
		add() {
			if (this.itemName === '') {
				return;
				// jos tekstikenttä oli tyhjä
			}
			if (this.checkInput(this.itemName)) {
				this.items.push(this.itemName); // lisätään listaan
				this.itemName = ''; // tyhjennetään tekstikenttä
				this.saveItems(); // tallennetaan selaimen muistiin
				// jos checkInput palautti true
			}	
		
		},
		validInput: function (itemName) {
			var re = /[^a-zA-Z0-9.,_öäåÖÄÅ]/; // sallitut merkit
			return re.test(itemName); // palautetaan testin tulos (true jos löytyi ei sallittu merkki)
		},
		saveItems() {
			const parsed = JSON.stringify(this.items);
			localStorage.setItem('items',parsed);
			// lisää listan selaimen muistiin
		},
		
	},
});