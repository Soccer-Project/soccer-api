import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class DataSeason1635416972480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'dataSeason',
                columns: [
                    {
                        name: 'data_season_id',
                        type: 'string',
                        isPrimary: true
                    },
                    {
                        name: 'player_id',
                        type: 'string',
                    },
                    {
                        name: 'season_id',
                        type: 'string',
                    },
                    {
                        name: 'games',
                        type: 'number',
                    },
                    {
                        name: 'goals',
                        type: 'number',
                    },
                    {
                        name: 'assists',
                        type: 'number',
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKPlayerID',
                        referencedTableName: 'players',
                        referencedColumnNames: ['player_id'],
                        columnNames: ['player_id'],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: 'FKSeasonID',
                        referencedTableName: 'seasons',
                        referencedColumnNames: ['season_id'],
                        columnNames: ['season_id'],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('data-season');
    }

}
