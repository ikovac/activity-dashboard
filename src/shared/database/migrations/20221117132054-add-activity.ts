import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'activity';

export class CreateActivity extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createReflectionTable = knex.schema.createTable(
      TABLE_NAME,
      (table) => {
        table.increments('id');
        table.enum('type', ['REFLECTED', 'RATED']).notNullable();
        table.timestamp('timestamp', { useTz: true }).notNullable();
        table
          .timestamp('created_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
        table
          .timestamp('updated_at', { useTz: true })
          .notNullable()
          .defaultTo(knex.fn.now());
      },
    );

    this.addSql(createReflectionTable.toQuery());
  }

  async down(): Promise<void> {
    const knex = this.getKnex();

    this.addSql(knex.schema.dropTable(TABLE_NAME).toQuery());
  }
}
