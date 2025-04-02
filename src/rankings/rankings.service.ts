import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../entities/ranking.entity';
import { Fighter } from '../entities/fighter.entity';
import { FightResult } from '../entities/fight-result.entity';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Ranking)
    private rankingRepository: Repository<Ranking>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
  ) {}

  async updateRankingsAfterFight(fightResult: FightResult): Promise<void> {
    const winner = await this.fighterRepository.findOne({
      where: { id: fightResult.fighter.id },
      relations: ['weightClass'],
    });

    const loser = await this.fighterRepository.findOne({
      where: { id: fightResult.fight.fightResults.find(fr => !fr.isWinner).fighter.id },
      relations: ['weightClass'],
    });

    const currentRankings = await this.rankingRepository.find({
      where: { weightClass: { id: winner.weightClass.id } },
      order: { rank: 'ASC' },
      relations: ['fighter', 'weightClass'],
    });

    const winnerRanking = currentRankings.find(r => r.fighter.id === winner.id);
    const loserRanking = currentRankings.find(r => r.fighter.id === loser.id);

    await this.calculateAndUpdateRankings(winner, loser, winnerRanking, loserRanking, currentRankings);
  }

  private async calculateAndUpdateRankings(
    winner: Fighter,
    loser: Fighter,
    winnerRanking: Ranking,
    loserRanking: Ranking,
    currentRankings: Ranking[],
  ): Promise<void> {
    const winnerCurrentRank = winnerRanking?.rank || currentRankings.length + 1;
    const loserCurrentRank = loserRanking?.rank || currentRankings.length + 1;

    // If winner is ranked lower (higher number) than loser
    if (winnerCurrentRank > loserCurrentRank) {
      const newWinnerRank = loserCurrentRank;
      const affectedRanks = currentRankings.filter(
        r => r.rank >= newWinnerRank && r.rank < winnerCurrentRank,
      );

      // Update winner's rank
      await this.rankingRepository.save({
        fighter: winner,
        weightClass: winner.weightClass,
        rank: newWinnerRank,
      });

      // Shift other fighters down
      for (const ranking of affectedRanks) {
        await this.rankingRepository.save({
          ...ranking,
          rank: ranking.rank + 1,
        });
      }
    }
  }

  async getRankingsByWeightClass(weightClassId: number): Promise<Ranking[]> {
    return this.rankingRepository.find({
      where: { weightClass: { id: weightClassId } },
      order: { rank: 'ASC' },
      relations: ['fighter', 'weightClass'],
    });
  }
}