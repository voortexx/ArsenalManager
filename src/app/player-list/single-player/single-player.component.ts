import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player.models';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {

  player: Player;

  constructor(private route: ActivatedRoute, private playerService: PlayerService,
              private router: Router) {}

  ngOnInit() {
    this.player = new Player('', '', '');
    const id = this.route.snapshot.params['id'];
    this.playerService.getSinglePlayer(+id).then(
      (player: Player) => {
        this.player = player;
      }
    );
  }

  onBack() {
    this.router.navigate(['/player']);
  }
}