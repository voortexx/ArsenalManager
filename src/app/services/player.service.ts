import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Player } from '../models/player.models';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class PlayerService {

  player: Player[] = [];
  playerSubject = new Subject<Player[]>();

  emitPlayer() {
    this.playerSubject.next(this.player);
  }

  savePlayer() {
    firebase.database().ref('/player').set(this.player);
	}

getPlayer() {
    firebase.database().ref('/player')
      .on('value', (data: DataSnapshot) => {
          this.player = data.val() ? data.val() : [];
          this.emitPlayer();
        }
      );
  }

  getSinglePlayer(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/player/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  constructor() {
    this.getPlayer();
	}

	createNewPlayer(newPlayer: Player) {
    this.player.push(newPlayer);
    this.savePlayer();
    this.emitPlayer();
  }

  removePlayer(player: Player) {
  	if(player.photo) {
      const storageRef = firebase.storage().refFromURL(player.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée!');
        },
        (error) => {
          console.log('Impossible de supprimer la photo ! : ' + error);
        }
      );
    }
    const playerIndexToRemove = this.player.findIndex(
      (playerEl) => {
        if(playerEl === player) {
          return true;
        }
      }
    );
    this.player.splice(playerIndexToRemove, 1);
    this.savePlayer();
    this.emitPlayer();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.downloadURL);
          }
        );
      }
    );
}

}

