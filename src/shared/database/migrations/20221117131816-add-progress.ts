import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'progress';

export class CreateProgress extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createReflectionTable = knex.schema.createTable(
      TABLE_NAME,
      (table) => {
        table.integer('learner_id').notNullable();
        table.integer('item_id').notNullable();
        table.primary(['learner_id', 'item_id']);
        table.boolean('is_rated').notNullable();
        table.boolean('is_reflected').notNullable();
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
