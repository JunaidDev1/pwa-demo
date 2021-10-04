import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { iNotes } from '../notes';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newNote: iNotes = new iNotes();

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  confirmSaveNote() {
    if (!this.newNote.title || !this.newNote.whenToDo) {
      this.showMissingFieldAlert();
    } else {
      this.showSaveConfirmationAlert();
    }
  }

  async showMissingFieldAlert() {
    const alert = await this.alertController.create({
      header: 'NoteTaker',
      message: 'Please fill in both the title and the when field',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Ok clicked');
          }
        },
      ]
    });
    await alert.present();
  }

  async showSaveConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'NoteTaker',
      message: 'Are you sure you want to save this note?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.saveNewNote();
          }
        }
      ]
    });
    await alert.present();
  }

  saveNewNote() {
    if (localStorage.getItem('myNotes')) {
      const myNotes: iNotes[] = JSON.parse(localStorage.getItem('myNotes'));
      myNotes.push(this.newNote);
      localStorage.setItem('myNotes', JSON.stringify(myNotes));
    } else {
      const myNotes: iNotes[] = [];
      myNotes.push(this.newNote);
      localStorage.setItem('myNotes', JSON.stringify(myNotes));
    }
    this.displaySuccessToast();
    this.navigateToHome();
  }

  async displaySuccessToast() {
    const toast = await this.toastController.create({
      message: 'Your note has been saved',
      duration: 2000
    });
    toast.present();
  }

  navigateToHome() {
    this.newNote = new iNotes();
    this.navCtrl.navigateRoot('/tabs');
  }

}
