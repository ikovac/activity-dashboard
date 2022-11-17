import { Migration } from '@mikro-orm/migrations';

const TABLE_NAME = 'reflection';

export class CreateReflection extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();

    const createReflectionTable = knex.schema.createTable(
      TABLE_NAME,
      (table) => {
        table.increments('id');
        table.text('text').notNullable();
        table.integer('learner_id').notNullable();
        table.integer('catalog_item_id').notNullable();
        table
          .foreign('catalog_item_id')
          .references('catalog_item.id')
          .onDelete('CASCADE');
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
