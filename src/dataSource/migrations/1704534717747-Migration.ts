import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1704534717747 implements MigrationInterface {
  name = 'Migration1704534717747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "repository" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b842c26651c6fc0b9ccd1c530e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."repository_auth_role_enum" AS ENUM('ADMIN', 'USER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_auth" ("userId" uuid NOT NULL, "repositoryId" integer NOT NULL, "Role" "public"."repository_auth_role_enum" NOT NULL DEFAULT 'USER', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e092667e16da4b0c4f2f89161e3" PRIMARY KEY ("userId", "repositoryId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "nickname" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE ("nickname"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_auth" ADD CONSTRAINT "FK_136286fc57bf8a432bb8d650c23" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_auth" ADD CONSTRAINT "FK_c099bfdf7f83b35e0b9b34f30a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "repository_auth" DROP CONSTRAINT "FK_c099bfdf7f83b35e0b9b34f30a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_auth" DROP CONSTRAINT "FK_136286fc57bf8a432bb8d650c23"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "repository_auth"`);
    await queryRunner.query(`DROP TYPE "public"."repository_auth_role_enum"`);
    await queryRunner.query(`DROP TABLE "repository"`);
  }
}
