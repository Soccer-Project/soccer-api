import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class DataSeason1635416972480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dataSeason',
                columns: [
                    {
                        name: 'data_season_id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'player_id',
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
                        name: 'FKPlayerID',
                        referencedTableName: 'players',
                        referencedColumnNames: ['player_id'],
                        columnNames: ['player_id']
                    },
                    {
                        name: 'FKSeasonID',
                        referencedTableName: 'seasons',
                        referencedColumnNames: ['season_id'],
                        columnNames: ['season_id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('data-season');
    }

}
