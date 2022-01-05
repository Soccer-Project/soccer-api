import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class DataLeague1641386504434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dataLeague',
                columns: [
                    {
                        name: 'data_league_id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'player_id',
                        type: 'varchar',
                    },
                    {
                        name: 'league_id',
                        type: 'varchar',
                    },
                    {
                        name: 'season_id',
                        type: 'varchar',
                    },
                    {
                        name: 'games',
                        type: 'integer',
                    },
                    {
                        name: 'goals',
                        type: 'integer',
                    },
                    {
                        name: 'assists',
                        type: 'integer',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FK_PlayerID',
                        referencedTableName: 'players',
                        referencedColumnNames: ['player_id'],
                        columnNames: ['player_id']
                    },
                    {
                        name: 'FK_LeagueID',
                        referencedTableName: 'leagues',
                        referencedColumnNames: ['league_id'],
                        columnNames: ['league_id']
                    },
                    {
                        name: 'FK_SeasonID',
                        referencedTableName: 'seasons',
                        referencedColumnNames: ['season_id'],
                        columnNames: ['season_id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('dataLeague')
    }

}
