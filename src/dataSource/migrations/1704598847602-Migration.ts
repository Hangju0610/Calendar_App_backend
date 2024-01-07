import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1704598847602 implements MigrationInterface {
    name = 'Migration1704598847602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."issue_progress_enum" AS ENUM('BACKLOG', 'READY', 'IN_PROGRESS', 'IN_REVIEW', 'DONE')`);
        await queryRunner.query(`CREATE TYPE "public"."issue_priority_enum" AS ENUM('URGENT', 'HIGH', 'MEDIUM', 'LOW')`);
        await queryRunner.query(`CREATE TYPE "public"."issue_size_enum" AS ENUM('X-LARGE', 'LARGE', 'MEDIUM', 'SMALL', 'TINY')`);
        await queryRunner.query(`CREATE TABLE "issue" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "repositoryId" integer NOT NULL, "title" character varying NOT NULL, "progress" "public"."issue_progress_enum", "priority" "public"."issue_priority_enum", "size" "public"."issue_size_enum", "content" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_294bc58c9e4aef5844faed58727" FOREIGN KEY ("repositoryId") REFERENCES "repository"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_294bc58c9e4aef5844faed58727"`);
        await queryRunner.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_9ec9992868e098e4e861a1aa9df"`);
        await queryRunner.query(`DROP TABLE "issue"`);
        await queryRunner.query(`DROP TYPE "public"."issue_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issue_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."issue_progress_enum"`);
    }

}
