import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../models/player.models';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  playerForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private playerService: PlayerService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.playerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ''
    });
  }
  
  onSavePlayer() {
    const nom = this.playerForm.get('nom').value;
    const prenom = this.playerForm.get('prenom').value;
    const poste = this.playerForm.get('poste').value;
    const newPlayer = new Player(nom, prenom, poste);
    if(this.fileUrl && this.fileUrl !== '') {
      newPlayer.photo = this.fileUrl;
    }
    this.playerService.createNewPlayer(newPlayer);
    this.router.navigate(['/player']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.playerService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }	

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
