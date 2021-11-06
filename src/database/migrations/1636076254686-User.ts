import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1636076254686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { 
                        name: 'user_id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
