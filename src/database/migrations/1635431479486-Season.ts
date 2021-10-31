import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Season1635390163974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'seasons',
                columns: [
                    {
                        name: 'season_id',
                        type: 'string',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'string',
                        isUnique: true,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('seasons');
    }

}
