const {createApp} = Vue;
const dt = luxon.DateTime;


createApp({
    data(){
        return{
            activeContact: 0,
            textMessage: '',
            searchContact: '',
            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ]
            
        }
    },
    methods: {
        // funzione per impostare la chat attiva
        changeContact(index){
            this.activeContact = index;
        },
        // funzione per estrarre l'orario del messaggio dalla stringa della data
        formatTime(dateString) {
            const time = dateString.slice(11,16);
            return time;
        },
        // funzione per aggiungere un messaggio alla chat del contatto
        addMessage(){
            let obj = {
                date: this.getTodayData(),
                message: this.textMessage,
                status: 'sent' 
            }
            this.contacts[this.activeContact].messages.push(obj);
            this.textMessage = '';
            // funzione Timeout di risposta automatica per ogni nuovo messaggio inserito
            setTimeout(() => {
                let userAnswer = {
                  date: this.getTodayData(),
                  message: 'Ok',
                  status: 'received' 
                };
                
                this.contacts[this.activeContact].messages.push(userAnswer);
            }, 1000);
        },
        // funzione per la ricerca dei contatti
        searchFunction(){
            this.contacts.forEach((element) => {
                if(element.name.toLowerCase().includes(this.searchContact.toLowerCase())){
                    element.visible = true;
                }
                else {
                    element.visible = false;
                }
            })
        },
        // funzione per recuperare la data e l'ora attuale
        getTodayData(){
            let today = dt.now();
            today = today.toFormat('dd/MM/yyyy HH:mm:ss');
            return today;
        },
        // funzione per recuperare l'ultimo messaggio della chat del contatto
        getLastMessage(index){
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].message.slice(0,30) + '...';
        },
        // funzione per recuperare l'ora dell'ultimo messaggio
        getLastMessageTime(index){
            let time = this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
            time = this.formatTime(time);
            return time;
        },
        // funzione per rimuovere un messaggio
        removeMessage(index){
            this.contacts[this.activeContact].messages.splice(index, 1);
        }
    }
}).mount('#app')