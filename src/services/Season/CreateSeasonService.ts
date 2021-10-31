import { getRepository } from 'typeorm';
import { v4 as uuid } from "uuid";
import { Season } from '../../entities/Season';

interface ISeason {
    name: string;
}

class CreateSeasonService{
    async execute({ name }: ISeason){
        try {
            const season = await getRepository(Season)
            .createQueryBuilder()
            .insert()
            .into(Season)
            .values([
                {   
                    season_id: uuid(),
                    name
                }
            ])
            .execute();

            return season.identifiers;
        } catch (error) {
            throw new Error('season already exists')
        }
    }
}

export { CreateSeasonService }
