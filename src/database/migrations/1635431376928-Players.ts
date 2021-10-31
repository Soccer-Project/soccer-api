import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Players1635431376928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'players',
                columns: [
                    { 
                        name: 'player_id',
                        type: 'string',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'string',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('players')
    }

}
