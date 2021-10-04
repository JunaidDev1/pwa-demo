import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { iNotes } from '../notes';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myNotes: iNotes[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ionViewWillEnter() {
    this.getMyNotes();
  }

  getMyNotes() {
    if (localStorage.getItem('myNotes')) {
      this.myNotes = JSON.parse(localStorage.getItem('myNotes'));
    }
  }

  async showDeleteConfirmation() {
    const alert = await this.alertController.create({
      header: 'Delete all notes?',
      message: 'Are you sure you want to delete all notes?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'YES',
          handler: () => {
            this.removeAllNotes();
          }
        }
      ]
    });
    await alert.present();
  }

  removeAllNotes() {
    localStorage.clear();
    this.myNotes = [];
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'All notes were cleared',
      duration: 2000
    });
    toast.present();
  }

}
