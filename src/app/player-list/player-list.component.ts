import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {

  player: Player[];
  playerSubscription: Subscription;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit() {
    this.playerSubscription = this.playerService.playerSubject.subscribe(
      (player: Player[]) => {
        this.player = player;
      }
    );
    this.playerService.emitPlayer();
  }

  onNewPlayer() {
    this.router.navigate(['/player', 'new']);
  }

  onDeletePlayer(player: Player) {
    this.playerService.removePlayer(player);
  }

  onViewPlayer(id: number) {
    this.router.navigate(['/player', 'view', id]);
  }
  
  ngOnDestroy() {
    this.playerSubscription.unsubscribe();
  }


}