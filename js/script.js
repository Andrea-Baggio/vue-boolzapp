new Vue({
	el: '#app',
	data: {
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Hai portato a spasso il cane?',
						status: 'sent',
					},
					{
						date: '10/01/2020 15:50:00',
						message: 'Ricordati di stendere i panni',
						status: 'sent',
					},
					{
						date: '10/01/2020 16:15:22',
						message: 'Tutto fatto!',
						status: 'received',
					},
				],
			},
			{
				name: 'Fabio',
				avatar: '_2',
				messages: [
					{
						date: '20/03/2020 16:30:00',
						message: 'Ciao come stai?',
						status: 'sent',
					},
					{
						date: '20/03/2020 16:30:55',
						message: 'Bene grazie! Stasera ci vediamo?',
						status: 'received',
					},
					{
						date: '20/03/2020 16:35:00',
						message: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent',
					},
				],
			},
			{
				name: 'Samuele',
				avatar: '_3',
				messages: [
					{
						date: '28/03/2020 10:10:40',
						message: 'La Marianna va in campagna',
						status: 'received',
					},
					{
						date: '28/03/2020 10:20:10',
						message: 'Sicuro di non aver sbagliato chat?',
						status: 'sent',
					},
					{
						date: '28/03/2020 16:15:22',
						message: 'Ah scusa!',
						status: 'received',
					},
				],
			},
			{
				name: 'Alessandro B.',
				avatar: '_4',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent',
					},
					{
						date: '10/01/2020 15:50:00',
						message: 'Si, ma preferirei andare al cinema',
						status: 'received',
					},
				],
			},
			{
				name: 'Alessandro L.',
				avatar: '_5',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Ricordati di chiamare la nonna',
						status: 'sent',
					},
					{
						date: '10/01/2020 15:50:00',
						message: 'Va bene, stasera la sento',
						status: 'received',
					},
				],
			},
			{
				name: 'Claudia',
				avatar: '_6',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Ciao Claudia, hai novità?',
						status: 'sent',
					},
					{
						date: '10/01/2020 15:50:00',
						message: 'Non ancora',
						status: 'received',
					},
					{
						date: '10/01/2020 15:51:00',
						message: 'Nessuna nuova, buona nuova',
						status: 'sent',
					},
				],
			},
			{
				name: 'Federico',
				avatar: '_7',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Fai gli auguri a Martina che è il suo compleanno!',
						status: 'sent',
					},
					{
						date: '10/01/2020 15:50:00',
						message: 'Grazie per avermelo ricordato, le scrivo subito!',
						status: 'received',
					},
				],
			},
			{
				name: 'Davide',
				avatar: '_8',
				messages: [
					{
						date: '10/01/2020 15:30:55',
						message: 'Ciao, andiamo a mangiare la pizza stasera?',
						status: 'received',
					},
					{
						date: '10/01/2020 15:50:00',
						message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
						status: 'sent',
					},
					{
						date: '10/01/2020 15:51:00',
						message: 'OK!!',
						status: 'received',
					},
				],
			},
		],
		activeIndex: null,
		activeMenu: null,
		newMessage: '',
		searchString: '',
	},
	methods: {
		setActiveIndex(index) {
			const objActiveContact = this.filteredContacts[index];
			this.activeIndex = this.contacts.indexOf(objActiveContact);
			this.activeMenu = null;
		},
		sendMessage() {
			this.contacts[this.activeIndex].messages.push({
				date: this.getNow(),
				message: this.newMessage,
				status: 'sent',
			});
			this.newMessage = '';
			const receiverIndex = this.activeIndex; // questa variabile evita che la risposta venga inviata ad un'altra chat se l'utente cambia chat mentre il computer sta rispondendo
			setTimeout(() => {
				this.contacts[receiverIndex].messages.push({
					date: this.getNow(),
					message: 'Ok',
					status: 'received',
				});
			}, 1500);
		},
		getNow() {
			return luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss');
		},
		deleteMessage(index) {
			const objActiveContact = this.filteredContacts[this.activeIndex];
			objActiveContact.messages.splice(index, 1);
		},
		deleteContact(index) {
			const objActiveContact = this.filteredContacts[this.activeIndex];
			const indexInContacts = this.contacts.indexOf(objActiveContact);
			this.contacts.splice(indexInContacts, 1);
		},
		toggleMenu(index, event) {
			if (!event || (event && !event.target.classList.contains('message-menu-toggler'))) {
				if (this.activeMenu == index) {
					this.activeMenu = null;
				} else {
					this.activeMenu = index;
				}
			}
		},
	},
	computed: {
		filteredContacts() {
			return this.contacts.filter(objContact => objContact.name.trim().toLowerCase().includes(this.searchString.trim().toLowerCase()));
		}
	},
});